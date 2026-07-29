import { REPLAY_KINDS } from "../../lib/replays-kinds";
import { getReplays } from "../../lib/replays-data";
import { fetchKeyNotes, fetchTranscriptText } from "../../lib/podcast-data";
import { fetchVimeoThumbnail } from "../../lib/video-meta";
import ReplayArticle from "../../components/ReplayArticle";
import { OG_IMAGE } from "../../lib/seo";

const KIND = "summit";
const cfg = REPLAY_KINDS[KIND];

export async function generateStaticParams() {
  const replays = await getReplays(KIND);
  return replays.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const replays = await getReplays(KIND);
  const r = replays.find((x) => x.slug === slug);
  if (!r) return { title: `${cfg.single} | Veterinary Business Institute` };
  const canonical = `${cfg.basePath}/${r.slug}`;
  const description = r.summary || r.subtitle || r.title;
  return {
    title: `${r.title} | ${cfg.single} | Veterinary Business Institute`,
    description,
    alternates: { canonical },
    openGraph: { title: r.title, description, type: "video.other", url: canonical, images: [r.image || OG_IMAGE] },
    twitter: { card: "summary_large_image", title: r.title, description, images: [r.image || OG_IMAGE] },
  };
}

export default async function SummitReplayPage({ params }) {
  const { slug } = await params;
  const replays = await getReplays(KIND);
  const idx = replays.findIndex((x) => x.slug === slug);
  const r = idx >= 0 ? replays[idx] : replays[0];
  const newer = idx > 0 ? replays[idx - 1] : null;
  const older = idx >= 0 && idx < replays.length - 1 ? replays[idx + 1] : null;

  // Bake the Google-Doc description + full transcript into the HTML (no flash;
  // crawlable + citable by AI). Both fall back to the live client fetch if empty.
  const [initialNotes, initialTranscript, videoThumb] = await Promise.all([
    r?.description ? fetchKeyNotes(r.description) : Promise.resolve(null),
    r?.transcript ? fetchTranscriptText(r.transcript) : Promise.resolve(""),
    r?.href ? fetchVimeoThumbnail(r.href) : Promise.resolve(""),
  ]);

  return (
    <ReplayArticle
      replay={r}
      newer={newer}
      older={older}
      kind={cfg}
      initialNotes={initialNotes}
      initialTranscript={initialTranscript}
      videoThumb={videoThumb}
    />
  );
}
