/* Views: cart, checkout, order confirmation, order history */

function cartLineHtml(l) {
  const p = findProduct(l.id);
  return `<div class="ci">
    <a class="ci-media" href="#/product/${p.id}?c=${l.color}&s=${encodeURIComponent(l.size)}">${Photo.product(p, l.color, { sizes: '120px' })}</a>
    <div class="ci-body">
      <div class="ci-top">
        <a class="ci-title" href="#/product/${p.id}?c=${l.color}&s=${encodeURIComponent(l.size)}">${esc(productName(p))}</a>
        <button class="ci-remove" data-action="remove" data-id="${esc(l.key)}" aria-label="${esc(t('remove'))}">${icon('trash')}</button>
      </div>
      <div class="ci-opts"><i style="background:${COLORS[l.color].hex}"></i>${esc(colorName(l.color))} · ${esc(sizeLabel(p, l.size))}</div>
      <div class="ci-foot">
        <div class="stepper">
          <button data-action="line-qty" data-id="${esc(l.key)}" data-step="-1" aria-label="−">${icon('minus')}</button>
          <output>${l.qty}</output>
          <button data-action="line-qty" data-id="${esc(l.key)}" data-step="1" aria-label="+">${icon('plus')}</button>
        </div>
        <span class="ci-price">${money(unitPrice(p, l.size) * l.qty)}</span>
      </div>
    </div>
  </div>`;
}

function summaryHtml(tot, showProgress) {
  const left = SHOP.freeDeliveryFrom - tot.subtotal;
  const pct = Math.min(100, (tot.subtotal / SHOP.freeDeliveryFrom) * 100);
  return `
    ${showProgress && tot.inYerevan ? `<div class="progress">${esc(left > 0 ? t('freeLeft', money(left)) : t('freeReached'))}
      <div class="progress-bar"><i style="width:${pct}%"></i></div></div>` : ''}
    <div class="sum-row"><span>${esc(t('subtotal'))}</span><span>${money(tot.subtotal + tot.savings)}</span></div>
    ${tot.savings ? `<div class="sum-row"><span>${esc(t('savings'))}</span><span style="color:var(--sale)">−${money(tot.savings)}</span></div>` : ''}
    <div class="sum-row"><span>${esc(t('delivery'))}</span>${tot.delivery ? `<span>${money(tot.delivery)}</span>` : `<span class="free">${esc(t('free'))}</span>`}</div>
    <div class="sum-row total"><span>${esc(t('total'))}</span><span>${money(tot.total)}</span></div>`;
}

/* ---------- Cart ---------- */
Views.cart = () => {
  if (!state.cart.length) {
    return `<div class="view">
      <h1 class="page-title">${esc(t('cartTitle'))}</h1>
      <div class="empty">
        <div class="empty-icon">${icon('bag')}</div>
        <h2>${esc(t('cartEmpty'))}</h2><p>${esc(t('cartEmptyText'))}</p>
        <a class="btn btn-primary" href="#/catalog">${esc(t('ctaCatalog'))}</a>
        ${state.orders.length ? `<a class="btn btn-ghost" href="#/orders">${icon('receipt')}${esc(t('myOrders'))}</a>` : ''}
      </div>
      ${footerHtml()}
    </div>`;
  }
  const tot = totals(state.cart, 0);
  return `<div class="view">
    <div class="section-head">
      <h1 class="page-title">${esc(t('cartTitle'))}</h1>
      <button class="link-more" data-action="clear-cart">${esc(t('clearCart'))}</button>
    </div>
    <div class="cart-layout">
      <div class="cart-list">${state.cart.map(cartLineHtml).join('')}</div>
      <div class="cart-side">
        <div class="panel">
          ${summaryHtml(tot, true)}
          <a class="btn btn-primary btn-block" style="margin-top:14px" href="#/checkout">${esc(t('checkout'))}</a>
        </div>
        ${state.orders.length ? `<a class="btn btn-ghost btn-block" href="#/orders">${icon('receipt')}${esc(t('myOrders'))}</a>` : ''}
      </div>
    </div>
    ${footerHtml()}
  </div>`;
};

/* ---------- Checkout ---------- */
const PAYMENTS = ['payCash', 'payCard', 'payIdram'];

