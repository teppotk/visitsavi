# Tapahtumat

Osio "Tapahtumat". Sisältötyyppi `tapahtuma` (aikasidonnainen) ja `palveluntarjoaja` (järjestäjä). Kentät: ks. [`01-metadata-skeemat.md`](01-metadata-skeemat.md).

## Datalähde: Etelä-Karjalan tapahtumakalenteri (koneluettava)

Savitaipaleen tapahtumat kootaan **Etelä-Karjalan tapahtumakalenteriin** (tapahtumat.ekarjala.fi), joka pyörii **Eventz.today**-alustalla. Sama alusta on Lappeenrannan (tapahtumat.lappeenranta.fi) ja EK:n harrastuskalenterin taustalla samalla tietomallilla.

**JSON-rajapinta Savitaipaleen kokoelmalle:**
```
GET https://tapahtumat.ekarjala.fi/api/collection/5db067d83799da2f29ee4d1b/content?lang=fi&country=FI&count=N&out=JSON
→ palauttaa { pages: [...] }
```
Sisältää koordinaatit → tapahtumat voidaan **hakea automaattisesti** ja näyttää sekä listassa että kartalla sen sijaan, että ne syötettäisiin käsin. Savitaipaleen kokoelmassa oli haetulla hetkellä 44 kohdetta: 16 varsinaista tapahtumaa + 28 järjestäjä-/toimipaikkaprofiilia.

---

## Tapahtuman tietomalli (Eventz.today → oma sivusto)

Kaksi `pageType`ä: **`event`** (aikasidonnainen tapahtuma) ja **`organizer`** (pysyvä järjestäjä/toimipaikka). Erottele nämä myös omalla sivustolla.

### Tapahtuman (`event`) keskeiset kentät
| Kenttä | Kuvaus |
|---|---|
| `name` | Nimi |
| `descriptionShort` / `descriptionLong` | Lyhyt ingressi / pitkä kuvaus (HTML) |
| `event.dates[]` (`{start, end}`) | **Monta esityskertaa** — tue tätä alusta asti |
| `defaultStartDate` / `defaultEndDate` | Ensimmäinen/viimeinen ajankohta (ISO 8601 UTC) |
| `locations[]` (`lat`, `lng`, `address`) | Sijainti + koordinaatit |
| `ownerName` / `email` | Järjestäjä + yhteys |
| `globalContentCategories[]` | Ihmisluettavat kategoriat (ks. alla) |
| `ages[]` | Kohderyhmän ikäluokat (age-1…age-7) |
| `seasons[]` / `hashtags[]` | Kausi / aihetunnisteet |
| `hasPrice` / `event.urlPurchaseTicket` | Maksullisuus / lipunmyynti |
| `event.urlSignUp` / `min-/maxParticipants` | Ilmoittautuminen / osallistujarajat |
| `imageDesktop/Mobile/List` + `imageAlt` | Kuvat eri näkymiin + alt |
| `url*` (Facebook, Instagram, YouTube …) | Some-linkit |
| `creationDate` / `modificationDate` / `privacy` | Ylläpito |

### Kategoriat (`globalContentCategories`)
Savitaipale-aineistossa esiintyneet arvot (yhtenäistä oman sivuston kategorioiden kanssa):
`kids and family` · `youths` · `adults` · `seniors` · `students` · `venues` · `companies and associations` · `museums` · `exhibitions` · `churches` · `clubs and restaurants` · `festivals` · `fairs` · `excursions, guided tours` · `activities` · `sports and fitness` · `dance` · `music` · `circus` · `seminars and meetings` · `voluntary` · `other`

---

## Kesän vuosipilarit (toistuvat päätapahtumat)

Nämä ovat Savitaipaleen matkailun tapahtumakärki — nostettava etusivulle/kohokohtiin:

