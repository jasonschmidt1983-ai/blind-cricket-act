export const DISPLAY_PREFERENCE_KEY = "bcact-display-v2";
export const LEGACY_PREFERENCE_KEY = "bcact-display";
export const TEXT_SIZES = [100, 125, 150, 175, 200] as const;
export type TextSize = (typeof TEXT_SIZES)[number];
export type ColourMode = "default" | "high" | "negative" | "light";
export type DisplayPreferences = {
  version: 2;
  textSize: TextSize;
  colourMode: ColourMode;
  grayscale: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
};
export type PreferenceStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

export const DEFAULT_DISPLAY_PREFERENCES: DisplayPreferences = {
  version: 2,
  textSize: 100,
  colourMode: "default",
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
};

export function normaliseDisplayPreferences(
  value: unknown
): DisplayPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...DEFAULT_DISPLAY_PREFERENCES };
  }
  const data = value as Record<string, unknown>;
  const textSize = TEXT_SIZES.includes(data.textSize as TextSize)
    ? (data.textSize as TextSize)
    : 100;
  const colourMode = ["default", "high", "negative", "light"].includes(
    data.colourMode as string
  )
    ? (data.colourMode as ColourMode)
    : "default";
  return {
    version: 2,
    textSize,
    colourMode,
    grayscale: data.grayscale === true,
    underlineLinks: data.underlineLinks === true,
    readableFont: data.readableFont === true,
  };
}

export function browserPreferenceStorage(): PreferenceStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function readDisplayPreferences(
  storage: PreferenceStorage | null
): DisplayPreferences {
  if (!storage) return { ...DEFAULT_DISPLAY_PREFERENCES };
  try {
    const current = storage.getItem(DISPLAY_PREFERENCE_KEY);
    if (current !== null)
      return normaliseDisplayPreferences(JSON.parse(current));
    const legacy = JSON.parse(storage.getItem(LEGACY_PREFERENCE_KEY) || "null");
    if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) {
      return { ...DEFAULT_DISPLAY_PREFERENCES };
    }
    return {
      ...DEFAULT_DISPLAY_PREFERENCES,
      textSize: legacy.largeText === true ? 125 : 100,
      colourMode: legacy.contrast === true ? "high" : "default",
    };
  } catch {
    return { ...DEFAULT_DISPLAY_PREFERENCES };
  }
}

export function saveDisplayPreferences(
  storage: PreferenceStorage | null,
  preferences: DisplayPreferences
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(
      DISPLAY_PREFERENCE_KEY,
      JSON.stringify(normaliseDisplayPreferences(preferences))
    );
    storage.removeItem(LEGACY_PREFERENCE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function stepTextSize(current: TextSize, direction: -1 | 1): TextSize {
  const index = TEXT_SIZES.indexOf(current);
  return TEXT_SIZES[
    Math.max(0, Math.min(TEXT_SIZES.length - 1, index + direction))
  ];
}

export function applyDisplayPreferences(
  root: HTMLElement,
  preferences: DisplayPreferences
): void {
  const safe = normaliseDisplayPreferences(preferences);
  root.dataset.textSize = String(safe.textSize);
  root.dataset.colorMode = safe.colourMode;
  root.dataset.grayscale = String(safe.grayscale);
  root.dataset.underlineLinks = String(safe.underlineLinks);
  root.dataset.readableFont = String(safe.readableFont);
  root.style.setProperty("--text-scale", String(safe.textSize / 100));
  delete root.dataset.largeText;
  delete root.dataset.contrast;
}
