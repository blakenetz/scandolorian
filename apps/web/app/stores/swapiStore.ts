import { makeAutoObservable } from "mobx";

export type RideEntry = { name: string; type: "starship" | "vehicle" };

export interface SwapiStoreData {
  people: [string, string][];
  planets: [string, string][];
  films: [string, string][];
  rides: [string, RideEntry][];
}

export class SwapiStore {
  // register data entries
  people = new Map<string, string>();
  planets = new Map<string, string>();
  films = new Map<string, string>();
  rides = new Map<string, RideEntry>();
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
    this.loaded = true;
  }
}