Views.checkout = () => {
  if (!state.cart.length) { location.replace('#/cart'); return ''; }
  const d = store.get('draft', { name: '', phone: '+374 ', region: 0, city: '', address: '', pay: 'payCash', note: '' });
  const tot = totals(state.cart, d.region);
  const field = (id, label, input) => `<div class="field" data-field="${id}"><label for="${id}">${esc(label)}</label>${input}<span class="err" hidden></span></div>`;
  return `<div class="view">
    <div class="crumbs"><a class="back-btn" href="#/cart">${icon('back')}${esc(t('cartTitle'))}</a></div>
    <h1 class="page-title">${esc(t('checkout'))}</h1>
    <form class="cart-layout" id="checkoutForm" novalidate>
      <div class="panel form">
        <h3>${esc(t('contactInfo'))}</h3>
        <div class="two">
          ${field('name', t('fullName'), `<input id="name" name="name" autocomplete="name" value="${esc(d.name)}" required>`)}
          ${field('phone', t('phone'), `<input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(d.phone)}" required>`)}
        </div>
        <div class="two">
          ${field('region', t('region'), `<select id="region" name="region">${REGIONS.map((r, i) => `<option value="${i}" ${Number(d.region) === i ? 'selected' : ''}>${esc(tx(r))}</option>`).join('')}</select>`)}
          <div id="cityWrap" ${Number(d.region) === 0 ? 'hidden' : ''}>${field('city', t('city'), `<input id="city" name="city" autocomplete="address-level2" value="${esc(d.city)}">`)}</div>
        </div>
        ${field('address', t('address'), `<input id="address" name="address" autocomplete="street-address" placeholder="${esc(t('addressPh'))}" value="${esc(d.address)}" required>`)}
        <div class="field"><label>${esc(t('payment'))}</label>
          <div class="radio-group">${PAYMENTS.map(k => `<label class="radio"><input type="radio" name="pay" value="${k}" ${d.pay === k ? 'checked' : ''}>${esc(t(k))}</label>`).join('')}</div>
        </div>
        ${field('note', t('note'), `<textarea id="note" name="note" placeholder="${esc(t('notePh'))}">${esc(d.note)}</textarea>`)}
      </div>
      <div class="cart-side">
        <div class="panel">
          <h3>${esc(t('cartTitle'))} · ${cartCount()}</h3>
          <div id="sum">${summaryHtml(tot, false)}</div>
          <button class="btn btn-primary btn-block" style="margin-top:14px" type="submit">${esc(t('placeOrder'))}</button>
        </div>
      </div>
    </form>
    ${footerHtml()}
  </div>`;
};

const phoneDigits = v => v.replace(/[^\d]/g, '');
const validPhone = v => {
  const d = phoneDigits(v);
  return /^374\d{8}$/.test(d) || /^0\d{8}$/.test(d) || /^\d{8}$/.test(d);
};

Views.checkout.mount = () => {
  const form = $('#checkoutForm');
  if (!form) return;
  const read = () => {
    const fd = new FormData(form);
    return {
      name: (fd.get('name') || '').trim(), phone: (fd.get('phone') || '').trim(),
      region: Number(fd.get('region') || 0), city: (fd.get('city') || '').trim(),
      address: (fd.get('address') || '').trim(), pay: fd.get('pay') || 'payCash', note: (fd.get('note') || '').trim()
    };
  };
  const setErr = (id, msg) => {
    const f = form.querySelector(`[data-field="${id}"]`);
    if (!f) return;
    f.classList.toggle('invalid', !!msg);
    const e = f.querySelector('.err');
    e.hidden = !msg;
    e.textContent = msg || '';
  };
  const onEdit = e => {
    const d = read();
    store.set('draft', d);
    if (e.target.id === 'region') {
      $('#cityWrap').hidden = d.region === 0;
      $('#sum').innerHTML = summaryHtml(totals(state.cart, d.region), false);
    }
    if (e.target.id) setErr(e.target.id, null);
  };
  form.addEventListener('input', onEdit);
  form.addEventListener('change', onEdit);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = read();
    const errs = {};
    if (!d.name) errs.name = t('required');
    if (!d.phone || phoneDigits(d.phone).length <= 3) errs.phone = t('required');
    else if (!validPhone(d.phone)) errs.phone = t('phoneInvalid');
    if (d.region !== 0 && !d.city) errs.city = t('required');
    if (!d.address) errs.address = t('required');
    ['name', 'phone', 'city', 'address'].forEach(k => setErr(k, errs[k]));
    const first = Object.keys(errs)[0];
    if (first) { $('#' + first).focus(); return; }

    const order = {
      num: String(Date.now()).slice(-6),
      date: new Date().toISOString(),
      lines: state.cart.map(l => ({ ...l, price: unitPrice(findProduct(l.id), l.size) })),
      customer: d,
      ...totals(state.cart, d.region)
    };
    state.orders = [order, ...state.orders];
    store.set('orders', state.orders);
    state.cart = [];
    saveCart();
    store.set('draft', { ...d, note: '' });
    await copyText(orderMessage(order));
    location.hash = `#/order/${order.num}`;
  });
};

