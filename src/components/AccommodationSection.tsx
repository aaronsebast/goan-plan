import { motion } from "framer-motion";
import { Home, MapPin, Car, Wifi, Tv, Wind, Ban, Coffee } from "lucide-react";
import marvellaVilla from "@/assets/marvella-villa.jpg";

const amenities = [
  { icon: Home, label: "3 BHK - Entire Place" },
  { icon: Car, label: "Free Parking" },
  { icon: Coffee, label: "Minibar" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Ban, label: "Non-Smoking Rooms" },
  { icon: Tv, label: "Flat Screen TV" },
  { icon: Wifi, label: "Free WiFi" },
];

const distances = [
  { place: "Baga Beach", distance: "2.9 km" },
  { place: "Chapora Fort", distance: "6 km" },
];

const AccommodationSection = () => {
  return (
    <section id="stay" className="relative py-24 md:py-32 bg-muted">
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
            Where We Stay
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Our <span className="italic">Accommodation</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={marvellaVilla}
                alt="Marvella Villa - Our accommodation in Goa"
                className="h-full w-full object-cover aspect-[4/3] lg:aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block rounded-full bg-palm/90 px-3 py-1 text-xs font-semibold text-white">
                  Booked & Confirmed
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  Marvella Villa
                </h3>
                <p className="mt-1 text-lg text-secondary">1st Villa, Vision Green</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <p className="text-muted-foreground">
                  Mainath Bhati, Anjuna Arpora Road, Arpora, 403516, India
                </p>
              </div>

              {/* Distances */}
              <div className="flex flex-wrap gap-4">
                {distances.map((item) => (
                  <div
                    key={item.place}
                    className="rounded-lg bg-background px-4 py-2 shadow-sm"
                  >
                    <p className="text-sm font-medium text-foreground">{item.place}</p>
                    <p className="text-xs text-muted-foreground">{item.distance}</p>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Amenities
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.label}
                        className="flex items-center gap-2 rounded-lg bg-background px-3 py-2"
                      >
                        <Icon className="h-4 w-4 text-palm" />
                        <span className="text-sm text-foreground">{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Highlight */}
              <div className="rounded-xl border border-palm/30 bg-palm/10 p-4">
                <p className="text-center font-medium text-foreground">
                  🏡 The entire place is exclusively ours for the trip!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
