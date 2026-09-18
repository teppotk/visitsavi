# Lähteet ja tietoaukot

## Lähdesivustot (kansiosta `/material`)

| Lähde | Rooli | Käyttö sisällössä |
|---|---|---|
| [savitaipale.fi](https://savitaipale.fi/fi) | Kunnan virallinen sivusto | Perustiedot, nähtävyydet, museot, reitit, tapahtumat, historia — **tarkin peruslähde** |
| [saimaageopark.fi](https://saimaageopark.fi) | Saimaa UNESCO Global Geopark | Geokohteet, geologia, koordinaatit, opaste-PDF:t, kestävä matkailu |
| [gosaimaa.com](https://gosaimaa.com) | Seudullinen matkailuportaali | Savitaipale-kohteet + **informaatioarkkitehtuurin malli** (kategoriat, kohdesivujen metatiedot) |
| [tapahtumat.ekarjala.fi](https://tapahtumat.ekarjala.fi/fi-FI) | Etelä-Karjalan tapahtumakalenteri | Tapahtumat + **koneluettava JSON-rajapinta** + tapahtuman tietomalli (Eventz.today) |
| [olkkolanhovi.fi](https://olkkolanhovi.fi) | Kärkitoimija (kartano) | Majoitus, ravintola, juhlat, saunat, aktiviteetit — mallikohde |
| [saimaanpalju.fi](https://www.saimaanpalju.fi) | Ohjelmapalvelu | Paljut, vuokraus, ohjelmat; noutopiste Olkkolan Hovilla |
| [savitaipaleenurheilijat.fi](https://www.savitaipaleenurheilijat.fi) | Urheiluseura | Lajit, liikuntapaikat, talvireitit (luistelu, ladut) |
| [lahella.fi](https://www.lahella.fi) | Yleishyödyllinen toiminta | ⚠️ EI yrityshakemisto — vain harrastus-/vapaaehtoistoiminnan täydennys |

**Täydentävät lähteet** (agenttien käyttämät varmennukset): fi.wikipedia.org, luontoon.fi, outdooractive.fi, ekarjala-retkeily.fi, venuu.fi, finder.fi, esaimaa.fi, taipaleenseurakunta.fi.

**Yritystiedon lähteet** (Tuotteet & yritykset -osio, ks. [`16-yritykset-ja-tuotteet.md`](16-yritykset-ja-tuotteet.md)):

| Lähde | Käyttö |
|---|---|
| [savitaipale.fi/fi/yritystarinoita](https://www.savitaipale.fi/fi/yritystarinoita) | Kunnan omat yritysesittelyt — pääasiallinen lähde lisätyille yrityksille |
| s-kaupat.fi, k-ruoka.fi, hankkija.fi, savitaipaleenapteekki.fi | Ketjujen ja toimijoiden omat sivut: olemassaolo ja toimiala |
| savitaipaleenseutu.wordpress.com | Paikallisblogi: Reiposen tilan tilamyymälän tuotteet (varmistettava) |
| Savitaipaleen Yrittäjät ry (n. 100 jäsenyritystä) | Kattava jäsenlista **ei ole julkisesti koneluettavassa muodossa** — pyydettävä yhdistykseltä |

## Datan laatu

- **Luotettavimmat:** perustiedot, geokohteet (koordinaatit), historia, kohteiden kuvaukset, sivustorakenteen malli.
- **Suuntaa-antavat / vanhenevat nopeasti:** hinnat, aukioloajat, tapahtumapäivät. Lähdesivustot **eivät ylläpidä hintoja/aukioloja rakenteisena datana** — GoSaimaa esim. ohjaa toimijan omalle sivulle. Suunnittele nämä kentät valinnaisiksi + "tarkista tarjoajalta".
- **Kausivaihtelu:** suuri osa Savitaipaleen palveluista on avoinna vain kesäkaudella — merkitse selvästi.

## Ennen julkaisua varmistettavat asiat

1. **Julkinen liikenne** Savitaipaleelle (bussivuorot) — ei löytynyt kunnan sivustolta
2. **Sapassi-viikon 2026 tarkat päivät** (lähteissä 11.–18.7. vs. 10.–18.7.)
3. **Tennisturnauksen virallinen nimi/kirjoitusasu** (esiintyi muodoissa "OP Salpa Savitaipale Open" ja "OP Saivitaipale Open")
4. **Nimen "Savitaipale" alkuperä** — ei varmistettua tietoa
5. **Asukasluku** — lähteet 3 094–3 188; käytä "~3 100"
6. **Kattava ravintola-/kahvila-/majoituslista** — lähteet kattavat vain kärkitoimijat; täydennettävä paikallisesti (Finder, kunnan yrittäjätietopankki, kylätoimijat)
7. **Karhunrinteen Loman** oma kohde-URL / ajantasaiset tiedot
8. **Saimaan Paljun hinnasto** (varaussivut palauttivat 404 — pyydettävä suoraan)
9. **Uimarantojen ja latuverkoston täydellinen lista** — osa kunnan sivuista palautti 404
10. **UNESCO Geopark -statuksen vuosi** (2021, varmennus suoraan Geoparkilta)
11. **Kuvapankki ja tekijänoikeudet** — lähdesivujen kuvia ei voi käyttää sellaisenaan; tarvitaan omat/lisensoidut kuvat kohteille
12. **Yrityslistauksen kattavuus** — Tuotteet & yritykset -osiossa on 30 toimijaa; Savitaipaleen Yrittäjissä on n. 100 jäsentä. Lista täydennettävä yhdistyksen ja yrittäjien kanssa
13. **Lisättyjen yritysten osoitteet, aukioloajat ja yhteystiedot** — jätetty tietoisesti pois, koska niitä ei varmistettu lähteistä. Kerättävä suoraan yrityksiltä
14. **Reiposen tilan tilamyymälän tuotevalikoima** — perustuu paikallisblogin tietoon (lihat, makkarat); varmistettava tilalta
15. **Työtytöt-yrityksen toimiala** — mainittu kunnan yritystarinoissa, mutta toimiala ei käy ilmi; ei lisätty listaukseen
16. **Yritystietojen ylläpitovastuu** — kuka kunnassa vastaa listauksen ajantasaisuudesta ja yrittäjien ilmoitusten käsittelystä
17. **Liikuntapaikkojen osoitteet, koordinaatit, aukioloajat ja hinnat** — Aktiviteetit-osion liikuntapaikat (jäähalli, uimahalli, tennishalli, kuntosali, frisbeegolfrata, koulukeskuksen liikunta-alue, skeittipuisto/Backyard Park, ravirata, motocross-rata, ratsastus) on kuvattu vain sillä tarkkuudella, joka lähteistä löytyi. Koordinaatteja ei ole → kohteet eivät näy kartalla. Kerättävä kunnan liikuntatoimelta
18. **Uimahallin kausi** — lähteessä "noin 1.9.–14.6."; varmistettava kunnalta vuosittain
19. **Tenniskenttien varauskäytäntö ja tennisseuran yhteystiedot** — ei varmistettu
20. **Ratsastustallien nimet ja palvelut** — "hevospitäjä" mainittu lähteissä, yksittäisiä talleja ei varmistettu
21. **Asiointipalvelujen aukioloajat** — Alkon, OP Salpan ja apteekin aukioloajat tarkistettiin toimijoiden omilta sivuilta 18.9.2026 ja ne näkyvät korteilla tarkistuspäivineen. Ne **vanhenevat**: Savitaipaleen Alkon aukioloja supistettiin syyskuussa 2026 (auki ti, to, pe ja la) ja OP Salpan konttoriaikoja muutettiin 1.5.2026. Tarkistettava vähintään kausittain; kortit linkittävät suoraan toimijan sivulle

## Tekniset mahdollisuudet (huomioitu rakenteessa)

- **Tapahtumat automaattisesti:** `GET https://tapahtumat.ekarjala.fi/api/collection/5db067d83799da2f29ee4d1b/content?lang=fi&country=FI&out=JSON` (Savitaipaleen kokoelma, sisältää koordinaatit). **Toimii palvelinpuolelta** — selaimesta CORS estää. Haku on toteutettu: `tools/hae-tapahtumat.py` kirjoittaa `assets/data/tapahtumat.json`-syötteen. Kokoelmassa on sekä `event`- että `organizer`-sivuja, ja mukana on myös etätapahtumia ja muiden kuntien tilaisuuksia — skripti vaatii Savitaipaleella olevan osoitteen. Syöte päivitettiin viimeksi 18.9.2026 (17 tulevaa tapahtumaa)
- **Reittidata:** Retkikartta, Outdooractive, ekarjala-retkeily.fi, kunnan Karttatiimi (savitaipale.karttatiimi.fi)
- **Geokohteet + opasteet:** Saimaa Geopark (kohdesivut, koordinaatit, opaste-PDF:t)
