import type { SearchResult } from '../types';

/**
 * Mock search tool that returns dummy results if no real API key is available
 * In a real production app, this would call a search API like SerpAPI, Bing, or Google Custom Search
 */
export async function searchWeb(query: string): Promise<SearchResult[]> {
  console.log(`Searching web for: ${query}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock results for demonstration purposes
  // In a real implementation, you would use fetch() to call a search API
  return [
    {
      title: `${query} - Official Documentation`,
      url: `https://example.com/docs/${query.toLowerCase().replace(/\s+/g, '-')}`,
      snippet: `Official documentation for ${query}. Comprehensive guide, API references, and tutorials for developers.`
    },
    {
      title: `Understanding ${query} in 2024`,
      url: `https://techblog.example.com/${query.toLowerCase().replace(/\s+/g, '-')}-guide`,
      snippet: `A deep dive into ${query} and its ecosystem. Learn about the latest features, best practices, and performance tips.`
    },
    {
      title: `${query} vs Competitors`,
      url: `https://comparisons.example.com/${query.toLowerCase()}-vs-others`,
      snippet: `Detailed comparison between ${query} and other similar tools in the market. Pros, cons, and benchmarks.`
    }
  ];
}
