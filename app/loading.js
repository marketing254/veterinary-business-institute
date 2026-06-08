import LoadingSkeleton from "./components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="section-heading">
        <div style={{ width: '120px', height: '14px', borderRadius: '4px', backgroundColor: 'rgba(63, 123, 79, 0.05)', marginBottom: '16px' }} />
        <div style={{ width: '60%', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(63, 123, 79, 0.05)', marginBottom: '40px' }} />
      </div>
      <LoadingSkeleton variant="grid" items={3} />
    </div>
  );
}

