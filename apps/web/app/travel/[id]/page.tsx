import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@mantine/core";
import WikipediaImage from "@/components/wikipediaImage";
import { getCopy } from "@/components/spotlight/spotlight";
import { fetchResource } from "@/stores/fetchInitialCache";
import type { Planets } from "@/types/swapi";
import classes from "@/styles/detail.module.css";

export default async function TravelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const planet = await fetchResource<Planets>("planets", id);
  if (!planet) notFound();

  const { headline, content } = getCopy("planets", planet.name)!;

  const stats: [string, string][] = [
    ["Climate", planet.climate],
    ["Terrain", planet.terrain],
    ["Population", planet.population],
    ["Diameter", `${planet.diameter} km`],
    ["Gravity", planet.gravity],
    ["Surface water", `${planet.surface_water}%`],
    ["Day length", `${planet.rotation_period} hrs`],
    ["Year length", `${planet.orbital_period} days`],
  ];

  return (
    <article className={classes.detail}>
      <div className={classes.hero}>
        <div className={classes.imageWrap}>
          <Suspense fallback={<Skeleton height="100%" animate />}>
            <WikipediaImage name={planet.name} />
          </Suspense>
        </div>
        <div className={classes.intro}>
          <h1 className={classes.name}>{planet.name}</h1>
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
    </article>
  );
}
