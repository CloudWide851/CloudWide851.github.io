import { motion } from 'framer-motion';
import { Loader2, ExternalLink, Search, BrainCircuit } from 'lucide-react';
import type { AgentMessage } from './types';

interface SearchProgressCardsProps {
  searchProgress: AgentMessage['searchProgress'];
}

export function SearchProgressCards({ searchProgress }: SearchProgressCardsProps) {
  if (!searchProgress) return null;

  const { stage, query, discoveredUrls, thoughts } = searchProgress;

  return (
    <div className="space-y-3 my-3 w-full">
      {/* Stage Indicator */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full w-fit">
        {stage === 'searching' && <Loader2 className="animate-spin text-blue-500" size={14} />}
        {stage === 'exploring' && <Search className="animate-pulse text-purple-500" size={14} />}
        {stage === 'synthesizing' && <BrainCircuit className="text-green-500" size={14} />}
        {stage === 'thinking' && <Loader2 className="animate-spin text-gray-500" size={14} />}

        <span>
          {stage === 'thinking' && 'Thinking...'}
          {stage === 'searching' && `Searching: "${query}"`}
          {stage === 'exploring' && 'Analyzing results...'}
          {stage === 'synthesizing' && 'Synthesizing answer...'}
        </span>
      </div>

      {/* Agent Thoughts (Google Deep Research style) */}
      {thoughts && thoughts.length > 0 && (
        <div className="text-xs space-y-1 pl-1 border-l-2 border-gray-200 dark:border-zinc-700 ml-1">
          {thoughts.map((thought, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-gray-500 dark:text-gray-400 italic flex items-start gap-1"
            >
              <span className="opacity-50">→</span> {thought}
            </motion.div>
          ))}
        </div>
      )}

      {/* Discovered URLs (Kimi-style cards) */}
      {discoveredUrls && discoveredUrls.length > 0 && (
        <motion.div
          className="grid gap-2"
          variants={{
            show: { transition: { staggerChildren: 0.15 } }
          }}
          initial="hidden"
          animate="show"
        >
          {discoveredUrls.map((url, i) => {
            let hostname = url;
            try {
              hostname = new URL(url).hostname.replace('www.', '');
            } catch (e) { /* ignore invalid urls */ }

            return (
              <motion.a
                key={`${url}-${i}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 }
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl border
                  bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md
                  hover:bg-white/80 hover:dark:bg-zinc-700/80
                  border-gray-200 dark:border-zinc-700/50
                  hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-lg text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <ExternalLink size={14} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Source {i + 1}</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 truncate font-medium">
                    {hostname}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
