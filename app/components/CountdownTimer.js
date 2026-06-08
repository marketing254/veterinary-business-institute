"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

export default function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getTimeLeft(targetDate));
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!time) {
    return (
      <div className="countdown-row">
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div key={label} className="countdown-cell">
            <span className="countdown-value">--</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (time.expired) {
    return (
      <div className="countdown-row">
        <div className="countdown-cell" style={{ gridColumn: "1 / -1" }}>
          <span className="countdown-value" style={{ fontSize: "1.1rem", letterSpacing: "0.04em" }}>
            Event Has Started
          </span>
        </div>
      </div>
    );
  }

  const cells = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.mins, label: "Mins" },
    { value: time.secs, label: "Secs" },
  ];

  return (
    <div className="countdown-row">
      {cells.map(({ value, label }) => (
        <div key={label} className="countdown-cell">
          <span className="countdown-value">
            {String(value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
