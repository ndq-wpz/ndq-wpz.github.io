// Only the review edition translates viewport breakpoints into document-width queries.
export function reviewPage(html, css = '') {
  const adapt = sheet => sheet.replace(/@media\((min|max)-width:(\d+)px\)/g,'@container review ($1-width:$2px)')
    .replace('@container review (min-width:1450px){:root','@container review (min-width:1450px){body')
    .replace(/(\d)vw\b/g,'$1cqw');
  const controls = `<aside class="review-tools" aria-label="Responsive preview"><strong>NDQ · Prototype v0.1.2</strong><div class="review-options">
  <button type="button" data-size="0" aria-pressed="true">Fit</button><button type="button" data-size="1280" aria-pressed="false">Desktop</button>
  <button type="button" data-size="768" aria-pressed="false">Tablet</button><button type="button" data-size="390" aria-pressed="false">Phone</button>
  <label>Width <input aria-label="Viewport width in pixels" type="number" min="280" max="2560"></label>
  <button type="button" class="review-full">Full page</button></div></aside>`;
  const toolbarCSS = `html{container:review / inline-size;max-width:var(--review-width,100%);margin-inline:auto}
  .review-tools{font:14px/1.4 system-ui,sans-serif;background:#14202c;color:#e8eeec;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;border-bottom:1px solid #43535b}
  .review-options{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
  .review-tools button,.review-tools input{font:inherit;border-radius:5px;border:1px solid #43535b;padding:5px 8px;color:#e3ece8;background:#172b31}
  .review-tools button[aria-pressed=true]{background:#30584b}.review-tools input{width:70px}
  html:not(.enhanced) .review-tools{display:none}`;
  const script = `(()=>{
    const root=document.documentElement, bar=document.querySelector('.review-tools'), width=bar.querySelector('input');
    let chosen=0;
    function apply(size){
      chosen=size;root.style.setProperty('--review-width',size?size+'px':'100%');
      width.value=size||innerWidth;
      for(const b of bar.querySelectorAll('[data-size]'))b.setAttribute('aria-pressed',String(+b.dataset.size===size));
      const toggle=document.querySelector('.nav-toggle');
      if(toggle?.getAttribute('aria-expanded')==='true')toggle.click();
    }
    bar.addEventListener('click',e=>{
      const preset=e.target.closest('[data-size]');
      if(preset)apply(+preset.dataset.size);
      if(e.target.closest('.review-full')){apply(0);bar.hidden=true;document.querySelector('.brand').focus();}
    });
    width.addEventListener('input',()=>{if(width.validity.valid && width.value)apply(Number(width.value))});
    width.addEventListener('change',()=>apply(Math.min(2560,Math.max(280,Number(width.value)||390))));
    addEventListener('resize',()=>{if(!chosen)width.value=innerWidth});
    apply(0);
  })();`;
  let page = css ? html.replace('<link rel="stylesheet" href="./site.css">',()=>'<style>'+adapt(css)+'</style>') :
    html.replace(/<style>([\s\S]*?)<\/style>/,(_,sheet)=>'<style>'+adapt(sheet)+'</style>');
  return page.replace('</head>',()=>'<style>'+toolbarCSS+'</style></head>')
    .replace('<body>',()=>'<body>'+controls)
    .replace('</body>',()=>'<script id="review-sizing">'+script+'</script></body>');
}
