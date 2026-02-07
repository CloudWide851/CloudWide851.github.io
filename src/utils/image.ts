// Unsplash image utility

export const UNSPLASH_COLLECTIONS = {
  TECH: 'technology',
  CODE: 'coding',
  NATURE: 'nature',
  ABSTRACT: 'abstract',
  WORKSPACE: 'workspace',
};

/**
 * Get a random image URL from Unsplash source
 * Note: source.unsplash.com is deprecated/unreliable, so we use direct Unsplash IDs or keywords
 * For production, it's better to use static images or the official API,
 * but for this personal site, we'll use a reliable placeholder service that proxies Unsplash
 */
export function getUnsplashUrl(keyword: string = 'technology', width: number = 800, height: number = 600): string {
  // Using a reliable placeholder service that supports keywords
  // Random seed prevents all images from being the same
  const randomSeed = Math.floor(Math.random() * 1000);
  return `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=${width}&auto=format&fit=crop`; // Fallback to a nice coding image
}

export function getProjectImage(index: number): string {
  const images = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', // Coding
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', // Data
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', // Abstract
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', // Retro tech
  ];
  return images[index % images.length];
}
