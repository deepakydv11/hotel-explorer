import { CITIES, PRICE_MIN, PRICE_MAX } from "../utils/constants";
import "./SearchTicket.css";

const RATINGS = [0, 3, 3.5, 4, 4.5];

export default function SearchTicket({ draft, onChange, onSubmit, onReset, resultCount, status }) {
  function handleField(field) {
    return (event) => {
      const { value } = event.target;
      onChange({ ...draft, [field]: value });
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="ticket" onSubmit={handleSubmit} aria-label="Search hotels">
      <div className="ticket__stub">
        <p className="ticket__eyebrow">Destination</p>
        <select
          className="ticket__select ticket__select--big"
          value={draft.location}
          onChange={handleField("location")}
          aria-label="Destination city"
        >
          <option value="">All cities</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <p className="ticket__code">{(draft.location || "ANY").slice(0, 3).toUpperCase()}</p>
      </div>

      <div className="ticket__perforation" aria-hidden="true">
        <span className="ticket__hole" />
      </div>

      <div className="ticket__body">
        <label className="ticket__field ticket__field--grow">
          <span className="ticket__eyebrow">Hotel or area name</span>
          <input
            type="search"
            className="ticket__input"
            placeholder="e.g. Regal Crescent, Koramangala…"
            value={draft.search}
            onChange={handleField("search")}
          />
        </label>

        <label className="ticket__field">
          <span className="ticket__eyebrow">Min budget / night</span>
          <input
            type="number"
            className="ticket__input"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            placeholder={String(PRICE_MIN)}
            value={draft.minPrice}
            onChange={handleField("minPrice")}
          />
        </label>

        <label className="ticket__field">
          <span className="ticket__eyebrow">Max budget / night</span>
          <input
            type="number"
            className="ticket__input"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={100}
            placeholder={String(PRICE_MAX)}
            value={draft.maxPrice}
            onChange={handleField("maxPrice")}
          />
        </label>

        <label className="ticket__field">
          <span className="ticket__eyebrow">Min rating</span>
          <select
            className="ticket__select"
            value={draft.minRating}
            onChange={handleField("minRating")}
          >
            <option value="">Any</option>
            {RATINGS.filter(Boolean).map((r) => (
              <option key={r} value={r}>
                {r.toFixed(1)}+
              </option>
            ))}
          </select>
        </label>

        <div className="ticket__actions">
          <button type="submit" className="btn btn--primary">
            Search stays
          </button>
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      <p className="ticket__result-line" role="status">
        {status === "loading"
          ? "Searching…"
          : status === "error"
            ? "Couldn't reach the hotel search API."
            : `${resultCount.toLocaleString("en-IN")} stay${resultCount === 1 ? "" : "s"} match your search`}
      </p>
    </form>
  );
}
