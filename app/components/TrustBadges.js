export default function TrustBadges() {
  return (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", margin: "1.5rem 0" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--ink-300)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0110 0v4"></path>
        </svg>
        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>SSL Secured</span>
      </div>
      
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--ink-300)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Data Protection</span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--ink-300)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>CCPA / GDPR Ready</span>
      </div>
    </div>
  );
}
