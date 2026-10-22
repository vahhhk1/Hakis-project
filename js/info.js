/* Views: about / info page, and the Instagram-style story viewer */

let installPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  const btn = $('#installBtn');
  if (btn) btn.hidden = false;
});

Views.about = () => {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const linen = ['s15', 's2', 'euro', 'family'];
  const blankets = [['140×205', 'bed15'], ['172×205', 'bed2'], ['200×220', 'bedEuro']];
  return `<div class="view">
    <h1 class="page-title">${esc(t('aboutTitle'))}</h1>
    <div class="about-hero">
      <figure class="about-photo">${Photo.img('about-workshop', { sizes: '(min-width: 900px) 600px, 100vw' })}</figure>
      <p>${esc(t('aboutText'))}</p>
    </div>

    <div class="about-grid">
      <section class="section" id="delivery">
        <div class="section-head"><h2>${esc(t('deliveryTitle'))}</h2></div>
        <div class="info-list">
          <div class="info-item">${icon('pin')}<div><b>${esc(t('dYerevan'))}</b><span>${esc(t('dYerevanText'))}</span></div></div>
          <div class="info-item">${icon('truck')}<div><b>${esc(t('dRegions'))}</b><span>${esc(t('dRegionsText'))}</span></div></div>
          <div class="info-item">${icon('box')}<div><b>${esc(t('dPay'))}</b><span>${esc(t('dPayText'))}</span></div></div>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="section-head"><h2>${esc(t('faqTitle'))}</h2></div>
        <div class="acc" style="margin-top:0">${t('faq').map(([q, a]) => `<details><summary>${esc(q)}${icon('chevron')}</summary><div class="acc-body">${esc(a)}</div></details>`).join('')}</div>
      </section>
    </div>

    <section class="section" id="sizes">
      <div class="section-head"><h2>${esc(t('sizesTitle'))}</h2></div>
      <h3 class="sub-h">${esc(t('linenSizes'))}</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>${esc(t('setCol'))}</th><th>${esc(t('contentsCol'))}</th></tr></thead>
        <tbody>${linen.map(id => `<tr><td>${esc(tx(BED_SIZES[id].name))}</td><td>${esc(tx(BED_SIZES[id].dims)).replace(/ · /g, '<br>')}</td></tr>`).join('')}</tbody>
      </table></div>
      <h3 class="sub-h">${esc(t('blanketSizes'))}</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>${esc(t('setCol'))}</th><th>${esc(t('bedCol'))}</th></tr></thead>
        <tbody>${blankets.map(([s, k]) => `<tr><td>${s}</td><td>${esc(t(k))}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>

    <div class="about-grid">
      <section class="section" id="contact">
        <div class="section-head"><h2>${esc(t('contactTitle'))}</h2></div>
        <p style="color:var(--ink-2)">${esc(t('contactText'))}</p>
        <div class="contact-btns">
          <a class="btn btn-primary" href="${SHOP.directUrl}" target="_blank" rel="noopener">${icon('send')}Direct</a>
          <a class="btn btn-ghost" href="${SHOP.instagramUrl}" target="_blank" rel="noopener">${icon('instagram')}@${SHOP.instagram}</a>
          <a class="btn btn-ghost" href="${SHOP.threadsUrl}" target="_blank" rel="noopener">${icon('threads')}Threads</a>
          ${state.orders.length ? `<a class="btn btn-ghost" href="#/orders">${icon('receipt')}${esc(t('myOrders'))}</a>` : ''}
        </div>
      </section>

      ${standalone ? '' : `<section class="section" id="install">
        <div class="section-head"><h2>${esc(t('installTitle'))}</h2></div>
        <div class="panel">
          <p style="color:var(--ink-2)">${esc(t('installText'))}</p>
          ${isIos ? `<p style="margin-top:8px;font-weight:600">${esc(t('installIos'))}</p>` : ''}
          <button class="btn btn-primary" id="installBtn" data-action="install" style="margin-top:14px" ${installPrompt ? '' : 'hidden'}>${icon('download')}${esc(t('installBtn'))}</button>
        </div>
      </section>`}
    </div>
    ${footerHtml()}
  </div>`;
};

Views.about.mount = (params) => {
  const s = params.get('s');
  if (s && document.getElementById(s)) {
    requestAnimationFrame(() => {
      const el = document.getElementById(s);
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
};

/* ---------- Story viewer ---------- */
const Story = (() => {
  const SLIDE_MS = 5000;
  let si = 0, slide = 0, timer = null, startedAt = 0, remaining = SLIDE_MS, paused = false;
  const root = () => $('#story');

  function slidesFor(story) {
    if (story.slides) return story.slides.map(s => ({ ...s, cta: story.id === 'production' ? null : '#/about?s=delivery' }));
    return PRODUCTS.filter(p => p.cat === story.cat).sort((a, b) => b.pop - a.pop).slice(0, 3)
      .map(p => ({ product: p, cta: `#/product/${p.id}` }));
  }

  function draw() {
    const story = STORIES[si];
    const slides = slidesFor(story);
    const s = slides[slide];
    const el = root();
    const photo = { sizes: '(min-width: 430px) 370px, 90vw', eager: true };
    const body = s.product
      ? `<div class="story-art">${Photo.product(s.product, s.product.colors[0], photo)}</div>
         <h2>${esc(productName(s.product))}</h2>
         <p>${esc(s.product.sizes.length > 1 ? t('priceFrom', money(minPrice(s.product))) : money(minPrice(s.product)))}</p>`
      : `<div class="story-art">${Photo.img(s.photo, photo)}</div><h2>${esc(tx(s.title))}</h2><p>${esc(tx(s.text))}</p>`;
    const ctaLabel = s.product ? t('storyCta') : t('deliveryTitle');
    el.innerHTML = `<div class="story-card" style="background:${story.bg}" role="dialog" aria-modal="true" aria-label="${esc(tx(story.label))}">
      <div class="story-bars">${slides.map((_, i) => `<span class="${i < slide ? 'done' : i === slide ? 'run' : ''}" style="--dur:${SLIDE_MS}ms"><i></i></span>`).join('')}</div>
      <div class="story-head">${Icons.logo()}<span>${SHOP.instagram}</span><span style="color:var(--muted);font-weight:600">· ${esc(tx(story.label))}</span>
        <button class="close" data-story="close" aria-label="Close">${icon('close')}</button></div>
      <div class="story-nav"><button data-story="prev" aria-label="Previous"></button><button data-story="next" aria-label="Next"></button></div>
      <div class="story-slide">${body}</div>
      ${s.cta ? `<a class="btn btn-primary story-cta" href="${s.cta}" data-story="go">${esc(ctaLabel)}</a>` : ''}
    </div>`;
    el.classList.remove('paused');
    paused = false;
    remaining = SLIDE_MS;
    startTimer();
  }

  function startTimer() {
    clearTimeout(timer);
    startedAt = Date.now();
    timer = setTimeout(next, remaining);
  }

  function next() {
    const count = slidesFor(STORIES[si]).length;
    if (slide < count - 1) { slide++; draw(); return; }
    markSeen(STORIES[si].id);
    if (si < STORIES.length - 1) { si++; slide = 0; draw(); } else close();
  }
  function prev() {
    if (slide > 0) { slide--; draw(); return; }
    if (si > 0) { si--; slide = 0; draw(); } else draw();
  }

  function pause() {
    if (paused) return;
    paused = true;
    clearTimeout(timer);
    remaining -= Date.now() - startedAt;
    root().classList.add('paused');
  }
  function resume() {
    if (!paused) return;
    paused = false;
    root().classList.remove('paused');
    startTimer();
  }

  function markSeen(id) {
    if (!state.seen.includes(id)) {
      state.seen.push(id);
      store.set('seen', state.seen);
    }
  }

  function open(id) {
    si = Math.max(0, STORIES.findIndex(s => s.id === id));
    slide = 0;
    const el = root();
    el.hidden = false;
    document.body.style.overflow = 'hidden';
    draw();
  }

  function close() {
    clearTimeout(timer);
    markSeen(STORIES[si].id);
    const el = root();
    el.hidden = true;
    el.innerHTML = '';
    document.body.style.overflow = '';
    $$('.hl').forEach(b => b.classList.toggle('seen', state.seen.includes(b.dataset.id)));
  }

  function init() {
    const el = root();
    let downAt = 0;
    el.addEventListener('pointerdown', e => {
      if (e.target.closest('.close, .story-cta')) return;
      downAt = Date.now();
      pause();
    });
    el.addEventListener('pointerup', () => { if (Date.now() - downAt > 250) resume(); });
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-story]');
      if (e.target === el) { close(); return; }
      if (!b) { resume(); return; }
      const a = b.dataset.story;
      if (a === 'close') close();
      else if (a === 'go') close();
      else if (Date.now() - downAt <= 250 || !downAt) { a === 'next' ? next() : prev(); }
      else resume();
    });
    document.addEventListener('keydown', e => {
      if (el.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
    document.addEventListener('visibilitychange', () => { if (!el.hidden) document.hidden ? pause() : resume(); });
  }

  return { open, close, init, isOpen: () => !root().hidden };
})();
