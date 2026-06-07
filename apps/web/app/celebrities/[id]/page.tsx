import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@mantine/core";
import WikipediaImage from "@/components/wikipediaImage";
import EntityLinks, { EntityLink } from "@/components/entityLinks";
import { fetchResource } from "@/stores/fetchInitialCache";
import type { People } from "@/types/swapi";
import classes from "@/styles/detail.module.css";
import { extractSwapiId, getCopy, isDate } from "@/utils";
import { excludedProperties, routeMap } from "@/types";

const extractIds = (urls: string[]) =>
  urls.filter((v) => URL.canParse(v)).map((v) => extractSwapiId(v));

export default async function CelebrityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await fetchResource<People>("people", id);
  if (!person) notFound();

  // share headline
  const { headline } = getCopy("people", person.name)!;

  // use reducer instead of filter,map
  const stats = Object.entries(person).reduce<{ label: string; value: string }[]>(
    (acc, [key, value]) => {
      // whitelist property check
      if (excludedProperties.includes(key)) return acc;
      // value check
      if (!Array.isArray(value) && !URL.canParse(value) && !isDate(value) && value !== "n/a") {
        acc.push({ label: key.replace(/_/g, " "), value });
      }
      return acc;
    },
    [],
  );

  // for people we only link films and rides (vehicles + starships merge into rides)
  const links: EntityLink[] = [
    { route: routeMap.films, ids: extractIds(person.films) },
    { route: routeMap.rides, ids: extractIds([...person.vehicles, ...person.starships]) },
  ];

  return (
    <article className={classes.detail}>
      <section className={classes.hero}>
        <div className={classes.imageWrap}>
          <Suspense fallback={<Skeleton height="100%" animate />}>
            <WikipediaImage name={person.name} />
          </Suspense>
        </div>
        <div>
          <h1 className={classes.name}>{headline}</h1>
          <p>
            The numbers {person.name} hoped you would never see — leaked, verified, and dished
            below:
          </p>
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
        <p>The blockbusters, the getaway rides — follow the trail and connect the dots yourself:</p>
        <EntityLinks links={links} />
      </section>
    </article>
  );
}
