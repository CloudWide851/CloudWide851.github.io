import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Github,
  Home,
  User,
  BookOpen,
  FolderGit2,
  FlaskConical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.about'), href: '/about', icon: User },
    { name: t('nav.blog'), href: '/blog', icon: BookOpen },
    { name: t('nav.projects'), href: '/projects', icon: FolderGit2 },
    { name: t('nav.lab'), href: '/lab', icon: FlaskConical },
  ];

  const sidebarWidth = isSidebarCollapsed ? 'w-20' : 'w-64';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <Link to="/" className="font-bold text-xl text-primary-600 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      C
                    </div>
                    <span>CloudWide851</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <item.icon size={20} />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-4 border-t border-gray-100">
                  <a
                    href="https://github.com/CloudWide851"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          sidebarWidth
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-gray-100">
          <Link to="/" className={cn("flex items-center gap-3 overflow-hidden transition-all", isSidebarCollapsed ? "justify-center w-full" : "")}>
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
              C
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                CloudWide851
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isSidebarCollapsed ? "justify-center" : ""
                )}
                title={isSidebarCollapsed ? item.name : undefined}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary-600" : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                {!isSidebarCollapsed && (
                  <span>{item.name}</span>
                )}

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <a
            href="https://github.com/CloudWide851"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors",
              isSidebarCollapsed ? "justify-center" : ""
            )}
            title={isSidebarCollapsed ? "GitHub" : undefined}
          >
            <Github size={20} />
            {!isSidebarCollapsed && <span className="text-sm font-medium">GitHub</span>}
          </a>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn(
              "mt-2 flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors w-full",
              isSidebarCollapsed ? "justify-center" : ""
            )}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!isSidebarCollapsed && <span className="text-xs font-medium">Collapse</span>}
          </button>

          <div className={cn("mt-2 pt-2 border-t border-gray-100", isSidebarCollapsed && "hidden")}>
             <LanguageSwitcher />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
        "lg:ml-64", // Default margin matches expanded sidebar
        isSidebarCollapsed && "lg:ml-20" // Reduced margin when collapsed
      )}>
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 lg:hidden">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg text-gray-900">CloudWide851</span>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto py-6 px-4">
          <div className="text-center text-gray-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </footer>
      </div>
    </div>
  );
}
