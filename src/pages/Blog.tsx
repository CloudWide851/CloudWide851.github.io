import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '@/utils/blog';
import type { BlogPost } from '@/types/blog';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Layers } from 'lucide-react';

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-lg shadow-gray-200"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  // Separate the first post as featured and limit recent posts
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4); // Only show next 3 posts

  return (
    <div className="max-w-6xl mx-auto py-12 lg:py-20 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 md:mb-24 text-center md:text-left border-b border-gray-100 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
            Thoughts, tutorials, and insights on software engineering, design, and the future of AI.
          </p>
        </div>
        <div className="flex md:hidden justify-center w-full">
          <Link
            to="/blog/all"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all shadow-lg shadow-gray-200 hover:shadow-xl w-full justify-center sm:w-auto"
          >
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            to="/blog/all"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all shadow-lg shadow-gray-200 hover:shadow-xl"
          >
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24"
        >
          <Link to={`/blog/${featuredPost.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] shadow-sm group-hover:shadow-md transition-all">
              {featuredPost.frontMatter.cover ? (
                <img
                  src={featuredPost.frontMatter.cover}
                  alt={featuredPost.frontMatter.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
              {featuredPost.series && (
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 border border-gray-200/50 shadow-sm flex items-center gap-1.5">
                   <Layers size={12} className="text-primary-600" />
                   {featuredPost.series} Series
                 </div>
              )}
            </div>

            <div className="md:p-4">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(featuredPost.frontMatter.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  5 min read
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                {featuredPost.frontMatter.title}
              </h2>

              <p className="text-gray-500 text-lg mb-8 leading-relaxed line-clamp-3">
                {featuredPost.frontMatter.description}
              </p>

              <div className="flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all">
                Read Article <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid of other posts */}
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
          >
            <Link to={`/blog/${post.slug}`} className="group block h-full flex flex-col relative">
              <div className="mb-6 overflow-hidden rounded-xl bg-gray-100 aspect-[3/2] border border-gray-100/50 relative">
                {post.frontMatter.cover ? (
                  <img
                    src={post.frontMatter.cover}
                    alt={post.frontMatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50" />
                )}
                 {post.series && (
                   <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-800 border border-gray-100 shadow-sm flex items-center gap-1">
                     <Layers size={10} className="text-primary-500" />
                     {post.series}
                   </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mb-3 font-mono">
                  <span>{new Date(post.frontMatter.date).toLocaleDateString()}</span>
                  {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-gray-500">{post.frontMatter.tags[0]}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                  {post.frontMatter.title}
                </h3>

                <p className="text-gray-500 line-clamp-3 mb-4 text-sm leading-relaxed flex-grow">
                  {post.frontMatter.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">{t('empty')}</p>
        </div>
      )}
    </div>
  );
}