| Tapahtuma | Ajankohta | Kuvaus |
|---|---|---|
| **Sapassi-viikko** | heinäkuu (2026: ~11.–18.7., varmistettava) | Kunnan päätapahtuma: musiikkia (klassinen→rock), teatteria, tanssit, perinnekilpailut, lasten museopäivä, kirpputorit, kylä-/maalaismarkkinat, ruokakarnevaali. Paikkoja: Olkkolan Hovi, Ranta-aita, Säänjärvi, Hakamäki, kirkot, koulut. |
| **Pettilän maalaismarkkinat + Pettilä Grand Prix (polkuformulat)** | Sapassi-viikolla, Pettilän koulu | Markkinat + polkuformula-ajot |
| **Savitaipaleen kesäajot (ravit)** | kesä, ravirata | Raviurheilu; ml. "Muikkuravit" (liput ~7 €, alle 16 v. ilmainen) |
| **Olkkolan Hovin kesäkonsertit** | kesä–heinäkuu | Konsertteja (esim. Bomba Buena, Inariveljet, Helmi Marleena), tikkakisa, kirpputori, autojen cruising |
| **OP Salpa Savitaipale Open** | 2026: 29.7.–2.8. | Kansainvälinen naisten tennisturnaus (nimen kirjoitusasu varmistettava) |
| **Hakamäki Piknik** | kesä, Hakamäen museoalue | Musiikkitapahtuma |
| **Olkkolan Hovin 120-vuotisjuhlaviikko** | 2026: 8.–13.6. | Kertaluonteinen 2026 (kartano rakennettu 1906) |

### Veskansan ry:n kyläkierto (Pettilä/Kuivasensaari)
Toistuva kyläjuhlien vuosikierto: **Pettilän Ruispuurojuhla** (elokuu), **Pettilän Rosvopaisti-ilta** (syyskuu), **Kauneimmat joululaulut ja lähetysmyyjäiset** (marraskuu), **Itsenäisyyspäivän juhla ja joulujuhla** (joulukuu), syystalkoot.

### Talvi
- **Helmikuun luisteluretkitapahtuma Kuolimolla** — talvimatkailun vetonaula (retkiluistelu kirkasvetisellä järvijäällä)

---

## Esimerkkitapahtumia 2026 (kalenterin poiminta)

Osoittaa sisältötyyppien kirjon (näyttelyt, kyläjuhlat, työpajat, kohtaamispaikat, esitykset):

- Valokuvanäyttelyt (Gellaria, kirjasto) · Harri Siitosen veistokset (kirjasto)
- Astuvan perilliset Kallioniemessä (1.8.) · Janne Mustonen – Mystinen Taikashow (7.10., koulukeskuksen auditorio)
- Kesä-Lavis (lavatanssijumppa) · Muistikahvila · Sydänkerho (toistuvat kohtaamiset)

---

## Järjestäjä-/toimipaikkaprofiilit (`organizer`)

Matkailullisesti relevantit toistuvien tapahtumien tuottajat ja toimipaikat:

- **Gellaria** (näyttelytila, Peltoinlahdentie 11) · **Olkkolan Hovi** (ravintola/hotelli/tapahtumat) · **Savitaipaleen Käsityöasema** (Kievarintie 1) · **Välijoen Nuorisoseura Riento ry** (kesäteatteri, tanssit, Männistöntie 10) · **Veskansan ry** (Pettilän kyläkeskus) · **Reiposen tila** (kesäkahvila, Elomäentie 256) · **Koulukeskuksen auditorio** (konsertit, teatteri) · **Heituinlahden Nuorisoseura ry**
- Muut: Savitaipaleen kirjasto, kansalaisopisto, kunta, liikuntatoimi, tennisseura, Savitaipaleen Urheilijat (luistelujaosto), Musiikinystävät ry, Kansantaideyhdistys ry, Taipaleen seurakunta

## Tapahtumakalenterit (linkit)

Kunnan sivu (Ajankohtaiset tapahtumat + Sapassi) · tapahtumat.ekarjala.fi · tapahtumat.lappeenranta.fi · Olkkolan Hovi (olkkolanhovi.fi/tapahtumakalenteri).

> **Varmistettava ennen julkaisua:** Sapassi-viikon tarkat päivät ja tennisturnauksen virallinen nimi/kirjoitusasu.
