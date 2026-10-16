---
name: dimstunt.de
description: Night-corp contractor dossier. Cyberpunk 2077 HUD discipline with Cruelty Squad grime in the margins; drenched CP-yellow against near-black ink.
colors:
  yellow: "oklch(0.92 0.19 103)"
  ink: "oklch(0.16 0.012 265)"
  ink-2: "oklch(0.21 0.016 265)"
  paper: "oklch(0.96 0.025 103)"
  dim: "oklch(0.78 0.03 103)"
  cyan: "oklch(0.86 0.14 200)"
  red: "oklch(0.66 0.24 25)"
  acid: "oklch(0.9 0.23 132)"
  flesh: "oklch(0.8 0.08 25)"
typography:
  display:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(3.2rem, 0.8rem + 9.5vw, 9.5rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 1.6rem + 3.5vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.95
  title:
    fontFamily: "Big Shoulders, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem)"
    fontWeight: 800
    lineHeight: 1.05
  body:
    fontFamily: "Chakra Petch, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.94rem + 0.3vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    letterSpacing: "0.04em"
  grime:
    fontFamily: "Silkscreen, monospace"
    fontSize: "clamp(1rem, 0.8rem + 1.2vw, 1.8rem)"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  none: "0"
spacing:
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
  section: "clamp(4rem, 2.5rem + 6vw, 8rem)"
  cut: "1.1rem"
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.3rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.yellow}"
    padding: "0.8rem 1.3rem"
  button-ad:
    backgroundColor: "{colors.red}"
    textColor: "{colors.ink}"
    padding: "0.8rem 1.3rem"
  card-operative:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "1.5rem 1.5rem 1.75rem"
  panel-gig:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    padding: "1.25rem 1.5rem"
  sticker:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.ink}"
    typography: "{typography.grime}"
    padding: "0.55rem 0.7rem"
---

# Design System: dimstunt.de

Scope: the landing page (`index.html` + `style.css`) and `404.html`. `/cv/` loads `style.css` for fonts and tokens and adds `cv/cv.css`: the same type, palette and HUD strip set as a sober document (yellow headings, red list markers, no grime, no motion). Its print stylesheet is plain black on white with a light colour scheme.

## Overview

**Creative North Star: "The Night-Corp Dossier"**

A contractor's file pulled up on a HUD. Two registers share the page. The frame is Cyberpunk 2077 discipline: a drenched yellow field, near-black ink panels, 45-degree chamfered corners, mono data readouts, hazard tape at the seam. The margins carry Cruelty Squad grime: a crooked acid-green fake advert with noise texture and a pixel face, a taped sticker, a flesh-pink tape strip. Frame is exact and aligned; grime is tilted and crude, and it stays in the margins.

Density is high on type, low on decoration. The name is set across the hero as the largest element (up to 9.5rem), the surname knocked out of an ink chamfer slab. Everything else is a labelled readout: class, contract, exp, node. Numbers are the proof and always use the mono face.

Motion is one authored moment: a stepped glitch-slice power-on of the name and card, a boot of the card and a slap of the sticker. Otherwise the page is still, with 120ms colour swaps on buttons. All motion sits behind `prefers-reduced-motion: no-preference`.

**Key Characteristics:**
- Yellow-drenched hero and closing section bracket an ink body.
- Chamfered silhouettes, no rounded corners anywhere.
- Four typefaces, each with one job: display, text, data, grime.
- Cyan means data or payout, red means alert or status, never swapped.
- Grime colours (acid, flesh) are confined to the advert, sticker and tape.

## Colors

A two-pole palette (yellow and ink) with two signal colours and a quarantined grime pair.

### Primary
- **CP Yellow** (`yellow`): hero field (with a faint 7px ink dot grid), closing "jack in" section, primary buttons, section-heading tabs, corner brackets, log rule, selection, scrollbar thumb. The only colour allowed to fill a whole section.

### Secondary
- **Data Cyan** (`cyan`): payouts, contract names, email, gig titles, keyboard focus ring on ink. Information the reader came for.
- **Alert Red** (`red`): active/now status, nav brackets, bottom-right corner brackets, the ad button, the footnote. Signals state, not decoration.

