/* Views: shared building blocks and the home page */

const Views = {};

function tagsHtml(p) {
  return `<div class="tags">${p.tags.map(tag => {
    const label = tag === 'new' ? t('tagNew') : tag === 'hit' ? t('tagHit') : `−${p.discount}%`;
    return `<span class="tag tag-${tag}">${esc(label)}</span>`;
  }).join('')}</div>`;
}

function favBtn(p) {
  const on = isFav(p.id);
  return `<button class="fav-btn ${on ? 'on' : ''}" data-action="fav" data-id="${p.id}" aria-pressed="${on}" aria-label="${esc(t('favTitle'))}">${icon('heart')}</button>`;
}

function cmpBtn(p) {
  const on = inCompare(p.id);
  return `<button class="cmp-btn ${on ? 'on' : ''}" data-action="compare" data-id="${p.id}" aria-pressed="${on}" aria-label="${esc(t('compareAdd'))}" title="${esc(t('compareAdd'))}">${icon('compare')}</button>`;
}

function priceHtml(p) {
  const min = minPrice(p);
  const value = p.sizes.length > 1 ? t('priceFrom', money(min)) : money(min);
  const old = p.discount ? `<s>${money(Math.min(...p.sizes.map(s => s.price)))}</s>` : '';
  return `<span class="price ${p.discount ? 'sale' : ''}">${esc(value)}${old}</span>`;
}

/* How wide a product card is drawn, for picking the photo file (grid, rails) */
const CARD_SIZES = '(min-width: 900px) 340px, (min-width: 600px) 44vw, 72vw';

function productCard(p) {
  const name = esc(productName(p));
  return `<article class="card">
    <div class="card-media">
      <a class="card-link" href="#/product/${p.id}" aria-label="${name}">${Photo.product(p, p.colors[0], { sizes: CARD_SIZES })}</a>
      ${tagsHtml(p)}
      <div class="card-tools">${favBtn(p)}${cmpBtn(p)}</div>
      <button class="quick-add" data-action="quick-add" data-id="${p.id}" aria-label="${esc(t('addToCart'))}"><span>${esc(t('addToCart'))}</span>${icon('plus')}</button>
    </div>
    <a class="card-body" href="#/product/${p.id}">
      <span class="card-cat">${esc(tx(findCategory(p.cat).name))}</span>
      <span class="card-title">${name}</span>
      <span class="card-meta"><span class="dots">${p.colors.slice(0, 5).map(c => `<i style="background:${COLORS[c].hex}"></i>`).join('')}</span>${esc(t('colorsN', p.colors.length))}</span>
      ${priceHtml(p)}
    </a>
  </article>`;
}

const railCtrl = () => `<div class="rail-ctrl">
  <div class="rail-bar"><i></i></div>
  <button class="rail-btn" data-rail="prev" aria-label="${esc(t('back'))}">${icon('back')}</button>
  <button class="rail-btn" data-rail="next" aria-label="${esc(t('seeAll'))}">${icon('next')}</button>
</div>`;

const sectionHead = (kicker, title, link = '') => `<div class="section-head">
  <div>${kicker ? `<span class="eyebrow">${esc(kicker)}</span>` : ''}<h2>${esc(title)}</h2></div>${link}</div>`;

const linkArrow = (href, label) => `<a class="link-arrow" href="${href}">${esc(label)}${icon('arrow')}</a>`;

function footerHtml() {
  const ext = 'target="_blank" rel="noopener"';
  return `<footer class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="#/" class="footer-logo">${Icons.logo()}<span>Textile House</span></a>
        <p>${esc(t('aboutText'))}</p>
      </div>
      <nav class="footer-col"><h4>${esc(t('secCategories'))}</h4>${CATEGORIES.map(c => `<a href="#/catalog?cat=${c.id}">${esc(tx(c.name))}</a>`).join('')}</nav>
      <nav class="footer-col"><h4>${esc(t('footService'))}</h4>
        <a href="#/about?s=delivery">${esc(t('deliveryTitle'))}</a>
        <a href="#/about?s=sizes">${esc(t('sizesTitle'))}</a>
        <a href="#/about?s=faq">${esc(t('faqTitle'))}</a>
        <a href="#/compare">${esc(t('compareTitle'))}</a>
        <a href="#/orders">${esc(t('myOrders'))}</a>
      </nav>
      <nav class="footer-col"><h4>${esc(t('contactTitle'))}</h4>
        <a href="${SHOP.directUrl}" ${ext}>Instagram Direct</a>
        <a href="${SHOP.instagramUrl}" ${ext}>@${SHOP.instagram}</a>
        <a href="${SHOP.threadsUrl}" ${ext}>Threads</a>
      </nav>
    </div>
    <div class="footer-word" aria-hidden="true">Textile House</div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Textile House · Տեքստիլի Տուն</span><span>${esc(t('footMade'))}</span></div>
  </footer>`;
}

