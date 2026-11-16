import React from "react";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  MapPin,
  Radio,
  Users,
} from "lucide-react";
import { ButtonLink, StoryCards } from "../components/SiteLayout";

const involvement = [
  {
    title: "Play Cricket",
    description: "Find your team. Discover what you can do.",
    href: "/play-cricket/get-started/",
    image: "/images/act-action.webp",
    alt: "Two ACT blind cricket players in blue and yellow running together on the field",
  },
  {
    title: "Come and Try",
    description: "A bat, an audible ball and a warm welcome.",
    href: "/play-cricket/register-interest/",
    image: "/images/batting.webp",
    alt: "Blind cricket player batting with a wicketkeeper ready behind the stumps",
  },
  {
    title: "Volunteer",
    description: "Your time can make a real difference.",
    href: "/support/volunteer/",
    image: "/images/act-community.webp",
    alt: "Players and support team gathered together in green cricket uniforms",
  },
  {
    title: "Support Us",
    description: "Help open the game to more people.",
    href: "/support/",
    image: "/images/australia-team.webp",
    alt: "Australian women’s blind cricket team standing together in yellow uniforms",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-photo">
          <img
            src="/images/act-action.webp"
            alt="Two ACT blind cricket players run onto the field together at the National Cricket Inclusion Championships"
            fetchPriority="high"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> DIFFERENT VISION. SAME LOVE OF
              THE GAME.
            </p>
            <h1 id="hero-heading">
              Blind cricket is
              <br />
              more than
              <br />
              <em>meets the eye.</em>
            </h1>
            <p className="hero-subtitle">
              A game shaped by sound, teamwork and trust.
              <br className="desktop-break" /> Open to anyone who is blind or
              has low vision.
            </p>
            <p className="hero-support">
              No experience needed. Join an inclusive cricket community in
              Canberra and the surrounding region.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/play-cricket/register-interest/">
                Register to play
              </ButtonLink>
              <a href="/support/volunteer/" className="hero-secondary">
                Volunteer <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="/support/donate/" className="hero-secondary">
                Donate <HeartHandshake size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-photo-label">
          <span className="small-dot" /> ONE TEAM. EVERY POSSIBILITY.
        </div>
      </section>
      <div className="welcome-strip">
        <div className="container welcome-inner">
          <span>
            <Users size={22} aria-hidden="true" />
            <strong>A game for you. A community for everyone.</strong>
          </span>
          <span className="welcome-detail">
            All abilities. All backgrounds. No experience needed.
          </span>
        </div>
      </div>

      <section
        className="section involved-section"
        aria-labelledby="involved-heading"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PLACE IN THE TEAM</p>
              <h2 id="involved-heading">
                There’s more than one way
                <br />
                to get involved.
              </h2>
            </div>
            <p>
              On the pitch or behind the scenes,
              <br />
              there’s a place for you here.
            </p>
          </div>
          <div className="involvement-grid">
            {involvement.map((item, index) => (
              <a className="involvement-card" href={item.href} key={item.title}>
                <div className="involvement-image">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <span className="card-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="involvement-content">
                  <h3>
                    {item.title}
                    <span className="card-arrow">
                      <ArrowRight size={21} aria-hidden="true" />
                    </span>
                  </h3>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section explain-section"
        aria-labelledby="explain-heading"
      >
        <div className="container explain-grid">
          <div className="explain-image">
            <img
              src="/images/batting.webp"
              alt="A blind cricket batter follows through on a shot as the wicketkeeper watches from behind"
              loading="lazy"
            />
            <div className="image-note">
              <Radio size={25} aria-hidden="true" />
              <span>
                Listen to the ball.
                <br />
                <strong>Feel the game.</strong>
              </span>
            </div>
          </div>
          <div className="explain-copy">
            <p className="eyebrow">SAME GAME. A DIFFERENT WAY TO PLAY.</p>
            <h2 id="explain-heading">
              Built on sound.
              <br />
              Powered by teamwork.
            </h2>
            <p>
              Blind cricket is cricket adapted for people who are blind or have
              low vision. An audible ball and clear communication bring the game
              to life.
            </p>
            <p>
              It’s the familiar joy of a great shot, a shared celebration and
              being part of a team. You don’t need to have played before. We’ll
              help you find your feet.
            </p>
            <div className="feature-row">
              <span>
                <Radio size={19} aria-hidden="true" /> An audible ball
              </span>
              <span>
                <Users size={19} aria-hidden="true" /> A supportive team
              </span>
            </div>
            <a className="text-link" href="/play-cricket/">
              Discover blind cricket <ArrowRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        className="section activity-section"
        aria-labelledby="activity-heading"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEE YOU AT THE CREASE</p>
              <h2 id="activity-heading">What’s coming up.</h2>
            </div>
            <a className="text-link" href="/fixtures/">
              Fixtures & results <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
          <div className="activity-grid">
            <div className="activity-image">
              <img
                src="/images/act-team.webp"
                alt="ACT blind cricket players and coaches together at the National Cricket Inclusion Championships"
                loading="lazy"
              />
            </div>
            <div className="activity-list">
              <a href="/play-cricket/training/" className="activity-item">
                <span className="activity-icon">
                  <CalendarDays size={27} aria-hidden="true" />
                </span>
                <div>
                  <span className="badge">TRAINING</span>
                  <h3>Your next session starts here</h3>
                  <p>
                    <MapPin size={14} aria-hidden="true" /> Canberra &
                    surrounding region
                  </p>
                  <span className="activity-status">
                    Ask us about current dates and locations
                  </span>
                </div>
                <ArrowRight size={21} aria-hidden="true" />
              </a>
              <a
                href="/play-cricket/register-interest/"
                className="activity-item"
              >
                <span className="activity-icon">
                  <Users size={27} aria-hidden="true" />
                </span>
                <div>
                  <span className="badge">COME & TRY</span>
                  <h3>Curious? Come give it a go.</h3>
                  <p>Beginners and support people welcome</p>
                  <span className="activity-status">
                    Get in touch to arrange your first visit
                  </span>
                </div>
                <ArrowRight size={21} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section news-section"
        aria-labelledby="stories-heading"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FROM OUR COMMUNITY</p>
              <h2 id="stories-heading">More than a game.</h2>
            </div>
            <a className="text-link" href="/news/">
              News & stories <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
          <StoryCards />
        </div>
      </section>

      <section
        className="community-section"
        aria-labelledby="community-heading"
      >
        <div className="community-photo">
          <img
            src="/images/australia-team.webp"
            alt="The Australian women’s blind cricket team, showing a shared pathway for women in inclusive sport"
            loading="lazy"
          />
        </div>
        <div className="community-copy">
          <p className="eyebrow">COMMUNITY & INCLUSION</p>
          <h2 id="community-heading">
            Different backgrounds.
            <br />
            <em>One shared game.</em>
          </h2>
          <p>
            Cricket connects us. Our programs create opportunities for juniors,
            women, multicultural communities and people across the region.
          </p>
          <p>
            For schools, community groups and workplaces, blind cricket offers a
            hands-on way to explore communication, accessibility and inclusion.
          </p>
          <ButtonLink href="/programs/">Explore our programs</ButtonLink>
        </div>
      </section>

      <section
        className="section partners-section"
        aria-labelledby="partners-heading"
      >
        <div className="container">
          <div className="partners-heading">
            <p className="eyebrow">STRONGER TOGETHER</p>
            <h2 id="partners-heading">A community that backs inclusion.</h2>
            <p>
              With support from PACE Farms for our multicultural program,
              <br />
              and connections across the wider cricket and blind sports
              community.
            </p>
          </div>
          <div className="partner-grid real-partners">
            <a href="/programs/multicultural/" className="partner-logo">
              <img
                src="/images/pace-logo.webp"
                alt="Pace Farm — support for our multicultural program"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.cricketact.com.au/blind-cricket"
              className="partner-logo"
            >
              <img
                src="/images/cricket-act-logo.webp"
                alt="Cricket ACT — blind cricket in our region"
                loading="lazy"
              />
            </a>
            <a
              href="https://blindsportsaustralia.com.au/blind-cricket/"
              className="partner-logo"
            >
              <img
                src="/images/blind-sports-logo.webp"
                alt="Blind Sports Australia — the wider inclusive sports community"
                loading="lazy"
              />
            </a>
          </div>
          <div className="partner-bottom">
            <p>
              Help make cricket more accessible. Be part of what comes next.
            </p>
            <ButtonLink href="/support/sponsor/" secondary>
              Become a Sponsor
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
