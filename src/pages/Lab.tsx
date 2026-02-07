import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gamepad2, ChevronDown, ChevronUp } from 'lucide-react';
import FuzzySearch from '@/components/lab/FuzzySearch/FuzzySearch';
import SnakeGame from '@/components/lab/SnakeGame/SnakeGame';

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ExperimentCard({ title, description, icon: Icon, tags, children, defaultOpen = false }: ExperimentCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
              <Icon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
              <p className="text-gray-600 mb-3">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button className="text-gray-400">
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 bg-gray-50/50"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Lab() {
  return (
    <div className="container-custom py-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Lab</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A playground for experimental features, tech demos, and creative coding.
          Here I test new libraries, algorithms, and interactive UI concepts.
        </p>
      </div>

      <div className="grid gap-6">
        <ExperimentCard
          title="Fuzzy Search"
          description="Real-time fuzzy string matching algorithm demo using Fuse.js. Try searching for tech stack terms like 'React', 'Database', or 'Language'."
          icon={Search}
          tags={['Algorithm', 'Search', 'Fuse.js', 'Interactive']}
          defaultOpen={true}
        >
          <FuzzySearch />
        </ExperimentCard>

        <ExperimentCard
          title="Snake Game"
          description="Classic Snake game implementation using HTML5 Canvas and React state management. Features scoring, collision detection, and keyboard controls."
          icon={Gamepad2}
          tags={['Game', 'Canvas API', 'React Hooks', 'Retro']}
        >
          <SnakeGame />
        </ExperimentCard>
      </div>
    </div>
  );
}
