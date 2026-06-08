import { cacheLife } from "next/cache";
import type { Films, People, Planets, Starships, Vehicles } from "@/types/swapi";
import type { SwapiStoreData } from "./swapiStore";
import { RideEntry, SwapiKey } from "@/types";
import { extractSwapiId, randomId } from "@/utils";

const baseUrl = "https://swapi.info/api";

// server only
export async function fetchInitialCache(): Promise<SwapiStoreData> {
  "use cache";
  cacheLife("max"); // no variability in data updates

  const [rawPeople, rawPlanets, rawFilms, ...rawRides] = await Promise.all([
    fetch(`${baseUrl}/people`).then((res) => res.json() as Promise<People[]>),
    fetch(`${baseUrl}/planets`).then((res) => res.json() as Promise<Planets[]>),
    fetch(`${baseUrl}/films`).then((res) => res.json() as Promise<Films[]>),
    fetch(`${baseUrl}/vehicles`).then((res) => res.json() as Promise<Vehicles[]>),
    fetch(`${baseUrl}/starships`).then((res) => res.json() as Promise<Starships[]>),
  ]);

  // id-name maps
  const people = rawPeople.map<[string, string]>((p) => [extractSwapiId(p.url), p.name]);
  const planets = rawPlanets.map<[string, string]>((p) => [extractSwapiId(p.url), p.name]);
  const films = rawFilms.map<[string, string]>((f) => [extractSwapiId(f.url), f.title]);
  // starships and vehicles share enough in common that we merge them into rides.
  const rides = rawRides
    .flat()
    .map<[string, RideEntry]>((v) => [
      extractSwapiId(v.url),
      { name: v.name, type: v.url.includes("starships") ? "starship" : "vehicle" },
    ]);

  return {
    people,
    planets,
    films,
    rides,
    // spotlight in cache for isomorphism between client and server
    spotlight: {
      people: randomId(people),
      planets: randomId(planets),
      films: randomId(films),
      rides: randomId(rides),
    },
  };
}

// similar to above, but only a single resource
export async function fetchResource<T>(resource: string, id: string): Promise<T | null> {
  "use cache";
  cacheLife("max"); // no variability in data updates

  const res = await fetch(`${baseUrl}/${resource}/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function getSpotlight(entity: SwapiKey): Promise<string | undefined> {
  // resuse `fetchInitialCache`, so it costs no extra network request
  const data = await fetchInitialCache();

  const id = data.spotlight[entity];
  const entries = data[entity];
  const value = entries.find(([entryId]) => entryId === id)?.[1];
  return typeof value === "string" ? value : value?.name;
}
