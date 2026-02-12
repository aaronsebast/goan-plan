import { motion } from "framer-motion";
import { Heart, Palmtree } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Group", href: "/group" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "Stay", href: "/stay" },
  { label: "Budget", href: "/budget" },
  { label: "Gallery", href: "/gallery" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative py-16 md:py-24" style={{ background: "hsl(210 45% 12%)" }}>
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
          <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic text-foreground/80 md:text-3xl">
            "Not just a trip, but memories written together."
          </blockquote>
        </motion.div>

        <div className="section-divider mb-8" />

        {/* Footer Info */}
        <div className="text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Goa Trip 2026 • April 23-27
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground/70">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-secondary text-secondary" />
            <span>for the squad</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.href)}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
