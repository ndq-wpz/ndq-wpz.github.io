# Project state

**v0.1 · 26 November 2026 · Awaiting design acceptance**

## What is ready to review

A single English-first page introduces Nguyen Dinh Quang, documents two employment roles, presents two independent case studies, links capabilities to evidence and provides a downloadable CV. The desktop and mobile previews use the same compiled homepage.

The first chart answers a finance question with two denominators. Units show the coverage of commercial volume. SKUs expose the master, estimated and missing categories. The manufacturing bridge and monthly order chart offer a second, more detailed layer. Both case studies open inline.

## Visual direction

The first screen pairs an editorial nameplate with an engraved cost-coverage dial. Its arc lengths encode proportions. Etch marks and the side wall supply texture. Ink navy, ivory, muted mint and fine rules carry through the experience rows, charts and profile. Warm amber indicates missing cost in the dial and deductions in the separately labelled profit bridge. Cool blue distinguishes historical commerce data.

The desktop layout places the candidate and the featured analysis side by side. The phone layout stacks these in reading order, uses a compact navigation menu and retains both CV and project actions. A native disclosure keeps project limitations one action away. Employment and independent projects have distinct headings and content.

Noto Serif Display and its italic draw attention to the name, section titles and selected figures. Open Sans carries body copy, controls and units. Fonts are subset and included locally. The original mark and evidence graphics are implemented as vector artwork.

## Reference review

The live reference used an oversized centered headline, a purple gradient field, a persistent navigation bar, clear calls to action and a scroll cue. Its hierarchy makes entry points easy to find. It postpones the evidence of the work until after a full hero and a long skills section. That ordering adds search time for a finance recruiter. We kept the readable navigation and staggered reveal principle, placed measured evidence on the first screen, and linked capabilities to concrete case work. No reference artwork or implementation code was imported.

Reference: https://hmm-portfolio.vercel.app/  
Author's implementation notes: https://github.com/rolexstar27/Portfolio

## Stack decision

| Option considered | v0.1 decision |
| --- | --- |
| React + Vite + TypeScript | Useful for a larger stateful application. Five static sections and a small number of controls can be maintained as ordinary ES modules. Reconsider when future case pages share complex state. |
| Motion | CSS keyframes, IntersectionObserver and requestAnimationFrame cover the scoped reveals, count-ups, chart drawing and pointer effects. |
| Chart library | Two small financial series and a fixed coverage composition are easier to audit as deterministic SVGs with HTML buttons, textual readouts and source tables. |
| Selected stack | Node ES-module build, semantic static HTML, CSS tokens, SVG and a single progressive-enhancement browser script. The compiled site and portable file work without a hosted API or dependency installation. |

The initial content is readable before JavaScript runs. The reduced-motion preference suppresses reveals, counters, tilt and smooth scrolling. An additional footer control applies the same preference for the current document. Fine-pointer effects are gated by input capability.

## Decisions before the next phase

1. The owner reviews the first-screen typography, density, featured cost-coverage dial and project depth on both desktop and phone.
2. Apply the accepted design feedback in v0.2 and expand physical-device/browser testing.
3. Before public release, confirm the banking-employer history, overlapping employment dates, credential evidence and final CV edition. The independent project findings are already scoped in the content register.

No repository publication, GitHub Pages deployment or production release was performed.

## Phase 01 preview delivery correction

The primary acceptance file is NDQ-Portfolio-v0.1.html. Open the downloaded HTML in Chrome. The responsive edition now renders the same site in one document and applies its width presets in place. The case studies, visual identity and core website sources are unchanged. The earlier frame-based QA results describe the superseded wrapper. See the final section of QA_REPORT.md for the current verification boundary. Phase 01 remains at the owner acceptance checkpoint.
