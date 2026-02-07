import matter from 'gray-matter';
import type { BlogFrontMatter } from '@/types/blog';

/**
 * Parse Markdown file content
 */
export function parseMarkdown(markdownContent: string): {
  frontMatter: BlogFrontMatter;
  content: string;
} {
  const { data, content } = matter(markdownContent);
  return {
    frontMatter: data as BlogFrontMatter,
    content,
  };
}

/**
 * Extract slug from filename
 */
export function extractSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
