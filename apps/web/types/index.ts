export type RideEntry = { name: string; type: "starship" | "vehicle" };

export const swapiKeys = ["people", "planets", "films", "rides"] as const;
export type SwapiKey = (typeof swapiKeys)[number];
export type Spotlight = Record<SwapiKey, string>;

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
// don't show these properties
export const excludedProperties = ["name", "created", "edited", "url", "species"];
