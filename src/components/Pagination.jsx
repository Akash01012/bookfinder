export default function Pagination({ page, setPage, totalPages }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => go(1)}
        disabled={!canPrev}
        className={`rounded-xl border px-3 py-1 text-sm ${
          !canPrev
            ? "bg-slate-100 text-slate-400 border-slate-200"
            : "bg-white border-slate-300 hover:bg-slate-50"
        }`}
      >
        « First
      </button>
      <button
        onClick={() => go(page - 1)}
        disabled={!canPrev}
        className={`rounded-xl border px-3 py-1 text-sm ${
          !canPrev
            ? "bg-slate-100 text-slate-400 border-slate-200"
            : "bg-white border-slate-300 hover:bg-slate-50"
        }`}
      >
        Prev
      </button>
      <span className="px-3 py-1 text-sm text-slate-600">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => go(page + 1)}
        disabled={!canNext}
        className={`rounded-xl border px-3 py-1 text-sm ${
          !canNext
            ? "bg-slate-100 text-slate-400 border-slate-200"
            : "bg-white border-slate-300 hover:bg-slate-50"
        }`}
      >
        Next
      </button>
      <button
        onClick={() => go(totalPages)}
        disabled={!canNext}
        className={`rounded-xl border px-3 py-1 text-sm ${
          !canNext
            ? "bg-slate-100 text-slate-400 border-slate-200"
            : "bg-white border-slate-300 hover:bg-slate-50"
        }`}
      >
        Last »
      </button>
    </div>
  );
}
