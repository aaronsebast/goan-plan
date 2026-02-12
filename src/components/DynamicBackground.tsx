import { useISTTimeOfDay, getTimeGradient } from "@/hooks/useISTTimeOfDay";
import { motion } from "framer-motion";

const DynamicBackground = ({ children }: { children: React.ReactNode }) => {
  const timeOfDay = useISTTimeOfDay();
  const gradient = getTimeGradient(timeOfDay);

  return (
    <div className="relative min-h-screen animated-gradient-bg">
      {/* Time-based overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-[3000ms]"
        style={{ background: gradient }}
        key={timeOfDay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DynamicBackground;
