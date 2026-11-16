import React, { useState, type KeyboardEvent } from "react";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import {
  facebookUrl,
  pages,
  stories,
  type PageData,
} from "../../../shared/siteData";

const integrityUrl =
  "https://blindsportsaustralia.com.au/national-integrity-framework/";
const storyCategories = ["All stories", "Playing", "Inclusion"] as const;
type StoryCategory = (typeof storyCategories)[number];
type FixtureView = "upcoming" | "results";

const pathwaySteps = [
  {
    title: "Try",
    body: "Ask about an introductory opportunity and discover the audible ball.",
  },
  {
    title: "Learn",
    body: "Build confidence with the basics, clear calls and team communication.",
  },
  {
    title: "Train",
    body: "Develop your skills through practice at a pace that works for you.",
  },
  {
    title: "Compete",
    body: "Ask about suitable competition and the requirements to take part.",
  },
  {
    title: "Represent",
    body: "Explore representative opportunities and the current selection process.",
  },
];

function SectionList({ sections }: { sections: PageData["sections"] }) {
  return (
    <div className="prose">
      {sections.map(section => (
        <section className="content-section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.items && (
            <ul className="section-list">
              {section.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function StoryCards({ items }: { items: typeof stories }) {
  return (
    <div className="story-grid">
      {items.map(story => (
        <a className="story-card" href={`${story.href}/`} key={story.href}>
          <div className="story-image">
            <img
              src={story.image}
              alt={story.alt}
              loading="lazy"
              width="960"
              height="640"
            />
          </div>
          <div className="story-content story-card-content">
            <span className="story-category">{story.category}</span>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <div className="story-foot">
              <span>{story.readTime}</span>
              <span className="text-link">
                Read the guide <ArrowRight size={18} aria-hidden="true" />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function EnquiryAside({ path }: { path: string }) {
  if (path === "/safety") {
    return (
      <aside className="aside-card safety-card">
        <ShieldCheck size={28} aria-hidden="true" />
        <h2>Use the right reporting channel</h2>
        <p>
          For an emergency in Australia, call 000. For integrity concerns, check
          the national reporting guidance.
        </p>
        <a className="text-link" href={integrityUrl}>
          National integrity information{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <p>Do not share sensitive details on social media.</p>
      </aside>
    );
  }
  return (
    <aside className="aside-card">
      {path === "/play-cricket/training" ? (
        <MapPin size={28} aria-hidden="true" />
      ) : null}
      <p className="eyebrow">Start a conversation</p>
      <h2>
        {path === "/contact" ? "Official Facebook page" : "Have a question?"}
      </h2>
      <p>
        Ask Blind Cricket ACT about current opportunities and the right next
        step for you.
      </p>
      <a className="button button-primary" href={facebookUrl}>
        Enquire on Facebook <ArrowRight size={18} aria-hidden="true" />
      </a>
      <p className="aside-note">
        Keep enquiries general. Please do not send medical documents, payment
        details or private information about children.
      </p>
      {path !== "/contact" && (
        <a className="text-link" href="/contact/">
          Contact information <ArrowRight size={18} aria-hidden="true" />
        </a>
      )}
      {path === "/play-cricket/faq" && (
        <a className="text-link" href="/safety/">
          Safety reporting guidance <ArrowRight size={18} aria-hidden="true" />
        </a>
      )}
    </aside>
  );
}

function PageCta({ safety = false }: { safety?: boolean }) {
  return (
    <section className="page-cta">
      <div className="container page-cta-inner">
        <div>
          <p className="eyebrow">
            {safety ? "Find appropriate help" : "Your next step"}
          </p>
          <h2>
            {safety
              ? "Keep safety concerns in the right channel."
              : "A conversation can open up the game."}
          </h2>
          <p>
            {safety
              ? "Call 000 in an emergency. Use official reporting guidance for other integrity concerns."
              : "Ask about playing, programs or supporting Blind Cricket ACT."}
          </p>
        </div>
        <a
          className="button button-navy"
          href={safety ? integrityUrl : "/contact/"}
        >
          {safety ? "View reporting guidance" : "Contact Blind Cricket ACT"}{" "}
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Pathway() {
  return (
    <section className="pathway-section" aria-labelledby="pathway-heading">
      <p className="eyebrow">One step at a time</p>
      <h2 id="pathway-heading">Try → Learn → Train → Compete → Represent</h2>
      <ol className="pathway pathway-steps">
        {pathwaySteps.map((step, index) => (
          <li className="pathway-step" key={step.title}>
            <span className="pathway-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="selection-principles prose">
        <h3>What contributes to selection?</h3>
        <p>
          The pathway values the following principles. Ask the club for the
          applicable eligibility requirements and current selection criteria.
        </p>
        <ul className="section-list">
          <li>Participation and engagement.</li>
          <li>Skill development.</li>
          <li>Performance.</li>
          <li>Team contribution.</li>
        </ul>
        <p>
          Opportunities depend on available competitions and selection.
          Progression is not automatic, and representative places are not
          guaranteed.
        </p>
      </div>
    </section>
  );
}

function PublicResources({ path }: { path: string }) {
  if (path === "/governance" || path === "/safety") {
    return (
      <section className="resource-links prose">
        <h2>
          {path === "/safety"
            ? "National reporting information"
            : "Public integrity resource"}
        </h2>
        <p>
          Read Blind Sports Australia’s National Integrity Framework information
          for the current framework and reporting guidance.
        </p>
        <a className="text-link" href={integrityUrl}>
          Blind Sports Australia: National Integrity Framework{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        {path === "/governance" && (
          <p>
            For immediate and general safety guidance, visit{" "}
            <a href="/safety/">Report a Safety Issue</a>.
          </p>
        )}
      </section>
    );
  }
  if (path === "/photo-credits") {
    return (
      <section className="resource-links prose">
        <h2>Source pages</h2>
        <ul className="section-list">
          <li>
            <a href="https://www.cricketact.com.au/blind-cricket">
              Cricket ACT: Blind Cricket
            </a>
          </li>
          <li>
            <a href="https://blindsportsaustralia.com.au/blind-cricket/">
              Blind Sports Australia: Blind Cricket
            </a>
          </li>
          <li>
            <a href="https://www.cricketact.com.au/">
              Cricket ACT: national championships photography source
            </a>{" "}
            — the exact article and photographer attribution still need
            confirmation.
          </li>
        </ul>
      </section>
    );
  }
  if (path === "/contact") {
    return (
      <section className="resource-links prose">
        <h2>Looking for something specific?</h2>
        <ul className="section-list">
          <li>
            <a href="/play-cricket/get-started/">Preparing to try cricket</a>
          </li>
          <li>
            <a href="/programs/community/">Community and group experiences</a>
          </li>
          <li>
            <a href="/support/volunteer/">Volunteering enquiries</a>
          </li>
          <li>
            <a href="/support/sponsor/">Sponsorship enquiries</a>
          </li>
          <li>
            <a href="/safety/">Safety and integrity reporting guidance</a> — do
            not send a private report through Facebook.
          </li>
        </ul>
      </section>
    );
  }
  return null;
}

export default function InfoPage({ path }: { path: string }) {
  const [category, setCategory] = useState<StoryCategory>("All stories");
  const [fixtureView, setFixtureView] = useState<FixtureView>("upcoming");
  const normalizedPath = path.replace(/\/+$/, "") || "/";
  const data = pages[normalizedPath];

  if (!data) {
    return (
      <section className="page-content">
        <div className="container prose">
          <p className="eyebrow">Page not found</p>
          <h1>Let’s find your way back.</h1>
          <p>
            This page is not available. Explore{" "}
            <a href="/play-cricket/">playing cricket</a> or{" "}
            <a href="/">return to the homepage</a>.
          </p>
        </div>
      </section>
    );
  }

  const parentPath = normalizedPath.slice(0, normalizedPath.lastIndexOf("/"));
  const parentPage = pages[parentPath];
  const childPaths = Object.keys(pages).filter(
    href =>
      href.startsWith(`${normalizedPath}/`) &&
      !href.slice(normalizedPath.length + 1).includes("/")
  );
  const filteredStories =
    category === "All stories"
      ? stories
      : stories.filter(story => story.category === category);
  const isStory = stories.some(story => story.href === normalizedPath);

  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>) {
    let next: FixtureView;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
      next = fixtureView === "upcoming" ? "results" : "upcoming";
    else if (event.key === "Home") next = "upcoming";
    else if (event.key === "End") next = "results";
    else return;
    event.preventDefault();
    setFixtureView(next);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`#fixtures-tab-${next}`)
      ?.focus();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="page-hero-content">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                {parentPage && (
                  <li>
                    <a href={`${parentPath}/`}>
                      {parentPath === "/news"
                        ? "News & Stories"
                        : parentPath === "/programs"
                          ? "Programs & Pathways"
                          : parentPath === "/support"
                            ? "Support Us"
                            : "Play Cricket"}
                    </a>
                  </li>
                )}
                <li aria-current="page">
                  {isStory ? data.title : data.eyebrow}
                </li>
              </ol>
            </nav>
            <p className="eyebrow">{data.eyebrow}</p>
            <h1>{data.title}</h1>
            <p className="page-description">{data.description}</p>
          </div>
          <div className="page-hero-image">
            <img src={data.image} alt={data.alt} width="1200" height="800" />
          </div>
        </div>
      </section>

      {childPaths.length > 0 && normalizedPath !== "/news" && (
        <nav className="subnav" aria-label={`${data.eyebrow} pages`}>
          <div className="container">
            {childPaths.map(href => (
              <a key={href} href={`${href}/`}>
                {pages[href].eyebrow}{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      )}

      <section className="page-content">
        <div className="container">
          {normalizedPath === "/news" && (
            <section className="news-stories" aria-labelledby="stories-heading">
              <h2 id="stories-heading">Explore the guides</h2>
              <div
                className="filter-controls filters"
                role="group"
                aria-label="Filter stories by category"
              >
                {storyCategories.map(item => (
                  <button
                    className={`filter-button${category === item ? " is-active" : ""}`}
                    type="button"
                    key={item}
                    aria-pressed={category === item}
                    aria-controls="story-results"
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p
                className="filter-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                Showing {filteredStories.length}{" "}
                {filteredStories.length === 1 ? "guide" : "guides"}
                {category === "All stories"
                  ? " across all categories"
                  : ` in ${category}`}
                .
              </p>
              <div id="story-results">
                <StoryCards items={filteredStories} />
              </div>
            </section>
          )}

          {normalizedPath === "/fixtures" && (
            <section
              className="fixtures-panel"
              aria-labelledby="fixtures-heading"
            >
              <h2 id="fixtures-heading">Training, matches & results</h2>
              <div
                className="filter-controls fixtures-tabs tabs"
                role="tablist"
                aria-label="Fixtures and results"
              >
                {(["upcoming", "results"] as const).map(view => (
                  <button
                    type="button"
                    className={`filter-button${fixtureView === view ? " is-active" : ""}`}
                    role="tab"
                    id={`fixtures-tab-${view}`}
                    aria-controls={`fixtures-panel-${view}`}
                    aria-selected={fixtureView === view}
                    tabIndex={fixtureView === view ? 0 : -1}
                    key={view}
                    onKeyDown={handleTabKeys}
                    onClick={() => setFixtureView(view)}
                  >
                    {view === "upcoming" ? "Upcoming" : "Results"}
                  </button>
                ))}
              </div>
              {(["upcoming", "results"] as const).map(view => (
                <div
                  className="fixture-empty empty-state"
                  role="tabpanel"
                  id={`fixtures-panel-${view}`}
                  aria-labelledby={`fixtures-tab-${view}`}
                  tabIndex={0}
                  hidden={fixtureView !== view}
                  key={view}
                >
                  <CalendarDays size={34} aria-hidden="true" />
                  <h3>
                    {view === "upcoming"
                      ? "Dates are being confirmed"
                      : "Results will be shared here"}
                  </h3>
                  <p>
                    {view === "upcoming"
                      ? "Ask the club about the next training session or match. Confirm the time, venue and any access arrangements before travelling."
                      : "Confirmed match results will be added when available. For current team updates, check the official Blind Cricket ACT Facebook page."}
                  </p>
                  <a className="text-link" href="/contact/">
                    Ask for the latest cricket information{" "}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>
              ))}
              <noscript>
                <p>
                  Results will be shared here when confirmed information is
                  available. For current updates, use the official Blind Cricket
                  ACT Facebook page linked on the Contact page.
                </p>
              </noscript>
            </section>
          )}

          {normalizedPath === "/programs/pathways" && <Pathway />}

          <div className="content-split">
            <div>
              {normalizedPath === "/play-cricket/faq" ? (
                <div className="faq-list prose">
                  <h2>Your questions, answered</h2>
                  {data.sections.map(section => (
                    <details className="faq-item" key={section.title}>
                      <summary>{section.title}</summary>
                      <div className="faq-answer">
                        <p>{section.body}</p>
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <SectionList sections={data.sections} />
              )}
              <PublicResources path={normalizedPath} />
            </div>
            <EnquiryAside path={normalizedPath} />
          </div>

          {isStory && (
            <section
              className="related-stories"
              aria-labelledby="related-heading"
            >
              <h2 id="related-heading">Keep exploring</h2>
              <StoryCards
                items={stories.filter(story => story.href !== normalizedPath)}
              />
              <a className="text-link" href="/news/">
                All news & stories <ArrowRight size={18} aria-hidden="true" />
              </a>
            </section>
          )}
        </div>
      </section>
      <PageCta safety={normalizedPath === "/safety"} />
    </>
  );
}
