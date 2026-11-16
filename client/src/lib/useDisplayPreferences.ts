import { useEffect, useState } from "react";
import {
  applyDisplayPreferences,
  browserPreferenceStorage,
  DEFAULT_DISPLAY_PREFERENCES,
  readDisplayPreferences,
  saveDisplayPreferences,
  type DisplayPreferences,
} from "./displayPreferences";

export function useDisplayPreferences() {
  const [preferences, setPreferences] = useState<DisplayPreferences>(
    DEFAULT_DISPLAY_PREFERENCES
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPreferences(readDisplayPreferences(browserPreferenceStorage()));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDisplayPreferences(document.documentElement, preferences);
    saveDisplayPreferences(browserPreferenceStorage(), preferences);
  }, [preferences, ready]);

  return { preferences, setPreferences };
}
