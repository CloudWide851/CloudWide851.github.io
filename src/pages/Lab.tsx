import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { labExperiments, Experiment } from '@/data/labExperiments';

interface ExperimentCardProps {
  experiment: Experiment;
}

function ExperimentCard({ experiment }: ExperimentCardProps) {
  const { t } = useTranslation('lab');
  const Icon = experiment.icon;

  // Use translation key if available, otherwise fallback to default
  const title = t(experiment.titleKey, experiment.defaultTitle);
  const description = t(experiment.descriptionKey, experiment.defaultDescription);

  return (
    <Link to={experiment.link} className="block h-full">
      <div className="bg-gray-50/50 h-full rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-200/50 hover:bg-white group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white text-gray-700 rounded-xl shadow-sm border border-gray-100 group-hover:text-primary-600 group-hover:border-primary-100 transition-colors">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <div className="p-2 rounded-full text-gray-300 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all">
               <ArrowRight size={20} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors tracking-tight">
            {title}
          </h2>
          <p className="text-gray-500 mb-6 line-clamp-2 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {experiment.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-[10px] uppercase tracking-wider rounded-full font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Lab() {
  const { t } = useTranslation('lab');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiments = useMemo(() => {
    if (!searchQuery.trim()) return labExperiments;

    const fuse = new Fuse(labExperiments, {
      keys: ['defaultTitle', 'defaultDescription', 'tags'],
      threshold: 0.3,
    });

    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12 max-w-6xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl font-light">
              {t('description')}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-80 relative"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400"
                placeholder="Search experiments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-white">
                  /
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiments.map((experiment) => (
              <motion.div
                key={experiment.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ExperimentCard experiment={experiment} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredExperiments.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No experiments found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
}

