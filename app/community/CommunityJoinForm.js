"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

const roleOptions = [
  "Practice Owner",
  "Hospital Manager",
  "Partner",
  "Associate Veterinarian",
  "Marketing Lead",
  "Client Experience Lead",
  "Consultant / Speaker",
  "Other",
];

const interestOptions = [
  "Leadership and Team Culture",
  "Operations and Staffing",
  "Marketing and Visibility",
  "Technology and Client Experience",
  "Event Panels and Replays",
  "Podcast and Ongoing Updates",
  "General Community Access",
];

export default function CommunityJoinForm({
  email,
  title,
  description,
  buttonLabel,
  note,
  dark = false,
}) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    interest: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("VBI Community Hub Access Request");
    const body = encodeURIComponent(
      [
        "VBI Community Hub request",
        "",
        `First name: ${formState.firstName}`,
        `Last name: ${formState.lastName}`,
        `Email: ${formState.email}`,
        `Role: ${formState.role}`,
        `Primary interest: ${formState.interest}`,
      ].join("\n")
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, formState.email, formState.firstName, formState.interest, formState.lastName, formState.role]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    trackEvent("form_submit", { form_name: "community_join" });
    const res = await submitLead("community_join", { ...formState });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <article className={`${styles.formShell} ${dark ? styles.formShellDark : ""}`}>
      <div className={styles.formIntro}>
        <span className="eyebrow text-accent">Join the Hub</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <form className={styles.joinForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <label className={styles.formField}>
            <span>First Name</span>
            <input
              name="firstName"
              type="text"
              value={formState.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.formField}>
            <span>Last Name</span>
            <input
              name="lastName"
              type="text"
              value={formState.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label className={`${styles.formField} ${styles.formFieldFull}`}>
            <span>Email Address</span>
            <input
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.formField}>
            <span>Your Role</span>
            <select name="role" value={formState.role} onChange={handleChange} required>
              <option value="">Select</option>
              {roleOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.formField}>
            <span>Primary Interest</span>
            <select name="interest" value={formState.interest} onChange={handleChange} required>
              <option value="">Select</option>
              {interestOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className={`button button-primary ${styles.formButton}`}
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Joining…" : buttonLabel}
        </button>
      </form>

      <p className={styles.formNote}>{note}</p>
      {status === "success" ? (
        <div className={styles.formSuccess}>
          🎉 Welcome to the community! Check your inbox — we&rsquo;ll be in touch with your
          access details shortly.
        </div>
      ) : null}
      {status === "error" ? (
        <div className={styles.formSuccess}>
          Something went wrong sending your request. Please{" "}
          <a href={mailtoHref}>email it to us directly</a> and we&rsquo;ll get you set up.
        </div>
      ) : null}
    </article>
  );
}
