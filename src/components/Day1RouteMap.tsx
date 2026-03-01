import { motion } from "framer-motion";

const stops = [
  { name: "Arpora", x: 50, y: 280 },
  { name: "Parra", x: 90, y: 240 },
  { name: "Aguada", x: 40, y: 180 },
  { name: "Candolim", x: 80, y: 150 },
  { name: "Ashwem", x: 120, y: 80 },
  { name: "Querim", x: 160, y: 30 },
  { name: "Baga", x: 70, y: 260 },
];

const Day1RouteMap = () => {
  const pathD = `M ${stops.map((s) => `${s.x} ${s.y}`).join(" L ")}`;

  return (
    <div className="relative mx-auto w-full max-w-xs">
      <svg viewBox="0 0 200 310" className="w-full" fill="none">
        {/* Route path */}
        <motion.path
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        {/* Stops */}
        {stops.map((stop, i) => (
          <g key={stop.name}>
            <motion.circle
              cx={stop.x}
              cy={stop.y}
              r="6"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.3, duration: 0.4 }}
            />
            {/* Glow */}
            <motion.circle
              cx={stop.x}
              cy={stop.y}
              r="10"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.3, duration: 2, repeat: Infinity }}
            />
            <text
              x={stop.x + 12}
              y={stop.y + 4}
              className="fill-foreground text-[9px] font-medium"
            >
              {stop.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Day1RouteMap;
