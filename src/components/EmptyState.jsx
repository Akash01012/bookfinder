export default function EmptyState() {
  return (
    <div className="col-span-full">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
        </div>
        <div className="font-medium">No books found</div>
        <div className="text-sm text-slate-500">
          Try a different title, author, subject, or broaden the year range.
        </div>
      </div>
    </div>
  );
}
