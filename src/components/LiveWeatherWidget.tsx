import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSun, Snowflake, CloudLightning, Wind, Droplets, Thermometer, MapPin } from "lucide-react";

interface WeatherData {
  current: { temp: number; condition: string; code: number; windSpeed: number; humidity: number };
  daily: { day: string; high: number; low: number; code: number }[];
}

const wmoToCondition = (code: number) => {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain Showers";
  if (code <= 99) return "Thunderstorm";
  return "Clear";
};

const getWeatherIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code <= 48) return Cloud;
  if (code <= 67) return CloudRain;
  if (code <= 77) return Snowflake;
  if (code <= 99) return CloudLightning;
  return Sun;
};

const CACHE_KEY = "baga_weather_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 min

const LiveWeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) {
        setWeather(data);
        setLoading(false);
        return;
      }
    }

    // Baga Beach, Goa: 15.5550° N, 73.7517° E
    fetch("https://api.open-meteo.com/v1/forecast?latitude=15.555&longitude=73.7517&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Kolkata&forecast_days=7")
      .then(r => r.json())
      .then(d => {
        const data: WeatherData = {
          current: {
            temp: Math.round(d.current.temperature_2m),
            condition: wmoToCondition(d.current.weather_code),
            code: d.current.weather_code,
            windSpeed: Math.round(d.current.wind_speed_10m),
            humidity: d.current.relative_humidity_2m,
          },
          daily: d.daily.time.slice(0, 7).map((t: string, i: number) => ({
            day: new Date(t).toLocaleDateString("en-IN", { weekday: "short" }),
            high: Math.round(d.daily.temperature_2m_max[i]),
            low: Math.round(d.daily.temperature_2m_min[i]),
            code: d.daily.weather_code[i],
          })),
        };
        setWeather(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="glass-card animate-pulse rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">Loading weather...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!weather) return null;

  const CurrentIcon = getWeatherIcon(weather.current.code);

  return (
    <section className="relative py-16 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Live Weather — Baga Beach, Goa
            </span>
          </div>

          {/* Current Weather Card */}
          <div className="glass-card mb-6 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <CurrentIcon className="h-14 w-14 text-secondary drop-shadow-lg" />
                </motion.div>
                <div>
                  <p className="text-4xl font-bold text-foreground">{weather.current.temp}°C</p>
                  <p className="text-sm text-muted-foreground">{weather.current.condition}</p>
                </div>
              </div>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Wind className="h-3.5 w-3.5 text-primary" />
                  <span>{weather.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5 text-primary" />
                  <span>{weather.current.humidity}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="grid grid-cols-7 gap-2">
            {weather.daily.map((day, i) => {
              const DayIcon = getWeatherIcon(day.code);
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card flex flex-col items-center rounded-xl px-1 py-3 text-center"
                >
                  <span className="text-[10px] font-semibold uppercase text-muted-foreground">{day.day}</span>
                  <DayIcon className="my-1.5 h-5 w-5 text-secondary" />
                  <span className="text-xs font-bold text-foreground">{day.high}°</span>
                  <span className="text-[10px] text-muted-foreground">{day.low}°</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveWeatherWidget;
