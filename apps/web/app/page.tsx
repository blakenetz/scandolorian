import { People } from "@/types/swapi";
import classes from "./styles/home.module.css";
import Image from "next/image";

export default async function Home() {
  // get person
  const res = await fetch("https://swapi.info/api/people");
  const people = (await res.json()) as People[];
  const spotlight = people[Math.floor(Math.random() * people.length)];

  const wikiRes = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${spotlight.name}`,
  );

  return (
    <>
      <h2 className={classes.header}>Exclusive!</h2>
    </>
  );
}
