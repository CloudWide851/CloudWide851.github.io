import { useState } from 'react';
import { Key, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SettingsPanelProps {
  apiKey: string;
  onSave: (key: string) => void;
  onDelete: () => void;
}

export default function SettingsPanel({ apiKey, onSave, onDelete }: SettingsPanelProps) {
  const { t } = useTranslation('lab');
  const [inputValue, setInputValue] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!apiKey);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    setInputValue('');
    setIsEditing(true);
  };

  if (!isEditing && apiKey) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle2 size={20} />
          <span className="font-medium text-sm">{t('agent.apiKey.saved')}</span>
          <span className="text-xs text-green-600 font-mono bg-green-100 px-2 py-0.5 rounded">
            {apiKey.substring(0, 4)}...{apiKey.substring(apiKey.length - 4)}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50"
          title={t('agent.apiKey.delete')}
        >
          <Trash2 size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Key size={16} />
        {t('agent.apiKey.label')}
      </label>
      <div className="flex gap-2">
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('agent.apiKey.placeholder')}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
        <button
          onClick={handleSave}
          disabled={!inputValue.trim()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save size={16} />
          {t('agent.apiKey.save')}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Your API key is stored locally in your browser and never sent to our servers.
      </p>
    </div>
  );
}
