# NDQ — Personal Finance × Technology Portfolio

**Interactive prototype v0.1.2 · 26 November 2026 · Private acceptance review**

## Open the prototype

For the simplest route, extract the ZIP and open NDQ-Portfolio-v0.1.2.html directly in Chrome. For the split-file edition, double-click `dist/index.html` for the portfolio or `dist/review.html` to compare desktop, tablet and phone widths. Both run locally. Keep `dist/assets` alongside the HTML. The separate portable HTML downloads include their own fonts, charts, styles, JavaScript and CV.

Start with the Jenoss chart on the homepage. Select **SKUs** to see the cost-source breakdown. Select **Explore projects** and move across the monthly series or use the left and right arrow keys. Open either case study to inspect its method, results, source and limits. The footer includes a reduced-motion control.

## Build and edit

Requires Node.js 18 or later for editing and rebuilding. Viewing the compiled site requires only a browser. There are no package dependencies.

```sh
node scripts/build.mjs
node scripts/check.mjs
```

For a loopback-only local server, run this command from the extracted project directory and open http://127.0.0.1:8000/ in your browser. On Windows, `py` can replace `python3`.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

To regenerate and verify the two portable HTML files:

```sh
node scripts/build.mjs --portable-dir portable
node scripts/check.mjs --portable-dir portable
```

## Source map

| File | Purpose |
| --- | --- |
| `src/content.mjs` | Candidate, experience, independent projects, financial inputs and source limits |
| `src/page.mjs` | Homepage sections, cards, disclosure panels, evidence tables and CV links |
| `src/graphics.mjs` | Reusable SVG components, cost-coverage instrument, profit bridge and monthly series |
| `src/styles.css` | Color and type tokens, layout, responsive breakpoints, focus states and motion |
| `src/interactions.js` | In-page navigation, menu, chart selection, counters and motion preference |
| `scripts/` | Static renderer, responsive review wrapper and regression checks |
| `assets/` | Portfolio edition of the CV, site mark, licensed local fonts and notices |
| `dist/` | Built website for local review |
| `PROJECT_STATE.md` | Design direction, stack selection, checkpoint and next decision |
| `CONTENT_REGISTER.md` | Claim-level evidence, conflicts and publication decisions |
| `QA_REPORT.md` | Tests, observations, fixes and remaining verification limits |

Edit the source, then rebuild. Changes made only inside `dist/` are overwritten. The release ZIP is intended for private review. Production deployment is a later checkpoint.
