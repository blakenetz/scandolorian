import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@mantine/core";
import WikipediaImage from "@/components/wikipediaImage";
import { getCopy } from "@/components/spotlight/spotlight";
import { fetchInitialCache, fetchResource } from "@/stores/fetchInitialCache";
import type { Starships, Vehicles } from "@/types/swapi";
import classes from "@/styles/detail.module.css";

export default async function RidesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // rides merge starships + vehicles, so look up which kind this id is
  const { rides } = await fetchInitialCache();
  const ride = rides.find(([rideId]) => rideId === id)?.[1];
  if (!ride) notFound();

  const resource = ride.type === "starship" ? "starships" : "vehicles";
  const data = await fetchResource<Starships & Vehicles>(resource, id);
  if (!data) notFound();

  const { headline, content } = getCopy("rides", data.name)!;
  const rideClass = ride.type === "starship" ? data.starship_class : data.vehicle_class;

  const stats: [string, string][] = [
    ["Class", rideClass],
    ["Model", data.model],
    ["Manufacturer", data.manufacturer],
    ["Cost", `${data.cost_in_credits} credits`],
    ["Length", `${data.length} m`],
    ["Top speed", data.max_atmosphering_speed],
    ["Crew", data.crew],
    ["Passengers", data.passengers],
    ["Cargo", `${data.cargo_capacity} kg`],
  ];

  return (
    <article className={classes.detail}>
      <div className={classes.hero}>
        <div className={classes.imageWrap}>
          <Suspense fallback={<Skeleton height="100%" animate />}>
            <WikipediaImage name={data.name} />
          </Suspense>
        </div>
        <div className={classes.intro}>
          <h1 className={classes.name}>{data.name}</h1>
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
