import classes from "@/styles/home.module.css";
import Spotlight from "@/components/spotlight/spotlight";
import { SwapiKey, swapiKeys } from "@/stores/swapiStore";
import { Divider } from "@mantine/core";

const headers: Partial<Record<SwapiKey, string>> = {
  people: "Exclusive!",
  films: "JawaWood",
  planets: "Travel",
};

export default function Home() {
  return (
    <section className={classes.home}>
      {swapiKeys.map((entity, i) => {
        const headline = headers[entity] || entity;
        return (
          <>
            <article key={entity}>
              <h2 className={classes.header}>{headline}</h2>
              <Spotlight key={entity} entity={entity} />
            </article>
            {i < swapiKeys.length - 1 && <Divider />}
          </>
        );
      })}
    </section>
  );
}
