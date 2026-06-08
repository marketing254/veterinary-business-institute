import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="section" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow text-accent">Webinar Archive Loading...</span>
        </div>
        <LoadingSkeleton variant="grid" items={6} />
      </div>
    </div>
  );
}
