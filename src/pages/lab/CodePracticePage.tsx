import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { practiceProblems } from '@/data/practiceProblems';
import type { PracticeProblem, Difficulty } from '@/data/practiceProblems';
import CodeRunner from '@/components/blog/CodeRunner';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';

export default function CodePracticePage() {
  const { t } = useTranslation('lab');
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem>(practiceProblems[0]);
  const [query, setQuery] = useState('');

  const difficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900';
      case 'hard': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900';
    }
  };

  const filteredProblems =
    query === ''
      ? practiceProblems
      : practiceProblems.filter((problem) => {
          return problem.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="h-full flex-1 bg-gray-50 dark:bg-zinc-950 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/lab"
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Code size={20} />
              </div>
              <h1 className="font-bold text-gray-900 dark:text-white">
                {t('experiments.codePractice.title', 'C Programming Practice')}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT: Description Panel */}
        <div className="w-full lg:w-1/3 flex flex-col border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto">

          {/* Problem Selector Dropdown */}
          <div className="p-4 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-20">
            <Combobox value={selectedProblem} onChange={(val) => val && setSelectedProblem(val)}>
              <div className="relative">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                  <ComboboxInput
                    className="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 dark:text-gray-100 bg-transparent focus:ring-0 focus:outline-none"
                    displayValue={(problem: PracticeProblem) => problem.title}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('experiments.codePractice.problems', 'Search problems...')}
                  />
                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronsUpDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </ComboboxButton>
                </div>
                <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                  {filteredProblems.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                      Nothing found.
                    </div>
                  ) : (
                    filteredProblems.map((problem) => (
                      <ComboboxOption
                        key={problem.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-gray-100'
                          }`
                        }
                        value={problem}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {problem.title}
                            </span>
                            <span className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-full border opacity-80",
                                active ? "border-white/50" : difficultyColor(problem.difficulty)
                              )}>
                                {t(`experiments.codePractice.difficulty.${problem.difficulty}`, problem.difficulty)}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-blue-600'
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>
            </Combobox>
          </div>

          {/* Problem Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProblem.title}</h2>
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border", difficultyColor(selectedProblem.difficulty))}>
                {t(`experiments.codePractice.difficulty.${selectedProblem.difficulty}`, selectedProblem.difficulty)}
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {selectedProblem.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                {t('experiments.codePractice.testCases', 'Test Cases')}
              </h3>
              <div className="grid gap-3">
                {selectedProblem.testCases.map((test, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 text-sm font-mono border border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1 font-sans">{t('experiments.codePractice.input', 'Input')}</div>
                      <div className="text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-gray-200 dark:border-zinc-700">
                        {test.input || <span className="text-gray-400 italic">{t('experiments.codePractice.empty', '(Empty)')}</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1 font-sans">{t('experiments.codePractice.expectedOutput', 'Expected Output')}</div>
                      <div className="text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-900 px-2 py-1 rounded border border-gray-200 dark:border-zinc-700">
                        {test.expectedOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Editor Panel */}
        <div className="w-full lg:w-2/3 flex flex-col bg-gray-50 dark:bg-zinc-950 overflow-hidden h-[500px] lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 pr-4 pb-4">
           <CodeRunner
              key={selectedProblem.id}
              initialCode={selectedProblem.initialCode}
              language="c"
              className="h-full my-0 rounded-none border-0"
           />
        </div>

      </main>
    </div>
  );
}
