"use client";

import { useEffect, useMemo, useState } from "react";
import { altFor } from "@/content/alt";
import { Lightbox, type LightboxItem } from "./Lightbox";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: readonly string[];
  initialIndex?: number;
};

/** Full-size viewer for one project's images. */
export function ProjectGallery({ open, onClose, title, images, initialIndex = 0 }: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)));
  }, [open, initialIndex, images.length]);

  const items: LightboxItem[] = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        alt: altFor(src, `${title}, image ${i + 1} of ${images.length}`),
        title,
      })),
    [images, title],
  );

  return (
    <Lightbox
      label={title}
      items={items}
      index={open ? index : null}
      onIndex={setIndex}
      onClose={onClose}
    />
  );
}
