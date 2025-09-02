export default function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="aspect-[2/3] bg-slate-100" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-4/5 rounded bg-slate-100" />
        <div className="h-3 w-2/5 rounded bg-slate-100" />
      </div>
    </div>
  );
}
