import { commerce, manufacturing as m } from './content.mjs';

const paths = {
  download: '<path d="M12 3v11m-4-4 4 4 4-4M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  bank: '<path d="m3 9 9-6 9 6H3Zm2 11h14M7 11v6m5-6v6m5-6v6"/>',
  ledger: '<path d="M5 3h13a1 1 0 0 1 1 1v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 0v17m3-12h5m-5 4h5"/>',
  boxes: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9M8 5.2l8 4.5"/>',
  focus: '<circle cx="12" cy="12" r="6.8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
  github: '<path d="M8 20c-3 1-3-2-5-2m13 4v-3.5c0-.8-.2-1.4-.7-1.8 2.9-.3 5.9-1.4 5.9-6.4a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.4-3.6 1.4a12 12 0 0 0-6.5 0C7.1 2.9 6 3.3 6 3.3a4.7 4.7 0 0 0-.1 3.5 5 5 0 0 0-1.4 3.5c0 5 3 6.1 5.9 6.4-.5.4-.8 1.1-.8 1.8V22"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v7m4-7v7m0-4a3 3 0 0 1 6 0v4"/><circle cx="7.5" cy="7" r=".65"/>',
  menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>',
  close: '<path d="m6 6 12 12m0-12L6 18"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  plus: '<path d="M5 12h14m-7-7v14"/>',
};
export function icon(name, size = 20) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

export const brandMark = '<svg class="brand-mark" width="32" height="32" viewBox="0 0 38 38" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><path d="m3 24 12-16 8 11-12 16z"/><path d="m11 22 12-16 11 15-12 15z"/></g></svg>';

const coverage = commerce.coverage;
const skuTotal = coverage.masterSkus + coverage.estimatedSkus + coverage.missingSkus;
export const lenses = [
  {
    key: 'units', label: 'Units', total: commerce.commercialUnits,
    counted: coverage.costedUnits, unit: 'units',
    segments: [['mint', coverage.costedUnits, 'With candidate cost'], ['amber', coverage.missingUnits, 'Missing']],
    note: 'Candidate costs include estimates for two SKUs.',
  },
  {
    key: 'skus', label: 'SKUs', total: skuTotal,
    counted: coverage.masterSkus + coverage.estimatedSkus, unit: 'SKUs',
    segments: [['mint', coverage.masterSkus, 'Master'], ['blue', coverage.estimatedSkus, 'Estimated'], ['amber', coverage.missingSkus, 'Missing']],
    note: 'The cost basis and effective dates still require verification.',
  },
];
export const fmt = new Intl.NumberFormat('en-US');
const round = n => Math.round(n * 100) / 100;
const rad = deg => deg * Math.PI / 180;
function point(radius, deg, dy = 0) {
  return [round(240 + radius * Math.cos(rad(deg))), round(113 + radius * 0.59 * Math.sin(rad(deg)) + dy)];
}
function arc(radius, start, end, dy = 0) {
  const sweep = end > start ? 1 : 0;
  return `A${radius},${round(radius * .59)} 0 ${Math.abs(end - start) > 180 ? 1 : 0},${sweep} ${point(radius,end,dy)}`;
}
function arcPath(r, a, b, dy = 0) {
  return `M${point(r,a,dy)}${arc(r,a,b,dy)}`;
}
function band(rOuter, rInner, a, b) {
  return `${arcPath(rOuter,a,b)}L${point(rInner,b)}${arc(rInner,b,a)}Z`;
}
function wallPath(r,a,b) {
  return `${arcPath(r,a,b)}L${point(r,b,13)}${arc(r,b,a,13)}Z`;
}

