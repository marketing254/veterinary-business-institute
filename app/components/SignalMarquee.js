function MarqueeRow({ items, reverse = false }) {
  const doubledItems = [...items, ...items];

  return (
    <div className="signal-marquee-track">
      <div className={`signal-marquee-row ${reverse ? "is-reverse" : ""}`}>
        {doubledItems.map((item, index) => (
          <article className="signal-card" key={`${item.title}-${index}`}>
            <span className="signal-label">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SignalMarquee({ heading, rows }) {
  return (
    <section className="section section-marquee">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <span className="eyebrow text-accent">Platform Signals</span>
          <h2>{heading}</h2>
        </div>
      </div>

      <div className="marquee-stack">
        {rows.map((row, index) => (
          <MarqueeRow items={row} reverse={index % 2 === 1} key={index} />
        ))}
      </div>
    </section>
  );
}
