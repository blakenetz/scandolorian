import type { ReactNode } from "react";
import { Skeleton } from "@mantine/core";
import classes from "./Spotlight.module.css";

// ai generated fallback
const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="#1a1b1e"/><text x="50%" y="50%" fill="#5c5f66" font-family="sans-serif" font-size="36" font-weight="700" text-anchor="middle" dominant-baseline="middle">No image</text></svg>`;
export const spotlightFallback = `data:image/svg+xml,${encodeURIComponent(fallbackSvg)}`;

export interface SpotlightProps {
  /** img node. Falls back to `fallback` (then a built-in placeholder) when not loading. */
  image?: ReactNode;
  /** Shows a skeleton in the media slot while true. */
  loading?: boolean;
  /** Rendered when not loading and no `image` is provided. Defaults to a built-in placeholder image. */
  fallback?: ReactNode;
  headline: string;
  /** each item correlates to the text node of a paragraph element. key off of index, so don't sort */
  content: string[];
}

export function Spotlight({ headline, image, loading, fallback, content }: SpotlightProps) {
  return (
    <article className={classes.spotlight}>
      <div className={classes.media}>
        {loading ? (
          <Skeleton animate />
        ) : (
          (image ?? fallback ?? <img src={spotlightFallback} alt="" />)
        )}
      </div>

      <div className={classes.content}>
        <h2 className={classes.headline}>{headline}</h2>
        <div className={classes.body}>
          {content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
