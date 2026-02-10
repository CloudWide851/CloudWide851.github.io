import ChatInterface from './ChatInterface';
import SearchResultsPreview from './SearchResultsPreview';
import type { AgentMessage, SearchResult } from './types';

interface AgentExperimentProps {
  apiKey: string;
  messages: AgentMessage[];
  isLoading: boolean;
  status: string;
  sendMessage: (content: string) => Promise<void>;
  searchResults: SearchResult[];
}

export default function AgentExperiment({
  apiKey,
  messages,
  isLoading,
  status,
  sendMessage,
  searchResults
}: AgentExperimentProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        status={status}
        onSendMessage={sendMessage}
        hasApiKey={!!apiKey}
      />

      {/* Search Results (if any) */}
      {searchResults.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <SearchResultsPreview results={searchResults} />
        </div>
      )}
    </div>
  );
}
