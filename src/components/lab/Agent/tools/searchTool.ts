import type { SearchResult } from '../types';

/**
 * Search the web using DuckDuckGo Instant Answer API via a CORS proxy.
 * This is a free solution that doesn't require an API key.
 */
export async function searchWeb(query: string): Promise<SearchResult[]> {
  console.log(`Searching web for: ${query}`);

  try {
    // DuckDuckGo API endpoint
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
    // Use allorigins.win as CORS proxy
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }

    const data = await response.json();
    const ddgData = JSON.parse(data.contents);

    const results: SearchResult[] = [];

    // 1. Add Abstract (Main Result) if available
    if (ddgData.AbstractURL) {
      results.push({
        title: ddgData.Heading || query,
        url: ddgData.AbstractURL,
        snippet: ddgData.Abstract || ddgData.AbstractText
      });
    }

    // 2. Add Related Topics
    if (ddgData.RelatedTopics && Array.isArray(ddgData.RelatedTopics)) {
      ddgData.RelatedTopics.slice(0, 4).forEach((topic: any) => {
        // Skip topics that are just lists of links (DuckDuckGo sometimes returns these)
        if (topic.FirstURL && topic.Text && !topic.Topics) {
          results.push({
            title: topic.Text.split(' - ')[0],
            url: topic.FirstURL,
            snippet: topic.Text
          });
        }
      });
    }

    // If we have results, return them
    if (results.length > 0) {
      return results;
    }

    // If no results found, return empty array (no mock fallback)
    console.warn('No results found from DuckDuckGo');
    return [];

  } catch (error) {
    console.error('Search failed:', error);
    // Return empty array on error instead of mock data
    return [];
  }
}
