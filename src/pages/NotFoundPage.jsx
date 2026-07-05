import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: "4.5rem 0", textAlign: "center" }}>
      <h1 style={{ marginBottom: "0.75rem" }}>Page not found</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: "1.5rem" }}>
        This page took a wrong turn somewhere.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to search
      </Link>
    </div>
  );
}
