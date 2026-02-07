import { useAgent } from './hooks/useAgent';
import ChatInterface from './ChatInterface';
import SettingsPanel from './SettingsPanel';

export default function AgentExperiment() {
  const { apiKey, saveApiKey, deleteApiKey, messages, isLoading, status, sendMessage } = useAgent();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <SettingsPanel
        apiKey={apiKey}
        onSave={saveApiKey}
        onDelete={deleteApiKey}
      />
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        status={status}
        onSendMessage={sendMessage}
        hasApiKey={!!apiKey}
      />
    </div>
  );
}