function highlightsHtml() {
  return `<div class="highlights" role="list">${STORIES.map(s => {
    const cat = s.cat && findCategory(s.cat);
    const inner = Photo.img(cat ? cat.photo : s.photo, { sizes: '70px' });
    return `<button class="hl ${state.seen.includes(s.id) ? 'seen' : ''}" role="listitem" data-action="story" data-id="${s.id}">
      <span class="hl-ring"><span class="hl-in" style="background:${s.bg}">${inner}</span></span>
      <span>${esc(tx(s.label))}</span>
    </button>`;
  }).join('')}</div>`;
}

/* ---------- Home: hero carousel ---------- */
const HERO = [
  { id: 'satin-premium', color: 'white', k: '', photo: 'hero-satin' },
  { id: 'velvet-bedspread', color: 'mocha', k: '2', photo: 'hero-velvet' },
  { id: 'cloud-blanket', color: 'white', k: '3', photo: 'hero-cloud' }
];
const heroText = (s, part) => t(`hero${s.k}${part}`);
const splitWords = text => text.split(' ').map((w, i) => `<span class="w"><span style="--wi:${i}">${esc(w)}</span></span>`).join(' ');

function heroHtml() {
  return `<section class="hero" id="hero" aria-roledescription="carousel">
    ${HERO.map((s, i) => {
      const p = findProduct(s.id);
      return `<div class="hero-slide ${i === 0 ? 'active' : ''}" aria-hidden="${i !== 0}">
        <div class="hero-art">${Photo.img(s.photo, { sizes: '(min-width: 900px) 74vw, 100vw', eager: i === 0 })}</div>
        <div class="hero-copy">
          <span class="eyebrow">${esc(heroText(s, 'Kicker'))}</span>
          <h1 class="hero-title">${splitWords(heroText(s, 'Title'))}</h1>
          <p>${esc(heroText(s, 'Text'))}</p>
          <div class="hero-actions">
            <a class="btn btn-light" href="#/product/${p.id}?c=${s.color}">${esc(t('discover'))}${icon('arrow')}</a>
            <a class="btn btn-line-light" href="#/catalog">${esc(t('ctaCatalog'))}</a>
          </div>
        </div>
      </div>`;
    }).join('')}
    <div class="hero-foot">
      <div class="hero-dots">${HERO.map((s, i) => `<button class="hero-dot ${i === 0 ? 'active' : ''}" aria-label="${i + 1} / ${HERO.length}">
        <span><b>${String(i + 1).padStart(2, '0')}</b><em>${esc(productName(findProduct(s.id)))}</em></span><i><s></s></i></button>`).join('')}</div>
      <button class="hero-play" aria-label="${esc(t('pauseLbl'))}">${icon('pause')}</button>
    </div>
    <a class="scroll-cue" href="#range" data-action="scroll-to" data-id="range"><span>${esc(t('scrollCue'))}</span><i></i></a>
  </section>`;
}

/* ---------- Home: collection selector ---------- */
const home = { range: 'bedding' };

function rangeCards(catId) {
  const c = findCategory(catId);
  const list = PRODUCTS.filter(p => p.cat === catId).sort((a, b) => b.pop - a.pop);
  return `<a class="range-intro" href="#/catalog?cat=${c.id}">
      ${Photo.img(c.photo, { sizes: CARD_SIZES })}
      <span class="range-intro-copy"><small>${esc(t('found', list.length))}</small><b>${esc(tx(c.name))}</b><span class="link-arrow">${esc(t('seeAll'))}${icon('arrow')}</span></span>
    </a>${list.map(productCard).join('')}`;
}

function rangeHtml() {
  return `<section class="section range" id="range">
    ${sectionHead(t('rangeKicker'), t('rangeTitle'), linkArrow('#/catalog', t('megaAll')))}
    <div class="tabs" role="tablist" id="rangeTabs">${CATEGORIES.map(c => `<button role="tab" data-action="range" data-id="${c.id}" aria-selected="${c.id === home.range}">${esc(tx(c.name))}</button>`).join('')}<span class="tabs-ink"></span></div>
    <div class="rail-root" data-rail-root>
      <div class="rail" id="rangeRail" data-reveal="stagger">${rangeCards(home.range)}</div>
      ${railCtrl()}
    </div>
  </section>`;
}

