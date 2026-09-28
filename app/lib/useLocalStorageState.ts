"use client";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

type Listener = () => void;

const registries = new Map<string, Set<Listener>>();
/** Parsed values are cached per raw string so identity stays stable between renders. */
const parseCache = new Map<string, unknown>();

function listenersFor(key: string): Set<Listener> {
  let set = registries.get(key);
  if (!set) {
    set = new Set();
    registries.set(key, set);
  }
  return set;
}

function readStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage blocked or full: state stays in memory for this session */
  }
}

function parseOnce<T>(raw: string): T {
  const cached = parseCache.get(raw);
  if (cached !== undefined) return cached as T;
  const parsed = JSON.parse(raw) as T;
  parseCache.set(raw, parsed);
  return parsed;
}

/**
 * useState backed by localStorage, wired through useSyncExternalStore so that
 * reading storage during render stays hydration safe and does not need a
 * setState-in-effect round trip.
 */
export function useLocalStorageState<T>(
  key: string,
  initial: T
): readonly [T, (update: T | ((previous: T) => T)) => void, boolean] {
  // Serialised once per mount: keeps the snapshot a plain string and gives the
  // fallback a stable identity for the lifetime of the component.
  const [fallbackRaw] = useState(() => JSON.stringify(initial));

  const subscribe = useCallback((listener: Listener) => {
    const set = listenersFor(key);
    set.add(listener);
    return () => {
      set.delete(listener);
    };
  }, [key]);

  const getSnapshot = useCallback(() => readStorage(key) ?? fallbackRaw, [key, fallbackRaw]);
  // Server render and the hydration pass both see the initial value.
  const getServerSnapshot = useCallback(() => fallbackRaw, [fallbackRaw]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo(() => {
    try {
      return parseOnce<T>(raw);
    } catch {
      return parseOnce<T>(fallbackRaw);
    }
  }, [raw, fallbackRaw]);

  const setValue = useCallback(
    (update: T | ((previous: T) => T)) => {
      const currentRaw = readStorage(key) ?? fallbackRaw;
      let current: T;
      try {
        current = parseOnce<T>(currentRaw);
      } catch {
        current = parseOnce<T>(fallbackRaw);
      }
      const next = typeof update === "function" ? (update as (previous: T) => T)(current) : update;
      writeStorage(key, JSON.stringify(next));
      listenersFor(key).forEach((listener) => listener());
    },
    [key, fallbackRaw]
  );

  // false during SSR and the hydration pass, true once the client has taken over.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return [value, setValue, hydrated] as const;
}
