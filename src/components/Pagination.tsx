interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ITEM =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
const ARROW =
  "border border-neutral-300 hover:border-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300";

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${ITEM} ${ARROW}`}
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
          className={`${ITEM} ${p === page ? "bg-black text-white" : "hover:bg-surface"}`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={`${ITEM} ${ARROW}`}
      >
        →
      </button>
    </nav>
  );
}