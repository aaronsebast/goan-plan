import { motion } from "framer-motion";
import { Train, MapPin, Clock, Calendar, ArrowRight, User } from "lucide-react";

const TravelSection = () => {
  return (
    <section id="travel" className="relative bg-ocean py-24 text-ocean-foreground md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Journey Details
          </span>
          <h2 className="luxury-heading text-4xl font-semibold md:text-5xl">
            Travel <span className="italic">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Departure to Goa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card overflow-hidden rounded-2xl bg-background/10 backdrop-blur-lg"
          >
            <div className="flex items-center gap-3 border-b border-border/20 bg-palm/20 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-palm">
                <Train className="h-5 w-5 text-palm-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Departure to Goa</h3>
                <p className="text-sm text-primary/80">Group Journey (9 people)</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between rounded-xl bg-background/5 p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">20:20</p>
                  <p className="text-sm text-primary/70">Departure</p>
                </div>
                <div className="flex flex-1 items-center justify-center px-4">
                  <div className="h-px flex-1 bg-primary/30" />
                  <Train className="mx-2 h-5 w-5 text-accent" />
                  <div className="h-px flex-1 bg-primary/30" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">10:50</p>
                  <p className="text-sm text-primary/70">Arrival (+1 day)</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">Date</p>
                    <p className="font-medium">23 April 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">Train</p>
                    <p className="font-medium">TVCN BVC EXPRESS (19259)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">From</p>
                    <p className="font-medium">Ernakulam Town (North)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">To</p>
                    <p className="font-medium">Madgaon, Goa</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Return from Goa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card overflow-hidden rounded-2xl bg-background/10 backdrop-blur-lg"
          >
            <div className="flex items-center gap-3 border-b border-border/20 bg-secondary/20 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <ArrowRight className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold">Return from Goa</h3>
                <p className="text-sm text-primary/80">Homeward Bound</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between rounded-xl bg-background/5 p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">19:30</p>
                  <p className="text-sm text-primary/70">Departure</p>
                </div>
                <div className="flex flex-1 items-center justify-center px-4">
                  <div className="h-px flex-1 bg-primary/30" />
                  <Train className="mx-2 h-5 w-5 text-accent" />
                  <div className="h-px flex-1 bg-primary/30" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">08:30</p>
                  <p className="text-sm text-primary/70">Arrival (+1 day)</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">Date</p>
                    <p className="font-medium">26 April 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">Train</p>
                    <p className="font-medium">Madgaon Express (10215)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">From</p>
                    <p className="font-medium">Madgaon, Goa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-sm text-primary/70">To</p>
                    <p className="font-medium">Ernakulam Junction</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TravelSection;