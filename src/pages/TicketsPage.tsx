import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Train, MapPin, Calendar, Download, Hash, Table, LayoutGrid } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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
import rahulProfile from "@/assets/rahul-profile.jpg";

interface TicketData {
  name: string;
  fullName: string;
  image: string;
  trainName: string;
  coach: string;
  seat: string;
  berth: string;
  from: string;
  to: string;
  date: string;
  pnr: string;
  pdfFile: string;
}

// UP Journey - 16338 ERS OKHA EXPRESS - Coach S7
const departureTickets: TicketData[] = [
  { name: "Megha", fullName: "Megha C A", image: meghaProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "73", berth: "LB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Aldrena", fullName: "Ann Mary Aldrena", image: aldrenaProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "76", berth: "LB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Sonu", fullName: "Antony Sonu K S", image: sonuProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "74", berth: "MB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Hayden", fullName: "Hayden Fernandez", image: haydenProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "75", berth: "UB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Aaron", fullName: "Aaron Sebastian", image: aaronProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "77", berth: "MB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Alter", fullName: "Alter John Marian", image: alterProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "78", berth: "UB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4333811721", pdfFile: "/tickets/up-pnr-4333811721.pdf" },
  { name: "Nithin", fullName: "Nithin Antony", image: nithinProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "42", berth: "MB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4433811630", pdfFile: "/tickets/up-pnr-4433811630.pdf" },
  { name: "Francis", fullName: "Francis Xavier", image: francisProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "43", berth: "UB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4433811630", pdfFile: "/tickets/up-pnr-4433811630.pdf" },
  { name: "Sinoj", fullName: "Sinoj P J", image: sinojProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "45", berth: "MB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4433811630", pdfFile: "/tickets/up-pnr-4433811630.pdf" },
  { name: "Henosh", fullName: "Henosh Antony Jacob", image: henoshProfile, trainName: "ERS OKHA EXPRESS (16338)", coach: "S7", seat: "46", berth: "UB", from: "Ernakulam Jn (ERS)", to: "Madgaon (MAO)", date: "24 Apr 2026", pnr: "4433811630", pdfFile: "/tickets/up-pnr-4433811630.pdf" },
];

