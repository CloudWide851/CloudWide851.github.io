import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          CloudWide851
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-primary-600 mt-2 rounded-full"
        />
      </div>
    </div>
  );
}
