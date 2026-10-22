/* Views: catalog, product page, favorites */

/* ---------- Catalog ---------- */
const priceBounds = () => {
  const all = PRODUCTS.map(minPrice);
  return { lo: Math.floor(Math.min(...all) / 1000) * 1000, hi: Math.ceil(Math.max(...all) / 1000) * 1000 };
};

function filteredProducts() {
  const { q, cat, sort, made, max } = state.catalog;
  const query = q.trim().toLowerCase();
  let list = PRODUCTS.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (made !== 'all' && p.made !== made) return false;
    if (max && minPrice(p) > max) return false;
    if (!query) return true;
    const hay = [
      ...Object.values(p.name), ...Object.values(p.material),
      ...Object.values(findCategory(p.cat).name),
      ...p.colors.flatMap(c => Object.values(COLORS[c].name))
    ].join(' ').toLowerCase();
    return query.split(/\s+/).every(w => hay.includes(w));
  });
  const by = {
    pop: (a, b) => b.pop - a.pop,
    new: (a, b) => (b.tags.includes('new') - a.tags.includes('new')) || b.pop - a.pop,
    asc: (a, b) => minPrice(a) - minPrice(b),
    desc: (a, b) => minPrice(b) - minPrice(a)
  };
  return list.sort(by[sort] || by.pop);
}

function catalogGridHtml() {
  const list = filteredProducts();
  $('#count') && ($('#count').textContent = t('found', list.length));
  if (!list.length) {
    return `<div class="empty">
      <div class="empty-icon">${icon('search')}</div>
      <h2>${esc(t('nothingFound'))}</h2><p>${esc(t('nothingText'))}</p>
      <button class="btn btn-ghost" data-action="reset-filters">${esc(t('resetFilters'))}</button>
    </div>`;
  }
  return `<div class="grid" data-reveal="stagger">${list.map(productCard).join('')}</div>`;
}

const maxLabel = () => state.catalog.max ? t('priceUpTo', money(state.catalog.max)) : t('priceAny');

