# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mikä tämä projekti on

Savitaipaleen (Etelä-Karjalan kunta) **matkailusivusto** — toimiva prototyyppi. Sivuston kieli on **suomi**: kaikki käyttäjälle näkyvä teksti ja lähtökohtaisesti myös dokumentit kirjoitetaan suomeksi.

Sivusto on **rakennettu ja julkaistu**:
- **Live:** https://teppotk.github.io/visitsavi/ (GitHub Pages, haara `main`, juuri). Push `main`:iin päivittää sivuston automaattisesti ~1 min kuluessa.
- **Repo:** https://github.com/teppotk/visitsavi (`gh` on autentikoitu, tili teppotk).

## Teknologia ja ajaminen

Staattinen **HTML + CSS + vanilla JS ilman build-työkaluja tai frameworkia**. Aukeaa tuplaklikkaamalla `index.html` (toimii `file://` offline), paitsi karttaa ja paikannusta (vaativat internetin/https:n).

- Paikallinen palvelin (kartta- ja GPS-testaus): `python3 -m http.server 8000` → `http://localhost:8000`.
- Sisältö on `assets/js/data.js`:ssä (`window.SAVITAIPALE`, ladataan `<script>`-tagilla — ei fetch).
- **Aja `node --check assets/js/app.js` (ja data.js) jokaisen JS-muokkauksen jälkeen.** Merkkijononrakentajissa on helppo lipsauttaa `'...'` vs `"..."`.

## Hakemistorakenne

- **`/material`** — alkuperäinen lähdemateriaali (`source-material-links.md`: 8 lähdesivustoa, vain linkit).
- **`/sisalto`** — lähdemateriaalista jäsennelty sisältö- ja tietorakenne (suomeksi): `00-tietorakenne`, `01-metadata-skeemat`, `10`–`15` (sisältöinventaario), `90-lahteet-ja-tietoaukot`. Suunnittelun/faktojen lähde. Kun lisäät sisältöä, päivitä oikea `/sisalto`-tiedosto.
- **Sivut (juuressa):** index, nae-ja-koe, luonto-ja-retkeily, tekemista, majoitus, tapahtumat, tarinat, suunnittele, kohde (detail `?id=`).
- **`assets/`:**
  - `js/config.js` — Google Maps API -avain (`window.SAVITAIPALE_MAPS_KEY`, julkinen selainavain).
  - `js/data.js` — sisältö: `kohteet[]` (kentät osio/tyyppi/koord/kuva ym.), `tapahtumat[]`, `tarinat[]`, `reittisuositukset[]`, `KOORD`, `KUVAT`+`KUVA_MAP`, `TAP_LAHTEET`. Apit `byId`, `byOsio`.
  - `js/scenes.js` — generoi teemakohtaista SVG-maisemakuvitusta (kun kohteella ei ole valokuvaa).
  - `js/app.js` — navigaatio/footer + kaikki renderöijät (`data-render="..."`: listing, gmap, planner, events, detail, nearby, valmisreitit, plan-cta, kuvakreditit, stories).
  - `css/styles.css` — designjärjestelmä "Kahden veden maa".
  - `img/` — CC-valokuvat + `credits.json` + favicon. `data/tapahtumat.json` — tapahtumasyöte.

## Keskeiset päätökset ja reunaehdot (älä riko ilman syytä)

- **Profiili:** luonto / järvi (Saimaa + Kuolimo) / mökkeily / kulttuurihistoria. EI kaupunki-/kylpylämatkailu.
- **Kartat:** Google Maps JS API + Directions API. Avain on julkinen selainavain — suojaus perustuu Cloud Consolen HTTP-referrer-rajaukseen (`teppotk.github.io/*`), jonka käyttäjä ylläpitää. Kartat putoavat SVG-/upotus-varaan jos avain puuttuu. Ohjeet READMEssa.
- **Valokuvat:** vain CC-lisensoituja (Wikimedia Commons / Flickr Openversen kautta). **Älä koskaan kopioi lähdesivustojen valokuvia** (tekijänoikeus). Attribuutiot näkyvissä (`.photocredit` + Suunnittele-sivun lista). Uusi kuva: `assets/img/` + `KUVAT` + `KUVA_MAP`.
- **Tapahtumat:** lähdekalenterin API on CORS-estetty + 404 → selain ei voi hakea suoraan. Sivu hakee `assets/data/tapahtumat.json`-syötteen ajonaikaisesti; tuotannossa ajastettu taustapalvelu täyttäisi sen.
- **Faktat:** älä keksi hintoja/aukioloja/päivämääriä/yhteystietoja. `90-lahteet-ja-tietoaukot.md` listaa varmistettavat kohdat; lisää uudet aukot sinne.
- **Git:** committaa noreply-sähköpostilla (ei todellista osoitetta); pushaa vasta kun käyttäjä pyytää tai konteksti sallii.

## Todentaminen (tärkeät sudenkuopat)

- **Selain välimuistittaa `app.js`:n aggressiivisesti.** Deployn jälkeen tee kova päivitys (Cmd+Shift+R) tai `fetch(url,{cache:'reload'})` ennen tarkistusta.
- **Kuvakaappaus ei näytä Googlen WebGL-vektorikarttaa** (näkyy tyhjänä) — varmista kartta DOM:sta (canvas/laattamäärä), ja Maps piirtää laatat vasta kun kartta vieritetään näkyviin. Käytä varmistukseen tuoretta välilehteä (WebGL-kontekstit loppuvat monen kartan jälkeen).
