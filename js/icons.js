/* Brand mark and interface icons (product pictures are photos — see js/photos.js) */

const Icons = (() => {
  /* Brand mark, redrawn after the Instagram logo */
  function logo() {
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#f7e6e0"/>
      <path d="M14 30L32 14L50 30" fill="none" stroke="#d8b0a8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 46V36Q19 26 31 24V46Z" fill="#9aa889"/>
      <g stroke="#c98f8a" stroke-width="1.5" fill="none">
        <path d="M34 28L44 38L34 48M44 28L34 38L44 48"/>
        <path d="M39 26V50M33 38H45" opacity=".6"/>
      </g>
    </svg>`;
  }

  const ICONS = {
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    bag: '<path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    factory: '<path d="M3 20V10l5 3V10l5 3V6h4l1 14Z"/><path d="M3 20h18"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7Z"/>',
    scissors: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5 20 18M8 15.5 20 6"/>',
    needle: '<path d="M19 5 7 17l-2 2"/><path d="M17 4.5a1.6 1.6 0 0 1 2.5 2"/><path d="M10 6c-4 0-5 5-1 6s4 6-1 7"/>',
    check: '<circle cx="12" cy="12" r="8.5"/><path d="m8 12 3 3 5-6"/>',
    box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4Z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    ruler: '<path d="M3 16 16 3l5 5L8 21Z"/><path d="M7 12l2 2M10 9l2 2M13 6l2 2"/>',
    leaf: '<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z"/><path d="M5 19 13 11"/>',
    cotton: '<circle cx="9" cy="10" r="3.5"/><circle cx="15" cy="10" r="3.5"/><circle cx="12" cy="14.5" r="3.5"/><path d="M12 18v3"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6" fill="currentColor"/>',
    threads: '<path d="M16.5 11.2c-.3-2.6-2-3.9-4.3-3.9-2 0-3.3 1-3.8 2.2"/><path d="M16.6 11.4c-2.6-.6-6.3-.4-6.3 2.1 0 2.3 4.4 2.6 5.6-.2.9-2.1.5-6.4-3.9-6.4-4.1 0-6 2.9-6 5.1 0 3.7 2.2 6.8 6.1 6.8 3.4 0 5.6-2 5.6-4.3"/>',
    send: '<path d="M21 3 10 14"/><path d="M21 3l-7 18-4-7-7-4Z"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z"/><path d="M9 8h6M9 12h6"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    play: '<path d="M8 5v14l11-7Z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    compare: '<path d="M8 3v18M16 3v18"/><path d="M4 7l4-4 4 4M12 17l4 4 4-4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>'
  };

  const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  return { logo, icon };
})();