### Tertiary (grime layer only)
- **Acid Green** (`acid`): advert ground (with SVG noise) and the sticker.
- **Flesh Pink** (`flesh`): advert outline, price highlight, tape strips.

### Neutral
- **Night Ink** (`ink`): page ground, cards, text on yellow. Near-black with a blue tilt (hue 265). Matches `theme-color`.
- **Ink Raised** (`ink-2`): side-gig panels only; one step above the page.
- **Dossier Paper** (`paper`): body text on ink. Warm, yellow-tinted off-white.
- **Dim Paper** (`dim`): ledes, labels, secondary text on ink.
- **Rule**: `paper` at 22% in oklch mix, for 1px dividers (dashed in the stack list).

### Named Rules
**The Quarantine Rule.** Acid and flesh appear only in the advert, sticker and tape. They never colour UI, text on ink, or a section ground.

**The Signal Rule.** Cyan is data, red is state. A new element picks by meaning, not taste.

**The Ink-On-Yellow Rule.** On a yellow ground, text, focus rings and hover states go ink; cyan and red are not used for text there. Hover on yellow inverts to ink-on-yellow.

## Typography

**Display Font:** Big Shoulders (variable 100-900, fallback Arial Narrow)
**Body Font:** Chakra Petch (400, 600, 700, fallback system-ui)
**Label/Mono Font:** JetBrains Mono (variable, tabular numerals)
**Grime Font:** Silkscreen (400), pixel face, advert and sticker only

All self-hosted woff2 in `/fonts/`, `font-display: swap`; Big Shoulders is preloaded.

**Character:** Condensed industrial caps for the headlines, a squared techno sans for reading, and a mono for every readout. The pixel face is the sticker-shop voice and appears nowhere else.

### Hierarchy
- **Display** (900, 3.2rem to 9.5rem fluid, 0.84, uppercase): the name only.
- **Headline** (900, 2.4rem to 4.25rem, 0.95, uppercase): section h2, yellow on ink, or ink inside a yellow chamfer tab.
- **Title** (800, 1.5rem to 2.2rem, 1 to 1.05, uppercase): log employer names, gig titles (gigs in cyan).
- **Body** (400, 1rem to 1.15rem, 1.6): reading text, ledes capped at 60ch, pitch at 34ch. Emphasis uses 600.
- **Label** (mono 500/700, 0.75 to 0.95rem, 0.04 to 0.08em tracking, uppercase for field names): HUD strip, dt field names, dates, payouts, stack lines, footer.
- **Grime** (Silkscreen, 0.85rem sticker, up to 1.8rem advert shout, uppercase).

### Named Rules
**The Four Jobs Rule.** Display for names and headings, text for reading and buttons, mono for numbers and field labels, pixel for grime. Do not mix jobs.

**The Tabular Rule.** Figures in data rows (years, dates, labels) are mono with tabular numerals. Figures inside prose (contract-log payouts, CV achievements) stay in the text face, bold cyan, with tabular numerals.

## Layout

One `.wrap` container: `min(100% - 2 * gutter, 72rem)`, centred. Gutter and section spacing are fluid clamps (see tokens). Sections stack as: HUD strip, yellow hero, ink content blocks, tilted advert, yellow closing section, footer.

The hero is an auto-fit grid (columns min 24rem), the name spanning all columns, text and operative card below or beside, top-aligned with a tight row gap. Content blocks carry a padded wrap with two-colour corner brackets (yellow top-left, red bottom-right, 2.5rem arms, 3px). The log is a 2-column grid (date | role+payout) that collapses to one column under 40rem. The stack list is an auto-fit two-column definition grid (label 8.5rem). The advert is three columns (copy, face, button), one column under 48rem. Rhythm is deliberately broken once: the second side-gig panel is indented and tilted -0.6deg.

Breakpoints in use: 40rem (log), 48rem (advert).

## Elevation & Depth

Flat. Depth comes from colour planes (yellow against ink, ink-2 against ink), chamfer clipping, and overlap (tape strips, a sticker hanging off the card). The only shadow is the sticker's soft drop (`0.2rem 0.35rem 0.6rem`, ink at 45%), meant to read as a physical sticker. Surfaces get no other shadows and none at rest.

