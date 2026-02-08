import AgentExperiment from '@/components/lab/Agent/AgentExperiment';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot, Sparkles, Zap, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AgentPage() {
  const { t } = useTranslation('lab');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAFAFA] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/lab"
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              title={t('back')}
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-lg shadow-gray-200">
                <Bot size={18} />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 leading-none">
                  {t('experiments.agent.title')}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-600">
               <Sparkles size={12} className="text-amber-500" />
               <span>DeepSeek V3</span>
             </div>
             <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
               <MessageSquare size={20} />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-6 flex flex-col h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col relative"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 opacity-20" />

          <div className="flex-1 overflow-hidden flex flex-col relative z-10">
            <AgentExperiment />
          </div>
        </motion.div>

        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Zap size={12} /> Fast Inference
          </span>
          <span>•</span>
          <span>AI generated content may be inaccurate</span>
        </div>
      </main>
    </div>
  );
}