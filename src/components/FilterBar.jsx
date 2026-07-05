import { SORT_OPTIONS } from "../utils/constants";
import "./FilterBar.css";

export default function FilterBar({ filters, onSortChange, onClearFilter, resultCount }) {
  const chips = [];
  if (filters.location) chips.push({ key: "location", label: `City: ${filters.location}` });
  if (filters.search) chips.push({ key: "search", label: `“${filters.search}”` });
  if (filters.minPrice) chips.push({ key: "minPrice", label: `Min ₹${filters.minPrice}` });
  if (filters.maxPrice) chips.push({ key: "maxPrice", label: `Max ₹${filters.maxPrice}` });
  if (filters.minRating) chips.push({ key: "minRating", label: `${filters.minRating}★ and up` });

  return (
    <div className="filter-bar">
      <div className="filter-bar__chips" aria-live="polite">
        {chips.length === 0 ? (
          <span className="filter-bar__hint">Showing every stay we have</span>
        ) : (
          chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className="chip"
              onClick={() => onClearFilter(chip.key)}
              aria-label={`Remove filter: ${chip.label}`}
            >
              {chip.label}
              <span aria-hidden="true"> ×</span>
            </button>
          ))
        )}
      </div>

      <label className="filter-bar__sort">
        <span className="visually-hidden">Sort hotels by</span>
        <select
          value={filters.orderBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
