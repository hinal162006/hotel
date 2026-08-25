# Azure Cove Hotel

Static landing page — header, Swiper hero slider, three coastal slides.

## Structure

```
azure-cove-hotel/
├── .vscode/
│   ├── extensions.json      Recommended extensions (Live Server, Prettier, …)
│   └── settings.json        2-space tabs, LF endings, format on save
├── CSS/
│   └── style.css            Nav, hero, slides, responsive
├── JS/
│   └── script.js            Swiper init + mobile nav toggle
├── images/
│   ├── logo.svg             Original vector wordmark
│   ├── logo.png             168×35   (1x)
│   ├── logo@2x.png          336×70   (2x, retina)
│   ├── logo@3x.png          504×105  (3x)
│   ├── favicon.png          512×512  gold wave mark, transparent
│   ├── slide-cove.jpg       1800×1200  ← use the JPGs on the site
│   ├── slide-cove.png       1800×1200
│   ├── slide-suite.jpg      1800×1200  (cropped from 1800×2400)
│   ├── slide-suite.png      1800×1200
│   ├── slide-terrace.jpg    1800×1200  (cropped from 1800×2700)
│   ├── slide-terrace.png    1800×1200
│   └── source-avif/         Original full-frame Unsplash .avif downloads
├── .gitignore
├── index.html
└── README.md
```

Folder names are capitalised (`CSS/`, `JS/`) because `index.html` references them
that way. Keep the casing — Linux hosts like Netlify and GitHub Pages are
case-sensitive and will 404 on `css/style.css`.

## Run it

1. Open the folder in VS Code.
2. Accept the recommended-extensions prompt (or install **Live Server**).
3. Right-click `index.html` → **Open with Live Server**.

## Slider behaviour

`style.css` points at the local images — no internet needed for the hero.

- **5s dwell** on each slide, with a **1200ms crossfade** between them, so a
  full cycle is about 6.2s. Want exactly 5s door to door? Drop `delay` to
  `3800` in `JS/script.js`.
- **Crossfade instead of a horizontal slide.** With full-bleed photography a
  slide-across pulls the eye to the frame edges; a dissolve keeps it on the
  image. `crossFade: true` prevents the dark flash that appears mid-transition
  when both slides are semi-transparent.
- **Ken Burns drift** — each active slide eases from `scale(1.06)` to
  `scale(1)` over 6.5s, finishing just as the slide hands over. The background
  sits on a `::before` layer to make this cheap: transforms are GPU-composited,
  whereas animating `background-size` repaints the viewport every frame.
- **Staggered captions**, 100ms apart, all settled within 1.4s.
- **Keyboard arrows and ARIA labels** enabled.

### Two things deliberately NOT done

**Autoplay does not pause on hover.** The hero is 82vh, so a resting cursor
covers it most of the time and the slider would sit frozen. If you want it back,
add `pauseOnMouseEnter: true` to the `autoplay` block.

**Reduced motion does not stop the slider.** Under
`prefers-reduced-motion: reduce` the drift, stagger and fade are all switched
off and slides change instantly — but they still change. Disabling autoplay
outright means anyone with OS animation settings turned down (common on Windows)
never sees slides two and three at all.

`index.html` gained two lines in `<head>`: a `preload` hint for the first hero
image, and the favicon link.

## Why AVIF was converted

Unsplash's `auto=format` served AVIF, which browsers negotiate per-request. As a
local file referenced from CSS there is no negotiation — Safari before 16 and
older Edge/Firefox builds would show nothing at all. The JPGs are the safe
choice. The untouched `.avif` originals are kept in `source-avif/`.

## JPG or PNG?

Identical content, both provided. **Use the JPGs.** PNG is lossless but 6–7×
heavier here (2.4–3.8 MB each vs 423–656 KB) with no visible gain on
photographic content. Keep the PNGs for editing without generation loss, then
export back to JPG for the web.

## Known issues with the photography

All three slides are now 3:2 (1800×1200), matching the wide hero band so
`background-size: cover` barely crops them. Full-frame originals are untouched
in `source-avif/` if you want to re-crop differently.

**`slide-cove.jpg` — good fit.** Whitewashed colonial terrace, turquoise
seating, boats on the water. Reads as an upscale seaside hotel. Native 3:2, so
it was not cropped at all.

**`slide-suite.jpg` — fixed by cropping.** The full frame was a casual snapshot
with a games controller, TV remote and charging phone on the table. Cropping to
the upper-middle band keeps the golden light, the palms, the ocean and one
corner of the bed, and drops all the clutter. It now works as a suite view.

**`slide-terrace.jpg` — still needs replacing.** Cropping cannot fix this one.
The awning carries another venue's name, and moving the crop away from the
awning only brings the branded tabletops and sponsor flags into clearer view —
the branding is distributed through the whole frame. It is also flat daylight
with empty stools, against a caption promising sunset dinner service. Replace
this photo rather than re-crop it.

## Dependencies

Swiper 14.0.1 and Google Fonts (Fraunces, Inter, IBM Plex Mono) load from CDN —
no build step, no `npm install`.

## Licensing

Slide photography: Unsplash License (free for commercial and non-commercial use,
attribution appreciated but not required).
