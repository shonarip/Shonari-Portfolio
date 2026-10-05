"use client";

import { useEffect, useState } from "react";

const TZ = "America/Indianapolis";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: TZ,
  });
}

/** Seed SSR + first paint with real ET so chyron never flashes --:--:-- */
function initialTime() {
  try {
    return formatTime(new Date());
  } catch {
    return "";
  }
}

export function LocalClock() {
  const [time, setTime] = useState<string>(initialTime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Hide until mounted only if seed failed; otherwise show seeded time immediately
  if (!time && !mounted) {
    return (
      <time
        className="micro-label tabular-nums text-ink-muted"
        aria-label="Local time Eastern"
      >
        <span className="invisible">00:00:00</span>
        <span className="ml-1 invisible text-ink-faint">ET</span>
      </time>
    );
  }

  return (
    <time
      className="micro-label tabular-nums text-ink-muted"
      dateTime={time || undefined}
      aria-label="Local time Eastern (America/Indianapolis)"
      suppressHydrationWarning
    >
      {time}
      <span className="ml-1 text-ink-faint">ET</span>
    </time>
  );
}
