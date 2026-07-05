import { useEffect, useState } from "react";
import { fetchHotels } from "../api/hotels";

/**
 * Loads a page of hotels for the given filters. Refetches whenever the
 * filters or page change.
 */
export function useHotels(filters, page, pageSize) {
  const [state, setState] = useState({
    hotels: [],
    total: 0,
    status: "idle", // idle | loading | success | error
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, status: "loading", error: null }));
      try {
        const { hotels, total } = await fetchHotels({
          ...filters,
          limit: pageSize,
          skip: (page - 1) * pageSize,
        });
        if (!cancelled) {
          setState({ hotels, total, status: "success", error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            hotels: [],
            total: 0,
            status: "error",
            error: error.message || "Something went wrong.",
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), page, pageSize]);

  return state;
}
