"use client";

import { useEffect, useState } from "react";

let cachedHasExhibitions: boolean | null = null;
const listeners = new Set<(val: boolean) => void>();

export function setGlobalHasExhibitions(val: boolean) {
  cachedHasExhibitions = val;
  listeners.forEach((fn) => fn(val));
}

export function useHasExhibitions(initial?: boolean): boolean {
  const [hasExhibitions, setHasExhibitions] = useState<boolean>(() => {
    if (typeof initial === "boolean") {
      cachedHasExhibitions = initial;
      return initial;
    }
    if (cachedHasExhibitions !== null) {
      return cachedHasExhibitions;
    }
    return false;
  });

  useEffect(() => {
    const listener = (val: boolean) => setHasExhibitions(val);
    listeners.add(listener);

    if (typeof initial === "boolean") {
      cachedHasExhibitions = initial;
    }

    fetch("/api/exhibitions/check")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasExhibitions === "boolean") {
          setGlobalHasExhibitions(data.hasExhibitions);
        }
      })
      .catch(() => {});

    return () => {
      listeners.delete(listener);
    };
  }, [initial]);

  return hasExhibitions;
}
