import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
import { techStackData } from '@/data/searchData';

export default function FuzzySearch() {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(techStackData, {
      keys: ['name', 'description', 'category'],
      threshold: 0.3,
      includeMatches: true
    });
  }, []);

  const results = useMemo(() => {
    if (!query) return techStackData.map(item => ({ item, matches: [] }));
    return fuse.search(query);
  }, [query, fuse]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md"
          placeholder="Search technologies (e.g., 'react', 'css', 'data')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No results found for "{query}"
          </div>
        ) : (
          results.map((result: any) => {
            const item = result.item;
            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400 text-right">
        Powered by Fuse.js • {results.length} results
      </div>
    </div>
  );
}
