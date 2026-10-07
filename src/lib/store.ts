"use client";

import { useSyncExternalStore } from "react";

/**
 * localStorage is an external store, so it is read with `useSyncExternalStore`
 * rather than copied into state inside an effect. That keeps the server render
 * on the fallback value, picks the stored value up during hydration without a
 * mismatch, and reacts to a change made in another tab.
 */
export type LocalStore<T> = {
  subscribe: (listener: () => void) => () => void;
  get: () => T;
  getServer: () => T;
  set: (value: T) => void;
};

export function createLocalStore<T>(
  key: string,
  fallback: T,
  revive: (parsed: unknown) => T,
): LocalStore<T> {
  const listeners = new Set<() => void>();

  // `useSyncExternalStore` re-renders whenever the snapshot is not referentially
  // equal to the last one, so the parsed value is cached against the raw string
  // it came from. Without this, every read would return a fresh object and the
  // component would loop.
  let cachedRaw: string | null = null;
  let cachedValue = fallback;
  let primed = false;

  const read = (): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      // Storage is blocked. The fallback below is the whole behaviour.
    }

    if (!primed || raw !== cachedRaw) {
      primed = true;
      cachedRaw = raw;
      cachedValue = fallback;
      if (raw !== null) {
        try {
          cachedValue = revive(JSON.parse(raw));
        } catch {
          cachedValue = fallback;
        }
      }
    }

    return cachedValue;
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      // Picks up a change made in another tab.
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    get: read,
    getServer: () => fallback,
    set(value) {
      let written = false;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        written = true;
      } catch {
        // Private browsing, or storage is full.
      }

      if (written) {
        // Re-read on the next snapshot, so storage stays the single source.
        primed = false;
      } else {
        // Hold it in memory instead, so the control the person just used still
        // reflects their choice for the rest of this visit.
        cachedRaw = null;
        cachedValue = value;
        primed = true;
      }

      listeners.forEach((listener) => listener());
    },
  };
}

export function useLocalStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}
