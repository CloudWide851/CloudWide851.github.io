import { parseMarkdown, extractSlugFromFileName } from './markdown';
import type { BlogPost } from '@/types/blog';

/**
 * Load all blog posts
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    // Recursive glob to support series subfolders
    const modules = import.meta.glob('/src/content/blog/**/*.md', {
      as: 'raw',
      eager: false
    });

    const posts: BlogPost[] = [];

    for (const path in modules) {
      try {
        const fileName = path.split('/').pop() || '';
        const slug = extractSlugFromFileName(fileName);

        // Extract series from folder path if it exists
        // Path format: /src/content/blog/[series]/[file].md or /src/content/blog/[file].md
        const pathParts = path.split('/');
        const blogIndex = pathParts.indexOf('blog');
        let series: string | undefined = undefined;

        // If there is a folder between 'blog' and the filename
        if (blogIndex !== -1 && pathParts.length > blogIndex + 2) {
           series = pathParts[blogIndex + 1];
        }

        const loader = modules[path];
        const markdownContent = await loader() as string;
        const { frontMatter, content } = parseMarkdown(markdownContent);

        // Allow frontmatter to override folder-based series
        if (frontMatter.series) {
            series = frontMatter.series;
        }

        // Assign default covers based on tags or content
        if (!frontMatter.cover) {
          if (series?.includes('C Language') || frontMatter.tags?.includes('C')) {
            frontMatter.cover = 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2070&auto=format&fit=crop';
          } else if (frontMatter.tags?.includes('React') || frontMatter.tags?.includes('Web')) {
            frontMatter.cover = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop';
          } else if (frontMatter.tags?.includes('AI') || frontMatter.tags?.includes('Agent')) {
            frontMatter.cover = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop';
          } else {
            // Generic tech background
            frontMatter.cover = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop';
          }
        }

        posts.push({
          slug,
          series,
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
    const modules = import.meta.glob('/src/content/blog/**/*.md', {
      as: 'raw',
      eager: false
    });

    for (const path in modules) {
      const fileName = path.split('/').pop() || '';
      const postSlug = extractSlugFromFileName(fileName);

      if (postSlug === slug) {
        // Extract series logic (same as above)
        const pathParts = path.split('/');
        const blogIndex = pathParts.indexOf('blog');
        let series: string | undefined = undefined;
        if (blogIndex !== -1 && pathParts.length > blogIndex + 2) {
           series = pathParts[blogIndex + 1];
        }

        const loader = modules[path];
        const markdownContent = await loader() as string;
        const { frontMatter, content } = parseMarkdown(markdownContent);

        if (frontMatter.series) {
            series = frontMatter.series;
        }

        return {
          slug: postSlug,
          series,
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
