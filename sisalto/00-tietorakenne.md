# Informaatioarkkitehtuuri (sivuston rakenne)

Tämä dokumentti kuvaa ehdotetun **sivustorakenteen ja navigaation** Savitaipaleen matkailusivustolle. Rakenne noudattaa tavallisten matkailusivustojen konventioita (vrt. gosaimaa.com) mutta on skaalattu **yhden kunnan kohteeksi**.

## Suunnitteluperiaatteet

Seudullinen matkailusivusto (esim. GoSaimaa) jäsentää sisällön kolmen akselin mukaan:

1. **Maantiede** (kunnat) — mistä kohde löytyy
2. **Palvelutyyppi/aihe** (majoitus, ravintolat, aktiviteetit, nähtävyydet, tapahtumat, reitit)
3. **Kohderyhmä/teema** (perheet, ryhmät, lemmikit, työhyvinvointi …)

Sama kohde nousee useaan näistä. **Hub-sivut** ovat toimituksellisia (kuvakortit + kuvaukset), ja erillinen **haku/suodatus** hoitaa varsinaisen selailun.

Koska Savitaipale on **yksi kunta**, maantieteen akseli ei ole ensisijainen navigaatioperuste. Ensisijainen akseli on **palvelutyyppi/aihe** ("mitä voin tehdä / nähdä / missä yövyn"), ja **teema/kohderyhmä** toimii toissijaisena sisääntulona (maisteltavat kokonaisuudet, esim. "Talvi Savitaipaleella", "Perheelle"). Kylät (Partakoski, Pettilä, Kuivasensaari, Heituinlahti, Rahikkala) toimivat sisällön sisäisenä maantieteellisenä ryhmittelynä, eivät päänavigaationa.

## Päänavigaatio (ehdotus)

```
Etusivu
├─ Näe & koe            (nähtävyydet, museot, geokohteet, kulttuuriperintö)
├─ Luonto & retkeily    (reitit, vesistöt, uimarannat, luontokohteet, Geopark)
├─ Tekemistä            (aktiviteetit, ohjelmapalvelut, liikuntapaikat, talvi)
├─ Majoitus             (hotelli, mökit, caravan, edullinen majoitus)
├─ Syö & juo            (ravintolat, kahvilat, lähiruoka)
├─ Tapahtumat           (tapahtumakalenteri + kohokohdat)
├─ Tarinat / Historia   (historia, merkkihenkilöt, perinteet, kylät)
└─ Suunnittele matkasi  (saavutettavuus, kartat, vuodenajat, matkailuneuvonta, UKK)
```

Lisäksi läpi sivuston kulkevat:
- **Interaktiivinen kartta** — kaikki kohteet karttapohjalla (koordinaatit ovat saatavilla Geopark- ja tapahtumadatasta)
- **Haku / suodatus** — sisältötyypin, kategorian, vuodenajan ja kohderyhmän mukaan
- **Teema-/kohderyhmäkoosteet** — toimitukselliset laskeutumissivut (ks. alla)

## Pääosiot ja niiden sisältötyypit

| Osio | Ensisijainen sisältötyyppi | Esimerkkisisältöä |
|---|---|---|
| **Näe & koe** | `kohde` (nähtävyys), `kohde` (museo) | Kärnäkosken linnoitus, Savitaipaleen kirkko, Rahikkalan tuulimylly, Hakamäen museoalue, Europaeus-museo, Kirkonrakentajien museo |
| **Luonto & retkeily** | `reitti`, `kohde` (luontokohde) | Orrainpolku, MTB-reitit, Saimaan saaristoreitti, Geopark-geokohteet, uimarannat, Kuolimo & Saimaa |
| **Tekemistä** | `aktiviteetti`, `palveluntarjoaja` | Retkiluistelu, kalastus, melonta, escape room, padel, minigolf, paljut, liikuntapaikat |
| **Majoitus** | `majoitus` | Olkkolan Hovi, mökit, caravan-alue, Wanha Havon koulu |
| **Syö & juo** | `ravintola` | Olkkolan Hovin ravintola, kesäkahvilat, Partakosken kesäpalvelut |
| **Tapahtumat** | `tapahtuma` | Sapassi-viikko, Pettilän markkinat, kartanokonsertit, tennisturnaus |
| **Tarinat / Historia** | `artikkeli`, `kohde` | Kirkonrakentajat, D. E. Europaeus, Jonni Myyrä, Kustaa III:n sota, muistomerkit |
| **Suunnittele matkasi** | `sivu` (staattinen) | Saavutettavuus, kartat, vuodenajat, matkailuneuvonta, kylät |