/* ---------- Home: live set configurator ---------- */
const cfg = { id: 'satin-premium', color: 'powder', size: 's2' };
const cfgProducts = () => PRODUCTS.filter(p => p.cat === 'bedding');
const cfgLink = p => `#/product/${p.id}?c=${cfg.color}&s=${encodeURIComponent(cfg.size)}`;
const CFG_SIZES = '(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw';

function configOpts() {
  const p = findProduct(cfg.id);
  return `<div class="cfg-step"><div class="cfg-label"><b>01</b>${esc(t('cfgFabric'))}</div>
      <div class="cfg-options">${cfgProducts().map(x => `<button class="cfg-opt" data-action="cfg-product" data-id="${x.id}" aria-pressed="${x.id === cfg.id}">${esc(productName(x))}</button>`).join('')}</div></div>
    <div class="cfg-step"><div class="cfg-label"><b>02</b>${esc(t('color'))}<span id="cfgColorLabel">${esc(colorName(cfg.color))}</span></div>
      <div class="swatches">${p.colors.map(c => `<button class="swatch" data-action="cfg-color" data-id="${c}" aria-pressed="${c === cfg.color}" aria-label="${esc(colorName(c))}" title="${esc(colorName(c))}"><i style="background:${COLORS[c].hex}"></i></button>`).join('')}</div></div>
    <div class="cfg-step"><div class="cfg-label"><b>03</b>${esc(t('size'))}</div>
      <div class="cfg-options">${p.sizes.map(s => `<button class="cfg-opt" data-action="cfg-size" data-id="${esc(s.id)}" aria-pressed="${s.id === cfg.size}">${esc(sizeLabel(p, s.id))}</button>`).join('')}</div></div>`;
}

