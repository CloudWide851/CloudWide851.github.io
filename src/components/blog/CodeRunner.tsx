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

  // Real execution using Judge0 API
  const runCode = async () => {
    setIsRunning(true);
    setStatus('running');
    setOutput('Compiling and running...');

    try {
      // API Configuration
      // Using Judge0 CE on RapidAPI (Free Tier)
      const API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
      const API_KEY = import.meta.env.VITE_JUDGE0_API_KEY;

      // If no API key is present, fallback to mock with a warning
      if (!API_KEY) {
        setOutput("Warning: VITE_JUDGE0_API_KEY not found. Running in simulation mode...\n\n" + simulateExecution(code));
        setStatus('success');
        setIsRunning(false);
        return;
      }

      // 1. Submit Code
      const submitResponse = await fetch(`${API_URL}?base64_encoded=true&wait=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          source_code: btoa(code),
          language_id: 50, // C (GCC 9.2.0)
          stdin: btoa("") // No input for now
        })
      });

      if (!submitResponse.ok) {
        throw new Error(`Submission failed: ${submitResponse.statusText}`);
      }

      const { token } = await submitResponse.json();

      // 2. Poll for results
      let result = null;
      let attempts = 0;
      const maxAttempts = 10; // 20 seconds timeout

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s

        const checkResponse = await fetch(`${API_URL}/${token}?base64_encoded=true`, {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });

        result = await checkResponse.json();

        // Status: 1=In Queue, 2=Processing, 3=Accepted, >3=Error/Wrong Answer
        if (result.status.id >= 3) break;
        attempts++;
      }

      if (!result || result.status.id < 3) {
        throw new Error('Execution timed out.');
      }

      // 3. Process Output
      let finalOutput = '';
      if (result.stdout) finalOutput += atob(result.stdout);
      if (result.stderr) finalOutput += `\nError:\n${atob(result.stderr)}`;
      if (result.compile_output) finalOutput += `\nCompilation:\n${atob(result.compile_output)}`;

      if (result.status.id !== 3) { // Not Accepted
        finalOutput += `\n\nStatus: ${result.status.description}`;
        setStatus('error');
      } else {
        setStatus('success');
      }

      setOutput(finalOutput.trim() || "Program exited with code 0 (No output)");

    } catch (error) {
      console.error(error);
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  // Fallback simulation for when API key is missing
  const simulateExecution = (code: string) => {
      // Mock output logic based on content check
      let result = '';

      // Match all printf statements including newlines and format specifiers
      const printMatches = code.matchAll(/printf\s*\(\s*"([^"]*)"(?:,\s*[^)]+)?\s*\)/g);

      for (const match of printMatches) {
        let content = match[1];
        // Handle escape sequences
        content = content.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

        // Replace format specifiers with mock values
        if (code.includes('studentID')) content = content.replace(/%d/g, '12345');
        if (code.includes('gpa')) content = content.replace(/%.2f/g, '3.85');
        if (code.includes('grade')) content = content.replace(/%c/g, 'A');

        // Generic fallbacks
        content = content.replace(/%d/g, '42')
                       .replace(/%f/g, '3.14159')
                       .replace(/%.?\d*f/g, '3.14')
                       .replace(/%s/g, 'Hello World')
                       .replace(/%c/g, 'X');
        result += content;
      }

      if (!result && code.includes('printf')) {
         if (code.includes('Hello, World')) result = "Hello, World!";
         else result = "Program exited with code 0 (No output captured)";
      } else if (!result) {
         result = "Program exited with code 0";
      }
      return result;
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
