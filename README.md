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
  js/data.js                Sisältö (kohteet, tapahtumat, tarinat)
  js/scenes.js              Generoi SVG-maisemat teemoittain (ei kuvatiedostoja)
  js/app.js                 Navigaatio, kortit, suodatus, kartta, animaatiot
```

Sisällön ja tietorakenteen suunnitteludokumentit ovat kansiossa [`sisalto/`](sisalto/README.md); alkuperäinen lähdemateriaali kansiossa `material/`.

## Kartat ja paikannus

- **Kohdesivujen kartta:** jokaisella kohdesivulla on upotettu Google Maps -kartta (koordinaatin tai osoitteen perusteella) sekä "Reittiohjeet"- ja "Avaa Google Mapsissa" -painikkeet. Toteutettu **ilman API-avainta** (avaimeton Google Maps -upotus). Vaatii internet-yhteyden.
- **"Lähellä sinua":** etusivulla ja Suunnittele-sivulla toiminto, joka käyttää selaimen paikannusta (GPS) ja listaa lähimmät kohteet etäisyyksineen + reittiohjeet Google Mapsiin. **Paikannus vaatii, että sivustoa ajetaan palvelimelta** (esim. `http://localhost` yllä olevalla komennolla) — se ei toimi suoraan `file://`-osoitteesta avattaessa. Ei API-avainta.
- **Yleiskartta:** tyylitelty SVG-kartta Saimaa Geoparkin geokohteista (toimii offline).
- Koordinaatit on geokoodattu osoitteista (lähteet: OpenStreetMap, Wikidata, Outdooractive); osa on katu-/aluetason tarkkuutta.

## Huomioita

- **Prototyyppi.** Sisältö perustuu julkisiin lähteisiin (ks. `sisalto/90-lahteet-ja-tietoaukot.md`). Hinnat, aukioloajat ja päivämäärät ovat suuntaa-antavia ja tarkistettava ennen julkaisua.
- **Valokuvat** ovat Wikimedia Commonsista, kaikki Creative Commons ‑lisensseillä (CC BY-SA 3.0/4.0). Ne on ladattu paikallisesti kansioon `assets/img/`, ja tekijä-/lisenssitiedot näkyvät kuvien yhteydessä sekä Suunnittele-sivun "Kuvien lähteet" -listassa (`assets/img/credits.json`). Kohteet, joille ei ole valokuvaa, käyttävät koodilla generoitua SVG-kuvitusta. **Lähdesivustojen (savitaipale.fi, gosaimaa.com ym.) valokuvia ei käytetä** — ne ovat tekijänoikeuden suojaamia eikä niitä voi julkaista ilman lupaa. Omat tai luvitetut kuvat voi lisätä `assets/img/`-kansioon ja kytkeä kohteisiin `data.js`:n `KUVA_MAP`-taulusta.
- **Google Maps** (kohdesivujen kartta ja reittilinkit) vaatii internet-yhteyden; muu sivusto toimii offline.
- **Kieli:** suomi.
