import type { People, Planets, Films, Starships, Vehicles } from "./swapi";

export type RideEntry = { name: string; type: "starship" | "vehicle" };

export const swapiKeys = ["people", "planets", "films", "rides"] as const;
export type SwapiKey = (typeof swapiKeys)[number];
export type Spotlight = Record<SwapiKey, string>;

// maps each swapi collection to its resource shape
export type EntityMap = {
  people: People;
  planets: Planets;
  films: Films;
  rides: Starships | Vehicles;
};
export type Entity = EntityMap[SwapiKey];

export const routeMap: Record<SwapiKey, string> = {
  people: "celebrities",
  planets: "travel",
  films: "jawawood",
  rides: "rides",
};
export const routes = Object.values(routeMap);

// routeMap inverted: a route segment -> the swapi collection it renders
export const routeEntities = Object.fromEntries(
  Object.entries(routeMap).map(([key, route]) => [route, key]),
) as Record<string, SwapiKey>;

// don't show these properties as stats (they're titles/relations shown elsewhere)
export const excludedProperties = [
  "name",
  "title",
  "opening_crawl",
  "created",
  "edited",
  "url",
  "species",
];
