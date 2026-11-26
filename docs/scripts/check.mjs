import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import { commerce as c, manufacturing as m, projects, roles } from '../src/content.mjs';
import { lenses, bridge } from '../src/graphics.mjs';
import { renderPage } from '../src/page.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const dist = resolve(root,'dist');
const html = await readFile(resolve(dist,'index.html'),'utf8');
const css = await readFile(resolve(dist,'site.css'),'utf8');
const js = await readFile(resolve(dist,'interactions.js'),'utf8');
const pdf = await readFile(resolve(dist,'assets/Nguyen-Dinh-Quang-CV.pdf'));
let passed = 0;
async function test(name,run) {
  await run();
  passed += 1;
  console.log('PASS',name);
}
const sum = values => values.reduce((total,value)=>total+value,0);
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map(m=>m[1]);

await test('Output reproduces the current templates and browser sources',async()=>{
  assert.equal(html,renderPage());
  assert.equal(css,await readFile(resolve(root,'src/styles.css'),'utf8'));
  assert.equal(js,await readFile(resolve(root,'src/interactions.js'),'utf8'));
  new Script(js);
});
await test('Unique IDs, anchors, and ARIA relationships resolve',()=>{
  assert.equal(new Set(ids).size,ids.length);
  for(const href of hrefs.filter(h=>h.startsWith('#'))) assert.ok(ids.includes(href.slice(1)),href);
  for(const match of html.matchAll(/\saria-(?:controls|labelledby)="([^"]+)"/g)) {
    for(const target of match[1].split(/\s+/)) assert.ok(ids.includes(target),target);
  }
});
await test('Local HTML, CSS, PDF, font and icon paths resolve inside the output',async()=>{
  const assets = [
    ...[...html.matchAll(/\s(?:src|href)="(\.\/[^"]+)"/g)].map(m=>m[1]),
    ...[...css.matchAll(/url\("(\.\/[^"]+)"\)/g)].map(m=>m[1]),
  ];
  for(const path of new Set(assets)) {
    const full=resolve(dist,path);
    assert.ok(!relative(dist,full).startsWith('..'));
    await access(full);
  }
  assert.match(pdf.toString('ascii',0,8),/^%PDF-/);
  assert.equal((await readdir(resolve(dist,'assets/fonts'))).length,4);
});
await test('One main heading, five sections, two employment records and two independent cases',()=>{
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.equal((html.match(/<section id=/g)||[]).length,5);
  assert.equal(roles.length,2);
  assert.equal(projects.length,2);
  assert.match(html,/<html lang="en">/);
  assert.match(html,/noindex,nofollow/);
});
await test('Projects precede experience in document and both navigation menus',()=>{
  const expected=['overview','projects','experience','profile','contact'];
  assert.deepEqual([...html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]),expected);
  for(const menu of html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)) assert.deepEqual([...menu[1].matchAll(/data-nav="([^"]+)"/g)].map(m=>m[1]),expected.slice(0,4));
  assert.match(html,/class="scroll-cue" href="#projects"/);
  assert.match(html,/01 \/ SELECTED WORK/); assert.match(html,/02 \/ CAREER JOURNEY/);
});
await test('No remote runtime assets, forms, analytics or raw workbooks shipped',async()=>{
  assert.doesNotMatch(html,/\s(?:src|poster)="https?:|<form\b|href="[^"]+\.xlsx"/i);
  assert.doesNotMatch(css,/url\(["']?https?:|@import/i);
  assert.doesNotMatch(js,/sendBeacon\s*\(|fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/);
  assert.deepEqual(hrefs.filter(h=>/^https?:/.test(h)).sort(),['https://github.com/ndq-wpz/','https://www.linkedin.com/in/ndq-wpz/']);
});
await test('January financial statements bridge to operating profit at cent precision',()=>{
  assert.equal(Math.round((m.revenue-m.cogs)*100),Math.round(m.grossProfit*100));
  assert.equal(Math.round((m.grossProfit-m.operatingExpenses)*100),Math.round(m.operatingProfit*100));
  assert.deepEqual(bridge.map(s=>(100*s.value/m.revenue).toFixed(2)),['100.00','56.28','43.72','23.67','20.05']);
  assert.equal(m.glLines-m.openingLines,6144);
  assert.equal(m.accounts,67);assert.equal(m.statementChecks,9);
  assert.equal(sum(Object.values(m.findings)),10);
});
await test('Monthly records, line classifications and units reconcile to the workbook',()=>{
  assert.equal(sum(c.monthly.map(m=>m[2])),c.rawLines);
  assert.equal(c.commercialLines+c.vineLines+c.replacementLines+c.unknownZeroPriceLines,c.shippedLines);
  assert.equal(c.commercialUnits+c.vineLines+c.replacementLines+c.unknownZeroPriceLines,c.shippedUnits);
  assert.equal(sum(c.sales.map(r=>r.units)),c.commercialUnits);
  assert.equal(c.mappedCommercialSkus,65);
});
await test('Unit and SKU denominators reconcile independently',()=>{
  for(const lens of lenses) assert.equal(sum(lens.segments.map(s=>s[1])),lens.total);
  assert.deepEqual(lenses.map(l=>(100*l.counted/l.total).toFixed(1)),['93.3','84.6']);
  assert.equal(c.coverage.costedUnits+c.coverage.missingUnits,c.commercialUnits);
  assert.equal(c.coverage.masterSkus+c.coverage.estimatedSkus+c.coverage.missingSkus,c.mappedCommercialSkus);
});
await test('Currency balances are separately rendered and the chart has a textual alternative',()=>{
  for(const row of c.sales){
    const amount=row.amount.toLocaleString('en-US',{minimumFractionDigits:2});
    assert.ok(html.includes(`<th scope="row">${row.currency}</th><td>${row.units.toLocaleString('en-US')}</td><td>${amount}</td>`));
  }
  assert.equal((html.match(/data-point="/g)||[]).length,11);
  assert.equal((html.match(/class="plot-status"/g)||[]).length,2);
  assert.equal((html.match(/class="static-values"/g)||[]).length,2);
});
const index = process.argv.indexOf('--portable-dir');
if (index !== -1) {
  await test('Portable HTML embeds identical PDF bytes, fonts and executable scripts',async()=>{
    const directory=resolve(process.argv[index+1]);
    const standalone=await readFile(resolve(directory,'NDQ-Portfolio-v0.1.2.html'),'utf8');
    assert.doesNotMatch(standalone,/(?:href|src)="\.\/assets|src="\.\/interactions|href="\.\/site\.css/);
    const links=[...standalone.matchAll(/href="data:application\/pdf;base64,([^"]+)"/g)];
    assert.equal(links.length,2);
    for(const [,encoded] of links) assert.ok(Buffer.from(encoded,'base64').equals(pdf));
    assert.equal((standalone.match(/data:font\/woff2;base64,/g)||[]).length,4);
    const reviewer=await readFile(resolve(directory,'NDQ-Responsive-Preview-v0.1.2.html'),'utf8');
    for(const page of [standalone,reviewer]) {
      assert.doesNotMatch(page,/<iframe\b|srcdoc=/i);
      const scripts=[...page.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
      assert.equal(scripts.length,page===standalone?1:2);
      for(const [,code] of scripts)new Script(code);
    }
  });
}
console.log(`${passed} check groups passed.`);
