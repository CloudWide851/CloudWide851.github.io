import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Tag, Layers, ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { loadBlogPosts } from '@/utils/blog';
import { useEffect } from 'react';

export default function BlogArchive() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    return Array.from(seriesSet);
  }, [posts]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.frontMatter.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.frontMatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontMatter.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeries = selectedSeries === null || post.series === selectedSeries;
      const matchesTag = selectedTag === null || post.frontMatter.tags?.includes(selectedTag);

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
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/blog"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Blog Archive</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
              />
            </div>

            {/* Series Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Layers size={16} /> Series
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedSeries(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSeries === null
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Series
                </button>
                {allSeries.map(series => (
                  <button
                    key={series}
                    onClick={() => setSelectedSeries(series)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSeries === series
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {series}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag size={16} /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === null
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredPosts.length} posts
            </div>

            <div className="grid gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-full sm:h-48"
                  >
                    {/* Image */}
                    <div className="sm:w-64 relative overflow-hidden bg-gray-100">
                      {post.frontMatter.cover ? (
                        <img
                          src={post.frontMatter.cover}
                          alt={post.frontMatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                      )}
                      {post.series && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-800 shadow-sm">
                          {post.series}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.frontMatter.date).toLocaleDateString()}
                          </span>
                          {post.frontMatter.tags?.[0] && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                              {post.frontMatter.tags[0]}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                          {post.frontMatter.title}
                        </h2>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                          {post.frontMatter.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center text-xs font-medium text-gray-900 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={12} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400">No posts found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSeries(null);
                      setSelectedTag(null);
                    }}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
