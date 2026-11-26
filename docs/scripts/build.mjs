import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from '../src/page.mjs';
import { reviewPage } from './review.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const dist = resolve(root,'dist');
const [css,js] = await Promise.all(['src/styles.css','src/interactions.js'].map(f=>readFile(resolve(root,f),'utf8')));
const html = renderPage();
await mkdir(dist,{recursive:true});
await cp(resolve(root,'assets'),resolve(dist,'assets'),{recursive:true});
await Promise.all([
  writeFile(resolve(dist,'index.html'),html),writeFile(resolve(dist,'site.css'),css),
  writeFile(resolve(dist,'interactions.js'),js),writeFile(resolve(dist,'review.html'),reviewPage(html,css)),
]);

const outIndex = process.argv.indexOf('--portable-dir');
if (outIndex !== -1) {
  if (!process.argv[outIndex+1]) throw new Error('Supply a directory after --portable-dir.');
  const out = resolve(process.argv[outIndex+1]);
  await mkdir(out,{recursive:true});
  async function inline(path,mime) {
    const bytes = await readFile(resolve(root,path));
    return `data:${mime};base64,${bytes.toString('base64')}`;
  }
  let inlineCss = css;
  for (const match of css.matchAll(/url\("(\.\/assets\/fonts\/[^"]+)"\)/g)) {
    inlineCss = inlineCss.replace(match[0],`url("${await inline(match[1],'font/woff2')}")`);
  }
  const cv = await inline('./assets/Nguyen-Dinh-Quang-CV.pdf','application/pdf');
  const favicon = await inline('./assets/mark.svg','image/svg+xml');
  const portable = html
    .replace('<link rel="stylesheet" href="./site.css">',()=>`<style>${inlineCss}</style>`)
    .replace('<script src="./interactions.js" defer></script>','')
    .replace('</body>',()=>`<script>${js}</script></body>`)
    .replaceAll('./assets/Nguyen-Dinh-Quang-CV.pdf',cv).replace('./assets/mark.svg',favicon);
  await writeFile(resolve(out,'NDQ-Portfolio-v0.1.2.html'),portable);
  await writeFile(resolve(out,'NDQ-Responsive-Preview-v0.1.2.html'),reviewPage(portable));
}
console.log('Built static portfolio and responsive viewer in dist/.');
