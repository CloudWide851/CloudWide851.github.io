import { useState, useEffect } from 'react';
import type { AgentMessage } from '../types';
import { STORAGE_KEY_API_KEY } from '../types';
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

  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY_API_KEY);
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(STORAGE_KEY_API_KEY, key);
  };

  const deleteApiKey = () => {
    setApiKey('');
    localStorage.removeItem(STORAGE_KEY_API_KEY);
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

    try {
      // 1. Check if search is needed (Mock logic: always search for "what", "who", "when", "latest")
      // In a real agent, we would ask the LLM to decide
      const shouldSearch = /what|who|when|where|why|how|latest|current|news/i.test(content);

      let systemContext = SYSTEM_PROMPT;
      let citations: string[] = [];

      if (shouldSearch) {
        setStatus('Searching the web...');
        const searchResults = await searchWeb(content);

        // Add search results to context
        systemContext += `\n\nSearch Results for "${content}":\n`;
        searchResults.forEach((result, index) => {
          systemContext += `[${index + 1}] Title: ${result.title}\nURL: ${result.url}\nSnippet: ${result.snippet}\n\n`;
          citations.push(result.url);
        });
      }

      setStatus('Thinking...');

      // 2. Call DeepSeek API
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
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiContent = data.choices[0].message.content;

      const assistantMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        citations: citations.length > 0 ? citations : undefined,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
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
    sendMessage
  };
}
