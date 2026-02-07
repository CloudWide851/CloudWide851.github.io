export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: string[]; // URLs
  timestamp: number;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export const STORAGE_KEY_API_KEY = 'deepseek_api_key';
