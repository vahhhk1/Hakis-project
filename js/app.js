/* App shell: navigation, mega menu, routing, global actions */

const NAV = [
  { href: '#/', key: 'navHome', icon: 'home', match: r => r === '' },
  { href: '#/catalog', key: 'navCatalog', icon: 'grid', match: r => r === 'catalog' || r === 'product' || r === 'compare', mega: true },
  { href: '#/favorites', key: 'navFav', icon: 'heart', match: r => r === 'favorites', badge: 'data-fav-count' },
  { href: '#/cart', key: 'navCart', icon: 'bag', match: r => ['cart', 'checkout', 'order', 'orders'].includes(r), badge: 'data-cart-count' },
  { href: '#/about', key: 'navInfo', icon: 'info', match: r => r === 'about' }
];

function megaHtml() {
  const inCat = id => PRODUCTS.filter(p => p.cat === id);
  return `<div class="mega-inner">
    <div class="mega-links">
      <span class="eyebrow">${esc(t('navCatalog'))}</span>
      <a href="#/catalog">${esc(t('megaAll'))}${icon('arrow')}</a>
      <a href="#/catalog?sort=new">${esc(t('secNew'))}${icon('arrow')}</a>
      <a href="#/catalog?sort=pop">${esc(t('secHits'))}${icon('arrow')}</a>
      <a href="#/compare">${esc(t('compareTitle'))}${icon('arrow')}</a>
      <a href="#/about?s=sizes">${esc(t('sizesTitle'))}${icon('arrow')}</a>
    </div>
    <div class="mega-grid">${CATEGORIES.map((c, i) => `<a class="mega-item" href="#/catalog?cat=${c.id}" style="--i:${i}">
      <span class="mega-art">${Photo.img(c.photo, { sizes: '220px' })}</span>
      <b>${esc(tx(c.name))}</b>
      <small>${esc(t('found', inCat(c.id).length))} · ${esc(t('priceFrom', money(Math.min(...inCat(c.id).map(minPrice)))))}</small>
    </a>`).join('')}</div>
  </div>`;
}

function renderShell() {
  document.documentElement.lang = state.lang;
  $$('[data-logo]').forEach(el => { el.innerHTML = Icons.logo(); });
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $('#langSwitch').innerHTML = [['hy', 'ՀԱՅ'], ['ru', 'РУС'], ['en', 'ENG']]
    .map(([code, label]) => `<button data-action="lang" data-id="${code}" aria-pressed="${state.lang === code}" lang="${code}">${label}</button>`).join('');
  $('#tabbar').innerHTML = NAV.map(n => `<a href="${n.href}">${icon(n.icon)}<span>${esc(t(n.key))}</span>${n.badge ? `<span class="badge" ${n.badge} hidden>0</span>` : ''}</a>`).join('');
  $('#deskNav').innerHTML = NAV.filter(n => n.key !== 'navCart')
    .map(n => `<a href="${n.href}" ${n.mega ? 'data-mega aria-haspopup="true" aria-expanded="false"' : ''}>${esc(t(n.key))}${n.mega ? icon('chevron') : ''}</a>`).join('');
  $('#mega').innerHTML = megaHtml();
  updateBadges();
  renderCompareBar();
}

/* ---------- Mega menu (desktop) ---------- */
const Mega = (() => {
  let closeTimer;
  const bar = () => $('#topbar');
  const setOpen = on => {
    bar().classList.toggle('mega-open', on);
    const trigger = $('[data-mega]');
    if (trigger) trigger.setAttribute('aria-expanded', on);
  };
  const open = () => {
    if (window.innerWidth < 900) return;
    clearTimeout(closeTimer);
    bar().classList.remove('hide');
    setOpen(true);
  };
  const close = (now) => {
    clearTimeout(closeTimer);
    if (now) setOpen(false);
    else closeTimer = setTimeout(() => setOpen(false), 140);
  };
  function init() {
    const el = bar();
    el.addEventListener('mouseover', e => { if (e.target.closest('[data-mega], #mega')) open(); else close(); });
    el.addEventListener('mouseleave', () => close());
    el.addEventListener('focusin', e => { if (e.target.closest('[data-mega], #mega')) open(); else close(true); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(true); });
  }
  return { init, close };
})();

