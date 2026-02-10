import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export default function FloatingContactButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const email = "cloudwide851@gmail.com";
  const location = useLocation();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide logic based on inactivity
  useEffect(() => {
    const resetTimer = () => {
      setIsVisible(true);

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Hide after 5 seconds of inactivity
      inactivityTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Events to track user activity
    const events = ['mousemove', 'scroll', 'click', 'keydown', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Initial timer
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Force hide on route change
  useEffect(() => {
    setIsVisible(false);
    // Note: The visibility will naturally come back when the user moves the mouse
    // on the new page, which is the desired behavior (interaction-based visibility)
  }, [location.pathname]);

  // Delayed tooltip logic (1.5s delay)
  useEffect(() => {
    if (isHovered) {
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 1500);
    } else {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      setShowTooltip(false);
    }

    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, [isHovered]);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    // Force show tooltip on click to give feedback
    setShowTooltip(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {showTooltip && (
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
