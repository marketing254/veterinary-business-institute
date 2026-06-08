"use client";

import { useState } from "react";
import SolarIcon from "./SolarIcon";

const usd = (n, d = 0) =>
  isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: d, minimumFractionDigits: d })
    : "—";
const num = (n, d = 0) => (isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d }) : "—");

function fmt(r) {
  if (r.kind === "currency") return usd(r.value, r.decimals || 0);
  if (r.kind === "percent") return `${num(r.value, r.decimals ?? 0)}%`;
  return `${num(r.value, r.decimals ?? 0)}${r.suffix || ""}`;
}

const CALCULATORS = [
  {
    id: "valuation",
    icon: "barChart",
    category: "Financial Health",
    title: "Practice Valuation Calculator",
    blurb: "Estimate your practice's market value from revenue, profitability, and a typical sale multiple.",
    fields: [
      { key: "revenue", label: "Annual revenue", prefix: "$", def: 1200000, step: 50000 },
      { key: "margin", label: "EBITDA margin", suffix: "%", def: 18, step: 1 },
      { key: "multiple", label: "Valuation multiple", suffix: "×", def: 5.5, step: 0.1 },
    ],
    compute: (v) => {
      const ebitda = v.revenue * (v.margin / 100);
      return [
        { label: "Estimated EBITDA", value: ebitda, kind: "currency" },
        { label: "Estimated practice value", value: ebitda * v.multiple, kind: "currency", primary: true },
      ];
    },
    note: "Multiples vary by size, growth, and buyer. Use 4–7× EBITDA as a common independent-practice range.",
  },
  {
    id: "turnover",
    icon: "users",
    category: "Team & Culture",
    title: "Turnover Cost Estimator",
    blurb: "See the real annual cost of staff turnover to justify investing in retention and culture.",
    fields: [
      { key: "departures", label: "Team members lost / year", def: 3, step: 1 },
      { key: "salary", label: "Avg. annual salary", prefix: "$", def: 75000, step: 5000 },
      { key: "factor", label: "Replacement cost", suffix: "%", def: 75, step: 5 },
    ],
    compute: (v) => {
      const per = v.salary * (v.factor / 100);
      return [
        { label: "Cost per departure", value: per, kind: "currency" },
        { label: "Annual turnover cost", value: per * v.departures, kind: "currency", primary: true },
      ];
    },
    note: "Replacement cost (recruiting, onboarding, lost productivity) typically runs 50–150% of salary.",
  },
  {
    id: "clv",
    icon: "trending-up",
    category: "Marketing & Growth",
    title: "Client Lifetime Value (CLV)",
    blurb: "Calculate what an average client is worth over the life of the relationship.",
    fields: [
      { key: "spend", label: "Avg. transaction", prefix: "$", def: 280, step: 10 },
      { key: "visits", label: "Visits / year", def: 2.5, step: 0.5 },
      { key: "years", label: "Avg. retention (years)", def: 7, step: 1 },
    ],
    compute: (v) => [
      { label: "Annual client value", value: v.spend * v.visits, kind: "currency" },
      { label: "Lifetime value (CLV)", value: v.spend * v.visits * v.years, kind: "currency", primary: true },
    ],
    note: "Compare CLV against your acquisition cost — a healthy ratio is roughly 3:1 or higher.",
  },
  {
    id: "cac",
    icon: "target",
    category: "Marketing & Growth",
    title: "New-Client Acquisition Cost",
    blurb: "Find out what you actually pay to win each new client from your marketing.",
    fields: [
      { key: "monthly", label: "Monthly marketing spend", prefix: "$", def: 4000, step: 250 },
      { key: "clients", label: "New clients / month", def: 35, step: 1 },
    ],
    compute: (v) => [
      { label: "Cost per new client (CAC)", value: v.clients ? v.monthly / v.clients : NaN, kind: "currency", primary: true },
      { label: "New clients / year", value: v.clients * 12, kind: "number" },
    ],
    note: "Pair this with CLV — if CLV is well above CAC, you can afford to invest more in growth.",
  },
  {
    id: "roi",
    icon: "megaphone",
    category: "Marketing & Growth",
    title: "Marketing ROI Forecaster",
    blurb: "Measure the return on your marketing investment from attributed revenue.",
    fields: [
      { key: "spend", label: "Marketing spend", prefix: "$", def: 48000, step: 1000 },
      { key: "revenue", label: "Revenue attributed", prefix: "$", def: 180000, step: 5000 },
    ],
    compute: (v) => [
      { label: "Net return", value: v.revenue - v.spend, kind: "currency" },
      { label: "Marketing ROI", value: v.spend ? ((v.revenue - v.spend) / v.spend) * 100 : NaN, kind: "percent", primary: true },
    ],
    note: "A 300% ROI means every $1 spent returned $4 in revenue.",
  },
  {
    id: "wellness",
    icon: "checkCircle",
    category: "Financial Health",
    title: "Wellness Plan Pricing",
    blurb: "Price a recurring wellness membership from its bundled annual service value.",
    fields: [
      { key: "value", label: "Annual service value", prefix: "$", def: 900, step: 25 },
      { key: "discount", label: "Member discount", suffix: "%", def: 15, step: 1 },
    ],
    compute: (v) => {
      const annual = v.value * (1 - v.discount / 100);
      return [
        { label: "Annual plan price", value: annual, kind: "currency" },
        { label: "Monthly price", value: annual / 12, kind: "currency", decimals: 2, primary: true },
      ];
    },
    note: "Wellness plans smooth cash flow and lift visit frequency and compliance.",
  },
  {
    id: "noshow",
    icon: "calendar",
    category: "Operations",
    title: "No-Show Revenue Loss",
    blurb: "Quantify the annual revenue your practice loses to missed appointments.",
    fields: [
      { key: "noshows", label: "No-shows / week", def: 8, step: 1 },
      { key: "value", label: "Avg. appointment value", prefix: "$", def: 180, step: 10 },
    ],
    compute: (v) => [
      { label: "Weekly lost revenue", value: v.noshows * v.value, kind: "currency" },
      { label: "Annual lost revenue", value: v.noshows * v.value * 52, kind: "currency", primary: true },
    ],
    note: "Reminders, deposits, and waitlists can recover much of this lost capacity.",
  },
  {
    id: "newhire",
    icon: "graduationCap",
    category: "Financial Health",
    title: "New Hire ROI & Payback",
    blurb: "Test whether adding a DVM or technician pays for itself — and how fast.",
    fields: [
      { key: "cost", label: "Fully-loaded annual cost", prefix: "$", def: 130000, step: 5000 },
      { key: "added", label: "Added revenue / month", prefix: "$", def: 18000, step: 1000 },
    ],
    compute: (v) => {
      const annualAdded = v.added * 12;
      return [
        { label: "Net annual impact", value: annualAdded - v.cost, kind: "currency" },
        { label: "Payback period", value: v.added ? v.cost / v.added : NaN, kind: "number", decimals: 1, suffix: " months", primary: true },
      ];
    },
    note: "Include salary, benefits, and onboarding in the loaded cost for an honest payback.",
  },
];

