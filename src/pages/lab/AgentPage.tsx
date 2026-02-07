import AgentExperiment from '@/components/lab/Agent/AgentExperiment';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AgentPage() {
  const { t } = useTranslation('lab');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/lab"
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              title={t('back')}
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg text-white shadow-sm">
                <Bot size={20} />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 flex items-center gap-2">
                  {t('experiments.agent.title')}
                  <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium border border-violet-200">Beta</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 hidden sm:flex">
            <Sparkles size={16} className="text-violet-500" />
            <span>Powered by DeepSeek AI</span>
          </div>
        </div>
      </header>

      {/* Main Content Area - Chat Interface */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
        >
          {/* We wrap the existing component but apply styles to make it fill the space */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <AgentExperiment />
          </div>
        </motion.div>

        <div className="mt-4 text-center text-xs text-gray-400">
          AI generated content may be inaccurate. Please verify important information.
        </div>
      </main>
    </div>
  );
}
