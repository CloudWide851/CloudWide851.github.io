import SnakeGame from '@/components/lab/SnakeGame/SnakeGame';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Gamepad2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SnakePage() {
  const { t } = useTranslation('lab');

  return (
    <div className="h-full flex-1 bg-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between">
        <Link
          to="/lab"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-mono text-sm tracking-wider uppercase">{t('back')}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
            <Gamepad2 size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t('experiments.snakeGame.title')}
          </h1>
        </div>

        <div className="w-[100px] flex justify-end">
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy size={18} />
            <span className="font-mono font-bold">HS</span>
          </div>
        </div>
      </header>

      {/* Game Container */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative"
        >
          {/* CRT Screen Effect Container */}
          <div className="p-4 rounded-2xl bg-slate-800 border-4 border-slate-700 shadow-2xl shadow-emerald-500/10 relative">
            {/* Screen Glow */}
            <div className="absolute inset-0 bg-emerald-500/5 rounded-xl blur-xl"></div>

            {/* The Game Component - We might need to adjust its internal styling later for full dark mode support */}
            <div className="relative z-10 bg-black rounded-xl overflow-hidden border border-slate-600">
              <SnakeGame />
            </div>

            {/* Decorative Elements */}
            <div className="mt-4 flex justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest">
              <span>System: ONLINE</span>
              <span>Mode: ARCADE</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center max-w-md text-slate-400 text-sm">
          <p>{t('experiments.snakeGame.description')}</p>
        </div>
      </main>
    </div>
  );
}
