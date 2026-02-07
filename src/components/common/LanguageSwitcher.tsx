import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Safely access language with fallback to 'en' to prevent crashes
  const currentLangCode = i18n.language || 'en';
  const currentLang = currentLangCode.startsWith('zh') ? '中文' : 'EN';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors w-full"
        title="Switch Language"
      >
        <Globe size={20} />
        <span className="text-sm font-medium">{currentLang}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-full mb-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <div className="py-1">
              <button
                onClick={() => toggleLanguage('en')}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between",
                  (i18n.language || 'en').startsWith('en') ? "text-primary-600 font-medium bg-primary-50" : "text-gray-700"
                )}
              >
                <span>English</span>
                {(i18n.language || 'en').startsWith('en') && <Check size={14} />}
              </button>
              <button
                onClick={() => toggleLanguage('zh')}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between",
                  (i18n.language || 'en').startsWith('zh') ? "text-primary-600 font-medium bg-primary-50" : "text-gray-700"
                )}
              >
                <span>中文</span>
                {(i18n.language || 'en').startsWith('zh') && <Check size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
