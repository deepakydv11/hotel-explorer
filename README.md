# Hotel Explorer

A responsive hotel search app built for the final project assignment. It searches, filters, sorts,
and paginates live results from the **Hotel Search API**, and lets you open any hotel for full details.

Live API used: `https://demohotelsapi.pythonanywhere.com/hotels/`

## Design concept

The UI borrows from travel paperwork: the search bar is styled like a **boarding pass** (a
destination stub, a perforated tear line, then the search fields), and every hotel result is a
**luggage tag** card — punch hole, perforation, and a rubber-stamp rating badge. It's a small,
consistent metaphor that ties search → results → detail together.

## Features

- Search by hotel/area name, city, budget range, and minimum rating
- Sort by rating or price, in either direction
- Removable filter chips + a live result count
- Paginated grid (12 hotels per page) driven by the API's `limit` / `skip` params
- Hotel detail page with a photo gallery, rating, price, and description
- Loading skeletons, an empty state, and an error state with retry
- Fully responsive, down to small phones, with visible keyboard focus and
  `prefers-reduced-motion` support

## Tech stack

- React 19 + Vite
- React Router for the two routes (`/` and `/hotel/:id`)
- Plain CSS with a small design-token system (`src/styles/tokens.css`) — no UI framework
- No extra state library — filters live in local component state and drive the API query

## Project structure

```
src/
├── api/            # fetch wrappers for the Hotel Search API
├── hooks/          # useHotels: data-fetching hook for the results grid
├── components/     # SearchTicket, FilterBar, HotelCard, Pagination, Header, Footer, ...
├── pages/          # HomePage, HotelDetailPage, NotFoundPage
├── styles/         # design tokens + global resets
└── utils/          # constants (cities, sort options) and formatters (currency, rating)
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Hotel Explorer: hotel search app on Hotel Search API"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Notes

- Prices are shown in INR and are illustrative demo data from the API.
- The "Reserve this stay" button is a UI placeholder — this is a search/browse demo, not a live
  booking flow.