Views.catalog = (params) => {
  if (params.has('cat')) state.catalog.cat = findCategory(params.get('cat')) ? params.get('cat') : 'all';
  if (params.has('sort')) state.catalog.sort = params.get('sort');
  const c = state.catalog;
  const { lo, hi } = priceBounds();
  const chip = (id, label) => `<button class="chip" data-action="cat" data-id="${id}" aria-pressed="${c.cat === id}">${esc(label)}</button>`;
  const opt = (v, cur, key) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(t(key))}</option>`;
  return `<div class="view">
    <header class="page-head">
      <span class="eyebrow">Textile House</span>
      <h1 class="page-title">${esc(t('catalogTitle'))}</h1>
      <span class="count" id="count">${esc(t('found', filteredProducts().length))}</span>
    </header>
    <div class="search">${icon('search')}
      <input id="q" type="search" placeholder="${esc(t('searchPh'))}" value="${esc(c.q)}" autocomplete="off" enterkeyhint="search" aria-label="${esc(t('searchPh'))}">
      <button class="search-clear" data-action="clear-q" aria-label="Clear" ${c.q ? '' : 'hidden'}>${icon('close')}</button>
    </div>
    <div class="chips tabs" id="chips">${chip('all', t('all'))}${CATEGORIES.map(cat => chip(cat.id, tx(cat.name))).join('')}<span class="tabs-ink"></span></div>
    <div class="toolbar">
      <label class="price-filter">
        <span id="maxLabel">${esc(maxLabel())}</span>
        <input type="range" id="maxPrice" min="${lo}" max="${hi}" step="1000" value="${c.max || hi}" aria-label="${esc(t('rowPrice'))}">
      </label>
      <div class="segs">
        <label class="select"><select id="made" aria-label="${esc(t('origin'))}">${opt('all', c.made, 'madeAll')}${opt('am', c.made, 'madeAm')}${opt('import', c.made, 'madeImport')}</select>${icon('chevron')}</label>
        <label class="select"><select id="sort" aria-label="Sort">${opt('pop', c.sort, 'sortPop')}${opt('new', c.sort, 'sortNew')}${opt('asc', c.sort, 'sortAsc')}${opt('desc', c.sort, 'sortDesc')}</select>${icon('chevron')}</label>
      </div>
    </div>
    <div id="results">${catalogGridHtml()}</div>
    ${footerHtml()}
  </div>`;
};

Views.catalog.mount = () => {
  const q = $('#q');
  const { hi } = priceBounds();
  const refresh = () => {
    $('#results').innerHTML = catalogGridHtml();
    $$('#chips .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === state.catalog.cat));
    $('.search-clear').hidden = !state.catalog.q;
    Motion.ink($('#chips'));
    Motion.reveal($('#results'));
  };
  Views.catalog.refresh = refresh;
  q.addEventListener('input', () => { state.catalog.q = q.value; refresh(); });
  $('#sort').addEventListener('change', e => { state.catalog.sort = e.target.value; refresh(); });
  $('#made').addEventListener('change', e => { state.catalog.made = e.target.value; refresh(); });
  $('#maxPrice').addEventListener('input', e => {
    const v = Number(e.target.value);
    state.catalog.max = v >= hi ? null : v;
    $('#maxLabel').textContent = maxLabel();
    refresh();
  });
  const active = $('#chips [aria-pressed="true"]');
  if (active) active.scrollIntoView({ inline: 'center', block: 'nearest' });
};

/* ---------- Product page ---------- */
const pdp = { id: null, color: null, size: null, qty: 1, shown: '' };
const PDP_SIZES = '(min-width: 1240px) 640px, (min-width: 900px) 52vw, 100vw';
/* 'room' shows the product in an interior, 'detail' a close-up of the fabric (when there is one) */
const pdpView = p => p.detail && state.view === 'detail' ? 'detail' : 'room';
const pdpPhoto = (p, opts = {}) => Photo.product(p, pdp.color, { sizes: PDP_SIZES, view: pdpView(p), ...opts });

Views.product = (params, id) => {
  const p = findProduct(id);
  if (!p) {
    return `<div class="view empty"><div class="empty-icon">${icon('search')}</div><h2>${esc(t('notFound'))}</h2>
      <a class="btn btn-primary" href="#/catalog">${esc(t('ctaCatalog'))}</a></div>`;
  }
  if (pdp.id !== id) Object.assign(pdp, { id, color: p.colors[0], size: p.sizes[0].id, qty: 1 });
  if (params.get('c') && p.colors.includes(params.get('c'))) pdp.color = params.get('c');
  if (params.get('s') && p.sizes.some(s => s.id === params.get('s'))) pdp.size = params.get('s');
  pdp.shown = `${pdp.color}|${pdpView(p)}`;
  pushRecent(p.id);

  const cat = findCategory(p.cat);
  const related = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat)
    .concat(PRODUCTS.filter(x => x.cat !== p.cat && x.tags.includes('hit')))
    .slice(0, 6);
  const isBedding = p.sizes.some(s => BED_SIZES[s.id]);
  const viewBtn = (id, ic, key) => `<button data-action="view" data-id="${id}" aria-pressed="${pdpView(p) === id}">${icon(ic)}<span>${esc(t(key))}</span></button>`;
  const specs = [
    [t('material'), tx(p.material)],
    [t('origin'), p.made === 'am' ? t('madeAm') : t('madeImport')],
    [t('specSizes'), String(p.sizes.length)],
    [t('delivery'), t('specDeliveryVal')]
  ];

  return `<div class="view">
    <div class="crumbs">
      <button class="back-btn" data-action="back">${icon('back')}${esc(t('back'))}</button>
      <span>/</span><a href="#/catalog?cat=${cat.id}">${esc(tx(cat.name))}</a>
    </div>
    <div class="pdp">
      <div class="pdp-media" id="pdpMedia">
        <div class="art-box" id="pdpArt"><div class="art-layer in">${pdpPhoto(p, { eager: true })}</div></div>
        ${tagsHtml(p)}
        <div class="card-tools">${favBtn(p)}${cmpBtn(p)}</div>
        ${p.detail ? `<div class="view-toggle" role="group">${viewBtn('room', 'home', 'viewRoom')}${viewBtn('detail', 'search', 'viewDetail')}</div>` : ''}
        <span class="media-swatch-name" id="pdpColorName">${esc(colorName(pdp.color))}</span>
        <span class="zoom-hint">${icon('search')}${esc(t('zoomHint'))}</span>
      </div>
      <div class="pdp-info">
        <span class="made ${p.made === 'import' ? 'import' : ''}">${esc(p.made === 'am' ? t('madeAmBadge') : t('madeImportBadge'))}</span>
        <h1>${esc(productName(p))}</h1>
        <div class="pdp-price" id="pdpPrice"></div>
        <p class="pdp-desc">${esc(tx(p.desc))}</p>

        <div class="opt">
          <div class="opt-label"><span><b class="n">01</b>${esc(t('color'))}</span><span id="colorLabel">${esc(colorName(pdp.color))}</span></div>
          <div class="swatches">${p.colors.map(c => `<button class="swatch" data-action="pick-color" data-id="${c}" aria-pressed="${c === pdp.color}" aria-label="${esc(colorName(c))}" title="${esc(colorName(c))}"><i style="background:${COLORS[c].hex}"></i></button>`).join('')}</div>
        </div>

        <div class="opt">
          <div class="opt-label"><span><b class="n">02</b>${esc(t('size'))}</span>${isBedding ? `<a class="link-more" href="#/about?s=sizes">${esc(t('sizeGuide'))}</a>` : ''}</div>
          <div class="sizes">${p.sizes.map(s => `<button class="size" data-action="pick-size" data-id="${esc(s.id)}" aria-pressed="${s.id === pdp.size}"><b>${esc(sizeLabel(p, s.id))}</b><small>${money(discounted(p, s.price))}</small></button>`).join('')}</div>
          <div class="size-dims" id="sizeDims" ${sizeDims(p, pdp.size) ? '' : 'hidden'}>${esc(sizeDims(p, pdp.size))}</div>
        </div>

        <div class="opt">
          <div class="opt-label"><span><b class="n">03</b>${esc(t('qty'))}</span></div>
          <div class="buy-row" id="buyRow">
            <div class="stepper">
              <button data-action="qty" data-id="-1" aria-label="−">${icon('minus')}</button>
              <output id="qty">${pdp.qty}</output>
              <button data-action="qty" data-id="1" aria-label="+">${icon('plus')}</button>
            </div>
            <button class="btn btn-primary" data-action="add">${icon('bag')}${esc(t('addToCart'))}</button>
          </div>
        </div>
        <div class="alt-actions">
          <button class="btn btn-ghost" data-action="buy-now">${esc(t('buyNow'))}</button>
          <button class="btn btn-ghost btn-icon" data-action="share" aria-label="${esc(t('share'))}">${icon('share')}</button>
        </div>
        <a class="btn btn-ghost btn-block" style="margin-top:10px" href="${SHOP.directUrl}" target="_blank" rel="noopener" data-action="ask">${icon('instagram')}${esc(t('askIg'))}</a>

        <div class="note-line">${icon('truck')}<span>${esc(t('deliveryShort'))}</span></div>

        <div class="acc">
          <details open><summary>${esc(t('material'))}${icon('chevron')}</summary><div class="acc-body">${esc(tx(p.material))}</div></details>
          ${isBedding ? `<details><summary>${esc(t('setIncludes'))}${icon('chevron')}</summary><div class="acc-body" id="accSet">${esc(sizeDims(p, pdp.size))}</div></details>` : ''}
          <details><summary>${esc(t('care'))}${icon('chevron')}</summary><div class="acc-body">${esc(t('careText'))}</div></details>
          <details><summary>${esc(t('delivery'))}${icon('chevron')}</summary><div class="acc-body">${esc(t('dYerevan'))}: ${esc(t('dYerevanText'))}<br>${esc(t('dRegions'))}: ${esc(t('dRegionsText'))}</div></details>
        </div>
      </div>
    </div>

    <section class="specs" data-reveal="stagger">${specs.map(([k, v]) => `<div class="spec"><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</section>

    <section class="section">
      ${sectionHead('', t('related'))}
      <div class="rail-root" data-rail-root><div class="rail" data-reveal="stagger">${related.map(productCard).join('')}</div>${railCtrl()}</div>
    </section>

    <div class="buybar" id="buybar">
      <b id="buybarPrice"></b>
      <button class="btn btn-primary" data-action="add">${icon('bag')}${esc(t('addToCart'))}</button>
    </div>
    ${footerHtml()}
  </div>`;
};

function updatePdp() {
  const p = findProduct(pdp.id);
  if (!p) return;
  const price = unitPrice(p, pdp.size);
  const base = basePrice(p, pdp.size);
  const shown = `${pdp.color}|${pdpView(p)}`;
  if (shown !== pdp.shown) {
    pdp.shown = shown;
    Motion.swapArt($('#pdpArt'), pdpPhoto(p));
  }
  $$('.view-toggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === pdpView(p)));
  $('#pdpColorName').textContent = colorName(pdp.color);
  $('#colorLabel').textContent = colorName(pdp.color);
  $('#pdpPrice').innerHTML = `<b>${money(price * pdp.qty)}</b>${p.discount ? `<s>${money(base * pdp.qty)}</s><span class="off">−${p.discount}%</span>` : ''}`;
  $('#buybarPrice').textContent = money(price * pdp.qty);
  $('#qty').textContent = pdp.qty;
  $$('[data-action="qty"]')[0].disabled = pdp.qty <= 1;
  $$('.swatch').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === pdp.color));
  $$('.size').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === pdp.size));
  const dims = sizeDims(p, pdp.size);
  $('#sizeDims').hidden = !dims;
  $('#sizeDims').textContent = dims;
  if ($('#accSet')) $('#accSet').textContent = dims;
  const qs = `c=${pdp.color}&s=${encodeURIComponent(pdp.size)}`;
  history.replaceState(null, '', `#/product/${p.id}?${qs}`);
}

Views.product.mount = () => {
  if (!findProduct(pdp.id)) return;
  updatePdp();
  Motion.zoom($('#pdpArt'));
  const bar = $('#buybar');
  const row = $('#buyRow');
  if ('IntersectionObserver' in window && bar && row) {
    const io = new IntersectionObserver(([e]) => bar.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(row);
    Views.product.cleanup = () => io.disconnect();
  }
};

/* ---------- Favorites ---------- */
Views.favorites = () => {
  const list = state.favs.map(findProduct).filter(Boolean);
  return `<div class="view">
    <header class="page-head"><span class="eyebrow">Textile House</span><h1 class="page-title">${esc(t('favTitle'))}</h1></header>
    ${list.length ? `<div class="grid" data-reveal="stagger">${list.map(productCard).join('')}</div>` : `<div class="empty">
      <div class="empty-icon">${icon('heart')}</div>
      <h2>${esc(t('favEmpty'))}</h2><p>${esc(t('favEmptyText'))}</p>
      <a class="btn btn-primary" href="#/catalog">${esc(t('ctaCatalog'))}</a>
    </div>`}
    ${footerHtml()}
  </div>`;
};
