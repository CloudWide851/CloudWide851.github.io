import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '首页', href: '/' },
    { name: '关于我', href: '/about' },
    { name: '博客', href: '/blog' },
    { name: '项目', href: '/projects' },
    { name: '实验室', href: '/lab' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container-custom mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-primary-600">
                CloudWide851
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-8 sm:items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://github.com/CloudWide851"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <Github size={20} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container-custom mx-auto py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CloudWide851. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
