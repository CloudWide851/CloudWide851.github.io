import { motion, AnimatePresence } from 'framer-motion';

// 1. Typewriter (Character by character)
export function TypewriterText({ text }: { text: string }) {
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

// 2. Fade In/Out (Simple opacity)
export function FadeText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

// 3. Slide Up (Translate Y)
export function SlideText({ text }: { text: string }) {
  return (
    <div className="overflow-hidden inline-block align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
        className="block"
      >
        {text}
      </motion.span>
    </div>
  );
}

// 4. Rotate In (3D effect)
export function RotateText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, rotateX: 90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateX: -90 }}
      transition={{ duration: 0.6 }}
      style={{ display: "inline-block", transformOrigin: "bottom" }}
    >
      {text}
    </motion.span>
  );
}

// 5. Wave (Character wave)
export function WaveText({ text }: { text: string }) {
  const characters = Array.from(text);
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        visible: { transition: { staggerChildren: 0.03 } },
        exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
            exit: { y: -20, opacity: 0 }
          }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// 6. Glitch (Cyberpunk effect)
export function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="relative inline-block"
    >
      <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-70 animate-pulse">{text}</span>
      <span className="absolute top-0 left-0 ml-[2px] text-blue-500 opacity-70 animate-pulse delay-75">{text}</span>
      <span className="relative z-10">{text}</span>
    </motion.span>
  );
}

export type AnimationType = 'typewriter' | 'fade' | 'slide' | 'rotate' | 'wave' | 'glitch';

export const animations: Record<AnimationType, { component: any }> = {
  typewriter: { component: TypewriterText },
  fade: { component: FadeText },
  slide: { component: SlideText },
  rotate: { component: RotateText },
  wave: { component: WaveText },
  glitch: { component: GlitchText },
};

export function getRandomAnimation(): AnimationType {
  const types = Object.keys(animations) as AnimationType[];
  return types[Math.floor(Math.random() * types.length)];
}
