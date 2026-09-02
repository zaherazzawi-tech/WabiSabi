# Wabi Sabi Steak House & Sushi Bar — website (light theme)

Static site, no build step. index.html + assets/. Theme matches the physical
menu: cream paper, crimson headers (Milker font), Nexa item text, navy accents.

## Deploy
Push to the existing repo → Vercel auto-deploys. Files belong at repo ROOT.

## Menu
FULL menu transcribed from the photographed menu (Aug 2026), tabbed
Dinner / Lunch / Sushi & Rolls. ~160 items.

### Transcription flags — have the owner confirm these 4:
- Lunch Yakisoba Shrimp 19.95 and Yakisoba Steak 24.95 (photo blurred by hand)
- Sushi "Spanish Mackerel 25.00" (reads high next to 6-8 dollar nigiri —
  possibly a menu typo, transcribed as printed)
- Sashimi Tamago listed MP as printed
- Kids "Kodomo Shrimp 18.50" (slightly obscured)

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
