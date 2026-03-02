import { motion } from "framer-motion";
import { MapPin, Clock, Waves, Mountain, Church, Camera, Info, Navigation, Sun, Gem, PartyPopper, Castle, Bike, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PlaceInfo {
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  tips: string[];
  distance?: string;
  bestTime?: string;
}

// Day 1 Coastal Guide places
interface Day1Place {
  name: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  whatToDo: string;
  bestTime: string;
  quickTip: string;
  distanceFromPrev: string;
  scooterTime: string;
}

const day1Places: Day1Place[] = [
  {
    name: "Parra Coconut Tree Road",
    badge: "Photo Spot",
    badgeColor: "bg-accent/20 text-accent border-accent/40",
    icon: Camera,
    whatToDo: "Walk through the iconic coconut palm tunnel. Take aesthetic photos, reels, and enjoy the serene green canopy.",
    bestTime: "3:00 PM – 3:25 PM",
    quickTip: "Park scooter safely. Watch for traffic while posing.",
    distanceFromPrev: "5 km from Arpora",
    scooterTime: "10–12 mins",
  },
  {
    name: "Fort Aguada",
    badge: "Heritage Viewpoint",
    badgeColor: "bg-ocean/20 text-ocean border-ocean/40",
    icon: Castle,
    whatToDo: "Explore the historic Portuguese sea fort with lighthouse. Panoramic Arabian Sea cliff views.",
    bestTime: "3:45 PM – 4:30 PM",
    quickTip: "Windy at top — hold hats. Quick 30-minute explore.",
    distanceFromPrev: "18 km from Parra",
    scooterTime: "30–35 mins",
  },
  {
    name: "Candolim Beach",
    badge: "Calm Coastline",
    badgeColor: "bg-primary/20 text-primary border-primary/40",
    icon: Waves,
    whatToDo: "Relax on calm sandy shores. Walk the shoreline and grab a coconut water.",
    bestTime: "4:40 PM – 5:15 PM",
    quickTip: "Calmer than Baga — perfect for a breather.",
    distanceFromPrev: "4 km from Aguada",
    scooterTime: "8–10 mins",
  },
  {
    name: "Ashwem Beach",
    badge: "Sunset Signature",
    badgeColor: "bg-accent/20 text-accent border-accent/40",
    icon: Sun,
    whatToDo: "Catch the golden hour sunset on this wide, clean beach. Premium feel, less crowded.",
    bestTime: "6:00 PM – 6:40 PM",
    quickTip: "Arrive by 6 PM for best golden hour light.",
    distanceFromPrev: "23 km from Candolim",
    scooterTime: "40–45 mins",
  },
  {
    name: "Querim Beach",
    badge: "Hidden Sanctuary",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    icon: Gem,
    whatToDo: "Discover Goa's northernmost hidden beach with a rock cave. Raw, untouched, moody vibes.",
    bestTime: "7:00 PM – 7:45 PM",
    quickTip: "Perfect for dramatic photography. Very secluded.",
    distanceFromPrev: "14 km from Ashwem",
    scooterTime: "20–25 mins",
  },
  {
    name: "Baga – Tito's Lane",
    badge: "Nightlife District",
    badgeColor: "bg-secondary/20 text-secondary border-secondary/40",
    icon: PartyPopper,
    whatToDo: "Experience the nightlife hub. Clubs, live DJs, street energy, party vibes.",
    bestTime: "9:00 PM onwards",
    quickTip: "Peak time after 11 PM. Dress smart-casual.",
    distanceFromPrev: "25 km from Querim",
    scooterTime: "45–50 mins",
  },
];

const places: PlaceInfo[] = [
  {
    name: "Parra Road",
    category: "Photo Spot",
    icon: Camera,
    description: "Famous palm-lined road in North Goa, perfect for photography with tall coconut trees on both sides creating a tunnel effect.",
    highlights: ["Iconic Instagram-worthy location", "Best during golden hour (4-6 PM)", "Less crowded on weekdays"],
    tips: ["Park scooter safely on roadside", "Watch for traffic while taking photos", "Wear colorful outfits for contrast"],
    distance: "8 km from Arpora",
    bestTime: "4:00 PM - 6:00 PM",
  },
  {
    name: "Tito's Lane",
    category: "Nightlife Hub",
    icon: MapPin,
    description: "The heart of Goa's nightlife in Baga. Famous street with clubs, pubs, and restaurants.",
    highlights: ["Neon-lit street with vibrant atmosphere", "Multiple clubs and pubs", "Street food vendors nearby"],
    tips: ["Entry to clubs may have cover charges", "Outside photos are free", "Avoid pushy vendors politely"],
    distance: "2 km from Arpora",
    bestTime: "7:00 PM onwards",
  },
  {
    name: "Colva Beach",
    category: "Beach",
    icon: Waves,
    description: "One of the oldest and largest beaches in South Goa. White sandy beach with calm waters.",
    highlights: ["Long stretch of white sand", "Calm and peaceful mornings", "Water sports available"],
    tips: ["Arrive early to avoid crowds", "Swimming is safe here", "Shacks open after 8 AM"],
    distance: "35 km from Arpora",
    bestTime: "6:00 AM - 9:00 AM",
  },
  {
    name: "Cabo de Rama Fort",
    category: "Heritage",
    icon: Mountain,
    description: "Ancient Portuguese fort with stunning views of the Arabian Sea.",
    highlights: ["Panoramic ocean views", "Historic Portuguese architecture", "Less touristy, peaceful atmosphere"],
    tips: ["Wear comfortable walking shoes", "Carry water bottles", "No entry fee required"],
    distance: "50 km from Arpora",
    bestTime: "9:00 AM - 11:00 AM",
  },
  {
    name: "Cola Beach",
    category: "Hidden Gem",
    icon: Waves,
    description: "Secluded beach with a freshwater lagoon meeting the sea. One of Goa's most beautiful beaches.",
    highlights: ["Unique lagoon formation", "Kayaking available (Rs 200-300)", "Pristine natural beauty"],
    tips: ["Road is steep - ride carefully", "Limited food options - eat beforehand", "Best for swimming in lagoon"],
    distance: "55 km from Arpora",
    bestTime: "1:00 PM - 3:00 PM",
  },
  {
    name: "Palolem Beach",
    category: "Sunset Beach",
    icon: Waves,
    description: "Crescent-shaped beach in South Goa, known for stunning sunsets and calm waters.",
    highlights: ["Perfect crescent shape", "Spectacular sunset views", "Silent disco parties at night"],
    tips: ["Reach by 5:30 PM for best sunset spot", "Beach shacks have great seafood", "Dolphin trips available early morning"],
    distance: "65 km from Arpora",
    bestTime: "5:00 PM - 7:00 PM",
  },
];

const PlaceInfoSection = () => {
  const navigate = useNavigate();

  return (
    <section id="places" className="relative py-24 md:py-32 bg-muted/30">
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
            Know Before You Go
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Place <span className="italic">Guide</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Essential information about each destination to help you plan your visit.
          </p>
        </motion.div>

        {/* Day 1 Coastal Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Day 1 Route
            </span>
            <h3 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Day 1 Coastal <span className="italic text-primary">Guide</span>
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {day1Places.map((place, index) => {
              const Icon = place.icon;
              return (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card className="h-full glass-card border-none transition-all hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="font-serif text-base">{place.name}</CardTitle>
                          </div>
                        </div>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${place.badgeColor}`}>
                          {place.badge}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h5 className="text-xs font-semibold text-foreground mb-1">What to Do</h5>
                        <p className="text-xs text-muted-foreground leading-relaxed">{place.whatToDo}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                          <Clock className="h-2.5 w-2.5 text-accent" /> {place.bestTime}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                          <MapPin className="h-2.5 w-2.5 text-ocean" /> {place.distanceFromPrev}
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                          <Bike className="h-2.5 w-2.5 text-primary" /> {place.scooterTime}
                        </div>
                      </div>
                      <div className="rounded-lg bg-accent/5 p-2.5">
                        <p className="text-[10px] text-muted-foreground">
                          <span className="font-semibold text-accent">Tip:</span> {place.quickTip}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/day1")}
                        className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline"
                      >
                        View in Day 1 Itinerary <ArrowRight className="h-3 w-3" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* General Places Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place, index) => {
            const Icon = place.icon;
            return (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-ocean/10 p-2.5">
                          <Icon className="h-5 w-5 text-ocean" />
                        </div>
                        <div>
                          <CardTitle className="font-serif text-lg">{place.name}</CardTitle>
                          <span className="text-xs text-muted-foreground">{place.category}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      {place.distance && (
                        <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                          <Navigation className="h-3 w-3 text-ocean" />
                          <span>{place.distance}</span>
                        </div>
                      )}
                      {place.bestTime && (
                        <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                          <Clock className="h-3 w-3 text-accent" />
                          <span>{place.bestTime}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <span className="h-1 w-1 rounded-full bg-palm"></span> Highlights
                      </h4>
                      <ul className="space-y-1">
                        {place.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-palm/50"></span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-accent/5 p-3">
                      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
                        <Info className="h-3 w-3" /> Tips
                      </h4>
                      <ul className="space-y-1">
                        {place.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlaceInfoSection;
