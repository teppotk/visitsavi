# Visit Savitaipale — matkailusivuston prototyyppi

Visuaalinen prototyyppi Savitaipaleen matkailusivustosta. Toteutettu **puhtaalla HTML:llä, CSS:llä ja JavaScriptillä ilman build-työkaluja tai palvelinta**, jotta sitä voi esitellä helposti omalla koneella.

## Näin avaat sivuston

**Helpoin tapa:** avaa `index.html` selaimessa (kaksoisklikkaa tiedostoa tai vedä se selaimen ikkunaan). Sivusto toimii suoraan `file://`-osoitteesta ilman nettiyhteyttä — kaikki sisältö ja kuvitus ladataan paikallisesti.

**Vaihtoehtoisesti** paikallisen palvelimen kautta (siistimmät osoitteet):

```bash
cd savitaipale-travel
python3 -m http.server 8000
# avaa selaimessa http://localhost:8000
```

## Rakenne

```
index.html                  Etusivu (hero, kohokohdat, tapahtumat, kartta)
nae-ja-koe.html             Nähtävyydet & kulttuuri
luonto-ja-retkeily.html     Reitit & Geoparkin geokohteet
tekemista.html              Aktiviteetit
majoitus.html               Majoitus & ruoka
tapahtumat.html             Tapahtumakalenteri
tarinat.html                Historia & tarinat
suunnittele.html            Saavutettavuus, vuodenajat, kartta, UKK
kohde.html                  Yksittäisen kohteen sivu (kohde.html?id=...)
assets/
  css/styles.css            Design-järjestelmä ("Kahden veden maa")
  js/config.js              Google Maps API -avain (window.SAVITAIPALE_MAPS_KEY)
  js/data.js                Sisältö (kohteet, tapahtumat, tarinat, kuvakreditit)
  js/scenes.js              Generoi SVG-maisemat teemoittain (ei kuvatiedostoja)
  js/app.js                 Navigaatio, kortit, suodatus, kartat, animaatiot
  img/                      Valokuvat (CC) + credits.json + favicon
```

Sisällön ja tietorakenteen suunnitteludokumentit ovat kansiossa [`sisalto/`](sisalto/README.md); alkuperäinen lähdemateriaali kansiossa `material/`.

## Kartat ja paikannus

Kartat käyttävät **Google Maps JavaScript API:a** (interaktiiviset kartat) ja **Directions API:a** (reittien piirto teitä pitkin). API-avain on tiedostossa `assets/js/config.js`.

- **Yleiskartta** (etusivu, Luonto, kohdesivut): interaktiivinen kartta, jossa kaikki kohteet pinneinä (oranssit = Saimaa Geoparkin geokohteet). Pinnin klikkaus avaa info-ikkunan (kohdesivu-linkki + reittiohjeet). Kohdesivulla kartta keskitetään ja korostetaan kyseiseen kohteeseen.
- **Reittisuunnittelija** (Suunnittele-sivu): valitut kohteet piirretään kartalle reittinä **oikeita teitä pitkin** (Directions API).
- **"Näytä sijaintini" / "Lähellä sinua":** selaimen paikannus (GPS) näyttää oman sijainnin kartalla ja listaa lähimmät kohteet. **Paikannus vaatii https- tai localhost-yhteyden** — ei toimi suoraan `file://`-osoitteesta.
- **Varajärjestelmä:** jos API-avain puuttuu tai ei lataudu, kartat putoavat automaattisesti tyyliteltyyn SVG-karttaan / avaimettomaan upotukseen.
- Kartat vaativat internet-yhteyden; muu sivusto toimii offline. Koordinaatit on geokoodattu osoitteista (OpenStreetMap, Wikidata, Outdooractive); osa on katu-/aluetason tarkkuutta.

### Google Maps API -avaimen määritys

Avain on **selainpuolen (browser) avain** ja näkyy sivun koodissa (myös julkisessa repossa) — se on normaalia, mutta suojaus perustuu rajoituksiin. Määritä [Google Cloud Consolessa](https://console.cloud.google.com) → **APIs & Services → Credentials → avain**:

1. **Sovellusrajoitus → Websites (HTTP referrers):**
   - `https://teppotk.github.io/*` — julkinen sivusto (GitHub Pages)
   - *(valinnainen, paikallistestaukseen)* `http://localhost:*`
   - HUOM: selainavaimelle **HTTP referrers**, ei IP-rajoitus (IP on palvelinavaimille).
2. **API-rajoitus → Restrict key** (salli vain nämä, ei "Don't restrict key"):
   - Maps JavaScript API
   - Directions API
3. **Ota API:t käyttöön** (APIs & Services → Library → Enable):
   - Maps JavaScript API
   - Directions API
4. **Laskutus (Billing) päälle** projektissa — Google vaatii sen, vaikka pienessä käytössä pysyy ilmaiskiintiössä.
5. **Suositus:** aseta budjettihälytys (Billing → Budgets & alerts).

Ei tarvita: Geocoding-, Places- tai Static Maps -API:a (koordinaatit ovat valmiina `data.js`:ssä).

Avaimen vaihto tai poisto: muokkaa `assets/js/config.js` (`window.SAVITAIPALE_MAPS_KEY`). Ilman avainta kartat toimivat SVG-/upotus-varalla.

## Huomioita

- **Prototyyppi.** Sisältö perustuu julkisiin lähteisiin (ks. `sisalto/90-lahteet-ja-tietoaukot.md`). Hinnat, aukioloajat ja päivämäärät ovat suuntaa-antavia ja tarkistettava ennen julkaisua.
- **Valokuvat** ovat Wikimedia Commonsista, kaikki Creative Commons ‑lisensseillä (CC BY-SA 3.0/4.0). Ne on ladattu paikallisesti kansioon `assets/img/`, ja tekijä-/lisenssitiedot näkyvät kuvien yhteydessä sekä Suunnittele-sivun "Kuvien lähteet" -listassa (`assets/img/credits.json`). Kohteet, joille ei ole valokuvaa, käyttävät koodilla generoitua SVG-kuvitusta. **Lähdesivustojen (savitaipale.fi, gosaimaa.com ym.) valokuvia ei käytetä** — ne ovat tekijänoikeuden suojaamia eikä niitä voi julkaista ilman lupaa. Omat tai luvitetut kuvat voi lisätä `assets/img/`-kansioon ja kytkeä kohteisiin `data.js`:n `KUVA_MAP`-taulusta.
- **Google Maps** -kartat vaativat internet-yhteyden ja API-avaimen (ks. yllä "Kartat ja paikannus"); muu sivusto toimii offline.
- **Julkaisu:** sivusto on GitHub Pagesissa osoitteessa https://teppotk.github.io/visitsavi/ — `main`-haaraan pushatut muutokset päivittyvät automaattisesti noin minuutissa.
- **Kieli:** suomi.
