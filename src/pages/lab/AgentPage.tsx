import AgentExperiment from '@/components/lab/Agent/AgentExperiment';
import SettingsPanelInline from '@/components/lab/Agent/SettingsPanelInline';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAgent } from '@/components/lab/Agent/hooks/useAgent';

export default function AgentPage() {
  const { t } = useTranslation('lab');
  const {
    apiKey,
    saveApiKey,
    deleteApiKey,
    clearMessages,
    ...experimentProps
  } = useAgent();

  return (
    <div className="h-full flex-1 bg-gradient-to-b from-gray-50 to-white flex flex-col font-sans overflow-hidden">
      {/* Header with Toolbar */}
      <header className="bg-white/50 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-20 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/lab"
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100/50 rounded-full transition-all"
              title={t('back')}
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-gray-200/50" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black text-white rounded-lg flex items-center justify-center shadow-lg shadow-gray-200">
                <Bot size={18} />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 leading-none tracking-tight">
                  {t('experiments.agent.title')}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wide">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SettingsPanelInline
              apiKey={apiKey}
              onSave={saveApiKey}
              onDelete={deleteApiKey}
            />

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear the conversation? This cannot be undone.')) {
                  clearMessages();
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-transparent hover:border-red-100 transition-all"
              title="Clear conversation"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col overflow-hidden">
        <AgentExperiment
          apiKey={apiKey}
          {...experimentProps}
        />
      </main>
    </div>
  );
}
