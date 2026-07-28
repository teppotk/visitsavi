/*
 * Visit Savitaipale — sisältödata (prototyyppi)
 * Ladataan <script>-tagilla, jotta sivusto toimii myös file:// -osoitteesta ilman palvelinta.
 * Kaikki kentät perustuvat /sisalto-kansion tietorakenteeseen ja lähdemateriaaliin.
 * Hinnat, aukioloajat ja päivämäärät ovat suuntaa-antavia — tarkistettava ennen julkaisua.
 */
window.SAVITAIPALE = (function () {
  "use strict";

  const brand = {
    nimi: "Visit Savitaipale",
    tunnuslause: "Kahden veden maa",
    kuvaus:
      "Savitaipale on eteläkarjalainen järvipitäjä kahden veden, Saimaan ja kirkkaan Kuolimon, välissä. " +
      "Jääkauden muovaamat harjut, UNESCO Geoparkin kalliot, historiallinen linnoitus ja talven retkiluistelu tekevät siitä hiljaisen mutta rikkaan matkakohteen."
  };

  // Osioiden esittelyt (listaussivujen johdannot)
  const osiot = {
    "nae-ja-koe": {
      nimi: "Näe & koe",
      alaotsikko: "Nähtävyydet, museot ja kulttuuriperintö",
      johdanto:
        "Kärnäkosken 1700-luvun linnoitus, graniittikirkko, kirkonrakentajien perintö ja pihapiirien pienet museot. Savitaipaleen tarina kulkee sotahistoriasta kansanrunouden kerääjiin."
    },
    luonto: {
      nimi: "Luonto & retkeily",
      alaotsikko: "Reitit, harjut ja Saimaa Geoparkin geokohteet",
      johdanto:
        "Kaksi järveä, jyrkät harjut ja kalliot, jotka vievät ajassa lähes kaksi miljardia vuotta taaksepäin. Reitit vievät jyrkänteille, muinaisrannoille ja koskien äärelle."
    },
    tekemista: {
      nimi: "Tekemistä",
      alaotsikko: "Aktiviteetit ympäri vuoden",
      johdanto:
        "Kesällä melontaa, kalastusta ja kartanon elämyksiä. Talvella Savitaipaleen erikoisuus: retkiluistelu kirkasvetisen Kuolimon jäällä ja valaistut ladut."
    },
    majoitus: {
      nimi: "Majoitus & ruoka",
      alaotsikko: "Kartano, mökit, leirintä ja lähiruoka",
      johdanto:
        "Yövy historiallisessa kartanossa järven rannalla, talviasuttavassa hirsimökissä tai caravan-alueella. Ruokapöydässä maistuu lähiruoka ja perinteinen papurokka."
    },
    tapahtumat: {
      nimi: "Tapahtumat",
      alaotsikko: "Kesäviikot, kyläjuhlat ja konsertit",
      johdanto:
        "Heinäkuun Sapassi-viikko täyttää pitäjän musiikilla ja markkinoilla. Kyläjuhlat, ravit, kartanokonsertit ja kansainvälinen tennisturnaus rytmittävät vuotta."
    }
  };

  // teema = SVG-maisemateema (scenes.js). koord vain vahvistetuille kohteille.
  const kohteet = [
    /* ---------------- NÄE & KOE ---------------- */
    {
      id: "karnakosken-linnoitus",
      osio: "nae-ja-koe",
      tyyppi: "Nähtävyys",
      nimi: "Kärnäkosken linnoitus",
      teema: "linnoitus",
      geopark: true,
      karki: true,
      kyla: "Partakoski",
      koord: { lat: 61.26163, lng: 27.71185 },
      seloste:
        "Yli 200 vuotta vanha bastionilinnoitus Saimaan ja Kuolimon välisellä kannaksella — Savitaipaleen päänähtävyys.",
      kuvaus: [
        "Kenraali Aleksandr Suvorov rakennutti Kärnäkosken linnoituksen vuonna 1793 osana Venäjän linnoitusketjua Ruotsia vastaan ja Pietarin puolustusta. Kiveä ei louhittu erikseen: linnoituksen lohkareet kerättiin lähimaastosta, ja osa niistä on jäätikön kuljettamia kilometrien päästä.",
        "Alueella on 1800-luvun jauho- ja sahamylly, vanha lotjasatama ja polku Vuorilinnoitukselle, jonka laavulta avautuu Saimaan maisema. Kesäisin lampaat laiduntavat linnoitusaluetta — siksi koirat eivät ole tervetulleita.",
        "Kärnäkoski on valtakunnallisesti merkittävä rakennettu kulttuuriympäristö (RKY) ja Saimaa UNESCO Global Geoparkin geokohde. Noin kilometrin päässä Partakoskella on venesatama sekä kesäkauppa ja -ravintola."
      ],
      kategoriat: ["Kulttuuriperintö", "Historia"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [
        { label: "Osoite", arvo: "Partakoskentie 846, 54800 Savitaipale" },
        { label: "Pääsymaksu", arvo: "Maksuton" },
        { label: "Palvelut", arvo: "Laavu, nuotiopaikka, kuivakäymälä, pysäköinti, veneen huoltopaikka" },
        { label: "Aukiolo", arvo: "Alue avoinna ympäri vuoden" }
      ]
    },
    {
      id: "savitaipaleen-kirkko",
      osio: "nae-ja-koe",
      tyyppi: "Nähtävyys",
      nimi: "Savitaipaleen kirkko",
      teema: "kirkko",
      geopark: true,
      kyla: "kirkonkylä",
      seloste:
        "Vuosina 1921–1924 rakennettu graniittikirkko, joka toimi talvisodan aikana Viipurin hiippakunnan tuomiokirkkona.",
      kuvaus: [
        "Arkkitehti Josef Stenbäckin suunnittelema kirkko rakennettiin paikallisesta graniitista, joka louhittiin Kaskeinkylän Viuhonvuoresta noin viiden kilometrin päästä. Kirkossa on noin 700 istumapaikkaa.",
        "Talvisodan aikana kirkko toimi tuomiokirkkona, kun Viipurin hiippakunnan tuomiokapituli oli evakossa Savitaipaleen pappilassa. Kirkko vietti 100-vuotisjuhliaan vuonna 2024.",
        "Kirkonkylä sijaitsee Salpausselän harjulla, ja sitä ympäröi Saimaa Geoparkin suppamaasto: sulavien jäälohkareiden jättämiä painanteita kuten Paakkolampi ja Mustalampi."
      ],
      kategoriat: ["Kirkot", "Kulttuuriperintö"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Valmistui", arvo: "1924, arkkitehti Josef Stenbäck" },
        { label: "Sijainti", arvo: "Kirkonkylä, Kuolimon rannalla" }
      ]
    },
    {
      id: "rahikkalan-tuulimylly",
      osio: "nae-ja-koe",
      tyyppi: "Nähtävyys",
      nimi: "Rahikkalan tuulimylly",
      teema: "mylly",
      geopark: true,
      kyla: "Rahikkala",
      seloste:
        "Vuonna 1804 rakennettu varvasmylly, joka kääntyy yhä tuulen mukaan harjumaisemassa.",
      kuvaus: [
        "Rahikkalan varvas- eli jalkamylly rakennettiin vuonna 1804, ja kyläläiset kunnostivat sen alkuperäiskuntoon vuonna 2002. Myllyä ympäröivät 1900-luvun alun kiviaidat.",
        "Lähistöllä on muistomerkki kylässä 1750–1850 asuneille kirkonrakentajille. Mylly on Saimaa Geoparkin kohde, ja sitä ympäröi kapea, muinaisrantojen ja suppalampien täplittämä harju."
      ],
      kategoriat: ["Kulttuuriperintö", "Historia"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Osoite", arvo: "Suomalansaarentie 71, 54950 Pettilä" },
        { label: "Rakennettu", arvo: "1804, kunnostettu 2002" }
      ]
    },
    {
      id: "hakamaen-museoalue",
      osio: "nae-ja-koe",
      tyyppi: "Museo",
      nimi: "Hakamäen museoalue",
      teema: "museo",
      kyla: "kirkonkylä",
      seloste:
        "Kotiseutumuseo Kuolimon rantatörmällä — tupa, aitta, savusauna, tuulimylly ja 14 metrin näkötorni.",
      kuvaus: [
        "Hakamäen museoalue esittelee alueen kansanperinnettä rakennuksina, käyttöesineinä ja tekstiileinä. Alueella on päärakennus, aitta, tuulimylly, ruotusotamiehen torppa, savusauna, riihi sekä vuonna 2008 valmistunut 14-metrinen näkötorni.",
        "Esiintymislava katsomoineen tuo museoalueelle kesätapahtumia, kuten Hakamäki Piknik -musiikkitapahtuman. Aluetta ylläpitää Savitaipaleen Kotiseutuyhdistys."
      ],
      kategoriat: ["Museot", "Kulttuuriperintö"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Aukiolo", arvo: "Kesäkuun puolivälistä elokuun alkuun, ti–su klo 12–17" },
        { label: "Ylläpito", arvo: "Savitaipaleen Kotiseutuyhdistys" },
        { label: "Puhelin", arvo: "0400 665 615" }
      ]
    },
    {
      id: "europaeus-museo",
      osio: "nae-ja-koe",
      tyyppi: "Museo",
      nimi: "Europaeus-museo",
      teema: "museo",
      kyla: "kirkonkylä",
      seloste:
        "Kansanrunouden kerääjän, kielitieteilijän ja arkeologin D. E. Europaeuksen (1820–1884) elämä ja työ.",
      kuvaus: [
        "Museo sijaitsee Olkkolan Hovin pihapiirissä entisessä palvelusväen rakennuksessa. Se kunnioittaa savitaipalelaista D. E. Europaeusta, joka keräsi kansanrunoutta Elias Lönnrotin aikalaisena ja työtoverina ja toimi myös kielitieteilijänä ja arkeologina.",
        "Esillä on Europaeuksen työhuone, harvinaisia kirjoja, valokuvia ja arkeologisia esineitä sekä Savitaipaleen ja Olkkolan Hovin historiaa. Museo on avoinna tilauksesta; ylläpitäjänä Europaeus-seura."
      ],
      kategoriat: ["Museot", "Historia"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Osoite", arvo: "Olkkolantie 2, 54800 Savitaipale" },
        { label: "Aukiolo", arvo: "Tilauksesta" },
        { label: "Puhelin", arvo: "0400 665 615" }
      ]
    },
    {
      id: "kirkonrakentajien-museo",
      osio: "nae-ja-koe",
      tyyppi: "Museo",
      nimi: "Kirkonrakentajien museo",
      teema: "museo",
      kyla: "kirkonkylä",
      seloste:
        "Savitaipaleen vuoden 1779 kellotapulissa: tarina pitäjän kuuluista kaksoisristikirkkojen rakentajista.",
      kuvaus: [
        "Museo kertoo savitaipalelaisista kirkonrakentajista Juhana ja Matti Salosesta sekä Taavetti Rahikaisesta, jotka olivat tunnettuja 'kahtamoisten' eli kaksoisristikirkkojen rakentajia 1700- ja 1800-luvuilla.",
        "Museo toimii vuonna 1779 rakennetussa kellotapulissa, ja esillä on myös esineistöä Savitaipaleen aiemmista kirkoista."
      ],
      kategoriat: ["Museot", "Kulttuuriperintö"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Osoite", arvo: "Nikkarintie 2, kellotapuli" },
        { label: "Aukiolo", arvo: "Su klo 11–14 (kesä), muulloin tilauksesta" },
        { label: "Pääsymaksu", arvo: "Vapaaehtoinen" }
      ]
    },
    {
      id: "savitaipaleen-kasityoasema",
      osio: "nae-ja-koe",
      tyyppi: "Kulttuurikohde",
      nimi: "Savitaipaleen Käsityöasema",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Näyttelyitä, kursseja ja kudontamahdollisuuksia — elävää käsityöperinnettä.",
      kuvaus: [
        "Käsityöasemalla järjestetään näyttelyitä, kursseja ja tapahtumia, ja siellä pääsee myös itse kutomaan. Se on osa Savitaipaleen elävää kädentaitojen perinnettä."
      ],
      kategoriat: ["Kulttuuriperintö"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [{ label: "Osoite", arvo: "Kievarintie 1" }]
    },

    /* ---------------- LUONTO & RETKEILY ---------------- */
    {
      id: "orrainpolku",
      osio: "luonto",
      tyyppi: "Retkeilyreitti",
      nimi: "Orrainpolku",
      teema: "harju",
      geopark: true,
      karki: true,
      kyla: "Partakoski",
      seloste:
        "Vaativa noin 10 kilometrin geologinen kiertoreitti Saimaan ja Kuolimon kannaksella.",
      kuvaus: [
        "Orrainpolku kiertää erämaisena Kuolimon ja Saimaan välisellä kannaksella. Reitin varrella on kaksi laavua ja haastavia nousuja, joista näyttävin vie Luotolahdenvuorelle, missä kallioseinämä nousee suoraan vedestä lähes 45 metrin korkeuteen.",
        "Reitti on parhaimmillaan lumettomaan aikaan. Se on samalla vaativa maastopyöräreitti, joka kiertää Luotolahden mäen luonnonsuojelualueen."
      ],
      kategoriat: ["Retkeilyreitit", "Geokohteet"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [
        { label: "Pituus", arvo: "n. 10 km" },
        { label: "Kesto", arvo: "n. 3 h" },
        { label: "Vaativuus", arvo: "Vaativa" },
        { label: "Varusteet reitillä", arvo: "2 laavua" }
      ]
    },
    {
      id: "luotolahdenvuori",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Luotolahdenvuoren jyrkänteet",
      teema: "harju",
      geopark: true,
      kyla: "Partakoski",
      koord: { lat: 61.297667, lng: 27.611807 },
      seloste:
        "Kallioseinämät nousevat vedestä jopa 45 metriä — kivi on lähes 1,9 miljardia vuotta vanhaa.",
      kuvaus: [
        "Massiiviset, paikoin jyrkät kallioseinämät kohoavat suoraan vedestä jopa 45 metrin korkeuteen Kuolimon Luotolahden ja Saimaan välisellä kannaksella. Kivilaji on granodioriittia, joka kiteytyi magmasta noin 1,89–1,87 miljardia vuotta sitten muinaisen vuorijonon poimutuksessa.",
        "Näköalapaikka on osa Orrainpolun kiertoreittiä; paikkaa kutsutaan paikallisesti Orraiksi."
      ],
      kategoriat: ["Geokohteet", "Näköalapaikat"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [
        { label: "Korkeus", arvo: "jopa 45 m vedenpinnasta" },
        { label: "Kivilaji", arvo: "granodioriitti (~1,88 mrd v)" },
        { label: "Saavutettavuus", arvo: "Orrainpolun varrella" }
      ]
    },
    {
      id: "suomensalon-harju",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Suomensalon harjumaasto",
      teema: "saari",
      geopark: true,
      kyla: "Suomensalo",
      koord: { lat: 61.240527, lng: 27.567465 },
      seloste:
        "Vain vesitse saavutettava harjusaari, jonka lakikorkeus 106 m avaa näkymät Kuolimolle.",
      kuvaus: [
        "Suomensalon pohjoisosaan pääsee vain veneellä tai kanootilla. Rantautumispaikalla on laavu, polttopuut ja käymälä.",
        "Maasto muodostui noin 11 600 vuotta sitten jäätikön vetäydyttyä ja muovautui Etelä-Saimaan jääjärvivaiheessa. Näkyvillä on jyrkkiä rantatörmiä, jäiden puskemia rantapalteita ja suppalampi. Korkein kohta on 106 metriä, ja sieltä avautuvat näkymät Kuolimolle."
      ],
      kategoriat: ["Geokohteet", "Näköalapaikat"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Saavutettavuus", arvo: "Vain vesitse (vene / kanootti)" },
        { label: "Palvelut", arvo: "Laavu, polttopuut, käymälä" },
        { label: "Korkein kohta", arvo: "106 m" }
      ]
    },
    {
      id: "partakoski",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Partakoski",
      teema: "koski",
      geopark: true,
      kyla: "Partakoski",
      seloste:
        "Lähes kilometrin koskireitti ja järvitaimenen ainoa kutupaikka eteläisellä Saimaalla.",
      kuvaus: [
        "Partakoski yhdistää Kuolimon Saimaaseen kapealla kannaksella noin yhdeksän kilometrin päässä kirkonkylästä. Lähes kilometrin pituinen koskireitti muodostuu kolmesta vuolaasta osuudesta: Ahvenkoskesta, Saunakoskesta ja Siikakoskesta.",
        "Partakoski on järvitaimenen ainoa kutupaikka eteläisen Saimaan alueella. Kylä mainitaan asiakirjoissa jo 1750-luvulla, ja graniittinen kivisilta valmistui 1902. Vanha kylämiljöö on säilynyt."
      ],
      kategoriat: ["Geokohteet", "Vesistöt"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [
        { label: "Sijainti", arvo: "n. 9 km kirkonkylästä" },
        { label: "Erityispiirre", arvo: "Järvitaimenen kutupaikka" }
      ]
    },
    {
      id: "lepankannon-harju",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Lepänkannon harjumaasto",
      teema: "jarvi",
      geopark: true,
      kyla: "kirkonkylä",
      seloste:
        "Kuolimon rannalla: pitkä hiekkaranta ja luontopolku jääkauden jäljille.",
      kuvaus: [
        "Lepänkannon virkistysalue Kuolimon rannalla yhdistää jääkauden geologian ja kivikauden asutuksen. Aluetta täplittävät suppakuopat, korkeat harjuselänteet ja rantavallit.",
        "Alueella on merkitty luontopolku 'Jääkauden jäljet – kivikauden ihminen' sekä pitkä, loivasti syvenevä hiekkaranta kirkasvetisen Kuolimon äärellä. Aluetta hoitaa Etelä-Karjalan virkistysaluesäätiö."
      ],
      kategoriat: ["Geokohteet", "Uimarannat"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Osoite", arvo: "Myllylammentie 300, 54800 Savitaipale" },
        { label: "Palvelut", arvo: "Luontopolku, hiekkaranta, opaste" }
      ]
    },
    {
      id: "keskustan-suppamaasto",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Keskustan suppamaasto",
      teema: "metsa",
      geopark: true,
      kyla: "kirkonkylä",
      koord: { lat: 61.199612, lng: 27.686227 },
      seloste:
        "Jääkauden painanteita aivan kirkonkylässä — kettleholet ja rapakivikirkko.",
      kuvaus: [
        "Savitaipaleen keskusta rakentuu suppamaastoon: sulamisvedet kerrostuivat hautautuneiden jäälohkareiden ympärille ja jättivät maastoon painanteita, kuten Paakkolammen ja Mustalammen.",
        "Kirkko on rakennettu läheisestä Lavikanlahdesta louhitusta rapakivigraniitista. Opasteet löytyvät torilta ja kirkolta."
      ],
      kategoriat: ["Geokohteet"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [{ label: "Opasteet", arvo: "Tori ja kirkko" }]
    },
    {
      id: "mtb-reitti",
      osio: "luonto",
      tyyppi: "Maastopyöräreitti",
      nimi: "Savitaipaleen MTB-reitti",
      teema: "metsa",
      kyla: "kirkonkylä",
      seloste:
        "28 kilometriä maastopyöräilyä kahtena lenkkinä — helposta keskivaikeaan.",
      kuvaus: [
        "Reitti koostuu kahdesta lenkistä: helposta Hullasmäen lenkistä (10 km) ja keskivaikeasta Rovastinojan lenkistä (18 km). Hullasmäen lenkki on monikäyttöreitti kävelyyn ja hiihtoon, joten pyöräily on siellä kielletty lumiseen aikaan."
      ],
      kategoriat: ["Retkeilyreitit"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [
        { label: "Pituus", arvo: "28 km (~3 h)" },
        { label: "Vaativuus", arvo: "Helppo–keskivaikea" }
      ]
    },
    {
      id: "saariston-pyoraily",
      osio: "luonto",
      tyyppi: "Pyöräreitti",
      nimi: "Saimaan saaristoreitti",
      teema: "jarvi",
      kyla: "kirkonkylä",
      seloste:
        "Osa seudullista saaristoreittiä: maalaismaisemia, taukopaikkoja ja historiaa Saimaan varrella.",
      kuvaus: [
        "Savitaipaleen pyöräilyreitti on ollut osa Saimaan saaristoreittiä kesästä 2021. Reitti kulkee karjalaisessa maalaismaisemassa osin asfaltti- ja osin hiekkateillä, ja sen varrella on taukopaikkoja ja historiallisia kohteita."
      ],
      kategoriat: ["Retkeilyreitit"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Verkosto", arvo: "Saimaan saaristoreitti" }]
    },
    {
      id: "lehtisensaari",
      osio: "luonto",
      tyyppi: "Luontokohde",
      nimi: "Lehtisensaari",
      teema: "saari",
      kyla: "kirkonkylä",
      seloste:
        "Kuolimon saari, jonka suojeltu sekametsä ja Tanelinvuori ovat luonnonsuojelullisesti arvokkaita.",
      kuvaus: [
        "Lehtisensaaren itäosassa on lakisääteisesti suojeltu, lähes luonnontilainen sekametsä, jossa kasvaa mäntyä, koivua, kuusta, haapaa ja leppää. Tanelinvuori on maisemallisesti ja luonnonsuojelullisesti arvokas kallioalue.",
        "Saarella sijaitsee hyvin hoidettu Ristniemen perinnetila."
      ],
      kategoriat: ["Luontokohteet"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Sijainti", arvo: "Saari Kuolimossa" }]
    },

    /* ---------------- TEKEMISTÄ ---------------- */
    {
      id: "retkiluistelu",
      osio: "tekemista",
      tyyppi: "Talviaktiviteetti",
      nimi: "Retkiluistelu Kuolimolla",
      teema: "talvi",
      karki: true,
      kyla: "kirkonkylä",
      seloste:
        "Savitaipaleen talvierikoisuus: luistelu kirkasvetisen Kuolimon peilijäällä.",
      kuvaus: [
        "Kuolimo on poikkeuksellisen kirkasvetinen järvi, ja sen jää tarjoaa talvella ainutlaatuisen retkiluistelukokemuksen. Parhaimmillaan jään läpi näkee syvälle veteen.",
        "Helmikuussa järjestetään vuosittainen luisteluretkitapahtuma. Jäälle lähdettäessä on aina varmistettava jään kantavuus ja turvallisuus."
      ],
      kategoriat: ["Talviaktiviteetit"],
      vuodenajat: ["talvi"],
      tiedot: [{ label: "Kausi", arvo: "Talvi, jääolosuhteiden mukaan" }]
    },
    {
      id: "kuolimon-luistelurata",
      osio: "tekemista",
      tyyppi: "Talviaktiviteetti",
      nimi: "Kuolimon luistelurata",
      teema: "talvi",
      kyla: "kirkonkylä",
      seloste:
        "Hoidettu luistelu- ja kävelyrata Pappilanlahdella, jatkuu Lepänkantoon nuotiopaikalle.",
      kuvaus: [
        "Pappilanlahden luistelurata on vapaassa käytössä luisteluun, potkukelkkailuun ja kävelyyn. Lenkin pituus on noin 2,5 kilometriä, ja rata jatkuu 3,5 kilometrin päähän Lepänkantoon, missä on nuotiopaikka.",
        "Välinevuokrausta ja huoltoa saa Savitaipaleen Urheilijoilta."
      ],
      kategoriat: ["Talviaktiviteetit"],
      vuodenajat: ["talvi"],
      tiedot: [
        { label: "Pituus", arvo: "2,5 km lenkki / 3,5 km Lepänkantoon" },
        { label: "Palvelut", arvo: "Välinevuokraus (StU)" }
      ]
    },
    {
      id: "hiihtoladut",
      osio: "tekemista",
      tyyppi: "Talviaktiviteetti",
      nimi: "Valaistut hiihtoladut",
      teema: "talvi",
      kyla: "kirkonkylä",
      seloste:
        "Kirkonkylän valaistu latuverkosto talven hiihtoretkille.",
      kuvaus: [
        "Kirkonkylässä on noin kolmen kilometrin valaistu latu. Talvikaudella hoidetaan lisäksi murske- ja latureittejä hiihtoon ja talviretkeilyyn."
      ],
      kategoriat: ["Talviaktiviteetit"],
      vuodenajat: ["talvi"],
      tiedot: [{ label: "Valaistu latu", arvo: "n. 3 km" }]
    },
    {
      id: "melonta-sup",
      osio: "tekemista",
      tyyppi: "Vesiaktiviteetti",
      nimi: "Melonta ja SUP",
      teema: "jarvi",
      kyla: "kirkonkylä",
      seloste:
        "Kaksi järveä, kapeat salmet ja rauhalliset rannat tekevät melonnasta helppoa ja kaunista.",
      kuvaus: [
        "Saimaa ja Kuolimo tarjoavat suojaisia melontareittejä salmineen ja saarineen. Suomensalon kaltaiset kohteet ovat parhaiten saavutettavissa juuri kanootilla tai kajakilla.",
        "Kanootteja, SUP-lautoja ja veneitä voi vuokrata mm. Olkkolan Hovilta ja Saimaan Paljulta."
      ],
      kategoriat: ["Vesiaktiviteetit"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Vuokraus", arvo: "Olkkolan Hovi, Saimaan Palju" }]
    },
    {
      id: "kalastus",
      osio: "tekemista",
      tyyppi: "Aktiviteetti",
      nimi: "Kalastus",
      teema: "jarvi",
      kyla: "kirkonkylä",
      seloste:
        "167 järveä ja kirkasvetinen Kuolimo — kalavesiä riittää nieriästä taimeneen.",
      kuvaus: [
        "Savitaipaleen alueella on 167 järveä, ja kunnan vaakunakala on nieriä. Kuolimossa elää jääkauden reliktilaji isonieriä, ja Partakoski on järvitaimenen kutupaikka.",
        "Muista kalastuksen luvat ja rauhoitusalueet ennen vesille lähtöä."
      ],
      kategoriat: ["Aktiviteetit"],
      vuodenajat: ["kesä", "talvi"],
      tiedot: [{ label: "Vesistöt", arvo: "Saimaa, Kuolimo ym." }]
    },
    {
      id: "escape-room",
      osio: "tekemista",
      tyyppi: "Elämys",
      nimi: "Pakohuoneet (Olkkolan Hovi)",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Kaksi pakohuonetta kartanon miljöössä: 'Viikinkien aarre' ja 'Professorin salaisuus'.",
      kuvaus: [
        "Olkkolan Hovin kaksi pakohuonetta sopivat 2–6 hengen ryhmille. Peliaika on 60 minuuttia, ja alkuun kuuluu 15 minuutin briiffaus.",
        "Pakohuoneet toimivat hyvin ryhmien tyky- ja juhlaohjelmana."
      ],
      kategoriat: ["Aktiviteetit"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Ryhmä", arvo: "2–6 hlö" },
        { label: "Kesto", arvo: "60 min + briiffaus" }
      ]
    },
    {
      id: "padel",
      osio: "tekemista",
      tyyppi: "Aktiviteetti",
      nimi: "Padel ja minigolf",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Olkkolan Hovin ulkopadel ja 12-väyläinen minigolf koko perheelle.",
      kuvaus: [
        "Olkkolan Hovilla on ulkopadel-kenttä sekä 12-väyläinen minigolf. Padelin hinta on 6–8 €/hlö kellonajasta riippuen ja minigolf 5 €/hlö.",
        "Samasta pihapiiristä löytyy myös ammunta- ja metsästyssimulaattori sekä vesivälineiden vuokraus."
      ],
      kategoriat: ["Aktiviteetit"],
      vuodenajat: ["kesä"],
      tiedot: [
        { label: "Padel", arvo: "6–8 €/hlö" },
        { label: "Minigolf", arvo: "5 €/hlö, 12 väylää" }
      ]
    },
    {
      id: "ammuntasimulaattori",
      osio: "tekemista",
      tyyppi: "Elämys",
      nimi: "Ammuntasimulaattori",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Simway-metsästyssimulaattori ryhmille Olkkolan Hovilla.",
      kuvaus: [
        "Ammunta- ja metsästyssimulaattori sopii ryhmien ohjelmaksi. Hinta on 20–35 €/hlö ryhmän koon mukaan, ja ryhmäopastus on saatavilla."
      ],
      kategoriat: ["Aktiviteetit"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [{ label: "Hinta", arvo: "20–35 €/hlö" }]
    },
    {
      id: "saimaan-palju",
      osio: "tekemista",
      tyyppi: "Ohjelmapalvelu",
      nimi: "Saimaan Palju",
      teema: "jarvi",
      kyla: "Partakoski",
      seloste:
        "Paljuja, saunalauttaristeilyt ja välinevuokrausta — noutopiste Olkkolan Hovilla.",
      kuvaus: [
        "Saimaan Palju on ohjelmapalvelu- ja välinevuokrausyritys, jonka noutopiste sijaitsee Savitaipaleella Olkkolan Hovilla. Tarjolla on siirrettäviä paljuja, saunalautta- ja paljuristeilyjä sekä ryhmäohjelmia.",
        "Vuokrattavana on myös sähköfatbikeja, lumikenkiä, puutelttoja, veneitä ja pyöriä. Yritys järjestää lisäksi opastettuja melonta- ja pyöräsafareita."
      ],
      kategoriat: ["Aktiviteetit", "Vesiaktiviteetit"],
      vuodenajat: ["kesä", "talvi"],
      tiedot: [
        { label: "Noutopiste", arvo: "Olkkolan Hovi, Savitaipale" },
        { label: "Puhelin", arvo: "040 5880 738" },
        { label: "Sähköposti", arvo: "teemu@saimaanpalju.fi" }
      ]
    },
    {
      id: "fatbike-safari",
      osio: "tekemista",
      tyyppi: "Elämys",
      nimi: "Sähköfatbike-safari",
      teema: "metsa",
      kyla: "kirkonkylä",
      seloste:
        "Ohjattu maastopyöräretki sähköavusteisilla fatbikeilla harjumaisemissa.",
      kuvaus: [
        "Sähköfatbike-safari vie harjujen ja metsäpolkujen maisemiin sähköavusteisilla maastopyörillä. Safari toteutetaan Olkkolan Hovin ja Saimaan Paljun yhteistyönä."
      ],
      kategoriat: ["Aktiviteetit"],
      vuodenajat: ["kesä", "syksy"],
      tiedot: [{ label: "Varaus", arvo: "Saimaan Palju / Olkkolan Hovi" }]
    },

    /* ---------------- MAJOITUS & RUOKA ---------------- */
    {
      id: "olkkolan-hovi",
      osio: "majoitus",
      tyyppi: "Hotelli",
      nimi: "Olkkolan Hovi",
      teema: "kyla",
      karki: true,
      kyla: "kirkonkylä",
      seloste:
        "Vuoden 1906 historiallinen kartano Kuolimon rannalla: hotelli, ravintola, saunat ja aktiviteetit saman katon alla.",
      kuvaus: [
        "Olkkolan Hovi on vuonna 1906 rakennettu kartano Kuolimon rannalla, Lappeenrannan ja Mikkelin välissä. Hotellissa on 18 tilavaa huonetta, joista kahdessa sviitissä on oma sauna.",
        "Kartano yhdistää majoituksen, ravintolan, juhla- ja kokoustilat, kolme rantasaunaa sekä runsaan aktiviteettitarjonnan. Vuonna 2022 valmistui caravan- ja leirintäalue uimarantoineen.",
        "Pihapiirissä toimii myös Europaeus-museo. Kartano on Savitaipaleen matkailun kärkikohde ja tapahtumapaikka."
      ],
      kategoriat: ["Hotellit", "Leirintä ja caravan"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Osoite", arvo: "Olkkolantie 2, 54800 Savitaipale" },
        { label: "Majoitus", arvo: "Hotelli 18 huonetta + caravan-alue" },
        { label: "Puhelin", arvo: "050 5555 862" },
        { label: "Sähköposti", arvo: "info@olkkolanhovi.fi" },
        { label: "Verkkosivu", arvo: "olkkolanhovi.fi" }
      ]
    },
    {
      id: "saalastin-lomamokit",
      osio: "majoitus",
      tyyppi: "Mökit",
      nimi: "Saalastin Lomamökit",
      teema: "metsa",
      kyla: "kirkonkylä",
      seloste:
        "Talviasuttavat hirsimökit omine rantoineen ja saunoineen Lahnaveden äärellä.",
      kuvaus: [
        "Saalastin Lomamökit ovat ympärivuotisesti vuokrattavia hirsimökkejä, joissa on omat rannat ja saunat. Mökit sijaitsevat lähellä Lahnavettä."
      ],
      kategoriat: ["Mökit ja lomahuoneistot"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Osoite", arvo: "Survajantie 51, 54800 Savitaipale" },
        { label: "Puhelin", arvo: "040 703 6397" },
        { label: "Verkkosivu", arvo: "saalasti.net" }
      ]
    },
    {
      id: "karhunrinteen-loma",
      osio: "majoitus",
      tyyppi: "Mökit",
      nimi: "Karhunrinteen Loma",
      teema: "metsa",
      kyla: "kirkonkylä",
      seloste:
        "Yli 50 vuotta toiminut mökki- ja juhlatalokohde: mökkejä, saunoja ja juhlatilat.",
      kuvaus: [
        "Karhunrinteen Loma on toiminut Savitaipaleella yli 50 vuotta. Tarjolla on mökkejä, huoneistoja ja saunoja, mukaan lukien ranta- ja savusauna, sekä juhla- ja kokoustilat noin 160 hengelle."
      ],
      kategoriat: ["Mökit ja lomahuoneistot"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [{ label: "Juhlatila", arvo: "n. 160 hengelle" }]
    },
    {
      id: "caravan-alue",
      osio: "majoitus",
      tyyppi: "Leirintä",
      nimi: "Savitaipaleen Caravan-alue",
      teema: "jarvi",
      kyla: "kirkonkylä",
      seloste:
        "Caravan- ja leirintäpaikkoja järvimaisemassa Lappeenrannan ja Mikkelin välillä.",
      kuvaus: [
        "Olkkolan Hovin yhteydessä vuonna 2022 valmistunut caravan- ja leirintäalue sijaitsee järvimaisemassa uimarantojen ja retkeilypolkujen äärellä."
      ],
      kategoriat: ["Leirintä ja caravan"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Sijainti", arvo: "Olkkolan Hovi, Kuolimon ranta" }]
    },
    {
      id: "wanha-havon-koulu",
      osio: "majoitus",
      tyyppi: "Muu majoitus",
      nimi: "Wanha Havon koulu",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Edullista ryhmämajoitusta viehättävässä entisessä kyläkoulussa.",
      kuvaus: [
        "Wanha Havon koulu tarjoaa edullista majoitusta entisessä koulurakennuksessa. Se sopii erityisesti ryhmille."
      ],
      kategoriat: ["Muu majoitus"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [{ label: "Tyyppi", arvo: "Ryhmämajoitus" }]
    },
    {
      id: "olkkolan-ravintola",
      osio: "majoitus",
      tyyppi: "Ravintola",
      nimi: "Ravintola Olkkolan Hovi",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Lähiruokaa 'kartanotwistillä' — lounasbuffet, à la carte ja järviterassi.",
      kuvaus: [
        "Kartanon ravintola tarjoaa arkisin lounasbuffetin ja à la carte -annoksia, joissa painottuu paikallinen lähiruoka. Ruokailutiloina ovat panoraamaterassi, lasikuisti, pianosali ja teehuone.",
        "Kesäisin avautuu järvinäköalainen terassi."
      ],
      kategoriat: ["Ravintolat", "Lähiruoka"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Lounas", arvo: "ark.–la klo 11–14, n. 15,90 €" },
        { label: "Sijainti", arvo: "Olkkolantie 2" }
      ]
    },
    {
      id: "ravintola-sahrami",
      osio: "majoitus",
      tyyppi: "Ravintola",
      nimi: "Ravintola Sahrami",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Kuntakeskuksen ruoka-, seurustelu- ja viihderavintola: päivittäin lounas noutopöydästä ja perjantaisin Pizza Puffet.",
      kuvaus: [
        "Ravintola Sahrami on Savitaipaleen kuntakeskuksen ruoka-, seurustelu- ja viihderavintola, joka tunnetaan ruoanlaadustaan. Arkisin ja viikonloppuisin tarjolla on lounas noutopöydästä: joka päivä vähintään kaksi lämminruokavaihtoehtoa, runsas salaattipöytä ja alkukeitto.",
        "Ravintolan yhteydessä toimii kahvila Muskotti, ja tarjolla on myös omaa leivontaa. Perjantaisin katetaan Pizza Puffet. Ravintolaan mahtuu noin 120 henkeä, ja vuokrattavissa on kaksi kabinettia (34 ja 40 hengelle) erilaisia tilaisuuksia varten."
      ],
      kategoriat: ["Ravintolat", "Kahvilat"],
      vuodenajat: ["ympärivuotinen"],
      tiedot: [
        { label: "Osoite", arvo: "Torikatu 5–7, 54800 Savitaipale" },
        { label: "Puhelin", arvo: "05 419 0070" },
        { label: "Sähköposti", arvo: "info@sahrami.fi" },
        { label: "Lounas", arvo: "Päivittäin noutopöydästä" },
        { label: "Aukiolo", arvo: "Ma–to 7–22, pe 7–03, la 9–03, su 10–22" }
      ]
    },
    {
      id: "reiposen-tila",
      osio: "majoitus",
      tyyppi: "Kahvila",
      nimi: "Reiposen tila — Torpparin tupa",
      teema: "kyla",
      kyla: "kirkonkylä",
      seloste:
        "Kesäkahvila maatilan pihapiirissä, tunnelmaa ja kesätapahtumia.",
      kuvaus: [
        "Reiposen tilalla toimii kesäisin Torpparin tupa -kesäkahvila, jonka ohjelmaan kuuluu myös kesätapahtumia."
      ],
      kategoriat: ["Kahvilat", "Kesäpalvelut"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Osoite", arvo: "Elomäentie 256" }]
    },
    {
      id: "partakosken-kesapalvelut",
      osio: "majoitus",
      tyyppi: "Kahvila",
      nimi: "Partakosken kesäpalvelut",
      teema: "koski",
      kyla: "Partakoski",
      seloste:
        "Venesatama, kesäkauppa ja -ravintola Kärnäkosken kupeessa.",
      kuvaus: [
        "Partakoskella, noin kilometrin päässä Kärnäkosken linnoituksesta, on venesatama sekä kesäisin avoinna oleva kauppa ja ravintola."
      ],
      kategoriat: ["Kesäpalvelut", "Ravintolat"],
      vuodenajat: ["kesä"],
      tiedot: [{ label: "Sijainti", arvo: "Partakoski, venesatama" }]
    }
  ];

  /*
   * Koordinaatit (WGS84) osoitteista geokoodattuina. Lähteet: OpenStreetMap
   * Nominatim, Wikidata, Outdooractive. Osa on katu-/aluetason tarkkuutta
   * (Saalasti, Partakoski, Lehtisensaari, luistelurata) — riittää etäisyys-
   * laskentaan. Kohde saa koordinaatin vain jos sitä ei jo ole määritelty.
   */
  var KOORD = {
    "olkkolan-hovi": [61.20167, 27.67069],
    "europaeus-museo": [61.20167, 27.67069],
    "ravintola-sahrami": [61.19726, 27.68247],
    "savitaipaleen-kirkko": [61.19946, 27.68629],
    "kirkonrakentajien-museo": [61.20041, 27.68487],
    "hakamaen-museoalue": [61.20298, 27.68533],
    "savitaipaleen-kasityoasema": [61.19864, 27.68236],
    "rahikkalan-tuulimylly": [61.31323, 27.81358],
    "saalastin-lomamokit": [61.20272, 27.40555],
    "reiposen-tila": [61.13985, 27.27258],
    "lepankannon-harju": [61.20847, 27.61499],
    "partakoski": [61.27114, 27.70237],
    "orrainpolku": [61.30136, 27.63629],
    "kuolimon-luistelurata": [61.21365, 27.63169],
    "lehtisensaari": [61.24712, 27.63732]
  };
  kohteet.forEach(function (k) {
    if (!k.koord && KOORD[k.id]) k.koord = { lat: KOORD[k.id][0], lng: KOORD[k.id][1] };
  });

  /*
   * Valokuvat: Wikimedia Commons, kaikki CC BY-SA (3.0 / 4.0). Ladattu paikallisesti
   * kansioon assets/img/. Tekijä- ja lisenssitiedot alla; näytetään kuvien yhteydessä
   * ja Suunnittele-sivun "Kuvien lähteet" -listassa (CC BY-SA edellyttää nimeämistä).
   * Kohteet ilman valokuvaa käyttävät koodilla generoitua SVG-kuvitusta.
   */
  var KUVAT = {
    "kirkko.jpg":            { tekija: "Tommi Nummelin",   lisenssi: "CC BY-SA 3.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/3.0", lahde: "https://commons.wikimedia.org/wiki/File:Savitaipaleen_kirkko.JPG" },
    "tapuli.jpg":            { tekija: "Periegetes",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Savitaipale_bell_tower_123.jpg" },
    "karnakoski.jpg":        { tekija: "Tuomas Vitikainen", lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:K%C3%A4rn%C3%A4kosken_linnoitus_2017_01.jpg" },
    "luotolahdenvuori.jpg":  { tekija: "J Hokkanen",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Luotolahdenvuori_n%C3%A4kym%C3%A4.jpg" },
    "suomensalo.jpg":        { tekija: "J Hokkanen",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Suomensalon_Lintuniemi_01.jpg" },
    "partakoski.jpg":        { tekija: "Jaakko H.",         lisenssi: "CC BY-SA 3.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/3.0", lahde: "https://commons.wikimedia.org/wiki/File:Partakoski_harbour_-_panoramio.jpg" },
    "partakoski-kahvila.jpg":{ tekija: "Jaakko H.",         lisenssi: "CC BY-SA 3.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/3.0", lahde: "https://commons.wikimedia.org/wiki/File:Hilltop_cafeteria_at_Partakoski_-_panoramio.jpg" },
    "kuolimo-salmi.jpg":     { tekija: "J Hokkanen",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Luotolahdensalmi_01.jpg" },
    "kuolimo-saaret.jpg":    { tekija: "J Hokkanen",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Rohjosaaret_01.jpg" },
    "kuolimo-ranta.jpg":     { tekija: "J Hokkanen",        lisenssi: "CC BY-SA 4.0", lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0", lahde: "https://commons.wikimedia.org/wiki/File:Jyrk%C3%A4nmaanhiekka_01.jpg" }
  };
  var KUVA_MAP = {
    "savitaipaleen-kirkko":     ["kirkko.jpg",             "Savitaipaleen graniittikirkko"],
    "kirkonrakentajien-museo":  ["tapuli.jpg",             "Savitaipaleen kellotapuli vuodelta 1779"],
    "karnakosken-linnoitus":    ["karnakoski.jpg",         "Kärnäkosken linnoituksen kivimuureja"],
    "luotolahdenvuori":         ["luotolahdenvuori.jpg",   "Näkymä Luotolahdenvuoren jyrkänteiltä Kuolimolle"],
    "suomensalon-harju":        ["suomensalo.jpg",         "Suomensalon harjurantaa Kuolimolla"],
    "partakoski":               ["partakoski.jpg",         "Partakosken venesatama"],
    "partakosken-kesapalvelut": ["partakoski-kahvila.jpg", "Kesäkahvila Partakosken harjulla"],
    "melonta-sup":              ["kuolimo-salmi.jpg",      "Kuolimon kirkasvetinen salmi"],
    "kalastus":                 ["kuolimo-saaret.jpg",     "Kuolimon saaristoa"],
    "lepankannon-harju":        ["kuolimo-ranta.jpg",      "Kuolimon hiekkarantaa"]
  };
  kohteet.forEach(function (k) {
    if (KUVA_MAP[k.id]) { k.kuva = KUVA_MAP[k.id][0]; k.kuvaAlt = KUVA_MAP[k.id][1]; }
  });

  // Tapahtumat (aikasidonnaiset). pvm ISO-muodossa; toistuvat merkitty.
  const tapahtumat = [
    {
      id: "olkkolan-120v",
      nimi: "Olkkolan Hovin 120-vuotisjuhlaviikko",
      teema: "kyla",
      alku: "2026-06-08",
      loppu: "2026-06-13",
      paikka: "Olkkolan Hovi",
      jarjestaja: "Olkkolan Hovi",
      kategoria: "Juhla",
      seloste:
        "Kartano täyttää 120 vuotta. Juhlaviikon huipentaa juhlaillallinen sopraano Hanna Tapionlinnan konsertin kera.",
      toistuva: false
    },
    {
      id: "sapassi",
      nimi: "Sapassi-viikko",
      teema: "kyla",
      alku: "2026-07-11",
      loppu: "2026-07-18",
      paikka: "Ympäri Savitaipaletta",
      jarjestaja: "Savitaipaleen kunta ym.",
      kategoria: "Festivaali",
      karki: true,
      seloste:
        "Savitaipaleen kesän päätapahtuma: musiikkia klassisesta rockiin, teatteria, tanssit, perinnekilpailut, kirpputorit ja maalaismarkkinat eri puolilla pitäjää.",
      toistuva: true
    },
    {
      id: "pettilan-markkinat",
      nimi: "Pettilän maalaismarkkinat & polkuformulat",
      teema: "kyla",
      alku: "2026-07-11",
      loppu: "2026-07-16",
      paikka: "Pettilän koulu",
      jarjestaja: "Veskansan ry",
      kategoria: "Markkinat",
      seloste:
        "Maalaismarkkinat ja Pettilä Grand Prix -polkuformula-ajot Sapassi-viikolla.",
      toistuva: true
    },
    {
      id: "kesaajot",
      nimi: "Savitaipaleen kesäravit (Muikkuravit)",
      teema: "kyla",
      alku: "2026-07-15",
      loppu: "2026-07-15",
      paikka: "Ravirata",
      jarjestaja: "Savitaipaleen ravirata",
      kategoria: "Urheilutapahtuma",
      seloste:
        "Perinteiset kesäravit raviradalla. Liput noin 7 €, alle 16-vuotiaat ilmaiseksi.",
      toistuva: true
    },
    {
      id: "olkkolan-kesakonsertit",
      nimi: "Olkkolan Hovin kesäkonsertit",
      teema: "kyla",
      alku: "2026-07-10",
      loppu: "2026-07-16",
      paikka: "Olkkolan Hovi",
      jarjestaja: "Olkkolan Hovi",
      kategoria: "Musiikki",
      seloste:
        "Kesäkonserttien sarja kartanon miljöössä, lisäksi tikkakisa, kirpputori ja vanhojen autojen cruising.",
      toistuva: true
    },
    {
      id: "tennis-open",
      nimi: "OP Salpa Savitaipale Open",
      teema: "kyla",
      alku: "2026-07-29",
      loppu: "2026-08-02",
      paikka: "Savitaipaleen tenniskentät",
      jarjestaja: "Savitaipaleen tennisseura",
      kategoria: "Urheilutapahtuma",
      seloste:
        "Kansainvälinen naisten tennisturnaus Savitaipaleen kentillä.",
      toistuva: true
    },
    {
      id: "ruispuurojuhla",
      nimi: "Pettilän Ruispuurojuhla",
      teema: "kyla",
      alku: "2026-08-08",
      loppu: "2026-08-08",
      paikka: "Kuivasensaari, Pettilä",
      jarjestaja: "Veskansan ry",
      kategoria: "Kyläjuhla",
      seloste:
        "Perinteinen kyläjuhla ruispuuron äärellä Vuoden 2022 kylässä Kuivasensaaressa.",
      toistuva: true
    },
    {
      id: "rosvopaisti",
      nimi: "Pettilän Rosvopaisti-ilta",
      teema: "kyla",
      alku: "2026-09-18",
      loppu: "2026-09-18",
      paikka: "Pettilä",
      jarjestaja: "Veskansan ry",
      kategoria: "Kyläjuhla",
      seloste:
        "Syksyinen kyläilta rosvopaistin merkeissä.",
      toistuva: true
    },
    {
      id: "luisteluretki",
      nimi: "Kuolimon luisteluretki",
      teema: "talvi",
      alku: "2027-02-13",
      loppu: "2027-02-13",
      paikka: "Kuolimo",
      jarjestaja: "Savitaipaleen Urheilijat",
      kategoria: "Talvitapahtuma",
      karki: true,
      seloste:
        "Vuosittainen retkiluistelutapahtuma kirkasvetisen Kuolimon jäällä helmikuussa.",
      toistuva: true
    }
  ];

  // Merkkihenkilöt ja tarinat (tarinat-sivu)
  const tarinat = [
    {
      id: "kannas",
      otsikko: "Kahden veden kannas",
      teema: "linnoitus",
      teksti:
        "Savitaipale asettuu kapealle kannakselle Saimaan ja kirkkaan Kuolimon väliin. Strateginen paikka linnoitettiin Kustaa III:n sodan (1788–1790) jälkeen: kenraali Aleksandr Suvorov rakennutti Kärnäkosken bastionilinnoituksen 1793 osana Pietarin puolustusta. Kannaksella yhdistyvät sotahistoria ja Geoparkin geologia."
    },
    {
      id: "kirkonrakentajat",
      otsikko: "Kirkonrakentajien pitäjä",
      teema: "kirkko",
      teksti:
        "Savitaipale tunnetaan kirkonrakentajistaan. Juhana ja Matti Salonen sekä Taavetti Rahikainen olivat kuuluja 'kahtamoisten' eli kaksoisristikirkkojen rakentajia 1700–1800-luvuilla. Perintöä esittelee Kirkonrakentajien museo vuoden 1779 kellotapulissa."
    },
    {
      id: "europaeus",
      otsikko: "D. E. Europaeus — Kalevalan kerääjä",
      teema: "museo",
      teksti:
        "Vuonna 1820 syntynyt David Emanuel Daniel Europaeus keräsi kansanrunoutta Elias Lönnrotin aikalaisena ja työtoverina ja toimi myös kielitieteilijänä ja arkeologina. Hänen elämäänsä esittelee oma museo Olkkolan Hovin pihapiirissä."
    },
    {
      id: "jonni-myyra",
      otsikko: "Jonni Myyrä — kahden olympiakisan keihäsvoittaja",
      teema: "harju",
      teksti:
        "Savitaipalelainen keihäänheittäjä Jonni Myyrä (1892–1955) voitti olympiakultaa Antwerpenissä 1920 ja Pariisissa 1924 — ainoana suomalaisena kahdesti. Hän teki myös useita maailmanennätyksiä. Muistomerkki sijaitsee Savitaipaleella."
    },
    {
      id: "tuomiokirkko",
      otsikko: "Talvisodan tuomiokirkko",
      teema: "kirkko",
      teksti:
        "Talvisodan aikana Savitaipaleen kirkko toimi Viipurin hiippakunnan tuomiokirkkona, kun tuomiokapituli oli evakossa pitäjän pappilassa."
    }
  ];

  // Valmiit suositellut reitit (matkasuunnittelija). Kaikilla kohteilla on koordinaatit.
  const reittisuositukset = [
    {
      id: "geopark-kierros",
      nimi: "Geopark-kierros",
      kesto: "koko päivä",
      teema: "harju",
      kuvaus: "Jääkauden ja sotahistorian kierros kahden veden kannaksella: linnoitus, kosket, jyrkänteet ja hiekkaranta.",
      kohteet: ["karnakosken-linnoitus", "partakoski", "luotolahdenvuori", "lepankannon-harju"]
    },
    {
      id: "kulttuurikavely",
      nimi: "Kirkonkylän kulttuurikävely",
      kesto: "2–3 h",
      teema: "kirkko",
      kuvaus: "Kävelymatkan päässä toisistaan: graniittikirkko, kellotapuli, kotiseutumuseo, käsityöasema ja Europaeus-museo.",
      kohteet: ["savitaipaleen-kirkko", "kirkonrakentajien-museo", "hakamaen-museoalue", "savitaipaleen-kasityoasema", "europaeus-museo"]
    },
    {
      id: "jarvet-nakoalat",
      nimi: "Järvet & näköalat",
      kesto: "koko päivä",
      teema: "jarvi",
      kuvaus: "Kirkasvetisen Kuolimon parhaat: harjusaari, jyrkänteet, hiekkaranta ja suojeltu saari.",
      kohteet: ["suomensalon-harju", "luotolahdenvuori", "lepankannon-harju", "lehtisensaari"]
    },
    {
      id: "maku-majoitus",
      nimi: "Maku & majoitus",
      kesto: "ilta / yö",
      teema: "kyla",
      kuvaus: "Lähiruokaa ja yöpyminen: kyläravintola, historiallinen kartano, kesäkahvila ja Partakosken miljöö.",
      kohteet: ["ravintola-sahrami", "olkkolan-hovi", "reiposen-tila", "partakoski"]
    },
    {
      id: "talvipaiva",
      nimi: "Talvipäivä Kuolimolla",
      kesto: "½ päivää",
      teema: "talvi",
      kuvaus: "Retkiluistelua kirkasvetisellä jäällä ja kartanon saunat lämmittämään.",
      kohteet: ["kuolimon-luistelurata", "olkkolan-hovi"]
    }
  ];

  const faktat = {
    asukkaat: "~3 100",
    kesalisays: "väkiluku lähes kolminkertaistuu kesällä",
    jarvet: "167",
    pintaAla: "~690 km²",
    perustettu: "1639",
    maakunta: "Etelä-Karjala",
    etaisyydet: [
      { kohde: "Lappeenranta", matka: "37 km", lisa: "rautatieasema ja lentokenttä" },
      { kohde: "Helsinki", matka: "n. 200 km", lisa: "" },
      { kohde: "Mikkeli", matka: "vt 13:a pohjoiseen", lisa: "" }
    ],
    tunnukset: [
      { nimi: "Lintu", arvo: "kuikka" },
      { nimi: "Kasvi", arvo: "kangasvuokko" },
      { nimi: "Eläin", arvo: "metsäjänis" },
      { nimi: "Kala", arvo: "nieriä" }
    ]
  };

  return {
    brand: brand,
    osiot: osiot,
    kohteet: kohteet,
    tapahtumat: tapahtumat,
    tarinat: tarinat,
    reittisuositukset: reittisuositukset,
    faktat: faktat,
    kuvat: KUVAT,
    byId: function (id) {
      return kohteet.find(function (k) { return k.id === id; }) || null;
    },
    byOsio: function (osio) {
      return kohteet.filter(function (k) { return k.osio === osio; });
    }
  };
})();
