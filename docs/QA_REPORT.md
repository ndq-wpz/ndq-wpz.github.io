# QA — v0.1.2 application revision
- Node build successful; 11 static/regression groups passed (including new document/nav order, scroll cue and section numbering checks).
- Chromium via Playwright set_content: 1440×900 and 390×844; correct document order, no horizontal overflow, Projects scroll cue, active navigation, Experience anchor and no page errors. Reduced-motion mode used for deterministic scroll testing.
- Deployment ZIP integrity passed; same inlined CSS, JS and CV bytes as previous public package. Only index.html changed within the public package.
- Financial content and motion code unchanged. Prior broader browser and motion tests preserved in history/QA_REPORT-v0.1.1.md, not rerun in full. No live deployment or fresh cross-browser tests.
