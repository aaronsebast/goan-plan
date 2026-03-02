import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Clock, MapPin, Music, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Venue {
  name: string;
  type: "Club" | "Pub" | "Lounge" | "Bar";
  entry: "free" | "paid" | "ladies";
  popular: boolean;
  vibe: string;
  openLate: boolean;
  featured: boolean;
}

const venues: Venue[] = [
  { name: "Tito's Club", type: "Club", entry: "paid", popular: true, vibe: "Bollywood + EDM", openLate: true, featured: true },
  { name: "Mambo's", type: "Club", entry: "paid", popular: true, vibe: "EDM & House", openLate: true, featured: true },
  { name: "Cape Town Cafe", type: "Lounge", entry: "free", popular: true, vibe: "Chill + Live Music", openLate: false, featured: true },
  { name: "Club Cubana", type: "Club", entry: "paid", popular: true, vibe: "Rooftop EDM Party", openLate: true, featured: true },
  { name: "Britto's", type: "Bar", entry: "free", popular: false, vibe: "Beach Bar + Cocktails", openLate: false, featured: false },
  { name: "Kamaki", type: "Lounge", entry: "free", popular: false, vibe: "Chill Mediterranean", openLate: false, featured: false },
  { name: "Revolution", type: "Club", entry: "ladies", popular: true, vibe: "Bollywood Nights", openLate: true, featured: false },
  { name: "Cocktails & Dreams", type: "Bar", entry: "free", popular: false, vibe: "Cocktail Lounge", openLate: false, featured: false },
  { name: "SinQ Night Club", type: "Club", entry: "paid", popular: true, vibe: "International DJs", openLate: true, featured: true },
  { name: "Chronicle", type: "Pub", entry: "free", popular: false, vibe: "Live Band Nights", openLate: false, featured: false },
  { name: "LPK Waterfront", type: "Club", entry: "ladies", popular: true, vibe: "Cave-style EDM", openLate: true, featured: false },
  { name: "Nyex Beach Club", type: "Club", entry: "free", popular: false, vibe: "Beachside EDM", openLate: true, featured: false },
];

type FilterType = "all" | "free" | "paid" | "ladies" | "popular";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Free Entry", value: "free" },
  { label: "Paid Entry", value: "paid" },
  { label: "Ladies Night", value: "ladies" },
  { label: "Most Rated", value: "popular" },
];

const entryBadgeStyle = (entry: string) => {
  switch (entry) {
    case "free": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "paid": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "ladies": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    default: return "";
  }
};

const entryLabel = (entry: string) => {
  switch (entry) {
    case "free": return "Free Entry";
    case "paid": return "Paid Entry";
    case "ladies": return "Ladies Night";
    default: return "";
  }
};

const typeBadge = (type: string) => {
  switch (type) {
    case "Club": return "bg-secondary/20 text-secondary";
    case "Pub": return "bg-accent/20 text-accent";
    case "Lounge": return "bg-primary/20 text-primary";
    case "Bar": return "bg-ocean/20 text-ocean";
    default: return "bg-muted text-muted-foreground";
  }
};

const NightlifeDirectory = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        activeFilter === "all" ||
        (activeFilter === "popular" ? v.popular : v.entry === activeFilter);
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const featured = venues.filter((v) => v.featured);

  return (
    <div className="space-y-6">
      {/* Popular Picks */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
          <Sparkles className="h-4 w-4" /> Popular Picks
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {featured.map((v) => (
            <div
              key={v.name}
              className="flex min-w-[180px] shrink-0 flex-col gap-1.5 rounded-xl border border-accent/20 bg-accent/5 p-3"
            >
              <span className="font-serif text-sm font-semibold text-foreground">{v.name}</span>
              <span className="text-[10px] text-muted-foreground">{v.vibe}</span>
              <div className="flex gap-1.5">
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${entryBadgeStyle(v.entry)}`}>
                  {entryLabel(v.entry)}
                </span>
                {v.openLate && (
                  <span className="flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" /> Late
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clubs, pubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted/30 border-border/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {filtered.length} venue{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Venue Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((v) => (
            <motion.div
              key={v.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="font-serif text-sm font-semibold text-foreground">{v.name}</h5>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${typeBadge(v.type)}`}>
                      {v.type}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${entryBadgeStyle(v.entry)}`}>
                      {entryLabel(v.entry)}
                    </span>
                  </div>
                </div>
                {v.popular && (
                  <Star className="h-4 w-4 shrink-0 text-accent fill-accent" />
                )}
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Music className="h-3 w-3" /> {v.vibe}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {v.openLate && (
                  <Badge variant="outline" className="text-[9px] gap-1">
                    <Clock className="h-2.5 w-2.5" /> Open Late
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 pt-1">
                <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-[10px] font-medium text-primary transition-all hover:bg-primary/20">
                  View Details
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(v.name + " Baga Goa")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-lg bg-muted/40 px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:bg-muted/60"
                >
                  <MapPin className="h-2.5 w-2.5" /> Maps
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NightlifeDirectory;
