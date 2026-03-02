import { motion } from "framer-motion";
import { Home } from "lucide-react";

const stops = [
  { name: "Arpora", label: "Our Stay", x: 130, y: 290, isHome: true },
  { name: "Parra", x: 100, y: 250 },
  { name: "Aguada", x: 40, y: 200 },
  { name: "Candolim", x: 55, y: 160 },
  { name: "Ashwem", x: 90, y: 85 },
  { name: "Querim", x: 120, y: 30 },
  { name: "Baga", x: 155, y: 260 },
];

// Smooth curved path through the stops
const pathD = "M 130 290 C 115 270, 105 260, 100 250 C 80 230, 45 220, 40 200 C 38 185, 50 170, 55 160 C 65 140, 75 110, 90 85 C 100 65, 110 45, 120 30 C 135 50, 150 150, 155 260";

// Coastline decorative path
const coastline = "M 20 300 C 15 250, 10 200, 20 150 C 25 120, 15 80, 25 40 C 30 20, 20 10, 25 5";

const Day1RouteMap = () => {
  // Total path length for scooter animation
  const totalLength = 800;

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <svg viewBox="-10 -10 210 320" className="w-full" fill="none">
        {/* Coastline */}
        <path
          d={coastline}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.15"
        />

        {/* Sea area fill */}
        <path
          d="M -10 300 L -10 5 C 20 10, 25 20, 25 40 C 15 80, 25 120, 20 150 C 10 200, 15 250, 20 300 Z"
          fill="hsl(var(--primary))"
          opacity="0.04"
        />

        {/* Route path - dashed background */}
        <path
          d={pathD}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.2"
        />

        {/* Route path - animated */}
        <motion.path
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Animated scooter dot along path */}
        <motion.circle
          r="4"
          fill="hsl(var(--accent))"
          filter="url(#glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          style={{ offsetPath: `path('${pathD}')` }}
        />

        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stop markers */}
        {stops.map((stop, i) => (
          <g key={stop.name}>
            {/* Pulse ring */}
            <motion.circle
              cx={stop.x}
              cy={stop.y}
              r="12"
              fill="none"
              stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth="1"
              opacity="0.3"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.3, duration: 2.5, repeat: Infinity }}
            />

            {/* Marker dot */}
            <motion.circle
              cx={stop.x}
              cy={stop.y}
              r={stop.isHome ? "7" : "5"}
              fill={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--background))"}
              stroke={stop.isHome ? "hsl(var(--accent))" : "hsl(var(--primary))"}
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
            />

            {/* Home icon for Arpora */}
            {stop.isHome && (
              <foreignObject x={stop.x - 5} y={stop.y - 5} width="10" height="10">
                <div className="flex h-full w-full items-center justify-center">
                  <Home className="h-2.5 w-2.5 text-background" />
                </div>
              </foreignObject>
            )}

            {/* Label */}
            <text
              x={stop.x + (stop.x > 100 ? -4 : 12)}
              y={stop.y + (stop.isHome ? -12 : 4)}
              textAnchor={stop.x > 100 ? "end" : "start"}
              className="fill-foreground text-[8px] font-semibold"
            >
              {stop.name}
            </text>
            {stop.label && (
              <text
                x={stop.x + (stop.x > 100 ? -4 : 12)}
                y={stop.y + (stop.isHome ? -4 : 13)}
                textAnchor={stop.x > 100 ? "end" : "start"}
                className="fill-muted-foreground text-[6px]"
              >
                {stop.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Day1RouteMap;
