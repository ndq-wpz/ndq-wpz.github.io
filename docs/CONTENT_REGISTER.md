# Content register

**v0.1 · 26 November 2026 · Private editorial record**

VERIFIED means reproduced from, or checked against, the named supplied artifact at the stated level. USER-PROVIDED means the latest CV or brief reports the fact. PENDING VERIFICATION identifies a conflict, external credential or claim needing additional evidence. PLACEHOLDER is reserved for future items and has no visible instance in v0.1.

## Professional profile

| Item | Status | Source and treatment |
| --- | --- | --- |
| Name, positioning, tagline, location, email and profile links | USER-PROVIDED | Project brief and supplied CV. Public location is Hanoi, Vietnam. |
| National Economics University, Bachelor of Financial Investment, 2022–2026 | USER-PROVIDED | CV p. 1. Display the programme and date range. Degree conferral has no separate supporting document. |
| Jenoss, R&D and Business Intelligence, Mar 2025–Feb 2026 | USER-PROVIDED | CV p. 2. Standardized the English role wording to match the brief. Cost-based pricing, promotion analysis and dashboards are employment responsibilities. |
| MB Hoang Mai, Corporate Banking Intern, Mar 2025–Jun 2026 | USER-PROVIDED | CV p. 2 and project brief. The role includes tax-ID extraction into SQL and lending research covering 2021–2025. |
| Banking employer and overlap | USER-PROVIDED | User confirmed the current career information on 26 Nov 2026. Keep MB Hoang Mai, Mar 2025–Jun 2026, Jenoss Mar 2025–Feb 2026, and the stated lending research. Earlier BIDV reference is not published. User confirmation is not independent employer verification. |
| Jenoss employment volumes | PENDING VERIFICATION | CV p. 2 reports 12 product lineups, 84 variants, about 75,000 order records and 12,000 marketing records. Supplied project data cover a different population. The website describes the work without these employment volume claims. They remain as authored in the CV edition. |
| MOS Excel and Word 2019, HackerRank SQL Intermediate, IBM Excel/Python coursework | USER-PROVIDED | Listed on CV p. 1. Website omits test scores. Issuer documents and credential identities still require confirmation for production. |
| CMA and English | USER-PROVIDED | CMA is independent study only. CV lists English C1; external proficiency evidence is pending and the site omits the level. |
| Corporate information collection automation | USER-PROVIDED | Kept inside MB experience. An independent third project would require additional evidence. |
| CV PDF | VERIFIED | Portfolio copy of the supplied two-page document. Address narrowed to Hanoi, Vietnam. Two project annotations that pointed to an unrelated Customer Segmentation repository were removed. The printed GitHub profile now links to the profile. Phone and CV photograph retained. Originals untouched. No raw workbook is a site asset. |

## Manufacturing Accounting & Month-End Financial Controls

All metrics are from a simulated ERP. January statements are preliminary.

| Claim | Status | Evidence and interpretation |
| --- | --- | --- |
| 6,162 GL posting lines in January 2024 | VERIFIED | All 815,921 rows of CharlesRiver.xlsx, GLEntry!A2:P815922, were scanned. PostingDate from 1 Jan inclusive to 1 Feb exclusive gives 6,162 unique entry IDs across 67 accounts. Fiscal year 2024, period 1 yields the same population. Includes 18 opening-balance lines and 6,144 other lines. This is a count of posting lines. |
| 67 accounts reconciled | VERIFIED | SME workbook, 21_JAN_DIRECT_GL_QA!A2:K68. All account-level line counts, debits and credits agree to cents with the January raw ledger. Debit = credit = 17,905,117.62 in ledger units. |
| 9/9 financial-statement checks | VERIFIED | 24_JAN_FS_RECON!A2:E10. Every listed check passed. This does not establish a complete audit of the business or its subledgers. |
| Ten control findings | VERIFIED | 26_FINAL_CONTROL_REGISTER!A2:E11. Six open, three evidence limitations, one resolved. Findings include a credit manufacturing-clearing balance and a work order completed in January but closed in February. |
| Financial bridge | VERIFIED | 22_JAN_INCOME_STATEMENT!B4:B10. Net revenue 1,416,078.00, COGS 796,990.82, gross profit 619,087.18, operating expenses 335,206.94 and operating profit 283,880.24. The original statement does not identify its currency. The graphic uses shares of net revenue, including 43.72% gross margin and 20.05% operating margin. |
| Scope and next control work | VERIFIED | 00_CASE_SCOPE and 26_FINAL_CONTROL_REGISTER. Selected manufacturing and P2P document traces, incomplete opening-balance, subledger and bank evidence. Recommendations are proposed work. |

## Jenoss — E-commerce Sales Reconstruction & Cost Master Review

This independent case uses the aggregated historical output in Jenoss_Portfolio_Final.xlsx. Workbook totals and arithmetic were checked. The six underlying monthly transaction exports were not among the supplied files for this phase.

| Claim | Status | Evidence and interpretation |
| --- | --- | --- |
| 2,587 raw order lines | VERIFIED | 02_SALES_RECON!A7:C13. Jan–Jun 2025 monthly counts are 472, 469, 459, 183, 456 and 548. The chart measures input rows, not revenue or unique orders. |
| Shipped to commercial | VERIFIED | 02_SALES_RECON!A17:C21. 2,206 marketplace shipped lines / 2,226 units. Of these, 2,120 commercial lines / 2,140 units, 70 Vine, 10 replacement and six other zero-price lines. The 381-line difference from all source lines has no exhaustive disposition in this snapshot. |
| Commercial sales by transaction currency | VERIFIED | 02_SALES_RECON!A25:J27. USD 107,194.68, CAD 3,276.08, MXN 9,934.03. Includes customer-paid shipping after promotions and excludes tax. No cross-currency total. |
| SKU mapping | VERIFIED | 02_SALES_RECON!A34:D34 and 05_AUDIT_EVIDENCE. The workbook reports 65/65 commercial SKUs and 2,206/2,206 shipped lines mapped. Mapping coverage is distinct from cost coverage. |
| 93.3% unit coverage | VERIFIED | 03_COST_COVERAGE!A7:E11. 1,997 / 2,140 commercial units have a candidate cost. 143 are missing (139 USD-market sales units and four CAD-market sales units). Coverage includes imputed costs. |
| 84.6% SKU coverage | VERIFIED | 03_COST_COVERAGE!A15:C18. (53 master + 2 estimated) / 65 commercial SKUs = 84.6%. Ten lack a candidate cost. The 53/2/10 split applies only to SKUs. |
| Cost provenance and exposure | PENDING VERIFICATION | 04_EXCEPTION_REGISTER and 05_AUDIT_EVIDENCE. Cost basis, currency, effective date and number of units associated with the two estimated SKUs are unresolved. Margin, settlement, refunds and GL tie-out are outside the result. Prioritize five active zero-cost internal keys. |
| Mixed-currency shipping evidence | PENDING VERIFICATION | The supplementary shipping table in 02_SALES_RECON contains nominal values across currencies. The site uses native-currency sales rows only. |