// A segment's angle encodes its share. Perspective applies equally to both radii.
// Hairlines and side walls describe the surface and carry no separate measure.
export function instrument(lens) {
  const id = lens.key;
  const gradient = (name, start, middle, end) => `<linearGradient id="${id}-${name}" x1="0%" y1="3%" x2="95%" y2="92%"><stop stop-color="${start}"/><stop offset=".55" stop-color="${middle}"/><stop offset="1" stop-color="${end}"/></linearGradient>`;
  let defs = gradient('mint','#1d716b','#81e2c3','#1e8d8b') +
    gradient('amber','#a86f35','#e7b77a','#775333') +
    gradient('blue','#4c83a7','#b6d5ff','#5399c9');
  defs += `<radialGradient id="${id}-shadow"><stop stop-color="#020c12" stop-opacity=".82"/><stop offset="1" stop-color="#020c12" stop-opacity="0"/></radialGradient>`;
  let base = `<ellipse cx="240" cy="151" rx="191" ry="88" fill="url(#${id}-shadow)"/>`;
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 4) {
    const major = deg % 20 === 0;
    ticks.push(`M${point(181,deg,5)}L${point(major ? 189 : 184,deg,5)}`);
  }
  base += `<path d="${ticks.join('')}" fill="none" stroke="#577b80" stroke-width=".85" opacity=".65"/><ellipse cx="240" cy="118" rx="177.5" ry="104.7" fill="none" stroke="#3c6469" stroke-width=".65" stroke-dasharray="2 4"/>`;

  let start = -32;
  let sides = '', surfaces = '', etching = '';
  for (const [tone,count] of lens.segments) {
    const end = start + 360 * count / lens.total;
    const gap = .65;
    const a = start + gap, b = end - gap;
    const dark = { mint: '#165a56', blue: '#385e7f', amber: '#64503a' }[tone];
    sides += `<path fill="${dark}" d="${wallPath(162,a,b)}"/><path fill="${dark}" d="${wallPath(111,a,b)}"/>`;
    for (let layer = 2; layer < 13; layer += 2.7) {
      sides += `<path d="${arcPath(162,a,b,layer)}" fill="none" stroke="#b2dccc" stroke-opacity=".18" stroke-width=".72"/>`;
    }
    surfaces += `<path d="${band(162,111,a,b)}" stroke="${dark}" stroke-width=".8" fill="url(#${id}-${tone})"/>`;
    const rings = [];
    for (let r = 113; r < 162; r += 3.25) rings.push(arcPath(r,a,b));
    etching += `<path d="${rings.join('')}" fill="none" stroke="#d8fff1" stroke-opacity=".48" stroke-width=".72"/>`;
    const lines = [];
    for (let deg = a; deg < b; deg += 3) lines.push(`M${point(111,deg)}L${point(162,deg)}`);
    etching += `<path d="${lines.join('')}" fill="none" stroke="#092e39" stroke-width=".8" stroke-opacity=".58"/><path d="${arcPath(162,a,b)}" fill="none" stroke="#e0fff1" stroke-width="1.15" stroke-opacity=".7"/>`;
    start = end;
  }
  const percent = (lens.counted / lens.total * 100).toFixed(1);
  return `<svg class="instrument" viewBox="0 0 480 232" aria-hidden="true" focusable="false"><defs>${defs}</defs>${base}<g class="ring-body">${sides}${surfaces}${etching}</g><text x="240" y="119" class="dial-number" text-anchor="middle"><tspan data-counter="${percent}" data-precision="1">${percent}</tspan><tspan class="dial-percent">%</tspan></text><text x="240" y="141" class="dial-label" text-anchor="middle">of ${fmt.format(lens.total)} ${lens.unit}</text></svg>`;
}

export function lensPanel() {
  const switches = lenses.map((l, i) => `<label><input type="radio" name="lens" value="${l.key}"${i === 0 ? ' checked' : ''} aria-controls="panel-${l.key}"><span>${l.label}</span></label>`).join('');
  const panels = lenses.map((l, i) => `<div id="panel-${l.key}" data-lens="${l.key}"${i ? ' hidden' : ''}>
    <p class="sr-only">${(100*l.counted/l.total).toFixed(1)}% of ${fmt.format(l.total)} commercial ${l.unit} have a candidate cost.</p>
    <div class="dial-field">${instrument(l)}<i class="register-marks" aria-hidden="true"></i></div>
    <ul class="legend">${l.segments.map(([tone, value, label]) => `<li><i class="swatch ${tone}"></i><b>${fmt.format(value)}</b> ${label}</li>`).join('')}</ul>
    <p class="lens-note">${l.note}</p>
  </div>`).join('');
  return `<figure class="lens-card spotlight" aria-labelledby="lens-title">
    <div class="lens-meta"><span class="micro"><i class="scan-icon" aria-hidden="true"></i> Project lens</span><span>Jan–Jun 2025</span></div>
    <div class="lens-head"><h2 id="lens-title">Product cost coverage</h2><fieldset class="segmented js-control"><legend class="sr-only">Coverage denominator</legend>${switches}</fieldset></div>
    <div class="lens-panes">${panels}</div>
    <figcaption>Source: Jenoss · Amazon commercial orders</figcaption>
  </figure>`;
}

