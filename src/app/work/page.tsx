"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { site } from "@/content/site";
import { imgProps, thumbProps, SIZES } from "@/content/img";

const FILTERS = ["All", ...site.workFilters] as const;
type Filter = (typeof FILTERS)[number];
type Project = (typeof site.projects)[number];

/** One-image case pages folded into /work lanes (their old URLs forward here). */
const MERGED_CASES = new Set(["prints", "branding", "professional-production", "eyes-of-the-beholder"]);

/** Chief lock 2026-09-25 (item 8): Reach's Selected 36, in order (image paths). */
const SELECTED: string[] = ["/work/homage/11.png", "/work/physical/pro/02-presidential-touch-limo.jpg", "/work/videography/posters/serpent-skull.jpg", "/work/homage/25-cyber-ranma.jpg", "/work/photography/09_Safespeare.jpg", "/work/prints/carousel/06.jpg", "/work/deck/black-flash.png", "/work/physical/pro/01-kylen-granson-books.png", "/work/photography/05_IMG_0362.jpg", "/work/homage/26-4-ur-eyez.jpg", "/work/prints/carousel/02.jpg", "/work/videography/posters/warhols-flowers.jpg", "/work/deck/the-blade.jpg", "/work/physical/pro/04-pro-04-d7dbf12d.jpg", "/work/photography/02_IMG_0441.jpg", "/work/manga2/Blue_Hues.jpg", "/work/prints/carousel/03.jpg", "/work/homage/27-mei-mei.jpg", "/work/physical/pro/03-smackem-gooz-menu.jpg", "/work/photography/03_IMG_0406.jpg", "/work/videography/posters/dont-waste-our-runaway.jpg", "/work/manga/deck/karumi.jpg", "/work/prints/carousel/10.jpg", "/work/homage/28-contained.jpg", "/work/physical/pro/17-pro-17-60e44d64.png", "/work/photography/17_Statues.jpg", "/work/deck/misa.png", "/work/prints/carousel/16.jpg", "/work/videography/posters/stay-weird.jpg", "/work/manga/deck/duality-icarus.jpg", "/work/physical/pro/05-pro-05-de3e0287.jpg", "/work/photography/13_Streets_of_Italy.jpg", "/work/prints/carousel/13.jpg", "/work/manga2/Sicko.jpg", "/work/prints/carousel/07.jpg", "/work/photography/26_photo_26.jpg"];

/** Same artwork under a different file: the copy that drops out (Reach's table B). */
const DROP_DUPES = new Set<string>(["/work/prints/carousel/04.jpg", "/work/deck/till-death.jpg", "/work/deck/cosmic.jpg", "/work/deck/call-of-the-night.jpg", "/work/deck/night-mania.png", "/work/deck/ascension.jpg", "/work/deck/conflicted.jpg", "/work/deck/post-mortem-boredom.jpg", "/work/deck/minami.png", "/work/deck/geto.png", "/work/deck/fermenting.jpg", "/work/deck/opposites.jpg", "/work/deck/bushido01.jpg", "/work/homage/19.jpg", "/work/homage/21.jpg", "/work/deck/starry-nights.png", "/work/manga/deck/hxh.jpg"]);

/** Arty's tile focus points (Chief lock). */
const FOCUS: Record<string, string> = {
  "/work/physical/pro/02-presidential-touch-limo.jpg": "50% 0%",
  "/work/physical/pro/01-kylen-granson-books.png": "50% 0%",
  "/work/physical/pro/04-pro-04-d7dbf12d.jpg": "50% 15%",
  "/work/physical/pro/03-smackem-gooz-menu.jpg": "50% 0%",
  "/work/physical/pro/19-pro-19-af10fe90.png": "50% 0%",
  "/work/photography/02_IMG_0441.jpg": "40% 50%",
  "/work/photography/17_Statues.jpg": "60% 50%",
  "/work/prints/carousel/16.jpg": "58% 50%",
};

const SHARED_LANE = /^\/work\/(homage|manga2|manga3)\//;

