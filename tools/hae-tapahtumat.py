#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hakee Savitaipaleen tapahtumat Etelä-Karjalan tapahtumakalenterista ja
kirjoittaa assets/data/tapahtumat.json -syötteen.

Selain ei voi hakea lähdettä suoraan (CORS-esto), joten syöte päivitetään
tällä skriptillä. Tuotannossa tämän ajaisi ajastettu taustapalvelu.

    python3 tools/hae-tapahtumat.py            # päivittää syötteen
    python3 tools/hae-tapahtumat.py --nayta    # tulostaa vain, ei kirjoita

Skripti tekee mekaanisen osan: hakee, suodattaa, siivoaa kentät ja
muodostaa lähdelinkit. Tekstit kannattaa lukea läpi ajon jälkeen — osa
kalenterin nimistä on VERSAALILLA ja selosteet ovat järjestäjien omia.
"""

import argparse
import json
import re
import sys
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

API = ("https://tapahtumat.ekarjala.fi/api/collection/"
       "5db067d83799da2f29ee4d1b/content?lang=fi&country=FI&out=JSON")
SIVU = "https://tapahtumat.ekarjala.fi/fi-FI/page/"
LAHDE = "Etelä-Karjalan tapahtumakalenteri"
TZ = ZoneInfo("Europe/Helsinki")

JUURI = Path(__file__).resolve().parent.parent
KOHDE = JUURI / "assets" / "data" / "tapahtumat.json"

# Kalenterissa on myös Savitaipaleen ulkopuolisia ja etätapahtumia. Vaadi
# osoite, joka osuu pitäjään.
PAIKKAKUNNAT = ("savitaipale", "pettilä", "heituinlahti", "välijoki",
                "kuivasensaari", "partakoski", "rahikkala")

# data.js:n omat tapahtumat — ei tuplina syötteeseen (renderöijä yhdistää listat).
OMAT = ("rosvopaisti", "ruispuurojuhla", "sapassi", "maalaismarkkinat",
        "muikkuravit", "kesäravit", "kesäkonsertit", "juhlaviikko",
        "savitaipale open", "luisteluretki")

# globalContentCategories → sivuston kategorianimi (ensimmäinen osuma voittaa).
TAGIT = [
    ("exhibitions", "Näyttely"),
    ("museums", "Näyttely"),
    ("circus", "Show"),
    ("theatre", "Show"),
    ("music", "Musiikki"),
    ("excursions, guided tours", "Ulkoilutapahtuma"),
    ("sports and fitness", "Ulkoilutapahtuma"),
    ("seminars and meetings", "Luento"),
    ("fairs", "Kyläjuhla"),
]

# Nimeen perustuvat tarkennukset menevät tagien edelle.
NIMIOSUMAT = [
    ("joululaulu", "Joulutapahtuma"),
    ("vesiensuoje", "Luontotapahtuma"),
    ("nieriä", "Luontotapahtuma"),
    ("laavu", "Luontotapahtuma"),
    ("itsenäisyyspäiv", "Perinnejuhla"),
    ("lukupiiri", "Lukupiiri"),
    ("satutun", "Lastentapahtuma"),
    ("digiopastu", "Neuvonta"),
    ("info", "Neuvonta"),
    ("kerho", "Kerho"),
    ("kahvila", "Kerho"),
    ("yleisöluento", "Luento"),
]


# Lähteen oma teksti on paikoin vanhentunut tai puuttuu. Nämä korjataan käsin
# id:n perusteella, jotta korjaus säilyy myös seuraavassa ajossa.
KORJAUKSET = {
    "feed-digiopastusta-savitaipaleen-kirjastossa": {
        # lähteen seloste puhuu touko-heinäkuusta, vaikka kaudet ovat syys-joulukuu
        "seloste": "Maksutonta digiopastusta kirjastolla joka toinen torstai.",
    },
    "feed-laavujenyo": {
        "nimi": "Laavujen yö",
        "paikka": "Laavut eri puolilla Savitaipaletta",
        "jarjestaja": "Savitaipaleen Urheilijat, luistelujaosto",
        "seloste": "Luistelujaoston ulkoilmailta laavuilla eri puolilla pitäjää.",
    },
}


def teksti(html):
    """HTML → yksi siisti virke."""
    t = re.sub(r"<[^>]+>", " ", html or "")
    t = (t.replace("&nbsp;", " ").replace("&amp;", "&")
          .replace("&auml;", "ä").replace("&ouml;", "ö").replace("&quot;", '"'))
    t = re.sub(r"\s+", " ", t).strip()
    virkkeet = re.split(r"(?<=[.!?])\s+", t)
    out = virkkeet[0] if virkkeet else ""
    if len(out) > 150 and len(virkkeet) > 1:
        out = out[:147].rstrip() + "…"
    kirjaimet = [c for c in out if c.isalpha()]
    if kirjaimet and all(c.isupper() for c in kirjaimet):
        out = out.capitalize()  # osa selosteista on kirjoitettu VERSAALILLA
    if out and out[-1] not in ".!?…":
        out += "."
    return out


def seloste_valitse(p, nimi):
    """Osalla tapahtumista lyhyt kuvaus on pelkkä otsikko — silloin pitkä kuvaus."""
    lyhyt = teksti(p.get("descriptionShort"))
    avain = lambda t: re.sub(r"[^a-zåäö0-9]", "", t.lower())
    if lyhyt and avain(lyhyt) != avain(nimi) and avain(lyhyt) not in avain(p.get("name") or ""):
        return lyhyt
    return teksti(p.get("descriptionLong")) or lyhyt


def nimi_siisti(nimi):
    nimi = re.sub(r"\s+", " ", (nimi or "").strip())
    # Versaalinimet lauseeksi (kalenterissa osa on kokonaan isoilla)
    kirjaimet = [c for c in nimi if c.isalpha()]
    if kirjaimet and all(c.isupper() for c in kirjaimet):
        nimi = nimi.capitalize()
    nimi = nimi.replace(" - ", " – ")
    # Nimen perään kirjoitetut päivämäärät ja kellonajat pois
    nimi = re.sub(r"\s+(la|su|ma|ti|ke|to|pe)\s+\d{1,2}\.\d{1,2}\.[-\d]*.*$", "", nimi, flags=re.I)
    nimi = re.sub(r"\s*\d{1,2}\.\d{1,2}\.\d{4}\s*$", "", nimi)
    # Sivusto on Savitaipaleen — nimen perässä toistuva paikkakunta on turha
    nimi = re.sub(r"\s+Savitaipale(ella|essa|en|)\s*$", "", nimi, flags=re.I)
    return nimi.strip()


def paikka_siisti(osoite):
    """Osoite → "Paikka, Katu 1". Kalenterissa sama paikka on usein kahdesti
    ("Savitaipaleen kirjasto, Savitaipaleen kunnankirjasto, Keskustie 2")."""
    def ydin(osa):
        t = osa.lower().replace("savitaipaleen", "").replace("kunnan", "")
        return re.sub(r"[^a-zåäö]", "", t)

    osat, ytimet = [], []
    osoite = (osoite or "").replace("(", ",").replace(")", ",")
    for osa in osoite.split(","):
        osa = osa.strip(" ()")
        if not osa or re.match(r"^\d{5}\b", osa):
            continue
        if osa.lower() in ("savitaipale", "suomi", "finland"):
            continue
        y = ydin(osa)
        if y and any(y in v or v in y for v in ytimet):
            continue  # sama paikka toisin sanoin
        ytimet.append(y)
        osat.append(osa)
    return ", ".join(osat[:2]) or "Savitaipale"


def kategoria(nimi, tagit):
    ala = nimi.lower()
    for avain, arvo in NIMIOSUMAT:
        if avain in ala:
            return arvo
    for avain, arvo in TAGIT:
        if avain in tagit:
            return arvo
    return "Yleisötapahtuma"


def pvm(iso, loppuaika=False):
    """UTC-leima → paikallinen päivä. Keskiyöhön päättyvä jakso loppuu
    edellisenä päivänä (kalenteri merkitsee sen seuraavan päivän 00:00:ksi)."""
    if not iso:
        return None
    d = datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(TZ)
    if loppuaika and d.hour == 0 and d.minute == 0:
        return (d - timedelta(days=1)).date()
    return d.date()


def slug(nimi):
    s = (nimi.lower()
         .replace("ä", "a").replace("ö", "o").replace("å", "a"))
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return "feed-" + "-".join(s.split("-")[:4])


def hae():
    pyynto = urllib.request.Request(API, headers={"User-Agent": "visitsavi-tapahtumahaku/1.0"})
    with urllib.request.urlopen(pyynto, timeout=30) as r:
        return json.load(r)


def muunna(sivut, tanaan):
    ulos = []
    for p in sivut:
        if p.get("pageType") != "event":
            continue
        ev = p.get("event") or {}
        alku = pvm(ev.get("start") or p.get("defaultStartDate"))
        loppu = pvm(ev.get("end") or p.get("defaultEndDate"), loppuaika=True) or alku
        if not alku or (loppu or alku) < tanaan:
            continue

        osoitteet = [(l.get("address") or "") for l in (p.get("locations") or [])]
        osoite = next((a for a in osoitteet if a), "")
        if not any(k in osoite.lower() for k in PAIKKAKUNNAT):
            continue  # etätapahtuma tai muu kunta

        nimi = nimi_siisti(p.get("name"))
        if any(o in nimi.lower() for o in OMAT):
            continue  # on jo data.js:ssä

        ulos.append({
            "id": slug(nimi),
            "nimi": nimi,
            "alku": alku.isoformat(),
            "loppu": (loppu or alku).isoformat(),
            "paikka": paikka_siisti(osoite),
            "jarjestaja": (p.get("ownerName") or "").strip(),
            "kategoria": kategoria(nimi, p.get("globalContentCategories") or []),
            "seloste": seloste_valitse(p, nimi),
            # toistuva = vuosittain palaava (renderöijä näyttää "vuosittainen").
            # Lähde ei kerro vuosittaisuutta, joten se jää data.js:n omille tapahtumille.
            "toistuva": False,
            "lahde": LAHDE,
            "lahdeUrl": SIVU + p["_id"] + "/" + urllib.parse.quote(p.get("name") or nimi),
        })

    for e in ulos:
        e.update(KORJAUKSET.get(e["id"], {}))
    ulos.sort(key=lambda e: (e["alku"], e["nimi"]))
    return ulos


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--nayta", action="store_true", help="tulosta, älä kirjoita")
    args = ap.parse_args()

    data = hae()
    sivut = data.get("pages") or []
    tapahtumat = muunna(sivut, date.today())
    print("Kalenterissa %d sivua → %d Savitaipaleen tulevaa tapahtumaa"
          % (len(sivut), len(tapahtumat)), file=sys.stderr)
    for e in tapahtumat:
        print("  %s–%s  %-12s %s" % (e["alku"], e["loppu"], e["kategoria"], e["nimi"]), file=sys.stderr)

    teksti_out = json.dumps(tapahtumat, ensure_ascii=False, indent=2) + "\n"
    if args.nayta:
        print(teksti_out)
    else:
        KOHDE.write_text(teksti_out, encoding="utf-8")
        print("Kirjoitettu %s" % KOHDE.relative_to(JUURI), file=sys.stderr)


if __name__ == "__main__":
    main()
