import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, ArrowRight, Filter } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { loadBlogPosts } from '@/utils/blog';

export default function BlogArchive() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    async function fetchPosts() {
      const data = await loadBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Extract unique series and tags
  const allSeries = useMemo(() => {
    const seriesSet = new Set<string>();
    posts.forEach(post => {
      if (post.series) seriesSet.add(post.series);
    });
    return Array.from(seriesSet).sort();
  }, [posts]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.frontMatter.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.frontMatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontMatter.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeries = selectedSeries === '' || post.series === selectedSeries;
      const matchesTag = selectedTag === '' || post.frontMatter.tags?.includes(selectedTag);

      return matchesSearch && matchesSeries && matchesTag;
    });
  }, [posts, searchQuery, selectedSeries, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/blog"
                className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                title="Back to Blog Home"
              >
                <ArrowLeft size={20} />
              </Link>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                <Filter size={14} />
                <span className="hidden sm:inline">Filters:</span>
              </div>

              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-900 hover:border-gray-300 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="">All Series</option>
                {allSeries.map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-900 hover:border-gray-300 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {(searchQuery || selectedSeries || selectedTag) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSeries('');
                    setSelectedTag('');
                  }}
                  className="px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
          <div className="text-sm text-gray-500">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden bg-gray-100 border-b border-gray-100">
                  {post.frontMatter.cover ? (
                    <img
                      src={post.frontMatter.cover}
                      alt={post.frontMatter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-gray-300">
                       <span className="text-4xl font-bold opacity-20">Blog</span>
                    </div>
                  )}
                  {post.series && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-gray-800 shadow-sm border border-white/50 tracking-wide uppercase">
                      {post.series}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(post.frontMatter.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    {post.frontMatter.tags?.[0] && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-sans">
                        #{post.frontMatter.tags[0]}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                    {post.frontMatter.title}
                  </h2>

                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
                    {post.frontMatter.description}
                  </p>

                  <div className="flex items-center text-xs font-bold text-gray-900 group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-50">
                    READ ARTICLE <ArrowRight size={12} className="ml-1 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSeries('');
                setSelectedTag('');
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
