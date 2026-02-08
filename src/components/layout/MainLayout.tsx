import { Link, Outlet, useLocation } from 'react-router-dom';
import { Icons } from '@/components/ui/Icons';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

import FloatingContactButton from '@/components/common/FloatingContactButton';

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
    { name: t('nav.home'), href: '/', icon: Icons.Home },
    { name: t('nav.about'), href: '/about', icon: Icons.User },
    { name: t('nav.blog'), href: '/blog', icon: Icons.Blog },
    { name: t('nav.projects'), href: '/projects', icon: Icons.Project },
    { name: t('nav.lab'), href: '/lab', icon: Icons.Lab },
  ];

  const sidebarWidth = isSidebarCollapsed ? 'w-16' : 'w-64';

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans text-gray-900">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl border-r border-gray-100 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <Link to="/" className="font-bold text-xl text-gray-900 flex items-center gap-2">
                    <Icons.Logo size={28} className="text-gray-900" />
                    <span>CloudWide851</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
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
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Icons.Github size={20} />
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
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-[#FAFAFA] border-r border-gray-200 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-hidden",
          sidebarWidth
        )}
      >
        {/* Sidebar Header with Toggle */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-gray-100 transition-all duration-300",
          isSidebarCollapsed ? "justify-center px-0" : "justify-between"
        )}>
          <Link to="/" className={cn("flex items-center gap-3 overflow-hidden transition-all", isSidebarCollapsed ? "hidden" : "flex")}>
            <Icons.Logo size={24} className="text-gray-900" />
            <span className="font-bold text-base text-gray-900 tracking-tight">
              CloudWide851
            </span>
          </Link>

          {/* Toggle Button moved to header */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={cn(
              "p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200",
              isSidebarCollapsed ? "mx-auto" : ""
            )}
            title={isSidebarCollapsed ? "Expand" : "Collapse"}
          >
            <Icons.Menu size={18} />
          </button>
        </div>

        {/* Collapsed Logo (when header hides it) */}
        {isSidebarCollapsed && (
          <div className="h-16 flex items-center justify-center absolute top-0 left-0 w-full pointer-events-none">
             {/* Icon handled by the button above in this layout, or we can separate them */}
          </div>
        )}

        <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-white shadow-sm border border-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900",
                  isSidebarCollapsed ? "justify-center px-2" : ""
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "transition-colors flex-shrink-0",
                    isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                <span className={cn(
                  "whitespace-nowrap transition-all duration-300 origin-left",
                   isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
                )}>
                  {item.name}
                </span>

                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl translate-x-1">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100 bg-[#FAFAFA]">
          <a
            href="https://github.com/CloudWide851"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-white hover:shadow-sm hover:border-gray-100 border border-transparent transition-all duration-200",
              isSidebarCollapsed ? "justify-center px-2" : ""
            )}
            title="GitHub"
          >
            <Icons.Github size={20} />
            <span className={cn(
              "whitespace-nowrap transition-all duration-300",
               isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            )}>
              GitHub
            </span>
          </a>

          <div className={cn(
            "mt-2 pt-2 border-t border-gray-100 transition-all duration-300",
            isSidebarCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
             <LanguageSwitcher />
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
        "lg:ml-64",
        isSidebarCollapsed && "lg:ml-16"
      )}>
        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 lg:hidden">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Icons.Menu size={24} />
            </button>
            <span className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Icons.Logo size={20} />
              CloudWide851
            </span>
            <div className="w-10" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 md:p-10 overflow-x-hidden max-w-[1600px] mx-auto w-full relative">
          <Outlet />
        </main>

        <footer className="border-t border-gray-100 mt-auto py-8 px-6">
          <div className="text-center text-gray-400 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </footer>

        <FloatingContactButton />
      </div>
    </div>
  );
}
