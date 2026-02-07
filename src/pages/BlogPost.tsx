import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadBlogPost } from '@/utils/blog';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import type { BlogPost as BlogPostType } from '@/types/blog';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function BlogPost() {
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
    return <div className="container-custom py-12 text-center">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-primary-600 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="container-custom py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Blog
      </Link>

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

        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          {post.frontMatter.title}
        </h1>

        <div className="flex items-center justify-center text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <time>{new Date(post.frontMatter.date).toLocaleDateString()}</time>
          </div>
          {post.frontMatter.author && (
            <div className="flex items-center">
              <span>By {post.frontMatter.author}</span>
            </div>
          )}
        </div>
      </header>

      {post.frontMatter.cover && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img
            src={post.frontMatter.cover}
            alt={post.frontMatter.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}
