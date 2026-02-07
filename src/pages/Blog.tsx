import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '@/utils/blog';
import type { BlogPost } from '@/types/blog';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await loadBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError(t('error'));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [t]);

  if (loading) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="animate-pulse">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block group h-full"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
              {post.frontMatter.cover && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.frontMatter.cover}
                    alt={post.frontMatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.frontMatter.date).toLocaleDateString()}
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                  {post.frontMatter.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                  {post.frontMatter.description}
                </p>
                {post.frontMatter.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.frontMatter.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          {t('empty')}
        </div>
      )}
    </div>
  );
}