// DOWN Journey - 16345 NETRAVATI EXPRESS - Coach S6
const returnTickets: TicketData[] = [
  { name: "Rahul", fullName: "Rahul Reji", image: rahulProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "48", berth: "SU", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8145112435", pdfFile: "/tickets/down-pnr-8145112435.pdf" },
  { name: "Aldrena", fullName: "Ann Mary Aldrena", image: aldrenaProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "19", berth: "UB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8145112435", pdfFile: "/tickets/down-pnr-8145112435.pdf" },
  { name: "Megha", fullName: "Megha C A", image: meghaProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "20", berth: "LB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8145112435", pdfFile: "/tickets/down-pnr-8145112435.pdf" },
  { name: "Aaron", fullName: "Aaron Sebastian", image: aaronProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "21", berth: "MB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8145112435", pdfFile: "/tickets/down-pnr-8145112435.pdf" },
  { name: "Alter", fullName: "Alter John Marian", image: alterProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "22", berth: "UB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8145112435", pdfFile: "/tickets/down-pnr-8145112435.pdf" },
  { name: "Nithin", fullName: "Nithin Antony", image: nithinProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "41", berth: "LB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8745112420", pdfFile: "/tickets/down-pnr-8745112420.pdf" },
  { name: "Francis", fullName: "Francis Xavier", image: francisProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "42", berth: "MB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8745112420", pdfFile: "/tickets/down-pnr-8745112420.pdf" },
  { name: "Sinoj", fullName: "Sinoj P J", image: sinojProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "43", berth: "UB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8745112420", pdfFile: "/tickets/down-pnr-8745112420.pdf" },
  { name: "Henosh", fullName: "Henosh Antony Jacob", image: henoshProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "44", berth: "LB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8745112420", pdfFile: "/tickets/down-pnr-8745112420.pdf" },
  { name: "Sonu", fullName: "Antony Sonu K S", image: sonuProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "66", berth: "MB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8545113413", pdfFile: "/tickets/down-pnr-8545113413.pdf" },
  { name: "Hayden", fullName: "Hayden Fernandez", image: haydenProfile, trainName: "NETRAVATI EXPRESS (16345)", coach: "S6", seat: "67", berth: "UB", from: "Madgaon (MAO)", to: "Ernakulam Jn (ERS)", date: "27 Apr 2026", pnr: "8545113413", pdfFile: "/tickets/down-pnr-8545113413.pdf" },
];

const getBerthColor = (berth: string) => {
  switch (berth) {
    case "LB": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "MB": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "UB": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "SU": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

type ViewMode = "table" | "card";

const DownloadButton = ({ ticket }: { ticket: TicketData }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={ticket.pdfFile}
          download={`Ticket-${ticket.name}-${ticket.pnr}.pdf`}
          className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          <Download className="h-3.5 w-3.5" />
          Download Ticket
        </a>
      </TooltipTrigger>
      <TooltipContent>Download Official IRCTC Ticket (PNR: {ticket.pnr})</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

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
        <img src={ticket.image} alt={ticket.fullName} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{ticket.fullName}</h3>
        <p className="truncate text-xs text-muted-foreground">{ticket.trainName}</p>
      </div>
      <span className={`shrink-0 rounded-lg border px-2 py-1 text-xs font-bold ${getBerthColor(ticket.berth)}`}>
        {ticket.berth}
      </span>
    </div>
    <div className="space-y-3 p-5">
      <div className="flex items-center gap-3">
        <Hash className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Coach / Seat / PNR</p>
          <p className="truncate font-medium text-foreground">{ticket.coach}/{ticket.seat} · PNR: {ticket.pnr}</p>
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
    <div className="border-t border-border/30 px-5 py-4 flex justify-center">
      <DownloadButton ticket={ticket} />
    </div>
  </motion.div>
);

const TicketTable = ({ tickets }: { tickets: TicketData[] }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card overflow-hidden rounded-2xl">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30 bg-primary/5">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Seat</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Berth</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell">PNR</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">Date</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Download</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={`${t.name}-${t.seat}`} className={`border-b border-border/10 transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-transparent" : "bg-muted/20"}`}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.fullName} className="h-8 w-8 rounded-full object-cover ring-1 ring-primary/30" />
                  <div>
                    <span className="font-medium text-foreground">{t.name}</span>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">{t.fullName}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-foreground">{t.coach}/{t.seat}</td>
              <td className="px-4 py-3">
                <span className={`rounded-md border px-2 py-0.5 text-xs font-bold ${getBerthColor(t.berth)}`}>{t.berth}</span>
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground hidden sm:table-cell">{t.pnr}</td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.date}</td>
              <td className="px-4 py-3 text-right">
                <a
                  href={t.pdfFile}
                  download={`Ticket-${t.name}-${t.pnr}.pdf`}
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  <Download className="h-3 w-3" />
                  PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

// Coach layout visualization
const CoachLayout = ({ tickets, coachName }: { tickets: TicketData[]; coachName: string }) => {
  const seatMap = new Map(tickets.map(t => [parseInt(t.seat), t]));

  // Sleeper coach: 72 berths, grouped in bays of 8 (LB, MB, UB x2 + SL, SU)
  const bays: number[][] = [];
  for (let i = 1; i <= 72; i += 8) {
    bays.push(Array.from({ length: 8 }, (_, j) => i + j));
  }

  const getBerthType = (seatNum: number): string => {
    const passenger = seatMap.get(seatNum);
    if (passenger) return passenger.berth;
    const pos = ((seatNum - 1) % 8);
    if (pos === 0 || pos === 3) return "LB";
    if (pos === 1 || pos === 4) return "MB";
    if (pos === 2 || pos === 5) return "UB";
    if (pos === 6) return "SL";
    return "SU";
  };

  const getBerthBg = (berth: string, occupied: boolean) => {
    if (!occupied) return "bg-muted/30 border-border/20";
    switch (berth) {
      case "LB": return "bg-emerald-500/30 border-emerald-500/50";
      case "MB": return "bg-blue-500/30 border-blue-500/50";
      case "UB": return "bg-purple-500/30 border-purple-500/50";
      case "SU": return "bg-orange-500/30 border-orange-500/50";
      default: return "bg-muted/30 border-border/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="mb-4 font-serif text-xl font-semibold text-foreground flex items-center gap-2">
        <Train className="h-5 w-5 text-primary" />
        Coach {coachName} Layout
      </h3>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-500/40" /> LB (Lower)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-blue-500/40" /> MB (Middle)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-purple-500/40" /> UB (Upper)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-orange-500/40" /> SU (Side Upper)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-muted/50" /> Empty</span>
      </div>

      {/* Coach grid - scrollable */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-[700px]">
          {bays.map((bay, bayIdx) => (
            <div key={bayIdx} className="flex flex-col gap-1 rounded-lg border border-border/20 bg-card/50 p-1.5 min-w-[70px]">
              {bay.map((seatNum) => {
                const passenger = seatMap.get(seatNum);
                const berthType = getBerthType(seatNum);
                const isOccupied = !!passenger;
                return (
                  <div
                    key={seatNum}
                    className={`flex flex-col items-center justify-center rounded-md border px-1 py-1 text-center transition-all ${getBerthBg(berthType, isOccupied)} ${isOccupied ? "ring-1 ring-primary/30" : ""}`}
                  >
                    <span className={`text-[10px] font-bold ${isOccupied ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {seatNum}
                    </span>
                    {passenger && (
                      <span className="text-[8px] font-medium text-primary truncate max-w-[60px]">
                        {passenger.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
  label, title, subtitle, trainInfo, tickets, coachName,
}: {
  label: string; title: React.ReactNode; subtitle: string; trainInfo: string; tickets: TicketData[]; coachName: string;
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
                  <TicketCard key={`${ticket.name}-${ticket.seat}`} ticket={ticket} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Coach Layout */}
        <div className="mx-auto mt-12 max-w-6xl">
          <CoachLayout tickets={tickets} coachName={coachName} />
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
      label="Departure · 10 Passengers"
      title={<>Ernakulam Jn → <span className="italic text-primary">Madgaon</span></>}
      subtitle="Onward Journey Tickets"
      trainInfo="ERS OKHA EXPRESS (16338) · 24 April 2026 · Departs 20:25 · Sleeper · Coach S7"
      tickets={departureTickets}
      coachName="S7"
    />

    <div className="section-divider" />

    <TicketSection
      label="Return · 11 Passengers"
      title={<>Madgaon → <span className="italic text-primary">Ernakulam Jn</span></>}
      subtitle="Return Journey Tickets"
      trainInfo="NETRAVATI EXPRESS (16345) · 27 April 2026 · Departs 22:42 · Sleeper · Coach S6"
      tickets={returnTickets}
      coachName="S6"
    />

    <Footer />
  </div>
);

export default TicketsPage;
