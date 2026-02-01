import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Route, Bike, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    day: "Day 1",
    locations: ["Madgaon Station", "Arpora", "Parra Road", "Calangute", "Baga Beach"],
    segments: [
      { from: "Madgaon", to: "Arpora", distance: "35 km", time: "50 min" },
      { from: "Arpora", to: "Parra Road", distance: "5 km", time: "10 min" },
      { from: "Parra Road", to: "Calangute", distance: "4 km", time: "8 min" },
      { from: "Calangute", to: "Baga Beach", distance: "2 km", time: "5 min" },
    ],
    mapsLink: "https://maps.google.com/?q=Baga+Beach,+Goa",
  },
  {
    day: "Day 2",
    locations: ["Arpora", "Butterfly Beach", "Sal River", "Bamanbudo Waterfall", "Cabo de Rama Fort"],
    segments: [
      { from: "Arpora", to: "Butterfly Beach", distance: "58 km", time: "1h 30m" },
      { from: "Butterfly Beach", to: "Sal River", distance: "12 km", time: "25 min" },
      { from: "Sal River", to: "Bamanbudo Waterfall", distance: "18 km", time: "35 min" },
      { from: "Bamanbudo", to: "Cabo de Rama", distance: "15 km", time: "30 min" },
    ],
    mapsLink: "https://maps.google.com/?q=Cabo+de+Rama+Fort,+Goa",
  },
  {
    day: "Day 3",
    locations: ["Arpora", "Aguada Fort", "Colva Beach", "Madgaon Station"],
    segments: [
      { from: "Arpora", to: "Aguada Fort", distance: "8 km", time: "15 min" },
      { from: "Aguada Fort", to: "Colva Beach", distance: "45 km", time: "1h 10m" },
      { from: "Colva Beach", to: "Madgaon", distance: "8 km", time: "15 min" },
    ],
    mapsLink: "https://maps.google.com/?q=Madgaon+Railway+Station,+Goa",
  },
];

const RouteMapSection = () => {
  return (
    <section id="routes" className="relative py-24 md:py-32 bg-muted/30">
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
            Navigation
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Travel <span className="italic">Routes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Planned routes with distance and travel time estimates for each day
          </p>
        </motion.div>

        {/* Routes Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {routes.map((route, routeIndex) => (
            <motion.div
              key={route.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: routeIndex * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Day Header */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {route.day}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => window.open(route.mapsLink, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                  Open in Maps
                </Button>
              </div>

              {/* Visual Route */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {route.locations.map((location, index) => (
                  <div key={location} className="flex items-center gap-2">
                    <div className="group relative">
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        index === 0 
                          ? "bg-palm text-palm-foreground" 
                          : index === route.locations.length - 1 
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary/20 text-secondary"
                      }`}>
                        {index === 0 && <MapPin className="h-3 w-3" />}
                        {index === route.locations.length - 1 && <Navigation className="h-3 w-3" />}
                        {location}
                      </span>
                    </div>
                    {index < route.locations.length - 1 && (
                      <Route className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              {/* Distance Cards */}
              <div className="space-y-3">
                {route.segments.map((segment, segIndex) => (
                  <motion.div
                    key={`${segment.from}-${segment.to}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: segIndex * 0.05 }}
                    className="flex items-center justify-between rounded-lg bg-background/50 p-3 transition-all hover:bg-background"
                  >
                    <div className="flex items-center gap-3">
                      <Bike className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-foreground">
                        {segment.from} → {segment.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium">{segment.distance}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {segment.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RouteMapSection;
