# Wabi Sabi Steak House & Sushi Bar — website

Static site, no build step, no framework. `index.html` + `assets/`.

## Deploy
New GitHub repo → import to Vercel (root = this folder). Same pattern as the
main Jolly Phone site. Custom domain when the owner has one.

## Before it goes truly live — search "[OWNER" in index.html (5 spots)
1. **Menu**: dishes reflect what they actually serve (teppan dinners, rolls)
   but the owner must confirm the list. Prices were intentionally left BLANK —
   never publish guessed prices. Add real ones in the empty price cells.
2. **About section**: two [OWNER] markers — their story + chef/owner name.
3. **Photos**: 4 dashed placeholder boxes (`.img-slot` divs) — replace each
   with `<img src="assets/....jpg" style="width:100%;height:100%;object-fit:cover">`
   inside the same wrapper. Hero flame image (assets/hero-flame.jpg) is stock —
   swap for a real photo of their teppan if possible.
4. After a domain exists, make the `og:image` URL absolute.

## Facts already real (verified against Google/Yelp, Aug 2026)
- Phone (909) 581-1055 — wired into all 4 tel: links
- 11837 Foothill Blvd, Ste B, Rancho Cucamonga, CA 91730
- Hours: M–Th 11–2:30 / 4:30–9:30 · Fri 11–2:30 / 4:30–10 ·
  Sat 11:30–2:30 / 4:30–10 · Sun 11:30–2:30 / 4:30–9:30
  (have the owner confirm — listings sites disagree with each other)

## Behavior
- Desktop: opening-frame hero (photo unclips + de-zooms over 1500px of scroll),
  section fade-ups. Logic in assets/site.js (plain JS, edit freely).
- Mobile (<820px or landscape phones): static hero, no scroll animation,
  no fades — per the mobile pass we did.
