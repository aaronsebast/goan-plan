import { motion } from "framer-motion";
import { Heart, Palmtree } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-ocean py-16 text-ocean-foreground md:py-24">
      <div className="container mx-auto px-6">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Palmtree className="mx-auto mb-6 h-10 w-10 text-primary/60" />
          <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic text-primary md:text-3xl">
            "Not just a trip, but memories written together."
          </blockquote>
        </motion.div>

        {/* Divider */}
        <div className="mx-auto mb-8 h-px max-w-xs bg-primary/20" />

        {/* Footer Info */}
        <div className="text-center">
          <p className="mb-4 text-sm text-primary/70">
            Goa Trip 2025 • April 23-27
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-primary/50">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-accent text-accent" />
            <span>for the squad</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="#group" className="text-primary/70 transition-colors hover:text-primary">
            Group
          </a>
          <a href="#travel" className="text-primary/70 transition-colors hover:text-primary">
            Travel
          </a>
          <a href="#itinerary" className="text-primary/70 transition-colors hover:text-primary">
            Itinerary
          </a>
          <a href="#cruise" className="text-primary/70 transition-colors hover:text-primary">
            Cruise
          </a>
          <a href="#updates" className="text-primary/70 transition-colors hover:text-primary">
            Updates
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;