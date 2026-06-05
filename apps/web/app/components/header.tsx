import classes from "./header.module.css";
import { Anton } from "next/font/google";
import Link from 'next/link'

const anton = Anton({ subsets: ["latin"], weight: "400" });

const routes = ['celebs', 'travel', 'rides', 'movies']

export default function Header() {
  return (
    <header className={classes.header}>
      <h1 className={anton.className}>
        The <span>Scandal</span>orian
      </h1>
      <nav className={classes.nav}>
        {routes.map(route => <Link href={`/${route}`} key={route} >
          {route}
        </Link>)}
      </nav>
    </header>
  );
}
