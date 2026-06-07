import type { ReactNode } from "react";
import { Skeleton } from "@mantine/core";
import classes from "./Spotlight.module.css";

export interface SpotlightProps {
  /** img node. falls back to a placeholder. */
  image?: ReactNode;
  headline: string;
  /** each item correlates to the text node of a paragraph element. key off of index, so don't sort */
  content: string[];
}

export function Spotlight({ headline, image, content }: SpotlightProps) {
  return (
    <article className={classes.spotlight}>
      <div className={classes.media}>{image ?? <Skeleton animate />}</div>

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