type ArchiveRow =
  | {
      kind: "still";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: string;
      role: string;
      featured: boolean;
      image: string;
      external: false;
    }
  | {
      kind: "project";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: string;
      role: string;
      featured: boolean;
      image: string;
      href: string;
      external: boolean;
    }
  | {
      kind: "photo";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: "Photography";
      role: string;
      featured: false;
      image: string;
      external: false;
      stillIndex: number;
    }
  | {
      kind: "print";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: "Print";
      role: string;
      featured: false;
      image: string;
      external: false;
      stillIndex: number;
    }
  | {
      kind: "manga";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: "Manga";
      role: string;
      featured: false;
      image: string;
      external: false;
      stillIndex: number;
    }
  | {
      kind: "production";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: "Production";
      role: string;
      featured: false;
      image: string;
      external: false;
      stillIndex: number;
    }
  | {
      kind: "video";
      key: string;
      title: string;
      alt?: string;
      year: string;
      lane: "Videography";
      role: string;
      featured: false;
      image: string;
      href: string;
      external: false;
    };

function altOf(item: object): string | undefined {
  const a = (item as { alt?: unknown }).alt;
  return typeof a === "string" && a.length > 0 ? a : undefined;
}

function projectTarget(project: Project): { href: string; external: boolean } {
  return { href: project.href, external: false };
}

function readLaneParam(): Filter | null {
  if (typeof window === "undefined") return null;
  const lane = new URLSearchParams(window.location.search).get("lane");
  if (!lane) return null;
  if ((FILTERS as readonly string[]).includes(lane)) return lane as Filter;
  return null;
}

