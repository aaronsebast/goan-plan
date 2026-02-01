import { motion } from "framer-motion";
import { MapPin, Sun, Moon, Utensils, Camera, PartyPopper, Palmtree, Mountain, Castle } from "lucide-react";
import northGoaImage from "@/assets/north-goa-beach.jpg";
import fortImage from "@/assets/goa-fort.jpg";

const days = [
  {
    day: "Day 1",
    date: "24 April",
    title: "North Goa + Baga Full Night",
    subtitle: "Arrival, Beaches & Nightlife",
    image: northGoaImage,
    schedule: [
      { time: "11:00", activity: "Arrival + tea/snacks near station", icon: "arrival" },
      { time: "11:30", activity: "Budget lunch (thali / biryani)", icon: "food" },
      { time: "12:30", activity: "Travel to Arpora & freshen up", icon: "travel" },
      { time: "15:30", activity: "Parra Road (best soft light photos)", icon: "photo" },
      { time: "16:15", activity: "Calangute → Baga Beach walk", icon: "beach" },
      { time: "18:00", activity: "Baga Beach sunset", icon: "sunset" },
      { time: "19:00", activity: "Street-food dinner (egg bhurji, shawarma, fried rice)", icon: "food" },
      { time: "20:30+", activity: "Baga nightlife & party (Tito's, Mambo's, Cape Town Café, Beach shacks)", icon: "party" },
    ],
  },
  {
    day: "Day 2",
    date: "25 April",
    title: "South Goa",
    subtitle: "Nature Day",
    image: fortImage,
    schedule: [
      { time: "08:30", activity: "Wake-up", icon: "sunrise" },
      { time: "09:00", activity: "Cheap breakfast (pao omelette + tea)", icon: "food" },
      { time: "09:30", activity: "Ride to South Goa", icon: "travel" },
      { time: "12:45", activity: "Butterfly Beach", icon: "beach" },
      { time: "14:15", activity: "Budget lunch (fish curry rice / veg meals)", icon: "food" },
      { time: "15:15", activity: "Sal River & Arabian Sea estuary", icon: "nature" },
      { time: "16:30", activity: "Bamanbudo Waterfall (tea + Maggi)", icon: "waterfall" },
      { time: "17:45", activity: "Cabo de Rama Fort (sunset view)", icon: "fort" },
      { time: "19:30", activity: "Simple dinner & return to Arpora", icon: "food" },
    ],
  },
  {
    day: "Day 3",
    date: "26 April",
    title: "North Goa + Return",
    subtitle: "Final Chill & Departure",
    image: northGoaImage,
    schedule: [
      { time: "08:00", activity: "Wake-up", icon: "sunrise" },
      { time: "08:30", activity: "Breakfast (bun omelette + tea)", icon: "food" },
      { time: "09:30", activity: "Aguada Fort (morning views)", icon: "fort" },
      { time: "11:15", activity: "Budget lunch (thali / rice + curry)", icon: "food" },
      { time: "14:00", activity: "Colva or Benaulim Beach (final chill)", icon: "beach" },
      { time: "17:30", activity: "Reach Madgaon station", icon: "travel" },
      { time: "19:30", activity: "Train departure", icon: "departure" },
    ],
  },
];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "food":
      return <Utensils className="h-4 w-4" />;
    case "photo":
      return <Camera className="h-4 w-4" />;
    case "beach":
      return <Palmtree className="h-4 w-4" />;
    case "sunset":
      return <Sun className="h-4 w-4" />;
    case "sunrise":
      return <Sun className="h-4 w-4" />;
    case "party":
      return <PartyPopper className="h-4 w-4" />;
    case "nature":
    case "waterfall":
      return <Mountain className="h-4 w-4" />;
    case "fort":
      return <Castle className="h-4 w-4" />;
    case "travel":
    case "arrival":
    case "departure":
      return <MapPin className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const getIconColor = (iconType: string) => {
  switch (iconType) {
    case "food":
      return "bg-accent/20 text-accent";
    case "photo":
      return "bg-secondary/20 text-secondary";
    case "beach":
      return "bg-palm/20 text-palm";
    case "sunset":
    case "sunrise":
      return "bg-accent/20 text-accent";
    case "party":
      return "bg-secondary/20 text-secondary";
    case "nature":
    case "waterfall":
      return "bg-palm/20 text-palm";
    case "fort":
      return "bg-ocean/20 text-ocean";
    default:
      return "bg-muted text-muted-foreground";
  }
};

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
        <div className="mx-auto max-w-5xl space-y-12">
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
              <div className="relative h-48 md:h-56">
                <img
                  src={dayInfo.image}
                  alt={dayInfo.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-card">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {dayInfo.day}
                    </span>
                    <span className="text-sm text-card/80">{dayInfo.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold md:text-3xl">{dayInfo.title}</h3>
                  <p className="text-card/80">{dayInfo.subtitle}</p>
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="p-6">
                <div className="space-y-3">
                  {dayInfo.schedule.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:shadow-md"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconColor(item.icon)}`}>
                        {getIcon(item.icon)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.activity}</p>
                      </div>
                      <div className="shrink-0 rounded-lg bg-muted px-3 py-1.5">
                        <span className="text-sm font-semibold text-muted-foreground">{item.time}</span>
                      </div>
                    </motion.div>
                  ))}
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
