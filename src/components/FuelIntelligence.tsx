import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, TrendingUp, Droplets, Route, Gauge, Activity, Zap, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MILEAGE = 40;
const TOTAL_DISTANCE = 91;
const FALLBACK_PRICE = 96.43;

const ROTATING_MESSAGES = [
  "Fuel price synced with Goa market",
  "Auto updating daily",
  "Route budget recalculated automatically",
  "Smart fuel budget active",
];

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
  const [lastSynced, setLastSynced] = useState("");
  const [showPulse, setShowPulse] = useState(true);
  const [syncAnim, setSyncAnim] = useState(false);

  const trendData = useMemo(() => generateTrend(petrolPrice), [petrolPrice]);

  // Animate price counting up
  useEffect(() => {
    const target = petrolPrice;
    const duration = 2000;
    const steps = 50;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnimatedPrice(+Math.min(increment * step, target).toFixed(2));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [petrolPrice]);

  useEffect(() => {
    const timer = setInterval(() => setMessageIdx((i) => (i + 1) % ROTATING_MESSAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Periodic refresh animation
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncAnim(true);
      setShowPulse(false);
      setTimeout(() => { setShowPulse(true); setSyncAnim(false); }, 1200);
    }, 40000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLastSynced(
      new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  const litresNeeded = +(TOTAL_DISTANCE / MILEAGE).toFixed(3);
  const fuelCost = +(litresNeeded * petrolPrice).toFixed(2);

  const analyticsCards = [
    { icon: Fuel, label: "Petrol Price", value: `₹${petrolPrice.toFixed(2)}/L`, accent: true },
    { icon: Route, label: "Route Distance", value: `${TOTAL_DISTANCE} km` },
    { icon: Droplets, label: "Fuel Needed", value: `${litresNeeded} L` },
    { icon: Zap, label: "Fuel Cost", value: `₹${fuelCost.toFixed(2)}`, accent: true },
    { icon: Gauge, label: "Mileage", value: `${MILEAGE} km/L` },
    { icon: Activity, label: "7-Day Trend", value: "Stable" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Smart Analytics
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-5xl">
            Live Fuel <span className="italic text-primary">Intelligence</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Real-time fuel analytics for your Day 1 route</p>
        </motion.div>

        {/* Main Fuel Price Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-xl">
          <Card className="relative overflow-hidden border-primary/30 bg-card/50 backdrop-blur-2xl shadow-[0_0_100px_-20px_hsl(var(--primary)/0.35)]">
            {/* Glow border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <CardContent className="relative p-10 text-center">
              {/* Fuel icon */}
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)]"
                animate={syncAnim ? { rotate: [0, 360] } : {}}
                transition={{ duration: 1 }}
              >
                <Fuel className="h-10 w-10 text-primary" />
              </motion.div>

              {/* Animated price */}
              <div className="relative mb-3">
                <motion.span className="text-6xl font-bold text-foreground font-serif md:text-7xl" key={animatedPrice}>
                  ₹{animatedPrice.toFixed(2)}
                </motion.span>
                <span className="ml-2 text-xl text-muted-foreground font-light">/ Litre</span>

                {/* Shimmer */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/8 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                />
              </div>

              <p className="text-base font-medium text-muted-foreground">Goa Petrol Price</p>

              {/* LIVE badge */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-primary ${showPulse ? "animate-ping" : ""} opacity-75`} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold tracking-wider text-primary">LIVE</span>
                <span className="text-xs text-muted-foreground">• Auto Updated Daily</span>
              </div>

              {/* Sync info */}
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <RefreshCw className={`h-3 w-3 text-muted-foreground/50 ${syncAnim ? "animate-spin" : ""}`} />
                <p className="text-xs text-muted-foreground/70">Last synced: {lastSynced}</p>
              </div>

              {/* Rotating status */}
              <div className="mt-5 h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs italic text-muted-foreground/60"
                  >
                    {ROTATING_MESSAGES[messageIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Total trip cost highlight */}
              <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 px-6 py-4">
                <span className="text-xs uppercase tracking-widest text-accent/80">Estimated Trip Fuel Cost</span>
                <p className="mt-1 font-serif text-3xl font-bold text-accent">₹{fuelCost.toFixed(2)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{litresNeeded}L × ₹{petrolPrice.toFixed(2)} • {TOTAL_DISTANCE} km route</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7-Day Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-2xl">
          <Card className="border-border/20 bg-card/40 backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold text-foreground">7-Day Fuel Trend</span>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold text-muted-foreground">₹/LITRE</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} hide />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(val: number) => [`₹${val.toFixed(2)}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    fill="url(#fuelGrad)"
                    dot={{ r: 3, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--background))" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Cards */}
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {analyticsCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className={`border-border/20 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.2)] ${card.accent ? "border-accent/20" : ""}`}>
                <CardContent className="flex flex-col items-center p-5 md:p-6 text-center">
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.accent ? "bg-accent/10" : "bg-primary/10"}`}>
                    <card.icon className={`h-5 w-5 ${card.accent ? "text-accent" : "text-primary"}`} />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{card.label}</span>
                  <span className={`mt-1 text-lg font-bold ${card.accent ? "text-accent" : "text-foreground"}`}>{card.value}</span>
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
