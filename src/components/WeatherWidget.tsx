import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";

// Static forecast for Goa late April (typical weather)
const forecast = [
  {
    day: "Apr 24",
    label: "Day 1",
    condition: "Sunny",
    icon: Sun,
    tempHigh: 34,
    tempLow: 27,
    wind: "12 km/h",
    humidity: "65%",
  },
  {
    day: "Apr 25",
    label: "Day 2",
    condition: "Partly Cloudy",
    icon: Cloud,
    tempHigh: 33,
    tempLow: 26,
    wind: "15 km/h",
    humidity: "70%",
  },
  {
    day: "Apr 26",
    label: "Day 3",
    condition: "Sunny",
    icon: Sun,
    tempHigh: 35,
    tempLow: 28,
    wind: "10 km/h",
    humidity: "60%",
  },
];

const WeatherWidget = () => {
  return (
    <section id="weather" className="relative py-24 md:py-32 bg-gradient-ocean text-ocean-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
            Forecast
          </span>
          <h2 className="luxury-heading text-4xl font-semibold text-primary-foreground md:text-5xl">
            Goa <span className="italic">Weather</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
            Expected weather conditions during our trip (Late April)
          </p>
        </motion.div>

        {/* Weather Cards */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {forecast.map((day, index) => {
            const WeatherIcon = day.icon;

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card rounded-2xl bg-background/20 p-6 backdrop-blur-md transition-all hover:scale-105 hover:bg-background/30"
              >
                {/* Day Label */}
                <div className="mb-4 text-center">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    {day.label}
                  </span>
                  <p className="text-lg font-semibold text-primary-foreground">{day.day}</p>
                </div>

                {/* Weather Icon */}
                <div className="mb-4 flex justify-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <WeatherIcon className="h-16 w-16 text-accent drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Condition */}
                <p className="mb-4 text-center text-sm font-medium text-primary-foreground/80">
                  {day.condition}
                </p>

                {/* Temperature */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Thermometer className="h-4 w-4 text-accent" />
                  <span className="text-2xl font-bold text-primary-foreground">
                    {day.tempHigh}°
                  </span>
                  <span className="text-lg text-primary-foreground/60">/ {day.tempLow}°</span>
                </div>

                {/* Wind & Humidity */}
                <div className="flex justify-center gap-4 text-xs text-primary-foreground/70">
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    {day.wind}
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    {day.humidity}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-primary-foreground/60"
        >
          * Weather forecast is indicative based on historical data for late April
        </motion.p>
      </div>
    </section>
  );
};

export default WeatherWidget;