export default function WorkIndexPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [still, setStill] = useState<{ title: string; alt?: string; image: string; role: string; year: string } | null>(null);
  const [printIndex, setPrintIndex] = useState<number | null>(null);
  const [mangaIndex, setMangaIndex] = useState<number | null>(null);
  const [productionIndex, setProductionIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const photos = site.photography.items;
  // One copy of each piece: shared homage/manga paths live in Manga only;
  // Homage 25–28 (print-only today) move to Manga; table-B twins drop out.
  const mangaPaths = new Set<string>(site.mangaArchive.items.map((m) => m.image));
  const prints = site.printArchive.items.filter(
    (it) => !DROP_DUPES.has(it.image) && !SHARED_LANE.test(it.image),
  );
  const mangas = [
    ...site.mangaArchive.items,
    ...site.printArchive.items.filter(
      (it) => SHARED_LANE.test(it.image) && !mangaPaths.has(it.image),
    ),
  ].filter((it) => !DROP_DUPES.has(it.image)) as unknown as typeof site.mangaArchive.items;
  const productions = site.productionArchive.items;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fromUrl = readLaneParam();
    if (fromUrl) setFilter(fromUrl);
  }, []);

  useEffect(() => {
    if (photoIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhotoIndex(null);
      if (e.key === "ArrowRight")
        setPhotoIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setPhotoIndex((i) =>
          i === null ? 0 : (i - 1 + photos.length) % photos.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [photoIndex, photos.length]);

  useEffect(() => {
    if (printIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrintIndex(null);
      if (e.key === "ArrowRight")
        setPrintIndex((i) => (i === null ? 0 : (i + 1) % prints.length));
      if (e.key === "ArrowLeft")
        setPrintIndex((i) =>
          i === null ? 0 : (i - 1 + prints.length) % prints.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [printIndex, prints.length]);

  useEffect(() => {
    if (mangaIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMangaIndex(null);
      if (e.key === "ArrowRight")
        setMangaIndex((i) => (i === null ? 0 : (i + 1) % mangas.length));
      if (e.key === "ArrowLeft")
        setMangaIndex((i) =>
          i === null ? 0 : (i - 1 + mangas.length) % mangas.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mangaIndex, mangas.length]);

  useEffect(() => {
    if (productionIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductionIndex(null);
      if (e.key === "ArrowRight")
        setProductionIndex((i) =>
          i === null ? 0 : (i + 1) % productions.length,
        );
      if (e.key === "ArrowLeft")
        setProductionIndex((i) =>
          i === null
            ? 0
            : (i - 1 + productions.length) % productions.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [productionIndex, productions.length]);

  const view = useMemo(() => {
    // Hide thin Prints card; hide Homage/Manga project cards in Manga lane (archive stills)
    const projects: ArchiveRow[] = site.projects
      .filter((project) => project.slug !== "prints")
      .filter((project) => project.slug !== "professional-production")
      .map((project): ArchiveRow => {
        if (MERGED_CASES.has(project.slug)) {
          return {
            kind: "still" as const,
            key: project.slug,
            title: project.title,
            alt: altOf(project),
            year: project.year,
            lane: project.lane,
            role: project.role,
            featured: project.featured,
            image: project.image,
            external: false as const,
          };
        }
        const target = projectTarget(project);
        return {
          kind: "project" as const,
          key: project.slug,
          title: project.title,
          year: project.year,
          lane: project.lane,
          role: project.role,
          featured: project.featured,
          image: project.image,
          href: target.href,
          external: target.external,
        };
      });

    const photoRows: ArchiveRow[] = photos.map((item, i) => ({
      kind: "photo" as const,
      key: `photo-${item.title}`,
      title: item.title,
      alt: altOf(item),
      year: item.year,
      lane: "Photography" as const,
      role: item.caption,
      featured: false as const,
      image: item.image,
      external: false as const,
      stillIndex: i,
    }));

    const printRows: ArchiveRow[] = prints.map((item, i) => ({
      kind: "print" as const,
      key: `print-${item.series}-${item.title}-${i}`,
      title: item.title,
      alt: altOf(item),
      year: item.year,
      lane: "Print" as const,
      role: `${item.series} · ${item.caption}`,
      featured: false as const,
      image: item.image,
      external: false as const,
      stillIndex: i,
    }));

    const mangaRows: ArchiveRow[] = mangas.map((item, i) => ({
      kind: "manga" as const,
      key: `manga-${item.series}-${item.title}-${i}`,
      title: item.title,
      alt: altOf(item),
      year: item.year,
      lane: "Manga" as const,
      role: `${item.series} · ${item.caption}`,
      featured: false as const,
      image: item.image,
      external: false as const,
      stillIndex: i,
    }));

    const productionRows: ArchiveRow[] = productions.map((item, i) => ({
      kind: "production" as const,
      key: `production-${item.title}-${i}`,
      title: item.title,
      alt: altOf(item),
      year: item.year,
      lane: "Production" as const,
      role: `${item.series} · ${item.caption}`,
      featured: false as const,
      image: item.image,
      external: false as const,
      stillIndex: i,
    }));

    const videos: ArchiveRow[] = site.videography.items.map((item) => ({
      kind: "video" as const,
      key: `video-${item.title}`,
      title: item.title,
      year: item.year,
      lane: "Videography" as const,
      role: item.caption,
      featured: false as const,
      image: item.poster,
      href: item.src,
      external: false as const,
    }));

    // Archive stills first so each image keeps the in-page viewer; a project card
    // whose image already appears in an archive drops out (one copy per piece).
    const seen = new Set<string>();
    const unique = [...productionRows, ...mangaRows, ...printRows, ...photoRows, ...videos, ...projects].filter(
      (row) => {
        if (!row.image || DROP_DUPES.has(row.image) || seen.has(row.image)) return false;
        seen.add(row.image);
        return true;
      },
    );
    if (filter !== "All") return { list: unique.filter((row) => row.lane === filter), rest: 0 };
    const byImage = new Map(unique.map((row) => [row.image, row]));
    const selected = SELECTED.map((src) => byImage.get(src)).filter((row): row is ArchiveRow => !!row);
    const picked = new Set(selected.map((row) => row.key));
    const others = unique.filter((row) => !picked.has(row.key));
    return showAll ? { list: [...selected, ...others], rest: 0 } : { list: selected, rest: others.length };
  }, [filter, showAll, photos, prints, mangas, productions]);
  const rows = view.list;

  const activePhoto = photoIndex !== null ? photos[photoIndex] : null;
  const activePrint = printIndex !== null ? prints[printIndex] : null;
  const activeManga = mangaIndex !== null ? mangas[mangaIndex] : null;
  const activeProduction =
    productionIndex !== null ? productions[productionIndex] : null;

  return (
    <>
      <NightSky />
      <Header />
      <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <Link
          href={site.workIndex.backHref}
          className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-micro text-ink-muted transition-colors hover:text-accent"
        >
          ← {site.workIndex.backLabel}
        </Link>

        <header className="mt-8 mb-10">
          <p className="micro-label text-ink-faint">Index</p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {site.workIndex.heading}
          </h1>
          <p className="mt-3 max-w-xl font-sans text-base text-ink-soft">
            {site.workIndex.intro}
          </p>
        </header>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by discipline"
        >
          {FILTERS.map((lane) => {
            const active = filter === lane;
            return (
              <button
                key={lane}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(lane);
                  const url = new URL(window.location.href);
                  if (lane === "All") url.searchParams.delete("lane");
                  else url.searchParams.set("lane", lane);
                  window.history.replaceState({}, "", url.toString());
                }}
                className={[
                  "inline-flex min-h-11 items-center rounded-sm border px-3 py-1.5 font-mono text-2xs uppercase tracking-micro transition-colors",
                  active
                    ? "border-accent/60 bg-accent/15 text-accent"
                    : "border-ink/15 bg-canvas/30 text-ink-muted hover:border-ink/30 hover:text-ink-soft",
                ].join(" ")}
              >
                {lane}
              </button>
            );
          })}
        </div>

        <p className="mb-4 font-mono text-2xs uppercase tracking-micro text-ink-faint">
          {filter === "All" ? (showAll ? `All works · ${rows.length}` : `Selected · ${rows.length}`) : `${filter} · ${rows.length}`}
        </p>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {rows.map((row) => {
            // 16:9 video posters show the whole frame on dark (Chief lock); square Serpent Skull still fills.
            const wide = row.kind === "video" && !row.image.includes("serpent-skull");
            const inner = (
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/12 bg-canvas/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...thumbProps(row.image)}
                  alt={row.alt ?? row.title}
                  style={FOCUS[row.image] ? { objectPosition: FOCUS[row.image] } : undefined}
                  className={`h-full w-full ${wide ? "object-contain bg-[#050508]" : "object-cover"} opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:scale-[1.03] group-focus-visible:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-2.5 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                  <p className="font-display text-sm leading-tight tracking-tight text-ink sm:text-base">{row.title}</p>
                  <p className="mt-0.5 font-mono text-2xs uppercase tracking-micro text-ink-muted">{row.lane}</p>
                </div>
              </div>
            );
            const tile =
              "group block w-full rounded-sm text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";
            const open =
              row.kind === "still"
                ? () => setStill(row)
                : row.kind === "photo"
                  ? () => setPhotoIndex(row.stillIndex)
                  : row.kind === "print"
                    ? () => setPrintIndex(row.stillIndex)
                    : row.kind === "manga"
                      ? () => setMangaIndex(row.stillIndex)
                      : row.kind === "production"
                        ? () => setProductionIndex(row.stillIndex)
                        : null;

            return (
              <li key={row.key}>
                {open || !("href" in row) ? (
                  <button type="button" onClick={open ?? undefined} className={tile} aria-label={row.title}>
                    {inner}
                  </button>
                ) : row.external || row.kind === "video" ? (
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className={tile}
                    aria-label={row.title}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={row.href} className={tile} aria-label={row.title}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {view.rest > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-11 items-center rounded-full border border-ink/30 bg-canvas/30 px-6 font-mono text-xs uppercase tracking-micro text-ink backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Show all · {view.rest} more
            </button>
          </div>
        )}

        {rows.length === 0 && (
          <p className="py-12 text-center font-sans text-ink-muted">
            Nothing in this lane yet.
          </p>
        )}
      </main>
      <Footer />

      {still && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={still.title}
          className="fixed inset-0 z-[70] flex flex-col bg-canvas/92 backdrop-blur-md"
          onClick={() => setStill(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setStill(null);
          }}
        >
          <header className="flex items-center justify-end px-4 py-3 sm:px-6">
            <button
              type="button"
              autoFocus
              onClick={() => setStill(null)}
              className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
            >
              Close ✕
            </button>
          </header>
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
            <div className="mb-4 text-center">
              <h2 className="font-display text-2xl tracking-tight text-ink sm:text-4xl">{still.title}</h2>
              <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
                {still.role} · {still.year}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...imgProps(still.image, SIZES.full)}
              alt={still.alt ?? still.title}
              className="max-h-[70vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>
        </div>
      )}

      {mounted &&
        activePhoto &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.title} lightbox`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #0a1020 0%, #050508 55%, #050508 100%)",
                opacity: 0.95,
              }}
              onClick={() => setPhotoIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Photography · {(photoIndex ?? 0) + 1} / {photos.length}
              </p>
              <button
                type="button"
                onClick={() => setPhotoIndex(null)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setPhotoIndex(null)}
            >
              <div className="mb-4 text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display text-2xl tracking-tight text-ink sm:text-4xl">
                  {activePhoto.title}
                </h2>
                <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
                  {activePhoto.caption} · {activePhoto.year}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(activePhoto.image, SIZES.full)}
                alt={altOf(activePhoto) ?? activePhoto.title}
                className="max-h-[70vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
              <div
                className="mt-6 flex gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() =>
                    setPhotoIndex((i) =>
                      i === null ? 0 : (i - 1 + photos.length) % photos.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPhotoIndex((i) =>
                      i === null ? 0 : (i + 1) % photos.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Next
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted &&
        activePrint &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePrint.title} lightbox`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #0a1020 0%, #050508 55%, #050508 100%)",
                opacity: 0.95,
              }}
              onClick={() => setPrintIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Print · {activePrint.series} · {(printIndex ?? 0) + 1} /{" "}
                {prints.length}
              </p>
              <button
                type="button"
                onClick={() => setPrintIndex(null)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setPrintIndex(null)}
            >
              <div className="mb-4 text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display text-2xl tracking-tight text-ink sm:text-4xl">
                  {activePrint.title}
                </h2>
                <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
                  {activePrint.series} · {activePrint.caption} · {activePrint.year}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(activePrint.image, SIZES.full)}
                alt={altOf(activePrint) ?? activePrint.title}
                className="max-h-[70vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
              <div
                className="mt-6 flex gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() =>
                    setPrintIndex((i) =>
                      i === null ? 0 : (i - 1 + prints.length) % prints.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPrintIndex((i) =>
                      i === null ? 0 : (i + 1) % prints.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Next
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted &&
        activeManga &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeManga.title} lightbox`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #0a1020 0%, #050508 55%, #050508 100%)",
                opacity: 0.95,
              }}
              onClick={() => setMangaIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Manga · {activeManga.series} · {(mangaIndex ?? 0) + 1} /{" "}
                {mangas.length}
              </p>
              <button
                type="button"
                onClick={() => setMangaIndex(null)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setMangaIndex(null)}
            >
              <div className="mb-4 text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display text-2xl tracking-tight text-ink sm:text-4xl">
                  {activeManga.title}
                </h2>
                <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
                  {activeManga.series} · {activeManga.caption} · {activeManga.year}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(activeManga.image, SIZES.full)}
                alt={altOf(activeManga) ?? activeManga.title}
                className="max-h-[70vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
              <div
                className="mt-6 flex gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMangaIndex((i) =>
                      i === null ? 0 : (i - 1 + mangas.length) % mangas.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMangaIndex((i) =>
                      i === null ? 0 : (i + 1) % mangas.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Next
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}


      {mounted &&
        activeProduction &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProduction.title} lightbox`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #0a1020 0%, #050508 55%, #050508 100%)",
                opacity: 0.95,
              }}
              onClick={() => setProductionIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Production · {activeProduction.series} ·{" "}
                {(productionIndex ?? 0) + 1} / {productions.length}
              </p>
              <button
                type="button"
                onClick={() => setProductionIndex(null)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setProductionIndex(null)}
            >
              <div className="mb-4 text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display text-2xl tracking-tight text-ink sm:text-4xl">
                  {activeProduction.title}
                </h2>
                <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
                  {activeProduction.series} · {activeProduction.caption} ·{" "}
                  {activeProduction.year}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(activeProduction.image, SIZES.full)}
                alt={altOf(activeProduction) ?? activeProduction.title}
                className="max-h-[70vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
              <div
                className="mt-6 flex gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() =>
                    setProductionIndex((i) =>
                      i === null
                        ? 0
                        : (i - 1 + productions.length) % productions.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setProductionIndex((i) =>
                      i === null ? 0 : (i + 1) % productions.length,
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-full border border-ink/25 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Next
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

    </>
  );
}
