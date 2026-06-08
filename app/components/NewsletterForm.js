"use client";

import { useMemo, useState } from "react";
import styles from "../community/page.module.css";
import { submitLead } from "../lib/submit-lead";

export default function NewsletterForm({
  email,
  title = "Subscribe to Our Newsletter",
  description = "Get recurring veterinary business breakdowns, podcast updates, and event notifications sent straight to your inbox.",
  buttonLabel = "Subscribe",
  dark = false,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("VBI Newsletter Subscription");
    const body = encodeURIComponent(
      `Please subscribe me to the VBI Newsletter.\nEmail: ${emailInput}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, emailInput]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const res = await submitLead("newsletter", { email: emailInput });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <div className={`${styles.formShell} ${dark ? styles.formShellDark : ""}`} style={{ maxWidth: "100%", margin: "0" }}>
       <div className={styles.formIntro}>
         <span className="eyebrow text-accent">Newsletter</span>
         <h3>{title}</h3>
         <p>{description}</p>
       </div>
       
       <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end", marginTop: "1.5rem" }}>
         <label className={styles.formField} style={{ flexGrow: 1, minWidth: "250px", marginBottom: 0 }}>
           <span style={{ marginBottom: "0.25rem" }}>Email Address</span>
           <input 
             type="email" 
             value={emailInput} 
             onChange={(e) => setEmailInput(e.target.value)} 
             required 
             placeholder="practice@example.com"
           />
         </label>
         <button className="button button-primary" type="submit" style={{ flexShrink: 0 }} disabled={status === "sending"}>
           {status === "sending" ? "Subscribing…" : buttonLabel}
         </button>
       </form>

       {status === "success" && (
         <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--teal-500)" }}>
           🎉 You&rsquo;re subscribed! Look out for veterinary business insights in your inbox.
         </p>
       )}
       {status === "error" && (
         <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#c0392b" }}>
           Something went wrong. Please <a href={mailtoHref}>email us to subscribe</a>.
         </p>
       )}
    </div>
  );
}
