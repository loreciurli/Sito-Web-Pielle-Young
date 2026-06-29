// Lightweight stroke icon set — consistent 1.75 weight
const Icon = ({ name, size = 22, stroke = 'currentColor' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    ball: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.6 5.6c3.4 3.4 9.4 3.4 12.8 0M5.6 18.4c3.4-3.4 9.4-3.4 12.8 0"/></>,
    shield: <path d="M12 3l8 3v6c0 4.5-3.3 8.4-8 9-4.7-.6-8-4.5-8-9V6l8-3z"/>,
    star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17.2l-5.4 2.8 1-6.2L3.2 9.5l6.1-.9L12 3z"/>,
    rocket: <><path d="M4.5 14.5c3-1 5.5-3.5 6.5-6.5a7 7 0 017-4l-1 5.5a8 8 0 01-5 5L7 16l-2.5-1.5z"/><path d="M9 15l-2 5 3.5-1M15 5a1 1 0 100 2 1 1 0 000-2z"/></>,
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 100-5M21 20c0-2.5-1.8-4.6-4-5"/></>,
    zap: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
    whistle: <><path d="M3 12a5 5 0 005 5h7l4-3v-4l-4-3H8a5 5 0 00-5 5z"/><circle cx="8" cy="12" r="1.5"/></>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2M9 10h.01M15 10h.01"/></>,
    check: <path d="M4 12l5 5L20 6"/>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    phone: <path d="M5 4l3 1 1.5 3.5L8 10a10 10 0 006 6l1.5-1.5L19 16l1 3-1.5 1.5A16 16 0 013.5 5.5L5 4z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    pin: <><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
    fb: <path d="M14 8h2V5h-2a3 3 0 00-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8z"/>,
    yt: <><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M11 9.5l4 2.5-4 2.5v-5z" fill="currentColor"/></>,
    tt: <path d="M14 4v8.5a3.5 3.5 0 11-3.5-3.5M14 4c.5 2.5 2.5 4 5 4v3c-2-.1-3.8-.7-5-1.7"/>,
    wa: <path fillRule="evenodd" clipRule="evenodd" d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3zm-3.4 4.6c-1.3 0-2.4 1-2.4 2.3 0 .2 0 .2 0 .4.1 1.2.7 2.4 1.6 3.6a11 11 0 0 0 3.7 3.6 9 9 0 0 0 3.6 1.6h.4c1.3 0 2.3-1.1 2.3-2.4 0-.4 0-.8-.5-1l-2-.9c-.3-.1-.5 0-.7.1l-.7.6c-.2.2-.4.2-.7.1a8 8 0 0 1-2-1.4 8 8 0 0 1-1.4-2c-.1-.3-.1-.5.1-.7l.6-.7c.1-.2.2-.4.1-.7l-.9-2c-.2-.5-.6-.5-1-.5z" fill="currentColor" stroke="none"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    x: <path d="M6 6l12 12M18 6L6 18"/>,
    award: <><circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></>,
    dribble: <><circle cx="8" cy="18" r="3"/><path d="M11 11l5-5 4 4-5 5"/><path d="M10 15l3-3M13 18l3-3"/></>,
    slider: <><path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h14M20 17h0"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="17" r="2"/></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></>,
    book: <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM4 5v16"/>,
    desk: <><path d="M4 19h16"/><path d="M5 17a7 7 0 0114 0"/><path d="M12 7V5M10.5 5h3"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
};

window.Icon = Icon;
