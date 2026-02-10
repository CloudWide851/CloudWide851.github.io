import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { practiceProblems } from '@/data/practiceProblems';
import type { PracticeProblem, Difficulty } from '@/data/practiceProblems';
import CodeRunner from '@/components/blog/CodeRunner'; // We'll reuse the improved CodeRunner or a variation

export default function CodePracticePage() {
  const { t } = useTranslation('lab');
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem>(practiceProblems[0]);

  // Reset code when problem changes
  useEffect(() => {
    // Logic handled by key prop on CodeRunner
  }, [selectedProblem]);

  const difficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900';
      case 'hard': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900';
    }
  };

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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 overflow-hidden flex flex-col md:flex-row gap-6">

        {/* Sidebar: Problem List */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4 overflow-hidden">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 flex-1 flex flex-col overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 font-bold text-gray-700 dark:text-gray-200">
              Problems
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {practiceProblems.map(problem => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-lg flex items-center justify-between transition-colors",
                    selectedProblem.id === problem.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50"
                      : "hover:bg-gray-50 dark:hover:bg-zinc-800 border border-transparent"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className={cn("font-medium truncate", selectedProblem.id === problem.id ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300")}>
                      {problem.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 flex gap-2">
                      <span className={cn("capitalize", difficultyColor(problem.difficulty).split(' ')[0])}>
                        {problem.difficulty}
                      </span>
                      <span>•</span>
                      <span>{problem.category}</span>
                    </div>
                  </div>
                  {selectedProblem.id === problem.id && <ChevronRight size={16} className="text-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor & Description */}
        <div className="flex-1 flex flex-col min-w-0 gap-6 overflow-y-auto">

          {/* Problem Description */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProblem.title}</h2>
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border", difficultyColor(selectedProblem.difficulty))}>
                {selectedProblem.difficulty}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {selectedProblem.description}
            </p>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Test Cases</h3>
              <div className="grid gap-3">
                {selectedProblem.testCases.map((test, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 text-sm font-mono border border-gray-100 dark:border-zinc-800 flex gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">Input</div>
                      <div className="text-gray-800 dark:text-gray-200">{test.input || "(Empty)"}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">Expected Output</div>
                      <div className="text-gray-800 dark:text-gray-200">{test.expectedOutput}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
             {/* We'll use the modified CodeRunner here, but we need to inject the WASM logic later */}
             {/* For now, just rendering the CodeRunner in 'controlled' mode if possible, or we might need to modify it to accept external state */}
             {/* Actually, CodeRunner manages its own state. Let's modify CodeRunner to be more flexible or wrap it here. */}
             {/* Given the plan to overhaul CodeRunner for WASM, let's place a placeholder here that will be the "WASM Runner" */}
             <CodeRunner
                key={selectedProblem.id} // Force reset on problem change
                initialCode={selectedProblem.initialCode}
                language="c"
             />
          </div>

        </div>
      </main>
    </div>
  );
}
