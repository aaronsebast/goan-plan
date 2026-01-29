import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const DEPARTURE_DATE = new Date("2025-04-23T13:15:00+05:30").getTime();

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
    <section className="relative bg-gradient-ocean py-16 text-ocean-foreground md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-widest text-primary/80">
              Adventure Begins In
            </span>
          </div>

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
                <div className="glass-card flex h-20 w-20 flex-col items-center justify-center rounded-2xl md:h-28 md:w-28">
                  <span className="font-serif text-3xl font-bold text-primary md:text-5xl">
                    {String(block.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-primary/60 md:text-xs">
                    {block.label}
                  </span>
                </div>
                {index < timeBlocks.length - 1 && (
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-2xl font-light text-primary/40 md:-right-4 md:text-3xl">
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-sm text-primary/60">
            Until departure on April 23, 2025 at 13:15
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;