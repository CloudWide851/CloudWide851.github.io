import FuzzySearch from '@/components/lab/FuzzySearch/FuzzySearch';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FuzzySearchPage() {
  const { t } = useTranslation('lab');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between">
        <Link
          to="/lab"
          className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium text-sm">{t('back')}</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
          <Command size={14} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Command Palette</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 flex flex-col items-center pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
            <Search className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            {t('experiments.fuzzySearch.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            {t('experiments.fuzzySearch.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-indigo-100/50 border border-white/50 p-6 md:p-8"
        >
          <FuzzySearch />
        </motion.div>
      </main>
    </div>
  );
}
