/* Compare: up to three products side by side, plus the floating compare bar */

Views.compare = () => {
  const list = state.compare.map(findProduct).filter(Boolean);
  if (!list.length) {
    return `<div class="view">
      <header class="page-head"><span class="eyebrow">Textile House</span><h1 class="page-title">${esc(t('compareTitle'))}</h1></header>
      <div class="empty">
        <div class="empty-icon">${icon('compare')}</div>
        <h2>${esc(t('compareEmpty'))}</h2><p>${esc(t('compareEmptyText'))}</p>
        <a class="btn btn-primary" href="#/catalog">${esc(t('ctaCatalog'))}</a>
      </div>
      ${footerHtml()}
    </div>`;
  }
  const rows = [
    [t('rowPrice'), p => priceHtml(p)],
    [t('rowCategory'), p => esc(tx(findCategory(p.cat).name))],
    [t('material'), p => esc(tx(p.material))],
    [t('origin'), p => esc(p.made === 'am' ? t('madeAm') : t('madeImport'))],
    [t('specColors'), p => `<span class="dots">${p.colors.map(c => `<i style="background:${COLORS[c].hex}" title="${esc(colorName(c))}"></i>`).join('')}</span> ${p.colors.length}`],
    [t('specSizes'), p => p.sizes.map(s => esc(sizeLabel(p, s.id))).join('<br>')]
  ];
  return `<div class="view">
    <div class="section-head page-head">
      <div><span class="eyebrow">Textile House</span><h1 class="page-title">${esc(t('compareTitle'))}</h1></div>
      <button class="link-more" data-action="compare-clear">${esc(t('clearCart'))}</button>
    </div>
    <div class="cmp" style="--n:${list.length}" data-reveal>
      <div class="cmp-cols">${list.map(p => `<div class="cmp-col">
        <a class="cmp-art" href="#/product/${p.id}">${Photo.product(p, p.colors[0], { sizes: '(min-width: 900px) 400px, 33vw' })}</a>
        <button class="cmp-x" data-action="compare" data-id="${p.id}" aria-label="${esc(t('remove'))}">${icon('close')}</button>
        <a class="cmp-name" href="#/product/${p.id}">${esc(productName(p))}</a>
        <button class="btn btn-primary btn-sm" data-action="quick-add" data-id="${p.id}">${icon('bag')}${esc(t('addToCart'))}</button>
      </div>`).join('')}</div>
      ${rows.map(([label, cell]) => `<div class="cmp-row"><h4>${esc(label)}</h4><div class="cmp-cells">${list.map(p => `<div>${cell(p)}</div>`).join('')}</div></div>`).join('')}
    </div>
    ${footerHtml()}
  </div>`;
};

function renderCompareBar() {
  const bar = $('#cmpBar');
  const list = state.compare.map(findProduct).filter(Boolean);
  const show = list.length > 0 && parseRoute().name !== 'compare';
  bar.classList.toggle('show', show);
  bar.setAttribute('aria-hidden', !show);
  if (!list.length) return;
  bar.innerHTML = `<div class="cmp-thumbs">${list.map(p => `<span>${Photo.product(p, p.colors[0], { sizes: '40px' })}</span>`).join('')}</div>
    <a class="btn btn-light btn-sm" href="#/compare" ${show ? '' : 'tabindex="-1"'}>${icon('compare')}${esc(t('compareOpen', list.length))}</a>`;
}
