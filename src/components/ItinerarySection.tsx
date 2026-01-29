import { motion } from "framer-motion";
import { MapPin, Star, Compass, Sun, Camera, Palmtree } from "lucide-react";
import northGoaImage from "@/assets/north-goa-beach.jpg";
import fortImage from "@/assets/goa-fort.jpg";

const days = [
  {
    day: "Day 1 & 2",
    title: "North Goa",
    subtitle: "Beaches, Forts & Sunsets",
    image: northGoaImage,
    places: [
      { name: "Calangute Beach", type: "Beach", mustVisit: true, free: true },
      { name: "Baga Beach", type: "Beach", mustVisit: true, free: true },
      { name: "Anjuna Beach", type: "Beach", mustVisit: false, free: true },
      { name: "Vagator Beach", type: "Beach", mustVisit: false, free: true },
      { name: "Fort Aguada", type: "Heritage", mustVisit: true, free: true },
      { name: "Chapora Fort", type: "Heritage", mustVisit: true, free: true },
      { name: "Candolim Beach", type: "Beach", mustVisit: false, free: true },
      { name: "Arambol Beach", type: "Beach", mustVisit: false, free: true },
    ],
  },
  {
    day: "Day 3",
    title: "South Goa",
    subtitle: "Serenity & Heritage",
    image: fortImage,
    places: [
      { name: "Palolem Beach", type: "Beach", mustVisit: true, free: true },
      { name: "Colva Beach", type: "Beach", mustVisit: true, free: true },
      { name: "Benaulim Beach", type: "Beach", mustVisit: false, free: true },
      { name: "Cabo de Rama Fort", type: "Heritage", mustVisit: true, free: true },
      { name: "Dudhsagar Falls", type: "Viewpoint", mustVisit: false, free: false },
      { name: "Old Goa Churches", type: "Heritage", mustVisit: true, free: true },
    ],
  },
];

const ItinerarySection = () => {
  return (
    <section id="itinerary" className="relative py-24 md:py-32">
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
            3-Day Adventure
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Trip <span className="italic">Itinerary</span>
          </h2>
        </motion.div>

        {/* Days Grid */}
        <div className="mx-auto max-w-6xl space-y-12">
          {days.map((dayInfo, dayIndex) => (
            <motion.div
              key={dayInfo.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              className="overflow-hidden rounded-3xl bg-card shadow-lg"
            >
              {/* Day Header with Image */}
              <div className="relative h-48 md:h-64">
                <img
                  src={dayInfo.image}
                  alt={dayInfo.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-card">
                  <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {dayInfo.day}
                  </span>
                  <h3 className="font-serif text-3xl font-semibold md:text-4xl">{dayInfo.title}</h3>
                  <p className="text-card/80">{dayInfo.subtitle}</p>
                </div>
              </div>

              {/* Places Grid */}
              <div className="p-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {dayInfo.places.map((place, index) => (
                    <motion.div
                      key={place.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md ${
                        place.mustVisit
                          ? 'border-accent/40 bg-accent/10'
                          : 'border-border bg-background'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        place.type === 'Beach' ? 'bg-secondary/20 text-secondary' :
                        place.type === 'Heritage' ? 'bg-palm/20 text-palm' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {place.type === 'Beach' ? <Palmtree className="h-5 w-5" /> :
                         place.type === 'Heritage' ? <Compass className="h-5 w-5" /> :
                         <Camera className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{place.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{place.type}</span>
                          {place.free && (
                            <span className="rounded bg-palm/20 px-1.5 py-0.5 text-[10px] font-medium text-palm">
                              FREE
                            </span>
                          )}
                        </div>
                      </div>
                      {place.mustVisit && (
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm text-muted-foreground">Must Visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-palm/20 px-1.5 py-0.5 text-[10px] font-medium text-palm">FREE</span>
                    <span className="text-sm text-muted-foreground">No Entry Fee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;