import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/src/App";
import { pages } from "../shared/siteData";

const root = process.cwd();
const built = path.join(root, "dist/public");
const output = path.join(root, "docs");
const origin = "https://blindcricket.com.au";
const template = fs.readFileSync(path.join(built, "index.html"), "utf8");
const escape = (value: string) =>
  value.replace(
    /[&<>\"]/g,
    char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]!
  );
const home = {
  title: "Blind Cricket ACT | More than meets the eye",
  description:
    "A game shaped by sound, teamwork and trust. Discover inclusive blind cricket, programs and community in Canberra and the surrounding region.",
  image: "/images/act-action.webp",
};
const routes = ["/", ...Object.keys(pages)];

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(built, output, { recursive: true });
// These starter-only files are not used by the public, backend-free website.
fs.rmSync(path.join(output, "api"), { recursive: true, force: true });
fs.rmSync(path.join(output, "__manus__"), { recursive: true, force: true });

function htmlFor(route: string, notFound = false) {
  const info =
    route === "/"
      ? home
      : pages[route] || {
          title: "Page not found",
          description: "Find your way back to Blind Cricket ACT.",
          image: home.image,
        };
  const title =
    route === "/" ? info.title : `${info.title} | Blind Cricket ACT`;
  const url = origin + (route === "/" ? "/" : `${route}/`);
  const metadata = `<title>${escape(title)}</title>\n<meta name="description" content="${escape(info.description)}" />\n${notFound ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`}\n<meta property="og:type" content="website" />\n<meta property="og:site_name" content="Blind Cricket ACT" />\n<meta property="og:title" content="${escape(title)}" />\n<meta property="og:description" content="${escape(info.description)}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:image" content="${origin + info.image}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${escape(title)}" />\n<meta name="twitter:description" content="${escape(info.description)}" />\n<meta name="twitter:image" content="${origin + info.image}" />`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "")
    .replace("<!-- PAGE_METADATA -->", metadata)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App path={route} />)}</div>`
    );
}

for (const route of routes) {
  const dir = route === "/" ? output : path.join(output, route.substring(1));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), htmlFor(route));
}
fs.writeFileSync(path.join(output, "404.html"), htmlFor("/404", true));
fs.writeFileSync(path.join(output, ".nojekyll"), "");
fs.writeFileSync(path.join(output, "CNAME"), "blindcricket.com.au\n");
fs.writeFileSync(
  path.join(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
);
fs.writeFileSync(
  path.join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route === "/" ? "/" : route + "/"}</loc></url>`).join("")}</urlset>\n`
);
const manifest = {
  routes: routes.map(route => ({
    path: route,
    title: route === "/" ? "Home" : pages[route].title,
  })),
};
fs.writeFileSync(
  path.join(output, "manus-routes.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(root, "client/public/manus-routes.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
console.log(
  `Generated ${routes.length} complete public pages, 404, sitemap and GitHub Pages configuration in docs/.`
);
