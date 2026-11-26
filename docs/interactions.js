// The HTML already contains each section, the default charts and all disclosures.
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const motionToggle = document.getElementById('motion-toggle');
  let manualReduction = false;
  const reducedMotion = () => reduced.matches || manualReduction;
  const numberFormat = new Intl.NumberFormat('en-US');
  const motionFrames = new Map();
  const counted = new WeakSet();
  const header = document.querySelector('.masthead');
  const menuButton = header.querySelector('.nav-toggle');
  const mobileMenu = header.querySelector('.mobile-nav');
  const navLinks = [...header.querySelectorAll('[data-nav]')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const progressLine = document.querySelector('.scroll-line span');
  const formatValue = (value, decimals) => decimals ? value.toFixed(decimals) : numberFormat.format(Math.round(value));

  // Keep the offline download on a short, same-origin URL, including inside a preview frame.
  const embeddedCvLinks = [...document.querySelectorAll('a[download][href^="data:application/pdf;base64,"]')];
  if (embeddedCvLinks.length) {
    const encoded = embeddedCvLinks[0].getAttribute('href').split(',')[1];
    const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
    const pdfUrl = URL.createObjectURL(new Blob([bytes], {type:'application/pdf'}));
    embeddedCvLinks.forEach(link => { link.href = pdfUrl; });
  }

  function closeMenu(restoreFocus = false) {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileMenu.classList.remove('open');
    if (restoreFocus) menuButton.focus({ preventScroll: true });
  }
  menuButton.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') return closeMenu(true);
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close navigation');
    mobileMenu.classList.add('open');
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) || event.target.closest('a[href^="#"]')) closeMenu();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
  });

  let pendingScroll = false;
  function trackLocation() {
    pendingScroll = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const percent = Math.max(0, Math.min(1, scrollY / max));
    progressLine.style.transform = `scaleX(${percent})`;
    document.documentElement.style.setProperty('--scroll-phase', String(Math.min(scrollY / 700, 1)));
    const offset = Math.min(innerHeight * .28, 170);
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    }
    if (max - scrollY < 3) current = sections[sections.length - 1].id;
    for (const link of navLinks) {
      if (link.dataset.nav === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function scheduleScroll() {
    if (pendingScroll) return;
    pendingScroll = true;
    requestAnimationFrame(trackLocation);
  }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', () => {
    if (!matchMedia('(max-width: 680px)').matches) closeMenu();
    scheduleScroll();
  });
  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.body);

  function counter(node) {
    if (counted.has(node) || !node.getClientRects().length) return;
    counted.add(node);
    const end = Number(node.dataset.counter);
    const precision = Number(node.dataset.precision || 0);
    const finish = () => {
      node.textContent = formatValue(end,precision);
      motionFrames.delete(node);
    };
    if (reducedMotion()) return finish();
    const started = performance.now();
    const frame = now => {
      const step = Math.max(0,Math.min(1,(now-started)/1250));
      if (reducedMotion() || step === 1) return finish();
      node.textContent = formatValue(end*(1-(1-step)**3),precision);
      motionFrames.set(node,requestAnimationFrame(frame));
    };
    motionFrames.set(node,requestAnimationFrame(frame));
  }
  const targets = document.querySelectorAll('.reveal, .metric, .lens-card, .capabilities li, .credentials li');
  if ('IntersectionObserver' in window) {
    const observation = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach(({target},index) => {
        observation.unobserve(target);
        target.style.setProperty('--stagger', `${Math.min(index,3)*.10}s`);
        target.classList.add('revealed');
        target.querySelectorAll('[data-counter]').forEach(counter);
      });
    }, { threshold: .06 });
    targets.forEach(target => observation.observe(target));
  }

  document.querySelectorAll('input[name="lens"]').forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('[data-lens]').forEach(panel => {
        panel.hidden = panel.dataset.lens !== input.value;
        panel.classList.toggle('switched', !panel.hidden);
        if (!panel.hidden) panel.querySelectorAll('[data-counter]').forEach(counter);
      });
    });
  });
  for (const chart of document.querySelectorAll('.project-chart')) {
    const buttons = [...chart.querySelectorAll('[data-point]')];
    const readout = chart.querySelector('.plot-status');
    function select(button) {
      if (button.getAttribute('aria-pressed') === 'true') return;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      readout.textContent = button.dataset.readout;
      chart.querySelector('.plot').style.setProperty('--selected',button.dataset.point);
    }
    buttons.forEach((button,index) => {
      button.addEventListener('click', () => select(button));
      button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') select(button); });
      button.addEventListener('focus', () => select(button));
      button.addEventListener('keydown', event => {
        const keys = { ArrowLeft:(index-1+buttons.length)%buttons.length, ArrowRight:(index+1)%buttons.length, Home:0, End:buttons.length-1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        buttons[keys[event.key]].focus();
      });
    });
  }
  function openLinkedCase() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target || !target.matches('details.case-details')) return;
    target.open = true;
  }
  document.querySelectorAll('[data-case]').forEach(link => link.addEventListener('click', () => {
    const detail = document.getElementById(`detail-${link.dataset.case}`);
    detail.open = true;
  }));
  addEventListener('hashchange', openLinkedCase);
  openLinkedCase();

  for (const card of document.querySelectorAll('.spotlight')) {
    let frame = 0;
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.removeProperty('transform');
      card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--light-x');
      card.style.removeProperty('--light-y');
    }
    card.addEventListener('pointermove', event => {
      if (!pointer.matches || reducedMotion() || event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        const x = Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));
        const y = Math.max(0,Math.min(1,(event.clientY-box.top)/box.height));
        card.style.setProperty('--light-x',`${x*100}%`);
        card.style.setProperty('--light-y',`${y*100}%`);
        if (card.matches('.lens-card, .project-card') && !card.querySelector('details[open]')) { card.style.setProperty('--tilt-x',`${(.5-y)*4}deg`); card.style.setProperty('--tilt-y',`${(x-.5)*5}deg`); }
      });
    }, {passive:true});
    card.addEventListener('pointerleave',reset);
    reduced.addEventListener('change',reset);
    motionToggle.addEventListener('change',reset);
  }
  function applyMotionPreference() {
    const off = reducedMotion();
    document.documentElement.dataset.motion = off ? 'reduced' : 'standard';
    motionToggle.checked = off;
    motionToggle.disabled = reduced.matches;
    if (!off) return;
    for (const [node,frame] of motionFrames) {
      cancelAnimationFrame(frame);
      node.textContent = formatValue(Number(node.dataset.counter),Number(node.dataset.precision||0));
    }
    motionFrames.clear();
  }
  motionToggle.addEventListener('change', () => {
    manualReduction = motionToggle.checked;
    applyMotionPreference();
  });
  reduced.addEventListener('change',applyMotionPreference);
  applyMotionPreference();
  document.documentElement.classList.add('enhanced');
  trackLocation();
})();
