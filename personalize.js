(() => {
  const qs = new URLSearchParams(location.search);
  const pick = (key, fallback, max=80) => {
    const raw = (qs.get(key) || '').trim();
    return (raw || fallback).slice(0, max);
  };
  const invitee = pick('to', pick('name', '亲爱的朋友', 20), 20);
  const date = pick('date', '2026年8月29日 · 周六', 30);
  const time = pick('time', '19:30', 16);
  const venue = pick('venue', '王苗苗之家', 48);
  const host = pick('host', '王苗苗', 20);
  const dress = pick('dress', '轻松体面，适合拍照，也适合彻底放松', 60);
  const theme = pick('theme', (location.pathname.match(/(0[1-5])\.html$/)||[])[1] || '01', 2).padStart(2,'0');

  function hashText(str){
    let h = 2166136261;
    for (let i=0;i<str.length;i++){h ^= str.charCodeAt(i); h = Math.imul(h, 16777619);}
    return (h >>> 0).toString(36).toUpperCase().slice(-6).padStart(6,'0');
  }
  const prefix = { '01':'HAPPY', '02':'HP', '03':'DOC', '04':'SYS', '05':'DETOX' }[theme] || 'HAPPY';
  const code = pick('code', `${prefix}-${hashText(invitee+'|'+date+'|'+time)}`, 28);

  const replacements = [
    ['2026年8月29日 · 周六', date],
    ['19:30 起 · 快乐结束为止', `${time} 起 · 快乐结束为止`],
    ['本周六晚', `${date} ${time}`],
    ['王苗苗之家', venue],
    ['亲爱的朋友', invitee],
    ['王苗苗', host],
    ['轻松体面，适合拍照，也适合彻底放松', dress],
    ['HAPPY-0829-001', code],
    ['HP-20260829', code],
    ['快乐〔2026〕第08号', code],
    ['NO.0829', `NO.${code.split('-').pop()}`],
    ['19:30', time]
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes){
    let v = node.nodeValue;
    if (!v || !v.trim()) continue;
    for (const [from,to] of replacements) v = v.split(from).join(to);
    node.nodeValue = v;
  }

  document.title = `${invitee}｜成年人放风邀请函`;
  const desc = `邀请 ${invitee} 于 ${date} ${time} 前往 ${venue}，今晚暂停工作，只负责开心。`;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta){ meta = document.createElement('meta'); meta.name='description'; document.head.appendChild(meta); }
  meta.content = desc;

  // iOS/WeChat friendly viewport and tap behavior
  document.documentElement.style.webkitTextSizeAdjust = '100%';
  document.documentElement.style.textSizeAdjust = '100%';
  document.body.style.webkitTapHighlightColor = 'transparent';

  // Small recipient ribbon on the hero for stronger personalization.
  const hero = document.querySelector('.hero');
  if (hero && !document.getElementById('recipientRibbon')){
    const ribbon = document.createElement('div');
    ribbon.id = 'recipientRibbon';
    ribbon.textContent = `TO · ${invitee}`;
    ribbon.setAttribute('aria-label', `受邀人 ${invitee}`);
    ribbon.style.cssText = 'position:absolute;top:max(14px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:8;padding:8px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:rgba(8,14,13,.58);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font:700 11px/1.2 "PingFang SC",system-ui,sans-serif;letter-spacing:.12em;color:rgba(255,255,255,.86);white-space:nowrap;max-width:88%;overflow:hidden;text-overflow:ellipsis';
    hero.appendChild(ribbon);
  }

  // Expose parsed data for theme scripts / debugging without leaking anything sensitive.
  window.INVITE_DATA = Object.freeze({ invitee, date, time, venue, host, dress, code, theme });
})();