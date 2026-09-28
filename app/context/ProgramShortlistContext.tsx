"use client";
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorageState } from "../lib/useLocalStorageState";

const STORAGE_KEY = "yomProgramShortlist";
const MAX_SHORTLIST = 3;

interface ShortlistContextType {
  ids: string[];
  count: number;
  isFull: boolean;
  includes: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  hydrated: boolean;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ProgramShortlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds, hydrated] = useLocalStorageState<string[]>(STORAGE_KEY, []);

  const add = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) || prev.length >= MAX_SHORTLIST ? prev : [...prev, id]));
  }, [setIds]);

  const remove = useCallback(
    (id: string) => {
      setIds((prev) => prev.filter((i) => i !== id));
    },
    [setIds]
  );

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id)
          : prev.length >= MAX_SHORTLIST
            ? prev
            : [...prev, id]
      );
    },
    [setIds]
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  const includes = useCallback((id: string) => ids.includes(id), [ids]);
  const isFull = ids.length >= MAX_SHORTLIST;

  const value = useMemo(
    () => ({ ids, count: ids.length, isFull, includes, add, remove, toggle, clear, hydrated }),
    [ids, isFull, includes, add, remove, toggle, clear, hydrated]
  );

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useProgramShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useProgramShortlist must be used within ProgramShortlistProvider");
  return ctx;
}

export { MAX_SHORTLIST };
