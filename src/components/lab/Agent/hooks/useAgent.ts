import { useState, useEffect } from 'react';
import type { AgentMessage, SearchResult } from '../types';
import { STORAGE_KEY_API_KEY, STORAGE_KEY_CONVERSATIONS } from '../types';
import { searchWeb } from '../tools/searchTool';

const SYSTEM_PROMPT = `You are a helpful AI assistant powered by DeepSeek.
You have access to a web search tool. If the user asks about current events or specific technical details you don't know, you should search for it.
When you use information from search results, you must cite the source URL in your response using markdown links like [1](url), [2](url).
Format your response nicely with Markdown.`;

export function useAgent() {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m an AI assistant. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>(''); // 'Thinking...', 'Searching...'
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY_API_KEY);
    if (savedKey) setApiKey(savedKey);

    const savedMessages = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to load messages', e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(messages));
    }
  }, [messages]);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(STORAGE_KEY_API_KEY, key);
  };

  const deleteApiKey = () => {
    setApiKey('');
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  };

  const clearMessages = () => {
    const welcomeMsg: AgentMessage = {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m an AI assistant. How can I help you today?',
      timestamp: Date.now()
    };
    setMessages([welcomeMsg]);
    setSearchResults([]);
    localStorage.removeItem(STORAGE_KEY_CONVERSATIONS);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    if (!apiKey) {
      alert('Please enter your DeepSeek API Key first.');
      return;
    }

    const userMsg: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setStatus('Thinking...');
    setSearchResults([]); // Clear previous search results

    try {
      // 1. Check if search is needed - Aggressive trigger
      // Search unless it's a simple greeting, acknowledgement, or very short message
      const isSimpleChat = /^(hi|hello|hey|thanks|thank you|thx|ok|okay|got it|bye|good morning|good afternoon|good night)$/i.test(content.trim());
      const shouldSearch = !isSimpleChat && content.length > 3; // Reduced threshold to capture short queries like "Apple stock"

      // Dynamically update system prompt with current date
      let systemContext = `${SYSTEM_PROMPT}\n\nCurrent Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      let citations: string[] = [];

      if (shouldSearch) {
        setStatus('Searching the web...');
        // Force a small delay so UI updates to "Searching..." before the async call blocks
        await new Promise(r => setTimeout(r, 100));

        const results = await searchWeb(content);

        // Validate URL results
        const validResults = results.filter(r => {
           try {
             new URL(r.url);
             return true;
           } catch {
             return false;
           }
        });

        setSearchResults(validResults);

        // Add search results to context
        if (validResults.length > 0) {
            systemContext += `\n\nSearch Results for "${content}" (Date: ${new Date().toISOString().split('T')[0]}):\n`;
            validResults.forEach((result, index) => {
            systemContext += `[${index + 1}] Title: ${result.title}\nURL: ${result.url}\nSnippet: ${result.snippet}\n\n`;
            citations.push(result.url);
            });
        }
      }

      setStatus('Thinking...'); // Reset status for LLM generation

      // 2. Call DeepSeek API with streaming
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemContext },
            ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content }
          ],
          stream: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      if (!response.body) throw new Error('ReadableStream not supported');

      // Create placeholder assistant message
      const assistantMsgId = (Date.now() + 1).toString();
      const assistantMsg: AgentMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        citations: citations.length > 0 ? citations : undefined,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              const content = data.choices[0]?.delta?.content || '';
              if (content) {
                accumulatedContent += content;
                setMessages(prev => prev.map(msg =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                ));
              }
            } catch (e) {
              console.warn('Error parsing SSE message', e);
            }
          }
        }
      }

    } catch (error: any) {
      console.error('Agent Error:', error);
      const errorMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message}. Please check your API key and try again.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  };

  return {
    apiKey,
    saveApiKey,
    deleteApiKey,
    messages,
    isLoading,
    status,
    searchResults,
    sendMessage,
    clearMessages
  };
}
