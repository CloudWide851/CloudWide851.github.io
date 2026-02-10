import { useState, useEffect } from 'react';
import type { AgentMessage, SearchResult } from '../types';
import { STORAGE_KEY_API_KEY, STORAGE_KEY_CONVERSATIONS } from '../types';
import { searchWeb } from '../tools/searchTool';

const SYSTEM_PROMPT = `You are a helpful AI assistant powered by DeepSeek.
You have access to a web search tool.
To search the web, output specific XML tags: <search><query>your search terms</query></search>.
I will intercept these tags, perform the search, and provide you with the results.
After you receive the results, use them to answer the user's question.
Always cite your sources using markdown links like [1](url).
Current Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

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

  const processResponse = async (currentMessages: AgentMessage[], currentHistory: any[]) => {
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: currentHistory,
          stream: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      if (!response.body) throw new Error('ReadableStream not supported');

      // Create placeholder assistant message
      const assistantMsgId = Date.now().toString();
      const assistantMsg: AgentMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
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

      // Check for search tags in the final response
      const searchMatch = accumulatedContent.match(/<search>\s*<query>(.*?)<\/query>\s*<\/search>/s);
      if (searchMatch) {
        const query = searchMatch[1].trim();
        setStatus(`Searching for: ${query}...`);

        // Force a small delay to update UI
        await new Promise(r => setTimeout(r, 100));

        const results = await searchWeb(query);

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

        // Prepare search result context
        let searchContext = `\n\nSearch Results for "${query}":\n`;
        if (validResults.length > 0) {
            validResults.forEach((result, index) => {
                searchContext += `[${index + 1}] Title: ${result.title}\nURL: ${result.url}\nSnippet: ${result.snippet}\n\n`;
            });
        } else {
            searchContext += "No relevant results found.\n";
        }

        // Prepare next history:
        // 1. The original system prompt & user history
        // 2. The assistant's request (accumulatedContent)
        // 3. The search results as a system message
        const nextHistory = [
          ...currentHistory,
          { role: 'assistant', content: accumulatedContent },
          { role: 'system', content: searchContext }
        ];

        // Recursive call to process the answer
        setStatus('Synthesizing answer...');
        await processResponse([...currentMessages, assistantMsg], nextHistory);
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
    }
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

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    setStatus('Thinking...');
    setSearchResults([]);

    try {
      const history = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content }
      ];

      await processResponse(newMessages, history);

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
