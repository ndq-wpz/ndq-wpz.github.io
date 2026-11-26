import { person, roles, projects, capabilities, credentials, commerce, manufacturing as m } from './content.mjs';
import { brandMark, icon, lensPanel, projectChart, fmt } from './graphics.mjs';

const navigation = [['overview','Overview'],['projects','Projects'],['experience','Experience'],['profile','Profile']];
const navigationLinks = navigation.map(([id,label]) => `<a href="#${id}" data-nav="${id}"${id==='overview'?' aria-current="location"':''}>${label}</a>`).join('');
const cvLink = (label = 'Download CV') => `<a class="button quiet" href="${person.cv}" download="Nguyen-Dinh-Quang-CV.pdf">${icon('download',17)}${label}</a>`;

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div class="scroll-line" aria-hidden="true"><span></span></div>
  <header class="masthead">
    <a class="brand" href="#overview" aria-label="Nguyen Dinh Quang, overview">${brandMark}<span>NDQ<span class="brand-period">.</span></span></a>
    <nav class="desktop-nav" aria-label="Primary">${navigationLinks}</nav>
    <div class="nav-actions"><a href="#contact" class="nav-contact" data-nav="contact">${icon('mail',15)}<span>Contact</span></a>
    <button class="nav-toggle js-control" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation">${icon('menu')}${icon('close')}</button></div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">${navigationLinks}</nav>
  </header>`;
}
function metric(value, suffix, label, source) {
  return `<div class="metric"><dt>${label}</dt><dd><strong aria-hidden="true"><span data-counter="${value}">${fmt.format(value)}</span>${suffix ? `<span class="metric-tail">${suffix}</span>` : ''}</strong><span class="sr-only">${fmt.format(value)}${suffix}</span><small>${source}</small></dd></div>`;
}
function hero() {
  return `<section id="overview" class="overview" aria-labelledby="hero-name">
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="discipline"><span aria-hidden="true"></span>${person.discipline}</div>
      <h1 id="hero-name">Nguyen Dinh<br><em>Quang<span>.</span></em></h1>
      <p class="positioning">${person.positioning}</p>
      <p class="tagline">${person.tagline}</p>
      <p class="hero-bio">Accounting logic, business analysis and data automation — connected through hands-on projects and professional experience.</p>
      <div class="hero-actions"><a class="button primary" href="#projects">${icon('layers',17)}Explore projects</a>${cvLink()}</div>
      <p class="location">${icon('pin',15)}${person.city}</p>
    </div>
    <div class="hero-art"><div class="orbit-art" aria-hidden="true"><i></i><i></i><i></i></div><div class="visual-caption"><span class="live-dot"></span> FINANCIAL DATA / PROJECT EVIDENCE</div>${lensPanel()}<div class="floating-evidence" aria-hidden="true"><span class="float-icon">${icon('ledger',19)}</span><div><small>Simulated ERP · Jan 2024</small><strong>67/67 <span>accounts reconciled</span></strong></div></div></div>
  </div>
  <dl class="evidence-strip" aria-label="Selected evidence from independent projects">
  ${metric(m.glLines,'','General ledger lines','Simulated ERP · Jan 2024')}
  ${metric(m.accounts,'','Accounts reconciled','Simulated ERP · Jan 2024')}
  ${metric(commerce.mappedCommercialSkus,'/65','Commercial SKUs mapped','Jenoss · Jan–Jun 2025')}
  </dl><a class="scroll-cue" href="#projects"><span></span> Explore projects ${icon('chevron',16)}</a>
  </section>`;
}

function experience() {
  return `<section id="experience" class="section split" aria-labelledby="experience-title">
    <div class="section-intro reveal"><span class="section-kicker">02 / CAREER JOURNEY</span><h2 id="experience-title" class="display">Experience</h2><p>Commercial analysis and corporate banking in practice.</p></div>
    <div class="role-list">${roles.map(r=>`<article class="role spotlight reveal" id="${r.id}">
      <div class="role-icon" aria-hidden="true">${icon(r.icon,23)}</div>
      <div class="role-body"><div class="role-heading"><h3>${r.company}</h3><span class="period">${r.start} – ${r.end}</span></div>
      <p class="role-title">${r.title}</p><p class="role-summary">${r.summary}</p>${r.id === 'jenoss-role' ? `<div class="role-tags"><span>Cost-based pricing</span><span>Management reporting</span><span>Excel · Power BI</span></div>` : `<div class="role-flow" aria-label="Corporate information collection workflow"><span>Web data</span><i>→</i><span>Python</span><i>→</i><span>SQL</span></div>`}
      <details class="disclosure"><summary><span class="when-closed">Role details</span><span class="when-open">Close details</span>${icon('chevron',15)}</summary><div class="detail-body"><p>${r.detail}</p></div></details></div>
    </article>`).join('')}</div>
  </section>`;
}

function evidenceTable(project) {
  if (project.id === 'manufacturing') {
    return `<div class="table-wrap"><table><caption>January close control register</caption><thead><tr><th scope="col">Finding status</th><th scope="col">Items</th></tr></thead><tbody><tr><th scope="row">Open</th><td>${m.findings.open}</td></tr><tr><th scope="row">Evidence limitation</th><td>${m.findings.evidenceLimitations}</td></tr><tr><th scope="row">Resolved</th><td>${m.findings.resolved}</td></tr></tbody></table></div>`;
  }
  return `<div class="table-wrap"><table><caption>Commercial sales by transaction currency</caption><thead><tr><th scope="col">Currency</th><th scope="col">Units</th><th scope="col">Sales</th></tr></thead><tbody>${commerce.sales.map(row=>`<tr><th scope="row">${row.currency}</th><td>${fmt.format(row.units)}</td><td>${row.amount.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td></tr>`).join('')}</tbody></table></div>`;
}
function projectCard(project) {
  const close = project.id === 'manufacturing';
  const result = close ? `<strong>${m.statementChecks}/${m.statementChecks}</strong> statement checks passed <span>·</span> <strong>10</strong> findings` : `<strong>${fmt.format(commerce.rawLines)}</strong> source lines <span>·</span> <strong>${fmt.format(commerce.shippedLines)}</strong> shipped`;
  const paragraphs = [['Objective',project.objective],['Method',project.method],['Finding',project.finding],['Recommended action',project.action]];
  return `<article id="${project.id}" class="project-card spotlight reveal" aria-labelledby="title-${project.id}">
    <div class="project-meta"><span class="source-kind">${icon(project.icon,16)}${project.source}</span><span class="period">${project.period}</span></div>
    <h3 id="title-${project.id}">${project.title}</h3>
    <p class="project-intro">${project.intro}</p>
    ${projectChart(project)}
    <p class="project-result">${result}</p>
    <details class="case-details disclosure" id="detail-${project.id}">
      <summary><span class="when-closed">Explore case study</span><span class="when-open">Close case study</span>${icon('plus',18)}</summary>
      <div class="detail-body"><dl class="case-notes">${paragraphs.map(([k,v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${evidenceTable(project)}
      <p class="scope"><b>Scope.</b> ${project.limits}</p>
      <p class="source-line"><b>Source.</b> ${project.citation}</p></div>
    </details>
  </article>`;
}
function projectSection() {
  return `<section id="projects" class="section projects-section" aria-labelledby="projects-title">
    <div class="section-bar reveal"><div><span class="section-kicker">01 / SELECTED WORK</span><h2 id="projects-title" class="display">Selected projects</h2><p>Independent case studies in manufacturing accounting and e-commerce controls.</p></div></div>
    <div class="project-grid">${projects.map(projectCard).join('')}</div>
  </section>`;
}

function profile() {
  return `<section id="profile" class="section" aria-labelledby="profile-title">
    <div class="section-bar reveal"><div><span class="section-kicker">03 / CAPABILITIES &amp; CREDENTIALS</span><h2 id="profile-title" class="display">Professional profile</h2></div></div>
    <div class="profile-grid">
      <div class="capabilities spotlight reveal"><h3 class="subhead">Capabilities</h3><ul>${capabilities.map(c=>`<li><h4>${c.name}</h4><p>${c.text}</p><a class="evidence-link" href="#detail-${c.target}" data-case="${c.target}">${c.evidence}</a></li>`).join('')}</ul></div>
      <div class="education spotlight reveal"><h3 class="subhead">Education & credentials</h3>
        <p class="edu-period">2022–2026</p><h4>National Economics University</h4>
        <p>Bachelor of Financial Investment (BFI)</p>
        <ul class="credentials">${credentials.map(([name,detail])=>`<li><strong>${name}</strong><span>${detail}</span></li>`).join('')}</ul>
        <p class="study"><b>Independent study</b><br>CMA curriculum in management accounting and financial management.</p>
      </div>
    </div></section>`;
}
function contact() {
  return `<section id="contact" class="contact section" aria-labelledby="contact-title">
    <div class="contact-inner reveal"><div><span class="section-kicker">04 / CONTACT</span><h2 id="contact-title" class="display">Let’s <em>connect.</em></h2>
    <p>For accounting and finance opportunities.</p></div>
    <div class="contact-links"><a class="email-link" href="mailto:${person.email}">${person.email}</a>
    <div class="socials"><a href="${person.linkedIn}">${icon('linkedin',16)}LinkedIn</a><a href="${person.gitHub}">${icon('github',16)}GitHub</a>${cvLink()}</div>
    </div></div></section>`;
}
export function renderPage() {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nguyen Dinh Quang | Accounting & Finance</title>
<meta name="description" content="Nguyen Dinh Quang’s accounting and finance portfolio. Explore independent work in manufacturing close controls, sales reconstruction and product cost coverage.">
<meta name="theme-color" content="#0a101c"><meta name="robots" content="noindex,nofollow">
<link rel="icon" type="image/svg+xml" href="./assets/mark.svg">
<link rel="stylesheet" href="./site.css">
<script src="./interactions.js" defer></script>
</head><body>
<div class="ambient" aria-hidden="true"><i></i><i></i><i></i></div>${header()}<main id="main" class="container" tabindex="-1">${hero()}${projectSection()}${experience()}${profile()}${contact()}</main>
<footer class="footer container"><span>Nguyen Dinh Quang</span><span>Accounting & Finance · Hanoi, Vietnam</span><div class="footer-tools"><label class="motion-option js-control"><input type="checkbox" id="motion-toggle">Reduce motion</label><a href="#overview">Back to top</a></div></footer>
</body></html>`;
}
