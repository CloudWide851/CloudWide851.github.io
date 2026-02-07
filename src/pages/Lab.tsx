import { motion } from 'framer-motion';
import { Search, Gamepad2, Bot, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
  link: string;
}

function ExperimentCard({ title, description, icon: Icon, tags, link }: ExperimentCardProps) {
  return (
    <Link to={link} className="block h-full">
      <div className="bg-white h-full rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md hover:border-primary-200 group">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-100 transition-colors">
              <Icon size={24} />
            </div>
            <ArrowRight size={20} className="text-gray-300 group-hover:text-primary-600 transition-colors" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
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

  return (
    <div className="container-custom py-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {t('description')}
          </p>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExperimentCard
          title={t('experiments.agent.title')}
          description={t('experiments.agent.description')}
          icon={Bot}
          tags={['AI', 'DeepSeek', 'Agent', 'Web Search']}
          link="/lab/agent"
        />

        <ExperimentCard
          title={t('experiments.fuzzySearch.title')}
          description={t('experiments.fuzzySearch.description')}
          icon={Search}
          tags={['Algorithm', 'Search', 'Fuse.js', 'Interactive']}
          link="/lab/fuzzy-search"
        />

        <ExperimentCard
          title={t('experiments.snakeGame.title')}
          description={t('experiments.snakeGame.description')}
          icon={Gamepad2}
          tags={['Game', 'Canvas API', 'React Hooks', 'Retro']}
          link="/lab/snake"
        />
      </div>
    </div>
  );
}

