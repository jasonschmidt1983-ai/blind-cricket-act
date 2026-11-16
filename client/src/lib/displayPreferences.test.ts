import { describe, expect, it } from "vitest";
import {
  applyDisplayPreferences,
  DEFAULT_DISPLAY_PREFERENCES as defaults,
  DISPLAY_PREFERENCE_KEY,
  LEGACY_PREFERENCE_KEY,
  normaliseDisplayPreferences,
  readDisplayPreferences,
  saveDisplayPreferences,
  stepTextSize,
  type PreferenceStorage,
} from "./displayPreferences";

function memoryStorage(
  initial: Record<string, string> = {}
): PreferenceStorage {
  const entries = new Map(Object.entries(initial));
  return {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => {
      entries.set(key, value);
    },
    removeItem: key => {
      entries.delete(key);
    },
  };
}
describe("accessibility display preferences", () => {
  it("uses safe default settings", () => {
    for (const input of [null, undefined, false, "bad", [], {}]) {
      expect(normaliseDisplayPreferences(input)).toEqual(defaults);
    }
    expect(readDisplayPreferences(null)).toEqual(defaults);
  });
  it("accepts each supported text size and colour mode", () => {
    for (const textSize of [100, 125, 150, 175, 200]) {
      for (const colourMode of ["default", "high", "negative", "light"]) {
        expect(
          normaliseDisplayPreferences({ textSize, colourMode })
        ).toMatchObject({ textSize, colourMode });
      }
    }
  });
  it("rejects arbitrary values and keeps independent options", () => {
    expect(
      normaliseDisplayPreferences({
        textSize: 800,
        colourMode: "unknown",
        grayscale: true,
        underlineLinks: true,
        readableFont: true,
        extra: "not stored",
      })
    ).toEqual({
      ...defaults,
      grayscale: true,
      underlineLinks: true,
      readableFont: true,
    });
    expect(
      normaliseDisplayPreferences({ textSize: "200", grayscale: "true" })
    ).toEqual(defaults);
  });
  it("steps text size in both directions without exceeding limits", () => {
    expect(stepTextSize(100, -1)).toBe(100);
    expect(stepTextSize(100, 1)).toBe(125);
    expect(stepTextSize(150, -1)).toBe(125);
    expect(stepTextSize(175, 1)).toBe(200);
    expect(stepTextSize(200, 1)).toBe(200);
  });
  it("migrates earlier larger-text and contrast choices", () => {
    expect(
      readDisplayPreferences(
        memoryStorage({
          [LEGACY_PREFERENCE_KEY]: JSON.stringify({
            largeText: true,
            contrast: true,
          }),
        })
      )
    ).toEqual({ ...defaults, textSize: 125, colourMode: "high" });
  });
  it("saves, reloads and resets every option without reverting to legacy settings", () => {
    const storage = memoryStorage({
      [LEGACY_PREFERENCE_KEY]: JSON.stringify({
        largeText: true,
        contrast: true,
      }),
    });
    const selected = {
      ...defaults,
      textSize: 200 as const,
      colourMode: "negative" as const,
      grayscale: true,
      underlineLinks: true,
      readableFont: true,
    };
    expect(saveDisplayPreferences(storage, selected)).toBe(true);
    expect(storage.getItem(LEGACY_PREFERENCE_KEY)).toBeNull();
    expect(readDisplayPreferences(storage)).toEqual(selected);
    expect(saveDisplayPreferences(storage, defaults)).toBe(true);
    expect(readDisplayPreferences(storage)).toEqual(defaults);
  });
  it("survives malformed or blocked storage", () => {
    expect(
      readDisplayPreferences(
        memoryStorage({ [DISPLAY_PREFERENCE_KEY]: "not JSON" })
      )
    ).toEqual(defaults);
    const unavailable = {
      getItem() {
        throw Error("blocked");
      },
      setItem() {
        throw Error("blocked");
      },
      removeItem() {
        throw Error("blocked");
      },
    };
    expect(readDisplayPreferences(unavailable)).toEqual(defaults);
    expect(saveDisplayPreferences(unavailable, defaults)).toBe(false);
    expect(saveDisplayPreferences(null, defaults)).toBe(false);
  });
  it("applies themes and scaling without filtering the document root", () => {
    const values: Record<string, string> = {};
    const root = {
      dataset: { largeText: "true", contrast: "true" },
      style: {
        setProperty: (key: string, value: string) => {
          values[key] = value;
        },
      },
    } as unknown as HTMLElement;
    applyDisplayPreferences(root, {
      ...defaults,
      textSize: 175,
      colourMode: "light",
      grayscale: true,
      underlineLinks: true,
      readableFont: true,
    });
    expect(root.dataset).toEqual({
      textSize: "175",
      colorMode: "light",
      grayscale: "true",
      underlineLinks: "true",
      readableFont: "true",
    });
    expect(values).toEqual({ "--text-scale": "1.75" });
  });
});
