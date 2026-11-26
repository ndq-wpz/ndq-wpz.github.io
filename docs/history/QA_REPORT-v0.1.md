# Prototype v0.1 — QA report

**Acceptance build · 26 November 2026**

The compiled homepage was served locally and inspected in Chrome. The responsive viewer renders the actual site in a resizable frame. The portable version was also exercised as a self-contained HTML document.

| Area | Observed result |
| --- | --- |
| Build | Node 24.22.3 generated the website and both portable editions. The reproducible checker passed all ten groups when run with the portable directory. |
| Responsive layout | Tested frame widths of 320, 360, 390, 680, 681, 768, 1024, 1280 and 1440 CSS pixels. Document width equaled scroll width at every size. Desktop, tablet and phone compositions were also inspected visually. |
| Desktop navigation | Explore projects reached the projects section, the active navigation changed to Projects and Contact exposed the supplied email and profiles. Back to top returned to the introduction. |
| Mobile navigation | The menu opened, closed with Escape, and closed after selecting Projects. The menu button exposed the correct expanded state. |
| Cost coverage | Switching to SKUs yielded 84.6%, with 53 master, 2 estimated and 10 missing. The keyboard left arrow restored Units and 93.3%. Unit counts reconciled to 2,140. |
| Project charts | Selecting gross profit displayed 43.72%. Selecting April displayed 183 raw order lines. Right arrow moved to May and 456. Labels and values were also exposed as accessible controls. |
| Disclosures and anchors | MB role details expanded. Both project studies opened and closed. The manufacturing register showed 6 / 3 / 1. The Jenoss table showed the three native-currency amounts. The capability link opened the correct hidden case and set its fragment. |
| Motion | The numeric readout was observed animating and then reaching its source value. Enabling Reduce motion set smooth scrolling to auto and removed the background animation. Switching cost views in this mode produced the final values immediately. Native OS preference handling was inspected in CSS and JavaScript; the browser's OS preference was not changed separately. |
| CV | The served site, standalone HTML and responsive viewer each produced a completed PDF download. Portable PDF bytes matched the packaged PDF. Both A4 pages were rendered and inspected. The PDF retains the CV photograph and phone number. |
| Accessibility | Checked one main heading, named regions and form controls, unique IDs, anchor and ARIA relationships, visible focus, keyboard navigation, textual chart alternatives and reduced motion. Essential text and disclosures are included in the HTML. |
| Assets and console | All local assets resolved. No site-origin warning or error was observed in the standalone browser log. The managed browser emitted extension-origin metadata messages. |
| Privacy and links | The built site includes approved professional contact information, the CV and aggregated case figures. It does not include the raw Excel files, transaction extracts, analytics or forms. The two profile destinations and mailto address match the brief. No email was sent. |
| Asset budget | HTML, CSS, browser JavaScript, favicon and four local font subsets total 189,050 bytes before HTTP compression. JavaScript is 9,074 bytes. PDF bytes are loaded on download in the split-file site and embedded in the portable edition. These are file sizes, not network or Lighthouse scores. |

## Issues fixed and retested

- The phone nameplate wrapped to three lines. Responsive type now keeps the two-line composition at the reviewed phone and tablet widths.
- Different project title lengths offset the two charts. The final desktop pair aligns at the same chart position.
- The custom review width field previously waited for an inconsistent commit event. Typing a valid width now updates the frame immediately.
- Embedded PDF download events could be lost inside the review frame. The portable edition generates a local PDF Blob and the viewer forwards the download to its top-level window. Both routes produced completed downloads after the fix.
- The source CV contained unrelated project repository annotations. The portfolio edition removes these, adds the correct GitHub profile link and uses the approved city-level location.

## Verification limits

Physical touch hardware, Safari, Firefox, assistive-technology user testing, external issuer credentials, live social account availability, network-throttled performance and GitHub Pages hosting are outside this acceptance run. Before public release, verify the personal history entries listed in CONTENT_REGISTER.md and repeat browser testing against the chosen production URL.

## Review files

`previews/NDQ-Desktop-Projects.jpg` shows the two independent cases at desktop width. `previews/NDQ-Phone-Cost-Coverage.jpg` shows the phone cost-coverage control. Use the live HTML preview to test scrolling, chart selection and disclosures.

## Phase 01 delivery correction · 26 November 2026

The prior responsive viewer drew its toolbar in the outer document and put the entire portfolio inside an iframe navigated to a generated HTML Blob URL. A byte comparison of the retrieved original viewer payload and the original standalone HTML confirmed that the website, SVGs, styles, scripts, fonts and CV were present. The portable code took the embedded-data branch. The relative index.html fallback belonged to the split-file viewer.

In Chrome, applying a test policy of `frame-src 'none'` to the old artifact left the toolbar visible and produced a blocked child document. The same test on the corrected artifact displayed the nameplate and portfolio. This isolates the fragile nested navigation. The authenticated Library renderer's actual CSP headers and sandbox flags were unavailable; the managed browser showed a login prompt for the private Library link. A specific Library directive cannot be attributed from the screenshot.

The revised review file includes the portfolio directly in the document. Its width controls use CSS container queries. The plain standalone file is byte-identical to the supplied v0.1 standalone. Its CSS, JavaScript, graphics, fonts, data and CV are inline. A Blob URL is still used for the PDF download only. Host restrictions on script execution or downloads may affect in-app viewing.

**Reliable user route.** Download NDQ-Portfolio-v0.1.html and open it in Chrome. The source ZIP also contains this file at the top of the project folder. No server or installation is needed. Use the responsive HTML for width presets.

**Test boundary.** Chrome exercised the actual final HTML files over a local static file transport isolated from the source tree. Both passed navigation and scrolling, both case disclosures, SKU/unit switching (84.6% / 93.3%), gross margin selection (43.72%), arrow-key month selection (May, 456), arrival-animation selection, reduced motion and completed PDF downloads. The revised Phone / Tablet / Desktop controls measured 390 / 768 / 1,280 px with one / two / two hero columns. All ten packaging check groups passed. Direct file-URL navigation was denied by the managed Chrome policy; an interactive file-URL session and a signed-in Library rendering were not independently observed. The portable asset and PDF byte checks were run separately.

Tested SHA-256 values

- NDQ-Portfolio-v0.1.html — aca20c459ac976ceb8b12872bd1d5a575e478ffc0187a663f4289d00e7ead691
- NDQ-Responsive-Preview-v0.1.html — 6663de1b8d2ef468e422ff8f2e1c99b950f1d5ae113413eb5a90ff5d5a0a269a
