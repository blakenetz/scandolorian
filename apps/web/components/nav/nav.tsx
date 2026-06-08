"use client";

import { Anchor } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/types";
import classes from "./nav.module.css";

export default function Nav() {
  return (
    <nav>
      {/* include home */}
      {["home", ...routes].map((route) => (
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
