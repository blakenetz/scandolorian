import { RideEntry, Spotlight, SwapiKey } from "@/types";
import { makeAutoObservable } from "mobx";

export interface SwapiStoreData {
  people: [string, string][];
  planets: [string, string][];
  films: [string, string][];
  rides: [string, RideEntry][];
  spotlight: Spotlight;
}

export class SwapiStore {
  // register data entries
  people = new Map<string, string>();
  planets = new Map<string, string>();
  films = new Map<string, string>();
  rides = new Map<string, RideEntry>();
  spotlight: Spotlight | null = null;
  loaded = false;

  constructor(initialData?: SwapiStoreData) {
    makeAutoObservable(this);
    if (initialData) this.hydrate(initialData);
  }

  hydrate(initialData: SwapiStoreData) {
    this.people = new Map(initialData.people);
    this.planets = new Map(initialData.planets);
    this.films = new Map(initialData.films);
    this.rides = new Map(initialData.rides);
    this.spotlight = initialData.spotlight;
    this.loaded = true;
  }

  getEntity<K extends SwapiKey>(type: K, id: string) {
    // extra-type inferrence for rides
    return (this[type] as Map<string, K extends "rides" ? RideEntry : string>).get(id);
  }
}
