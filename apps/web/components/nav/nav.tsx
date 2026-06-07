"use client";

import { Anchor } from "@mantine/core";
import Link from "next/link";
import { routeMap } from "@/types";
import classes from "./nav.module.css";

const routes = ["home", ...Object.values(routeMap)];

export default function Nav() {
  return (
    <nav>
      {routes.map((route) => (
        <Anchor
          component={Link}
          key={route}
          href={route === "home" ? "/" : `/${route}`}
          className={classes.anchor}
        >
          {route}
        </Anchor>
      ))}
    </nav>
  );
}
