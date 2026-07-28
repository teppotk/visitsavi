# Metatietoskeemat (sisältötyyppien kentät)

Tämä dokumentti määrittelee kunkin sisältötyypin **metatietokentät** ja niiden yhteisen **taksonomian**. Skeemat perustuvat lähdesivustoilla havaittuihin rakenteisiin (gosaimaa.com:n kohdesivut, Etelä-Karjalan tapahtumakalenterin tietomalli) ja matkailusivustojen yleisiin käytäntöihin.

Merkinnät: **P** = pakollinen, **S** = suositeltu, **V** = vapaaehtoinen.

---

## Yhteiset kentät (kaikki paikkasidonnaiset sisältötyypit)

Nämä kentät ovat yhteisiä sisältötyypeille `kohde`, `reitti`, `majoitus`, `ravintola`, `aktiviteetti`, `palveluntarjoaja`, `tapahtuma`.

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `id` | P | Yksilöivä tunniste (slug) |
| `nimi` | P | Otsikko |
| `sisältötyyppi` | P | Ks. `00-tietorakenne.md` |
| `kuvausLyhyt` | P | Ingressi / hakutulos­kuvaus (1–2 lausetta) |
| `kuvausPitkä` | S | Pääteksti (voi sisältää väliotsikot) |
| `kuvat` | P | Hero-kuva + galleria; jokaisella `altTeksti` |
| `sijainti.osoite` | S | Katuosoite + postinumero + kunta |
| `sijainti.lat` / `sijainti.lng` | S | Koordinaatit (karttaa varten) |
| `sijainti.kylä` | V | Partakoski / Pettilä / Kuivasensaari / Heituinlahti / Rahikkala / kirkonkylä |
| `kategoriat` | P | Ks. taksonomia alla |
| `tagit` | S | Vapaat aihetunnisteet (esim. "UNESCO Geopark", "lapsiystävällinen") |
| `vuodenajat` | S | kevät / kesä / syksy / talvi / ympärivuotinen |
| `kohderyhmät` | V | Ks. taksonomia alla |
| `yhteystiedot.puhelin` | S | |
| `yhteystiedot.email` | S | |
| `yhteystiedot.verkkosivu` | S | Ulkoinen URL |
| `yhteystiedot.some` | V | Facebook, Instagram, TikTok … |
| `aukioloajat` | S | Rakenteinen tai teksti; huomioi kausiluontoisuus |
| `esteettömyys` | V | Esteettömyystiedot |
| `saavutettavuus` | V | Miten kohteeseen pääsee (auto, vene, jalan) + pysäköinti |
| `linkit` | V | Lisälinkit (reittikartta, opas-PDF, varaus) |
| `lähdeUrl` | S | Mistä tieto on peräisin (sisäinen ylläpito) |
| `päivitetty` | S | Viimeisin muokkaus (sisäinen ylläpito) |

---

## `kohde` (nähtävyys / museo / luontokohde / geokohde)

Yhteisten lisäksi:

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `kohdetyyppi` | P | nähtävyys / museo / kulttuuriperintö / luontokohde / geokohde / näköalapaikka |
| `geoparkKohde` | S | Onko Saimaa Geopark -geokohde (kyllä/ei) |
| `geologinenKuvaus` | V | Geokohteille: geologinen merkitys, kivilaji, jääkauden jäljet |
| `pääsymaksu` | S | maksuton / maksullinen / vapaaehtoinen; hinta |
| `palvelutPaikalla` | V | Laavu, käymälä, nuotiopaikka, pysäköinti, opaste |
| `opasteet` | V | Linkit opas-PDF:iin (Geopark-kohteilla saatavilla) |

**Esimerkkikohteet:** Kärnäkosken linnoitus, Savitaipaleen kirkko, Rahikkalan tuulimylly, Hakamäen museoalue, Europaeus-museo, Kirkonrakentajien museo, Luotolahdenvuoren jyrkänteet, Lehtisensaari.

---

## `reitti` (retkeily / pyöräily / luistelu)

Yhteisten lisäksi:

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `reittityyppi` | P | retkeily / maastopyörä / pyörä / luistelu / luontopolku |
| `pituusKm` | P | Reitin pituus |
| `arvioituKesto` | S | esim. "3 h" |
| `vaativuus` | S | helppo / keskivaikea / vaativa |
| `reittityyppiMuoto` | V | lenkki / edestakainen / yhdensuuntainen |
| `lähtöpiste` | S | Osoite + koordinaatit + pysäköinti |
| `varusteet` | V | Laavut, taukopaikat, käymälät reitin varrella |
| `kausirajoitus` | S | esim. "pyöräily kielletty lumiaikaan" |
| `karttaLinkki` | S | Retkikartta / Outdooractive / GPX |
| `kohteetReitillä` | V | Viittaukset `kohde`-sisältöihin reitin varrella |

