import { getMergedEpisodes, fetchKeyNotes } from "../../lib/podcast-data";
import { podcastSlug } from "../../lib/sheets-core";
import EpisodeArticle from "../../components/EpisodeArticle";

export async function generateStaticParams() {
  const eps = await getMergedEpisodes();
  return eps.map((ep) => ({ slug: podcastSlug(ep) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const eps = await getMergedEpisodes();
  const ep = eps.find((e) => podcastSlug(e) === slug);
  if (!ep) return { title: "Episode | Veterinary Business Podcast" };
  const canonical = `/podcast/${podcastSlug(ep)}`;
  return {
    title: `Ep ${ep.number}: ${ep.title} | Veterinary Business Podcast`,
    description: ep.summary,
    alternates: { canonical },
    openGraph: {
      title: `Ep ${ep.number}: ${ep.title}`,
      description: ep.summary,
      images: ep.image ? [ep.image] : undefined,
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `Ep ${ep.number}: ${ep.title}`,
      description: ep.summary,
      images: ep.image ? [ep.image] : undefined,
    },
  };
}

export default async function PodcastEpisodePage({ params }) {
  const { slug } = await params;
  const eps = await getMergedEpisodes();
  const idx = eps.findIndex((e) => podcastSlug(e) === slug);
  const ep = idx >= 0 ? eps[idx] : eps[0];
  const newer = idx > 0 ? eps[idx - 1] : null;
  const older = idx >= 0 && idx < eps.length - 1 ? eps[idx + 1] : null;

  // Bake the key notes into the HTML so there's no flash of the short summary.
  const initialNotes = ep?.keyNotesUrl ? await fetchKeyNotes(ep.keyNotesUrl) : null;

  return <EpisodeArticle ep={ep} newer={newer} older={older} initialNotes={initialNotes} />;
}
