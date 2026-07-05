import "./Pagination.css";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <nav className="pagination" aria-label="Hotel results pages">
      <button
        type="button"
        className="pagination__nav"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      <ul className="pagination__list">
        {pages.map((entry, index) =>
          entry === "…" ? (
            <li key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                className={`pagination__page ${entry === page ? "is-active" : ""}`}
                aria-current={entry === page ? "page" : undefined}
                onClick={() => onChange(entry)}
              >
                {entry}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className="pagination__nav"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </nav>
  );
}

function getVisiblePages(current, total) {
  const delta = 1;
  const range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  if (range[0] > 1) {
    range.unshift(1);
    if (range[1] !== 2) range.splice(1, 0, "…");
  }
  if (range[range.length - 1] < total) {
    if (range[range.length - 1] !== total - 1) range.push("…");
    range.push(total);
  }
  return range;
}
