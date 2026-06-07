import { Fragment } from "react";
import classes from "@/styles/home.module.css";
import Spotlight from "@/components/spotlight/spotlight";
import { Divider } from "@mantine/core";
import { SwapiKey, swapiKeys } from "@/types";

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
          <Fragment key={entity}>
            <article>
              <h2 className={classes.header}>{headline}</h2>
              <Spotlight entity={entity} />
            </article>
            {i < swapiKeys.length - 1 && <Divider />}
          </Fragment>
        );
      })}
    </section>
  );
}
