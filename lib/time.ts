"use client";

import { useEffect, useState } from "react";

/** One shared clock, refreshed every 20 seconds. Null on the server and first render. */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start the clock on mount only
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Local time at an office, and whether it is inside working hours (Mon-Fri, 9-6). */
export function officeTime(now: Date, tz: string) {
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(now);
  const parts = new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", weekday: "short", timeZone: tz }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const day = parts.find((p) => p.type === "weekday")?.value ?? "";
  const working = !["Sat", "Sun"].includes(day) && hour >= 9 && hour < 18;
  return { time, working };
}
