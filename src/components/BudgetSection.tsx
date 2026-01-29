import { motion } from "framer-motion";
import { Vote, RefreshCw, Eye, Users, MessageCircle, Bell } from "lucide-react";

const principles = [
  {
    icon: Vote,
    title: "Democratic Voting",
    description: "Every decision is made through group voting. Each voice matters equally.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    description: "All changes and plans are updated daily on this website for full transparency.",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description: "Budget breakdowns, bookings, and decisions are visible to all members.",
  },
];

const updates = [
  {
    date: "Jan 28",
    title: "Website Launched",
    description: "Official trip planning website is now live with all details.",
    type: "announcement",
  },
  {
    date: "Upcoming",
    title: "Train Tickets",
    description: "Booking confirmation for Nethravathi Express pending.",
    type: "pending",
  },
  {
    date: "Upcoming",
    title: "Cruise Selection",
    description: "Group voting for dinner cruise options to begin soon.",
    type: "pending",
  },
];

const BudgetSection = () => {
  return (
    <section id="updates" className="relative bg-muted py-24 md:py-32">
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
            How We Decide
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-foreground md:text-5xl">
            Budget & <span className="italic">Decisions</span>
          </h2>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl"
        >
          <div className="rounded-3xl bg-gradient-ocean p-8 text-center text-ocean-foreground md:p-12">
            <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
            <p className="font-serif text-xl leading-relaxed md:text-2xl">
              "All plans, updates, and changes are made by democratic group voting 
              and budget consideration. Every decision is transparent and updated 
              daily in real time."
            </p>
          </div>
        </motion.div>

        {/* Principles Grid */}
        <div className="mx-auto mb-20 grid max-w-4xl gap-6 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20">
                <principle.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Live Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-2xl font-semibold text-foreground">
              Live Updates
            </h3>
          </div>

          <div className="space-y-4">
            {updates.map((update, index) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex gap-4 rounded-xl border p-4 ${
                  update.type === 'announcement'
                    ? 'border-palm/30 bg-palm/10'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className={`text-xs font-semibold uppercase ${
                    update.type === 'announcement' ? 'text-palm' : 'text-muted-foreground'
                  }`}>
                    {update.date}
                  </span>
                  <div className={`mt-2 h-full w-px ${
                    update.type === 'announcement' ? 'bg-palm/30' : 'bg-border'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{update.title}</h4>
                    {update.type === 'pending' && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">
                        PENDING
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{update.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BudgetSection;