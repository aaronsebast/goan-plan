import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-goa-sunset.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="section-overlay" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block rounded-full border border-primary/40 bg-primary/20 px-4 py-2 text-sm font-medium tracking-widest text-primary-foreground backdrop-blur-sm">
            APRIL 23 – 27, 2026
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="luxury-heading mb-6 text-5xl font-semibold leading-tight text-primary md:text-7xl lg:text-8xl"
        >
          Goa <span className="italic font-normal">Awaits</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 max-w-2xl text-lg text-primary/80 md:text-xl"
        >
          A premium travel journal documenting our unforgettable group adventure 
          through the beaches, forts, and sunsets of India's tropical paradise.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4"
        >
          <a
            href="#group"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-medium tracking-wide text-secondary-foreground transition-all hover:bg-secondary/90"
          >
            Meet the Group
          </a>
          <a
            href="#travel"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-sm font-medium tracking-wide text-primary backdrop-blur-sm transition-all hover:bg-primary/20"
          >
            View Itinerary
          </a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;