# Yritykset ja tuotteet

Sivuston osio **Tuotteet & yritykset** (`tuotteet-ja-yritykset.html`) kokoaa savitaipalelaiset yritykset ja niiden tuotteet yhdelle sivulle. Osio palvelee kahta yleisöä: **matkailijaa** (missä syön, mistä ostan tuliaisen, kuka vuokraa paljun) ja **mökkiläistä** (kuka maalaa mökin, mistä saa sahatavaraa, mistä ruoka tulee).

Osio ei ole kattava yritysrekisteri vaan toimituksellinen kooste. Kattava rekisteri on Savitaipaleen Yrittäjät ry:llä (n. 100 jäsenyritystä) ja kaupallisissa hakemistoissa.

## Tietorakenne

Yritykset ovat `data.js`:n taulussa `yritykset[]`. Kentät:

| Kenttä | Pakollinen | Kuvaus |
|---|---|---|
| `id` | kyllä | Yksilöivä tunniste, etuliite `y-` |
| `kategoria` | kyllä | Viittaus `yritysKategoriat`-taulun `avain`-kenttään |
| `kohde` | ei | Viittaus `kohteet[]`-tauluun. Jos asetettu, **nimi, seloste ja kylä peritään kohteelta** — samaa tietoa ei ylläpidetä kahdessa paikassa, ja kortista syntyy linkki kohdesivulle |
| `nimi` | jos ei `kohde` | Yrityksen nimi |
| `kuvaus` | jos ei `kohde` | Yhden lauseen kuvaus |
| `kyla` | ei | Kylä tai kirkonkylä |
| `tuotteet` | kyllä | **Hakusanasto.** Tuotteet ja palvelut, joilla asiakas etsii yritystä. Näkyvät kortilla tunnisteina ja ohjaavat sivun hakua |
| `verkkosivu` | ei | Yrityksen oma sivu; näytetään kortilla ulkoisena linkkinä |
| `lahde` | kyllä | Mistä tieto on peräisin (ylläpitoa varten) |

`tuotteet`-kenttä on osion tärkein suunnitteluratkaisu: haku ei etsi vain nimestä vaan tuotteesta. Haulla *makkara* löytyy Reiposen tila, haulla *palju* Saimaan Palju ja haulla *mökki* sekä mökkivuokraajat että mökkiremontteja tekevä KKL Jurvanen.

## Kategoriat

Taulukon järjestys on sama kuin sivulla: ryhmät ja suodatinpainikkeet renderöidään `yritysKategoriat`-taulun järjestyksessä. Asiointipalvelut ovat ensimmäisenä, koska ne ovat matkailijalle käytännön kannalta tärkeimmät.

Kategoriat on järjestetty matkailijan tarpeen mukaan: ensin mitä matkalla tarvitaan, sitten mökkiläisen ja paikallisen tarpeet.

| Avain | Kategoria | Sisältö |
|---|---|---|
| `asiointi` | Asiointi & arjen palvelut | Pankki, apteekki, Alko |
| `majoitus` | Majoitus | Kartano, mökit, ryhmämajoitus, caravan |
| `ruoka` | Ravintolat & kahvilat | Lounas, à la carte, kesäkahvilat, jakeluaseman kahvio |
| `lahiruoka` | Lähiruoka & tilatuotteet | Tilamyymälät ja tuottajat |
| `elamykset` | Ohjelmapalvelut & elämykset | Vuokraus, ohjatut elämykset, pelit |
| `kasityo` | Käsityö & lahjat | Kädentaito ja tuliaiset |
| `kaupat` | Kaupat & päivittäispalvelut | Ruokakaupat, tarvikkeet, erikoiskauppa, polttoaine |
| `hyvinvointi` | Hyvinvointi & kauneus | Kuntosali, hoidot, kampaamo |
| `rakentaminen` | Rakentaminen & kiinteistö | Rakentaminen, remontit, maanrakennus |
| `kuljetus` | Kuljetus & liikenne | Tilausajot ja kuljetukset |
| `teollisuus` | Teollisuus & puuala | Puunjalostus ja valmistava teollisuus |

## Sivun toiminnallisuus