function parseRoute() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const [name = '', arg = ''] = path.split('/');
  return { name, arg: decodeURIComponent(arg), params: new URLSearchParams(query) };
}

const ROUTES = {
  '': 'home', catalog: 'catalog', product: 'product', favorites: 'favorites', compare: 'compare',
  cart: 'cart', checkout: 'checkout', order: 'order', orders: 'orders', about: 'about'
};

let currentView = null;
let lastPath = null;

function render(opts = {}) {
  const { name, arg, params } = parseRoute();
  const viewName = ROUTES[name] || 'home';
  const view = Views[viewName];
  if (currentView && currentView.cleanup) { currentView.cleanup(); currentView.cleanup = null; }
  Motion.teardown();
  const html = view(params, arg);
  if (html === '') return;
  document.body.dataset.route = viewName;
  Mega.close(true);
  $('#app').innerHTML = html;
  currentView = view;

  const path = `${name}/${arg}`;
  if (!opts.keepScroll && path !== lastPath && !(viewName === 'about' && params.get('s'))) window.scrollTo(0, 0);
  lastPath = path;

  if (view.mount) view.mount(params, arg);
  Motion.mount();
  renderCompareBar();

  const navName = ROUTES[name] ? name : '';
  const activeNav = NAV.find(n => n.match(navName));
  $$('#tabbar a, #deskNav a').forEach(a => a.classList.toggle('active', !!activeNav && a.getAttribute('href') === activeNav.href));
  const titleKey = activeNav ? activeNav.key : 'navHome';
  document.title = viewName === 'home' ? 'Textile House — Տեքստիլի Տուն'
    : viewName === 'product' && findProduct(arg) ? `${productName(findProduct(arg))} — Textile House`
    : viewName === 'compare' ? `${t('compareTitle')} — Textile House`
    : `${t(titleKey)} — Textile House`;
}

