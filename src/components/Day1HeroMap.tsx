import { motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";

const stops = [
  { name: "Arpora", label: "Our Stay", x: 300, y: 540, isHome: true, number: 1 },
  { name: "Parra Road", x: 240, y: 480, number: 2 },
  { name: "Fort Aguada", x: 100, y: 380, number: 3 },
  { name: "Candolim Beach", x: 120, y: 310, number: 4 },
  { name: "Ashwem Beach", x: 180, y: 160, number: 5 },
  { name: "Querim Beach", x: 220, y: 60, number: 6 },
  { name: "Tito's Lane", x: 320, y: 500, number: 7 },
  { name: "Arpora Return", x: 300, y: 540, isReturn: true, number: 8 },
];

// Main route path
const routePath = "M 300 540 C 270 510, 250 495, 240 480 C 200 440, 130 410, 100 380 C 90 350, 110 330, 120 310 C 140 260, 160 200, 180 160 C 195 120, 210 80, 220 60 C 250 100, 290 300, 320 500 C 310 520, 305 530, 300 540";

// Coastline
const coastPath = "M 40 600 C 30 500, 20 400, 40 300 C 50 240, 30 160, 50 80 C 55 40, 45 20, 50 0";

// Sea area
const seaPath = "M 0 600 L 0 0 C 45 20, 55 40, 50 80 C 30 160, 50 240, 40 300 C 20 400, 30 500, 40 600 Z";

const Day1HeroMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-2xl"
      style={{ perspective: "1200px" }}
    >
      {/* 3D perspective wrapper */}
      <div
        className="relative rounded-3xl border border-primary/20 bg-card/30 backdrop-blur-lg p-4 shadow-[0_0_80px_-20px_hsl(var(--primary)/0.2)]"
        style={{ transform: "rotateX(8deg) rotateY(-2deg)", transformStyle: "preserve-3d" }}
      >
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 rounded-3xl opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <svg viewBox="0 0 450 620" className="relative w-full" fill="none">
          {/* Sea gradient */}
          <defs>
            <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
            </linearGradient>
            <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="routeGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>

          {/* Sea fill */}
          <path d={seaPath} fill="url(#seaGrad)" />

          {/* Coastline */}
          <path d={coastPath} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.2" />

          {/* Land texture */}
          <text x="15" y="350" className="fill-primary text-[8px] font-semibold opacity-10" transform="rotate(-90, 15, 350)">
            ARABIAN SEA
          </text>

          {/* Route path - background */}
          <path d={routePath} stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="6 6" opacity="0.15" />

          {/* Route path - animated glow */}
          <motion.path
            d={routePath}
            stroke="url(#routeGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#mapGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          {/* Animated scooter dot */}
          <motion.circle
            r="6"
            fill="hsl(var(--accent))"
            filter="url(#mapGlow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Scooter trail glow */}
          <motion.circle
            r="12"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            opacity="0.3"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            style={{ offsetPath: `path('${routePath}')` }}
          />

          {/* Stop markers */}
          {stops.filter(s => !s.isReturn).map((stop, i) => (
            <g key={stop.name + i}>
              {/* Pulse ring */}
              <motion.circle
                cx={stop.x} cy={stop.y} r="18" fill="none"
                stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                strokeWidth="1" opacity="0.25"
                animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ delay: i * 0.4, duration: 3, repeat: Infinity }}
              />

              {/* Marker circle */}
              <motion.circle
                cx={stop.x} cy={stop.y}
                r={stop.isHome ? "10" : "8"}
                fill={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--background))"}
                stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              />

              {/* Number label */}
              <text
                x={stop.x} y={stop.y + 4}
                textAnchor="middle"
                className={`text-[9px] font-bold ${stop.isHome ? "fill-background" : "fill-foreground"}`}
              >
                {stop.number}
              </text>

              {/* Home icon */}
              {stop.isHome && (
                <foreignObject x={stop.x - 5} y={stop.y - 5} width="10" height="10">
                  <div className="flex h-full w-full items-center justify-center">
                    <Home className="h-2.5 w-2.5 text-background" />
                  </div>
                </foreignObject>
              )}

              {/* Name label */}
              <text
                x={stop.x + (stop.x > 250 ? -16 : 16)}
                y={stop.y - (stop.isHome ? 16 : 12)}
                textAnchor={stop.x > 250 ? "end" : "start"}
                className="fill-foreground text-[10px] font-semibold"
              >
                {stop.name}
              </text>
              {stop.label && (
                <text
                  x={stop.x + (stop.x > 250 ? -16 : 16)}
                  y={stop.y - 3}
                  textAnchor={stop.x > 250 ? "end" : "start"}
                  className="fill-muted-foreground text-[7px]"
                >
                  {stop.label}
                </text>
              )}
            </g>
          ))}

          {/* Region labels */}
          <text x="380" y="100" className="fill-muted-foreground text-[9px] font-medium opacity-30">NORTH GOA</text>
          <text x="350" y="450" className="fill-muted-foreground text-[9px] font-medium opacity-20">BARDEZ</text>
        </svg>

        {/* Corner label */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-background/60 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold text-muted-foreground">Day 1 Route • 91 km</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Day1HeroMap;
