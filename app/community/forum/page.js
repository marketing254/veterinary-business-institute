import Link from "next/link";

export const metadata = {
  title: "Community Forum | Veterinary Business Institute",
  description: "Join the discussion on practice growth, DVM retention, and marketing strategies.",
};

const forumCategories = [
  {
    name: "Practice Operations & HR",
    description: "Discussions on associate compensation, front-desk SOPs, and scheduling.",
    threads: 142,
    latestReply: "2 hrs ago"
  },
  {
    name: "Marketing & Local SEO",
    description: "Questions and strategies for dominating your local zip code.",
    threads: 89,
    latestReply: "5 hrs ago"
  },
  {
    name: "Exit Strategies & Succession",
    description: "Preparing practices for sale, valuation calculations, and private equity.",
    threads: 34,
    latestReply: "1 day ago"
  }
];

const mockThreads = [
  {
    title: "How are you structuring production bonuses for new grads?",
    author: "Dr. Matthews",
    replies: 12,
    category: "Practice Operations"
  },
  {
    title: "Best PMS migration experience? Avoiding Cornerstone.",
    author: "VetAdmin_Sarah",
    replies: 45,
    category: "Technology Setup"
  },
  {
    title: "VBI Podcast Episode #44 - Takeaways on Culture",
    author: "VBI Team",
    replies: 8,
    category: "General Discussion"
  }
];

export default function ForumPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "2rem" }}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">VBI Community</span>
            <h1>
              Discussion <em>Board.</em>
            </h1>
            <p className="hero-lead">
              A private, vetted forum for veterinary owners and practice managers 
              to discuss operations, share SOPs, and solicit advice.
            </p>
            <div className="button-row" style={{ marginTop: "1.5rem" }}>
              <Link className="button button-primary" href="/community">
                Request Forum Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div className="forum-categories">
            <h2>Categories</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
               {forumCategories.map((cat) => (
                 <div key={cat.name} className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--accent)" }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                     <div>
                       <h3 style={{ fontSize: "1.1rem" }}>{cat.name}</h3>
                       <p className="muted-text" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{cat.description}</p>
                     </div>
                     <div style={{ textAlign: "right", fontSize: "0.85rem", color: "var(--ink-500)" }}>
                       <span style={{ display: "block", fontWeight: "600", color: "var(--ink-700)" }}>{cat.threads} Threads</span>
                       <span>Last reply {cat.latestReply}</span>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="forum-latest">
            <h2>Recent Active Threads</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
               {mockThreads.map((thread) => (
                 <div key={thread.title} style={{ padding: "1rem", backgroundColor: "var(--background-muted)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                   <Link href="#" style={{ textDecoration: "none", color: "var(--ink-700)" }}>
                     <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{thread.title}</h4>
                   </Link>
                   <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--ink-500)" }}>
                     <span>By {thread.author} in <em>{thread.category}</em></span>
                     <span style={{ fontWeight: "600", color: "var(--accent)" }}>{thread.replies} Replies</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
