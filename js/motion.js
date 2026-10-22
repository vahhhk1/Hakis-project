/* Motion: intro, scroll reveals, counters, parallax, top bar, hero carousel, rails, process */

const Motion = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOut = x => 1 - Math.pow(1 - x, 3);
  let io = null;
  let cleanups = [];
  let parallaxEls = [];
  let lastY = 0, ticking = false;

  function tween(from, to, ms, step) {
    if (reduced || from === to) { step(to); return; }
    const t0 = performance.now();
    const frame = now => {
      const k = Math.min(1, (now - t0) / ms);
      step(from + (to - from) * easeOut(k));
      if (k < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function tweenMoney(el, to) {
    if (!el) return;
    const from = Number(el.dataset.value) || to;
    el.dataset.value = to;
    tween(from, to, 600, v => { el.textContent = money(v); });
  }

  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const raw = el.dataset.count;
    const target = parseFloat(raw);
    const dec = (raw.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    tween(0, target, 1600, v => { el.textContent = v.toFixed(dec) + suffix; });
  }

  /* Elements with [data-reveal] fade up once they enter the viewport */
  function reveal(root = document) {
    const els = $$('[data-reveal]:not(.in)', root);
    $$('[data-reveal="stagger"]', root).forEach(g => [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));
    const show = el => {
      el.classList.add('in');
      if (el.matches('[data-count]')) countUp(el);
      $$('[data-count]', el).forEach(countUp);
    };
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(show); return; }
    if (!io) {
      io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    els.forEach(el => io.observe(el));
  }

  /* Cross-fades a new photo over the old one inside an .art-box, once the new file has loaded */
  function swapArt(box, html) {
    if (!box) return;
    const layer = document.createElement('div');
    layer.className = 'art-layer';
    layer.innerHTML = html;
    const img = $('img', layer);
    if (img) img.loading = 'eager';
    box.appendChild(layer);
    const show = () => {
      if (!layer.isConnected || layer.classList.contains('in')) return;
      const kids = [...box.children];
      const old = kids.slice(0, kids.indexOf(layer));
      if (reduced) { old.forEach(o => o.remove()); layer.classList.add('in'); return; }
      requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add('in')));
      setTimeout(() => old.forEach(o => o.remove()), 750);
    };
    if (!img || img.complete) show();
    else {
      img.addEventListener('load', show, { once: true });
      img.addEventListener('error', show, { once: true });
      setTimeout(show, 1500);
    }
  }

  /* Sliding underline under the selected tab */
  function ink(tabs) {
    if (!tabs) return;
    const sel = $('[aria-selected="true"], [aria-pressed="true"]', tabs);
    const bar = $('.tabs-ink', tabs);
    if (!bar) return;
    if (!sel) { bar.style.width = '0'; return; }
    bar.style.width = sel.offsetWidth + 'px';
    bar.style.transform = `translateX(${sel.offsetLeft}px)`;
  }

  /* Scroll-linked work: top bar state, progress line, parallax */
  function sync() {
    const y = window.scrollY;
    const bar = $('#topbar');
    const hero = $('#hero');
    document.body.classList.toggle('on-hero', !!hero && y < hero.offsetHeight - 90);
    bar.classList.toggle('scrolled', y > 4);
    if (y > lastY + 6 && y > 260 && !bar.classList.contains('mega-open')) bar.classList.add('hide');
    else if (y < lastY - 6 || y <= 260) bar.classList.remove('hide');
    lastY = y;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#scrollProgress').style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const speed = Number(el.dataset.parallax) || 0.1;
      el.firstElementChild.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px, 0)`;
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; sync(); });
  }

  /* Full-screen hero carousel with timed progress bars */
  function hero() {
    const root = $('#hero');
    if (!root) return;
    const slides = $$('.hero-slide', root);
    const dots = $$('.hero-dot', root);
    const btn = $('.hero-play', root);
    const DUR = 7000;
    let i = 0, timer = null, playing = !reduced, startedAt = 0, left = DUR;
    root.style.setProperty('--hero-dur', DUR + 'ms');

    const schedule = () => {
      clearTimeout(timer);
      if (!playing) return;
      startedAt = Date.now();
      timer = setTimeout(() => go(i + 1), left);
    };
    const go = n => {
      const next = (n + slides.length) % slides.length;
      if (next === i && n === i) return;
      i = next;
      slides.forEach((s, k) => { s.classList.toggle('active', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach((d, k) => { d.classList.toggle('active', k === i); d.classList.toggle('done', k < i); d.setAttribute('aria-current', k === i); });
      left = DUR;
      schedule();
    };
    const setPlaying = p => {
      if (!p && playing) left -= Date.now() - startedAt;
      playing = p;
      root.classList.toggle('paused', !p);
      btn.innerHTML = icon(p ? 'pause' : 'play');
      btn.setAttribute('aria-label', t(p ? 'pauseLbl' : 'playLbl'));
      if (p) schedule(); else clearTimeout(timer);
    };

    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    btn.addEventListener('click', () => { autoPaused = false; setPlaying(!playing); });
    let x0 = null;
    root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    let autoPaused = false;
    const onVis = () => {
      if (document.hidden && playing) { autoPaused = true; setPlaying(false); }
      else if (!document.hidden && autoPaused) { autoPaused = false; setPlaying(true); }
    };
    document.addEventListener('visibilitychange', onVis);
    if (reduced) setPlaying(false); else schedule();
    cleanups.push(() => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVis); });
  }

  /* Horizontal product rail with arrows and a progress track */
  function rail(root) {
    const track = $('.rail', root);
    const bar = $('.rail-bar i', root);
    const prev = $('[data-rail="prev"]', root);
    const next = $('[data-rail="next"]', root);
    if (!track || !bar) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const vis = Math.max(track.scrollWidth ? track.clientWidth / track.scrollWidth : 1, 0.08);
      const p = max > 0 ? track.scrollLeft / max : 0;
      bar.style.width = `${Math.min(1, vis) * 100}%`;
      bar.style.transform = `translateX(${(p * (1 / vis - 1) * 100).toFixed(2)}%)`;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft > max - 4;
      root.classList.toggle('no-scroll', max <= 4);
    };
    const step = dir => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' });
    track.addEventListener('scroll', update, { passive: true });
    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    window.addEventListener('resize', update);
    cleanups.push(() => window.removeEventListener('resize', update));
    update();
  }

  /* Sticky "how we make it" dial that follows the step in view */
  function process() {
    const root = $('#process');
    if (!root || !('IntersectionObserver' in window)) return;
    const steps = $$('.process-step', root);
    const num = $('#procNum');
    const photos = $$('#procPh img');
    const ring = $('#procRing');
    const C = parseFloat(ring.style.strokeDasharray);
    let cur = -1;
    const set = k => {
      if (k === cur || k < 0) return;
      cur = k;
      steps.forEach((s, j) => s.classList.toggle('active', j === k));
      photos.forEach((p, j) => p.classList.toggle('on', j === k));
      num.textContent = String(k + 1).padStart(2, '0');
      ring.style.strokeDashoffset = (C * (1 - (k + 1) / steps.length)).toFixed(1);
      if (!reduced && num.animate) {
        num.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    };
    const pio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) set(steps.indexOf(e.target)); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(s => pio.observe(s));
    set(0);
    cleanups.push(() => pio.disconnect());
  }

  /* Follow-the-pointer zoom on the product picture (mouse only) */
  function zoom(box) {
    if (!box || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    box.classList.add('zoomable');
    box.addEventListener('pointermove', e => {
      const r = box.getBoundingClientRect();
      box.style.setProperty('--zx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      box.style.setProperty('--zy', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    });
    box.addEventListener('pointerenter', () => box.classList.add('zooming'));
    box.addEventListener('pointerleave', () => box.classList.remove('zooming'));
  }

  function intro() {
    const el = $('#intro');
    if (!el) return;
    let seen = false;
    try { seen = sessionStorage.getItem('th_intro') === '1'; sessionStorage.setItem('th_intro', '1'); } catch { /* storage unavailable */ }
    if (reduced || seen) { el.remove(); return; }
    document.body.classList.add('intro-on');
    setTimeout(() => { el.classList.add('out'); document.body.classList.remove('intro-on'); }, 1500);
    setTimeout(() => el.remove(), 2600);
  }

  function mount() {
    reveal();
    parallaxEls = reduced ? [] : $$('[data-parallax]');
    hero();
    $$('[data-rail-root]').forEach(rail);
    process();
    requestAnimationFrame(() => $$('.tabs').forEach(ink));
    lastY = window.scrollY;
    sync();
  }

  function teardown() {
    cleanups.forEach(f => f());
    cleanups = [];
  }

  function init() {
    intro();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { $$('.tabs').forEach(ink); onScroll(); });
  }

  return { init, mount, teardown, reveal, swapArt, tweenMoney, ink, zoom, sync, reduced };
})();
