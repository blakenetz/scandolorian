import { Suspense } from "react";
import { Card, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Spotlight from "@/components/spotlight/spotlight";
import SpotlightImage from "@/components/spotlight/SpotlightImage";
import { fetchInitialCache } from "@/stores/fetchInitialCache";
import { routeMap } from "@/types";
import type { RideEntry, SwapiKey } from "@/types";
import classes from "./EntityLayout.module.css";

interface EntityLayoutProps {
  entity: SwapiKey;
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

export default async function EntityLayout({ entity }: EntityLayoutProps) {
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
            <Card key={id} withBorder padding={0} radius="md">
              <div className={classes.imageWrap}>
                <Suspense fallback={<Skeleton height="100%" animate />}>
                  <SpotlightImage name={name} />
                </Suspense>
              </div>
              <Text className={classes.name} p="sm">
                {name}
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>

      <div>
        <h3 className={classes.subheader}>{listHeader}</h3>
        <p className={classes.listSubtext}>Click into each element to read exclusive content!</p>
      </div>

      <ul className={classes.list}>
        {remaining.map(([id, value]) => (
          <li key={id} className={classes.listItem}>
            {toName(value)}
          </li>
        ))}
      </ul>
    </section>
  );
}
