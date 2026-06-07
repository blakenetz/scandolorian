"use client";

import { createContext, useContext, useRef } from "react";
import { SwapiStore, type SwapiStoreData } from "./swapiStore";

const StoreContext = createContext<SwapiStore | null>(null);

export function StoreProvider({
  initialData,
  children,
}: {
  initialData: SwapiStoreData;
  children: React.ReactNode;
}) {
  // treat the store as a "singleton"
  const storeRef = useRef<SwapiStore>(null);
  if (storeRef.current === null) {
    storeRef.current = new SwapiStore(initialData);
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
}

export function useStore(): SwapiStore {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
}
