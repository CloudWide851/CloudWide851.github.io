import matter from 'gray-matter';
import { BlogFrontMatter } from '@/types/blog';

/**
 * 解析 Markdown 文件内容
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
 * 从文件名提取 slug
 */
export function extractSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
