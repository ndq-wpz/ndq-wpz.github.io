// Evidence values are read at build time. Worksheet references are documented in CONTENT_REGISTER.md.
export const person = {
  name: 'Nguyen Dinh Quang',
  positioning: 'Financial Systems & Controls',
  discipline: 'Accounting & Finance',
  tagline: 'Turning financial data into control, insight and action.',
  city: 'Hanoi, Vietnam',
  email: 'dinhquangng24@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/ndq-wpz/',
  gitHub: 'https://github.com/ndq-wpz/',
  cv: './assets/Nguyen-Dinh-Quang-CV.pdf',
};

export const manufacturing = {
  period: 'January 2024',
  accounts: 67,
  glLines: 6162,
  openingLines: 18,
  statementChecks: 9,
  findings: { open: 6, evidenceLimitations: 3, resolved: 1 },
  revenue: 1416078,
  cogs: 796990.82,
  grossProfit: 619087.18,
  operatingExpenses: 335206.94,
  operatingProfit: 283880.24,
};

export const commerce = {
  period: 'Jan–Jun 2025',
  monthly: [
    ['Jan', 'January', 472], ['Feb', 'February', 469],
    ['Mar', 'March', 459], ['Apr', 'April', 183],
    ['May', 'May', 456], ['Jun', 'June', 548],
  ],
  rawLines: 2587, shippedLines: 2206, shippedUnits: 2226,
  commercialLines: 2120, commercialUnits: 2140,
  vineLines: 70, replacementLines: 10, unknownZeroPriceLines: 6,
  mappedCommercialSkus: 65,
  coverage: {
    costedUnits: 1997, missingUnits: 143,
    masterSkus: 53, estimatedSkus: 2, missingSkus: 10,
  },
  sales: [
    { currency: 'USD', amount: 107194.68, units: 2090 },
    { currency: 'CAD', amount: 3276.08, units: 42 },
    { currency: 'MXN', amount: 9934.03, units: 8 },
  ],
};

export const roles = [
  {
    id: 'jenoss-role', company: 'Jenoss', title: 'R&D and Business Intelligence',
    start: 'Mar 2025', end: 'Feb 2026', icon: 'layers',
    summary: 'Analyzed product costs, pricing and promotions for an e-commerce business.',
    detail: 'Compared COGS, marketing spend and agent costs across product variants. Built Excel and Power BI dashboards for sales performance, advertising efficiency and portfolio reviews.',
  },
  {
    id: 'mb-role', company: 'MB Hoang Mai', title: 'Corporate Banking Intern',
    start: 'Mar 2025', end: 'Jun 2026', icon: 'bank',
    summary: 'Researched corporate lending performance and automated the collection of company tax IDs.',
    detail: 'Used Python to extract corporate tax IDs and load structured records into SQL. Reviewed portfolio quality and operating efficiency for an internship report covering 2021–2025.',
  },
];

export const projects = [
  {
    id: 'manufacturing', source: 'Simulated ERP', period: 'Jan 2024', icon: 'ledger',
    title: 'Manufacturing Accounting & Month-End Financial Controls',
    intro: 'Reconstructed a January close from source documents to the trial balance and preliminary financial statements.',
    objective: 'Trace a manufacturing order and a purchase-to-pay cycle, then test whether the January ledger supports the reported balances.',
    method: 'Followed material issues, work in progress, goods receipts, invoices and payments. Reconciled account movements in Power Query and tied the closing trial balance to the preliminary statements.',
    finding: 'All 67 accounts and nine statement checks tied. A credit balance in manufacturing clearing and a work order closed in February still warranted investigation.',
    action: 'Review clearing entries against the work-order history and obtain independent subledger and bank reconciliations before sign-off.',
    limits: 'The Charles River ledger is simulated. Selected document traces cover individual cases. Bank, subledger and opening-balance evidence is incomplete.',
    citation: 'Charles River GLEntry and the SME workbook, sheets 21, 22, 24 and 26.',
  },
  {
    id: 'jenoss', source: 'Historical business data', period: 'Jan–Jun 2025', icon: 'boxes',
    title: 'Jenoss — E-commerce Sales Reconstruction & Cost Master Review',
    intro: 'Rebuilt Amazon commercial sales in three currencies and identified where product costs were missing or estimated.',
    objective: 'Identify which shipped lines generated commercial sales and how many units support product-cost analysis.',
    method: 'Consolidated six Amazon Orders files in Power Query. Isolated commercial, Vine, replacement and unknown zero-price lines before joining the SKU and cost masters.',
    finding: 'All 65 commercial SKUs mapped. The cost review identified 53 SKUs with master costs, two with estimates and ten with missing costs.',
    action: 'Prioritize the five active zero-cost internal SKU keys. Verify cost currency, basis and effective dates before reporting product margins.',
    limits: 'Order-level sales exclude tax. Settlement, refunds, bank records and general-ledger balances still require reconciliation. The source snapshot gives no unit count for the two estimated SKUs.',
    citation: 'Jenoss Portfolio Final, Sales Recon, Cost Coverage and Exception Register.',
  },
];

export const capabilities = [
  { name: 'Accounting & close', text: 'Journal entries, manufacturing costing, trial balance and financial reporting.', target: 'manufacturing', evidence: 'Manufacturing close' },
  { name: 'Financial controls', text: 'Source-document tracing, reconciliation, exception review and cut-off analysis.', target: 'manufacturing', evidence: 'Control findings' },
  { name: 'Financial data systems', text: 'Excel and Power Query for transaction classification, SKU mapping and cost review.', target: 'jenoss', evidence: 'Sales reconstruction' },
];

export const credentials = [
  ['Microsoft Office Specialist', 'Excel 2019 and Word 2019'],
  ['HackerRank', 'SQL (Intermediate)'],
  ['IBM', 'Excel for Data Analysis · Data Analysis with Python'],
];
