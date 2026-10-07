"use client";

import { createLocalStore, useLocalStore } from "@/lib/store";
import { DEFAULT_COMPANION, companionById, type Companion } from "@/lib/companions";

/**
 * Only the id goes into storage, so editing a companion's name or greeting never
 * leaves a stale copy of the old one in somebody's browser.
 */
const companionIdStore = createLocalStore<string>(
  "petling:companion",
  DEFAULT_COMPANION.id,
  (parsed) => (typeof parsed === "string" ? parsed : DEFAULT_COMPANION.id),
);

/** The id is a stable string and `companionById` returns an entry of a constant
 *  array, so the snapshot is referentially stable, as useSyncExternalStore
 *  requires. */
export function useCompanion(): Companion {
  return companionById(useLocalStore(companionIdStore));
}

export function chooseCompanion(id: string): void {
  companionIdStore.set(id);
}

export type Settings = {
  talkMinutes: number;
  weeklyEmail: boolean;
  english: boolean;
  arabic: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  talkMinutes: 15,
  weeklyEmail: true,
  english: true,
  arabic: true,
};

const settingsStore = createLocalStore<Settings>(
  "petling:settings",
  DEFAULT_SETTINGS,
  (parsed) => {
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_SETTINGS;
    const raw = parsed as Partial<Settings>;
    return {
      talkMinutes:
        typeof raw.talkMinutes === "number" && raw.talkMinutes >= 5 && raw.talkMinutes <= 30
          ? raw.talkMinutes
          : DEFAULT_SETTINGS.talkMinutes,
      weeklyEmail:
        typeof raw.weeklyEmail === "boolean"
          ? raw.weeklyEmail
          : DEFAULT_SETTINGS.weeklyEmail,
      // At least one language has to stay on, whatever is in storage.
      english: raw.english === false && raw.arabic !== false ? false : true,
      arabic: raw.arabic === false ? false : true,
    };
  },
);

export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const settings = useLocalStore(settingsStore);
  return [settings, (patch) => settingsStore.set({ ...settings, ...patch })];
}
