"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = site.audio.loop;
    a.muted = site.audio.mutedFirst;
    a.volume = 0.5;
    // No muted autoplay: preload="none" means nothing downloads until Sound is tapped.
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) {
      a.muted = false;
      a.play()
        .then(() => {
          setMuted(false);
          setPlaying(true);
        })
        .catch(() => {
          setMuted(true);
          setPlaying(false);
        });
    } else {
      a.muted = true;
      setMuted(true);
    }
  };

  const label = muted ? "Sound off" : "Sound on";

  return (
    <>
      <audio
        ref={audioRef}
        src={site.audio.src}
        preload="none"
        playsInline
        aria-hidden
      />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-4 right-4 z-[60] inline-flex min-h-11 items-center rounded-full border border-ink/20 bg-canvas/70 px-3.5 py-2 font-mono text-2xs uppercase tracking-micro text-ink-soft backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent sm:bottom-6 sm:right-6"
        aria-pressed={!muted}
        aria-label={`${label} — ${site.audio.label}`}
        title={`${site.audio.label} · ${label}`}
      >
        {muted ? "Sound · Off" : "Sound · On"}
              </button>
    </>
  );
}
