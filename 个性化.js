(() => {
  const p = new URLSearchParams(location.search);
  const clean = (v) => (v == null ? "" : String(v).trim());

  const values = {
    to: clean(p.get("to")),
    venue: clean(p.get("venue") || p.get("address")),
    date: clean(p.get("date")),
    day: clean(p.get("day")),
    time: clean(p.get("time")),
    brand: clean(p.get("brand") || p.get("host")),
  };

  const replacements = [];
  if (values.to) replacements.push(
    ["李思琪", values.to]
  );
  if (values.venue) replacements.push(
    ["王苗苗之家", values.venue]
  );
  if (values.time) replacements.push(
    ["19:30", values.time]
  );
  if (values.day) replacements.push(
    ["周六", values.day]
  );
  if (values.date) {
    // Support common forms entered by the inviter.
    const normalized = values.date.replace(/[年月.\-]/g, "/").replace(/日/g, "");
    const parts = normalized.split("/").filter(Boolean);
    const md = parts.length >= 2 ? parts.slice(-2) : parts;
    const mm = md[0] ? String(Number(md[0])).padStart(2, "0") : "";
    const dd = md[1] ? String(Number(md[1])).padStart(2, "0") : "";
    if (mm && dd) {
      replacements.push(["08/29", `${mm}/${dd}`]);
      replacements.push(["08.29", `${mm}.${dd}`]);
      replacements.push(["8.29", `${Number(mm)}.${Number(dd)}`]);
      replacements.push(["8月29日", `${Number(mm)}月${Number(dd)}日`]);
      replacements.push(["0829", `${mm}${dd}`]);
    }
  }
  if (values.brand) replacements.push(
    ["天桥短剧", values.brand],
    ["TIANQIAO DRAMA", values.brand.toUpperCase()]
  );

  function transformText(s) {
    let out = s;
    for (const [from, to] of replacements) {
      if (from && to) out = out.split(from).join(to);
    }
    return out;
  }

  function patch(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const next = transformText(root.nodeValue || "");
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement && /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/i.test(node.parentElement.tagName)) continue;
      const next = transformText(node.nodeValue || "");
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  }

  const observer = new MutationObserver(records => {
    for (const r of records) {
      for (const n of r.addedNodes) patch(n);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    patch(document.body);
    observer.observe(document.body, {childList:true, subtree:true});
    const who = values.to ? ` · ${values.to}` : "";
    document.title = document.title + who;
  });
})();