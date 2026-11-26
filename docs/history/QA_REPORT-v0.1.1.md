# QA — v0.1.1 visual refinement
Prior v0.1 reports retained under history/. Tests here are newly run against the revised artifact, not inherited claims.

## Actual results
- Node build and 10 groups of static/regression checks passed, including financial arithmetic, same CV PDF bytes, local asset references and portable script syntax.
- Chromium rendered the exact self-contained HTML string via Playwright `set_content`. Navigation to file:// and localhost was blocked by the environment; actual file opening on the user's computer remains a user test.
- Aurora computed transform changed over time; scroll-triggered project reveal was observed with animation `ndq-project`, starting opacity 0.08 and translation 38px; chart switching Units/SKUs displayed 84.6% for SKUs; both data and chart geometry preserved except styling/size.
- Manufacturing case expanded and collapsed, chart selection changed, CV download produced a PDF, mobile menu opened and closed on navigation, and OS reduced-motion disabled ambient animation. No JavaScript page errors recorded.
- Viewport widths 320, 375, 390, 540, 680, 768, 1024, 1280 and 1440 had matching document scrollWidth in the final run. A transient 4px overflow at 768 during a role reveal was identified and fixed by reducing lateral translation to 10px.
- Desktop and mobile screenshots inspected. This is not a full accessibility/performance audit; Firefox, Safari, real mobile devices, Library embedding and actual GitHub Pages deployment are untested.

## Data/content
Financial inputs, company names, dates, case narratives and CV PDF remain unchanged from the v0.1 source. No new independent workbook verification was performed. Original CONTENT_REGISTER.md remains applicable; employer attribution/date overlap is still unresolved. No public deployment has been performed.
