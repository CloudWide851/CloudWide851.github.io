import { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertCircle, CheckCircle2, Terminal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWasmCompiler } from '@/hooks/useWasmCompiler';

interface CodeRunnerProps {
  initialCode?: string;
  language?: string;
}

export default function CodeRunner({ initialCode = '', language: _language = 'c' }: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  // Use our new WASM compiler hook
  const { isReady, error: wasmError, compileAndRun } = useWasmCompiler();

  // Update internal code state if prop changes (for CodePracticePage)
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = async () => {
    if (!isReady) {
      setOutput('Compiler is still loading... Please wait.');
      return;
    }

    setIsRunning(true);
    setStatus('running');
    setOutput('Compiling and running...');

    try {
      const result = await compileAndRun(code);

      let finalOutput = '';
      if (result.stdout) finalOutput += result.stdout;
      if (result.stderr) finalOutput += `\n${result.stderr}`;

      if (result.exitCode !== 0) {
        setStatus('error');
        // If there's no output but non-zero exit, show generic error
        if (!finalOutput) finalOutput = `Program exited with error code ${result.exitCode}`;
      } else {
        setStatus('success');
        if (!finalOutput) finalOutput = "Program exited with code 0 (No output)";
      }

      setOutput(finalOutput.trim());

    } catch (error) {
      console.error(error);
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown execution error'}`);
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setStatus('idle');
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <span className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Terminal size={12} />
            main.c
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Compiler Status Indicator */}
          <div className="flex items-center gap-1.5 mr-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800">
            {wasmError ? (
              <span className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={10} /> Compiler Error
              </span>
            ) : !isReady ? (
              <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                <Loader2 size={10} className="animate-spin" /> Loading WASM...
              </span>
            ) : (
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                <CheckCircle2 size={10} /> Compiler Ready
              </span>
            )}
          </div>

          <div className="w-px h-4 bg-gray-200 dark:bg-zinc-700 mx-1" />

          <button
            onClick={resetCode}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            title="Reset Code"
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={runCode}
            disabled={isRunning || !isReady}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              (isRunning || !isReady)
                ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"
            )}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 min-h-[300px]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Output Area */}
      <div className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-zinc-900">
          Terminal Output
          {status === 'success' && <CheckCircle2 size={12} className="text-green-500" />}
          {status === 'error' && <AlertCircle size={12} className="text-red-500" />}
        </div>
        <div className="p-4 bg-[#0f0f0f] text-green-400 font-mono text-sm min-h-[100px] max-h-[300px] overflow-y-auto whitespace-pre-wrap">
          {output || <span className="text-gray-600 dark:text-zinc-700 italic">Ready to compile. Click 'Run' to execute.</span>}
        </div>
      </div>
    </div>
  );
}