**Esimerkkireitit:** Orrainpolku (n. 10 km, vaativa), Savitaipaleen MTB-reitti (28 km), Saimaan saaristoreitti (pyörä), "Jääkauden jäljet" -luontopolku (Lepänkanto), Kuolimon luistelurata (2,5 / 3,5 km).

---

## `majoitus`

Yhteisten lisäksi:

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `majoitustyyppi` | P | hotelli / mökki / lomahuoneisto / caravan / leirintä / hostelli / B&B / maatila |
| `kapasiteetti.huoneet` | S | Huoneiden/mökkien lkm |
| `kapasiteetti.vuodepaikat` | S | Vuodepaikat |
| `varustelu` | S | Sauna, ranta, keittiö, WiFi, takka … (tag-lista) |
| `talviasuttava` | V | Mökeille |
| `hintataso` | S | € / €€ / €€€ tai alkaen-hinta |
| `varauslinkki` | S | Varausalusta (esim. Johku) |

**Esimerkkikohteet:** Olkkolan Hovi (hotelli 18–19 huonetta + caravan + rantasaunat), Saalastin Lomamökit, Karhunrinteen Loma, Wanha Havon koulu, mökkivuokraus.

---

## `ravintola` (ravintola / kahvila / kesäkioski)

Yhteisten lisäksi:

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `ravintolatyyppi` | P | ravintola / kahvila / lounaspaikka / kesäkahvila / kioski |
| `keittiö` | V | Lähiruoka, à la carte, lounasbuffet … |
| `hintataso` | S | € / €€ / €€€ |
| `erityisruokavaliot` | V | |
| `terassi` | V | |
| `kausiluontoinen` | S | Vain kesällä avoinna (moni Savitaipaleella) |

**Esimerkkikohteet:** Olkkolan Hovin ravintola (lounasbuffet, à la carte, kesäterassi), Partakosken kesäravintolat, Reiposen tilan kesäkahvila (Torpparin tupa).

---

## `aktiviteetti` (elämys / ohjelmapalvelu)

Yhteisten lisäksi:

| Kenttä | Taso | Kuvaus |
|---|---|---|
| `aktiviteettityyppi` | P | vesiaktiviteetti / talviaktiviteetti / peli / elämys / opastus / vuokraus |
| `tuottaja` | S | Viittaus `palveluntarjoaja`an |
| `hinta` | S | esim. "5 €/hlö", "35 €/hlö ryhmä" |
| `kesto` | V | esim. "60 min" |
| `osallistujat.min` / `.max` | V | |
| `varattava` | S | Vaatiiko ennakkovarauksen |
| `varauslinkki` | V | |
| `kausi` | S | Talvi/kesä-riippuvuus |

**Esimerkkikohteet:** retkiluistelu Kuolimolla, melonta/SUP/kajakki, kalastus, escape room (Olkkolan Hovi), padel, minigolf, ammuntasimulaattori, paljuvuokraus (Saimaan Palju), sähköfatbike-safari.

---

## `palveluntarjoaja` (yritys / yhdistys / toimipaikka)

Pysyvä profiili, joka **kokoaa** yhteen tarjoajan tuottamat majoitukset, ravintolat, aktiviteetit ja tapahtumat. Vastaa tapahtumakalenterin `organizer`-tyyppiä.

| Kenttä | Taso | Kuvaus |
|---|---|---|
| yhteiset kentät | | nimi, kuvaus, sijainti, yhteystiedot, some, aukioloajat |
| `tarjoajatyyppi` | P | yritys / yhdistys / seurakunta / kunta |
| `tuottamatSisällöt` | S | Viittaukset majoituksiin, ravintoloihin, aktiviteetteihin, tapahtumiin |

**Esimerkkejä:** Olkkolan Hovi (Original Events Oy), Saimaan Palju Events, Veskansan ry, Savitaipaleen Käsityöasema, Gellaria, Reiposen tila, Savitaipaleen Urheilijat, Savitaipaleen kirjasto.

---

## `tapahtuma`

Aikasidonnainen. Kentät mukailevat Etelä-Karjalan tapahtumakalenterin (Eventz.today) tietomallia, jotta suora tuonti on mahdollista. Ks. koko malli [`14-tapahtumat.md`](14-tapahtumat.md).

