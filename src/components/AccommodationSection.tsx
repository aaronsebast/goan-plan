import { motion } from "framer-motion";
import { useState } from "react";
import {
  Home, MapPin, Car, Wifi, Tv, Wind, Ban, Coffee, Bed, Bath, Waves,
  TreePalm, Flower2, Sofa, UtensilsCrossed, Briefcase, Refrigerator,
  Zap, SprayCanIcon, ChevronDown, Phone, ExternalLink, Star,
  Shirt, Fan, Eye, Sun, Sparkles, ShowerHead
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import marvellaVilla from "@/assets/marvella-villa.jpg";
import villaPool1 from "@/assets/villa-pool-1.jpg";
import villaPool2 from "@/assets/villa-pool-2.jpg";
import villaLiving from "@/assets/villa-living.jpg";
import villaBathroom from "@/assets/villa-bathroom.jpg";
import villaPool3 from "@/assets/villa-pool-3.jpg";

const galleryImages = [
  { src: marvellaVilla, alt: "Marvella Villa exterior" },
  { src: villaPool1, alt: "Villa with pool view" },
  { src: villaPool2, alt: "Pool area with palms" },
  { src: villaLiving, alt: "Living room" },
  { src: villaBathroom, alt: "Bathroom" },
  { src: villaPool3, alt: "Pool surrounded by palms" },
];

const accommodationDetails = [
  { icon: Bed, label: "3 Bedrooms" },
  { icon: Bath, label: "3 Bathrooms" },
  { icon: Waves, label: "Shared Outdoor Pool" },
  { icon: Sun, label: "Terrace" },
  { icon: Flower2, label: "Garden" },
  { icon: Sofa, label: "Living Room" },
  { icon: UtensilsCrossed, label: "Dining Area" },
  { icon: Briefcase, label: "Work Desk" },
];

const kitchenItems = ["Refrigerator", "Microwave", "Toaster", "Electric Kettle", "Cleaning Products", "Dining Table", "Kitchenette", "Tumble Dryer"];
const bathroomItems = ["Private & Shared Bathroom", "Towels", "Slippers", "Free Toiletries", "Toilet Paper", "Shower"];
const livingItems = ["Air Conditioning", "Tile/Marble Flooring", "Clothes Rack", "Drying Rack", "Iron", "Fan", "Linen"];
const outdoorItems = ["Shared Pool", "Balcony", "Terrace", "Garden", "City View", "Garden View"];

const locationChips = [
  { place: "Baga Beach", distance: "2.9 km" },
  { place: "Chapora Fort", distance: "6 km" },
  { place: "Airport", distance: "26 km" },
];

const whyPerfect = [
  "Private 3BHK villa exclusively for our group — no sharing with strangers",
  "Shared pool to cool off after a day of exploring Goa's best spots",
  "Minutes from Baga Beach — walk to nightlife, shacks & water sports",
  "Fully equipped kitchen for late-night snacks & morning chai sessions",
  "Spacious living & dining area perfect for game nights & group hangouts",
  "Surrounded by lush gardens — a tropical retreat within the heart of Arpora",
];

const CollapsibleSection = ({ title, icon: Icon, items }: { title: string; icon: any; items: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl glass-card px-5 py-4 transition-all hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-5 pb-4 pt-2">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const AccommodationSection = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

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
            Marvella <span className="italic">3BHK Luxury Villa</span>
          </h2>
          <p className="mx-auto mt-2 text-sm text-muted-foreground">with Shared Pool</p>
        </motion.div>

        <div className="mx-auto max-w-5xl space-y-8">

          {/* 1) Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="luxury-heading mb-4 text-2xl font-semibold text-foreground">Overview</h3>
            <p className="leading-relaxed text-muted-foreground">
              Nestled in the heart of Arpora, Marvella Villa is an elegant 3-bedroom retreat designed for the perfect group getaway. 
              Enjoy a shared outdoor swimming pool, spacious terrace with garden views, and modern amenities — all just minutes from Baga Beach. 
              The entire villa is exclusively ours, offering complete privacy and comfort for our Goa adventure.
            </p>
          </motion.div>

          {/* 2) Accommodation Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="luxury-heading mb-5 text-xl font-semibold text-foreground">Accommodation Details</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {accommodationDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-3">
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 3-5) Collapsible Sections */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-3">
            <CollapsibleSection title="Fully Equipped Kitchen" icon={UtensilsCrossed} items={kitchenItems} />
            <CollapsibleSection title="Bathroom Amenities" icon={ShowerHead} items={bathroomItems} />
            <CollapsibleSection title="Living & Comfort" icon={Wind} items={livingItems} />
            <CollapsibleSection title="Outdoor Features" icon={TreePalm} items={outdoorItems} />
          </motion.div>

          {/* 6) Media & Technology */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Media & Technology</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2">
                <Tv className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Flat-screen TV</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2">
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Free WiFi</span>
              </div>
            </div>
          </motion.div>

          {/* 8) Location Highlights */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Location Highlights</h4>
            <div className="flex flex-wrap gap-3">
              {locationChips.map((item) => (
                <div key={item.place} className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                  <span className="text-sm font-medium text-foreground">{item.place}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{item.distance}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 9) Owner Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Owner Contact</h4>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">+91 8175955543</span>
              </div>
              <a href="tel:+918175955543" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 btn-glow">
                <Phone className="h-4 w-4" /> Call Owner
              </a>
            </div>
          </motion.div>

          {/* 10) Address + Google Maps */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Marvella Villa – 1st Villa, Vision Green,<br />
                Mainath Bhati, Anjuna Arpora Road,<br />
                403516 Arpora, Goa, India
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/3yzcuYxaXY9uR51x8?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90 btn-glow"
            >
              <ExternalLink className="h-4 w-4" /> Open in Google Maps
            </a>
          </motion.div>

          {/* 11) Premium Highlight Box */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <h3 className="luxury-heading text-xl font-semibold text-foreground">Why this stay is perfect for our trip</h3>
            </div>
            <ul className="space-y-3">
              {whyPerfect.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 12) Stay Image Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="luxury-heading mb-6 text-center text-2xl font-semibold text-foreground">
              Villa <span className="italic">Gallery</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImg(i)}
                >
                  <img src={img.src} alt={img.alt} className="h-48 w-full object-cover md:h-56" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fullscreen Image Viewer */}
          {selectedImg !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4" onClick={() => setSelectedImg(null)}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={galleryImages[selectedImg].src}
                alt={galleryImages[selectedImg].alt}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              />
            </div>
          )}

          {/* Booked badge */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-palm/90 px-4 py-2 text-xs font-semibold text-palm-foreground">
              🏡 Booked & Confirmed — The entire place is exclusively ours!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
