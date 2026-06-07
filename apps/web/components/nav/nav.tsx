"use client";

import { Anchor } from "@mantine/core";
import Link from "next/link";
import classes from "./nav.module.css";

const routes = ["home", "celebrities", "travel", "rides", "jawawood"];

export default function Nav() {
  return (
    <nav>
      {routes.map((r) => (
        <Anchor component={Link} key={r} href={`/${r}`} className={classes.anchor}>
          {r}
        </Anchor>
      ))}
    </nav>
  );
}
