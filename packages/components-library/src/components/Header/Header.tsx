import type { PropsWithChildren } from "react";
import classes from "./Header.module.css";

export function Header({ children }: PropsWithChildren) {
  return (
    <header className={classes.header}>
      <h1>
        The <span>Scandal</span>orian
      </h1>
      {Boolean(children) && <div className={classes.subheader}>{children}</div>}
    </header>
  );
}
