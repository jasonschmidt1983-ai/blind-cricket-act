import React from "react";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import { SiteLayout } from "./components/SiteLayout";
import { pages } from "../../shared/siteData";

export default function App({ path = "/" }: { path?: string }) {
  const current = path.replace(/\/+$/, "") || "/";
  const known = current === "/" || current in pages;
  return (
    <SiteLayout path={current}>
      {current === "/" ? (
        <Home />
      ) : known ? (
        <InfoPage path={current} />
      ) : (
        <section className="section not-found">
          <div className="container">
            <p className="eyebrow">LET’S GET YOU BACK ON THE PITCH</p>
            <h1>That page isn’t here.</h1>
            <p>It may have moved, or the address may be incorrect.</p>
            <a className="button" href="/">
              Back to the homepage
            </a>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
