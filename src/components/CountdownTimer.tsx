import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palmtree } from "lucide-react";

const DEPARTURE_DATE = new Date("2026-04-24T20:25:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = DEPARTURE_DATE - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  if (!hasMounted) return null;

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--ocean))] via-[hsl(var(--palm))] to-[hsl(var(--ocean))] opacity-10 animated-gradient-bg" />
      
      {/* Floating palm decorations */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-8 opacity-10"
      >
        <Palmtree className="h-16 w-16 text-primary" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-8 bottom-8 opacity-10"
      >
        <Palmtree className="h-20 w-20 text-secondary" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              🌴 Goa Trip Begins In 🌴
            </span>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {timeBlocks.map((block, index) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-xl md:h-32 md:w-32">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                  <motion.span
                    key={block.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="relative font-serif text-4xl font-bold text-primary md:text-5xl"
                    style={{ textShadow: "0 0 20px hsl(var(--primary) / 0.4)" }}
                  >
                    {String(block.value).padStart(2, "0")}
                  </motion.span>
                  <span className="relative text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">
                    {block.label}
                  </span>
                </div>
                {index < timeBlocks.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary/50 md:-right-4 md:text-3xl"
                  >
                    :
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-sm font-medium text-muted-foreground">
            Departure on <span className="text-primary font-semibold">24 April 2026</span> at <span className="text-primary font-semibold">20:25 IST</span> · 11 Members – All Confirmed
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;
