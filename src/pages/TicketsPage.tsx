import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Train, MapPin, Calendar, Download, Hash } from "lucide-react";
import heroSunset from "@/assets/hero-goa-sunset.jpg";

import aaronProfile from "@/assets/aaron-profile.jpg";
import aldrenaProfile from "@/assets/aldrena-profile.jpg";
import francisProfile from "@/assets/francis-profile.jpg";
import sinojProfile from "@/assets/sinoj-profile.jpg";
import henoshProfile from "@/assets/henosh-profile.jpg";
import nithinProfile from "@/assets/nithin-profile.jpg";
import sonuProfile from "@/assets/sonu-profile.jpg";
import haydenProfile from "@/assets/hayden-profile.jpg";
import meghaProfile from "@/assets/megha-profile.jpg";
import alterProfile from "@/assets/alter-profile.jpg";

interface TicketData {
  name: string;
  image: string;
  trainName: string;
  coach: string;
  seat: string;
  from: string;
  to: string;
  date: string;
}

const departureTickets: TicketData[] = [
  { name: "Aaron", image: aaronProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "23", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Aldrena", image: aldrenaProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "24", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Francis", image: francisProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "25", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Sinoj", image: sinojProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "26", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Henosh", image: henoshProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "27", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Nithin", image: nithinProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "28", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Sonu", image: sonuProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "29", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Hayden", image: haydenProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "30", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Megha", image: meghaProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "31", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Alter", image: alterProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "32", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
];

const TicketCard = ({ ticket, index }: { ticket: TicketData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className="glass-card card-hover-lift overflow-hidden rounded-2xl"
  >
    {/* Top strip */}
    <div className="flex items-center gap-4 border-b border-border/30 bg-primary/5 px-5 py-4">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40">
        <img src={ticket.image} alt={ticket.name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{ticket.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{ticket.trainName}</p>
      </div>
    </div>

    {/* Details */}
    <div className="space-y-3 p-5">
      <div className="flex items-center gap-3">
        <Hash className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Coach / Seat</p>
          <p className="truncate font-medium text-foreground">{ticket.coach} — Seat {ticket.seat}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Route</p>
          <p className="truncate font-medium text-foreground">{ticket.from} → {ticket.to}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Journey Date</p>
          <p className="truncate font-medium text-foreground">{ticket.date}</p>
        </div>
      </div>
    </div>

    {/* Download */}
    <div className="border-t border-border/30 px-5 py-4">
      <button className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110">
        <Download className="h-4 w-4" />
        Download Ticket
      </button>
    </div>
  </motion.div>
);

const TicketsPage = () => (
  <div className="min-h-screen page-enter">
    <Navigation />
    <PageHero
      title="Train"
      titleAccent="Tickets"
      subtitle="Your personal train ticket details for the Goa journey"
      tag="Journey Passes"
      backgroundImage={heroSunset}
    />
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Departure
          </span>
          <h2 className="luxury-heading text-3xl font-semibold text-foreground md:text-4xl">
            Ernakulam → <span className="italic text-primary">Madgaon</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            <Train className="mr-1 inline h-4 w-4" />
            TVCN BVC EXPRESS (19259) · 23 April 2026 · Departs 20:20
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departureTickets.map((ticket, i) => (
            <TicketCard key={ticket.name} ticket={ticket} index={i} />
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TicketsPage;
