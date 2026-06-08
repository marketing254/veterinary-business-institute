import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      <LoadingSkeleton variant="hero" />
      <div className="section">
        <LoadingSkeleton variant="grid" items={2} />
      </div>
      <div className="section section-muted">
        <LoadingSkeleton variant="grid" items={3} />
      </div>
    </div>
  );
}
