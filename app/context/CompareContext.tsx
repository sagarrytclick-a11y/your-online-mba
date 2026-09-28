"use client";
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { collegeReviews, CollegeReview } from "../data/colleges";
import { useLocalStorageState } from "../lib/useLocalStorageState";

const STORAGE_KEY = "compareUniversities";
const MAX_COMPARE = 4;

interface CompareContextType {
  compareIds: string[];
  compareColleges: CollegeReview[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isFull: boolean;
  includes: (id: string) => boolean;
  count: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useLocalStorageState<string[]>(STORAGE_KEY, []);

  const add = useCallback(
    (id: string) => {
      setCompareIds((prev) =>
        prev.includes(id) || prev.length >= MAX_COMPARE ? prev : [...prev, id]
      );
    },
    [setCompareIds]
  );

  const remove = useCallback(
    (id: string) => {
      setCompareIds((prev) => prev.filter((i) => i !== id));
    },
    [setCompareIds]
  );

  const toggle = useCallback(
    (id: string) => {
      setCompareIds((prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id)
          : prev.length >= MAX_COMPARE
            ? prev
            : [...prev, id]
      );
    },
    [setCompareIds]
  );

  const clear = useCallback(() => setCompareIds([]), [setCompareIds]);

  const isFull = compareIds.length >= MAX_COMPARE;
  const includes = useCallback((id: string) => compareIds.includes(id), [compareIds]);
  const count = compareIds.length;

  const compareColleges = useMemo(
    () =>
      compareIds
        .map((id) => collegeReviews.find((c) => c.id === id))
        .filter((c): c is CollegeReview => c !== undefined),
    [compareIds]
  );

  const value = useMemo(
    () => ({ compareIds, compareColleges, add, remove, toggle, clear, isFull, includes, count }),
    [compareIds, compareColleges, add, remove, toggle, clear, isFull, includes, count]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
