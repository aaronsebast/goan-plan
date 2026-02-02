import { motion } from "framer-motion";
import { Mountain, MapPin, Clock, Bike, Droplets, TreePine, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TrekkingSpot {
  id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  duration: string;
  distance: string;
  scooterTime: string;
  scooterDistance: string;
  highlights: string[];
  tips: string[];
  bestTime: string;
  image?: string;
}

const trekkingSpots: TrekkingSpot[] = [
  {
    id: "dudhsagar",
    name: "Dudhsagar Waterfalls",
    description: "One of India's tallest waterfalls (310m), located on the Goa-Karnataka border. A spectacular four-tiered waterfall that looks like a sea of milk cascading down.",
    difficulty: "Moderate",
    duration: "5-6 hours (full trip)",
    distance: "Trek: 2 km one way",
    scooterTime: "2.5 hours from Arpora",
    scooterDistance: "65 km via Mollem",
    highlights: [
      "Four-tiered waterfall",
      "Natural pool for swimming",
      "Railway bridge viewpoint",
      "Wildlife sightings possible"
    ],
    tips: [
      "Jeep safari required from Collem (₹400-500/person)",
      "Carry extra clothes for swimming",
      "Best visited early morning",
      "Waterproof bags for electronics"
    ],
    bestTime: "Post-monsoon (Oct-May)",
  },
  {
    id: "butterfly",
    name: "Butterfly Beach Trek",
    description: "A secluded paradise accessible only by boat or a scenic trek through dense forest. Known for its calm waters and visiting butterflies during certain seasons.",
    difficulty: "Moderate",
    duration: "1.5-2 hours one way",
    distance: "Trek: 3 km through forest",
    scooterTime: "1.5 hours from Arpora",
    scooterDistance: "45 km to Palolem (trek start)",
    highlights: [
      "Pristine secluded beach",
      "Dense forest trail",
      "Dolphins visible offshore",
      "Cliff viewpoints"
    ],
    tips: [
      "Start from Palolem Beach south end",
      "Carry sufficient water",
      "Wear sturdy shoes for rocky paths",
      "Alternative: Take a boat (₹300/person)"
    ],
    bestTime: "Nov-Mar (dry season)",
  },
  {
    id: "netravali",
    name: "Netravali Wildlife Sanctuary",
    description: "A hidden gem with the famous 'Bubbling Lake' and dense forest trails. Perfect for nature lovers seeking an off-beat experience.",
    difficulty: "Easy",
    duration: "2-3 hours",
    distance: "Trek: 1.5 km",
    scooterTime: "1.5 hours from Arpora",
    scooterDistance: "50 km via Sanguem",
    highlights: [
      "Bubbling Lake phenomenon",
      "Savari Waterfalls nearby",
      "Rich bird watching",
      "Ancient temple ruins"
    ],
    tips: [
      "Forest department guide available",
      "Mosquito repellent essential",
      "Good for monsoon visits too",
      "Combine with Bamanbudo Falls"
    ],
    bestTime: "Year-round",
  },
  {
    id: "tambdi",
    name: "Tambdi Surla Temple Trek",
    description: "Trek to Goa's oldest temple, a 12th-century Kadamba-era Mahadev temple hidden in the Bhagwan Mahavir Sanctuary.",
    difficulty: "Easy",
    duration: "1-2 hours",
    distance: "Trek: 1 km from parking",
    scooterTime: "2 hours from Arpora",
    scooterDistance: "60 km via Mollem",
    highlights: [
      "Ancient Kadamba architecture",
      "Peaceful forest setting",
      "Stream crossings",
      "Historical significance"
    ],
    tips: [
      "Can combine with Dudhsagar",
      "Respectful attire for temple",
      "Photography allowed outside",
      "Pack a picnic lunch"
    ],
    bestTime: "Oct-Mar",
  },
  {
    id: "cabo",
    name: "Cabo de Rama Fort Trail",
    description: "Explore the ruins of this historic Portuguese fort perched on cliffs with breathtaking views of the Arabian Sea.",
    difficulty: "Easy",
    duration: "1-2 hours",
    distance: "Trek: 1 km exploration",
    scooterTime: "1.5 hours from Arpora",
    scooterDistance: "55 km via Margao",
    highlights: [
      "Panoramic sea views",
      "Historic fort ruins",
      "Hidden beach below",
      "Sunset viewpoint"
    ],
    tips: [
      "Visit during sunset",
      "Explore the secret beach below",
      "Carry water and snacks",
      "Good photography spot"
    ],
    bestTime: "Nov-Feb",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-palm/20 text-palm";
    case "Moderate":
      return "bg-accent/20 text-accent";
    case "Hard":
      return "bg-destructive/20 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const TrekkingSection = () => {
  const [expandedSpot, setExpandedSpot] = useState<string | null>("dudhsagar");

  return (
    <section id="trekking" className="relative bg-muted py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-secondary">
            Day 2 Alternative
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Trekking <span className="italic">Adventures</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore Goa's hidden natural treasures. Vote whether to swap Day 2 South Goa tour 
            with an epic Dudhsagar trekking adventure!
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-accent/20 p-3">
                <Mountain className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Day 2 Decision Pending
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We're voting on whether to do the regular South Goa tour (Butterfly Beach, Cabo de Rama) 
                  or switch to a Dudhsagar Waterfalls trekking adventure. Check out all options below!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trekking Spots */}
        <div className="mx-auto max-w-4xl space-y-4">
          {trekkingSpots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => setExpandedSpot(expandedSpot === spot.id ? null : spot.id)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-secondary/20 p-3">
                    {spot.id === "dudhsagar" ? (
                      <Droplets className="h-6 w-6 text-secondary" />
                    ) : spot.id === "netravali" ? (
                      <TreePine className="h-6 w-6 text-palm" />
                    ) : (
                      <Mountain className="h-6 w-6 text-secondary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {spot.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", getDifficultyColor(spot.difficulty))}>
                        {spot.difficulty}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {spot.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    expandedSpot === spot.id && "rotate-180"
                  )} 
                />
              </button>

              {/* Expanded Content */}
              {expandedSpot === spot.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="p-5 pt-4">
                    <p className="mb-4 text-muted-foreground">{spot.description}</p>

                    {/* Travel Info Cards */}
                    <div className="mb-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-ocean/10 p-4">
                        <div className="mb-2 flex items-center gap-2 text-ocean">
                          <Bike className="h-4 w-4" />
                          <span className="text-sm font-semibold">By Scooter</span>
                        </div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{spot.scooterDistance}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{spot.scooterTime}</span>
                        </p>
                      </div>
                      <div className="rounded-xl bg-palm/10 p-4">
                        <div className="mb-2 flex items-center gap-2 text-palm">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-semibold">Trek Distance</span>
                        </div>
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{spot.distance}</span>
                        </p>
                      </div>
                    </div>

                    {/* Highlights & Tips */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <TreePine className="h-4 w-4 text-palm" />
                          Highlights
                        </h4>
                        <ul className="space-y-1">
                          {spot.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-palm" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                          <AlertTriangle className="h-4 w-4 text-accent" />
                          Tips
                        </h4>
                        <ul className="space-y-1">
                          {spot.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Best Time */}
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-3">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">
                        Best time to visit: <span className="font-medium text-foreground">{spot.bestTime}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekkingSection;