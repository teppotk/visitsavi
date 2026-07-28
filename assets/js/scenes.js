/*
 * scenes.js — generoi kerroksellisia SVG-maisemia teeman mukaan.
 * Ei ulkoisia kuvia: kaikki piirretään koodilla, joten sivusto toimii offline.
 * Teemat: jarvi, harju, metsa, linnoitus, kirkko, mylly, museo, koski, talvi, saari, kyla, hero
 */
window.SCENES = (function () {
  "use strict";

  // Mielialat = värikerrokset (taivas ylhäältä alas, vesi, kukkulat, aurinko)
  const MOODS = {
    dusk:   { sky: ["#f7cf9e", "#ec9a63", "#9c5f74", "#3f4a6b"], water: ["#3a7688", "#123f4d"], hill: ["#173f4a", "#0c2a33"], hillFar: ["#3d6f78", "#255661"], orb: "#ffe6bd", orbGlow: "#ffcf97" },
    day:    { sky: ["#d6efec", "#acdbe0", "#7cbccb", "#4b8fa6"], water: ["#2f92a6", "#0b3d4f"], hill: ["#1c5b57", "#123a47"], hillFar: ["#5b9aa0", "#3f7f88"], orb: "#fbfbe8", orbGlow: "#f4f4cf" },
    winter: { sky: ["#eef4f5", "#d2e5ea", "#b2cfda", "#90b0c6"], water: ["#cfe9e6", "#9cc7cc"], hill: ["#93aeba", "#61808d"], hillFar: ["#c2d6dd", "#a2bcc6"], orb: "#ffffff", orbGlow: "#e8f3f5" },
    forest: { sky: ["#dcece0", "#bdd9c6", "#93bcaa", "#5f9081"], water: ["#3f948b", "#1e5f5a"], hill: ["#1a4d3e", "#0f3327"], hillFar: ["#4f8272", "#356355"], orb: "#eef6dd", orbGlow: "#dcecc2" },
    night:  { sky: ["#102a44", "#123a5a", "#1e5f6e", "#2f8f7a"], water: ["#0a2733", "#06171f"], hill: ["#0a212b", "#050f14"], hillFar: ["#123845", "#0c2731"], orb: "#c7e8e4", orbGlow: "#8fd0c8" }
  };

  const THEME_MOOD = {
    jarvi: "day", harju: "day", metsa: "forest", linnoitus: "dusk",
    kirkko: "day", mylly: "day", museo: "dusk", koski: "forest",
    talvi: "winter", saari: "day", kyla: "dusk", hero: "dusk"
  };

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < String(str).length; i++) {
      h ^= String(str).charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
  }
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function grad(id, stops, x1, y1, x2, y2) {
    const s = stops.map(function (c, i) {
      const off = Math.round((i / (stops.length - 1)) * 100);
      return '<stop offset="' + off + '%" stop-color="' + c + '"/>';
    }).join("");
    return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" gradientUnits="userSpaceOnUse">' + s + "</linearGradient>";
  }

  // Pehmeä kukkulan reunaviiva
  function ridgePath(baseY, amp, rand, W) {
    const pts = [];
    const n = 6;
    for (let i = 0; i <= n; i++) {
      const x = (W / n) * i;
      const y = baseY + Math.sin(i * 1.3 + rand() * 6) * amp * (0.6 + rand() * 0.7);
      pts.push([x, y]);
    }
    let d = "M0," + (baseY + 400) + " L0," + pts[0][1].toFixed(1);
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = (pts[i][0] + pts[i + 1][0]) / 2;
      d += " Q" + pts[i][0].toFixed(1) + "," + pts[i][1].toFixed(1) + " " + cx.toFixed(1) + "," + ((pts[i][1] + pts[i + 1][1]) / 2).toFixed(1);
    }
    d += " T" + W + "," + pts[pts.length - 1][1].toFixed(1);
    d += " L" + W + "," + (baseY + 400) + " Z";
    return d;
  }

  function pine(x, base, h, w, fill) {
    const half = w / 2;
    let d = "M" + x + "," + base;
    const tiers = 3;
    for (let t = 0; t < tiers; t++) {
      const ty = base - (h * (t + 1)) / tiers;
      const tw = half * (1 - t / (tiers + 0.5));
      d += " M" + (x - tw) + "," + (base - (h * t) / tiers) +
           " L" + x + "," + ty +
           " L" + (x + tw) + "," + (base - (h * t) / tiers) + " Z";
    }
    return '<path d="' + d + '" fill="' + fill + '"/>' +
           '<rect x="' + (x - 2) + '" y="' + base + '" width="4" height="10" fill="' + fill + '"/>';
  }

  function pineRow(rand, base, count, hMin, hMax, fill, W) {
    let out = "";
    for (let i = 0; i < count; i++) {
      const x = rand() * W;
      const h = hMin + rand() * (hMax - hMin);
      out += pine(x, base + rand() * 6, h, h * 0.7, fill);
    }
    return out;
  }

  // Rakennus-siluetit
  function church(cx, base, m) {
    const c = m.hill[0];
    return '<g fill="' + c + '">' +
      '<rect x="' + (cx - 55) + '" y="' + (base - 70) + '" width="110" height="70"/>' +
      '<path d="M' + (cx - 62) + ',' + (base - 70) + ' L' + cx + ',' + (base - 108) + ' L' + (cx + 62) + ',' + (base - 70) + ' Z"/>' +
      '<rect x="' + (cx - 16) + '" y="' + (base - 150) + '" width="32" height="82"/>' +
      '<path d="M' + (cx - 22) + ',' + (base - 150) + ' L' + cx + ',' + (base - 205) + ' L' + (cx + 22) + ',' + (base - 150) + ' Z"/>' +
      '<rect x="' + (cx - 3) + '" y="' + (base - 232) + '" width="6" height="30"/>' +
      '<rect x="' + (cx - 12) + '" y="' + (base - 214) + '" width="24" height="6"/>' +
      '</g>';
  }
  function windmill(cx, base, m) {
    const c = m.hill[0];
    const hub = base - 96;
    return '<g fill="' + c + '">' +
      '<path d="M' + (cx - 34) + ',' + base + ' L' + (cx - 22) + ',' + (base - 90) + ' L' + (cx + 22) + ',' + (base - 90) + ' L' + (cx + 34) + ',' + base + ' Z"/>' +
      '<g stroke="' + c + '" stroke-width="7" stroke-linecap="round">' +
      '<line x1="' + cx + '" y1="' + hub + '" x2="' + (cx - 62) + '" y2="' + (hub - 44) + '"/>' +
      '<line x1="' + cx + '" y1="' + hub + '" x2="' + (cx + 62) + '" y2="' + (hub + 44) + '"/>' +
      '<line x1="' + cx + '" y1="' + hub + '" x2="' + (cx - 44) + '" y2="' + (hub + 62) + '"/>' +
      '<line x1="' + cx + '" y1="' + hub + '" x2="' + (cx + 44) + '" y2="' + (hub - 62) + '"/>' +
      '</g><circle cx="' + cx + '" cy="' + hub + '" r="7"/></g>';
  }
  function fortress(cx, base, m) {
    const c = m.hill[0];
    let merlons = "";
    for (let i = 0; i < 7; i++) {
      merlons += '<rect x="' + (cx - 96 + i * 28) + '" y="' + (base - 72) + '" width="16" height="16"/>';
    }
    return '<g fill="' + c + '">' +
      '<path d="M' + (cx - 120) + ',' + base + ' L' + (cx - 96) + ',' + (base - 58) + ' L' + (cx + 96) + ',' + (base - 58) + ' L' + (cx + 120) + ',' + base + ' Z"/>' +
      merlons +
      '<rect x="' + (cx - 14) + '" y="' + (base - 96) + '" width="28" height="40"/>' +
      '</g>';
  }
  function rooftops(rand, base, m, W) {
    let out = "";
    const c = m.hill[0], c2 = m.hillFar[0];
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * (W / 6) * 0.9 + rand() * 40;
      const w = 60 + rand() * 50;
      const h = 40 + rand() * 30;
      const fill = i % 2 ? c : c2;
      out += '<g fill="' + fill + '"><rect x="' + x + '" y="' + (base - h) + '" width="' + w + '" height="' + h + '"/>' +
        '<path d="M' + (x - 8) + ',' + (base - h) + ' L' + (x + w / 2) + ',' + (base - h - 26) + ' L' + (x + w + 8) + ',' + (base - h) + ' Z"/></g>';
    }
    return out;
  }
  function rapids(rand, W, waterTop) {
    let out = '<g stroke="#ffffff" stroke-opacity="0.5" stroke-width="3" fill="none">';
    for (let i = 0; i < 22; i++) {
      const x = rand() * W;
      const y = waterTop + 12 + rand() * 120;
      const len = 20 + rand() * 46;
      out += '<path d="M' + x + ',' + y + ' q' + (len / 2) + ',-8 ' + len + ',0"/>';
    }
    return out + "</g>";
  }
  function iceCracks(rand, W, waterTop, H) {
    let out = '<g stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.5" fill="none">';
    for (let i = 0; i < 6; i++) {
      let x = rand() * W, y = waterTop + 20 + rand() * (H - waterTop - 30);
      let d = "M" + x + "," + y;
      for (let s = 0; s < 4; s++) {
        x += (rand() - 0.5) * 180;
        y += (rand() - 0.3) * 60;
        d += " L" + x.toFixed(0) + "," + y.toFixed(0);
      }
      out += '<path d="' + d + '"/>';
    }
    return out + "</g>";
  }

  function build(theme, seed) {
    const W = 1200, H = 675;
    const mood = MOODS[THEME_MOOD[theme] || "day"];
    const r = rng(seed);
    const uid = "s" + (seed % 100000);
    const horizon = 402 + Math.round((r() - 0.5) * 30);
    const hasWater = ["jarvi", "koski", "talvi", "saari"].indexOf(theme) !== -1;
    const waterTop = hasWater ? horizon : H + 50;

    let defs = "<defs>" +
      grad(uid + "sky", mood.sky, 0, 0, 0, horizon) +
      grad(uid + "water", mood.water, 0, waterTop, 0, H) +
      grad(uid + "hill", mood.hill, 0, horizon - 60, 0, H) +
      grad(uid + "hillfar", mood.hillFar, 0, horizon - 120, 0, horizon + 40) +
      '<radialGradient id="' + uid + 'orb" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="' + mood.orb + '"/>' +
      '<stop offset="60%" stop-color="' + mood.orbGlow + '" stop-opacity="0.6"/>' +
      '<stop offset="100%" stop-color="' + mood.orbGlow + '" stop-opacity="0"/></radialGradient>' +
      "</defs>";

    // Taivas
    let g = '<rect width="' + W + '" height="' + horizon + '" fill="url(#' + uid + 'sky)"/>';

    // Aurinko / kuu
    const orbX = 200 + r() * 800, orbY = 90 + r() * 150, orbR = 46 + r() * 26;
    g += '<circle cx="' + orbX.toFixed(0) + '" cy="' + orbY.toFixed(0) + '" r="' + (orbR * 2.4).toFixed(0) + '" fill="url(#' + uid + 'orb)"/>';
    g += '<circle cx="' + orbX.toFixed(0) + '" cy="' + orbY.toFixed(0) + '" r="' + orbR.toFixed(0) + '" fill="' + mood.orb + '" fill-opacity="0.95"/>';

    // Tähdet yöhön
    if (THEME_MOOD[theme] === "night") {
      let stars = '<g fill="#ffffff">';
      for (let i = 0; i < 40; i++) stars += '<circle cx="' + (r() * W).toFixed(0) + '" cy="' + (r() * (horizon - 80)).toFixed(0) + '" r="' + (r() * 1.4 + 0.4).toFixed(1) + '" fill-opacity="' + (0.3 + r() * 0.6).toFixed(2) + '"/>';
      g += stars + "</g>";
    }

    // Kaukaiset kukkulat
    g += '<path d="' + ridgePath(horizon - 46, 34, r, W) + '" fill="url(#' + uid + 'hillfar)"/>';

    // Vesi tai lähikukkula
    if (hasWater) {
      g += '<rect x="0" y="' + waterTop + '" width="' + W + '" height="' + (H - waterTop) + '" fill="url(#' + uid + 'water)"/>';
      // auringon heijastus
      g += '<rect x="' + (orbX - 26) + '" y="' + waterTop + '" width="52" height="' + (H - waterTop) + '" fill="' + mood.orb + '" fill-opacity="0.18"/>';
      if (theme === "saari") {
        // pieni saari
        g += '<path d="' + ridgePath(waterTop + 60, 20, r, W) + '" fill="url(#' + uid + 'hill)" transform="translate(0,-6)"/>';
      }
      if (theme === "koski") g += rapids(r, W, waterTop);
      if (theme === "talvi") { g += '<rect x="0" y="' + waterTop + '" width="' + W + '" height="' + (H - waterTop) + '" fill="#ffffff" fill-opacity="0.35"/>'; g += iceCracks(r, W, waterTop, H); }
    }

    // Lähikukkula + puut / rakennukset
    const nearBase = horizon + (hasWater ? -2 : 30);
    g += '<path d="' + ridgePath(nearBase, 26, r, W) + '" fill="url(#' + uid + 'hill)"/>';

    const treeFill = mood.hill[1];
    if (["harju", "metsa", "koski", "saari"].indexOf(theme) !== -1) {
      g += pineRow(r, horizon + 34, theme === "metsa" ? 14 : 8, 40, 92, treeFill, W);
    }
    if (theme === "kirkko") g += church(300 + r() * 600, horizon + 20, mood);
    if (theme === "mylly") g += windmill(340 + r() * 520, horizon + 18, mood);
    if (theme === "linnoitus") g += fortress(320 + r() * 560, horizon + 16, mood);
    if (theme === "kyla" || theme === "museo") { g += rooftops(r, horizon + 22, mood, W); g += pineRow(r, horizon + 30, 4, 40, 70, treeFill, W); }

    return '<svg class="scene" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
      defs + g + "</svg>";
  }

  return {
    svg: function (theme, key) {
      return build(theme || "day", hash((theme || "day") + "|" + (key || "")));
    }
  };
})();
