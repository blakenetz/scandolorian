import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@mantine/core";
import WikipediaImage from "@/components/wikipediaImage";
import EntityLinks, { EntityLink } from "@/components/entityLinks";
import { fetchInitialCache, fetchResource } from "@/stores/fetchInitialCache";
import classes from "@/styles/detail.module.css";
import { extractIds, getCopy, filterStats } from "@/utils";
import { routes, routeMap, swapiKeys, type Entity, type SwapiKey } from "@/types";
import { Films, People, Planets, Starships, Vehicles } from "@/types/swapi";

// relations to link per entity (starships + vehicles merge into rides)
const relationMap: Record<SwapiKey, { route: string; fields: string[] }[]> = {
  people: [
    { route: routeMap.films, fields: ["films"] },
    { route: routeMap.rides, fields: ["vehicles", "starships"] },
  ],
  planets: [
    { route: routeMap.people, fields: ["residents"] },
    { route: routeMap.films, fields: ["films"] },
  ],
  films: [
    { route: routeMap.people, fields: ["characters"] },
    { route: routeMap.planets, fields: ["planets"] },
    { route: routeMap.rides, fields: ["starships", "vehicles"] },
  ],
  rides: [
    { route: routeMap.people, fields: ["pilots"] },
    { route: routeMap.films, fields: ["films"] },
  ],
};

// ai generated copy
const statsCopy: Record<SwapiKey, (name: string) => string> = {
  people: (name) =>
    `The numbers ${name} hoped you'd never see — leaked, verified, and dished below:`,
  planets: (name) => `Everything the ${name} tourism board would rather you never read:`,
  films: (name) => `The receipts from the ${name} set — credits, names, and the bits they buried:`,
  rides: (name) => `The specs on the ${name} someone went to great lengths to keep quiet:`,
};
const linksCopy: Record<SwapiKey, string> = {
  people: "The blockbusters, the getaway rides — follow the trail and connect the dots yourself:",
  planets: "Who turns up here and where else they're spotted — follow the trail:",
  films: "Who was really involved and where it all went down — connect the dots yourself:",
  rides: "Who's been behind the controls and where it's been spotted — dig in:",
};

// helper to resolve types
async function fetchEntity(entity: SwapiKey, id: string): Promise<Entity | null> {
  switch (entity) {
    case "films":
      return fetchResource<Films>(entity, id);
    case "people":
      return fetchResource<People>(entity, id);
    case "planets":
      return fetchResource<Planets>(entity, id);
    case "rides":
      const { rides } = await fetchInitialCache();
      const ride = rides.find(([rideId]) => rideId === id)?.[1];
      if (!ride) return null;
      if (ride.type === "starship") return fetchResource<Starships>(ride.type, id);
      return fetchResource<Vehicles>(ride.type, id);
  }
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  // validate params
  const { slug, id } = await params;
  if (!routes.includes(slug)) notFound();

  const entity = swapiKeys.find((key) => routeMap[key] === slug);
  if (!entity) notFound();

  const data = await fetchEntity(entity, id);
  if (!data) notFound();

  const name = "title" in data ? data.title : data.name;
  const { headline } = getCopy(entity, name)!;

  const stats = filterStats(data);

  const links: EntityLink[] = relationMap[entity].map(({ route, fields }) => {
    const urls = fields.flatMap((field) => {
      const value = data[field as keyof Entity];
      return Array.isArray(value) ? value : [];
    });

    return {
      route,
      ids: extractIds(urls),
    };
  });

  return (
    <article className={classes.detail}>
      <section className={classes.hero}>
        <div className={classes.imageWrap}>
          <Suspense fallback={<Skeleton height="100%" animate />}>
            <WikipediaImage name={name} />
          </Suspense>
        </div>
        <div>
          <h1 className={classes.name}>{headline}</h1>
          <p>{statsCopy[entity](name)}</p>
          <dl className={classes.stats}>
            {stats.map(({ label, value }) => (
              <div key={label} className={classes.stat}>
                <dt className={classes.statLabel}>{label}</dt>
                <dd className={classes.statValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={classes.links}>
        <p>{linksCopy[entity]}</p>
        <EntityLinks links={links} />
      </section>
    </article>
  );
}
