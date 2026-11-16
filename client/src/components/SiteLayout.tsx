import React, { useEffect, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { searchPublicPages } from "../lib/publicSearch";
import {
  ArrowRight,
  Check,
  MapPin,
  Menu,
  Search,
  Settings2,
  X,
} from "lucide-react";
import {
  facebookUrl,
  navItems,
  pages,
  stories,
} from "../../../shared/siteData";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="/"
      aria-label="Blind Cricket ACT home"
    >
      <svg className="brand-mark" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="28" cy="30" r="24" fill="currentColor" />
        <path
          d="M17 12c19 11 23 28 15 43M25 7c-13 15-13 32 2 48"
          fill="none"
          stroke="#FFC72C"
          strokeWidth="2.6"
          strokeDasharray="3 3"
        />
        <path
          d="M49 17c5 7 5 19 0 26M54 12c8 10 8 26 0 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="brand-type">
        BLIND CRICKET
        <span className="brand-region">AUSTRALIAN CAPITAL TERRITORY</span>
      </span>
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={`button${secondary ? " button-outline" : ""}`}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

export function SiteLayout({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) {
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [largeText, setLargeText] = useState(false);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    try {
      const preference = JSON.parse(
        localStorage.getItem("bcact-display") || "{}"
      );
      setLargeText(preference.largeText === true);
      setContrast(preference.contrast === true);
    } catch {
      /* Display preferences are optional. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.largeText = String(largeText);
    document.documentElement.dataset.contrast = String(contrast);
    try {
      localStorage.setItem(
        "bcact-display",
        JSON.stringify({ largeText, contrast })
      );
    } catch {
      /* No storage needed. */
    }
  }, [largeText, contrast]);

  const matches = searchPublicPages(query);
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>CRICKET. CONNECTION. COMMUNITY.</span>
          <div>
            <span className="utility-location">
              <MapPin size={13} aria-hidden="true" /> Canberra & surrounding
              region
            </span>
            <button
              ref={settingsButtonRef}
              onClick={() => setSettingsOpen(true)}
            >
              <Settings2 size={14} aria-hidden="true" /> Accessibility
            </button>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <button
              ref={searchButtonRef}
              className="icon-button"
              aria-label="Search this website"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={21} />
            </button>
            <details className="mobile-nav-disclosure">
              <summary
                className="icon-button mobile-menu-trigger"
                aria-label="Main navigation menu"
              >
                <Menu aria-hidden="true" />
              </summary>
              <nav
                id="mobile-navigation"
                className="mobile-nav"
                aria-label="Mobile navigation"
              >
                {navItems.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <p className="eyebrow">A PLACE FOR EVERY PLAYER</p>
              <h2>
                Part of a team.
                <br />
                Part of something more.
              </h2>
            </div>
            <ButtonLink href="/play-cricket/get-started/">
              Find your place
            </ButtonLink>
          </div>
          <div className="footer-links-row">
            <div className="footer-links">
              <a href="/contact/">Contact</a>
              <a href="/governance/">Governance & Policies</a>
              <a href={facebookUrl}>
                Facebook{" "}
                <span className="sr-only">
                  — official Blind Cricket ACT page
                </span>
              </a>
              <a href="/safety/">Report a Safety Issue</a>
            </div>
            <Logo light />
          </div>
          <p className="country-acknowledgment">
            We acknowledge the Ngunnawal people, the Traditional Custodians of
            the Canberra region, and respect all people and families with a
            connection to this Country. We pay our respects to Elders past and
            present.
          </p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Blind Cricket ACT</span>
            <div>
              <a href="/accessibility/">Accessibility statement</a>
              <a href="/photo-credits/">Photo credits</a>
              <span>Everyone belongs.</span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content"
            onCloseAutoFocus={event => {
              event.preventDefault();
              searchButtonRef.current?.focus();
            }}
          >
            <Dialog.Title>Find your way</Dialog.Title>
            <Dialog.Description>
              Search programs, playing information and community stories. Your
              search stays in your browser.
            </Dialog.Description>
            <label htmlFor="site-search" className="search-label">
              What are you looking for?
            </label>
            <div className="search-input-wrap">
              <Search size={20} aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Try training, volunteering or juniors"
              />
            </div>
            <p className="search-count" role="status">
              {query
                ? `${matches.length} matching pages${matches.length === 8 ? " shown" : ""}`
                : "Popular places to start"}
            </p>
            <div className="search-results">
              {(query
                ? matches
                : Object.entries(pages).filter(([key]) =>
                    [
                      "/play-cricket/get-started",
                      "/play-cricket/training",
                      "/programs",
                      "/support/volunteer",
                    ].includes(key)
                  )
              ).map(([href, page]) => (
                <a key={href} href={`${href}/`}>
                  <span>
                    {page.title}
                    <small>{page.description}</small>
                  </span>
                  <ArrowRight size={19} aria-hidden="true" />
                </a>
              ))}
              {query && matches.length === 0 && (
                <p>
                  No pages found. Try a shorter search, or{" "}
                  <a href="/contact/">visit our contact page</a>.
                </p>
              )}
            </div>
            <Dialog.Close className="dialog-close" aria-label="Close search">
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content settings-dialog"
            onCloseAutoFocus={event => {
              event.preventDefault();
              settingsButtonRef.current?.focus();
            }}
          >
            <Dialog.Title>Make yourself comfortable</Dialog.Title>
            <Dialog.Description>
              Choose how you read this website. These display preferences are
              saved only on this device.
            </Dialog.Description>
            <button
              className="preference-button"
              aria-pressed={largeText}
              onClick={() => setLargeText(!largeText)}
            >
              <span>
                Larger text<small>Increase the default reading size</small>
              </span>
              {largeText && <Check aria-hidden="true" />}
            </button>
            <button
              className="preference-button"
              aria-pressed={contrast}
              onClick={() => setContrast(!contrast)}
            >
              <span>
                Higher contrast<small>Strengthen text and borders</small>
              </span>
              {contrast && <Check aria-hidden="true" />}
            </button>
            <a className="text-link" href="/accessibility/">
              Read our accessibility statement{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Dialog.Close
              className="dialog-close"
              aria-label="Close accessibility settings"
            >
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export function StoryCards({ limit }: { limit?: number }) {
  return (
    <div className="story-grid">
      {stories.slice(0, limit ?? stories.length).map(story => (
        <a className="story-card" href={`${story.href}/`} key={story.href}>
          <div className="story-image">
            <img src={story.image} alt={story.alt} loading="lazy" />
          </div>
          <div className="story-content">
            <span className="story-category">{story.category}</span>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <div className="story-foot">
              <span>{story.readTime}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
