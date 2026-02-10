import SnakeGame from '@/components/lab/SnakeGame/SnakeGame';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SnakePage() {
  const { t } = useTranslation('lab');

  return (
    <div className="h-full flex-1 bg-slate-900 text-white flex flex-col">
      {/* 1. Header & Controls */}
      <header className="flex-none p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/lab"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-mono text-sm tracking-wider uppercase hidden sm:inline">{t('back')}</span>
          </Link>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400">
              <Gamepad2 size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              {t('experiments.snakeGame.title')}
            </h1>
          </div>
        </div>
      </header>

      {/* 2. Game Canvas Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden bg-slate-950/50">
        <div className="relative z-10">
          <SnakeGame />
        </div>

        <div className="mt-6 text-center max-w-md text-slate-500 text-sm">
          <p>{t('experiments.snakeGame.description')}</p>
        </div>
      </main>
    </div>
  );
}
