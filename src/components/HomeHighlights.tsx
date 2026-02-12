import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Home } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    title: "3-Day Itinerary",
    description: "From sunrise beach rides to sunset party spots — every hour is planned.",
    link: "/itinerary",
    label: "View Plan",
  },
  {
    icon: Home,
    title: "Marvella Villa",
    description: "An exclusive 3BHK in Arpora, just minutes from Baga Beach.",
    link: "/stay",
    label: "See Stay",
  },
  {
    icon: MapPin,
    title: "9+ Destinations",
    description: "Beaches, forts, waterfalls, and hidden gems across North & South Goa.",
    link: "/places",
    label: "Explore",
  },
];

const HomeHighlights = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(item.link)}
                className="glass-card card-hover-lift cursor-pointer p-6 group"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-primary group-hover:underline">
                  {item.label} →
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