function configHtml() {
  const p = findProduct(cfg.id);
  const price = unitPrice(p, cfg.size);
  return `<section class="config" id="config">
    <div class="config-inner">
      <div class="config-stage">
        <div class="art-box" id="cfgArt"><div class="art-layer in">${Photo.product(p, cfg.color, { sizes: CFG_SIZES })}</div></div>
        <div class="config-caption"><span id="cfgName">${esc(productName(p))}</span><i></i><span id="cfgColor">${esc(colorName(cfg.color))}</span></div>
      </div>
      <div class="config-panel" data-reveal>
        <span class="eyebrow">${esc(t('cfgKicker'))}</span>
        <h2>${esc(t('cfgTitle'))}</h2>
        <p class="config-lead">${esc(t('cfgText'))}</p>
        <div id="cfgOpts">${configOpts()}</div>
        <div class="config-total"><span>${esc(t('total'))}</span><b id="cfgPrice" data-value="${price}">${money(price)}</b></div>
        <div class="config-actions">
          <button class="btn btn-light" data-action="cfg-add">${icon('bag')}${esc(t('addToCart'))}</button>
          <a class="btn btn-line-light" id="cfgMore" href="${cfgLink(p)}">${esc(t('details'))}</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* kind: 'product' rebuilds the options, 'color' swaps the picture, 'size' only reprices */
function updateConfig(kind) {
  const p = findProduct(cfg.id);
  if (!p.colors.includes(cfg.color)) cfg.color = p.colors[0];
  if (!p.sizes.some(s => s.id === cfg.size)) cfg.size = p.sizes[Math.min(1, p.sizes.length - 1)].id;
  if (kind === 'product') $('#cfgOpts').innerHTML = configOpts();
  else {
    $$('#cfgOpts [data-action="cfg-color"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === cfg.color));
    $$('#cfgOpts [data-action="cfg-size"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === cfg.size));
    $('#cfgColorLabel').textContent = colorName(cfg.color);
  }
  if (kind !== 'size') Motion.swapArt($('#cfgArt'), Photo.product(p, cfg.color, { sizes: CFG_SIZES }));
  $('#cfgName').textContent = productName(p);
  $('#cfgColor').textContent = colorName(cfg.color);
  $('#cfgMore').href = cfgLink(p);
  Motion.tweenMoney($('#cfgPrice'), unitPrice(p, cfg.size));
}

/* ---------- Home: numbers, process, marquee, Instagram ---------- */
function figuresHtml() {
  const f = SHOP.followers;
  const items = [
    [parseFloat(f), f.replace(/[\d.]/g, ''), 'statFollowers'],
    [PRODUCTS.length, '+', 'statProducts'],
    [REGIONS.length, '', 'statRegions'],
    [1, '', 'statDays']
  ];
  return `<section class="section figures-wrap">
    <span class="eyebrow">${esc(t('figKicker'))}</span>
    <div class="figures" data-reveal="stagger">${items.map(([n, s, k]) => `<div class="figure"><b data-count="${n}" data-suffix="${s}">0${s}</b><span>${esc(t(k))}</span></div>`).join('')}</div>
  </section>`;
}

const PROCESS_PHOTOS = ['process-cutting', 'process-sewing', 'process-quality', 'process-delivery'];

function processHtml() {
  const prod = STORIES.find(s => s.id === 'production').slides;
  const steps = [prod[1], prod[2], prod[3], STORIES[0].slides[0]];
  const C = (2 * Math.PI * 54).toFixed(1);
  const photo = (i, sizes, cls) => Photo.img(PROCESS_PHOTOS[i], { sizes, cls });
  return `<section class="process" id="process">
    <div class="process-aside">
      <span class="eyebrow">${esc(t('procKicker'))}</span>
      <h2>${esc(t('prodTitle'))}</h2>
      <p>${esc(t('prodText'))}</p>
      <div class="process-dial" aria-hidden="true">
        <div class="dial">
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" class="dial-track"/><circle cx="60" cy="60" r="54" class="dial-fill" id="procRing" style="stroke-dasharray:${C};stroke-dashoffset:${C}"/></svg>
          <div class="dial-ph" id="procPh">${steps.map((_, i) => photo(i, '200px', i ? '' : 'on')).join('')}</div>
        </div>
        <div class="dial-num"><span id="procNum">01</span><small>/ ${String(steps.length).padStart(2, '0')}</small></div>
      </div>
    </div>
    <ol class="process-steps">${steps.map((s, i) => `<li class="process-step">
      <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.text).replace(/\s*\p{Extended_Pictographic}+/gu, ''))}</p>
      <div class="step-ph">${photo(i, '(min-width: 600px) 60vw, 80vw')}</div>
    </li>`).join('')}</ol>
  </section>`;
}

function marqueeHtml() {
  const items = t('marquee').map(w => `<span>${esc(w)}</span><i>✦</i>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${items}${items}</div></div>`;
}

function igHtml() {
  const tiles = [['ig-lavender', 0.06], ['ig-breakfast', 0.14], ['ig-morning', 0.09]];
  return `<section class="ig">
    <div class="ig-copy" data-reveal>
      <span class="eyebrow">Instagram</span>
      <h2>${esc(t('igTitle'))}</h2>
      <p>${esc(t('igText'))}</p>
      <a class="btn btn-light" href="${SHOP.instagramUrl}" target="_blank" rel="noopener">${icon('instagram')}@${SHOP.instagram}</a>
    </div>
    <div class="ig-tiles">${tiles.map(([name, speed], i) => `<div class="ig-tile t${i}" data-parallax="${speed}"><div>${Photo.img(name, { sizes: '(min-width: 900px) 22vw, 44vw' })}</div></div>`).join('')}</div>
  </section>`;
}

/* ---------- Home ---------- */
Views.home = () => {
  const hits = PRODUCTS.filter(p => p.tags.includes('hit') || p.tags.includes('sale')).sort((a, b) => b.pop - a.pop).slice(0, 4);
  const recent = state.recent.map(findProduct).filter(Boolean);
  const perks = [
    ['factory', 'perkFactory', 'perkFactoryText'],
    ['truck', 'perkDelivery', 'perkDeliveryText'],
    ['ruler', 'perkCustom', 'perkCustomText'],
    ['cotton', 'perkQuality', 'perkQualityText']
  ];

  return `<div class="view view-home">
    ${heroHtml()}
    ${highlightsHtml()}
    <div class="perks" data-reveal="stagger">${perks.map(([ic, a, b]) => `<div class="perk">${icon(ic)}<div><b>${esc(t(a))}</b><span>${esc(t(b))}</span></div></div>`).join('')}</div>
    ${rangeHtml()}
    ${configHtml()}
    ${figuresHtml()}
    ${processHtml()}
    ${marqueeHtml()}
    <section class="section">
      ${sectionHead(t('tagHit'), t('secHits'), linkArrow('#/catalog', t('seeAll')))}
      <div class="grid" data-reveal="stagger">${hits.map(productCard).join('')}</div>
    </section>
    ${recent.length ? `<section class="section">
      ${sectionHead('', t('recent'))}
      <div class="rail-root" data-rail-root><div class="rail" data-reveal="stagger">${recent.map(productCard).join('')}</div>${railCtrl()}</div>
    </section>` : ''}
    ${igHtml()}
    ${footerHtml()}
  </div>`;
};
