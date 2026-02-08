import { useState } from 'react';
import { Play, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeRunnerProps {
  initialCode?: string;
  language?: string;
}

export default function CodeRunner({ initialCode = '', language: _language = 'c' }: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  // Simple mock execution for demonstration since we don't have a real API key yet
  // In a real app, this would call Judge0 or similar API
  const runCode = async () => {
    setIsRunning(true);
    setStatus('running');
    setOutput('Compiling and running...');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock output logic based on simple content check
      let result = '';
      if (code.includes('printf("Hello, World!");')) {
        result = 'Hello, World!';
      } else if (code.includes('printf')) {
        // Extract content inside printf
        const match = code.match(/printf\("(.+)"\)/);
        result = match ? match[1] : 'Program exited with code 0';
      } else {
        result = 'Program exited with code 0 (No output)';
      }

      setOutput(result);
      setStatus('success');
    } catch (error) {
      setOutput('Error: Compilation failed.');
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
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-xs font-mono text-gray-500">main.c</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Reset Code"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              isRunning
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow"
            )}
          >
            {isRunning ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>

      {/* Output Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Terminal Output
          {status === 'success' && <CheckCircle2 size={12} className="text-green-500" />}
          {status === 'error' && <AlertCircle size={12} className="text-red-500" />}
        </div>
        <div className="p-4 bg-black text-green-400 font-mono text-sm min-h-[80px] whitespace-pre-wrap">
          {output || <span className="text-gray-600 italic">Click 'Run Code' to see output...</span>}
        </div>
      </div>
    </div>
  );
}
