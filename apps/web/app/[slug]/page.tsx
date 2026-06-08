import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Spotlight from "@/components/spotlight/spotlight";
import WikipediaImage from "@/components/wikipediaImage";
import { fetchInitialCache } from "@/stores/fetchInitialCache";
import { routes, routeMap, swapiKeys } from "@/types";
import type { RideEntry, SwapiKey } from "@/types";
import classes from "@/styles/slug.module.css";

interface EntityPageProps {
  params: Promise<{ slug: string }>;
}

const gridHeaderMap: Record<SwapiKey, string> = {
  people: "This Week's Hottest Stars",
  planets: "The Galaxy's Hottest Getaways",
  films: "Box-Office Blockbusters",
  rides: "The Must-Have Rides of the Season",
};

const listHeaderMap: Record<SwapiKey, string> = {
  people: "More Names Making Headlines",
  planets: "More Destinations Worth the Hyperdrive",
  films: "More From the Back Catalog",
  rides: "More Whips Spotted Around the System",
};

// type fix for rides
const toName = (value: string | RideEntry) => (typeof value === "string" ? value : value.name);

// fully prerender all known routes
export function generateStaticParams() {
  return routes.map((slug) => ({ slug }));
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { slug } = await params;
  // unknown routes 404
  if (!routes.includes(slug)) {
    console.debug("bad route", { slug });
    notFound();
  }

  // find entity
  const entity = swapiKeys.find((key) => routeMap[key] === slug);
  if (!entity) {
    console.debug("entity not found", { slug, entity });
    notFound();
  }

  // reuse the cached initial fetch, so listing pages cost no extra request
  const data = await fetchInitialCache();
  const entries = data[entity];
  const spotlight = data.spotlight[entity];

  // get headers
  const title = routeMap[entity];
  const gridHeader = gridHeaderMap[entity];
  const listHeader = listHeaderMap[entity];

  // divide entries into chunks
  const rest = entries.filter(([id]) => id !== spotlight);
  const featured = rest.slice(0, 6);
  const remaining = rest.slice(6);

  return (
    <section className={classes.section}>
      <h1 className={classes.title}>{title}</h1>

      <Spotlight entity={entity} />

      <h2 className={classes.subheader}>{gridHeader}</h2>

      <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
        {featured.map(([id, value]) => {
          const name = toName(value);
          return (
            <Link key={id} href={`/${title}/${id}`} className={classes.card}>
              <Card withBorder padding={0} radius="md">
                <div className={classes.imageWrap}>
                  <Suspense fallback={<Skeleton height="100%" animate />}>
                    <WikipediaImage name={name} />
                  </Suspense>
                </div>
                <Text className={classes.name} p="sm">
                  {name}
                </Text>
              </Card>
            </Link>
          );
        })}
      </SimpleGrid>

      {Boolean(remaining) && (
        <>
          <div>
            <h3 className={classes.subheader}>{listHeader}</h3>
            <p className={classes.listSubtext}>
              Click into each element to read exclusive content!
            </p>
          </div>

          <ul className={classes.list}>
            {remaining.map(([id, value]) => (
              <li key={id} className={classes.listItem}>
                <Link href={`/${title}/${id}`} className={classes.listLink}>
                  {toName(value)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
