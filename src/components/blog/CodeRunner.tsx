import { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertCircle, CheckCircle2, Settings, X, Save, ExternalLink } from 'lucide-react';
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

  // API Key Management
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempKey, setTempKey] = useState('');

  // Load API key on mount
  useEffect(() => {
    const envKey = import.meta.env.VITE_JUDGE0_API_KEY;
    const localKey = localStorage.getItem('judge0_api_key');

    if (envKey) {
      setApiKey(envKey);
    } else if (localKey) {
      setApiKey(localKey);
      setTempKey(localKey);
    }
  }, []);

  const saveApiKey = () => {
    if (tempKey.trim()) {
      localStorage.setItem('judge0_api_key', tempKey.trim());
      setApiKey(tempKey.trim());
      setShowSettings(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('judge0_api_key');
    setApiKey('');
    setTempKey('');
  };

  // Real execution using Judge0 API
  const runCode = async () => {
    setIsRunning(true);
    setStatus('running');
    setOutput('Compiling and running...');

    try {
      // API Configuration
      // Using Judge0 CE on RapidAPI (Free Tier)
      const API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

      // Use the key from state
      const currentKey = apiKey;

      // If no API key is present, fallback to mock with a warning
      if (!currentKey) {
        setOutput("Warning: Judge0 API Key not found.\n\nPlease click the Settings (⚙️) icon to add your free RapidAPI key, or continue in simulation mode below.\n\n" + simulateExecution(code));
        setStatus('success');
        setIsRunning(false);
        return;
      }

      // 1. Submit Code
      const submitResponse = await fetch(`${API_URL}?base64_encoded=true&wait=false`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': currentKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          source_code: btoa(code),
          language_id: 50, // C (GCC 9.2.0)
          stdin: btoa("") // No input for now
        })
      });

      if (!submitResponse.ok) {
        if (submitResponse.status === 401 || submitResponse.status === 403) {
             throw new Error("Invalid API Key. Please check your key in Settings.");
        }
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
            'X-RapidAPI-Key': currentKey,
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
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 relative">
      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
           <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Settings size={20} /> API Configuration
                </h3>
                <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                <p>To run C code securely in your browser, you need a free API key from RapidAPI.</p>
                <a
                  href="https://rapidapi.com/judge0-official/api/judge0-ce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold hover:underline mt-1"
                >
                  Get Free Key <ExternalLink size={12} />
                </a>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">RapidAPI Key</label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="Paste your key here..."
                  className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-[10px] text-gray-400">Key is stored locally in your browser. No server involved.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveApiKey}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={16} /> Save Key
                </button>
                {apiKey && (
                  <button
                    onClick={clearApiKey}
                    className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
           </div>
        </div>
      )}

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
            onClick={() => {
              setTempKey(apiKey);
              setShowSettings(true);
            }}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              !apiKey ? "text-orange-500 bg-orange-50 hover:bg-orange-100 animate-pulse" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            )}
            title="Configure API Key"
          >
            <Settings size={14} />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
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
