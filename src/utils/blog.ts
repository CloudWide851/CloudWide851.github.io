import { parseMarkdown, extractSlugFromFileName } from './markdown';
import type { BlogPost } from '@/types/blog';

/**
 * Load all blog posts
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const modules = import.meta.glob('/src/content/blog/*.md', {
      as: 'raw',
      eager: false
    });

    const posts: BlogPost[] = [];

    for (const path in modules) {
      try {
        const fileName = path.split('/').pop() || '';
        const slug = extractSlugFromFileName(fileName);
        const loader = modules[path];
        const markdownContent = await loader() as string;
        const { frontMatter, content } = parseMarkdown(markdownContent);

        posts.push({
          slug,
          frontMatter,
          content,
        });
      } catch (itemError) {
        console.error(`Error processing blog post ${path}:`, itemError);
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) =>
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Load single blog post by slug
 */
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const modules = import.meta.glob('/src/content/blog/*.md', {
      as: 'raw',
      eager: false
    });

    for (const path in modules) {
      const fileName = path.split('/').pop() || '';
      const postSlug = extractSlugFromFileName(fileName);

      if (postSlug === slug) {
        const loader = modules[path];
        const markdownContent = await loader() as string;
        const { frontMatter, content } = parseMarkdown(markdownContent);

        return {
          slug: postSlug,
          frontMatter,
          content,
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}
