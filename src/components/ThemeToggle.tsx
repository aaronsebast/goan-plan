import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/20 transition-colors hover:bg-secondary/30"
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 text-accent transition-all ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-4 w-4 text-accent transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
    </motion.button>
  );
};

export default ThemeToggle;
