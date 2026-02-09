import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  "Building the web, one pixel at a time",
  "Turning ideas into reality",
  "Crafting digital experiences",
  "Code. Create. Iterate.",
];

// Typewriter component for character-by-character reveal
function TypewriterText({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 5 }
          }}
          transition={{ duration: 0.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-primary-500 ml-1 align-middle"
      />
    </motion.span>
  );
}

export default function InteractiveHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 5000); // Increased duration to allow reading
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* OpenAI-style Subtle Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />

      {/* Minimal Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply"
      />

      <div className="container-custom max-w-4xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100/80 border border-gray-200 text-sm font-medium text-gray-600 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for projects
          </span>
        </motion.div>

        <div className="h-32 md:h-40 flex items-center justify-center mb-6 w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-gray-900 leading-tight"
            >
              <TypewriterText text={titles[index]} />
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          I'm <span className="font-semibold text-gray-900">CloudWide851</span>.
          A creative developer focused on building clean, performant, and interactive web applications.
        </motion.p>
      </div>
    </div>
  );
}