/* ---------- Global click actions ---------- */
const actions = {
  lang(id) {
    if (state.lang === id) return;
    state.lang = id;
    store.set('lang', id);
    renderShell();
    render({ keepScroll: true });
  },
  fav(id) {
    const on = toggleFav(id);
    $$(`.fav-btn[data-id="${id}"]`).forEach(b => popHeart(b, on));
    toast(on ? t('favAdd') : t('favRemove'), on ? '#/favorites' : null, t('favTitle'));
    if (parseRoute().name === 'favorites' && !on) setTimeout(() => render({ keepScroll: true }), 250);
  },
  compare(id) {
    const r = toggleCompare(id);
    if (r === 'full') { toast(t('compareMax'), '#/compare', t('compareTitle')); return; }
    $$(`.cmp-btn[data-id="${id}"]`).forEach(b => popHeart(b, r === 'added'));
    toast(r === 'added' ? t('compareAdded') : t('compareRemoved'), r === 'added' ? '#/compare' : null, t('compareTitle'));
    renderCompareBar();
    if (parseRoute().name === 'compare') render({ keepScroll: true });
  },
  'compare-clear'() {
    state.compare = [];
    store.set('compare', []);
    updateBadges();
    render();
  },
  'quick-add'(id) {
    const p = findProduct(id);
    addToCart(id, p.colors[0], p.sizes[0].id, 1);
    toast(t('added'), '#/cart', t('cartTitle'));
  },
  story(id) { Story.open(id); },
  'scroll-to'(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: Motion.reduced ? 'auto' : 'smooth' });
  },
  range(id) {
    if (home.range === id) return;
    home.range = id;
    const tabs = $('#rangeTabs');
    $$('[role="tab"]', tabs).forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
    Motion.ink(tabs);
    const rail = $('#rangeRail');
    rail.classList.add('swap');
    setTimeout(() => {
      rail.innerHTML = rangeCards(id);
      rail.scrollLeft = 0;
      Motion.reveal(rail.parentElement);
      [...rail.children].forEach((c, i) => c.style.setProperty('--i', i));
      rail.classList.remove('swap');
      rail.dispatchEvent(new Event('scroll'));
    }, Motion.reduced ? 0 : 220);
  },
  'cfg-product'(id) { if (cfg.id !== id) { cfg.id = id; updateConfig('product'); } },
  'cfg-color'(id) { if (cfg.color !== id) { cfg.color = id; updateConfig('color'); } },
  'cfg-size'(id) { if (cfg.size !== id) { cfg.size = id; updateConfig('size'); } },
  'cfg-add'() {
    addToCart(cfg.id, cfg.color, cfg.size, 1);
    toast(t('added'), '#/cart', t('cartTitle'));
  },
  view(id) {
    state.view = id;
    store.set('view', id);
    updatePdp();
  },
  cat(id) {
    state.catalog.cat = id;
    history.replaceState(null, '', id === 'all' ? '#/catalog' : `#/catalog?cat=${id}`);
    Views.catalog.refresh && Views.catalog.refresh();
  },
  'clear-q'() {
    state.catalog.q = '';
    $('#q').value = '';
    $('#q').focus();
    Views.catalog.refresh();
  },
  'reset-filters'() {
    Object.assign(state.catalog, { q: '', cat: 'all', made: 'all', sort: 'pop', max: null });
    history.replaceState(null, '', '#/catalog');
    render({ keepScroll: true });
  },
  'pick-color'(id) {
    pdp.color = id;
    state.view = 'room'; /* a close-up does not show the color */
    store.set('view', 'room');
    updatePdp();
  },
  'pick-size'(id) { pdp.size = id; updatePdp(); },
  qty(step) { pdp.qty = Math.max(1, Math.min(99, pdp.qty + Number(step))); updatePdp(); },
  add() {
    addToCart(pdp.id, pdp.color, pdp.size, pdp.qty);
    toast(t('added'), '#/cart', t('cartTitle'));
  },
  'buy-now'() {
    addToCart(pdp.id, pdp.color, pdp.size, pdp.qty);
    location.hash = '#/checkout';
  },
  async share() {
    const p = findProduct(pdp.id);
    const url = location.href;
    if (navigator.share) {
      try { await navigator.share({ title: productName(p), text: `${productName(p)} — Textile House`, url }); return; } catch { return; }
    }
    if (await copyText(url)) toast(t('linkCopied'));
  },
  ask() {
    const p = findProduct(pdp.id);
    copyText(`${productName(p)} — ${colorName(pdp.color)}, ${sizeLabel(p, pdp.size)}`);
    return true; /* let the link open */
  },
  back() {
    if (history.length > 1) history.back();
    else location.hash = '#/catalog';
  },
  remove(key) { setQty(key, 0); render({ keepScroll: true }); },
  'line-qty'(key, btn) {
    const line = state.cart.find(l => l.key === key);
    if (line) setQty(key, line.qty + Number(btn.dataset.step));
    render({ keepScroll: true });
  },
  'clear-cart'() { state.cart = []; saveCart(); render(); },
  async 'copy-order'(num) {
    const o = state.orders.find(x => x.num === num);
    if (o && await copyText(orderMessage(o))) toast(t('copied'));
  },
  async install() {
    if (!installPrompt) return;
    installPrompt.prompt();
    try { await installPrompt.userChoice; } catch { /* dismissed */ }
    installPrompt = null;
    const b = $('#installBtn');
    if (b) b.hidden = true;
  }
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const fn = actions[el.dataset.action];
  if (!fn) return;
  const letDefault = fn(el.dataset.id, el);
  if (letDefault !== true) e.preventDefault();
});

/* ---------- Init ---------- */
window.addEventListener('hashchange', () => render());
window.addEventListener('storage', e => {
  if (!e.key || !e.key.startsWith('th_')) return;
  state.cart = store.get('cart', []);
  state.favs = store.get('favs', []);
  state.orders = store.get('orders', []);
  state.compare = store.get('compare', []);
  updateBadges();
  renderCompareBar();
});

renderShell();
Mega.init();
Story.init();
Motion.init();
render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
