import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Sun, PartyPopper, Gem, ChevronDown, Fuel, Route, Bike, Navigation2, Home,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Day1HeroMap from "@/components/Day1HeroMap";
import NightlifeDirectory from "@/components/NightlifeDirectory";
import FuelIntelligence from "@/components/FuelIntelligence";
import heroSunset from "@/assets/hero-goa-sunset.jpg";
import parraImg from "@/assets/parra-road.jpg";
import aguadaImg from "@/assets/fort-aguada.jpg";
import candolimImg from "@/assets/candolim-beach.jpg";
import ashwemImg from "@/assets/ashwem-beach.jpg";
import querimImg from "@/assets/querim-beach.jpg";
import titosImg from "@/assets/titos-lane.jpg";
import northGoaImg from "@/assets/north-goa-beach.jpg";
import goaFortImg from "@/assets/goa-fort.jpg";

const MILEAGE = 40;
const PETROL_PRICE = 96.43;

interface Stop {
  id: string;
  number: number;
  name: string;
  time: string;
  distance: string;
  distanceKm: number;
  scooterTime: string;
  description: string;
  images: string[];
  badges?: { label: string; variant: "sunset" | "hidden" | "party" }[];
  partyOptions?: boolean;
  mapsQuery: string;
}

const stops: Stop[] = [
  {
    id: "parra", number: 2, name: "Parra Coconut Tree Road",
    time: "3:00 PM – 3:25 PM", distance: "5 km", distanceKm: 5, scooterTime: "10 min",
    description: "Iconic coconut tree tunnel road. Perfect aesthetic photo stop and reel location. Spend 20 minutes max.",
    images: [parraImg, northGoaImg, heroSunset],
    mapsQuery: "Parra+Road+Goa",
  },
  {
    id: "aguada", number: 3, name: "Fort Aguada",
    time: "3:45 PM – 4:30 PM", distance: "17 km", distanceKm: 17, scooterTime: "30 min",
    description: "Historic sea fort with cliff views and lighthouse. Windy panoramic Arabian Sea views. Quick 30-minute explore.",
    images: [aguadaImg, goaFortImg, heroSunset],
    mapsQuery: "Fort+Aguada+Goa",
  },
  {
    id: "candolim", number: 4, name: "Candolim Beach",
    time: "4:40 PM – 5:15 PM", distance: "4 km", distanceKm: 4, scooterTime: "8 min",
    description: "Calmer alternative to Baga. Relax, walk along shoreline, quick coconut water break.",
    images: [candolimImg, northGoaImg, ashwemImg],
    mapsQuery: "Candolim+Beach+Goa",
  },
  {
    id: "ashwem", number: 5, name: "Ashwem Beach",
    time: "6:00 PM – 6:40 PM", distance: "23 km", distanceKm: 23, scooterTime: "40 min",
    description: "Wide, clean, peaceful beach. Perfect golden hour sunset vibes. Less crowded and premium feel.",
    images: [ashwemImg, querimImg, northGoaImg],
    badges: [{ label: "Sunset Highlight", variant: "sunset" }],
    mapsQuery: "Ashwem+Beach+Goa",
  },
  {
    id: "querim", number: 6, name: "Querim Beach (Keri Beach + Cave)",
    time: "7:00 PM – 7:45 PM", distance: "14 km", distanceKm: 14, scooterTime: "20 min",
    description: "Hidden northernmost beach with small rock cave. Raw, untouched vibe. Ideal hidden sunset photography spot.",
    images: [querimImg, ashwemImg, goaFortImg],
    badges: [{ label: "Hidden Gem", variant: "hidden" }],
    mapsQuery: "Querim+Beach+Goa",
  },
  {
    id: "baga", number: 7, name: "Baga – Tito's Lane (Party Mode)",
    time: "Around 9:00–9:30 PM", distance: "25 km", distanceKm: 25, scooterTime: "45 min",
    description: "Nightlife hub of North Goa. Clubs, music, party energy.",
    images: [titosImg, heroSunset, northGoaImg],
    badges: [{ label: "Party Mode", variant: "party" }],
    partyOptions: true,
    mapsQuery: "Titos+Lane+Baga+Goa",
  },
  {
    id: "return", number: 8, name: "Return to Arpora",
    time: "~1:00 AM", distance: "3 km", distanceKm: 3, scooterTime: "10 min",
    description: "Short ride back to home base. Safe late-night return.",
    images: [heroSunset, northGoaImg, parraImg],
    mapsQuery: "Arpora+Goa",
  },
];

const badgeStyle = (variant: string) => {
  switch (variant) {
    case "sunset": return "bg-accent/20 text-accent border-accent/40";
    case "hidden": return "bg-primary/20 text-primary border-primary/40";
    case "party": return "bg-secondary/20 text-secondary border-secondary/40 animate-pulse";
    default: return "";
  }
};

const badgeIcon = (variant: string) => {
  switch (variant) {
    case "sunset": return <Sun className="h-3 w-3" />;
    case "hidden": return <Gem className="h-3 w-3" />;
    case "party": return <PartyPopper className="h-3 w-3" />;
    default: return null;
  }
};

