/* Core helpers: storage, state, i18n, formatting, cart & favorites */

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('th_' + key);
      return v == null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('th_' + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};

const state = {
  lang: store.get('lang', 'hy'),
  cart: store.get('cart', []),
  favs: store.get('favs', []),
  orders: store.get('orders', []),
  seen: store.get('seen', []),
  compare: store.get('compare', []),
  recent: store.get('recent', []),
  view: store.get('view', 'room'),
  catalog: { q: '', cat: 'all', sort: 'pop', made: 'all', max: null }
};
if (!STRINGS[state.lang]) state.lang = 'hy';

const t = (key, ...args) => {
  const v = STRINGS[state.lang][key] ?? STRINGS.hy[key] ?? key;
  return typeof v === 'function' ? v(...args) : v;
};
const tx = obj => (obj ? (obj[state.lang] || obj.hy) : '');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const icon = Icons.icon;

const money = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ֏';

/* ---------- Products ---------- */
const findProduct = id => PRODUCTS.find(p => p.id === id);
const findCategory = id => CATEGORIES.find(c => c.id === id);
const findSize = (p, sizeId) => p.sizes.find(s => s.id === sizeId) || p.sizes[0];

const sizeLabel = (p, sizeId) => {
  const s = findSize(p, sizeId);
  if (s.label) return typeof s.label === 'string' ? s.label : tx(s.label);
  return BED_SIZES[s.id] ? tx(BED_SIZES[s.id].name) : s.id;
};
const sizeDims = (p, sizeId) => {
  const s = findSize(p, sizeId);
  return BED_SIZES[s.id] ? tx(BED_SIZES[s.id].dims) : '';
};

const discounted = (p, price) => p.discount ? Math.round(price * (1 - p.discount / 100) / 100) * 100 : price;
const unitPrice = (p, sizeId) => discounted(p, findSize(p, sizeId).price);
const basePrice = (p, sizeId) => findSize(p, sizeId).price;
const minPrice = p => Math.min(...p.sizes.map(s => discounted(p, s.price)));
const colorName = key => tx(COLORS[key]?.name);

const productName = p => tx(p.name);

/* ---------- Favorites ---------- */
const isFav = id => state.favs.includes(id);
function toggleFav(id) {
  if (isFav(id)) state.favs = state.favs.filter(f => f !== id);
  else state.favs = [id, ...state.favs];
  store.set('favs', state.favs);
  updateBadges();
  return isFav(id);
}

/* ---------- Compare & recently viewed ---------- */
const COMPARE_MAX = 3;
const inCompare = id => state.compare.includes(id);
function toggleCompare(id) {
  if (inCompare(id)) state.compare = state.compare.filter(c => c !== id);
  else if (state.compare.length >= COMPARE_MAX) return 'full';
  else state.compare = [...state.compare, id];
  store.set('compare', state.compare);
  updateBadges();
  return inCompare(id) ? 'added' : 'removed';
}
function pushRecent(id) {
  state.recent = [id, ...state.recent.filter(r => r !== id)].slice(0, 8);
  store.set('recent', state.recent);
}

/* ---------- Cart ---------- */
const cartKey = (id, color, size) => `${id}|${color}|${size}`;

function addToCart(id, color, size, qty = 1) {
  const key = cartKey(id, color, size);
  const line = state.cart.find(l => l.key === key);
  if (line) line.qty = Math.min(99, line.qty + qty);
  else state.cart.push({ key, id, color, size, qty });
  saveCart();
}
function setQty(key, qty) {
  const line = state.cart.find(l => l.key === key);
  if (!line) return;
  if (qty <= 0) state.cart = state.cart.filter(l => l.key !== key);
  else line.qty = Math.min(99, qty);
  saveCart();
}
function saveCart() {
  state.cart = state.cart.filter(l => findProduct(l.id));
  store.set('cart', state.cart);
  updateBadges();
}
const cartCount = () => state.cart.reduce((n, l) => n + l.qty, 0);

function totals(lines, regionIndex = 0) {
  let subtotal = 0, full = 0;
  lines.forEach(l => {
    const p = findProduct(l.id);
    if (!p) return;
    subtotal += unitPrice(p, l.size) * l.qty;
    full += basePrice(p, l.size) * l.qty;
  });
  const inYerevan = Number(regionIndex) === 0;
  const delivery = subtotal === 0 ? 0
    : inYerevan ? (subtotal >= SHOP.freeDeliveryFrom ? 0 : SHOP.delivery.yerevan)
    : SHOP.delivery.region;
  return { subtotal, savings: full - subtotal, delivery, total: subtotal + delivery, inYerevan };
}

function updateBadges() {
  const n = cartCount();
  $$('[data-cart-count]').forEach(b => { b.textContent = n; b.hidden = n === 0; });
  const f = state.favs.length;
  $$('[data-fav-count]').forEach(b => { b.textContent = f; b.hidden = f === 0; });
  const c = state.compare.length;
  $$('[data-compare-count]').forEach(b => { b.textContent = c; b.hidden = c === 0; });
}

/* ---------- Toast & clipboard ---------- */
let toastTimer;
function toast(msg, linkHref, linkText) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>${linkHref ? `<a href="${linkHref}">${esc(linkText)}</a>` : ''}`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

function popHeart(btn, on) {
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.classList.remove('pop');
  void btn.offsetWidth;
  btn.classList.add('pop');
}
