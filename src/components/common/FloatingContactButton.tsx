import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FloatingContactButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "cloudwide851@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Optional: open mailto after a delay or just let them copy
    // window.location.href = `mailto:${email}`;
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="mr-4 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap hidden md:block"
          >
            {copied ? "Email copied!" : "Have a project? Let's chat."}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`mailto:${email}`}
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300",
          "bg-gray-900 text-white hover:bg-black",
          "border border-white/20"
        )}
        aria-label="Contact Me"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Check size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="mail"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <Mail size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}
