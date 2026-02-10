import { ExternalLink } from 'lucide-react';
import type { SearchResult } from './types';
import { cn } from '@/lib/utils';

interface SearchResultsPreviewProps {
  results: SearchResult[];
}

export default function SearchResultsPreview({ results }: SearchResultsPreviewProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="w-full pb-2 pt-2 px-1">
      <div className="flex flex-col gap-2 w-full">
        {results.map((result, idx) => (
          <a
            key={idx}
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-col w-full p-3 rounded-xl border border-white/40",
              "bg-white/60 dark:bg-zinc-800/80 backdrop-blur-md hover:bg-white/80 dark:hover:bg-zinc-800 transition-all",
              "cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5",
              "border-slate-200 dark:border-zinc-700 bg-slate-50/50 dark:bg-zinc-900/50"
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <ExternalLink size={10} />
              </div>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate flex-1">
                {(() => {
                  try {
                    return new URL(result.url).hostname.replace('www.', '');
                  } catch {
                    return 'URL';
                  }
                })()}
              </span>
            </div>
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 line-clamp-1">
              {result.title}
            </h4>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {result.snippet}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
