import { motion } from "framer-motion";
import { MapPin, Clock, Waves, Mountain, Church, Camera, Info, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const places: PlaceInfo[] = [
  {
    name: "Parra Road",
    category: "Photo Spot",
    icon: Camera,
    description: "Famous palm-lined road in North Goa, perfect for photography with tall coconut trees on both sides creating a tunnel effect.",
    highlights: [
      "Iconic Instagram-worthy location",
      "Best during golden hour (4-6 PM)",
      "Less crowded on weekdays"
    ],
    tips: [
      "Park scooter safely on roadside",
      "Watch for traffic while taking photos",
      "Wear colorful outfits for contrast"
    ],
    distance: "8 km from Arpora",
    bestTime: "4:00 PM - 6:00 PM"
  },
  {
    name: "Tito's Lane",
    category: "Nightlife Hub",
    icon: MapPin,
    description: "The heart of Goa's nightlife in Baga. Famous street with clubs, pubs, and restaurants. Great for photos and evening walks.",
    highlights: [
      "Neon-lit street with vibrant atmosphere",
      "Multiple clubs and pubs",
      "Street food vendors nearby"
    ],
    tips: [
      "Entry to clubs may have cover charges",
      "Outside photos are free",
      "Avoid pushy vendors politely"
    ],
    distance: "2 km from Arpora",
    bestTime: "7:00 PM onwards"
  },
  {
    name: "Colva Beach",
    category: "Beach",
    icon: Waves,
    description: "One of the oldest and largest beaches in South Goa. White sandy beach with calm waters, perfect for morning visits.",
    highlights: [
      "Long stretch of white sand",
      "Calm and peaceful mornings",
      "Water sports available"
    ],
    tips: [
      "Arrive early to avoid crowds",
      "Swimming is safe here",
      "Shacks open after 8 AM"
    ],
    distance: "35 km from Arpora",
    bestTime: "6:00 AM - 9:00 AM"
  },
  {
    name: "Cabo de Rama Fort",
    category: "Heritage",
    icon: Mountain,
    description: "Ancient Portuguese fort with stunning views of the Arabian Sea. Named after Lord Rama from Hindu mythology.",
    highlights: [
      "Panoramic ocean views",
      "Historic Portuguese architecture",
      "Less touristy, peaceful atmosphere"
    ],
    tips: [
      "Wear comfortable walking shoes",
      "Carry water bottles",
      "No entry fee required"
    ],
    distance: "50 km from Arpora",
    bestTime: "9:00 AM - 11:00 AM"
  },
  {
    name: "Cola Beach",
    category: "Hidden Gem",
    icon: Waves,
    description: "Secluded beach with a freshwater lagoon meeting the sea. One of Goa's most beautiful and less commercialized beaches.",
    highlights: [
      "Unique lagoon formation",
      "Kayaking available (Rs 200-300)",
      "Pristine natural beauty"
    ],
    tips: [
      "Road is steep - ride carefully",
      "Limited food options - eat beforehand",
      "Best for swimming in lagoon"
    ],
    distance: "55 km from Arpora",
    bestTime: "1:00 PM - 3:00 PM"
  },
  {
    name: "Butterfly Beach",
    category: "Trekking Spot",
    icon: Mountain,
    description: "Small crescent-shaped beach accessible by a 20-minute trek through forest from Palolem. Named for the butterflies seen during monsoon.",
    highlights: [
      "Short scenic jungle trek",
      "Dolphins occasionally spotted",
      "Secluded and unspoiled beach"
    ],
    tips: [
      "Trek from Palolem viewpoint (20 min walk)",
      "Wear sturdy footwear for rocky path",
      "Carry water - no shops at beach",
      "Alternative: Boat ride from Palolem (Rs 300-400)"
    ],
    distance: "60 km from Arpora + 20 min trek",
    bestTime: "3:30 PM - 5:00 PM"
  },
  {
    name: "Palolem Beach",
    category: "Sunset Beach",
    icon: Waves,
    description: "Crescent-shaped beach in South Goa, known for stunning sunsets and calm waters. One of the most beautiful beaches in India.",
    highlights: [
      "Perfect crescent shape",
      "Spectacular sunset views",
      "Silent disco parties at night"
    ],
    tips: [
      "Reach by 5:30 PM for best sunset spot",
      "Beach shacks have great seafood",
      "Dolphin trips available early morning"
    ],
    distance: "65 km from Arpora",
    bestTime: "5:00 PM - 7:00 PM"
  },
  {
    name: "St. Francis of Assisi Church",
    category: "Heritage",
    icon: Church,
    description: "Historic church in Old Goa, part of the UNESCO World Heritage Site. Beautiful Portuguese-Manueline architecture from 1661.",
    highlights: [
      "UNESCO World Heritage Site",
      "Beautiful frescoes and artwork",
      "Archaeological museum nearby"
    ],
    tips: [
      "Dress modestly for church visit",
      "Free entry",
      "Combine with Basilica of Bom Jesus visit"
    ],
    distance: "18 km from Arpora",
    bestTime: "9:00 AM - 12:00 PM"
  },
  {
    name: "Harvalem Waterfalls",
    category: "Nature",
    icon: Mountain,
    description: "Also known as Arvalem Falls, this is a scenic waterfall best visited if time permits. Features ancient rock-cut caves nearby.",
    highlights: [
      "50-meter high waterfall",
      "Ancient Buddhist caves nearby",
      "Shiva temple at the site"
    ],
    tips: [
      "Best during/after monsoon",
      "May have less water in April",
      "Quick 30-min visit sufficient"
    ],
    distance: "40 km from Madgaon",
    bestTime: "3:00 PM - 5:00 PM"
  }
];

const PlaceInfoSection = () => {
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

        {/* Places Grid */}
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
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>

                    {/* Distance & Time */}
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

                    {/* Highlights */}
                    <div>
                      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <span className="h-1 w-1 rounded-full bg-palm"></span>
                        Highlights
                      </h4>
                      <ul className="space-y-1">
                        {place.highlights.map((highlight, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-palm/50"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div className="rounded-lg bg-accent/5 p-3">
                      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
                        <Info className="h-3 w-3" />
                        Tips
                      </h4>
                      <ul className="space-y-1">
                        {place.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {tip}
                          </li>
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
