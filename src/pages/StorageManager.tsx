import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  Trash2,
  Edit2,
  Save,
  X,
  Download,
  Upload,
  Eye,
  EyeOff,
  Plus,
  Search,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StorageItem {
  key: string;
  value: string;
  isEditing?: boolean;
  newValue?: string;
}

export default function StorageManager() {
  // const { t } = useTranslation();
  const [items, setItems] = useState<StorageItem[]>([]);
  const [filter, setFilter] = useState('');
  const [newItemKey, setNewItemKey] = useState('');
  const [newItemValue, setNewItemValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  // Load items from localStorage
  const loadItems = () => {
    const keys = Object.keys(localStorage);
    const loadedItems = keys.map(key => ({
      key,
      value: localStorage.getItem(key) || ''
    })).sort((a, b) => a.key.localeCompare(b.key));
    setItems(loadedItems);
  };

  useEffect(() => {
    loadItems();
    // Listen for storage events (changes from other tabs)
    window.addEventListener('storage', loadItems);
    return () => window.removeEventListener('storage', loadItems);
  }, []);

  const handleDelete = (key: string) => {
    if (confirm(`Are you sure you want to delete "${key}"?`)) {
      localStorage.removeItem(key);
      loadItems();
    }
  };

  const handleClearAll = () => {
    if (confirm('WARNING: This will delete ALL data including your API keys, game scores, and theme preferences. Are you sure?')) {
      localStorage.clear();
      loadItems();
      // Reload to reflect theme/lang changes if necessary, but maybe too disruptive
      // window.location.reload();
    }
  };

  const handleEdit = (key: string) => {
    setItems(prev => prev.map(item =>
      item.key === key ? { ...item, isEditing: true, newValue: item.value } : item
    ));
  };

  const handleCancelEdit = (key: string) => {
    setItems(prev => prev.map(item =>
      item.key === key ? { ...item, isEditing: false } : item
    ));
  };

  const handleSave = (key: string, newValue: string) => {
    localStorage.setItem(key, newValue);
    setItems(prev => prev.map(item =>
      item.key === key ? { ...item, value: newValue, isEditing: false } : item
    ));
  };

  const handleAddItem = () => {
    if (!newItemKey.trim()) return;
    if (localStorage.getItem(newItemKey)) {
      alert('Key already exists!');
      return;
    }
    localStorage.setItem(newItemKey, newItemValue);
    setNewItemKey('');
    setNewItemValue('');
    setIsAdding(false);
    loadItems();
  };

  const toggleVisibility = (key: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(key)) {
      newVisible.delete(key);
    } else {
      newVisible.add(key);
    }
    setVisibleKeys(newVisible);
  };

  const handleExport = () => {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localstorage_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === 'object' && json !== null) {
          if (confirm('This will overwrite existing keys with the same name. Continue?')) {
            Object.entries(json).forEach(([key, value]) => {
              if (typeof value === 'string') {
                localStorage.setItem(key, value);
              }
            });
            loadItems();
            alert('Import successful!');
          }
        }
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const filteredItems = items.filter(item =>
    item.key.toLowerCase().includes(filter.toLowerCase()) ||
    item.value.toLowerCase().includes(filter.toLowerCase())
  );

  const isSecret = (key: string) => {
    const lower = key.toLowerCase();
    return lower.includes('key') || lower.includes('token') || lower.includes('secret') || lower.includes('auth');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Database size={24} />
            </div>
            Storage Manager
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your local browser data including API keys, settings, and progress.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <Download size={16} /> Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
            <Upload size={16} /> Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-4 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search keys or values..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            isAdding
              ? "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          )}
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? "Cancel" : "Add Key"}
        </button>
      </div>

      {/* Add New Item Form */}
      {isAdding && (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-medium text-blue-800 dark:text-blue-300 ml-1">Key Name</label>
              <input
                type="text"
                placeholder="e.g., my_setting"
                value={newItemKey}
                onChange={(e) => setNewItemKey(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-medium text-blue-800 dark:text-blue-300 ml-1">Value</label>
              <input
                type="text"
                placeholder="Value..."
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleAddItem}
                disabled={!newItemKey.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={18} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            <Database size={48} className="mx-auto mb-4 opacity-20" />
            <p>No items found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Key</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Value</th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {filteredItems.map((item) => (
                  <tr key={item.key} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400 font-medium">
                      {item.key}
                    </td>
                    <td className="px-6 py-4">
                      {item.isEditing ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.newValue}
                            onChange={(e) => setItems(prev => prev.map(i => i.key === item.key ? { ...i, newValue: e.target.value } : i))}
                            className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-zinc-800 border border-blue-500 rounded focus:outline-none w-full min-w-[200px]"
                            autoFocus
                          />
                          <button onClick={() => handleSave(item.key, item.newValue || '')} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                            <Save size={16} />
                          </button>
                          <button onClick={() => handleCancelEdit(item.key)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 max-w-md">
                          <span className={cn(
                            "truncate font-mono text-gray-600 dark:text-gray-300",
                            isSecret(item.key) && !visibleKeys.has(item.key) && "blur-sm select-none"
                          )}>
                            {item.value.length > 50 ? item.value.slice(0, 50) + '...' : item.value}
                          </span>
                          {isSecret(item.key) && (
                            <button
                              onClick={() => toggleVisibility(item.key)}
                              className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {visibleKeys.has(item.key) ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item.key)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.key)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
