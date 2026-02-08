import FuzzySearch from '@/components/lab/FuzzySearch/FuzzySearch';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FuzzySearchPage() {
  const { t } = useTranslation('lab');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-50 to-white z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30" />

      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between relative z-10">
        <Link
          to="/lab"
          className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium text-sm">{t('back')}</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
          <Command size={14} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Command Palette</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 flex flex-col items-center pt-16 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-50 mb-6">
            <Search className="w-8 h-8 text-indigo-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('experiments.fuzzySearch.title')}
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
            {t('experiments.fuzzySearch.description')}
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-medium text-gray-400">
             <div className="flex items-center gap-1.5">
               <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-gray-500 font-mono">↑↓</kbd>
               <span>Navigate</span>
             </div>
             <div className="flex items-center gap-1.5">
               <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-gray-500 font-mono">Enter</kbd>
               <span>Select</span>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full"
        >
           {/* We'll wrap the component to control its shadow/border */}
           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <FuzzySearch />
              </div>
           </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['Fast', 'Typo-tolerant', 'Score-based', 'Highlighting'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-400 rounded-full text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </main>
    </div>
  );
}