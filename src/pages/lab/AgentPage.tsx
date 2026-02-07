import AgentExperiment from '@/components/lab/Agent/AgentExperiment';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgentPage() {
  const { t } = useTranslation('lab');

  return (
    <div className="container-custom py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/lab" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> {t('back')}
        </Link>
        <h1 className="text-3xl font-bold mb-2">{t('experiments.agent.title')}</h1>
        <p className="text-gray-600">{t('experiments.agent.description')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <AgentExperiment />
      </div>
    </div>
  );
}
