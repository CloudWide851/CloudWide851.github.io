import { parseMarkdown, extractSlugFromFileName } from './markdown';
import type { BlogPost } from '@/types/blog';

/**
 * 加载所有博客文章
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const modules = import.meta.glob('/src/content/blog/*.md', {
    as: 'raw',
    eager: false
  });

  const posts: BlogPost[] = [];

  for (const path in modules) {
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
  }

  // 按日期排序（最新的在前）
  return posts.sort((a, b) =>
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );
}

/**
 * 根据 slug 加载单篇文章
 */
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
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
}
