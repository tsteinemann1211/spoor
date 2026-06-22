# Spoor 🐾

A little study app to get you both ready for the safari — learn to **recognise every
animal on sight**, plus the plants, history and politics of the three places you're
visiting: the **Okavango Delta** (Botswana), **Hwange** (Zimbabwe) and the
**Lower Zambezi** (Zambia).

Three modes:
- **Field guide** — browse all 68 species with photos, scientific names and a "look for" tip.
- **Spot it** — name the animal from a photo. Ones you get wrong come back more often
  (spaced repetition), so by September the whole checklist sticks.
- **Know the countries** — 30 questions on history, geography and current politics.

Progress is saved per device, so you and Lea each track your own on your own phones.

---

## Put it online (GitHub Pages) — ~5 minutes

You'll get a clean link like `https://yourname.github.io/spoor` that opens on any phone.

1. Make a free account at **github.com** if you don't have one.
2. Click **+ → New repository**. Name it `spoor`. Set it **Public**. Click **Create**.
3. On the new repo page, click **uploading an existing file**.
4. Drag in **all of these files** (not the folder — the files themselves):
   `index.html`, `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under *Branch*, pick **main** and **/(root)**, then **Save**.
7. Wait a minute, refresh, and GitHub shows your live link at the top:
   `https://yourname.github.io/spoor`

Send that link to Lea. Done.

> Updating later? Just re-upload `index.html` (Add file → Upload files → commit). The
> site refreshes within a minute.

---

## Add it to the iPhone home screen (so it feels like an app)

1. Open the link in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** button (the square with an arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

It now lives on the home screen with the paw icon, opens full-screen with no browser
bars, and remembers your progress.

(On Android: open in Chrome → menu **⋮** → **Add to Home screen**.)

---

## Good to know

- **Photos** load from Wikipedia the first time you view each animal, so you need a
  signal for that first pass. After that they're cached on the phone and work offline —
  handy when you're actually out in the bush. Tip: flick through the whole field guide
  once on wi-fi before you fly.
- **No accounts, no tracking.** Everything stays on the device.
- The politics questions were accurate as of June 2026 (note Zambia votes in August 2026
  and Zimbabwe has a live term-limit debate) — worth a quick re-check nearer the trip.
- Want to add or change species/questions? It's all in plain text near the top of
  `index.html` — search for `const SPECIES` and `const COUNTRIES`.

Have a brilliant trip. 🦁
