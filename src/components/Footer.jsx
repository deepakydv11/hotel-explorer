import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>Hotel Explorer &mdash; a demo booking search built on the Hotel Search API.</p>
        <p className="site-footer__muted">Prices shown are per night, in INR. Availability is illustrative.</p>
      </div>
    </footer>
  );
}
