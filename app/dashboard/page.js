"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ backgroundColor: "var(--background-muted)", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "var(--ink-700)", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           <h1 style={{ fontSize: "1.25rem", margin: 0 }}>VBI Client Dashboard</h1>
           <span style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>Coaching Secure View</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
           <span style={{ fontSize: "0.85rem" }}>Dr. Matthews (Admin)</span>
           <Link href="/" style={{ color: "var(--accent)", fontSize: "0.85rem", textDecoration: "underline" }}>Return to Site</Link>
        </div>
      </header>

      <main className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "2rem", color: "var(--ink-700)" }}>Monthly Practice KPIs</h2>
            <p className="muted-text">Data synced from your PMS and Ekwa Marketing Audit.</p>
          </div>
          <div>
            <select style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "white" }}>
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
            </select>
          </div>
        </div>

        {/* Mock KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div className="card" style={{ borderTop: "4px solid var(--accent)" }}>
            <span className="eyebrow">New Client Acquisition</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>142</h3>
            <span style={{ color: "green", fontSize: "0.85rem", fontWeight: "600" }}>+12% vs last month</span>
          </div>
          <div className="card" style={{ borderTop: "4px solid var(--ink-700)" }}>
            <span className="eyebrow">DVM Production (Avg)</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>$84k</h3>
            <span style={{ color: "green", fontSize: "0.85rem", fontWeight: "600" }}>+4.2% vs last month</span>
          </div>
          <div className="card" style={{ borderTop: "4px solid var(--ink-500)" }}>
            <span className="eyebrow">Client Retention Rate</span>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>89.5%</h3>
            <span style={{ color: "red", fontSize: "0.85rem", fontWeight: "600" }}>-1.1% vs last month</span>
          </div>
        </div>

        {/* Mock Data Visualizations */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          <div className="card">
             <h3>Local Visibility Traffic (SEO)</h3>
             <div style={{ height: "300px", backgroundColor: "var(--background-muted)", marginTop: "1rem", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border)" }}>
               <p className="muted-text">Chart.js or Recharts Line Graph mounts here</p>
             </div>
          </div>
          <div className="card">
             <h3>Coaching Action Items</h3>
             <ul className="check-list" style={{ marginTop: "1.5rem" }}>
               <li style={{ textDecoration: "line-through", color: "var(--ink-400)" }}>Review Associate Bonus Tier</li>
               <li>Update front-desk phone script</li>
               <li>Finalize Q2 Marketing Budget</li>
               <li>Launch local Facebook campaign</li>
             </ul>
             <button className="button button-secondary" style={{ width: "100%", marginTop: "2rem" }}>
               Schedule Next 1-on-1 Call
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}
