// Unborn Universe site behaviour: pixel art, mobile menu, copy-IP, example feed.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pixel art drawn from small bitmaps so no image files are needed.
  const PAL = { o: '#7a0f15', r: '#e0313a', h: '#ffffff', w: '#f4eeee', g: '#a89a9a', d: '#4a3a3a' };
  const ART = {
    heart: ['.oo...oo.', 'orro.orro', 'ohrrorrro', 'orrrrrrro', '.orrrrro.', '..orrro..', '...oro...', '....o....'],
    sword: ['.......ww', '......www', '.....www.', '....www..', 'd..www...', '.dwww....', '..dd.....', '.d.dd....', 'd........'],
    map: ['ggggggggg', 'gwwwwwwwg', 'gwddwwwwg', 'gwwdwwrwg', 'gwwwdwwwg', 'gwwwwdwwg', 'gwwwwwddg', 'gwwwwwwwg', 'ggggggggg'],
    shield: ['wwwwwwwww', 'wgggggggw', 'wgggrgggw', 'wggrrrggw', 'wgggrgggw', '.wgggggw.', '.wgggggw.', '..wgggw..', '...www...'],
    book: ['.ddddddd.', 'dwwwwwwwd', 'dwgggwwwd', 'dwwwwwwwd', 'dwgggggwd', 'dwwwwwwwd', 'dwggggwwd', 'dwwwwwwwd', '.ddddddd.']
  };
  const svg = (name, w) => {
    const rows = ART[name], H = rows.length, W = rows[0].length;
    let r = '';
    rows.forEach((row, y) => [...row].forEach((c, x) => { if (c !== '.') r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; }));
    const size = w ? `width="${w}" height="${Math.round(w * H / W)}"` : 'width="100%" height="100%"';
    return `<svg viewBox="0 0 ${W} ${H}" ${size} shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
  };
  document.querySelectorAll('[data-heart]').forEach(el => { el.innerHTML = svg('heart', +el.dataset.heart); });
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = svg(el.dataset.icon); });

  const burger = document.getElementById('burger'), links = document.getElementById('links');
  if (burger) {
    burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
    links.addEventListener('click', e => { if (e.target.tagName === 'A') { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
  }

  const toast = document.getElementById('toast');
  const say = t => { if (!toast) return; toast.textContent = t; toast.classList.add('on'); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('on'), 1800); };
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
    const text = b.dataset.copy;
    const fallback = () => { const code = b.parentElement.querySelector('code'); if (code) { const r = document.createRange(); r.selectNodeContents(code); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } say('Press Ctrl+C to copy'); };
    try { navigator.clipboard.writeText(text).then(() => say('IP copied'), fallback); } catch (e) { fallback(); }
  }));

  const feed = document.getElementById('feed');
  if (feed) {
    const ex = [
      ['Kestrel_09', 'fell from the cliffs above Greyreach', '41d'],
      ['Mira_Vale', 'was unmade by ashwalker at the eastern pass', '12d'],
      ['tonbo', 'drowned beneath the ice of Stillwater', '3d'],
      ['Oren_Pike', 'burned in lava at y −54', '19h'],
      ['nightwren', 'met a creeper on the first night', '42m'],
      ['Hollowmere', 'fell at the siege of Hearthfall', '67d']
    ];
    let k = 0;
    const push = () => {
      const [n, f, t] = ex[k++ % ex.length];
      const li = document.createElement('li');
      li.innerHTML = `<span class="who">${n}</span><span>${f}</span><span class="t">lived ${t}</span>`;
      if (!reduce) li.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'ease-out' });
      feed.prepend(li);
      while (feed.children.length > 4) feed.lastChild.remove();
    };
    for (let i = 0; i < 4; i++) push();
    if (!reduce) setInterval(push, 4000);
  }
})();
