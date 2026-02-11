import type { SearchResult } from '../types';

/**
 * Search the web using DuckDuckGo Instant Answer API via a CORS proxy.
 * This is a free solution that doesn't require an API key.
 * Now supports multiple fallback proxies and timeouts for better reliability.
 */
export async function searchWeb(query: string): Promise<SearchResult[]> {
  console.log(`Searching web for: ${query}`);

  // List of CORS proxies to try in order
  const proxies = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
  ];

  const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;

  for (const proxy of proxies) {
    try {
      const proxyUrl = `${proxy}${encodeURIComponent(ddgUrl)}`;

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`Proxy ${proxy} returned ${response.status}`);
        continue; // Try next proxy
      }

      const data = await response.json();

      // Parse content based on proxy response format
      let ddgData;
      if (data.contents) {
        // allorigins format
        ddgData = JSON.parse(data.contents);
      } else {
        // other proxies might return direct JSON
        ddgData = data;
      }

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

      // If we have results, return them immediately
      if (results.length > 0) {
        console.log(`Found ${results.length} results via ${proxy}`);
        return results;
      }

      console.warn(`Proxy ${proxy} returned no results`);

    } catch (error: any) {
      console.warn(`Proxy ${proxy} failed:`, error.message);
      // Continue to next proxy
    }
  }

  // If we get here, all proxies failed or returned no results
  console.error('All search proxies failed or returned no results');
  return [];
}
