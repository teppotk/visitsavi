# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mikä tämä projekti on

Savitaipaleen (Etelä-Karjalan kunta) **matkailusivusto**. Sivuston kieli on **suomi** — kaikki käyttäjälle näkyvä sisältö ja lähtökohtaisesti myös suunnitteludokumentit kirjoitetaan suomeksi.

Verkkosivustoa **ei ole vielä suunniteltu eikä toteutettu**. Nykyinen vaihe on sisällön ja tietorakenteen suunnittelu; repositoriossa ei ole vielä koodia, build-työkaluja eikä testejä.

## Hakemistorakenne

- **`/material`** — alkuperäinen lähdemateriaali. Sisältää `source-material-links.md`:n: 8 ulkoista lähdesivustoa (savitaipale.fi, saimaageopark.fi, gosaimaa.com, tapahtumat.ekarjala.fi, olkkolanhovi.fi, saimaanpalju.fi, savitaipaleenurheilijat.fi, lahella.fi). Vain linkit, ei sisältöä.
- **`/sisalto`** — lähdemateriaalista jäsennelty tietorakenne (suomeksi). **Tämä on projektin nykyinen ydin.** Aloita aina täältä.

## /sisalto — lue tämä ensin

`/sisalto/README.md` on koko hakemiston sisällysluettelo. Tiedostot kolmessa kerroksessa:

- **Suunnittelu:** `00-tietorakenne.md` (informaatioarkkitehtuuri, navigaatio, sisältötyypit), `01-metadata-skeemat.md` (metatietokentät + taksonomia)
- **Sisältöinventaario:** `10`–`15` (perustiedot, nähtävyydet & Geopark, luonto/ulkoilu, majoitus/palvelut, tapahtumat, historia)
- **Laatu:** `90-lahteet-ja-tietoaukot.md` (lähteet + ennen julkaisua varmistettavat faktat)

Kun suunnittelet sisältöä tai rakennetta, nojaa näihin. Kun lisäät tietoa, päivitä oikea `/sisalto`-tiedosto äläkä tee rinnakkaista kopiota.

## Keskeiset suunnittelupäätökset (älä riko näitä ilman syytä)

- **Profiili:** Savitaipale = luonto / järvi (Saimaa + Kuolimo) / mökkeily / kulttuurihistoria. EI kaupunki- eikä kylpylämatkailu.
- **Sisältötyypit:** erottele aikasidonnainen `tapahtuma` ja pysyvä `palveluntarjoaja`/toimipaikka (vrt. tapahtumakalenterin `event` vs. `organizer`). Mallinna palveluntarjoaja–palvelu-suhde (esim. Olkkolan Hovi kokoaa majoituksen, ravintolan, saunat, aktiviteetit ja tapahtumat).
- **Koordinaatit** talletetaan kaikkiin paikkasidonnaisiin kohteisiin alusta asti (kartta on ydinominaisuus).
- **Hinnat ja aukioloajat** ovat valinnaisia kenttiä — lähteet eivät ylläpidä niitä rakenteisena datana, ja moni palvelu on vain kesäkaudella. Merkitse kausiluontoisuus näkyvästi.

## Datalähde-integraatiot

- **Tapahtumat:** koneluettava JSON Savitaipaleen kokoelmalle:
  `https://tapahtumat.ekarjala.fi/api/collection/5db067d83799da2f29ee4d1b/content?lang=fi&country=FI&out=JSON` (Eventz.today; sisältää koordinaatit). Tapahtumatietomalli on kuvattu `14-tapahtumat.md`:ssä.
- **Reitit/kartat:** Retkikartta, Outdooractive, ekarjala-retkeily.fi, kunnan Karttatiimi (savitaipale.karttatiimi.fi).
- **Geokohteet:** Saimaa Geopark (kohdekuvaukset, koordinaatit, opaste-PDF:t).

## Faktojen käsittely

Älä keksi faktoja (hinnat, päivämäärät, aukioloajat, yhteystiedot). `90-lahteet-ja-tietoaukot.md` listaa tunnetut tietoaukot ja ennen julkaisua varmistettavat kohdat — kunnioita näitä ja lisää uudet aukot samaan tiedostoon, kun niitä ilmenee.
