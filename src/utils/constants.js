export const CITIES = [
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Goa",
  "Gurgaon",
  "Hyderabad",
  "Jaipur",
  "Kolkata",
  "Mumbai",
  "Noida",
  "Pune",
];

export const SORT_OPTIONS = [
  { value: "", label: "Recommended" },
  { value: "-rating", label: "Rating: high to low" },
  { value: "rating", label: "Rating: low to high" },
  { value: "price", label: "Price: low to high" },
  { value: "-price", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export const PAGE_SIZE = 12;

export const PRICE_MIN = 1000;
export const PRICE_MAX = 10000;

export const DEFAULT_FILTERS = {
  search: "",
  location: "",
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  orderBy: "",
};
