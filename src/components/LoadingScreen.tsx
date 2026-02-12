import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palmtree } from "lucide-react";

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "hsl(207 52% 10%)" }}
    >
      {/* Subtle animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(168 100% 39% / 0.15), transparent)" }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.03, 0.08] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(38 89% 61% / 0.1), transparent)" }}
        />
      </div>

      {/* Palm silhouette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Palmtree className="h-16 w-16 text-primary/60 mb-6" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="luxury-heading text-4xl font-semibold text-foreground mb-2 md:text-5xl"
      >
        Goa <span className="italic text-primary">2026</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-10"
      >
        Loading your adventure
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "200px" }}
        transition={{ delay: 0.4 }}
        className="relative h-1 w-[200px] overflow-hidden rounded-full"
        style={{ background: "hsl(210 25% 22%)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, hsl(168 100% 39%), hsl(38 89% 61%))",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
