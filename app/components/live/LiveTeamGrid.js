"use client";

import { useLive } from "../../lib/use-live";
import { fetchTeam } from "../../lib/sheets-client";
import ParallaxCard from "../ParallaxCard";

/** Team grid (experts tab) — build-time initial members, live-refreshed from the sheet. */
export default function LiveTeamGrid({ initial = [] }) {
  const teamMembers = useLive(initial, fetchTeam);

  return (
    <div className="practice-mgmt-grid">
      {teamMembers.map((member, i) => (
        <ParallaxCard as="article" className="card practice-mgmt-card" tiltDepth={6} key={`${member.name}-${i}`}>
          <div
            className="practice-mgmt-icon"
            style={{ width: "96px", height: "96px", borderRadius: "50%", overflow: "hidden", padding: 0 }}
          >
            {member.image ? (
              <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : null}
          </div>
          <h3>{member.name}</h3>
          <span className="eyebrow text-accent" style={{ display: "block", marginBottom: "0.75rem" }}>
            {member.title}
          </span>
          <p>{member.bio}</p>
          <div className="practice-mgmt-tags">
            {(member.tags || []).map((tag) => (
              <span className="tag-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </ParallaxCard>
      ))}
    </div>
  );
}
