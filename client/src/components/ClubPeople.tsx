import React from "react";
import { ArrowRight, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { boardMembers, stateTeam } from "../../../shared/siteData";

export function BoardProfiles({ showLink = false }: { showLink?: boolean }) {
  return (
    <section className="board-section" aria-labelledby="board-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Leadership & community</p>
          <h2 id="board-heading">The Board</h2>
          <p>The people helping our players and our community thrive.</p>
        </div>
        {showLink && (
          <a className="text-link" href="/about/board/">
            Meet the Board <ArrowRight size={18} aria-hidden="true" />
          </a>
        )}
      </div>
      <ul className="board-profiles">
        {boardMembers.map(member => (
          <li className="board-profile" key={member.name}>
            <img
              src={member.image}
              alt={`Portrait of ${member.name}`}
              width="506"
              height="506"
              loading="lazy"
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StateTeamAnnouncement() {
  return (
    <section
      className="state-team-announcement"
      aria-labelledby="state-team-heading"
    >
      <div className="state-team-intro">
        <p className="eyebrow">NCIC {stateTeam.year} · Team announced</p>
        <h2 id="state-team-heading">The squad for Ballarat.</h2>
        <p>
          Congratulations to the 13 players selected to represent Blind Cricket
          ACT at the {stateTeam.year} {stateTeam.event}.
        </p>
        <div className="team-event-facts">
          <p>
            <CalendarDays size={20} aria-hidden="true" />
            <span>{stateTeam.dates}</span>
          </p>
          <p>
            <MapPin size={20} aria-hidden="true" />
            <span>{stateTeam.location}</span>
          </p>
        </div>
        <a className="button button-primary" href={stateTeam.announcementUrl}>
          View the official team announcement{" "}
          <ExternalLink size={18} aria-hidden="true" />
        </a>
        <p className="team-source-note">
          The original announcement opens on Facebook, which may ask you to sign
          in. The selected squad is also listed here as readable text.
        </p>
      </div>
      <div className="squad-list-wrap">
        <h3>NCIC 2027 selected squad</h3>
        <ol className="squad-list">
          {stateTeam.players.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ol>
        <p className="team-source-note">
          Names follow Blind Cricket ACT’s official 2027 announcement. This
          squad is separate from the club’s Board.
        </p>
      </div>
      <figure className="team-announcement-poster">
        <a href={stateTeam.announcementUrl}>
          <img
            src="/images/ncic-2027-announcement.webp"
            width="1024"
            height="1536"
            loading="lazy"
            alt="Official Blind Cricket ACT Ballarat 2027 team-announcement graphic, showing players in blue and gold, the selected squad and Lord’s Taverners ACT sponsorship. The full squad is also listed in text on this page."
          />
        </a>
        <figcaption>
          View the original team announcement on Facebook.
        </figcaption>
      </figure>
      <div className="team-resource-links">
        <a className="text-link" href={stateTeam.cricketActUrl}>
          Cricket ACT player profiles{" "}
          <ExternalLink size={18} aria-hidden="true" />
        </a>
        <a className="text-link" href={stateTeam.eventUrl}>
          Official NCIC event information{" "}
          <ExternalLink size={18} aria-hidden="true" />
        </a>
        <a className="text-link" href="/support/sponsor/">
          Help the team reach the NCIC{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
      <p className="team-source-note">
        Cricket ACT’s profile directory provides player background; it is not a
        season-specific substitute for the selected squad above. Individual
        match fixtures will be shared once confirmed.
      </p>
    </section>
  );
}
