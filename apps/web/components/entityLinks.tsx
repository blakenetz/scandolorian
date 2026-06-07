"use client";

import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useStore } from "@/stores/StoreProvider";
import { routeEntities } from "@/types";
import classes from "@/styles/detail.module.css";

export type EntityLink = { route: string; ids: string[] };

function EntityLinks({ links }: { links: EntityLink[] }) {
  const store = useStore();

  return (
    <>
      {links.map(({ route, ids }) => {
        // resolve the route back to its store collection to look up names
        const entity = routeEntities[route];
        if (!entity || ids.length === 0) return null;
        return (
          <div key={route} className={classes.linkGroup}>
            <h2 className={classes.statLabel}>{entity}</h2>
            <ul className={classes.linkList}>
              {ids.map((id) => {
                const found = store.getEntity(entity, id);
                const name = typeof found === "string" ? found : found?.name;
                return (
                  <li key={id}>
                    <Link href={`/${route}/${id}`}>{name ?? id}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default observer(EntityLinks);