### Named Rules
**The Taped-On Rule.** Depth is physical collage: tape, tilt, overlap. Not blur, glow or layered shadow.

## Shapes

The form language is the chamfer: a 45-degree cut on top-right and bottom-left via `clip-path`, driven by `--cut`. Default 1.1rem; buttons 0.6rem; the surname slab and block heading tabs scale with type (0.2em, 0.3em). Radius is zero everywhere. Borders are 1px rules, a 2px log header rule, a 6px double ink frame on the advert. Hazard tape (45-degree ink/yellow stripes, 1.1rem tall) seals the hero into the ink below. Tilt is a grime-only device: sticker 7deg, advert -1.2deg, face 3deg, advert button 2deg.

### Named Rules
**The Chamfer Rule.** Containers and buttons are cut, never rounded. Clip-path means outlines are clipped, so focus rings are drawn inset (negative offset) on buttons.

**The Grime Tilt Rule.** Only grime elements rotate. The frame stays square to the page.

## Components

### Buttons
- **Shape:** chamfer, `--cut: 0.6rem`; mono-free, Chakra Petch 700, 1rem, uppercase, 0.06em tracking, padding 0.8rem 1.3rem; optional square-capped arrow SVG.
- **Primary:** yellow ground, ink text.
- **Dark:** ink ground, yellow text, for use on yellow.
- **Ad:** red ground, ink text, tilted 2deg.
- **Hover (fine pointer only):** primary inverts to ink/yellow; dark and ad go yellow/ink; buttons inside ink blocks and the card go cyan/ink. 120ms colour transition. Active nudges 1px.
- **Focus:** 3px inset ring (-6px offset), ink on yellow buttons, yellow on dark.

### Operative Card
Ink chamfer panel on the yellow hero. Mono title in yellow, a definition grid ending in an acid "Status: Open to freelance" line, (dim mono field names, 600 values, cyan emphasis), then OPEN CV with the email beside it. A taped acid sticker hangs off its corner. Boots in with a brightness flash.

### Navigation (HUD strip)
Ink bar with a 1px rule. Mono, 0.8rem, uppercase. Yellow bold id, dim node text, nav links in paper wrapped in red square brackets, hover turns red. Wraps on small screens.

### Contract Log
Ordered list under a 2px yellow rule. Date in mono (red and bold for the current role), employer as title type, role in dim, payout line in cyan mono.

### Side-gig Panels
Ink-2 chamfer panels, cyan display title, flesh tape strip at the top edge, mono dim stack line. Second panel offset and tilted.

### Advert (signature grime)
Acid ground with fractal-noise SVG overlay, 6px double ink border, flesh outline, tilted -1.2deg. Pixel shout, display offer with a flesh highlight, mono fine print, pixel-art face (16x16 art upscaled to 32x32, rendered `image-rendering: pixelated`, ink outline), red button. One per page.

### Closing Section ("Jack in")
Yellow ground, ink text; big display email link with 4px underline; links in bold uppercase text; hover inverts to yellow on ink.

## Do's and Don'ts

### Do:
- **Do** fill whole sections only with `yellow` or `ink`.
- **Do** cut container and button corners with `--chamfer`; resize via `--cut`.
- **Do** set numbers in data rows in JetBrains Mono; inside prose use bold cyan text-face figures with tabular numerals.
- **Do** switch focus rings to ink on yellow grounds and keep them inset on clipped buttons.
- **Do** keep tilt, tape, noise and pixel type inside the advert, sticker and gig tape.
- **Do** gate any animation behind `prefers-reduced-motion: no-preference`, and limit hover styles to `(hover: hover) and (pointer: fine)`.

### Don't:
- **Don't** use border-radius, soft cards or equal-weight card grids.
- **Don't** put acid or flesh on UI, body text or section grounds.
- **Don't** set cyan or red text on yellow.
- **Don't** add motion beyond the single power-on sequence and 120ms colour swaps.
- **Don't** bring grime, motion or the yellow field into `/cv/`; it carries the type and palette only and prints black on white.
- **Don't** add shadows to flat surfaces; the sticker's drop is the only one.