function orderMessage(o) {
  const c = o.customer;
  const lines = o.lines.map((l, i) => {
    const p = findProduct(l.id);
    if (!p) return '';
    return `${i + 1}. ${productName(p)} — ${colorName(l.color)}, ${sizeLabel(p, l.size)} × ${l.qty} ${t('pcs')} = ${money(l.price * l.qty)}`;
  }).filter(Boolean);
  const place = [tx(REGIONS[c.region]), c.city, c.address].filter(Boolean).join(', ');
  return [
    t('msgHello'),
    '',
    ...lines,
    '',
    `${t('delivery')}: ${o.delivery ? money(o.delivery) : t('free')}`,
    `${t('total')}: ${money(o.total)}`,
    '',
    `${t('orderNum')}${o.num}`,
    `${t('fullName')}: ${c.name}`,
    `${t('phone')}: ${c.phone}`,
    `${t('address')}: ${place}`,
    `${t('payment')}: ${t(c.pay)}`,
    c.note ? `${t('note')}: ${c.note}` : ''
  ].filter((s, i, a) => s !== '' || a[i - 1] !== '').join('\n').trim();
}

/* ---------- Order confirmation ---------- */
Views.order = (params, num) => {
  const o = state.orders.find(x => x.num === num);
  if (!o) { location.replace('#/orders'); return ''; }
  return `<div class="view" style="max-width:560px;margin:0 auto">
    <div class="success">
      <div class="success-icon">${icon('check')}</div>
      <h1>${esc(t('orderDone'))}</h1>
      <div class="num">${esc(t('orderNum'))}${esc(o.num)} · ${money(o.total)}</div>
      <p>${esc(t('orderNext'))}</p>
    </div>
    <pre class="msg-preview" id="msg">${esc(orderMessage(o))}</pre>
    <div class="stack">
      <a class="btn btn-primary" href="${SHOP.directUrl}" target="_blank" rel="noopener">${icon('instagram')}${esc(t('sendDirect'))}</a>
      <button class="btn btn-ghost" data-action="copy-order" data-id="${esc(o.num)}">${icon('copy')}${esc(t('copyText'))}</button>
      <a class="btn btn-soft" href="#/catalog">${esc(t('continueShopping'))}</a>
    </div>
    ${footerHtml()}
  </div>`;
};

/* ---------- Order history ---------- */
Views.orders = () => {
  const loc = { hy: 'hy-AM', ru: 'ru-RU', en: 'en-GB' }[state.lang];
  return `<div class="view">
    <h1 class="page-title">${esc(t('myOrders'))}</h1>
    ${state.orders.length ? `<div class="orders">${state.orders.map(o => {
      const n = o.lines.reduce((s, l) => s + l.qty, 0);
      let date = '';
      try { date = new Date(o.date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' }); } catch { date = o.date.slice(0, 10); }
      return `<a class="order" href="#/order/${esc(o.num)}">
        <div class="order-top"><span>${esc(t('orderNum'))}${esc(o.num)}</span><span>${money(o.total)}</span></div>
        <div class="order-sub">${esc(date)} · ${n} ${esc(t('pcs'))}</div>
        <span class="status">${esc(t('statusNew'))}</span>
      </a>`;
    }).join('')}</div>` : `<div class="empty"><div class="empty-icon">${icon('receipt')}</div><h2>${esc(t('ordersEmpty'))}</h2>
      <a class="btn btn-primary" href="#/catalog">${esc(t('ctaCatalog'))}</a></div>`}
    ${footerHtml()}
  </div>`;
};