| Kenttä | Taso | Kuvaus |
|---|---|---|
| yhteiset kentät | | nimi, kuvausLyhyt, kuvausPitkä (HTML), sijainti, kuvat, kategoriat |
| `alku` / `loppu` | P | Ensimmäinen/viimeinen ajankohta (ISO 8601) |
| `esityskerrat` | S | `dates[]` — lista `{alku, loppu}` monelle kerralle |
| `toistuvuustyyppi` | V | yksittäiset päivät / sarja |
| `järjestäjä` | P | Viittaus `palveluntarjoaja`an tai nimi |
| `maksullinen` | S | kyllä/ei |
| `lipunmyyntiLinkki` | V | |
| `ilmoittautumisLinkki` | V | |
| `osallistujat.min` / `.max` | V | |
| `ikäluokat` | V | Kohderyhmän ikä (lapset … seniorit) |

**Kesän vuosipilarit:** Sapassi-viikko (heinäkuu), Pettilän maalaismarkkinat + polkuformulat, kesäajot (ravit), Olkkolan Hovin kesäkonsertit, OP Salpa Savitaipale Open (tennis), Hakamäki Piknik, Veskansan ry:n kyläkierto.

---

## `artikkeli` / `kokoelma` / `sivu`

Kevyet sisältötyypit:

- **`artikkeli`**: `nimi`, `kuvausLyhyt`, `kuvat`, `runkoteksti`, `tagit`, `julkaistu`, `kirjoittaja` — tarinat, historiikit, teemajutut.
- **`kokoelma`**: `nimi`, `kuvausLyhyt`, `hero-kuva`, `viittaukset` (suodatinsäännöt tai käsin valitut kohteet) — teema-/kohderyhmäsivut.
- **`sivu`**: `nimi`, `runkoteksti` — staattiset infosivut (saavutettavuus, kartat, UKK, matkailuneuvonta).

---

## Yhteinen taksonomia

### Kategoriat (`kategoriat`)
Yhtenäistetty lista sisältötyypeittäin — mukailee tapahtumakalenterin `globalContentCategories`-arvoja:

- **Näe & koe**: nähtävyydet, museot, kulttuuriperintö, kirkot, näyttelyt, näköalapaikat
- **Luonto**: geokohteet, luontokohteet, retkeilyreitit, uimarannat, vesistöt
- **Tekemistä**: aktiviteetit, liikunta ja hyvinvointi, vesiaktiviteetit, talviaktiviteetit, opastukset ja retket
- **Majoitus**: hotellit, mökit ja lomahuoneistot, leirintä ja caravan, muu majoitus
- **Syö & juo**: ravintolat, kahvilat, kesäpalvelut, lähiruoka
- **Tapahtumat**: festivaalit, markkinat, musiikki, teatteri ja tanssi, urheilutapahtumat, kyläjuhlat, näyttelyt, seminaarit

### Vuodenajat (`vuodenajat`)
`kevät` · `kesä` · `syksy` · `talvi` · `ympärivuotinen`
(Savitaipaleella vahva kausivaihtelu: moni palvelu vain kesällä; talven kärki = retkiluistelu ja ladut.)

### Kohderyhmät (`kohderyhmät`)
`perheet` · `lapset` · `nuoret` · `aikuiset` · `seniorit` · `ryhmät` · `luontomatkailijat` · `mökkiläiset` · `kulttuurin ystävät` · `lemmikin kanssa`
(Ikäluokat tapahtumissa: lapset → seniorit, vrt. kalenterin `ages` age-1…age-7.)

### Kylät / alueet (`sijainti.kylä`)
`kirkonkylä` · `Partakoski` · `Pettilä` · `Kuivasensaari` · `Heituinlahti` · `Rahikkala` · `Säänjärvi` · `Suomensalo`

---

## Suositus toteutukseen

1. Käytä **yhtä yhtenäistä metatietoskeemaa** yhteiskentillä ja tyyppikohtaisilla laajennuksilla — helpottaa hakua, suodatusta ja karttaa.
2. Tallenna **koordinaatit alusta asti** kaikkiin paikkasidonnaisiin kohteisiin (kartta on matkailusivuston ydinominaisuus; data on jo saatavilla Geopark- ja tapahtumalähteistä).
3. Mallinna **palveluntarjoaja–palvelu-suhde** (Olkkolan Hovi on tästä malliesimerkki: yksi tarjoaja, monta palvelutyyppiä).
4. Merkitse **kausiluontoisuus ja aukioloajat** näkyvästi — suuri osa Savitaipaleen palveluista on vain kesäkaudella.
5. Varaudu **puuttuviin hintoihin/aukioloihin** — lähdesivustotkaan eivät ylläpidä näitä rakenteisena datana. Suunnittele kentät valinnaisiksi ja "tarkista tarjoajalta" -ohjaukseksi.
