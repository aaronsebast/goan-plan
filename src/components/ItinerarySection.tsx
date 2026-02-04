import { motion } from "framer-motion";
import { MapPin, Sun, Moon, Utensils, Camera, PartyPopper, Palmtree, Mountain, Castle } from "lucide-react";
import northGoaImage from "@/assets/north-goa-beach.jpg";
import fortImage from "@/assets/goa-fort.jpg";

const days = [
  {
    day: "Day 1",
    date: "24 April",
    title: "Arrival + North Goa Vibes",
    subtitle: "Arrival, Photos & Nightlife",
    image: northGoaImage,
    schedule: [
      { time: "10:50", activity: "Arrival at Madgaon Station", icon: "arrival" },
      { time: "11:30", activity: "Travel from Madgaon to Arpora", icon: "travel" },
      { time: "13:00", activity: "Freshen up & rest at stay", icon: "rest" },
      { time: "14:00", activity: "Lunch - Rice meals / fish curry / biryani (local mess)", icon: "food" },
      { time: "16:00", activity: "Parra Road - iconic palm road photos", icon: "photo" },
      { time: "18:00", activity: "Sundowner spot - sunset views", icon: "sunset" },
      { time: "19:30", activity: "Tito's Lane - photos & walk (outside vibe)", icon: "party" },
      { time: "21:00", activity: "Dinner - Shawarma / rolls / fried rice", icon: "food" },
      { time: "22:30", activity: "Back to stay & rest", icon: "rest" },
    ],
  },
  {
    day: "Day 2",
    date: "25 April",
    title: "South Goa Beach Marathon",
    subtitle: "Long Ride Day - 7 Beaches",
    image: fortImage,
    schedule: [
      { time: "05:30", activity: "Wake up early", icon: "sunrise" },
      { time: "06:00", activity: "Quick breakfast - Tea + bun omelette / bananas", icon: "food" },
      { time: "06:30", activity: "Start ride to South Goa", icon: "travel" },
      { time: "08:00", activity: "Colva Beach - morning calm", icon: "beach" },
      { time: "09:00", activity: "Betalbatim Beach - quick stop", icon: "beach" },
      { time: "10:30", activity: "Cabo de Rama Beach & Fort - views & photos", icon: "fort" },
      { time: "12:30", activity: "Non-veg Thali lunch - Fish/Chicken thali", icon: "food" },
      { time: "14:00", activity: "Cola Beach - lagoon & kayaking", icon: "beach" },
      { time: "15:30", activity: "Agonda Beach - short peaceful stop", icon: "beach" },
      { time: "16:30", activity: "Butterfly Beach - viewpoint + trek (20 min walk)", icon: "beach" },
      { time: "18:00", activity: "Palolem Beach - sunset", icon: "sunset" },
      { time: "19:30", activity: "Night ride back to Arpora (ride slow & safe)", icon: "travel" },
      { time: "22:00", activity: "Dinner - Budget fast food near stay", icon: "food" },
    ],
  },
  {
    day: "Day 3",
    date: "26 April",
    title: "Relaxed Day + Checkout",
    subtitle: "Light Sightseeing & Departure",
    image: northGoaImage,
    schedule: [
      { time: "10:00", activity: "Wake up (finally some rest)", icon: "sunrise" },
      { time: "11:00", activity: "Vacate room & checkout", icon: "travel" },
      { time: "11:30", activity: "St. Francis Church - Old Goa", icon: "fort" },
      { time: "13:00", activity: "Vasco da Gama City - walk & tea", icon: "travel" },
      { time: "14:30", activity: "Lunch - Simple meals / fish fry + rice", icon: "food" },
      { time: "16:00", activity: "Harvalem (Arvalem) Area - if time permits", icon: "nature" },
      { time: "18:00", activity: "Reach Madgaon Station", icon: "travel" },
      { time: "19:30", activity: "Train departure - Goodbye Goa", icon: "departure" },
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
    case "rest":
      return "bg-muted text-muted-foreground";
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
