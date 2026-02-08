import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "Building the web, one pixel at a time ✨",
  "Code. Create. Caffeinate. ☕",
  "Turning ideas into <interactive/> experiences",
  "Digital Alchemist 🧪",
];

export default function InteractiveHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Playful Background Elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
      />
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
      />

      <div className="container-custom max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="font-mono text-sm text-primary-600 bg-primary-50 px-4 py-2 rounded-full border border-primary-100 tracking-wider">
            HELLO_WORLD.tsx
          </span>
        </motion.div>

        <div className="h-32 md:h-40 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-gray-900"
            >
              {titles[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-sans"
        >
          I'm <span className="font-bold text-gray-900 relative inline-block">
            CloudWide851
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>.
          A creative developer crafting digital experiences that live on the internet.
        </motion.p>
      </div>
    </div>
  );
}
