import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="section section-muted" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="section-heading">
          <LoadingSkeleton variant="grid" items={3} />
        </div>
      </div>
    </div>
  );
}
