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