## Teema-/kohderyhmäkoosteet (toissijaiset sisääntulot)

Toimituksellisia laskeutumissivuja, jotka koostavat olemassa olevaa sisältöä eri näkökulmista:

- **Vuodenajat**: "Kesä Savitaipaleella", "Talvi Savitaipaleella" (retkiluistelu, ladut)
- **Kohderyhmät**: Perheille, Ryhmille, Luontomatkailijalle, Mökkiläiselle, Kulttuurin ystävälle
- **Kärkiteemat**: "Saimaa & Kuolimo", "Saimaa Geopark Savitaipaleella", "Kulttuurihistoria & linnoitus"

Nämä eivät ole omia sisältötyyppejä vaan `kokoelma`-tyyppisiä sivuja, jotka viittaavat kohteisiin tagien/kategorioiden kautta.

## Sisältötyypit (yhteenveto)

Yksityiskohtaiset kentät: ks. [`01-metadata-skeemat.md`](01-metadata-skeemat.md).

| Sisältötyyppi | Kuvaus | Aikasidonnainen? |
|---|---|---|
| `kohde` | Nähtävyys, museo, luontokohde, geokohde — paikka, jossa käydään | ei (pysyvä) |
| `reitti` | Retkeily-, pyöräily- tai luistelureitti | ei (kausi voi rajoittaa) |
| `majoitus` | Hotelli, mökki, caravan, hostelli | ei |
| `ravintola` | Ravintola, kahvila, kesäkioski | ei (kausi/aukiolo) |
| `aktiviteetti` | Tehtävä/elämys (escape, melonta, padel …) | ei (varattava) |
| `palveluntarjoaja` | Yritys/yhdistys, joka tuottaa palveluita tai tapahtumia | ei (pysyvä profiili) |
| `tapahtuma` | Aikasidonnainen tapahtuma (yksi tai monta esityskertaa) | **kyllä** |
| `artikkeli` | Tarina, historiikki, blogi, teemajuttu | ei |
| `kokoelma` | Toimituksellinen koostesivu (teema/kohderyhmä) | ei |
| `sivu` | Staattinen infosivu (saavutettavuus, UKK …) | ei |

> **Keskeinen jako:** erottele **aikasidonnainen tapahtuma** (`tapahtuma`, kentässä `dates[]`) ja **pysyvä toimipaikka/järjestäjä** (`palveluntarjoaja`, aukioloajat). Sama jako on käytössä Etelä-Karjalan tapahtumakalenterissa (`pageType`: `event` vs. `organizer`).

## Suhteet sisältötyyppien välillä

Kohteet linkittyvät toisiinsa — tämä kannattaa mallintaa alusta asti:

- `majoitus`/`ravintola`/`aktiviteetti` → **kuuluu** `palveluntarjoaja`lle (esim. Olkkolan Hovi = palveluntarjoaja, jolla on majoitus + ravintola + saunat + aktiviteetit + tapahtumia)
- `tapahtuma` → **järjestää** `palveluntarjoaja`
- `kohde`/`reitti` → **sijaitsee** kylässä ja voi olla **Geopark-geokohde**
- `reitti` → **kulkee** kohteiden kautta (esim. Orrainpolku → Luotolahdenvuoren jyrkänteet)
- kaikki paikkasidonnaiset → **sijainti** (osoite + koordinaatit) → näkyvät **kartalla**

## Datalähde-integraatiot (huomioitava rakenteessa)

- **Tapahtumat**: Etelä-Karjalan tapahtumakalenteri tarjoaa koneluettavan JSON-rajapinnan Savitaipaleen kokoelmalle (ks. [`14-tapahtumat.md`](14-tapahtumat.md)). Tapahtumat voidaan hakea automaattisesti sen sijaan, että ne syötettäisiin käsin.
- **Reitit ja kartat**: Retkikartta, Outdooractive ja kunnan Karttatiimi-palvelin sisältävät valmiit reittigeometriat.
- **Geokohteet**: Saimaa Geopark tarjoaa kohdekuvaukset, koordinaatit ja opaste-PDF:t.
- **Seudullinen aggregaattori**: GoSaimaa toimii ylätason matkailuportaalina; Savitaipaleen oma sivusto on tarkin lähde ja voi syöttää tietoa GoSaimaalle.