- **Vapaatekstihaku** yrityksen nimestä, kuvauksesta, tuotteista, kategoriasta ja kylästä. Haku normalisoi ääkköset, joten *kasityo* löytää myös *käsityön*. Useampi hakusana toimii JA-ehdolla.
- **Kategoriarajaus** napeilla; toimii yhdessä haun kanssa.
- **Tulosmäärä** ilmoitetaan ruudunlukijalle (`aria-live`).
- **Ryhmittely kategorioittain**; tyhjät ryhmät piilotetaan.
- Kortti linkittää kohdesivulle (jos kohde on olemassa) ja yrityksen omalle sivulle (jos tiedossa).

## Sisältö (tilanne 18.9.2026)

32 yritystä ja toimijaa. Näistä 15 on jo sivuston kohteita (`kohde`-viittaus), 17 on lisätty pelkkänä yritystietona.

### Sivuston omista kohteista periytyvät

Majoitus: Olkkolan Hovi, Saalastin Lomamökit, Karhunrinteen Loma, Savitaipaleen Caravan-alue, Wanha Havon koulu.
Ruoka: Ravintola Olkkolan Hovi, Ravintola Sahrami, Partakosken kesäpalvelut, Reiposen tila — Torpparin tupa (lähiruoka-kategoriassa).
Elämykset: Saimaan Palju, Pakohuoneet, Ammuntasimulaattori, Padel ja minigolf, Sähköfatbike-safari.
Käsityö: Savitaipaleen Käsityöasema.

### Lisätyt yritykset

| Yritys | Kategoria | Lähde |
|---|---|---|
| Jakeluasema ja Kahvio Suutari (Heituinlahti) | Ravintolat & kahvilat | savitaipale.fi — Yritystarinoita |
| Lapaton maitotila | Lähiruoka | savitaipale.fi — Yritystarinoita |
| S-market Savitaipale | Kaupat | s-kaupat.fi |
| K-Market Savitaipale | Kaupat | k-ruoka.fi |
| Savitaipaleen apteekki | Asiointi | savitaipaleenapteekki.fi |
| Hankkija Savitaipale | Kaupat | hankkija.fi |
| Savis Soppi | Kaupat | savitaipale.fi — Yritystarinoita |
| OP Salpa — Savitaipaleen konttori | Asiointi | op.fi — OP Salpa, Savitaipaleen konttori |
| Alko Savitaipale | Asiointi | alko.fi — myymälä 2797 |
| Savikunto | Hyvinvointi | savitaipale.fi — Yritystarinoita |
| Chic Hair | Hyvinvointi | savitaipale.fi — Yritystarinoita |
| Kaunis Zaida | Hyvinvointi | savitaipale.fi — Yritystarinoita |
| KKL Jurvanen Oy | Rakentaminen | savitaipale.fi — Yritystarinoita |
| Maalaus Tikka | Rakentaminen | savitaipale.fi — Yritystarinoita |
| Liikenne O. Eteläpää | Kuljetus | savitaipale.fi — Yritystarinoita |
| Tiaisen Saha Oy | Teollisuus | savitaipale.fi — Yritystarinoita |
| Finnstamm | Teollisuus | savitaipale.fi — Yritystarinoita |

## Tietoisesti pois jätetyt

- **Aukioloajat, hinnat ja yhteystiedot** — nopeasti vanhenevaa tietoa, jota lähteet eivät ylläpidä rakenteisena. Sivu ohjaa varmistamaan ne yritykseltä.
- **Osoitteet** uusille yrityksille — ei varmistettu lähteistä.
- **Työtytöt** — yritys mainitaan kunnan yritystarinoissa, mutta toimiala ei käy lähteestä ilmi riittävän tarkasti kategorisoitavaksi.
- **Kunnan omat palvelut** (kirjasto, Kela-piste) — eivät ole yrityksiä; kuuluvat tarvittaessa Suunnittele-sivulle.

## Ylläpito jatkossa

Osio on ilmoituspohjainen: sivu kehottaa yrittäjää ilmoittamaan tietonsa kunnan osoitteeseen. Tuotantoversiossa tämä olisi ylläpitojärjestelmän lomake ja hyväksymisjono (toimijaportaali), jossa yrittäjä päivittää omat tietonsa ja kunta hyväksyy muutokset ennen julkaisua.
