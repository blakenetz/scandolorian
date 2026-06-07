import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@mantine/core";
import WikipediaImage from "@/components/wikipediaImage";
import { getCopy } from "@/components/spotlight/spotlight";
import { fetchResource } from "@/stores/fetchInitialCache";
import type { Films } from "@/types/swapi";
import classes from "@/styles/detail.module.css";

export default async function JawawoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const film = await fetchResource<Films>("films", id);
  if (!film) notFound();

  const { headline, content } = getCopy("films", film.title)!;

  const stats: [string, string][] = [
    ["Episode", String(film.episode_id)],
    ["Director", film.director],
    ["Producer", film.producer],
    ["Release date", film.release_date],
  ];

  return (
    <article className={classes.detail}>
      <div className={classes.hero}>
        <div className={classes.imageWrap}>
          <Suspense fallback={<Skeleton height="100%" animate />}>
            <WikipediaImage name={film.title} />
          </Suspense>
        </div>
        <div className={classes.intro}>
          <h1 className={classes.name}>{film.title}</h1>
          <p className={classes.headline}>{headline}</p>
          {content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <dl className={classes.stats}>
        {stats.map(([label, value]) => (
          <div key={label} className={classes.stat}>
            <dt className={classes.statLabel}>{label}</dt>
            <dd className={classes.statValue}>{value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h2 className={classes.headline}>Opening crawl</h2>
        <p className={classes.crawl}>{film.opening_crawl}</p>
      </div>
    </article>
  );
}
