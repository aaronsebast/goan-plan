import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const ISTClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const istFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dayFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  });

  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeStr = istFormatter.format(time);
  const dayStr = dayFormatter.format(time);
  const dateStr = dateFormatter.format(time);

  return (
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md"
        >
          <div className="glass-card card-hover-lift p-6 text-center relative overflow-hidden">
            {/* Subtle glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, hsl(168 100% 39% / 0.2), transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Indian Standard Time
                </span>
              </div>

              <p className="font-mono text-4xl font-bold text-foreground tracking-wider md:text-5xl mb-2">
                {timeStr}
              </p>

              <p className="text-sm text-secondary font-medium">{dayStr}</p>
              <p className="text-xs text-muted-foreground mt-1">{dateStr}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ISTClock;
