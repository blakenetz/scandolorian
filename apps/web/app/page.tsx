import classes from "@/styles/home.module.css";
import Spotlight from "@/components/spotlight/spotlight";

export default function Home() {
  return (
    <>
      <h2 className={classes.header}>Exclusive!</h2>
      <Spotlight entity="people" />
    </>
  );
}
