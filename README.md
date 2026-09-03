# Wabi Sabi Steak House & Sushi Bar — website (light theme)

Static site, no build step. index.html + assets/. Theme matches the physical
menu: cream paper, crimson headers (Milker font), Nexa item text, navy accents.

## Deploy
Push to the existing repo → Vercel auto-deploys. Files belong at repo ROOT.

## Menu
FULL menu transcribed from the photographed menu (Aug 2026), tabbed
Dinner / Lunch / Sushi & Rolls. ~160 items.

All DINNER prices and the DRINKS tab are confirmed against the print
artwork from Minuteman Press (Sep 2026). The brush logo (assets/logo.svg)
is extracted from the printer's vector PDF; favicon + apple-touch-icon
generated from it. Tagline per the cover: "Teppan Steak House & Sushi Bar".

### Remaining transcription flags — confirm with owner:
- Lunch Yakisoba Shrimp 19.95 / Yakisoba Steak 24.95 (photo blurred; the
  print artwork only covered dinner + drinks)
- Sushi "Spanish Mackerel 25.00" (as printed; reads like a possible typo)

## Remaining [OWNER] items (search "OWNER" — 6 spots)
- Hero photo (currently the old stock flame — swap assets/hero-flame.jpg)
- 4 gallery slots: teppan show, sushi bar, the bar, the food
  Replace each .img-slot div with:
  <img src="assets/NAME.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:16px">
- About-section story line
- After deploy on their domain: make og:image URL absolute

## Facts baked in (real)
(909) 581-1055 · 11837 Foothill Blvd Ste B, Rancho Cucamonga 91730
Hours M–Th 11–2:30/4:30–9:30, Fri 11–2:30/4:30–10, Sat 11:30–2:30/4:30–10,
Sun 11:30–2:30/4:30–9:30 · 10 teppan tables · full sushi bar · full bar ·
dine in + take out

## Behavior
assets/site.js: menu tabs + gentle fade-ups (desktop only; mobile fully static).
Fonts in assets/fonts2/ (woff2, converted from the owner's Nexa/Milker files).
