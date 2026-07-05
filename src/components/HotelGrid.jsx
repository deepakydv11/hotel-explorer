import HotelCard from "./HotelCard.jsx";
import HotelCardSkeleton from "./HotelCardSkeleton.jsx";
import "./HotelGrid.css";

export default function HotelGrid({ hotels, status, error, onRetry }) {
  if (status === "loading") {
    return (
      <div className="hotel-grid" aria-busy="true" aria-label="Loading hotels">
        {Array.from({ length: 8 }).map((_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="state-panel state-panel--error">
        <h3>The search desk is unreachable</h3>
        <p>{error || "We couldn't load hotels right now."}</p>
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="state-panel">
        <h3>No stays match those details</h3>
        <p>Try widening your budget, clearing the rating filter, or picking a different city.</p>
      </div>
    );
  }

  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
