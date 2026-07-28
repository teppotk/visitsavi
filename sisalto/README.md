# Savitaipaleen matkailusivusto — sisältö- ja tietorakenne

Tämä hakemisto sisältää Savitaipaleen matkailusivuston suunnittelun **lähtötiedot ja tietorakenteen**. Tiedostot on koottu kansiossa `/material` luetelluista lähteistä (kesä 2026) ja jäsennelty tavallisten matkailusivustojen rakenteiden mukaan.

> **Huom.** Verkkosivustoa ei ole vielä suunniteltu eikä toteutettu. Nämä tiedostot ovat raaka-aineisto ja suunnittelun pohja sisällölle, navigaatiolle ja sisältötyypeille.

## Hakemiston rakenne

Tiedostot jakautuvat kahteen kerrokseen:

### A) Suunnittelu — sivuston rakenne ja tietomalli
| Tiedosto | Sisältö |
|---|---|
| [`00-tietorakenne.md`](00-tietorakenne.md) | Informaatioarkkitehtuuri: pääosiot, navigaatio, sisältötyypit, sivukartta |
| [`01-metadata-skeemat.md`](01-metadata-skeemat.md) | Kunkin sisältötyypin metatietokentät + yhteinen taksonomia (kategoriat, tagit, vuodenajat, kohderyhmät) |

### B) Sisältöinventaario — Savitaipaleen faktat
| Tiedosto | Sisältö |
|---|---|
| [`10-savitaipale-perustiedot.md`](10-savitaipale-perustiedot.md) | Yleiskuvaus, sijainti, saavutettavuus, avainluvut |
| [`11-nahtavyydet-ja-kohteet.md`](11-nahtavyydet-ja-kohteet.md) | Nähtävyydet, museot, Geopark-geokohteet |
| [`12-luonto-ja-ulkoilu.md`](12-luonto-ja-ulkoilu.md) | Reitit, vesistöt, aktiviteetit, talvi, liikuntapaikat |
| [`13-majoitus-ja-palvelut.md`](13-majoitus-ja-palvelut.md) | Majoitus, ravintolat, ohjelmapalvelut |
| [`14-tapahtumat.md`](14-tapahtumat.md) | Tapahtumat + tapahtumakalenterin datamalli/API |
| [`15-historia-ja-kulttuuri.md`](15-historia-ja-kulttuuri.md) | Historia, merkkihenkilöt, muistomerkit, perinteet |

### C) Lähteet ja laatu
| Tiedosto | Sisältö |
|---|---|
| [`90-lahteet-ja-tietoaukot.md`](90-lahteet-ja-tietoaukot.md) | Lähdeluettelo, datan luotettavuus, ennen julkaisua varmistettavat asiat |

## Savitaipaleen matkailuprofiili lyhyesti

Savitaipale profiloituu **luonto-, järvi-, mökkeily- ja kulttuurihistoriakohteena** — ei kaupunki- tai kylpylämatkailuna. Kärkiteemat:

1. **Kaksi järveä** — Saimaa ja kirkasvetinen Kuolimo, niiden välinen kannas
2. **Saimaa UNESCO Global Geopark** — jääkauden jäljet, harjut, geokohteet
3. **Kulttuurihistoria** — Kärnäkosken linnoitus (Suvorov 1793), kirkonrakentajat, D. E. Europaeus
4. **Talvierikoisuus** — retkiluistelu kirkasvetisen Kuolimon jäällä
5. **Kesätapahtumat** — Sapassi-viikko, kyläjuhlat, kartanotapahtumat

## Käyttö jatkossa

Näitä tiedostoja käytetään sivuston **sisällön ja rakenteen suunnitteluun**: sisältötyyppien ja metatiedon määrittelyyn, navigaation suunnitteluun, sivujen luonnosteluun ja tuotannon tehtävälistaan. Ennen julkaisua faktat (aukioloajat, hinnat, päivämäärät, yhteystiedot) on tarkistettava — ks. `90-lahteet-ja-tietoaukot.md`.
