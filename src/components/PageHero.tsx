import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  tag?: string;
  backgroundImage?: string;
}

const PageHero = ({ title, titleAccent, subtitle, tag, backgroundImage }: PageHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="section-overlay" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </motion.button>

        {tag && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            {tag}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="luxury-heading text-4xl font-semibold text-foreground md:text-6xl"
        >
          {title} {titleAccent && <span className="italic text-primary">{titleAccent}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-xl text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
