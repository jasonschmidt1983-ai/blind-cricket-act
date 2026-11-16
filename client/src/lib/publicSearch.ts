import { pages } from "../../../shared/siteData";

const keywords: Record<string, string> = {
  "/support/volunteer": "volunteer volunteering help coaching",
  "/support/donate": "donate donation donations giving",
  "/support/sponsor": "sponsor sponsorship partner partnership",
  "/programs/juniors": "junior juniors kids children youth",
  "/play-cricket/faq": "faq frequently asked questions answers",
  "/programs/albury": "albury regional summer",
};

/** Searches only bundled public information; nothing is submitted or recorded. */
export function searchPublicPages(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return Object.entries(pages).slice(0, 8);
  return Object.entries(pages)
    .map(entry => {
      const [href, page] = entry;
      const label =
        `${href} ${page.title} ${page.eyebrow} ${keywords[href] ?? ""}`.toLowerCase();
      const description = page.description.toLowerCase();
      const content = page.sections
        .flatMap(section => [
          section.title,
          section.body,
          ...(section.items ?? []),
        ])
        .join(" ")
        .toLowerCase();
      const score = label.includes(needle)
        ? 100
        : description.includes(needle)
          ? 10
          : content.includes(needle)
            ? 1
            : 0;
      return { entry, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(item => item.entry);
}
