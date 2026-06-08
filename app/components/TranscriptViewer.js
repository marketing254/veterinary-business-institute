"use client";

import { useState } from "react";

const transcriptData = {
  en: `[00:00:00] Host: Welcome to another episode of the Veterinary Business Institute podcast...

[00:01:23] Guest: I think the biggest issue practices run into is a lack of structured retention strategies. They hire fast and do not consider the onboarding friction...

[00:03:00] Host: Exactly, and when you look at the math behind turnover replacing a DVM costs a lot more than retaining one.

(Full transcript generated text continues here mapped via backend CRM or headless CMS)`,

  es: `[00:00:00] Presentador: Bienvenido a otro episodio del podcast de Veterinary Business Institute...

[00:01:23] Invitado: Creo que el mayor problema que enfrentan las clínicas es la falta de estrategias de retención estructuradas. Contratan rápido y no consideran la fricción de la incorporación...

[00:03:00] Presentador: Exactamente, y cuando miras las matemáticas detrás de la rotación, reemplazar a un veterinario cuesta mucho más que retenerlo.

(El texto generado de la transcripción completa continúa aquí...)`,

  fr: `[00:00:00] Animateur : Bienvenue dans un autre épisode du podcast du Veterinary Business Institute...

[00:01:23] Invité : Je pense que le plus gros problème que rencontrent les cliniques est le manque de stratégies de rétention structurées. Ils embauchent vite et ne considèrent pas la friction de l'intégration...

[00:03:00] Animateur : Exactement, et quand vous regardez les mathématiques derrière le roulement, remplacer un vétérinaire coûte beaucoup plus cher que d'en retenir un.

(Le texte généré de la transcription complète continue ici...)`,
};

export default function TranscriptViewer() {
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <div style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "8px", marginBottom: "1rem", backgroundColor: "white" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--ink-500)", display: "block" }}>
          Transcript Language:
        </label>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ 
            display: "block", 
            width: "100%", 
            marginTop: "0.5rem", 
            padding: "0.5rem", 
            borderRadius: "6px", 
            border: "1px solid var(--border)",
            backgroundColor: "var(--background-muted)"
          }}
        >
          <option value="en">English (Original)</option>
          <option value="es">Español (Auto-Translate)</option>
          <option value="fr">Français (Auto-Translate)</option>
        </select>
      </div>

      <div style={{ 
        maxHeight: "350px", 
        overflowY: "auto", 
        padding: "1.5rem", 
        backgroundColor: "var(--background-muted)", 
        borderRadius: "8px",
        border: "1px solid var(--border)"
      }}>
        <p style={{ 
          fontSize: "0.95rem", 
          lineHeight: "1.7", 
          color: "var(--ink-700)",
          whiteSpace: "pre-wrap"
        }}>
          {transcriptData[language]}
        </p>
      </div>
    </div>
  );
}
