import { motion, useScroll, useTransform } from "framer-motion";
import { Home } from "lucide-react";
import { useRef } from "react";

interface MapStop {
  name: string;
  label?: string;
  x: number;
  y: number;
  isHome?: boolean;
  isReturn?: boolean;
  number: number;
  distKm?: number;
  scooterTime?: string;
  fuel?: number;
}

const PETROL_PRICE = 96.43;

const stops: MapStop[] = [
  { name: "Arpora", label: "Our Stay", x: 340, y: 520, isHome: true, number: 1 },
  { name: "Parra Road", x: 260, y: 460, number: 2, distKm: 5, scooterTime: "10 min", fuel: 0.125 },
  { name: "Fort Aguada", x: 100, y: 360, number: 3, distKm: 17, scooterTime: "30 min", fuel: 0.425 },
  { name: "Candolim", x: 90, y: 280, number: 4, distKm: 4, scooterTime: "8 min", fuel: 0.1 },
  { name: "Ashwem", x: 160, y: 140, number: 5, distKm: 23, scooterTime: "40 min", fuel: 0.575 },
  { name: "Querim", x: 200, y: 55, number: 6, distKm: 14, scooterTime: "20 min", fuel: 0.35 },
  { name: "Tito's Lane", x: 360, y: 480, number: 7, distKm: 25, scooterTime: "45 min", fuel: 0.625 },
  { name: "Arpora", x: 340, y: 520, isReturn: true, number: 8, distKm: 3, scooterTime: "10 min", fuel: 0.075 },
];

const routePath =
  "M 340 520 C 310 500, 280 475, 260 460 C 210 420, 140 400, 100 360 C 85 330, 85 300, 90 280 C 110 220, 140 175, 160 140 C 175 105, 190 75, 200 55 C 240 120, 310 340, 360 480 C 355 500, 348 510, 340 520";

const coastPath =
  "M 30 600 C 20 500, 15 400, 30 300 C 40 230, 25 150, 40 70 C 45 35, 38 15, 42 0";

const seaPath =
  "M 0 620 L 0 0 C 38 15, 45 35, 42 70 C 25 150, 40 230, 30 300 C 15 400, 20 500, 30 600 Z";

const innerRoads = [
  "M 180 500 C 200 440, 160 400, 130 370",
  "M 300 350 C 250 330, 200 310, 150 290",
  "M 320 250 C 280 220, 240 200, 200 180",
];

const Day1HeroMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 2]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-4, 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative mx-auto w-full max-w-4xl"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="relative rounded-3xl border border-primary/20 bg-card/30 backdrop-blur-xl p-3 md:p-6 shadow-[0_0_120px_-20px_hsl(var(--primary)/0.25)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 rounded-3xl opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <svg viewBox="0 0 500 640" className="relative w-full" fill="none" style={{ minHeight: "420px" }}>
          <defs>
            <linearGradient id="seaGrad3d" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
              <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.01" />
            </linearGradient>
            <filter id="glow3d" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="bigGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="routeGlow3d" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <radialGradient id="scooterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sea fill */}
          <path d={seaPath} fill="url(#seaGrad3d)" />

          {/* Coastline */}
          <path d={coastPath} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 10" opacity="0.25" />

          {/* Secondary roads */}
          {innerRoads.map((d, i) => (
            <path key={i} d={d} stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.08" />
          ))}

          {/* Sea label */}
          <text x="12" y="340" className="fill-primary text-[9px] font-semibold opacity-[0.08]" transform="rotate(-90, 12, 340)">
            ARABIAN SEA
          </text>

          {/* Route background */}
          <path d={routePath} stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" strokeDasharray="8 8" opacity="0.1" />

          {/* Route glow underlay */}
          <motion.path
            d={routePath}
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={0.08}
            filter="url(#bigGlow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          {/* Main route animated */}
          <motion.path
            d={routePath}
            stroke="url(#routeGlow3d)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow3d)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          />

          {/* Scooter glow halo */}
          <motion.circle
            r="20"
            fill="url(#scooterGlow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Scooter trail */}
          <motion.circle
            r="10"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            opacity="0.35"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Scooter dot */}
          <motion.circle
            r="7"
            fill="hsl(var(--accent))"
            filter="url(#glow3d)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Scooter inner dot */}
          <motion.circle
            r="3"
            fill="hsl(var(--background))"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Stop markers */}
          {stops.filter((s) => !s.isReturn).map((stop, i) => (
            <g key={stop.name + i}>
              {/* Outer pulse */}
              <motion.circle
                cx={stop.x} cy={stop.y} r="22" fill="none"
                stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                strokeWidth="1" opacity="0.2"
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ delay: i * 0.5, duration: 3.5, repeat: Infinity }}
              />

              {/* Marker fill */}
              <motion.circle
                cx={stop.x} cy={stop.y}
                r={stop.isHome ? "12" : "10"}
                fill={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--background))"}
                stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
              />

              {/* Number */}
              {!stop.isHome && (
                <text x={stop.x} y={stop.y + 4} textAnchor="middle" className="fill-foreground text-[10px] font-bold">
                  {stop.number}
                </text>
              )}

              {/* Home icon */}
              {stop.isHome && (
                <foreignObject x={stop.x - 6} y={stop.y - 6} width="12" height="12">
                  <div className="flex h-full w-full items-center justify-center">
                    <Home className="h-3 w-3 text-background" />
                  </div>
                </foreignObject>
              )}

              {/* Name label */}
              <text
                x={stop.x + (stop.x > 280 ? -18 : 18)}
                y={stop.y - (stop.isHome ? 18 : 14)}
                textAnchor={stop.x > 280 ? "end" : "start"}
                className="fill-foreground text-[10px] font-semibold"
              >
                {stop.name}
              </text>

              {/* Sub-label */}
              {stop.label && (
                <text
                  x={stop.x + (stop.x > 280 ? -18 : 18)}
                  y={stop.y - 4}
                  textAnchor={stop.x > 280 ? "end" : "start"}
                  className="fill-accent text-[7px] font-medium"
                >
                  ★ {stop.label}
                </text>
              )}

              {/* Distance info */}
              {stop.distKm && (
                <text
                  x={stop.x + (stop.x > 280 ? -18 : 18)}
                  y={stop.y + (stop.isHome ? 0 : 10)}
                  textAnchor={stop.x > 280 ? "end" : "start"}
                  className="fill-muted-foreground text-[7px]"
                >
                  {stop.distKm}km • {stop.scooterTime}
                </text>
              )}
            </g>
          ))}

          {/* Region labels */}
          <text x="400" y="90" className="fill-muted-foreground text-[10px] font-semibold tracking-widest opacity-[0.15]">NORTH GOA</text>
          <text x="370" y="440" className="fill-muted-foreground text-[8px] font-medium opacity-[0.1]">BARDEZ</text>
          <text x="130" y="560" className="fill-muted-foreground text-[8px] font-medium opacity-[0.1]">PANJIM</text>
        </svg>

        {/* Corner badges */}
        <div className="absolute bottom-3 left-3 rounded-xl bg-background/60 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-semibold text-accent">LIVE ROUTE</span>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 rounded-xl bg-background/60 px-3 py-2 backdrop-blur-sm">
          <span className="text-[10px] font-semibold text-muted-foreground">Day 1 • 91 km • 8 stops</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Day1HeroMap;