function CalculatorCard({ calc }) {
  const [vals, setVals] = useState(() =>
    Object.fromEntries(calc.fields.map((f) => [f.key, f.def]))
  );

  function update(key, raw) {
    const n = raw === "" ? 0 : Number(raw);
    setVals((p) => ({ ...p, [key]: Number.isNaN(n) ? 0 : n }));
  }

  const results = calc.compute(vals);

  return (
    <article className="calc-card">
      <div className="calc-card-head">
        <span className="calc-card-icon">
          <SolarIcon name={calc.icon} size={22} />
        </span>
        <div>
          <span className="calc-card-cat">{calc.category}</span>
          <h3>{calc.title}</h3>
        </div>
      </div>
      <p className="calc-card-blurb">{calc.blurb}</p>

      <div className="calc-fields">
        {calc.fields.map((f) => (
          <label className="calc-field" key={f.key}>
            <span className="calc-field-label">{f.label}</span>
            <span className="calc-input-wrap">
              {f.prefix && <span className="calc-affix">{f.prefix}</span>}
              <input
                type="number"
                inputMode="decimal"
                step={f.step}
                min="0"
                value={vals[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                aria-label={f.label}
              />
              {f.suffix && <span className="calc-affix calc-affix-suffix">{f.suffix}</span>}
            </span>
          </label>
        ))}
      </div>

      <div className="calc-results">
        {results.map((r) => (
          <div className={`calc-result${r.primary ? " calc-result-primary" : ""}`} key={r.label}>
            <span className="calc-result-label">{r.label}</span>
            <span className="calc-result-value">{fmt(r)}</span>
          </div>
        ))}
      </div>

      <p className="calc-note">{calc.note}</p>
    </article>
  );
}

export default function VetCalculators() {
  return (
    <div className="calc-grid">
      {CALCULATORS.map((c) => (
        <CalculatorCard calc={c} key={c.id} />
      ))}
    </div>
  );
}
