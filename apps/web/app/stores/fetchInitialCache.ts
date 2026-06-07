import { unstable_cacheLife as cacheLife } from "next/cache";
import type { Films, People, Planets, Starships, Vehicles } from "@/types/swapi";
import type { RideEntry, SwapiStoreData } from "./swapiStore";

const baseUrl = "https://swapi.info/api";

function extractId(url: string) {
  return url.split("/").pop()!;
}

// Server-only: kept out of swapiStore.ts so the client store module never pulls
// a `"use cache"` function into the client graph.
export async function fetchInitialCache(): Promise<SwapiStoreData> {
  "use cache";
  cacheLife("max"); // no variability in data updates

  const [people, planets, films, ...rides] = await Promise.all([
    fetch(`${baseUrl}/people`).then((res) => res.json() as Promise<People[]>),
    fetch(`${baseUrl}/planets`).then((res) => res.json() as Promise<Planets[]>),
    fetch(`${baseUrl}/films`).then((res) => res.json() as Promise<Films[]>),
    fetch(`${baseUrl}/vehicles`).then((res) => res.json() as Promise<Vehicles[]>),
    fetch(`${baseUrl}/starships`).then((res) => res.json() as Promise<Starships[]>),
  ]);

  return {
    people: people.map((person) => [extractId(person.url), person.name]),
    planets: planets.map((planet) => [extractId(planet.url), planet.name]),
    films: films.map((film) => [extractId(film.url), film.title]),
    // starships and vehicles share enough in common that we merge them into rides.
    rides: rides
      .flat()
      .map<[string, RideEntry]>((v) => [
        extractId(v.url),
        { name: v.name, type: v.url.includes("starships") ? "starship" : "vehicle" },
      ]),
  };
}
