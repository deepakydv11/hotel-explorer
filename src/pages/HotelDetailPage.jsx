import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchHotelById, fetchHotels } from "../api/hotels";
import { formatPrice, formatRating } from "../utils/formatters";
import "./HotelDetailPage.css";

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setActivePhoto(0);

    async function load() {
      try {
        const direct = await fetchHotelById(id);
        if (!cancelled && direct && (direct.id || direct.name)) {
          setHotel(direct);
          setStatus("success");
          return;
        }
        throw new Error("Not found via direct lookup");
      } catch {
        // Fallback: some deployments of this API don't support /hotels/<id>/,
        // so we search the full list client-side as a safety net.
        try {
          const { hotels } = await fetchHotels({ limit: 500 });
          const match = hotels.find((h) => String(h.id) === String(id));
          if (!cancelled) {
            if (match) {
              setHotel(match);
              setStatus("success");
            } else {
              setStatus("not-found");
            }
          }
        } catch {
          if (!cancelled) setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container detail-state">
        <p>Loading hotel details…</p>
      </div>
    );
  }

  if (status === "not-found" || status === "error") {
    return (
      <div className="container detail-state">
        <h2>We lost this stay's paperwork</h2>
        <p>The hotel you're looking for couldn't be found.</p>
        <Link to="/" className="btn btn--primary">
          ← Back to search
        </Link>
      </div>
    );
  }

  const photos = hotel.photos?.length ? hotel.photos : [hotel.thumbnail];

  return (
    <div className="container detail">
      <Link to="/" className="detail__back">
        ← Back to search
      </Link>

      <div className="detail__layout">
        <div className="detail__gallery">
          <img
            className="detail__hero-photo"
            src={photos[activePhoto]}
            alt={`${hotel.name} view ${activePhoto + 1}`}
          />
          {photos.length > 1 && (
            <div className="detail__thumbs">
              {photos.slice(0, 8).map((photo, index) => (
                <button
                  key={photo + index}
                  type="button"
                  className={`detail__thumb ${index === activePhoto ? "is-active" : ""}`}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                >
                  <img src={photo} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="detail__stub">
          <p className="detail__stub-eyebrow">Stay summary</p>
          <h1 className="detail__name">{hotel.name}</h1>
          <p className="detail__location">📍 {hotel.location}</p>

          <div className="detail__rating">
            <span className="detail__rating-badge">{formatRating(hotel.rating)} ★</span>
            <span className="detail__rating-label">Guest rating</span>
          </div>

          <div className="detail__price-block">
            <p className="detail__price">{formatPrice(hotel.price)}</p>
            <p className="detail__price-unit">per night</p>
          </div>

          <button type="button" className="btn btn--primary detail__cta">
            Reserve this stay
          </button>
          <p className="detail__cta-note">Demo project &mdash; no live booking is made.</p>
        </aside>
      </div>

      <section className="detail__about">
        <h2>About this hotel</h2>
        <p>{hotel.description}</p>
      </section>
    </div>
  );
}
