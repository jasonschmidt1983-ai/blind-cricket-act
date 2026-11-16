import { describe, expect, it } from "vitest";
import { searchPublicPages } from "./publicSearch";

describe("public information search", () => {
  it.each([
    ["juniors", "/programs/juniors"],
    ["Junior", "/programs/juniors"],
    ["FAQ", "/play-cricket/faq"],
    ["Albury", "/programs/albury"],
    ["volunteering", "/support/volunteer"],
  ])("finds the %s public page", (query, path) => {
    expect(searchPublicPages(query).map(([href]) => href)).toContain(path);
  });
  it("normalises surrounding whitespace and returns a sensible limit", () => {
    expect(searchPublicPages("  FAQ  ")).toEqual(searchPublicPages("faq"));
    expect(searchPublicPages("").length).toBeLessThanOrEqual(8);
  });
  it("does not invent a match", () => {
    expect(searchPublicPages("unfindable-x9z7q")).toEqual([]);
  });
});
