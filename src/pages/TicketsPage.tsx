import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Train, MapPin, Calendar, Download, Hash, Table, LayoutGrid } from "lucide-react";
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

const profileMap: Record<string, string> = {
  Aaron: aaronProfile, Aldrena: aldrenaProfile, Alter: alterProfile,
  Francis: francisProfile, Hayden: haydenProfile, Henosh: henoshProfile,
  Megha: meghaProfile, Nithin: nithinProfile, Sinoj: sinojProfile, Sonu: sonuProfile,
};

const departureTickets: TicketData[] = [
  { name: "Aaron", image: aaronProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "23", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Aldrena", image: aldrenaProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "24", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Alter", image: alterProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "32", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Francis", image: francisProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "25", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Hayden", image: haydenProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "30", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Henosh", image: henoshProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "27", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Megha", image: meghaProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "31", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Nithin", image: nithinProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "28", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Sinoj", image: sinojProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "26", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
  { name: "Sonu", image: sonuProfile, trainName: "TVCN BVC EXPRESS (19259)", coach: "S5", seat: "29", from: "Ernakulam Town (N)", to: "Madgaon", date: "23 Apr 2026" },
];

const returnTickets: TicketData[] = [
  { name: "Aaron", image: aaronProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "15", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Aldrena", image: aldrenaProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "16", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Alter", image: alterProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "24", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Francis", image: francisProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "17", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Hayden", image: haydenProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "22", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Henosh", image: henoshProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "19", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Megha", image: meghaProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "23", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Nithin", image: nithinProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "20", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Sinoj", image: sinojProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "18", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
  { name: "Sonu", image: sonuProfile, trainName: "BVC TVCN EXPRESS (19260)", coach: "S4", seat: "21", from: "Madgaon", to: "Ernakulam Town (N)", date: "26 Apr 2026" },
];

type ViewMode = "table" | "card";

const TicketCard = ({ ticket, index }: { ticket: TicketData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="glass-card card-hover-lift overflow-hidden rounded-2xl"
  >
    <div className="flex items-center gap-4 border-b border-border/30 bg-primary/5 px-5 py-4">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40">
        <img src={ticket.image} alt={ticket.name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{ticket.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{ticket.trainName}</p>
      </div>
    </div>
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
    <div className="border-t border-border/30 px-5 py-4">
      <button disabled className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
        <Download className="h-4 w-4" />
        Coming Soon
      </button>
    </div>
  </motion.div>
);

const TicketTable = ({ tickets }: { tickets: TicketData[] }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="glass-card overflow-hidden rounded-2xl"
  >
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30 bg-primary/5">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell">Train</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Coach</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Seat</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">Date</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Download</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={t.name} className={`border-b border-border/10 transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-transparent" : "bg-muted/20"}`}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="h-8 w-8 rounded-full object-cover ring-1 ring-primary/30" />
                  <span className="font-medium text-foreground">{t.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{t.trainName}</td>
              <td className="px-4 py-3 text-foreground">{t.coach}</td>
              <td className="px-4 py-3 text-foreground">{t.seat}</td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.date}</td>
              <td className="px-4 py-3 text-right">
                <button disabled className="inline-flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-60">
                  <Download className="h-3 w-3" />
                  Soon
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const ViewToggle = ({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) => (
  <div className="inline-flex rounded-xl bg-muted/50 p-1">
    <button
      onClick={() => onChange("table")}
      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${view === "table" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
    >
      <Table className="h-4 w-4" /> Table
    </button>
    <button
      onClick={() => onChange("card")}
      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${view === "card" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
    >
      <LayoutGrid className="h-4 w-4" /> Cards
    </button>
  </div>
);

const TicketSection = ({
  label, title, subtitle, trainInfo, tickets,
}: {
  label: string; title: React.ReactNode; subtitle: string; trainInfo: string; tickets: TicketData[];
}) => {
  const [view, setView] = useState<ViewMode>("table");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">{label}</span>
          <h2 className="luxury-heading text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            <Train className="mr-1 inline h-4 w-4" />
            {trainInfo}
          </p>
        </motion.div>

        <div className="mb-6 flex justify-center">
          <ViewToggle view={view} onChange={setView} />
        </div>

        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {view === "table" ? (
              <TicketTable key="table" tickets={tickets} />
            ) : (
              <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tickets.map((ticket, i) => (
                  <TicketCard key={ticket.name} ticket={ticket} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

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

    <TicketSection
      label="Departure"
      title={<>Ernakulam → <span className="italic text-primary">Madgaon</span></>}
      subtitle="Onward Journey Tickets"
      trainInfo="TVCN BVC EXPRESS (19259) · 23 April 2026 · Departs 20:20"
      tickets={departureTickets}
    />

    <div className="section-divider" />

    <TicketSection
      label="Return"
      title={<>Madgaon → <span className="italic text-primary">Ernakulam</span></>}
      subtitle="Return Journey Tickets"
      trainInfo="BVC TVCN EXPRESS (19260) · 26 April 2026 · Departs 18:45"
      tickets={returnTickets}
    />

    <Footer />
  </div>
);

export default TicketsPage;
