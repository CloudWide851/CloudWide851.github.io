import { ExternalLink } from 'lucide-react';
import type { SearchResult } from './types';
import { cn } from '@/lib/utils';

interface SearchResultsPreviewProps {
  results: SearchResult[];
}

export default function SearchResultsPreview({ results }: SearchResultsPreviewProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto pb-2 pt-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex gap-3 min-w-max">
        {results.map((result, idx) => (
          <a
            key={idx}
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-col w-60 p-3 rounded-xl border border-white/40",
              "bg-white/60 backdrop-blur-md hover:bg-white/80 transition-all",
              "cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5",
              "border-slate-200 bg-slate-50/50" // Fallback / Light mode tint
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                <ExternalLink size={10} />
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider truncate flex-1">
                {new URL(result.url).hostname.replace('www.', '')}
              </span>
            </div>
            <h4 className="text-xs font-semibold text-slate-800 mb-1 line-clamp-1">
              {result.title}
            </h4>
            <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed">
              {result.snippet}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
