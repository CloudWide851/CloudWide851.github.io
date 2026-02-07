import { Link } from 'react-router-dom';
import { ArrowRight, Code, BookOpen, FlaskConical } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-custom py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Hi, I'm <span className="text-primary-600">CloudWide851</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10">
            Developer, Explorer, and Creator. Building digital experiences and experimenting with new technologies.
          </p>
          <div className="flex gap-4">
            <Link to="/projects" className="btn-primary flex items-center gap-2">
              View My Work <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors">
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-6 text-primary-600">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Projects</h3>
            <p className="text-gray-600 mb-4">
              A collection of my coding projects, from web applications to open source contributions.
            </p>
            <Link to="/projects" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              Explore Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-6 text-green-600">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Blog</h3>
            <p className="text-gray-600 mb-4">
              Thoughts, tutorials, and insights about software development and technology trends.
            </p>
            <Link to="/blog" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              Read Articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-6 text-purple-600">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lab</h3>
            <p className="text-gray-600 mb-4">
              Experimental features, demos, and creative coding explorations.
            </p>
            <Link to="/lab" className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              Enter Lab <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
