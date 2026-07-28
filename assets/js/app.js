/*
 * app.js — Visit Savitaipale
 * Rakentaa navigaation ja footerin, renderöi kortit/tapahtumat/kartan ja
 * hoitaa suodatuksen, yksittäiskohteen ja kevyet animaatiot.
 * Toimii ilman palvelinta (data.js ladataan <script>-tagilla).
 */
(function () {
  "use strict";
  var D = window.SAVITAIPALE, S = window.SCENES;

  var NAV = [
    { id: "index",      href: "index.html",             teksti: "Etusivu" },
    { id: "nae-ja-koe", href: "nae-ja-koe.html",         teksti: "Näe & koe" },
    { id: "luonto",     href: "luonto-ja-retkeily.html", teksti: "Luonto & retkeily" },
    { id: "tekemista",  href: "tekemista.html",          teksti: "Tekemistä" },
    { id: "majoitus",   href: "majoitus.html",           teksti: "Majoitus & ruoka" },
    { id: "tapahtumat", href: "tapahtumat.html",         teksti: "Tapahtumat" },
    { id: "tarinat",    href: "tarinat.html",            teksti: "Tarinat" },
    { id: "suunnittele",href: "suunnittele.html",        teksti: "Suunnittele matkasi" }
  ];

  var KK = ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"];
  var KK_GEN = ["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kesäkuuta","heinäkuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"];

  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  var logoMark =
    '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true">' +
    '<circle cx="20" cy="20" r="20" fill="#0b3d4f"/>' +
    '<path d="M0 26 Q10 20 20 24 T40 24 V40 H0 Z" fill="#2e8fa3"/>' +
    '<path d="M0 31 Q12 27 20 30 T40 30 V40 H0 Z" fill="#bfe3e0"/>' +
    '<path d="M8 22 L14 12 L20 22 Z M18 24 L26 9 L34 24 Z" fill="#d8c4a0"/>' +
    '<circle cx="29" cy="12" r="3.4" fill="#d9642a"/>' +
    '</svg>';

  /* ---------------- Header ---------------- */
  function buildHeader(active) {
    var links = NAV.map(function (n) {
      var cur = n.id === active ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + '>' + esc(n.teksti) + "</a>";
    }).join("");
    return el(
      '<header class="site-header"><div class="wrap site-header__inner">' +
      '<a class="brand" href="index.html">' + logoMark +
      '<span class="brand__name">Visit Savitaipale<small>Kahden veden maa</small></span></a>' +
      '<button class="nav-toggle" aria-label="Valikko" aria-expanded="false"><span></span></button>' +
      '<nav class="nav" aria-label="Päävalikko">' + links + "</nav>" +
      "</div></header>"
    );
  }

  /* ---------------- Footer ---------------- */
  function buildFooter() {
    function col(title, items) {
      return '<div><h4>' + title + '</h4><ul>' +
        items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></div>";
    }
    var nav1 = ['<a href="nae-ja-koe.html">Näe &amp; koe</a>','<a href="luonto-ja-retkeily.html">Luonto &amp; retkeily</a>','<a href="tekemista.html">Tekemistä</a>'];
    var nav2 = ['<a href="majoitus.html">Majoitus &amp; ruoka</a>','<a href="tapahtumat.html">Tapahtumat</a>','<a href="tarinat.html">Tarinat</a>','<a href="suunnittele.html">Suunnittele matkasi</a>'];
    var yht = ['Savitaipaleen kunta','Peltoinlahdentie 3 a, 54800','kunta@savitaipale.fi','Matkailuneuvonta: gosaimaa.com'];
    return el(
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><div class="brand" style="margin-bottom:.8rem">' + logoMark +
      '<span class="brand__name" style="color:#fff">Visit Savitaipale<small>Kahden veden maa</small></span></div>' +
      '<p>' + esc(D.brand.kuvaus) + '</p></div>' +
      col("Koe", nav1) + col("Suunnittele", nav2) + col("Yhteystiedot", yht) +
      '</div>' +
      '<div class="footer-disclaimer"><strong>Prototyyppi.</strong> Tämä on esittelyversio Savitaipaleen matkailusivustosta. ' +
      'Sisältö perustuu julkisiin lähteisiin; hinnat, aukioloajat ja päivämäärät on tarkistettava ennen julkaisua. ' +
      'Valokuvat: Wikimedia Commons ja Flickr (CC BY / CC BY-SA), tekijät mainittu kuvien yhteydessä ja <a href="suunnittele.html#main">Suunnittele-sivulla</a>. Osa kuvituksesta on tyyliteltyä grafiikkaa.</div>' +
      '<div class="footer-bottom"><span>© ' + '2026 Visit Savitaipale</span><span>61.20° N · 27.69° E</span></div>' +
      "</div></footer>"
    );
  }

  /* ---------------- Kuvat (valokuva tai SVG-kuvitus) ---------------- */
  function imgTag(file, alt) {
    return '<img class="ph" src="assets/img/' + file + '" alt="' + esc(alt || "") + '" loading="lazy">';
  }
  // Median sisältö kortille/herolle: valokuva jos on, muuten teemakuvitus
  function media(k) {
    return k.kuva ? imgTag(k.kuva, k.kuvaAlt) : S.svg(k.teema, k.id);
  }
  function credit(file) {
    var c = (D.kuvat || {})[file];
    if (!c) return "";
    return '<span class="photocredit">Kuva: <a href="' + c.lahde + '" target="_blank" rel="noopener">' +
      esc(c.tekija) + "</a> · " + '<a href="' + c.lisenssiUrl + '" target="_blank" rel="noopener">' + esc(c.lisenssi) + "</a></span>";
  }

  /* ---------------- Kortti ---------------- */
  function cardHTML(k) {
    var badge = k.geopark
      ? '<span class="card__badge card__badge--geo">Geopark</span>'
      : (k.kyla ? '<span class="card__badge">' + esc(k.kyla) + "</span>" : "");
    var meta = (k.vuodenajat && k.vuodenajat[0]) ? seasonLabel(k.vuodenajat) : "";
    return '<a class="card reveal" href="kohde.html?id=' + encodeURIComponent(k.id) + '">' +
      '<div class="card__media">' + media(k) + badge + "</div>" +
      '<div class="card__body">' +
      '<span class="card__type">' + esc(k.tyyppi) + "</span>" +
      '<h3 class="card__title">' + esc(k.nimi) + "</h3>" +
      '<p class="card__desc">' + esc(k.seloste) + "</p>" +
      '<div class="card__foot"><span>' + esc(meta) + '</span><span class="arrow" aria-hidden="true">→</span></div>' +
      "</div></a>";
  }

  function featureHTML(k) {
    return '<a class="feature reveal" href="kohde.html?id=' + encodeURIComponent(k.id) + '">' +
      '<div class="feature__media">' + media(k) +
      (k.geopark ? '<span class="card__badge card__badge--geo">Geopark</span>' : "") + "</div>" +
      '<div class="feature__body"><span class="card__type">' + esc(k.tyyppi) + " · Kärkikohde</span>" +
      '<h3>' + esc(k.nimi) + "</h3><p>" + esc(k.seloste) + "</p>" +
      '<span class="btn btn--ghost" style="align-self:flex-start;margin-top:1rem">Lue lisää →</span></div></a>';
  }

  function seasonLabel(arr) {
    var map = { "kesä": "Kesä", "talvi": "Talvi", "syksy": "Syksy", "kevät": "Kevät", "ympärivuotinen": "Ympäri vuoden" };
    return arr.map(function (s) { return map[s] || s; }).join(" · ");
  }

  /* ---------------- Google Maps (avaimeton) ---------------- */
  function mapQuery(k) {
    if (k.koord) return k.koord.lat.toFixed(5) + "," + k.koord.lng.toFixed(5);
    var o = (k.tiedot || []).filter(function (t) { return /osoite/i.test(t.label); })[0];
    if (o) return o.arvo;
    return k.nimi + ", Savitaipale";
  }
  function gmapEmbedSrc(q) { return "https://maps.google.com/maps?q=" + encodeURIComponent(q) + "&z=13&hl=fi&output=embed"; }
  function gmapSearch(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function gmapDir(q) { return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q); }
  function gmapBlock(k) {
    var q = mapQuery(k);
    return '<div class="gmap"><iframe title="Kartta: ' + esc(k.nimi) + '" src="' + gmapEmbedSrc(q) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
      '<div class="map-actions">' +
      '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + gmapDir(q) + '">Reittiohjeet ↗</a>' +
      '<a class="btn btn--ghost" target="_blank" rel="noopener" href="' + gmapSearch(q) + '">Avaa Google Mapsissa ↗</a>' +
      "</div>";
  }

  function haversineKm(la1, lo1, la2, lo2) {
    var R = 6371, rad = Math.PI / 180;
    var dLa = (la2 - la1) * rad, dLo = (lo2 - lo1) * rad;
    var a = Math.sin(dLa / 2) * Math.sin(dLa / 2) +
      Math.cos(la1 * rad) * Math.cos(la2 * rad) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function fmtKm(d) { return d < 1 ? Math.round(d * 1000) + " m" : d.toFixed(1).replace(".", ",") + " km"; }

  /* ---------------- Lähellä sinua (GPS) ---------------- */
  function renderNearby(container) {
    var pts = D.kohteet.filter(function (k) { return k.koord; });
    var box = el('<div class="nearby"></div>');
    var cta = el('<div class="nearby__cta"></div>');
    var btn = el('<button class="btn btn--primary" type="button">📍 Näytä lähimmät kohteet</button>');
    var msg = el('<p class="nearby__msg"></p>');
    var results = el('<div class="nearby__list"></div>');

    // Manuaalinen lähtöpiste — varakeino jos paikannus ei ole käytettävissä (esim. demokoneella)
    var PLACES = [
      ["Savitaipaleen keskusta", 61.19381, 27.67361],
      ["Olkkolan Hovi", 61.20167, 27.67069],
      ["Partakoski / Kärnäkoski", 61.26163, 27.71185],
      ["Suomensalo (Kuolimo)", 61.24053, 27.56747]
    ];
    var fb = el('<div class="nearby__fallback"><span>Tai valitse lähtöpiste:</span></div>');
    var sel = el('<select class="nearby__select" aria-label="Valitse lähtöpiste">' +
      '<option value="">– valitse –</option>' +
      PLACES.map(function (p, i) { return '<option value="' + i + '">' + esc(p[0]) + "</option>"; }).join("") +
      "</select>");
    fb.appendChild(sel);
    sel.addEventListener("change", function () {
      if (sel.value !== "") { var p = PLACES[+sel.value]; showResults(p[1], p[2]); }
    });

    cta.appendChild(btn); cta.appendChild(msg);
    box.appendChild(cta); box.appendChild(fb); box.appendChild(results);
    container.appendChild(box);

    if (location.protocol === "file:") {
      msg.textContent = "Vinkki: paikannus toimii vain palvelimelta ajettaessa (esim. http://localhost), ei suoraan tiedostosta avattaessa.";
    }

    function showResults(la, lo) {
      btn.disabled = false;
      var sorted = pts.map(function (k) { return { k: k, d: haversineKm(la, lo, k.koord.lat, k.koord.lng) }; })
        .sort(function (a, b) { return a.d - b.d; });
      msg.textContent = "Lähimmät kohteet — napauta kohdetta reittiohjeisiin.";
      results.innerHTML = sorted.slice(0, 8).map(function (o) {
        var q = mapQuery(o.k);
        var url = "kohde.html?id=" + encodeURIComponent(o.k.id);
        return '<div class="nearby__item">' +
          '<span class="nearby__dist">' + fmtKm(o.d) + "</span>" +
          '<span class="nearby__info"><b>' + esc(o.k.nimi) + "</b><small>" + esc(o.k.tyyppi) +
          (o.k.kyla ? " · " + esc(o.k.kyla) : "") + "</small></span>" +
          '<span class="nearby__actions">' +
          '<a class="na-primary" href="' + url + '">Tutki kohdetta →</a>' +
          '<a class="na-map" href="' + gmapDir(q) + '" target="_blank" rel="noopener">Reitti ↗</a>' +
          "</span></div>";
      }).join("");
      // Onnistumisen jälkeen nappi hillitymmäksi, jotta se ei näytä yhä "painettavalta CTA:lta"
      btn.classList.remove("btn--primary");
      btn.classList.add("btn--ghost");
      btn.textContent = "↻ Päivitä sijainti";
    }
    function fail(err) {
      btn.disabled = false;
      var code = err && err.code;
      if (code === 1) {
        msg.textContent = "Paikannus estetty. Salli sijainnin käyttö selaimessa — ja macOSissa myös Järjestelmäasetukset → Tietosuoja ja suojaus → Sijaintipalvelut (salli selain).";
      } else if (code === 3) {
        msg.textContent = "Paikannus aikakatkaistiin. Yritä uudelleen; WiFi päällä tai ulkona sijainti löytyy paremmin.";
      } else {
        msg.textContent = "Sijaintia ei saatu (käyttöjärjestelmä ei antanut sijaintia). macOS: salli selain kohdassa Järjestelmäasetukset → Tietosuoja → Sijaintipalvelut. Voit myös valita lähtöpisteen alta.";
      }
      if (code !== 1) msg.textContent += " Tai valitse lähtöpiste alta.";
      if (window.console) console.warn("[Lähellä sinua] geolocation error", err);
    }

    btn.addEventListener("click", function () {
      if (!navigator.geolocation) { msg.textContent = "Selaimesi ei tue paikannusta."; return; }
      msg.textContent = "Haetaan sijaintiasi…"; btn.disabled = true;
      var ok = function (pos) { showResults(pos.coords.latitude, pos.coords.longitude); };
      // 1. nopea verkkopaikannus (sallii ~10 min vanhan sijainnin); jos ei onnistu, tarkka uudelleenyritys
      navigator.geolocation.getCurrentPosition(ok, function (err) {
        if (err && (err.code === 2 || err.code === 3)) {
          navigator.geolocation.getCurrentPosition(ok, fail,
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
        } else {
          fail(err);
        }
      }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
    });
  }

  /* ---------------- Listaus + suodatus ---------------- */
  function renderListing(container) {
    var osio = container.getAttribute("data-osio");
    var items = D.byOsio(osio);
    // Kerää kategoriat
    var cats = {};
    items.forEach(function (k) { (k.kategoriat || []).forEach(function (c) { cats[c] = 1; }); });
    var catList = Object.keys(cats).sort();

    var filterBar = el('<div class="filters" role="group" aria-label="Rajaa kategorian mukaan"></div>');
    filterBar.appendChild(el('<span class="filters__label">Rajaa</span>'));
    var state = { cat: null };
    function makeChip(label, value) {
      var c = el('<button class="chip" aria-pressed="' + (state.cat === value) + '">' + esc(label) + "</button>");
      c.addEventListener("click", function () {
        state.cat = (state.cat === value) ? null : value;
        Array.prototype.forEach.call(filterBar.querySelectorAll(".chip"), function (ch) { ch.setAttribute("aria-pressed", "false"); });
        if (state.cat) c.setAttribute("aria-pressed", "true"); else all.setAttribute("aria-pressed", "true");
        draw();
      });
      return c;
    }
    var all = makeChip("Kaikki", null);
    all.setAttribute("aria-pressed", "true");
    filterBar.appendChild(all);
    catList.forEach(function (c) { filterBar.appendChild(makeChip(c, c)); });
    var counter = el('<span class="count"></span>');
    filterBar.appendChild(counter);

    var grid = el('<div class="grid grid--3"></div>');
    container.appendChild(filterBar);
    container.appendChild(grid);

    function draw() {
      var shown = items.filter(function (k) { return !state.cat || (k.kategoriat || []).indexOf(state.cat) !== -1; });
      grid.innerHTML = shown.map(cardHTML).join("");
      counter.textContent = shown.length + " / " + items.length + " kohdetta";
      if (!shown.length) grid.innerHTML = '<p class="empty">Ei kohteita tällä rajauksella.</p>';
      observeReveal(grid);
    }
    draw();
  }

  /* ---------------- Etusivun featured ---------------- */
  function renderFeatured(container) {
    var karki = D.kohteet.filter(function (k) { return k.karki; });
    var muut = D.kohteet.filter(function (k) { return !k.karki; });
    var pick = [];
    // yksi featured + 3 korttia, monipuolisesti eri osioista
    var seen = {};
    D.kohteet.forEach(function (k) { if (!seen[k.osio] && !k.karki) { seen[k.osio] = 1; pick.push(k); } });
    var grid = el('<div class="grid grid--3"></div>');
    grid.appendChild(el(featureHTML(karki[0] || muut[0])));
    pick.slice(0, 4).forEach(function (k) { grid.appendChild(el(cardHTML(k))); });
    container.appendChild(grid);
    observeReveal(container);
  }

  /* ---------------- Tapahtumat ---------------- */
  function renderEvents(container) {
    var limit = parseInt(container.getAttribute("data-limit") || "0", 10);
    var evs = D.tapahtumat.slice().sort(function (a, b) { return a.alku < b.alku ? -1 : 1; });
    if (limit) evs = evs.slice(0, limit);
    var list = el('<div class="events"></div>');
    evs.forEach(function (e) {
      var d = new Date(e.alku + "T00:00:00");
      var range = "";
      if (e.loppu && e.loppu !== e.alku) {
        var d2 = new Date(e.loppu + "T00:00:00");
        range = d.getDate() + ".–" + d2.getDate() + "." + (d2.getMonth() + 1) + ". " + d2.getFullYear();
      } else {
        range = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
      }
      list.appendChild(el(
        '<article class="event reveal">' +
        '<div class="event__date"><span class="d">' + d.getDate() + '</span><span class="m">' + KK[d.getMonth()] + "</span></div>" +
        '<div class="event__main"><h3>' + esc(e.nimi) + "</h3><p>" + esc(e.seloste) + "</p>" +
        '<p style="margin-top:.4rem;font-family:var(--mono);font-size:.76rem">' + esc(range) + " · " + esc(e.paikka) + "</p></div>" +
        '<div class="event__meta"><span class="cat">' + esc(e.kategoria) + "</span><br>" +
        (e.toistuva ? "vuosittainen" : "") + "</div>" +
        "</article>"
      ));
    });
    container.appendChild(list);
    observeReveal(container);
  }

  /* ---------------- Yksittäinen kohde ---------------- */
  function renderDetail(container) {
    var id = new URLSearchParams(location.search).get("id");
    var k = D.byId(id);
    if (!k) { container.innerHTML = '<div class="wrap section"><p class="empty">Kohdetta ei löytynyt. <a href="index.html">Palaa etusivulle</a>.</p></div>'; return; }
    document.title = k.nimi + " — Visit Savitaipale";
    var osioNimi = (D.osiot[k.osio] || {}).nimi || "";
    var osioHref = (NAV.filter(function (n) { return n.id === k.osio; })[0] || {}).href || "index.html";

    // Page hero — valokuva jos on, muuten teemakuvitus
    var hero = el(
      '<section class="pagehero"><div class="pagehero__scene">' + media(k) + "</div>" +
      (k.kuva ? credit(k.kuva) : "") +
      '<div class="wrap pagehero__inner">' +
      '<div class="crumbs"><a href="index.html">Etusivu</a> / <a href="' + osioHref + '">' + esc(osioNimi) + "</a> / " + esc(k.nimi) + "</div>" +
      '<p class="eyebrow">' + esc(k.tyyppi) + (k.geopark ? " · Saimaa Geopark" : "") + "</p>" +
      "<h1>" + esc(k.nimi) + "</h1><p>" + esc(k.seloste) + "</p></div></section>"
    );

    var paras = (k.kuvaus || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var tags = (k.kategoriat || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
      (k.vuodenajat || []).map(function (t) { return '<span class="tag tag--season">' + esc(seasonLabel([t])) + "</span>"; }).join("");

    var facts = (k.tiedot || []).map(function (f) {
      return "<li><span class=\"k\">" + esc(f.label) + '</span><span class="v">' + esc(f.arvo) + "</span></li>";
    }).join("");
    var coord = k.koord ? '<span class="coord">◎ ' + k.koord.lat.toFixed(4) + "° N, " + k.koord.lng.toFixed(4) + "° E</span>" : "";

    // Related (sama osio)
    var related = D.byOsio(k.osio).filter(function (x) { return x.id !== k.id; }).slice(0, 3);
    var relHTML = related.length ? (
      '<section class="section section--paper2"><div class="wrap">' +
      '<div class="section-head"><p class="eyebrow">Lisää samasta</p><h2>' + esc(osioNimi) + "</h2></div>" +
      '<div class="grid grid--3">' + related.map(cardHTML).join("") + "</div></div></section>"
    ) : "";

    var body = el(
      '<section class="detail"><div class="wrap detail__grid">' +
      '<div class="detail__body prose">' + paras + '<div class="taglist">' + tags + "</div></div>" +
      '<aside class="factbox"><h3>Tiedot</h3><ul class="factlist">' + facts + "</ul>" + coord +
      '<a class="btn btn--ghost" style="margin-top:1.2rem;width:100%;justify-content:center" href="' + osioHref + '">← ' + esc(osioNimi) + "</a></aside>" +
      "</div></section>"
    );

    var mapSec;
    if (k.koord) {
      mapSec = el(
        '<section class="section"><div class="wrap">' +
        '<div class="section-head"><p class="eyebrow">Sijainti</p><h2>Kartalla</h2></div>' +
        '<div class="detailmap"></div>' +
        '<div class="map-actions">' +
        '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + gmapDir(mapQuery(k)) + '">Reittiohjeet ↗</a>' +
        '<a class="btn btn--ghost" target="_blank" rel="noopener" href="' + gmapSearch(mapQuery(k)) + '">Avaa Google Mapsissa ↗</a>' +
        "</div></div></section>"
      );
    } else {
      mapSec = el(
        '<section class="section"><div class="wrap">' +
        '<div class="section-head"><p class="eyebrow">Sijainti</p><h2>Kartalla</h2></div>' +
        gmapBlock(k) + "</div></section>"
      );
    }

    container.appendChild(hero);
    container.appendChild(body);
    container.appendChild(mapSec);
    if (k.koord) renderGmap(mapSec.querySelector(".detailmap"), k);
    if (relHTML) container.appendChild(el(relHTML));
    observeReveal(container);
  }

  /* ---------------- Google Maps JS API (interaktiivinen) ---------------- */
  var GMAPS = { promise: null };
  function loadGoogleMaps() {
    if (GMAPS.promise) return GMAPS.promise;
    GMAPS.promise = new Promise(function (resolve, reject) {
      if (window.google && window.google.maps) { resolve(); return; }
      var key = window.SAVITAIPALE_MAPS_KEY;
      if (!key) { reject(new Error("no-key")); return; }
      window.__gmapsReady = function () { resolve(); };
      var s = document.createElement("script");
      s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(key) +
        "&callback=__gmapsReady&language=fi&region=FI&loading=async";
      s.async = true;
      s.onerror = function () { reject(new Error("load-error")); };
      document.head.appendChild(s);
    });
    return GMAPS.promise;
  }
  function markerIcon(color, scale) {
    return { path: google.maps.SymbolPath.CIRCLE, scale: scale || 7, fillColor: color, fillOpacity: 1, strokeColor: "#ffffff", strokeWeight: 2 };
  }

  function iwHTML(k) {
    return '<div class="iw"><strong>' + esc(k.nimi) + "</strong><br>" +
      '<span class="iw-type">' + esc(k.tyyppi) + (k.geopark ? " · Geopark" : "") + "</span><br>" +
      '<a href="kohde.html?id=' + encodeURIComponent(k.id) + '">Tutki kohdetta →</a> · ' +
      '<a href="' + gmapDir(mapQuery(k)) + '" target="_blank" rel="noopener">Reitti ↗</a></div>';
  }
  // Interaktiivinen kartta: kaikki kohteet pinneinä + oma sijainti.
  // focusK (valinnainen): korosta ja keskitä tähän kohteeseen (kohdesivut).
  function renderGmap(container, focusK) {
    var pts = D.kohteet.filter(function (k) { return k.koord; });
    container.innerHTML =
      '<div class="gmapfull"><div class="gmapfull__map"></div>' +
      '<button class="gmapfull__loc" type="button">📍 Näytä sijaintini</button></div>' +
      '<p class="mapnote">◎ Klikkaa pistettä nähdäksesi kohteen tiedot · oranssit pisteet ovat Saimaa Geoparkin geokohteita</p>';
    var mapEl = container.querySelector(".gmapfull__map");
    var locBtn = container.querySelector(".gmapfull__loc");

    loadGoogleMaps().then(function () {
      var bounds = new google.maps.LatLngBounds();
      var map = new google.maps.Map(mapEl, { mapTypeControl: false, streetViewControl: false, fullscreenControl: true, gestureHandling: "cooperative" });
      var iw = new google.maps.InfoWindow();
      var focusMarker = null;
      pts.forEach(function (k) {
        var pos = { lat: k.koord.lat, lng: k.koord.lng };
        bounds.extend(pos);
        var isFocus = focusK && k.id === focusK.id;
        var m = new google.maps.Marker({ position: pos, map: map, title: k.nimi,
          zIndex: isFocus ? 999 : 1,
          icon: markerIcon(k.geopark ? "#d9642a" : "#0b3d4f", isFocus ? 12 : 7) });
        m.addListener("click", function () { iw.setContent(iwHTML(k)); iw.open(map, m); });
        if (isFocus) focusMarker = m;
      });
      if (focusK && focusK.koord && focusMarker) {
        map.setCenter({ lat: focusK.koord.lat, lng: focusK.koord.lng });
        map.setZoom(12);
        iw.setContent(iwHTML(focusK)); iw.open(map, focusMarker);
      } else {
        map.fitBounds(bounds, 60);
      }
      var userMarker = null;
      locBtn.addEventListener("click", function () {
        if (!navigator.geolocation) { locBtn.textContent = "Paikannus ei käytössä"; return; }
        locBtn.disabled = true; locBtn.textContent = "Haetaan…";
        navigator.geolocation.getCurrentPosition(function (p) {
          locBtn.disabled = false; locBtn.textContent = "📍 Näytä sijaintini";
          var u = { lat: p.coords.latitude, lng: p.coords.longitude };
          if (userMarker) userMarker.setMap(null);
          userMarker = new google.maps.Marker({ position: u, map: map, title: "Sijaintisi", zIndex: 1000, icon: markerIcon("#1a73e8", 8) });
          map.panTo(u);
        }, function () { locBtn.disabled = false; locBtn.textContent = "📍 Näytä sijaintini"; },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
      });
    }).catch(function () {
      // Fallback ilman avainta: kohdesivulla yksittäinen upotus, muuten SVG-yleiskartta
      if (focusK) container.innerHTML = '<div class="gmap"><iframe title="Kartta: ' + esc(focusK.nimi) + '" src="' + gmapEmbedSrc(mapQuery(focusK)) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>';
      else { container.innerHTML = ""; renderMap(container); }
    });
  }

  /* ---------------- Kartta (schematic, fallback) ---------------- */
  function renderMap(container) {
    var W = 1000, H = 620;
    // Yleiskartalla vain Geoparkin geokohteet (hyvin hajallaan) — pidetään kartta selkeänä.
    // Dedupataan lähes päällekkäiset pisteet (esim. kirkko ja keskustan suppamaasto).
    var seen = {};
    var pts = D.kohteet.filter(function (k) {
      if (!k.koord || !k.geopark) return false;
      var key = k.koord.lat.toFixed(2) + "," + k.koord.lng.toFixed(2);
      if (seen[key]) return false;
      seen[key] = 1; return true;
    });
    // normalisoi koordinaatit näkymään
    var lats = pts.map(function (p) { return p.koord.lat; });
    var lngs = pts.map(function (p) { return p.koord.lng; });
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var minLng = Math.min.apply(null, lngs), maxLng = Math.max.apply(null, lngs);
    var padLat = (maxLat - minLat) * 0.25 || 0.05, padLng = (maxLng - minLng) * 0.25 || 0.05;
    minLat -= padLat; maxLat += padLat; minLng -= padLng; maxLng += padLng;
    function X(lng) { return ((lng - minLng) / (maxLng - minLng)) * (W - 120) + 60; }
    function Y(lat) { return H - (((lat - minLat) / (maxLat - minLat)) * (H - 120) + 60); }

    var water =
      '<rect width="' + W + '" height="' + H + '" fill="#e3f2f0"/>' +
      '<path d="M0,120 Q250,60 500,150 T1000,120 L1000,0 L0,0 Z" fill="#f2f6f6"/>' +
      '<path d="M120,' + H + ' Q320,430 520,470 T980,430 L1000,' + H + ' Z" fill="#bfe3e0" opacity=".7"/>' +
      '<ellipse cx="330" cy="300" rx="240" ry="150" fill="#9fd4d0" opacity=".55"/>' +
      '<ellipse cx="720" cy="360" rx="240" ry="170" fill="#2e8fa3" opacity=".22"/>' +
      '<text x="300" y="300" class="map-label" fill="#1d6f82" font-size="20" opacity=".8">Kuolimo</text>' +
      '<text x="720" y="380" class="map-label" fill="#1d6f82" font-size="20" opacity=".8">Saimaa</text>';

    // Lasketaan pisteet ja väistetään päällekkäiset tekstit (yksinkertainen pystysuora nudge)
    var placed = [];
    var dotData = pts.map(function (p) { return { p: p, x: X(p.koord.lng), y: Y(p.koord.lat) }; })
      .sort(function (a, b) { return a.y - b.y; });
    var dots = dotData.map(function (o) {
      var x = o.x, y = o.y, ly = y + 5;
      for (var i = 0; i < placed.length; i++) {
        if (Math.abs(placed[i].x - x) < 210 && Math.abs(placed[i].ly - ly) < 20) ly = placed[i].ly + 20;
      }
      placed.push({ x: x, ly: ly });
      var geo = o.p.geopark;
      return '<g class="map-dot" tabindex="0" role="link" data-id="' + o.p.id + '" aria-label="' + esc(o.p.nimi) + '">' +
        '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="16" fill="' + (geo ? "#d9642a" : "#0b3d4f") + '" opacity=".15"/>' +
        '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="7" fill="' + (geo ? "#d9642a" : "#0b3d4f") + '"/>' +
        '<text x="' + (x + 14).toFixed(0) + '" y="' + ly.toFixed(0) + '" class="map-label">' + esc(o.p.nimi) + "</text></g>";
    }).join("");

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Savitaipaleen kohteita kartalla">' + water + dots + "</svg>";
    var wrap = el('<div class="mapwrap">' + svg + "</div>");
    wrap.addEventListener("click", function (e) {
      var g = e.target.closest(".map-dot"); if (g) location.href = "kohde.html?id=" + encodeURIComponent(g.getAttribute("data-id"));
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { var g = e.target.closest(".map-dot"); if (g) location.href = "kohde.html?id=" + encodeURIComponent(g.getAttribute("data-id")); }
    });
    container.appendChild(wrap);
    container.appendChild(el('<p class="mapnote">◎ Suuntaa-antava sijaintikartta · oranssit pisteet ovat Saimaa Geoparkin geokohteita · klikkaa kohdetta</p>'));
  }

  /* ---------------- Matkasuunnittelija ---------------- */
  var PLANNER = { apply: null }; // renderValmisreitit kutsuu tätä

  var INTERESTS = [
    { key: "kulttuuri",    label: "Nähtävyydet & kulttuuri" },
    { key: "luonto",       label: "Luonto & Geopark" },
    { key: "aktiviteetit", label: "Aktiviteetit" },
    { key: "majoitus",     label: "Majoitus" },
    { key: "ruoka",        label: "Ruokapaikat" }
  ];
  function interestOf(k) {
    if (k.osio === "nae-ja-koe") return "kulttuuri";
    if (k.osio === "luonto") return "luonto";
    if (k.osio === "tekemista") return "aktiviteetit";
    if (k.osio === "majoitus") return /(Ravintola|Kahvila)/.test(k.tyyppi) ? "ruoka" : "majoitus";
    return "kulttuuri";
  }
  function buildEmbedSrc(ps) {
    var base = "https://maps.google.com/maps?output=embed&hl=fi";
    if (!ps.length) return base + "&q=Savitaipale,Suomi&z=9";
    if (ps.length === 1) return base + "&q=" + ps[0].lat + "," + ps[0].lng + "&z=12";
    var saddr = ps[0].lat + "," + ps[0].lng;
    var daddr = ps.slice(1).map(function (p) { return p.lat + "," + p.lng; }).join("+to:");
    return base + "&saddr=" + saddr + "&daddr=" + daddr; // raw: +to: ja pilkut ovat Google-syntaksia
  }
  function buildDirLink(ps) {
    if (ps.length < 2) return "https://www.google.com/maps/search/?api=1&query=" + (ps.length ? ps[0].lat + "," + ps[0].lng : "Savitaipale");
    var origin = ps[0].lat + "," + ps[0].lng;
    var dest = ps[ps.length - 1];
    var mids = ps.slice(1, -1).map(function (p) { return p.lat + "," + p.lng; }).join("|");
    var u = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + dest.lat + "," + dest.lng;
    if (mids) u += "&waypoints=" + encodeURIComponent(mids);
    return u;
  }

  function renderPlanner(container) {
    var mappable = D.kohteet.filter(function (k) { return k.koord; });
    var present = {};
    mappable.forEach(function (k) { present[interestOf(k)] = true; });
    var interestBoxes = INTERESTS.filter(function (i) { return present[i.key]; });
    var state = { interests: {}, selected: [] };
    interestBoxes.forEach(function (i) { state.interests[i.key] = true; });

    container.innerHTML =
      '<div class="planner">' +
        '<div class="planner__controls">' +
          '<fieldset class="planner__interests"><legend>1. Mikä kiinnostaa?</legend>' +
          interestBoxes.map(function (i) {
            return '<label class="chipbox"><input type="checkbox" value="' + i.key + '" checked><span>' + esc(i.label) + "</span></label>";
          }).join("") + "</fieldset>" +
          '<div class="planner__listwrap"></div>' +
          '<div class="planner__summary"></div>' +
        "</div>" +
        '<div class="planner__mapcol"><div class="planner__mapwrap">' +
          '<iframe class="planner__map" title="Reittikartta" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
        "</div></div>" +
      "</div>";

    var listwrap = container.querySelector(".planner__listwrap");
    var summary = container.querySelector(".planner__summary");
    var iframe = container.querySelector(".planner__map");
    var mapwrap = container.querySelector(".planner__mapwrap");

    // Kartta: JS API + Directions (reitti teitä pitkin). Ilman avainta pudotaan avaimettomaan upotukseen.
    var G = { map: null, ready: false, ds: null, dr: null, markers: [] };
    function clearMarkers() { G.markers.forEach(function (m) { m.setMap(null); }); G.markers = []; }
    function markerAt(p, i) {
      G.markers.push(new google.maps.Marker({
        position: { lat: p.lat, lng: p.lng }, map: G.map, title: p.nimi, zIndex: 10 + i,
        label: { text: String(i + 1), color: "#ffffff", fontSize: "12px", fontWeight: "700" },
        icon: markerIcon("#0b3d4f", 12)
      }));
    }
    function updateMap(ps) {
      if (!G.ready || !G.map) { iframe.src = buildEmbedSrc(ps); return; }
      clearMarkers();
      if (G.dr) G.dr.set("directions", null);
      if (!ps.length) { G.map.setCenter({ lat: 61.20, lng: 27.67 }); G.map.setZoom(9); return; }
      if (ps.length === 1) { markerAt(ps[0], 0); G.map.setCenter({ lat: ps[0].lat, lng: ps[0].lng }); G.map.setZoom(12); return; }
      G.ds.route({
        origin: { lat: ps[0].lat, lng: ps[0].lng },
        destination: { lat: ps[ps.length - 1].lat, lng: ps[ps.length - 1].lng },
        waypoints: ps.slice(1, -1).map(function (p) { return { location: { lat: p.lat, lng: p.lng }, stopover: true }; }),
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING
      }, function (res, status) {
        if (status === "OK") { G.dr.setDirections(res); }
        else {
          // esim. saaret eivät ole autolla saavutettavissa → näytä pinnit ilman viivaa
          var b = new google.maps.LatLngBounds();
          ps.forEach(function (p, i) { markerAt(p, i); b.extend({ lat: p.lat, lng: p.lng }); });
          G.map.fitBounds(b, 50);
        }
      });
    }
    loadGoogleMaps().then(function () {
      iframe.style.display = "none";
      var d = document.createElement("div"); d.className = "planner__gmapdiv"; mapwrap.appendChild(d);
      G.map = new google.maps.Map(d, { mapTypeControl: false, streetViewControl: false, fullscreenControl: true, gestureHandling: "cooperative" });
      G.ds = new google.maps.DirectionsService();
      G.dr = new google.maps.DirectionsRenderer({ map: G.map, suppressMarkers: false, polylineOptions: { strokeColor: "#d9642a", strokeOpacity: 0.9, strokeWeight: 5 } });
      G.ready = true;
      // Oma sijainti -painike
      var locBtn = document.createElement("button");
      locBtn.type = "button"; locBtn.className = "planner__loc"; locBtn.textContent = "📍 Näytä sijaintini";
      mapwrap.appendChild(locBtn);
      var userMarker = null;
      locBtn.addEventListener("click", function () {
        if (!navigator.geolocation) { locBtn.textContent = "Paikannus ei käytössä"; return; }
        locBtn.disabled = true; locBtn.textContent = "Haetaan…";
        navigator.geolocation.getCurrentPosition(function (p) {
          locBtn.disabled = false; locBtn.textContent = "📍 Näytä sijaintini";
          var u = { lat: p.coords.latitude, lng: p.coords.longitude };
          if (userMarker) userMarker.setMap(null);
          userMarker = new google.maps.Marker({ position: u, map: G.map, title: "Sijaintisi", zIndex: 999, icon: markerIcon("#1a73e8", 8) });
          G.map.panTo(u);
        }, function () { locBtn.disabled = false; locBtn.textContent = "📍 Näytä sijaintini"; },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
      });
      updateMap(pts());
    }).catch(function () { /* ei avainta → avaimeton upotus jää käyttöön */ });

    function pts() {
      return state.selected.map(function (id) {
        var k = D.byId(id);
        return { id: id, nimi: k.nimi, tyyppi: k.tyyppi, lat: k.koord.lat, lng: k.koord.lng };
      });
    }
    function refresh() {
      var items = mappable.filter(function (k) { return state.interests[interestOf(k)]; });
      listwrap.innerHTML = '<p class="planner__listtitle">2. Valitse kohteet (' + items.length + ")</p>" +
        (items.length ? items.map(function (k) {
          var on = state.selected.indexOf(k.id) >= 0;
          return '<label class="planner__item' + (on ? " is-on" : "") + '"><input type="checkbox" value="' + k.id + '"' + (on ? " checked" : "") + ">" +
            '<span class="pi-name">' + esc(k.nimi) + '</span><span class="pi-type">' + esc(k.tyyppi) + "</span></label>";
        }).join("") : '<p class="empty">Ei kohteita valituilla kiinnostuksilla.</p>');

      var ps = pts();
      summary.innerHTML = "<h3>3. Reittisi — " + ps.length + " kohdetta</h3>" +
        (ps.length
          ? '<ol class="planner__plan">' + ps.map(function (p) {
              return "<li><span>" + esc(p.nimi) + '</span><button class="pi-remove" data-id="' + p.id + '" aria-label="Poista kohde">×</button></li>';
            }).join("") + "</ol>" +
            '<div class="planner__actions">' +
            '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + buildDirLink(ps) + '">Avaa reitti Google Mapsissa ↗</a>' +
            '<button class="btn btn--ghost" type="button" data-clear>Tyhjennä</button></div>'
          : '<p class="planner__hint">Rastita kohteita listasta — ne ilmestyvät kartalle ja tähän reitiksi.</p>');

      updateMap(ps);
    }

    container.addEventListener("change", function (e) {
      var t = e.target;
      if (t.matches(".planner__interests input")) { state.interests[t.value] = t.checked; refresh(); }
      else if (t.matches(".planner__listwrap input")) {
        var id = t.value;
        if (t.checked) { if (state.selected.indexOf(id) < 0) state.selected.push(id); }
        else { state.selected = state.selected.filter(function (x) { return x !== id; }); }
        refresh();
      }
    });
    container.addEventListener("click", function (e) {
      var rm = e.target.closest(".pi-remove");
      if (rm) { var id = rm.getAttribute("data-id"); state.selected = state.selected.filter(function (x) { return x !== id; }); refresh(); return; }
      if (e.target.matches("[data-clear]")) { state.selected = []; refresh(); }
    });

    PLANNER.apply = function (ids) {
      state.selected = ids.filter(function (id) { var k = D.byId(id); return k && k.koord; });
      state.selected.forEach(function (id) { state.interests[interestOf(D.byId(id))] = true; });
      Array.prototype.forEach.call(container.querySelectorAll(".planner__interests input"), function (cb) { cb.checked = !!state.interests[cb.value]; });
      refresh();
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    refresh();
  }

  function renderValmisreitit(container) {
    container.innerHTML = '<div class="routes">' + D.reittisuositukset.map(function (r) {
      var names = r.kohteet.map(function (id) { var k = D.byId(id); return k ? k.nimi : id; });
      return '<article class="route reveal">' +
        '<div class="route__media">' + S.svg(r.teema, r.id) + '<span class="route__kesto">' + esc(r.kesto) + "</span></div>" +
        '<div class="route__body"><h3>' + esc(r.nimi) + "</h3><p>" + esc(r.kuvaus) + "</p>" +
        '<p class="route__stops">' + names.map(esc).join(" → ") + "</p>" +
        '<button class="btn btn--ghost" type="button" data-route="' + r.id + '">Käytä tätä reittiä →</button></div></article>';
    }).join("") + "</div>";
    container.addEventListener("click", function (e) {
      var b = e.target.closest("[data-route]");
      if (!b) return;
      var r = D.reittisuositukset.filter(function (x) { return x.id === b.getAttribute("data-route"); })[0];
      if (r && PLANNER.apply) PLANNER.apply(r.kohteet);
    });
    observeReveal(container);
  }

  /* ---------------- Tarinat ---------------- */
  function renderStories(container) {
    var html = D.tarinat.map(function (t) {
      return '<article class="story reveal"><div class="story__media">' + S.svg(t.teema, t.id) + "</div>" +
        '<div><h3>' + esc(t.otsikko) + "</h3><p>" + esc(t.teksti) + "</p></div></article>";
    }).join("");
    container.innerHTML = html;
    observeReveal(container);
  }

  /* ---------------- Hero-taustan injektio (valokuva tai SVG) ---------------- */
  function injectScenes() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-scene]"), function (node) {
      var photo = node.getAttribute("data-photo");
      if (photo) {
        node.innerHTML = imgTag(photo, node.getAttribute("data-photo-alt") || "");
        var wrap = node.closest(".hero, .pagehero");
        if (wrap) wrap.insertAdjacentHTML("beforeend", credit(photo));
        return;
      }
      var theme = node.getAttribute("data-scene");
      node.innerHTML = S.svg(theme, node.getAttribute("data-scene-key") || theme);
    });
  }

  /* ---------------- Kuvien lähteet (CC-attribuutio) ---------------- */
  function kuvaLahdePalvelu(url) {
    if (/flickr\.com/.test(url)) return "Flickr";
    if (/wikimedia\.org|wikipedia\.org/.test(url)) return "Wikimedia Commons";
    try { return url.split("/")[2].replace(/^www\./, ""); } catch (e) { return "verkko"; }
  }
  function renderKuvakreditit(container) {
    var list = Object.keys(D.kuvat || {}).map(function (f) {
      var c = D.kuvat[f];
      return '<li><a href="' + c.lahde + '" target="_blank" rel="noopener">' + esc(f) + "</a> — " +
        esc(c.tekija) + ', <a href="' + c.lisenssiUrl + '" target="_blank" rel="noopener">' + esc(c.lisenssi) + "</a>, " +
        esc(kuvaLahdePalvelu(c.lahde)) + "</li>";
    }).join("");
    container.innerHTML = '<ul class="kreditit">' + list + "</ul>";
  }

  /* ---------------- Reveal on scroll ---------------- */
  var io = null;
  function observeReveal(scope) {
    var nodes = (scope || document).querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add("is-in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* ---------------- Init ---------------- */
  function init() {
    var page = document.body.getAttribute("data-page");

    var hh = document.querySelector("[data-site-header]");
    if (hh) hh.replaceWith(buildHeader(page));
    var ff = document.querySelector("[data-site-footer]");
    if (ff) ff.replaceWith(buildFooter());

    // mobile nav
    var toggle = document.querySelector(".nav-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      var nav = document.querySelector(".nav");
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    injectScenes();

    Array.prototype.forEach.call(document.querySelectorAll("[data-render]"), function (c) {
      switch (c.getAttribute("data-render")) {
        case "listing":  renderListing(c);  break;
        case "featured": renderFeatured(c); break;
        case "events":   renderEvents(c);   break;
        case "detail":   renderDetail(c);   break;
        case "map":      renderMap(c);      break;
        case "gmap":     renderGmap(c);     break;
        case "nearby":   renderNearby(c);   break;
        case "planner":  renderPlanner(c);  break;
        case "valmisreitit": renderValmisreitit(c); break;
        case "kuvakreditit": renderKuvakreditit(c); break;
        case "stories":  renderStories(c);  break;
      }
    });

    observeReveal(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
