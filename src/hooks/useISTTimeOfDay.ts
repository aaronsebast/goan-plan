import { useState, useEffect } from "react";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export function useISTTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
}

function getTimeOfDay(): TimeOfDay {
  const now = new Date();
  const istStr = now.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const [h, m] = istStr.split(":").map(Number);
  const totalMinutes = h * 60 + m;

  if (totalMinutes >= 330 && totalMinutes < 720) return "morning";     // 5:30 AM - 11:59 AM
  if (totalMinutes >= 720 && totalMinutes < 1080) return "afternoon";  // 12:00 PM - 5:59 PM
  if (totalMinutes >= 1080 && totalMinutes < 1170) return "evening";   // 6:00 PM - 7:30 PM
  return "night"; // 7:31 PM - 5:29 AM
}

export function getTimeGradient(tod: TimeOfDay): string {
  switch (tod) {
    case "morning":
      return "linear-gradient(135deg, hsl(25 70% 55% / 0.12), hsl(200 60% 55% / 0.08), transparent)";
    case "afternoon":
      return "linear-gradient(135deg, hsl(195 80% 50% / 0.08), hsl(210 70% 55% / 0.06), transparent)";
    case "evening":
      return "linear-gradient(135deg, hsl(25 80% 55% / 0.12), hsl(330 50% 50% / 0.08), hsl(270 40% 50% / 0.06))";
    case "night":
      return "linear-gradient(135deg, hsl(207 52% 8% / 0.5), hsl(210 45% 10% / 0.3))";
  }
}
