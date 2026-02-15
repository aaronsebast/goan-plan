import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ISTClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get IST components
  const istOffset = 5.5 * 60 * 60 * 1000;
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  const ist = new Date(utc + istOffset);

  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const seconds = ist.getSeconds();
  const ms = ist.getMilliseconds();

  // Smooth angles
  const secondAngle = (seconds + ms / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  const dayFormatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "long" });
  const dateFormatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric" });
  const timeFormatter = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  const size = 200;
  const cx = size / 2;
  const cy = size / 2;

  const hand = (angle: number, length: number, width: number, color: string, tip?: string) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    const x2 = cx + length * Math.cos(rad);
    const y2 = cy + length * Math.sin(rad);
    return (
      <>
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
        {tip && <circle cx={x2} cy={y2} r={width * 0.8} fill={tip} />}
      </>
    );
  };

  // Hour markers
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = ((i * 30 - 90) * Math.PI) / 180;
    const r1 = 85;
    const r2 = i % 3 === 0 ? 75 : 79;
    return (
      <line key={i} x1={cx + r1 * Math.cos(angle)} y1={cy + r1 * Math.sin(angle)} x2={cx + r2 * Math.cos(angle)} y2={cy + r2 * Math.sin(angle)} stroke="hsl(var(--foreground))" strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" opacity={i % 3 === 0 ? 0.8 : 0.3} />
    );
  });

  return (
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-sm">
          <div className="glass-card card-hover-lift p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at center, hsl(174 75% 47% / 0.2), transparent 70%)" }} />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Indian Standard Time</p>

              {/* Analog Clock */}
              <div className="mx-auto mb-4" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                  {/* Outer ring */}
                  <circle cx={cx} cy={cy} r={92} fill="none" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.4" />
                  <circle cx={cx} cy={cy} r={90} fill="hsl(var(--glass-bg))" />

                  {/* Markers */}
                  {markers}

                  {/* Hands */}
                  {hand(hourAngle, 50, 3.5, "hsl(174, 75%, 47%)")}
                  {hand(minuteAngle, 68, 2.5, "hsl(174, 75%, 47%)")}
                  {hand(secondAngle, 75, 1, "hsl(38, 89%, 61%)", "hsl(38, 89%, 61%)")}

                  {/* Center dot */}
                  <circle cx={cx} cy={cy} r={4} fill="hsl(174, 75%, 47%)" />
                  <circle cx={cx} cy={cy} r={2} fill="hsl(var(--background))" />
                </svg>
              </div>

              {/* Digital time */}
              <p className="font-mono text-2xl font-bold text-foreground tracking-wider mb-1">
                {timeFormatter.format(time)}
              </p>
              <p className="text-sm text-secondary font-medium">{dayFormatter.format(time)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{dateFormatter.format(time)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ISTClock;
