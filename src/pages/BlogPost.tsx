import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadBlogPost } from '@/utils/blog';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import type { BlogPost as BlogPostType } from '@/types/blog';
import { ArrowLeft, Calendar, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogPost() {
  const { t } = useTranslation('blog');
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      setLoading(true);
      const data = await loadBlogPost(slug);
      setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('notFound')}</h1>
        <Link to="/blog" className="text-primary-600 hover:underline">
          {t('back')}
        </Link>
      </div>
    );
  }

  return (
    <article className="container-custom py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> {t('back')}
        </Link>
        {post.series && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
            <Layers size={14} className="text-primary-600" />
            <span className="font-semibold">{post.series}</span> Series
          </div>
        )}
      </div>

      <header className="mb-10 text-center">
        {post.frontMatter.tags && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {post.frontMatter.tags.map(tag => (
              <span key={tag} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 font-display leading-tight">
          {post.frontMatter.title}
        </h1>

        <div className="flex items-center justify-center text-gray-500 space-x-4 text-sm">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <time>{new Date(post.frontMatter.date).toLocaleDateString()}</time>
          </div>
          {post.frontMatter.author && (
            <div className="flex items-center">
              <span>{t('by')} <span className="text-gray-900 font-medium">{post.frontMatter.author}</span></span>
            </div>
          )}
        </div>
      </header>

      {post.frontMatter.cover && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={post.frontMatter.cover}
            alt={post.frontMatter.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 prose-lg">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}
