import { Link } from "react-router-dom";
import { formatPrice, formatRating } from "../utils/formatters";
import "./HotelCard.css";

export default function HotelCard({ hotel }) {
  const rating = formatRating(hotel.rating);
  const ratingTier = getRatingTier(hotel.rating);

  return (
    <Link to={`/hotel/${hotel.id}`} className="tag-card">
      <span className="tag-card__string" aria-hidden="true" />
      <div className="tag-card__photo-wrap">
        <img
          src={hotel.thumbnail}
          alt={`${hotel.name} in ${hotel.location}`}
          loading="lazy"
          className="tag-card__photo"
        />
        <span className={`tag-card__stamp tag-card__stamp--${ratingTier}`}>
          <span className="tag-card__stamp-rating">{rating}</span>
          <span className="tag-card__stamp-star" aria-hidden="true">★</span>
        </span>
      </div>

      <span className="tag-card__perforation" aria-hidden="true" />

      <div className="tag-card__details">
        <h3 className="tag-card__name">{hotel.name}</h3>
        <p className="tag-card__location">{hotel.location}</p>
        <div className="tag-card__foot">
          <p className="tag-card__price">
            {formatPrice(hotel.price)}
            <span className="tag-card__price-unit"> / night</span>
          </p>
          <span className="tag-card__cta">View stay →</span>
        </div>
      </div>
    </Link>
  );
}

function getRatingTier(rating) {
  const value = typeof rating === "string" ? parseFloat(rating) : rating;
  if (value >= 4.3) return "excellent";
  if (value >= 3.5) return "good";
  return "fair";
}
