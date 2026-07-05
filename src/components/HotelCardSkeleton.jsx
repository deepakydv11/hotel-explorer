import "./HotelCardSkeleton.css";

export default function HotelCardSkeleton() {
  return (
    <div className="tag-skeleton">
      <div className="tag-skeleton__photo" />
      <div className="tag-skeleton__line tag-skeleton__line--title" />
      <div className="tag-skeleton__line tag-skeleton__line--short" />
      <div className="tag-skeleton__line tag-skeleton__line--price" />
    </div>
  );
}