const Day1Page = () => {
  const stopRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToNext = (currentIndex: number) => {
    const next = stops[currentIndex + 1];
    if (next && stopRefs.current[next.id]) {
      stopRefs.current[next.id]!.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openMaps = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const totalDistance = 91;
  const totalFuel = +(totalDistance / MILEAGE).toFixed(3);
  const totalCost = +(totalFuel * PETROL_PRICE).toFixed(2);

  return (
    <div className="min-h-screen page-enter">
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
        <img src={heroSunset} alt="Day 1 Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-3 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Day 1 · 25 April
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="font-serif text-4xl font-bold text-foreground md:text-6xl"
          >
            Explorer + Hidden + <span className="italic text-primary">Party Combo</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Route optimized by distance · 8 stops · 91 km
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            <Clock className="h-4 w-4" /> Depart 3:00 PM from Arpora
          </motion.div>
        </div>
      </section>

      {/* 3D Hero Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">3D Route Map</span>
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              North Goa <span className="italic text-primary">Navigator</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Arpora → Parra → Aguada → Candolim → Ashwem → Querim → Baga → Arpora
            </p>
          </motion.div>
          <Day1HeroMap />
        </div>
      </section>

      {/* Timeline Accordion */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Timeline</span>
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Stop-by-Stop <span className="italic text-primary">Itinerary</span>
            </h2>
          </motion.div>

          {/* Departure card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-auto mb-6 max-w-3xl">
            <Card className="border-accent/20 bg-card/40 backdrop-blur-lg">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Home className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-foreground">Stop 1: Arpora – Departure</h3>
                  <p className="text-sm text-muted-foreground">🕒 3:00 PM · Home base</p>
                </div>
                <Badge variant="outline" className="ml-auto text-[10px]">START</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="multiple" defaultValue={["parra", "baga"]}>
              {stops.map((stop, idx) => {
                const fuelL = +(stop.distanceKm / MILEAGE).toFixed(3);
                const fuelCost = +(fuelL * PETROL_PRICE).toFixed(2);
                return (
                  <motion.div
                    key={stop.id}
                    ref={(el) => { stopRefs.current[stop.id] = el; }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <AccordionItem value={stop.id} className="mb-4 overflow-hidden rounded-2xl border-none glass-card">
                      <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="flex flex-1 flex-wrap items-center gap-3 text-left">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {stop.number}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-serif text-base font-semibold text-foreground md:text-lg">{stop.name}</h3>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <Badge variant="outline" className="gap-1 text-[10px]"><MapPin className="h-3 w-3" /> {stop.distance}</Badge>
                              <Badge variant="outline" className="gap-1 text-[10px]"><Bike className="h-3 w-3" /> {stop.scooterTime}</Badge>
                              <Badge variant="outline" className="gap-1 text-[10px]"><Fuel className="h-3 w-3" /> {fuelL}L · ₹{fuelCost}</Badge>
                              {stop.badges?.map((b) => (
                                <span key={b.label} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeStyle(b.variant)}`}>
                                  {badgeIcon(b.variant)} {b.label}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="shrink-0 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                            {stop.time.split("–")[0].trim()}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5">
                        <div className="space-y-4">
                          <div className="rounded-xl bg-muted/30 p-4">
                            <p className="flex items-start gap-2 text-sm text-foreground">
                              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span><strong>Time:</strong> {stop.time}</span>
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">{stop.description}</p>
                          </div>

                          {/* Photo gallery */}
                          <div className="relative">
                            <Carousel className="w-full">
                              <CarouselContent>
                                {stop.images.map((img, imgIdx) => (
                                  <CarouselItem key={imgIdx} className="basis-2/3 md:basis-1/2">
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: imgIdx * 0.1 }}
                                      className="overflow-hidden rounded-xl border border-border/20">
                                      <img src={img} alt={`${stop.name} - ${imgIdx + 1}`} className="aspect-video w-full object-cover" loading="lazy" />
                                    </motion.div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious className="left-1" />
                              <CarouselNext className="right-1" />
                            </Carousel>
                          </div>

                          {/* Navigate button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openMaps(stop.mapsQuery)}
                            className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <Navigation2 className="h-4 w-4" /> Navigate in Google Maps
                          </Button>

                          {/* Nightlife for Tito's */}
                          {stop.partyOptions && (
                            <div className="space-y-4">
                              <NightlifeDirectory />
                              <motion.div
                                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-secondary/20 via-primary/20 to-accent/20 border border-secondary/30 py-4"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <PartyPopper className="h-6 w-6 text-secondary" />
                                <span className="text-lg font-bold text-secondary">Party Mode ON</span>
                                <PartyPopper className="h-6 w-6 text-secondary" />
                              </motion.div>
                            </div>
                          )}

                          {/* Continue */}
                          {idx < stops.length - 1 && (
                            <button
                              onClick={() => scrollToNext(idx)}
                              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                            >
                              Continue the Journey <ChevronDown className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Total Ride Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-3xl glass-card p-8"
          >
            <h3 className="mb-6 text-center font-serif text-2xl font-semibold text-foreground">
              Total Ride <span className="italic text-primary">Overview</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Route, label: "Total Distance", value: `${totalDistance} km` },
                { icon: Fuel, label: "Fuel Needed", value: `${totalFuel} L` },
                { icon: Bike, label: "Mode", value: "Scooter" },
                { icon: MapPin, label: "Fuel Cost", value: `₹${totalCost}` },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center rounded-xl bg-muted/30 p-4 text-center">
                  <stat.icon className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="mt-1 text-sm font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fuel Intelligence */}
      <FuelIntelligence />

      {/* Mobile sticky summary */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-card/80 backdrop-blur-xl p-3 md:hidden">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Bike className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">Day 1</span>
          </div>
          <span className="text-muted-foreground">{totalDistance} km</span>
          <span className="text-muted-foreground">{totalFuel} L</span>
          <span className="font-semibold text-accent">₹{totalCost}</span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Day1Page;