export const bridge = [
  { short: 'Revenue', name: 'Net revenue', value: m.revenue, bottom: 0, top: m.revenue, kind: 'total' },
  { short: 'COGS', name: 'Cost of goods sold', value: m.cogs, bottom: m.grossProfit, top: m.revenue, kind: 'cost' },
  { short: 'Gross', name: 'Gross profit', value: m.grossProfit, bottom: 0, top: m.grossProfit, kind: 'total' },
  { short: 'Opex', name: 'Operating expenses', value: m.operatingExpenses, bottom: m.operatingProfit, top: m.grossProfit, kind: 'cost' },
  { short: 'Op. profit', name: 'Operating profit', value: m.operatingProfit, bottom: 0, top: m.operatingProfit, kind: 'total' },
];
const chartWidth = 420, chartHeight = 103, topInset = 7;
function grid(scale, format) {
  return [0,.5,1].map(f => `<div class="tick" style="--level:${f}"><span>${format(f*scale)}</span></div>`).join('');
}
function seriesSVG(points, kind) {
  const step = chartWidth / points.length;
  const x = i => (i + .5) * step;
  if (kind === 'bridge') {
    const y = value => round(topInset + chartHeight * (1 - value / m.revenue));
    const bars = points.map((p,i) => {
      const h = y(p.bottom) - y(p.top);
      const link = i < points.length - 1 ? `<path d="M${x(i)+step*.25} ${y(p.kind === 'cost' ? p.bottom : p.top)} h${step*.5}" class="bridge-link"/>` : '';
      return `${link}<rect x="${round(x(i)-step*.25)}" y="${y(p.top)}" width="${round(step*.5)}" height="${h}" rx="1.5" class="bar ${p.kind}" fill="url(#bar-${p.kind})"/>`;
    }).join('');
    return `<defs><linearGradient id="bar-total" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#a6e8c8"/><stop offset="1" stop-color="#408f83"/></linearGradient><pattern id="bar-cost" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#886b4c"/><path d="m-1 1 2-2m-1 6 5-5m-2 7 4-4" stroke="#d5b785" stroke-width=".85"/></pattern></defs>${bars}`;
  }
  const xy = points.map((p,i) => [x(i),round(topInset + chartHeight*(1-p.value/600))]);
  const line = xy.map(([a,b],i) => `${i ? 'L':'M'}${a} ${b}`).join('');
  return `<defs><linearGradient id="series-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#78b9f1" stop-opacity=".33"/><stop offset="1" stop-color="#78b9f1" stop-opacity=".015"/></linearGradient></defs><path fill="url(#series-fill)" d="${line} L${x(xy.length-1)} 110 L${x(0)} 110Z"/><path class="series-line" d="${line}"/>${xy.map(([a,b]) => `<circle cx="${a}" cy="${b}" r="3.6" fill="#101f32" stroke="#a4d3ff" stroke-width="2"/>`).join('')}`;
}
export function projectChart(project) {
  const close = project.id === 'manufacturing';
  const data = close ? bridge : commerce.monthly.map(([short,name,value]) => ({short,name,value}));
  const description = p => close ? `${p.name} · ${(100*p.value/m.revenue).toFixed(2)}% of net revenue` : `${p.name} · ${fmt.format(p.value)} raw order lines`;
  const last = data.length - 1;
  return `<figure class="project-chart ${close ? 'profit-chart':'orders-chart'}" aria-label="${close ? 'January income statement as shares of net revenue':'Monthly raw Amazon order lines'}">
    <div class="chart-top"><span>${close ? 'Profit bridge' : 'Order intake'}</span><small>${close ? '% of net revenue' : 'Raw order lines'}</small></div>
    <div class="plot" style="--count:${data.length};--selected:${last}">
      <div class="plot-grid" aria-hidden="true">${grid(close ? 100 : 600, v => close ? `${v}%` : v)}</div>
      <div class="plot-drawing"><svg viewBox="0 0 420 112" preserveAspectRatio="none" aria-hidden="true">${seriesSVG(data,close ? 'bridge':'orders')}</svg></div>
      <div class="plot-picks" role="group" aria-label="${close ? 'Select a profit bridge item':'Select a month'}">${data.map((p,i) => `<button type="button" data-point="${i}" data-readout="${description(p)}" aria-label="${description(p)}" aria-pressed="${i===last}"><span>${p.short}</span></button>`).join('')}</div>
    </div>
    <figcaption class="plot-status" aria-live="polite" aria-atomic="true">${description(data[last])}</figcaption>
    <noscript><ul class="static-values">${data.map(p=>`<li>${description(p)}</li>`).join('')}</ul></noscript>
  </figure>`;
}
