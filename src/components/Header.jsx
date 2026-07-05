import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="Hotel Explorer, back to search">
          <svg
            className="brand__mark"
            viewBox="0 0 64 64"
            width="30"
            height="30"
            aria-hidden="true"
          >
            <path
              d="M8 28 L34 8 L58 32 L34 56 Z"
              fill="var(--brass)"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="24" r="5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
          </svg>
          <span className="brand__word">
            Hotel <em>Explorer</em>
          </span>
        </Link>
        <p className="site-header__tagline">500 stays, 12 Indian cities, one search</p>
      </div>
    </header>
  );
}
