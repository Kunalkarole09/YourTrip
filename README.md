# Traviator Adventures & Outdoors

A responsive React/Vite refresh of the Traviator travel homepage. Tour names, displayed prices, public tour links, photography, and traveller quotes are sourced from the published Traviator site. Confirm current departure dates and prices with Traviator before booking.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, or preview it with `npm run preview`.

## Newsletter integration

The signup form validates the email in the browser. It submits JSON in the shape `{ "email": "traveller@example.com" }` to `VITE_NEWSLETTER_ENDPOINT` when configured. Copy `.env.example` to `.env.local` and set that variable to a backend endpoint that accepts the request and handles consent, storage, and email-list provider integration. Without an endpoint, the page clearly directs visitors to the published contact email instead of pretending a subscription succeeded.

## Media

Tour and gallery photographs are served from Traviator's published image CDN. The hero uses the published Traviator image as its poster and fallback, with an optional replaceable Pexels MP4 source configured in `src/data.js`. The video is omitted on small screens and when reduced motion is requested.