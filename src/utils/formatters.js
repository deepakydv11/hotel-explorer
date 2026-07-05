const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(number)) return "—";
  return inrFormatter.format(number);
}

export function formatRating(value) {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(number)) return "—";
  return number.toFixed(1);
}
