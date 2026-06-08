"use client";

export default function TranscriptClips() {
  const clips = [
    { 
      time: "05:12", 
      title: "The Hidden Cost of Turnover", 
      quote: "Replacing an associate doesn't just cost recruitment fees, it costs six months of fractional production. You have to measure the momentum you lose, not just the check you write to the recruiter." 
    },
    { 
      time: "18:45", 
      title: "Why Production-Only Fails", 
      quote: "If you only pay for production, you are actively incentivizing speed over medicine. Over time, that destroys the collaborative culture your hospital needs to survive." 
    },
    { 
      time: "32:10", 
      title: "The Culture Pivot", 
      quote: "Culture is not pizza on Fridays. Culture is exactly how the practice owner handles the worst client interaction in front of the newest technician." 
    }
  ];

  const handlePlayClip = (time) => {
    alert(`In a production environment, this will jump the audio player directly to ${time}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
       {clips.map(clip => (
         <div key={clip.time} style={{ padding: "1.25rem", borderLeft: "4px solid var(--accent)", backgroundColor: "var(--background-muted)", borderRadius: "0 8px 8px 0" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
             <button 
               onClick={() => handlePlayClip(clip.time)}
               style={{ 
                 backgroundColor: "var(--accent)", 
                 color: "white", 
                 border: "none", 
                 padding: "0.35rem 0.6rem", 
                 borderRadius: "4px", 
                 fontSize: "0.8rem", 
                 fontWeight: "bold", 
                 cursor: "pointer",
                 display: "flex",
                 alignItems: "center",
                 gap: "0.25rem"
               }}
             >
               ▶ {clip.time}
             </button>
             <strong style={{ color: "var(--ink-700)", fontSize: "1rem" }}>{clip.title}</strong>
           </div>
           <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ink-600)", fontStyle: "italic", lineHeight: "1.5" }}>
             "{clip.quote}"
           </p>
         </div>
       ))}
    </div>
  );
}
