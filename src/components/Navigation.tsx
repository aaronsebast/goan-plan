import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palmtree, Shield, ChevronDown } from "lucide-react";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Group", href: "/group" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "Stay", href: "/stay" },
  { label: "Tickets", href: "/tickets" },
  { label: "Travel ID", href: "/travel-id" },
  { label: "Budget", href: "/budget" },
];

const moreNavItems = [
  { label: "Routes", href: "/routes" },
  { label: "Places", href: "/places" },
  { label: "Packing", href: "/packing" },
  { label: "Gallery", href: "/gallery" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    navigate(href);
  };

  const isActive = (href: string) => location.pathname === href;
  const isMoreActive = moreNavItems.some((item) => isActive(item.href));

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-card border-b py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Palmtree className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-semibold text-foreground">
              Goa <span className="text-primary">2026</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all ${
                  isMoreActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-44 glass-card rounded-xl p-2 shadow-xl"
                  >
                    {moreNavItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigate("/admin/login")}
              className="ml-2 flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
            >
              <Shield className="h-3 w-3" />
              Admin
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass-card border-b p-6 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {[...mainNavItems, ...moreNavItems].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-all ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate("/admin/login"); }}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-left text-base font-medium text-primary"
              >
                <Shield className="h-5 w-5" />
                Admin Login
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
