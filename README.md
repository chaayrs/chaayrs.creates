# CHAAYRS.CREATES

Cha Yorsua’s creative portfolio: strategy, UGC, and AI storytelling, in the Midnight Rose visual direction.

## Stack

Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS 4. The visual system uses organized CSS tokens and local open-source fonts (DM Sans, Barlow Condensed, Instrument Serif). Native HTML video, IntersectionObserver, and requestAnimationFrame provide playback and progressive motion without an animation dependency or scroll hijacking.

## Local development

Use Node.js 22 or later, then:

```
npm install
npm run dev
```

The homepage is served at http://127.0.0.1:3000. If another preview owns port 3000, use `npm run dev -- --port 3001`.

```
npm run typecheck
npm run build
npm run start
```

Development uses `.dev/`; production uses `.next/` so a development preview does not overwrite the production build.

## Structure

- `app/page.tsx`: opening, introduction, selected work, capabilities, testimonial, collaborations.
- `app/work/[slug]/page.tsx`: statically generated project presentations.
- `lib/portfolio.ts`: profile, project descriptions, and video collections.
- `lib/media-metadata.json`: measured video durations and output dimensions.
- `components/`: navigation, ambient motion, video gallery, icons, contact, footer.
- `public/media/`: browser-ready project videos, posters, and the outlined Bodoni Moda CC typography mask.
- `public/fonts/`: local font files with their OFL licenses.
- `public/downloads/cha-yorsua-cv.pdf`: supplied CV.

## Content and provenance

Trish Morikawa is explicitly identified as an AI persona. The three supplied travel films are one self-initiated project. Six skincare videos form the UGC collection. The Rivecowe entry uses the neutral product title “Ampoule” because its original filename and visible product labeling differ.

The testimonial is the exact excerpt supplied by Cha and shown in Alex’s email screenshot, attributed to Alex, Account Manager at Digital Stark, Review Hunters Team. The screenshot and its contact information are not published. The two selected collaboration entries follow the supplied d’Alba / Digital Stark and Frankly / Kbeauty Cafe information. Other product appearances are presented as creator work without inferring paid partnership status or inventing results.

The homepage contains no owner profile portrait. On-camera UGC appears as work samples; the supplied CV retains its portrait. Contact uses the email provided in the CV. No analytics, invented social profiles, fabricated testimonials, performance figures, or contact-form backend are included.

## Media preparation

All nine supplied videos were imported from authenticated Drive file references, with temporary URLs passed through stdin and not saved. Original files are retained in ignored `.media-source/`. `scripts/prepare-media.py` creates H.264 / AAC MP4 files with fast-start playback at 720 × 1280, preserving the original aspect ratio through padding. It also creates poster frames and a separate silent decorative loop. The temporary preparation tool lives outside the application; no Python or FFmpeg runtime is required to serve the prepared site.

Full project videos use native playback controls and `preload="none"`; only one project video plays at a time. Decorative playback can be paused and defaults to a still image for reduced-motion preferences. The opening pauses offscreen and when the page is hidden. Content remains visible if motion enhancement is unavailable.

## Navigation

The same opaque header stays at the top on the opening, all homepage sections, and project pages. Its CY mark uses the supplied logo artwork with responsive sizing and Next.js image optimization. The Menu button opens ABOUT, WORK, SERVICES, KIND WORDS, CONTACT in that order. Links close the panel; Escape closes it and returns focus to the Menu button. Clicking outside also dismisses it. Project-page links return to the corresponding homepage anchor.

## Hero and scroll motion

The opening uses two outlined Bodoni Moda C glyphs in a small SVG mask. The existing silent video and still poster are clipped within that mask; no runtime serif font is needed for the monogram. Bodoni Moda is OFL-licensed (license in public/fonts). The opening wordmark uses a locally hosted, approximately 2KB WOFF subset of Bodoni Moda 96pt Regular, scoped to the homepage title. Its high-contrast serif lettering, tighter spacing, rose period, and single-line responsive format follow the supplied luxury title-card reference. The existing Bodoni Moda OFL license covers this font subset. Other portfolio typography is unchanged.

A route-aware motion controller runs from the root layout. IntersectionObserver reveals masked heading lines and project imagery once, with 120ms stagger. Masked sequences now wait for about 90% of the heading to fit in the usable viewport, with a cap for unusually tall headings. Other content and project images keep the earlier 18% trigger. The collaboration section observes its heading rather than the whole section. A scroll-frame check prevents missed custom thresholds, and resizing refreshes the observer with the actual header height. Generic content moves 24px (14px on mobile); the decorative CREATIVE backdrop has a 42px desktop-only parallax range mapped to the word’s own visible passage through the viewport. Keyboard focus immediately exposes any pending target. Content defaults to visible if enhancement is unavailable. Existing project-image hover transforms are kept separate from their entrance translation.

Native prefers-reduced-motion disables entrances, smooth scrolling, and parallax, and makes the ambient video start with a still poster. For browser QA without changing system preferences, development builds also accept ?motion=reduce. That override is disabled in production.

Desktop collaboration timing is heading first (1.05s per line, 120ms stagger), description at 1.2s, contact button at 1.5s, and email at 1.6s. Mobile headings use 0.8s; the collaboration heading uses 0.95s with supporting items at 1.1s, 1.35s, and 1.45s. Keyboard focus bypasses waiting for the focused section.

Run node scripts/check-motion-geometry.mjs for the offscreen-line regression, short-viewport reachability, separate image trigger, and visible-word parallax range.

## Validation for the cinematic refinement

Browser checks covered 1440×900 desktop, 820×1180 tablet, 390×844 mobile, and 320×740 narrow mobile. Checked the CC mask, working pause/play controls, mobile menu and Escape key, sticky-header anchor offsets, staggered headings and images, persistent visibility on return scrolling, client-side project navigation, shared project-page contact reveal, and horizontal overflow. Reduced-motion behavior was visibly checked through the development override; the operating-system preference itself was not toggled. No new animation library was added.

The reveal retiming was visibly checked at 1280×720, 626×703, and 390×844. At the former early trigger (heading top about 648px in a 720px viewport), the introduction remained pending; it began when the heading top reached about 468px and all three lines fit. The word’s parallax reached about +19px while still visible, after starting at −21px. Checked work heading, staggered images, independent contact reveal, mobile contact duration, client-side project navigation, return scrolling, and reduced-motion fallback.

## Live editorial clock

The hero location block contains a fixed Asia/Manila clock and a visitor clock detected with Intl.DateTimeFormat().resolvedOptions().timeZone. Both use a consistent 12-hour format and update at each minute boundary. Returning to a visible tab refreshes both immediately. Time values are initialized after mounting, with reserved space for loading placeholders. The group uses aria-live="off"; the static LIVE dot does not blink. The block shares the existing hero fade, including reduced-motion support.

Timezone detection stays in browser memory: no GPS permissions, persistent storage, external time service, or location transmission. Development previews accept ?clockZone=America%2FNew_York (and other valid IANA zones) to simulate visitor-zone formatting in the rendered component. Production ignores this override. Browser checks use that development override because this browser control does not expose OS/browser timezone emulation.

Run node scripts/check-editorial-clock.mjs for fixed-date checks covering five timezones, fractional offsets, midnight/noon, daylight-saving rollback, and Manila remaining unchanged across visitor zones.

## Before public deployment

This is a local build. Choose a production domain and deployment target before publishing. Further process examples or collaboration media can be added when supplied; the site does not display placeholders for missing material.
