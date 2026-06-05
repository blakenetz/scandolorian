import classes from "./header.module.css";

import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });

export default function Header() {
  return (
    <header className={classes.header}>
      <h1 className={anton.className}>
        The <span>Scandal</span>orian
      </h1>
    </header>
  );
}
