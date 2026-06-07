import classes from "@/styles/home.module.css";
import Spotlight from "@/components/spotlight/spotlight";
import { swapiKeys } from "@/stores/swapiStore";

export default function Home() {
  return swapiKeys.map((entity) => {
    <>
      <h2 className={classes.header}>Exclusive!</h2>
      <Spotlight entity={entity} />
    </>;
  });
}
