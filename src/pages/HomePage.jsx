import { useMemo, useState } from "react";
import SearchTicket from "../components/SearchTicket.jsx";
import FilterBar from "../components/FilterBar.jsx";
import HotelGrid from "../components/HotelGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { useHotels } from "../hooks/useHotels.js";
import { DEFAULT_FILTERS, PAGE_SIZE } from "../utils/constants";
import "./HomePage.css";

export default function HomePage() {
  const [draft, setDraft] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const apiFilters = useMemo(
    () => ({
      location: appliedFilters.location || undefined,
      search: appliedFilters.search || undefined,
      minPrice: appliedFilters.minPrice || undefined,
      maxPrice: appliedFilters.maxPrice || undefined,
      minRating: appliedFilters.minRating || undefined,
      orderBy: appliedFilters.orderBy || undefined,
    }),
    [appliedFilters],
  );

  const { hotels, total, status, error } = useHotels(apiFilters, page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function applySearch() {
    setAppliedFilters(draft);
    setPage(1);
  }

  function handleReset() {
    setDraft(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  function handleSortChange(orderBy) {
    const next = { ...appliedFilters, orderBy };
    setDraft(next);
    setAppliedFilters(next);
  }

  function handleClearFilter(key) {
    const clearedValue = key === "location" || key === "search" ? "" : undefined;
    const next = { ...appliedFilters, [key]: clearedValue };
    setDraft(next);
    setAppliedFilters(next);
    setPage(1);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Hotel Search API · live results</p>
          <h1 className="hero__title">
            Find your next stay,
            <br />
            filed and stamped.
          </h1>
          <p className="hero__subtitle">
            Search 500 hotels across India by city, budget, and rating &mdash; sorted the way you like.
          </p>
        </div>
      </section>

      <div className="container">
        <SearchTicket
          draft={draft}
          onChange={setDraft}
          onSubmit={applySearch}
          onReset={handleReset}
          resultCount={total}
          status={status}
        />

        <FilterBar
          filters={appliedFilters}
          onSortChange={handleSortChange}
          onClearFilter={handleClearFilter}
          resultCount={total}
        />

        <HotelGrid hotels={hotels} status={status} error={error} onRetry={applySearch} />

        <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  );
}
