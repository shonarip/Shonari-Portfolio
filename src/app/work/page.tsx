"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Backdrop } from "@/components/Backdrop";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { altFor } from "@/content/alt";
import { mediaUrl } from "@/content/media";
import { site } from "@/content/site";
import { thumbProps } from "@/content/img";

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
  const [still, setStill] = useState<{ title: string; alt?: string; image: string; lane: string; year: string } | null>(null);
  const [printIndex, setPrintIndex] = useState<number | null>(null);
  const [mangaIndex, setMangaIndex] = useState<number | null>(null);
  const [productionIndex, setProductionIndex] = useState<number | null>(null);
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

  useEffect(() => {
    const fromUrl = readLaneParam();
    if (fromUrl) setFilter(fromUrl);
  }, []);

  const toItems = (
    list: readonly { title: string; image: string; year: string; alt?: string }[],
    lane: string,
  ): LightboxItem[] =>
    list.map((it) => ({
      src: it.image,
      alt: it.alt ?? altFor(it.image, it.title),
      title: it.title,
      meta: `${lane} · ${it.year}`,
    }));
  const stillItems: LightboxItem[] = still
    ? [
        {
          src: still.image,
          alt: still.alt ?? altFor(still.image, still.title),
          title: still.title,
          meta: `${still.lane} · ${still.year}`,
        },
      ]
    : [];

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
      href: mediaUrl(item.src),
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

  return (
    <>
      <Backdrop />
      <Header />
      <main id="main" className="container-page pb-8 pt-28 md:pt-32">
        <Link href={site.workIndex.backHref} className="link-quiet">
          <span aria-hidden="true">←</span> {site.workIndex.backLabel}
        </Link>

        <header className="mb-10 mt-8">
          <p className="t-eyebrow mb-4">Every proof, by discipline</p>
          <h1 className="t-display">{site.workIndex.heading}</h1>
          <p className="t-lead mt-6 max-w-2xl">{site.workIndex.intro}</p>
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
                  "inline-flex min-h-11 items-center border px-5 text-2xs font-semibold uppercase tracking-micro transition-colors",
                  active
                    ? "border-paper-washi bg-paper-washi text-onpaper"
                    : "border-ink/30 text-ink hover:border-accent hover:text-accent",
                ].join(" ")}
              >
                {lane}
              </button>
            );
          })}
        </div>

        <p className="t-small mb-4" aria-live="polite">
          {filter === "All"
            ? showAll
              ? `Showing all ${rows.length} works`
              : `Showing ${rows.length} selected works`
            : `${rows.length} in ${filter}`}
        </p>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {rows.map((row) => {
            // 16:9 video posters show the whole frame on dark; square Serpent Skull still fills.
            const wide = row.kind === "video" && !row.image.includes("serpent-skull");
            const inner = (
              <div className="relative aspect-[4/5] overflow-hidden border border-ink/15 bg-canvas-soft transition-colors group-hover:border-accent group-focus-visible:border-accent">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...thumbProps(row.image)}
                  alt={row.alt ?? altFor(row.image, row.title)}
                  style={FOCUS[row.image] ? { objectPosition: FOCUS[row.image] } : undefined}
                  className={`h-full w-full ${wide ? "bg-black object-contain" : "object-cover"}`}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                  <p className="font-display text-base leading-tight tracking-tight text-ink">{row.title}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{row.lane}</p>
                </div>
              </div>
            );
            const tile =
              "group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool";
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
                  <button
                    type="button"
                    onClick={open ?? undefined}
                    className={tile}
                    aria-label={`View ${row.title} (${row.lane}) full size`}
                  >
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
          <div className="mt-10">
            <button type="button" onClick={() => setShowAll(true)} className="btn-secondary">
              Show {view.rest} more works
            </button>
          </div>
        )}

        {rows.length === 0 && <p className="py-12 text-ink-muted">Nothing in this lane yet.</p>}
      </main>
      <Footer />

      <Lightbox
        label={still?.lane ?? "Work"}
        items={stillItems}
        index={still ? 0 : null}
        onIndex={() => undefined}
        onClose={() => setStill(null)}
      />
      <Lightbox
        label="Photography"
        items={toItems(photos, "Photography")}
        index={photoIndex}
        onIndex={setPhotoIndex}
        onClose={() => setPhotoIndex(null)}
      />
      <Lightbox
        label="Print"
        items={toItems(prints, "Print")}
        index={printIndex}
        onIndex={setPrintIndex}
        onClose={() => setPrintIndex(null)}
      />
      <Lightbox
        label="Manga"
        items={toItems(mangas, "Manga")}
        index={mangaIndex}
        onIndex={setMangaIndex}
        onClose={() => setMangaIndex(null)}
      />
      <Lightbox
        label="Production"
        items={toItems(productions, "Production")}
        index={productionIndex}
        onIndex={setProductionIndex}
        onClose={() => setProductionIndex(null)}
      />
    </>
  );
}
