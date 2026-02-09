import { useState } from 'react';
import { Settings, Trash2, Key } from 'lucide-react';
import { useAgent } from './hooks/useAgent';
import ChatInterface from './ChatInterface';
import SettingsPanel from './SettingsPanel';
import SearchResultsPreview from './SearchResultsPreview';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export default function AgentExperiment() {
  const {
    apiKey,
    saveApiKey,
    deleteApiKey,
    messages,
    isLoading,
    status,
    sendMessage,
    searchResults,
    clearMessages
  } = useAgent();

  const { t: _t } = useTranslation('lab');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        status={status}
        onSendMessage={sendMessage}
        hasApiKey={!!apiKey}
      />

      {/* Footer Section */}
      <div className="flex flex-col gap-3">
        {/* Search Results (if any) */}
        {searchResults.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
             <SearchResultsPreview results={searchResults} />
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex items-center justify-between px-2 py-2 bg-gray-50/50 rounded-lg border border-gray-100">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors",
              showSettings
                ? "bg-gray-200 text-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {apiKey ? (
              <>
                <div className="relative">
                  <Key size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                </div>
                <span className="font-medium">API Key Configured</span>
              </>
            ) : (
              <>
                <Settings size={16} />
                <span>Configure API Key</span>
              </>
            )}
          </button>

          <button
            onClick={clearMessages}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={16} />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Collapsible Settings Panel */}
        {showSettings && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <SettingsPanel
              apiKey={apiKey}
              onSave={saveApiKey}
              onDelete={deleteApiKey}
            />
          </div>
        )}
      </div>
    </div>
  );
}
