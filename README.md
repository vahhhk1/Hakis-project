# Textile House — showcase app

A mobile-first web app for the Instagram shop **@textile_housee** (Տեքստիլի Տուն):
bed linen, blankets, bedspreads, pillows, mattresses and towels, with delivery across Armenia.

## Run it

- **Quickest:** double-click `index.html`. It opens in the browser.
- **With the built-in server:** run `node serve.js` in this folder, then open http://localhost:5173.
  It also prints a network address. Open that on a phone on the same Wi-Fi, then use "Add to Home Screen"
  to install it like an app. It works offline after the first visit.

## What's inside

| Feature | Where |
|---|---|
| Home: full-screen hero carousel, story highlights, collection selector, live set configurator, animated figures, sticky "how we make it" steps, bestsellers, recently viewed | `#/` |
| Catalog: search (any language), category tabs, price slider, origin filter (Armenia / imported), sorting | `#/catalog` |
| Compare: up to 3 products side by side (⇄ button on any product) | `#/compare` |
| Product page: color swatches switch the photo, Interior / Close-up view, hover zoom, sizes with prices, quantity, discounts, share, ask in Direct | `#/product/<id>` |
| Favorites ♡ | `#/favorites` |
| Cart: quantities, free-delivery progress, totals | `#/cart` |
| Checkout: validated form, all 11 regions, delivery cost, payment method | `#/checkout` |
| Order confirmation: the order text is copied and sent to the shop via Instagram Direct | `#/order/<n>` |
| Order history | `#/orders` |
| About: delivery & payment, FAQ, size guide, contacts, install button | `#/about` |
| Languages: Armenian / Russian / English | top-right switch |

Cart, favorites, orders and language are saved in the browser (localStorage). There is no server.

## Editing content

- **Products, prices, colors, sizes, stories:** `js/data.js`
- **Interface texts (hy / ru / en):** `js/i18n.js`
- **Delivery prices & Instagram links:** `SHOP` at the top of `js/data.js`
- **Photos:** `js/photos.js` (file list, alt text in hy / ru / en) and `public/images` (sources in `public/images/CREDITS.md`)

## Photos

Every picture is a real photo stored in `public/images` as compressed WebP at several widths (`<name>-<width>.webp`);
the page loads the smallest file that is sharp enough for the screen, and pictures below the fold load lazily.
Each product lists a photo per color in `js/data.js` (`photos`), plus an optional close-up (`detail`).
Bed-linen colors share one set of photos (`BED_PHOTOS`).

To add or replace a photo: export it as WebP at 480, 800 and 1280 px wide (960, 1600 and 2400 for the hero),
name the files `<name>-<width>.webp`, and add an entry for `<name>` to `PHOTOS` in `js/photos.js` with its size and alt text.

The current photos are free stock images from Unsplash and Pexels that stand in for the shop's own. Replace them with real product photos before showing the site to customers.

## Notes

Animations (intro, scroll reveals, hero carousel, sliders, counters, parallax) live in `js/motion.js` and are switched off when the device asks for reduced motion.
Prices, delivery terms and FAQ answers are sample content. Confirm them with the shop before showing this to customers.
