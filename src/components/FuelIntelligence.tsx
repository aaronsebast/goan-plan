import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, TrendingUp, Droplets, Route, Gauge, Activity, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MILEAGE = 40; // km/l
const TOTAL_DISTANCE = 91; // km
const FALLBACK_PRICE = 96.43;

const ROTATING_MESSAGES = [
  "Fuel price synced with Goa market",
  "Daily petrol update enabled",
  "Trip fuel cost recalculating automatically",
  "Smart route fuel budget active",
];

// Simulated 7-day trend data
const generateTrend = (currentPrice: number) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date().getDay();
  return days.map((d, i) => ({
    day: d,
    price: +(currentPrice + (Math.random() - 0.5) * 1.2).toFixed(2),
    isToday: i === (today === 0 ? 6 : today - 1),
  }));
};

const FuelIntelligence = () => {
  const [petrolPrice, setPetrolPrice] = useState(FALLBACK_PRICE);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [lastSynced, setLastSynced] = useState<string>("");
  const [showPulse, setShowPulse] = useState(true);

  const trendData = useMemo(() => generateTrend(petrolPrice), [petrolPrice]);

  // Animate price counting up
  useEffect(() => {
    const target = petrolPrice;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, target);
      setAnimatedPrice(+current.toFixed(2));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [petrolPrice]);

  // Rotating messages
  useEffect(() => {
    const timer = setInterval(() => setMessageIdx((i) => (i + 1) % ROTATING_MESSAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Periodic pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setShowPulse(false);
      setTimeout(() => setShowPulse(true), 200);
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  // Set last synced
  useEffect(() => {
    setLastSynced(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }));
  }, []);

  const litresNeeded = +(TOTAL_DISTANCE / MILEAGE).toFixed(3);
  const fuelCost = +(litresNeeded * petrolPrice).toFixed(2);

  const analyticsCards = [
    { icon: Fuel, label: "Petrol Price", value: `₹${petrolPrice.toFixed(2)}/L`, color: "text-accent" },
    { icon: Route, label: "Route Distance", value: `${TOTAL_DISTANCE} km`, color: "text-primary" },
    { icon: Droplets, label: "Fuel Needed", value: `${litresNeeded} L`, color: "text-secondary" },
    { icon: Zap, label: "Fuel Cost", value: `₹${fuelCost.toFixed(2)}`, color: "text-accent" },
    { icon: Gauge, label: "Mileage", value: `${MILEAGE} km/L`, color: "text-primary" },
    { icon: Activity, label: "7-Day Trend", value: trendData.length > 0 ? "Stable" : "—", color: "text-secondary" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Smart Analytics</span>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Live Fuel <span className="italic text-primary">Intelligence</span>
          </h2>
        </motion.div>

        {/* Main Fuel Price Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-10 max-w-lg">
          <Card className="overflow-hidden border-primary/20 bg-card/60 backdrop-blur-xl shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]">
            <CardContent className="p-8 text-center">
              {/* Fuel pump icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]">
                <Fuel className="h-8 w-8 text-primary" />
              </div>

              {/* Animated price */}
              <div className="relative mb-2">
                <motion.span
                  className="text-5xl font-bold text-foreground font-serif"
                  key={animatedPrice}
                >
                  ₹{animatedPrice.toFixed(2)}
                </motion.span>
                <span className="ml-1 text-lg text-muted-foreground">/ Litre</span>
                {/* Shimmer overlay */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                />
              </div>

              <p className="text-sm font-medium text-muted-foreground">Goa Petrol Price</p>

              {/* LIVE badge */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-primary ${showPulse ? "animate-ping" : ""} opacity-75`} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-semibold text-primary">LIVE</span>
                <span className="text-xs text-muted-foreground">• Auto Updated Daily</span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">Last synced: {lastSynced}</p>

              {/* Rotating status */}
              <div className="mt-4 h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-muted-foreground/70"
                  >
                    {ROTATING_MESSAGES[messageIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Petrol Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-10 max-w-2xl">
          <Card className="border-border/30 bg-card/40 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">7-Day Fuel Trend</span>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">₹/Litre</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} hide />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(val: number) => [`₹${val.toFixed(2)}`, "Price"]}
                  />
                  <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fuelGradient)" dot={{ r: 3, fill: "hsl(var(--primary))" }} activeDot={{ r: 5, stroke: "hsl(var(--primary))", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Cards Grid */}
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-4 md:grid-cols-3">
          {analyticsCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/20 bg-card/40 backdrop-blur-lg hover:border-primary/30 transition-colors">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <card.icon className={`mb-2 h-6 w-6 ${card.color}`} />
                  <span className="text-xs text-muted-foreground">{card.label}</span>
                  <span className="mt-1 text-base font-bold text-foreground">{card.value}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuelIntelligence;
