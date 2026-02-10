import { useState, useEffect, type KeyboardEvent } from 'react';
import { Key, Save, CheckCircle2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsPanelInlineProps {
  apiKey: string;
  onSave: (key: string) => void;
  onDelete: () => void;
}

export default function SettingsPanelInline({ apiKey, onSave, onDelete }: SettingsPanelInlineProps) {
  const [inputValue, setInputValue] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!apiKey);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setInputValue(apiKey);
    if (!apiKey) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [apiKey]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      setIsEditing(false);
      setShowInput(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    setInputValue('');
    setIsEditing(true);
    setShowInput(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isEditing && apiKey && !showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-md text-sm transition-colors border border-green-500/20"
        title="Click to edit API Key"
      >
        <CheckCircle2 size={14} />
        <span className="font-medium">API Key Configured</span>
      </button>
    );
  }

  return (
    <div className="relative flex items-center">
      <div className={cn(
        "flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md p-1 pl-3 transition-all",
        showInput || isEditing ? "w-72" : "w-auto"
      )}>
        <Key size={14} className="text-gray-400 shrink-0" />
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter DeepSeek API Key"
          className="flex-1 bg-transparent border-none outline-none text-sm w-full min-w-0 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          autoFocus
        />
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            disabled={!inputValue.trim()}
            className="p-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            title="Save API Key"
          >
            <Save size={14} />
          </button>
          {apiKey && (
            <button
              onClick={handleDelete}
              className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 shrink-0"
              title="Remove API Key"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
