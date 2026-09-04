"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/New_York",
  });
}

export function LocalClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      className="micro-label tabular-nums text-ink-muted"
      dateTime={time || undefined}
      aria-label="Local time in New York"
    >
      {time || "—:—:—"}
      <span className="ml-1 text-ink-faint">ET</span>
    </time>
  );
}
