"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/** Optional ambient music. Silent until the visitor turns it on; nothing downloads before that. */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = site.audio.loop;
    a.muted = site.audio.mutedFirst;
    a.volume = 0.5;
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) {
      a.muted = false;
      a.play()
        .then(() => setMuted(false))
        .catch(() => setMuted(true));
    } else {
      a.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={site.audio.src} preload="none" playsInline />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-3 right-3 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 bg-canvas/85 text-sm font-medium text-ink-soft backdrop-blur-md transition-colors hover:border-accent hover:text-accent sm:bottom-6 sm:right-6 sm:w-auto sm:px-4"
        aria-pressed={!muted}
        aria-label={`Background music: ${site.audio.label}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 sm:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
        </svg>
        <span className="hidden sm:inline">{muted ? "Music off" : "Music on"}</span>
      </button>
    </>
  );
}
