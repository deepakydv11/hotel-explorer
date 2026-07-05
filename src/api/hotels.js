const BASE_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

/**
 * Builds a query string from a filters object, skipping empty values.
 */
function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  const asString = query.toString();
  return asString ? `?${asString}` : "";
}

/**
 * Fetches hotels from the Hotel Search API with optional filtering,
 * sorting, and pagination.
 *
 * @param {Object} options
 * @param {string} [options.location] - city/location, matched with icontains
 * @param {number} [options.minPrice]
 * @param {number} [options.maxPrice]
 * @param {number} [options.minRating]
 * @param {number} [options.maxRating]
 * @param {string} [options.search] - free-text search across name & location
 * @param {string} [options.orderBy] - e.g. "-rating", "price"
 * @param {number} [options.limit]
 * @param {number} [options.skip]
 */
export async function fetchHotels({
  location,
  minPrice,
  maxPrice,
  minRating,
  maxRating,
  search,
  orderBy,
  limit,
  skip,
} = {}) {
  const qs = buildQuery({
    location,
    min_price: minPrice,
    max_price: maxPrice,
    min_rating: minRating,
    max_rating: maxRating,
    search,
    order_by: orderBy,
    limit,
    skip,
  });

  const response = await fetch(`${BASE_URL}${qs}`);

  if (!response.ok) {
    throw new Error(`Hotel search failed with status ${response.status}`);
  }

  const payload = await response.json();

  return {
    hotels: payload.data ?? [],
    total: payload.count ?? 0,
    returned: payload.returned ?? payload.data?.length ?? 0,
  };
}

/**
 * Fetches a single hotel by id.
 */
export async function fetchHotelById(id) {
  const response = await fetch(`${BASE_URL}${id}/`);

  if (!response.ok) {
    throw new Error(`Hotel ${id} could not be found`);
  }

  const payload = await response.json();
  // The API returns either the object directly or wrapped in `data`.
  return payload.data ?? payload;
}
