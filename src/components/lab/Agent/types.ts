export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: string[]; // URLs
  timestamp: number;

  // Search progress tracking
  searchProgress?: {
    stage: 'thinking' | 'searching' | 'exploring' | 'synthesizing';
    query?: string;
    results?: SearchResult[];
    thoughts?: string[]; // Agent's reasoning steps
    discoveredUrls?: string[]; // URLs as they're found
  };
}

export const STORAGE_KEY_API_KEY = 'deepseek_api_key';
export const STORAGE_KEY_CONVERSATIONS = 'web-search-agent-conversations';
