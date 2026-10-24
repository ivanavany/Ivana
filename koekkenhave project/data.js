// ============================================================
// GARDEN DATA — Grøntsagshavens årshjul
// ============================================================
// Built ONLY from your chosen sources (see SOURCES).
// DMI data is used as a local climate reference in the advice,
// but the CLIMATE profile itself is NOT shown in the app.
//
// Each month has five lists, shown in two sections:
//   PLANTER         sow      = "Så og forspir"
//                   plantOut = "Plantes ud"
//                   harvest  = "Høst"
//                   care     = "Plantepleje" (jobs tied to specific plants)
//   HAVEFORBEREDELSE prep    = soil, beds, compost, planning, greenhouse, tools
//
// Every item: { name, note, sources }. Your own notes: sources: ["egen"].
// An empty string "" in a plant profile = none of your sources cover it.
// ============================================================

const SOURCES = {
  frospiren: {
    label: "Frøspiren",
    url: "https://frospiren.dk"
  },
  bolius: {
    label: "Bolius",
    url: "https://www.bolius.dk/koekkenhaven-maaned-for-maaned-21093"
  },
  hvidlog: {
    label: "Bolius hvidløgsguide",
    url: "https://www.bolius.dk/guides-til-koekkenhaven/hvidloeg"
  },
  boliusPlan: {
    label: "Bolius planlægning",
    url: "https://www.bolius.dk/faa-inspiration-til-planlaegning-og-pasning-af-koekkenhaven-34289"
  },
  boliusKost: {
    label: "Bolius kål & bønner",
    url: "https://www.bolius.dk/dyrk-kostraadene-i-koekkenhaven-97232"
  },
  haveselskab: {
    label: "Haveselskabet sædskifte",
    url: "https://haveselskabet.dk/havestof/den-spiselige-have/kokkenhave/fa-styr-pa-dit-saedskifte/"
  },
  haveselskabAsia: {
    label: "Haveselskabet asiatisk grønt",
    url: "https://haveselskabet.dk/havestof/den-spiselige-have/kokkenhave/sadan-dyrker-du-asiatiske-bladgrontsager/"
  },
  haveglad: {
    label: "Haveglad såkalender",
    url: "https://www.haveglad.dk/haveguiden/sakalender-til-kokkenhaven-2025/"
  },
  idenyt: {
    label: "Idenyt",
    url: "https://idenyt.dk/haven/koekkenhaven/din-kokkenhaven-maned-for-maned/"
  },
  jordensskole: {
    label: "Jordens Skole",
    url: "https://www.jordensskole.dk/aarshjul"
  },
  dalby: {
    label: "Claus Dalby (Krukkekøkkenhaven)",
    url: "https://jv.dk/esbjerg/claus-dalby-guider-fire-nemme-groentsager-til-at-starte-med"
  },
  dmi: {
    label: "DMI / frostdata",
    url: "https://www.dmi.dk"
  },
  dmiOdder: {
    label: "DMI klimadata",
    url: "https://download.dmi.dk/Research_Projects/klimaatlas/v2024a/kommune_reports/DMI_Klimaatlas_v2024a_Odder_rapport.pdf"
  },
  egen: {
    label: "Egen note",
    url: ""
  },
  hokus: {
    label: "Hokus Krokus",
    url: "https://www.hokuskrokus.dk/blog/haveaaret-atusx2od"
  },
  fuglebjerg: {
    label: "Fuglebjerggaard (Camilla)",
    url: "https://www.fuglebjerggaard.dk/Camilla/haven/koekkenhaven_aaret_rundt.htm"
  },
  bedste: {
    label: "BedsteService",
    url: "https://www.bedsteservice.dk/koekkenhave-kalender/"
  },
  norris: {
    label: "Peter Norris (Havenyt)",
    url: "https://www.havenyt.dk/artikler/dyrkningsmetoder/froe_og_saaning/1425.html"
  },
  klimaMar: {
    label: "Klimaplanter (marts)",
    url: "https://klimaplanter.dk/havetips-inspiration/goeremaal-i-koekkenhaven-i-marts/"
  },
  klimaOkt: {
    label: "Klimaplanter (oktober)",
    url: "https://klimaplanter.dk/havetips-inspiration/goeremaal-i-koekkenhaven-i-oktober/"
  }
};

// Background reference only — not displayed in the app.
const CLIMATE = {
  location: "Torrild, Odder Kommune",
  summary: "Østjysk klima med tung lerjord. Torrild ligger et stykke inde i landet, så nætterne kan blive koldere end ude ved kysten — vær lidt mere forsigtig med frost forår og efterår.",
  facts: [
    {
      label: "Klimaregion",
      text: "Odder Kommune ligger i den sydøstlige del af klimaregion Østjylland.",
      sources: ["dmiOdder"]
    },
    {
      label: "Jord",
      text: "Jorden er overvejende leret og holder godt på vandet. Sammen med havet mod syd og øst betyder det, at området sjældent får de allerhøjeste eller laveste temperaturer.",
      sources: ["dmiOdder"]
    },
    {
      label: "Inde i landet",
      text: "Havets dæmpende effekt aftager væk fra kysten, så der kommer større temperaturudsving. Lavninger og dalstrøg kan blive særligt kolde om vinteren.",
      sources: ["dmiOdder"]
    },
    {
      label: "Temperatur",
      text: "Gennemsnit for kommunen (1981–2010): ca. 15,6° om sommeren og 1,6° om vinteren.",
      sources: ["dmiOdder"]
    },
    {
      label: "Nedbør",
      text: "Østjylland får mindre regn end længere mod vest, fordi luften tørres ud på vejen. Regn med at skulle vande i tørre somre.",
      sources: ["dmiOdder"]
    },
    {
      label: "Frost",
      text: "Sidste nattefrost typisk midt/slut maj. Første efterårsfrost traditionelt i første halvdel af oktober, tidligst inde i landet. Ved jorden kan det være koldere end de officielle målinger i 2 meters højde.",
      sources: ["frospiren", "dmi"]
    },
    {
      label: "Jordtemperatur",
      text: "Mindst 8° før de første afgrøder sås; 12–13° for bønner, ærter og majs.",
      sources: ["bolius"]
    },
    {
      label: "Fremtiden",
      text: "DMI forventer mildere og vådere vintre. I et mellemhøjt scenarie stiger vintertemperaturen i kommunen fra ca. 1,6° til 3,6° frem mod 2100.",
      sources: ["dmiOdder"]
    }
  ]
};

// Each year a bed moves on to the "next" group (Bolius).
const ROTATION = {
  blad: {
    label: "Bladplanter: kål, bælgplanter, porre",
    next: "kartoffel"
  },
  frugt: {
    label: "Frugter: majs, squash, græskar (+ salat, spinat, kørvel)",
    next: "blad"
  },
  rod: {
    label: "Rodfrugter & løg",
    next: "frugt"
  },
  kartoffel: {
    label: "Kartofler",
    next: "rod"
  },
  drivhus: {
    label: "Drivhus / varmekrævende",
    next: null
  },
  flerarig: {
    label: "Flerårig — står fast",
    next: null
  }
};

const gardenData = [
  {
    month: "Januar",
    subtitle: "Planlægning og de første frø",
    sow: [
      { name: "Chili & peberfrugt", note: "En af de tidligste afgrøder — varmemåtte + vækstlys, ca. 18–20°. Peter Norris sår peber midt/sidst i januar og potter om 3–4 gange før udplantning midt maj", sources: ["frospiren", "bolius", "haveglad", "norris"] },
      { name: "Løg, forårsløg, porre", note: "Stuetemperatur, meget lys", sources: ["frospiren"] },
      { name: "Salat", note: "Spirer fra 4°, i drivhus/udestue. Haveglad nævner romainesalat i lunt drivhus/havestue fra sidst i januar", sources: ["frospiren", "haveglad"] }
    ],
    plantOut: [],
    harvest: [
      { name: "Pastinak", note: "", sources: ["frospiren"] },
      { name: "Porre", note: "Vinterporrer kan stå i jorden og høstes løbende", sources: ["frospiren", "bolius"] },
      { name: "Kål", note: "Hele vinteren", sources: ["frospiren"] },
      { name: "Rosenkål", note: "", sources: ["bolius"] },
      { name: "Bladbede", note: "", sources: ["bolius"] },
      { name: "Jordskokker", note: "Hvis jorden ikke er frossen", sources: ["frospiren", "bolius"] }
    ],
    care: [],
    prep: [
      { name: "Planlæg sæsonen", note: "Gennemgå frøkataloger og bestil frø, knolde og løg. Lav en plantegning — køb sjældne frø nu, de kan blive udsolgt. Mange afgrøder kan sås over flere måneder — udnyt hele perioden og så i flere omgange for en længere høst", sources: ["frospiren", "bolius", "idenyt", "haveglad", "hokus", "bedste"] },
      { name: "Sædskifte", note: "Del haven i 4 grupper (bladplanter, frugter som squash/majs, rodfrugter, kartofler) og ryk grupperne ét bed videre hvert år — mindsker træt jord og sygdomme", sources: ["bolius"] },
      { name: "Dæk kartoffelbede", note: "Fiberdug/plast — jorden bliver hurtigere varm", sources: ["frospiren"] },
      { name: "Forbered jorden", note: "Kompost eller husdyrgødning. Kompost kan allerede spredes nu", sources: ["frospiren", "idenyt"] },
      { name: "Ryd op i bedene", note: "Fjern rester af døde planter og blade — mindsker sygdomme og skadedyr", sources: ["haveglad"] },
      { name: "Rens redskaber, potter og bakker", note: "", sources: ["hokus"] },
      { name: "Træaske og møg", note: "Kommende hestebønnebed får træaske; hvidløgsbedet møg og træaske", sources: ["norris"] }
    ]
  },
  {
    month: "Februar",
    subtitle: "Drivhuset vågner",
    sow: [
      { name: "Artiskok", note: "Lys, lun vindueskarm — sikrer blomst i år", sources: ["frospiren", "haveglad"] },
      { name: "Kartofler", note: "Forspir i æggebakker eller kasser, med siden med flest spirer opad. Køb gerne certificerede læggekartofler. Lyst og halvvarmt, ca. 15°. Peter Norris stiller dem til forspiring midt i februar", sources: ["frospiren", "bolius", "idenyt", "haveglad", "norris"] },
      { name: "Spinat", note: "Tidlig høst. Sås inde og plantes ud i marts", sources: ["frospiren", "norris"] },
      { name: "Hestebønner", note: "Forspir eller så direkte. Sås inde (valsk bønne) og plantes ud i marts", sources: ["frospiren", "norris"] },
      { name: "Rødbede & bladbede", note: "Tidlige rødbeder: 3–4 frø pr. celle, ud under plast sidst i marts", sources: ["frospiren", "norris"] },
      { name: "Salat", note: "Sås inde til mistbænk i marts", sources: ["frospiren", "norris"] },
      { name: "Løg, forårsløg, porre", note: "Et lunt sted, fx i udestuen", sources: ["frospiren", "idenyt"] },
      { name: "Ærter", note: "Til ærteskud, root-trainers. Sås inde i root-trainers, plantes i mistbænk eller under dække i marts — høst i juni", sources: ["frospiren", "norris"] },
      { name: "Radisser", note: "Drivhus/mistbænk", sources: ["frospiren", "norris"] },
      { name: "Tidlig kål", note: "Rød-/hvidkål, broccoli, glaskål, blomkål", sources: ["frospiren"] },
      { name: "Chili & peberfrugt", note: "Forspires indendørs. Forspir langsomt voksende afgrøder som chili og peber nu", sources: ["haveglad", "hokus"] },
      { name: "Tidlige tomater", note: "Peter Norris sår dem omkring 5. februar til mistbænk fra midt april", sources: ["norris"] },
      { name: "Forårsløg & løg", note: "Forårsløg sås først i februar og plantes ud i marts. Løg sås inde med 2–4 frø pr. celle", sources: ["norris"] }
    ],
    plantOut: [],
    harvest: [],
    care: [
      { name: "Spiretest af egne frø", note: "Læg et par frø på fugtigt køkkenrulle i en lukket beholder et lunt sted. Kål, ærter, majs og squash spirer inden for ca. en uge; persille og gulerod er langsommere", sources: ["bolius"] },
      { name: "Vækstlys", note: "Dagene er korte — ekstra lys giver kraftigere og mere kompakte småplanter", sources: ["bolius"] },
      { name: "Timian", note: "Skær ned 5–10 cm over jorden", sources: ["frospiren"] },
      { name: "Gød overvintrende løg", note: "Med kvælstofholdig gødning", sources: ["norris"] }
    ],
    prep: [
      { name: "Vask drivhuset", note: "Solskinsdag — mindsker skadedyr", sources: ["frospiren"] },
      { name: "Pas fuglene", note: "Vand og mad — de fjerner skadedyr til foråret", sources: ["frospiren"] },
      { name: "Udvid køkkenhaven", note: "Feb/marts er perfekt tidspunkt", sources: ["frospiren"] },
      { name: "Grav ikke i våd jord", note: "Er jorden våd eller frossen, så vent — ellers ødelægges strukturen. Tilfør hellere kompost ovenpå", sources: ["haveglad"] },
      { name: "Gør klar til sæsonen", note: "Fra midt februar: så i drivhus/vindueskarm og ude under fiberdug. Byg højbede og mistbænk, fodr komposten, tjek redskaber", sources: ["jordensskole"] },
      { name: "Planlæg forkultiveringen", note: "Lys, plads og potter", sources: ["hokus"] }
    ]
  },
  {
    month: "Marts",
    subtitle: "Væksten begynder — men tålmodighed",
    sow: [
      { name: "Bladselleri", note: "Sås sidste halvdel af marts, i overfladen — skal næsten ikke dækkes. Plantes ud sidst i maj", sources: ["frospiren", "haveglad", "norris", "klimaMar"] },
      { name: "Tomater", note: "Lunt og lyst — ellers lange og ranglede. Spirer bedst ved 18–22°. Dæk frø med jord 2–3 gange deres egen størrelse", sources: ["frospiren", "haveglad", "idenyt", "norris", "klimaMar"] },
      { name: "Rødbede & bladbede", note: "Peter Norris sår tidligst 23. marts — der kan stadig komme frost midt i april", sources: ["frospiren", "norris"] },
      { name: "Persille, dild, koriander, kørvel", note: "Persille og dild kan sås inde; eller direkte ude", sources: ["frospiren", "norris", "klimaMar"] },
      { name: "Ærter", note: "Til ærteskud. Kan sås direkte ude, når jorden er klar", sources: ["frospiren", "haveglad", "klimaMar", "hokus"] },
      { name: "Broccoli & blomkål", note: "", sources: ["frospiren"] },
      { name: "Artiskok", note: "I potter til senere udplantning", sources: ["bolius"] },
      { name: "Grønkål", note: "I potter til senere udplantning", sources: ["bolius"] },
      { name: "Radisser", note: "Bland med gulerodsfrø, sås direkte. Når jorden er ca. 10°", sources: ["frospiren", "haveglad"] },
      { name: "Pastinak", note: "Langsom spiring", sources: ["frospiren", "klimaMar"] },
      { name: "Porre & forårsløg", note: "Sommer- og efterårsporrer sås midt i marts til udplantning efter tidlige kartofler", sources: ["frospiren", "bolius", "haveglad", "norris", "klimaMar"] },
      { name: "Kartofler", note: "Midt/slut marts under fiberdug", sources: ["frospiren"] },
      { name: "Chili & peberfrugt", note: "Sidste forspiring", sources: ["haveglad"] },
      { name: "Kål", note: "Forspires", sources: ["haveglad", "klimaMar", "hokus"] },
      { name: "Salat & spinat", note: "De første kan sås ude, når jorden er ca. 10°. Kan også sås i drivhus sammen med radiser, rucola, pak choi og mizuna", sources: ["haveglad", "klimaMar", "hokus"] },
      { name: "Hestebønner", note: "Sås direkte, eller inde i root-trainers ca. 15. marts til udplantning mellem kartoflerne midt april", sources: ["klimaMar", "norris"] }
    ],
    plantOut: [
      { name: "Spinat", note: "Direkte", sources: ["frospiren"] },
      { name: "Hestebønner", note: "Midt/slut marts, under fiberdug", sources: ["frospiren", "norris"] },
      { name: "Salat", note: "Drivhus eller friland m. fiberdug", sources: ["frospiren"] },
      { name: "Ærter", note: "Friland med fiberdug", sources: ["frospiren"] },
      { name: "Rødbede", note: "Friland under fiberdug", sources: ["frospiren"] },
      { name: "Løgsæt & hvidløg", note: "Nogle typer løg og hvidløg kan sættes nu", sources: ["haveglad"] }
    ],
    harvest: [],
    care: [
      { name: "Undgå for tidlig såning", note: "Kulde kan få porre, selleri og løg til at gå i stok (blomstre for tidligt). Salat, dild, spinat og kinesisk kål kan gøre det samme ved korte dage. Så kun ude, når der ikke længere er frostrisiko — de fleste køkkenurter først hen mod april", sources: ["bolius", "idenyt", "haveglad"] },
      { name: "Rabarber", note: "Sort spand ovenpå giver tidlige stængler", sources: ["frospiren"] },
      { name: "Spiring", note: "Fjern låget når spirerne kommer op — de skal have masser af lys og luft, ellers bliver de lange og tynde", sources: ["klimaMar"] },
      { name: "Gød overvintrende spinat", note: "Flydende gødning, så snart der kommer ny vækst", sources: ["norris"] }
    ],
    prep: [
      { name: "Tidlige kartofler", note: "Dæk bedet med klar plastik — når ukrudtet begynder at spire, er jorden klar til de tidlige kartofler. Kartoffelbedet får også en håndfuld træaske pr. m²", sources: ["bolius", "norris"] },
      { name: "Grøntgødning", note: "Vend jorden hvor der har stået grøntgødning over vinteren", sources: ["bolius"] },
      { name: "Sædskifte", note: "God tid til at planlægge hvor alt skal stå — samme afgrøde bør ikke stå samme sted næste sæson", sources: ["idenyt", "haveglad"] },
      { name: "Gør bedene klar", note: "Luk og fodr bedene med kompost eller dyremøg. Fjern ukrudt og planterester, løsn jorden let med en greb, tilfør kompost eller velomsat husdyrgødning", sources: ["jordensskole", "klimaMar", "hokus"] },
      { name: "Kun smuldrende jord", note: "Jorden skal smuldre, ikke klistre — bearbejdning af våd jord ødelægger strukturen resten af året", sources: ["hokus"] },
      { name: "Tjek frølageret", note: "Gennemgå holdbarhed, se hvad der mangler, og lav en såplan", sources: ["klimaMar"] }
    ]
  },
  {
    month: "April",
    subtitle: "Travleste så-måned",
    sow: [
      { name: "Basilikum", note: "Vindueskarm → drivhus fra maj", sources: ["frospiren"] },
      { name: "Agurk & melon", note: "Varmeelskende — forspir indendørs. I drivhus. Første hold agurker sås samtidig med frilandstomaterne", sources: ["frospiren", "bolius", "haveglad", "norris"] },
      { name: "Græskar & squash", note: "Dæk mod nattefrost. Courgetter sås sidst i april til udplantning sidst i maj under fiberdug", sources: ["frospiren", "norris"] },
      { name: "Kål", note: "Blomkål, broccoli, spidskål, rød-/hvidkål. Blomkål, spidskål og rødkål sås ca. 15. april til udplantning efter tidlige kartofler (ofte først efter 1. juni). Broccoli ca. 15. april til udplantning sidst i maj — må ikke stå for varmt", sources: ["frospiren", "haveglad", "norris"] },
      { name: "Rødbede & bladbede", note: "2–4 frø pr. potte, eller direkte på friland. Rødbeder sås omkring 1. april i pluggbox til udplantning i maj", sources: ["frospiren", "bolius", "norris", "hokus"] },
      { name: "Tomater", note: "Sidste chance for god høst i midt-juni. Frilandstomater ikke før 15. april — ellers bliver de for store inden udplantning først i juni", sources: ["frospiren", "bolius", "norris"] },
      { name: "Salat", note: "Lille portion til at fylde huller", sources: ["frospiren", "hokus"] },
      { name: "Vinter porre", note: "Ca. 10. april; skal blive mindst 25 cm før udplantning i juni efter tidlige kartofler", sources: ["frospiren", "norris"] },
      { name: "Jordskokke", note: "Spreder sig — læg evt. i en spand", sources: ["frospiren"] },
      { name: "Gulerødder", note: "Direkte, evt. blandet med radisefrø", sources: ["frospiren", "bolius", "hokus"] },
      { name: "Radisser", note: "Direkte på friland", sources: ["bolius", "haveglad"] },
      { name: "Spinat", note: "Direkte på friland", sources: ["bolius", "haveglad"] },
      { name: "Majroer", note: "Direkte på friland", sources: ["bolius"] },
      { name: "Persillerod", note: "Direkte på friland", sources: ["bolius"] },
      { name: "Skorzonerod", note: "Direkte på friland", sources: ["bolius"] },
      { name: "Dild", note: "Direkte på friland", sources: ["bolius", "hokus"] },
      { name: "Sommerblomster", note: "Morgenfrue, tagetes m.fl. — tiltrækker nyttedyr og tagetes siges at rense jorden", sources: ["frospiren", "bolius"] },
      { name: "Porrer & forårsløg/pibeløg", note: "", sources: ["haveglad"] },
      { name: "Bladselleri", note: "", sources: ["haveglad"] },
      { name: "Krydderurter", note: "Diverse krydderurter kan sås nu", sources: ["haveglad"] },
      { name: "Majs", note: "Inde, tidligst ca. 15. april", sources: ["norris"] },
      { name: "Ærter", note: "På friland — og et nyt hold ca. 3 uger senere", sources: ["norris"] }
    ],
    plantOut: [
      { name: "Hestebønner", note: "Dæk med fiberdug ved frost. Kan plantes mellem kartoflerne midt april", sources: ["frospiren", "norris"] },
      { name: "Persille, koriander, dild, kørvel", note: "", sources: ["frospiren"] },
      { name: "Spinat & salat", note: "", sources: ["frospiren"] },
      { name: "Porre, løg, forårsløg", note: "I klumper", sources: ["frospiren"] },
      { name: "Ærter", note: "Beskyt med fiberdug — kold jord kan slå dem ihjel, så vent hellere lidt", sources: ["frospiren", "bolius"] },
      { name: "Kartofler", note: "60–80 dage til høst. Læg dem med nogle ugers mellemrum, så får du nye kartofler over længere tid", sources: ["frospiren", "bolius"] },
      { name: "Krydderurter", note: "Kan plantes ud fra sidst i marts til september — selv små supermarkedspotter kan deles og blive til meget", sources: ["fuglebjerg"] }
    ],
    harvest: [],
    care: [
      { name: "Jordbær", note: "Klip gamle blade af. Fjern visne blade", sources: ["frospiren", "norris"] },
      { name: "Asparges", note: "God tid til at plante, hvis du mangler dem", sources: ["frospiren"] },
      { name: "Pot om", note: "Forspirede planter der er blevet for store", sources: ["frospiren"] },
      { name: "Fiberdug — men ikke over persille", note: "Fiberdug giver ekstra varme over nysåede bede, men persille spirer bedst uden", sources: ["haveglad"] },
      { name: "Beskær stauder og krydderurter", note: "", sources: ["haveglad"] },
      { name: "Snegle", note: "Gør klar til at forebygge snegle, før de topper", sources: ["hokus"] }
    ],
    prep: [
      { name: "Jordtemperatur", note: "Mindst 8° før de første afgrøder sås; 12–13° for bønner, ærter og majs. Sort plastik nogle uger før forvarmer jorden. Et jordtermometer er en god investering", sources: ["bolius", "haveglad"] },
      { name: "Jordbehandling", note: "Først når jorden ikke er for våd — vigtigt på leret jord, der holder længe på vandet. Fjern ukrudt, fordel et tyndt lag kompost og arbejd det ned i de øverste 10–15 cm", sources: ["bolius", "dmiOdder"] },
      { name: "Højbede", note: "Bliver hurtigere varme og tørre efter vinteren, så du kan så lidt tidligere — en fordel på tung, våd jord", sources: ["boliusPlan"] },
      { name: "Luge tidligt", note: "Lug rundt om de første spirer — det sparer meget lugning senere. Småt ukrudt er hurtigst at fjerne", sources: ["jordensskole", "hokus"] }
    ]
  },
  {
    month: "Maj",
    subtitle: "Den store udplantning",
    sow: [
      { name: "Bønner", note: "Forspir i drivhus/vindueskarm; direkte først når der er mindst 8–10° døgnet rundt (typisk slut maj)", sources: ["frospiren", "bolius", "haveglad", "hokus", "fuglebjerg"] },
      { name: "Majs", note: "Root-trainers. Peter Norris sår nyt hold ca. hver 3. uge", sources: ["frospiren", "haveglad", "norris", "hokus"] },
      { name: "Basilikum", note: "Ikke før starten af maj, til udplantning efter tidlig salat/løg i juni", sources: ["frospiren", "norris"] },
      { name: "Agurk & melon", note: "", sources: ["frospiren"] },
      { name: "Forårsløg/pibeløg", note: "", sources: ["frospiren"] },
      { name: "Gulerødder", note: "Direkte. Gulerødder til vinteropbevaring sås fra sidst i maj til først i juni", sources: ["frospiren", "haveglad", "norris"] },
      { name: "Salat & radisser", note: "Gerne under plastikbuer eller i mistbænk", sources: ["bolius"] },
      { name: "Squash", note: "", sources: ["frospiren"] },
      { name: "Rødbede, porre, pastinak", note: "Sidste chance for forspiring", sources: ["frospiren"] },
      { name: "Sene kål", note: "Blomkål, spidskål, savoykål, rosenkål, rød- og hvidkål. Peter Norris sår dem til udplantning efter tidlig spinat", sources: ["haveglad", "norris"] },
      { name: "Kruspersille", note: "", sources: ["haveglad"] },
      { name: "Græskar", note: "Når jorden er 10°", sources: ["haveglad"] }
    ],
    plantOut: [
      { name: "Græskar & squash", note: "Midt/slut maj, gødet bed", sources: ["frospiren", "bolius", "norris"] },
      { name: "Ærter", note: "Dæk ved kolde nætter", sources: ["frospiren", "bolius"] },
      { name: "Kål", note: "Fra slut maj", sources: ["frospiren", "bolius"] },
      { name: "Artiskok", note: "På varme, gerne overskyede dage", sources: ["bolius"] },
      { name: "Kartofler", note: "Sidste chance hvis de ikke er lagt endnu", sources: ["bolius"] },
      { name: "Porre, løg, forårsløg", note: "I klumper", sources: ["frospiren"] },
      { name: "Rødbede", note: "", sources: ["frospiren"] },
      { name: "Persille, koriander, kørvel", note: "", sources: ["frospiren"] },
      { name: "Salat", note: "", sources: ["frospiren"] },
      { name: "Sommerblomster", note: "", sources: ["frospiren"] },
      { name: "Tomater", note: "Omkring mors dag, min. 10° om natten. Tomat i drivhus først, når nattetemperaturen er stabil", sources: ["frospiren", "hokus"] },
      { name: "Bladselleri", note: "", sources: ["frospiren"] },
      { name: "Bønner", note: "Sidst i maj", sources: ["frospiren", "bolius"] }
    ],
    harvest: [
      { name: "Radisser", note: "", sources: ["bolius"] },
      { name: "Rabarber", note: "", sources: ["bolius"] },
      { name: "Spinat", note: "", sources: ["bolius"] },
      { name: "Asparges", note: "", sources: ["bolius"] }
    ],
    care: [
      { name: "Frostberedskab", note: "Hav fiberdug/aviser klar — kartofler, ærter, hestebønner, salat m.fl. Haver inde i landet kan få koldere klare nætter end ved kysten", sources: ["frospiren", "dmiOdder"] },
      { name: "Udblød bønner og ærter", note: "Ca. en time i vand før såning giver bedre spiring", sources: ["bolius"] },
      { name: "Udtynding", note: "Tynd rækker af gulerødder, rødbeder og salat ud, når de første rigtige blade viser sig", sources: ["bolius"] },
      { name: "Vent på 10° i jorden", note: "Frilandsagurk, -tomat, græskar, bønner og majs: vent til jorden er 10° — typisk sidste halvdel af maj", sources: ["haveglad"] },
      { name: "Salat i potter", note: "Så salat i potter hver 2.–3. uge, og plant dem i hullerne når du høster — så har du salat hele sommeren", sources: ["haveglad"] },
      { name: "Hold fugtigt", note: "Alt forspiret skal i jorden og holdes fugtigt. Vand flittigt i en tør maj", sources: ["jordensskole", "haveglad"] },
      { name: "Vand dybt og sjældnere", note: "", sources: ["hokus"] },
      { name: "Bladlus og nyttedyr", note: "Hold øje med bladlus, og giv plads til nyttedyrene", sources: ["hokus"] },
      { name: "Hvidløg", note: "Grundvandes midt i maj, hvis jorden er tør og bladene begynder at gulne", sources: ["norris"] }
    ],
    prep: [
      { name: "Dæk jorden", note: "Læg græsafklip eller halm om planterne, når jorden er varm — holder på fugten", sources: ["hokus"] }
    ]
  },
  {
    month: "Juni",
    subtitle: "Høsten begynder for alvor",
    sow: [
      { name: "Rødbede, bladbede, gulerod", note: "Til vinterforråd", sources: ["frospiren"] },
      { name: "Ærter", note: "Løbende imellem eksisterende planter. Sidste hold ærter sås først i juni", sources: ["frospiren", "norris"] },
      { name: "Fennikel", note: "Lille portion, gentag i juli/august", sources: ["frospiren", "haveglad"] },
      { name: "Savoykål, glaskål, lilla broccoli, blomkål", note: "Dæk mod fugle. Vinterhårdfør savoy sås ca. 1. juni — senere når måske ikke faste hoveder til midt oktober. Broccoli til efterår senest 15. juni", sources: ["frospiren", "norris"] },
      { name: "Bønner", note: "Direkte, busk og stang. Også stangbønner og buskbønner. Stangbønner ca. 12. juni til udplantning efter tidlige kartofler. Bønner kan sås frem til juni — læg dem i vand nogle timer først", sources: ["frospiren", "haveglad", "norris", "fuglebjerg"] },
      { name: "Gulerødder & rødbeder", note: "Nyt hold. Rødbeder kan sås mange hold fra april til sidst i juli. Peter Norris forkultiverer rødbeder i pluggbox til udplantning som efterafgrøde", sources: ["haveglad", "fuglebjerg", "norris"] },
      { name: "Salat, spinat & radiser", note: "Fortsæt med nye hold", sources: ["haveglad"] },
      { name: "Endivie & julesalat", note: "", sources: ["haveglad"] },
      { name: "Porrer & kål", note: "", sources: ["haveglad"] },
      { name: "Majs", note: "Sidste hold ca. 20. juni, til udplantning efter hvidløg", sources: ["norris"] },
      { name: "Palmekål", note: "Sås nu og spises vinteren igennem", sources: ["fuglebjerg"] }
    ],
    plantOut: [
      { name: "Bønner", note: "Giv stangbønner noget at klatre op ad", sources: ["frospiren"] },
      { name: "Majs", note: "Plant i blokke, ikke rækker — vindbestøvning", sources: ["frospiren"] },
      { name: "Basilikum", note: "Gerne ved tomaterne", sources: ["frospiren"] },
      { name: "Agurk & melon", note: "Omkring fars dag / midt juni", sources: ["frospiren"] },
      { name: "Tomater", note: "Giv støtte", sources: ["frospiren"] },
      { name: "Artiskok", note: "Fast plads i et par år, kan overvintre", sources: ["frospiren"] },
      { name: "Chili & peberfrugt", note: "", sources: ["frospiren"] },
      { name: "Vinter porre, kål, forårsløg, squash, rødbede", note: "", sources: ["frospiren"] }
    ],
    harvest: [
      { name: "Radiser, salat & ærter", note: "De første tidlige afgrøder — høst mens de er friske. Også spinat og urter", sources: ["haveglad", "hokus"] }
    ],
    care: [
      { name: "Udplant i gråvejr", note: "Kølige, overskyede dage — helst med regn i udsigt — er bedst", sources: ["bolius"] },
      { name: "Gødning", note: "Ny omgang gødning, gerne kvælstofrig. Brug gerne organisk gødning", sources: ["bolius", "haveglad"] },
      { name: "Fiberdug mod skadedyr", note: "Over kål, gulerødder og porrer", sources: ["bolius"] },
      { name: "Sen start?", note: "Ikke for sent — vælg sommersorter som sommerkål, sommerporre og tidlige kartofler, og grav/luk jorden godt først", sources: ["bolius"] },
      { name: "Sydvendt mur", note: "De varmeste pladser — fx op ad en sydvendt mur — til chili, tomater, frilandsagurker, squash og majs", sources: ["haveglad"] },
      { name: "Lad noget gå i frø", note: "Høst ikke alt — noget skal blive til føde for fugle, insekter og jordlivet", sources: ["jordensskole"] },
      { name: "Tynd ud", note: "Gulerødder og rødbeder, så de kan udvikle sig", sources: ["hokus"] },
      { name: "Tomater", note: "Bind op og knib sideskud på de sorter, der skal have det", sources: ["hokus"] }
    ],
    prep: [
      { name: "Bunddække", note: "Holder på fugten", sources: ["frospiren"] },
      { name: "Havehjælpere", note: "Vand til pindsvin, fugle, bier", sources: ["frospiren"] },
      { name: "Ukrudt", note: "Fjern lidt hver gang du høster", sources: ["frospiren"] }
    ]
  },
  {
    month: "Juli",
    subtitle: "Sol, vand og høst",
    sow: [
      { name: "Buskbønner", note: "Direkte. Til udplantning efter kartofler", sources: ["frospiren", "norris"] },
      { name: "Asiatisk bladgrønt", note: "Pak choi, mizuna m.fl.. Samme familie som kål — tjek sædskiftet. Efter kål samme sted: fyld dybe riller med kompost og så i den", sources: ["frospiren", "haveselskabAsia"] },
      { name: "Fennikel", note: "Jævn høst", sources: ["frospiren"] },
      { name: "Rucola", note: "", sources: ["frospiren", "haveglad"] },
      { name: "Gulerødder", note: "Et par rækker sidst i måneden giver små, friske gulerødder omkring midt november", sources: ["bolius", "haveglad"] },
      { name: "Salat & rødbede", note: "Salat sås midt i juli til ledig plads", sources: ["frospiren", "bolius", "norris"] },
      { name: "Spinat", note: "", sources: ["bolius", "haveglad"] },
      { name: "Kørvel, persille, koriander", note: "Kan overvintre på friland", sources: ["frospiren", "bolius"] },
      { name: "Radiser", note: "", sources: ["haveglad"] },
      { name: "Stangbønner", note: "Til udplantning efter løg — høstklar efter ca. 6 uger (sorten Fasold)", sources: ["norris"] }
    ],
    plantOut: [
      { name: "Ærter", note: "I tomme bede eller sås direkte", sources: ["frospiren"] }
    ],
    harvest: [
      { name: "Majs, rødbede, savoykål", note: "", sources: ["frospiren"] },
      { name: "Bønner, salat, glaskål, fennikel", note: "", sources: ["frospiren"] },
      { name: "Spiseløg", note: "", sources: ["bolius"] },
      { name: "Hvidløg", note: "Høstes fra juli og frem til september", sources: ["frospiren", "hvidlog"] },
      { name: "Tomater, agurker & squash", note: "Høst når de er modne", sources: ["haveglad"] }
    ],
    care: [
      { name: "Vanding", note: "Vand grundigt en gang imellem i stedet for lidt og ofte. Østjylland får mindre regn end resten af Jylland — vand i tørre perioder. Vand regelmæssigt i tørre perioder. Vand dybt tidligt eller sent på dagen. Krukker og højbede tørrer hurtigere — mærk efter under dækket", sources: ["bolius", "dmiOdder", "haveglad", "hokus"] },
      { name: "Eftergødning", note: "Kål, selleri og porre er sultne — giv langtidsvirkende gødning, men pas på med at overgøde i gamle, næringsrige haver", sources: ["bolius"] },
      { name: "Kartoffelskimmel", note: "Brune pletter der bliver sorte, især i fugtigt, stille vejr. Klip hele planten af og smid den ikke i kompost", sources: ["bolius"] },
      { name: "På ferie?", note: "Skygge, bunddække og skygget drivhus", sources: ["frospiren"] },
      { name: "Hvidløg", note: "Tag op og hæng til tørre", sources: ["frospiren"] },
      { name: "Jordbær", note: "Sæt potter under løberne", sources: ["frospiren"] },
      { name: "Kål med huller?", note: "Dæk med bionet/myggenet mod kålsommerfugl", sources: ["frospiren"] },
      { name: "Lad et par planter stå", note: "Til sommerfuglens larver", sources: ["frospiren"] },
      { name: "Hyp kartoflerne", note: "Første gang når toppen er et par cm over jorden; dæk ikke bladene", sources: ["haveglad"] },
      { name: "Kartofler i spand", note: "I krukker eller spande: fyld mere muld på, når toppen når kanten, i stedet for at hyppe", sources: ["dalby"] },
      { name: "Fjern syge blade", note: "Giv luft omkring tætte planter", sources: ["hokus"] },
      { name: "Gød asparges og bladselleri", note: "Aspargesbedet får kompost; bladselleri får gødningsvand", sources: ["norris"] },
      { name: "Planlæg sensommer-såninger", note: "Kål, salat, spinat og rucola", sources: ["hokus"] }
    ],
    prep: [
      { name: "Tomme bede", note: "Grøntgødning: blodkløver, honningurt, vintervikke", sources: ["frospiren"] },
      { name: "Dæk jorden mod udtørring", note: "Kompost, halm, tang eller blade. Opsaml regnvand hvor du kan", sources: ["jordensskole"] }
    ]
  },
  {
    month: "August",
    subtitle: "Høst og nye huller at fylde",
    sow: [
      { name: "Spinat", note: "Sået sidst i måneden kan den høstes næste forår. Tidligst 1. august — tidligere såning går ofte i stok. Plantes ud efter ærter, tidlig majs, løg eller hvidløg", sources: ["frospiren", "bolius", "haveglad", "norris", "hokus"] },
      { name: "Fennikel", note: "Lille portion for jævn høst", sources: ["frospiren"] },
      { name: "Feltsalat/vårsalat", note: "Sået sidst i måneden giver høst næste forår", sources: ["frospiren", "bolius"] },
      { name: "Rucola", note: "Til efterårshøst", sources: ["frospiren", "bolius", "norris", "hokus"] },
      { name: "Radisser", note: "Til efterårshøst", sources: ["bolius", "haveglad"] },
      { name: "Løg & forårsløg", note: "Flere frø/potte, plant ud i klumper. Løg til overvintring sås ca. 18. august, 2–3 frø pr. celle, og plantes ud sidst i oktober", sources: ["frospiren", "norris"] },
      { name: "Kørvel, persille, dild", note: "Bredbladet persille sået i august kan overvintre", sources: ["frospiren", "bolius", "fuglebjerg"] },
      { name: "Salat", note: "Peter Norris sår vintersalat ca. 10. august til mistbænk midt september", sources: ["frospiren", "bolius", "haveglad", "norris"] },
      { name: "Vintersalater", note: "", sources: ["haveglad"] },
      { name: "Asiatisk bladgrønt", note: "Mizuna sås ca. 25. august til mistbænk/drivhus; komatsuna sidst i august til udplantning efter tidlige tomater", sources: ["norris", "hokus"] }
    ],
    plantOut: [
      { name: "Jordbær", note: "Så tidligt på måneden som muligt, så de når at etablere sig til næste sommer", sources: ["frospiren", "bolius"] },
      { name: "Fennikel", note: "Forspiret i juni", sources: ["frospiren"] },
      { name: "Salat, kørvel, koriander, dild, persille", note: "Fylder tomme huller, overvintrer", sources: ["frospiren"] },
      { name: "Rødbede, spinat, rucola", note: "", sources: ["frospiren"] },
      { name: "Kål", note: "", sources: ["frospiren"] },
      { name: "Asiatisk bladgrønt", note: "", sources: ["frospiren"] },
      { name: "Bladgrønt & roer", note: "Godt tidspunkt til efterårsafgrøder, fx når kartofler og løg er høstet", sources: ["haveglad"] },
      { name: "Stikløg", note: "Sæt stikløg efter sommerferien — så har du friske løg til november", sources: ["fuglebjerg"] }
    ],
    harvest: [
      { name: "Løbende høst", note: "Tilså de bare pletter igen — jorden har bedst af ikke at ligge bar", sources: ["bolius"] },
      { name: "Hvidløg", note: "", sources: ["hvidlog"] },
      { name: "Kartofler & løg", note: "Når toppene visner. Tør løgene i tørvejr eller under tag. Også hvidløg, når toppen lægger sig", sources: ["haveglad", "hokus"] },
      { name: "Tomater, agurker & squash", note: "Høst jævnligt, så de ikke bliver overmodne", sources: ["haveglad"] }
    ],
    care: [
      { name: "Stiklinger af krydderurter", note: "Klip afblomstrede toppe og tag stiklinger af flerårige urter. Godt tidspunkt til stiklinger af urter og andre flerårige", sources: ["bolius", "jordensskole"] },
      { name: "Drivhusluft", note: "Åben dør og udtynd planter mod sygdom", sources: ["frospiren"] },
      { name: "Sylt overskuddet", note: "", sources: ["frospiren"] },
      { name: "Stop gødning", note: "Ellers når planterne ikke at afmodne skuddene før vinter", sources: ["haveglad"] },
      { name: "Gensåning", note: "Så eller plant på tomme pladser. Fjern færdige afgrøder og dæk jorden igen med kompost", sources: ["jordensskole", "hokus"] }
    ],
    prep: []
  },
  {
    month: "September",
    subtitle: "Den store høstmåned",
    sow: [
      { name: "Radisser", note: "I tomme huller/drivhus. I mistbænk eller drivhus", sources: ["frospiren", "norris"] },
      { name: "Salat", note: "Plant i drivhus når tomaterne er færdige. Salat til overvintring sås først i september", sources: ["frospiren", "norris"] },
      { name: "Spinat", note: "Sidst i måneden — til høst næste forår. Også vinterspinat. Til overvintring i drivhus og mistbænk, udplantes oktober–november", sources: ["frospiren", "bolius", "haveglad", "norris"] },
      { name: "Feltsalat/vårsalat", note: "Sidst i måneden — til høst næste forår", sources: ["frospiren", "bolius", "haveglad"] },
      { name: "Rucola", note: "Sidste udkald", sources: ["frospiren"] },
      { name: "Hvidløg", note: "Sættes 2× løgets dybde. Kilderne er uenige om timingen: fra slut september, eller først midt oktober–midt november", sources: ["frospiren", "bolius", "hvidlog"] },
      { name: "Roer", note: "", sources: ["haveglad"] },
      { name: "Spidskål & broccoli", note: "Til overvintring: sås midt i september, overvintrer i potter i drivhuset og plantes ud i marts", sources: ["norris"] }
    ],
    plantOut: [
      { name: "Rucola", note: "", sources: ["frospiren"] },
      { name: "Salat", note: "Fylder tomme huller", sources: ["frospiren"] },
      { name: "Spinat", note: "", sources: ["frospiren"] },
      { name: "Kål", note: "", sources: ["frospiren"] },
      { name: "Asiatisk bladgrønt", note: "Mizuna, kinakål, pak choi", sources: ["frospiren"] },
      { name: "Kørvel, koriander, dild, persille", note: "Overvintrer", sources: ["frospiren"] }
    ],
    harvest: [
      { name: "Selleri & porrer", note: "", sources: ["bolius"] },
      { name: "Bønner & majs", note: "", sources: ["bolius"] },
      { name: "Græskar", note: "", sources: ["bolius", "jordensskole"] },
      { name: "Hvidkål, rødkål, grønkål", note: "", sources: ["bolius", "jordensskole"] },
      { name: "Hvidløg", note: "Sidste del af hvidløgshøsten", sources: ["hvidlog"] },
      { name: "Tomater, chili & rodfrugter", note: "", sources: ["jordensskole"] }
    ],
    care: [
      { name: "Sylt overskuddet", note: "August/september giver ofte overflod", sources: ["frospiren"] },
      { name: "Saml frø", note: "Saml frø til næste sæson og tag stiklinger", sources: ["jordensskole"] },
      { name: "Sidste forspiring", note: "Du kan stadig forspire etårige til vintergrønt", sources: ["jordensskole"] },
      { name: "Purløg i potter", note: "Grav purløg op og sæt i potter, så du kan tage dem ind i løbet af vinteren", sources: ["norris"] }
    ],
    prep: [
      { name: "Grøntgødning", note: "Så grøntgødning i takt med at bedene høstes. Fx honningurt, boghvede, blodkløver, hvidkløver, fodervikke, lucerne eller solsikke", sources: ["bolius", "haveglad"] },
      { name: "Bar jord?", note: "Læg kompost/husdyrgødning, klar til foråret", sources: ["frospiren"] },
      { name: "Saml kompost og blade", note: "Start opsamling til jordforbedring", sources: ["hokus"] },
      { name: "Plads til overvintrende afgrøder", note: "Fx porrer og grønkål", sources: ["hokus"] }
    ]
  },
  {
    month: "Oktober",
    subtitle: "Pas på den første frost",
    sow: [
      { name: "Hestebønner", note: "Overvintrer, kommer op til foråret. Vinterhårde sorter sås ca. 5 cm dybt — giver tidlig høst i juni og færre sorte bladlus", sources: ["frospiren", "klimaOkt"] },
      { name: "Hvidløg", note: "Hovedtidspunkt: fra midt oktober til midt november. Fed med 12–15 cm mellemrum, spidsen opad. Lune jord giver rødder før frosten. Brug læggeløg, ikke supermarkedshvidløg. Plant spidsen op ca. 5 cm dybt med 10–15 cm mellem fed og 25–30 cm mellem rækker; dæk let med blade eller halm. På tung lerjord: let hævede bede", sources: ["frospiren", "hvidlog", "klimaOkt", "norris", "hokus"] },
      { name: "Løg", note: "Sås og overvintrer i drivhuset. Vinterfaste sætteløg plantes først i oktober og giver løg i juni–juli", sources: ["frospiren", "klimaOkt"] },
      { name: "Vintersalater", note: "Vårsalat kan sås på friland til midt oktober. Spinat og asiatisk bladgrønt i drivhus; rucola og radiser i uopvarmet drivhus først i måneden", sources: ["haveglad", "klimaOkt"] },
      { name: "Overvintrende blomkål", note: "Sås inde ved 20°, overvintrer i potter i drivhuset og plantes ud i marts under plast", sources: ["norris"] },
      { name: "Rucola", note: "Kan sås til oktober — står til foråret i en mild vinter", sources: ["fuglebjerg"] }
    ],
    plantOut: [
      { name: "Løg & forårsløg", note: "Stikløg eller forspirede planter", sources: ["frospiren"] },
      { name: "Salat", note: "Drivhus/mistbænk for vinterhøst", sources: ["frospiren"] },
      { name: "Spinat, feltsalat/vårsalat, rucola", note: "Giver rigtig høst til foråret", sources: ["frospiren"] },
      { name: "Broccoli & spidskål", note: "", sources: ["frospiren"] },
      { name: "Kørvel, koriander, dild, persille", note: "Overvintrer", sources: ["frospiren"] }
    ],
    harvest: [
      { name: "Sidste varmeafgrøder", note: "Høst græskar og squash før frost og lad dem hærde et par uger lunt og tørt. Grønne tomater kan eftermodne inde i en kasse med et æble. Kartofler skal op nu", sources: ["klimaOkt", "hokus"] }
    ],
    care: [
      { name: "Første frost", note: "Kommer typisk i første halvdel af oktober, tidligst inde i landet — haver inde i landet og i lavninger kan få frost før kysten. Stopper bønner, squash, selleri og fennikel", sources: ["frospiren", "dmi", "dmiOdder"] },
      { name: "Frostbeskyttelse", note: "Dæk grøntsager der står tilbage med blade eller gran. Lad frosne grøntsager tø langsomt op — gerne på stedet", sources: ["bolius"] },
      { name: "Rodfrugter i jorden", note: "Gulerødder, pastinak og rødbeder kan blive stående under et tykt lag halm eller blade. Pastinak, jordskokker, grønkål og rosenkål bliver sødere efter frost", sources: ["klimaOkt"] },
      { name: "Flerårige", note: "Klip visne asparges ned og læg kompost; fjern visne rabarberblade; klip jordbærudløbere; dæk artiskokkens krone. Del rabarber hvert 5.–6. år", sources: ["klimaOkt"] }
    ],
    prep: [
      { name: "Efterårsgravning", note: "Især en fordel på leret jord — frosten slår klumperne i stykker. Det belaster dog jordlivet. Tung lerjord kan graves groft; let sandjord bør ikke graves — læg kompost og dække ovenpå", sources: ["bolius", "dmiOdder", "klimaOkt"] },
      { name: "Ryd bedene", note: "For færdige afgrøder og læg kompost ud. Spred kompost nu, men vent med at blande den ned til foråret. Fjern syge rester af tomater, kartofler og squash", sources: ["frospiren", "bolius", "haveglad", "klimaOkt", "hokus"] },
      { name: "Dæk jorden", note: "Jorden bør være dækket hen over vinteren. Jorden må aldrig ligge bar: blade, halm, kompost eller grøngødning", sources: ["jordensskole", "klimaOkt", "hokus"] },
      { name: "Grøngødning", note: "Vinterrug og vintervikke kan sås til midt oktober", sources: ["klimaOkt"] },
      { name: "Gødning", note: "Ingen kvælstof om efteråret. Kompost 2–5 cm på tomme bede; formuldet husdyrgødning til næste års grådige afgrøder. Kalk kun efter jordprøve — og ikke samtidig med møg", sources: ["klimaOkt"] },
      { name: "Drivhus, redskaber og vand", note: "Ryd og vask drivhuset; tøm slanger og udendørshaner før frost; rens og slib redskaber", sources: ["klimaOkt", "hokus"] }
    ]
  },
  {
    month: "November & December",
    subtitle: "Stille måneder — og erfaringshøst",
    sow: [
      { name: "Ærter", note: "Kan lykkes i drivhuset, gerne imellem salaten. Peter Norris sår hårdføre ærter i mistbænk midt november", sources: ["frospiren", "norris"] }
    ],
    plantOut: [
      { name: "Hvidløg", note: "Kan stadig nå i jorden frem til ca. midt november. Vand de første 3 uger, hvis det ikke regner", sources: ["hvidlog", "norris"] }
    ],
    harvest: [
      { name: "Porre", note: "", sources: ["bolius", "haveglad"] },
      { name: "Grønkål", note: "", sources: ["bolius", "haveglad"] },
      { name: "Rosenkål", note: "", sources: ["bolius", "haveglad"] },
      { name: "Jordskokker", note: "", sources: ["frospiren", "bolius", "haveglad"] },
      { name: "Persille", note: "", sources: ["bolius", "haveglad"] },
      { name: "Peberrod", note: "", sources: ["bolius", "haveglad"] },
      { name: "Timian", note: "", sources: ["bolius", "haveglad"] },
      { name: "Spinat, salat, kål", note: "", sources: ["frospiren"] },
      { name: "Alt det gemte \"på lager\"", note: "", sources: ["frospiren"] }
    ],
    care: [
      { name: "Opbevaring", note: "De fleste grøntsager: mørkt, køligt og ikke for tørt. Løg: tørt og køligt. Tjek jævnligt for gnavere, råd og svamp", sources: ["bolius"] },
      { name: "Beskyt rodfrugter i jorden", note: "Gulerødder, jordskokker, knoldselleri m.fl.: dæk med vintermåtte eller et tykt lag blade eller halm", sources: ["haveglad"] },
      { name: "Rødbeder og blegselleri", note: "Tag dem op og opbevar køligt i fugtigt sand", sources: ["haveglad"] },
      { name: "Vinterbeskyttelse", note: "Granris, blade eller fiberdug over udsatte planter. Flyt sarte krukker i læ og tjek drænet", sources: ["hokus"] }
    ],
    prep: [
      { name: "Notér årets erfaringer", note: "Skriv ned hvor alt har stået, skadedyrsangreb og hvilke bede der fik gødning. Gode sorter, tidspunkter, snegle og tørke", sources: ["bolius", "hokus"] },
      { name: "Sædskifte", note: "Helst 4–5 år før samme afgrøde står samme sted igen — især vigtigt for kartofler (kartoffelål). Ærter og bønner efterlader kvælstof i jorden — følg dem med afgrøder, der kan udnytte det. Planlæg bedskifte og såplan for næste år", sources: ["bolius", "haveselskab", "hokus"] },
      { name: "Bestil frø", note: "Til næste sæson — pas på ikke at blive for optimistisk", sources: ["frospiren"] },
      { name: "Læs en havebog", note: "Eller find inspiration på bloggen", sources: ["frospiren"] },
      { name: "Put haven", note: "Dæk bedene med blade, kompost eller halm. Lav haveplan og bestil frø", sources: ["jordensskole", "idenyt"] },
      { name: "Observer haven", note: "Gå en runde og se på lys, skygge og læ. Bind løse ting fast før vinterstorme", sources: ["hokus"] }
    ]
  }
];

// Plant profiles. match/exact/exclude link a profile to the monthly tasks.
const PLANTS = [
  {
    name: "Tomat",
    group: "drivhus",
    method: "Forspires inde",
    sow: "Forspir indendørs lunt og lyst i marts (Haveglad nævner februar–maj). Står den for varmt og mørkt, bliver den lang og rangled. Peter Norris sår tidlige tomater ca. 5. februar og frilandstomater tidligst 15. april.",
    out: "Drivhus omkring mors dag, når nætterne er min. 8–10°. Friland i juni — giv støtte.",
    time: "Høst fra juli.",
    after: "Når tomaterne er færdige i drivhuset: plant salat til vinterhøst. Efter tidlige tomater i mistbænk/drivhus: komatsuna eller mizuna.",
    match: ["tomat"],
    sources: ["frospiren", "haveglad", "idenyt", "norris", "klimaMar", "hokus"]
  },
  {
    name: "Chili & peberfrugt",
    group: "drivhus",
    method: "Forspires inde",
    sow: "Chili fra januar–februar, peberfrugt fra februar–marts. Varmemåtte + vækstlys, ca. 18–20°. Peter Norris sår peber midt/sidst i januar og potter om 3–4 gange.",
    out: "Vænnes langsomt til drivhuset — nogle timer ad gangen ved ca. 16–18°. I drivhus/mistbænk midt maj; peberfrugt på friland fra midt juni.",
    time: "Peberfrugt: høst juli–oktober.",
    after: "",
    match: ["chili", "peberfrugt", "peber frugt"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "hokus", "klimaMar"]
  },
  {
    name: "Agurk & melon",
    group: "drivhus",
    method: "Forspires inde",
    sow: "Forspir i vindueskarmen i april (drivhusagurk). Frilandsagurk forspires først i maj. Første hold agurker sås samtidig med frilandstomaterne (midt april).",
    out: "Drivhus omkring fars dag; friland midt juni — og først når jorden er 10°.",
    time: "Høst fra juli.",
    after: "",
    match: ["agurk", "melon"],
    sources: ["frospiren", "haveglad", "norris"]
  },
  {
    name: "Squash",
    group: "frugt",
    method: "Forspires inde",
    sow: "Forspir i april–maj. Courgetter sås sidst i april til udplantning sidst i maj under fiberdug — skal de efter nye kartofler, så tidligst 25. maj.",
    out: "Midt/slut maj i et godt gødet bed. Dæk ved nattefrost.",
    time: "Høst fra juli til første frost. Høst før frost og hærd et par uger lunt og tørt før lagring.",
    after: "Første frost slutter sæsonen — ryd bedet og læg kompost.",
    match: ["squash"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "klimaOkt"]
  },
  {
    name: "Græskar",
    group: "frugt",
    method: "Inde eller direkte",
    sow: "Forspir i april, eller så i maj når jorden er 10°.",
    out: "Midt/slut maj i et godt gødet bed.",
    time: "Høst september–oktober, før frost. Hærd et par uger lunt og tørt før lagring.",
    after: "Så grøntgødning, når bedet er ryddet.",
    match: ["græskar"],
    sources: ["frospiren", "haveglad", "bolius", "jordensskole", "klimaOkt"]
  },
  {
    name: "Majs",
    group: "frugt",
    method: "Forspires inde",
    sow: "Forspir inde fra ca. 15. april i root-trainers; nyt hold ca. hver 3. uge. Sidste hold ca. 20. juni.",
    out: "Juni. Plant i blokke, ikke rækker — majs er vindbestøvet.",
    time: "Høst juli–september.",
    after: "Efter tidlig majs: spinat (sås fra 1. august). Ellers grøntgødning.",
    match: ["majs"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "hokus"]
  },
  {
    name: "Solsikker",
    method: "Inde eller direkte",
    sow: "Forspir inde i april eller så direkte når jorden er varm, fra midten af maj.",
    out: "Efter frostfare, midt/slut maj. Giv dem sol, læ og støtte til de høje sorter.",
    time: "Blomstrer typisk juli–september.",
    after: "",
    match: ["solsik"],
    sources: ["egen"]
  },
  {
    name: "Vildblomster",
    method: "Sås direkte",
    sow: "Så direkte på bar, næringsfattig jord i april–maj, eller om efteråret. Tryk frøene let ned og hold fugtigt til de spirer.",
    out: "",
    time: "Blomstrer typisk juni–september og tiltrækker bier og andre nyttedyr.",
    after: "",
    match: ["vildblomst"],
    sources: ["egen"]
  },
  {
    name: "Bønner (busk & stang)",
    group: "blad",
    method: "Inde eller direkte",
    sow: "Forspir i root-trainers i maj, eller så direkte når jorden er ca. 15° — typisk slut maj/start juni (tjek frøposen; nogle sorter klarer sig med mindre). Udblød frøene en time først. Kan sås frem til juni — læg dem i vand nogle timer. Stangbønner ca. 12. juni til udplantning efter tidlige kartofler.",
    out: "Slut maj–juni. Stangbønner skal have noget at klatre op ad.",
    time: "Høst juli–september. Stangbønner sået først i juli er høstklar efter ca. 6 uger (Peter Norris, sorten Fasold).",
    after: "Bønner efterlader kvælstof — følg op med en sen afgrøde, der kan udnytte det. Peter Norris planter buskbønner efter kartofler og stangbønner efter løg.",
    match: ["bønner", "buskbønner"],
    exclude: ["hestebønner"],
    sources: ["frospiren", "boliusKost", "bolius", "haveglad", "haveselskab", "norris", "fuglebjerg", "hokus"]
  },
  {
    name: "Hestebønner",
    group: "blad",
    method: "Inde eller direkte",
    sow: "Forspir inde midt februar–midt marts (Peter Norris: valsk bønne) eller så direkte fra marts. Vinterhårde sorter sås ca. 5 cm dybt i oktober og overvintrer.",
    out: "Marts under fiberdug — eller mellem kartoflerne midt april.",
    time: "Efterårssåede: høst i juni, med færre sorte bladlus end forårssåede.",
    after: "Efterlader kvælstof i jorden.",
    match: ["hestebønner"],
    sources: ["frospiren", "haveselskab", "norris", "klimaOkt", "klimaMar", "fuglebjerg"]
  },
  {
    name: "Ærter",
    group: "blad",
    method: "Inde eller direkte",
    sow: "Forspir i root-trainers fra midt februar, eller så direkte fra marts–april. Nyt hold ca. hver 3. uge; sidste hold først i juni. Hårdføre sorter kan sås i mistbænk midt november.",
    out: "Forspirede i marts i mistbænk eller under dække; ellers april på friland med fiberdug.",
    time: "Høst fra juni.",
    after: "Efterlader kvælstof. Plant fx spinat efter ærterne (sås fra 1. august).",
    match: ["ærter"],
    sources: ["frospiren", "haveglad", "bolius", "haveselskab", "norris", "klimaMar", "hokus", "klimaOkt"]
  },
  {
    name: "Kartofler",
    variants: ["Sava", "Solist"],
    group: "kartoffel",
    method: "Lægges/sættes",
    sow: "Forspir i februar–marts i æggebakker, lyst og halvvarmt (ca. 15°), med flest spirer opad. Peter Norris stiller dem til forspiring midt i februar og giver bedet en håndfuld træaske pr. m².",
    out: "Tidlige midt/slut marts under fiberdug; ellers fra april. Læg med ugers mellemrum for lang høst.",
    time: "Ca. 60–80 dage. Kartofler skal være taget op i oktober.",
    after: "Kål, når de første kartofler er taget op. Peter Norris planter porrer, blomkål/spidskål/rødkål, broccoli, stangbønner og buskbønner efter tidlige kartofler. I august: bladgrønt eller roer.",
    match: ["kartof"],
    sources: ["frospiren", "bolius", "idenyt", "haveglad", "dalby", "norris", "klimaOkt"]
  },
  {
    name: "Gulerødder",
    group: "rod",
    method: "Direkte",
    sow: "Altid direkte fra april, evt. blandet med radisefrø. Sidste hold sidst i juli giver små gulerødder i november. I krukker: stil dem højt — gulerodsfluen sværmer tæt ved jorden. Til vinteropbevaring: sås fra sidst i maj til først i juni.",
    out: "—",
    time: "Kan blive i jorden over vinteren under et tykt lag halm eller blade.",
    after: "",
    match: ["gulerod", "gulerød"],
    sources: ["frospiren", "bolius", "haveglad", "dalby", "norris", "klimaMar", "hokus", "klimaOkt"]
  },
  {
    name: "Rødbede & bladbede",
    group: "rod",
    method: "Inde eller direkte",
    sow: "Tidlige: 3–4 frø pr. celle i februar, ud under plast sidst i marts. Ellers inde fra 23. marts eller direkte april–juli — mange hold kan nås. Kan også forkultiveres i juni til udplantning som efterafgrøde.",
    out: "Marts–maj under fiberdug, i klumper.",
    time: "Høst juli–oktober.",
    after: "Lad nogle stå og vokse videre, mens du høster de største. Lad bladbeder stå til foråret — de friske blade kommer i marts.",
    match: ["rødbede", "bladbede"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "fuglebjerg", "hokus", "klimaOkt"]
  },
  {
    name: "Pastinak",
    group: "rod",
    method: "Direkte",
    sow: "Direkte marts–maj. Frøene er meget langsomme til at spire.",
    out: "—",
    time: "Høst november–marts; kan stå i jorden under halm og bliver sødere efter frost.",
    after: "Står vinteren over.",
    match: ["pastinak"],
    sources: ["frospiren", "haveglad", "klimaMar", "klimaOkt"]
  },
  {
    name: "Radisser",
    group: "rod",
    method: "Direkte",
    sow: "I drivhus/mistbænk fra februar; direkte ude fra marts når jorden er ca. 10°, og så løbende hele sæsonen. Igen i september i mistbænk eller drivhus.",
    out: "—",
    time: "Høst fra maj.",
    after: "Så et nyt hold.",
    match: ["radis"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "klimaMar", "klimaOkt"]
  },
  {
    name: "Salat",
    group: "frugt",
    method: "Inde eller direkte",
    sow: "Kan forspires allerede fra januar–februar — spirer ved 4°. Ude fra marts når jorden er ca. 10°. Så i potter hver 2.–3. uge. Vintersalat sås ca. 10. august til mistbænk midt september; salat til overvintring først i september.",
    out: "Drivhus eller friland under fiberdug fra marts.",
    time: "Høst fra juni.",
    after: "Plant nye salater i hullerne, når du høster. Peter Norris planter majs og basilikum efter tidlig salat.",
    match: ["salat"],
    exclude: ["feltsalat", "vårsalat"],
    sources: ["frospiren", "haveglad", "norris", "klimaMar", "hokus"]
  },
  {
    name: "Spinat",
    group: "frugt",
    method: "Direkte",
    sow: "Direkte fra marts, eller inde i februar til udplantning i marts. Igen fra 1. august (tidligere går i stok) og til overvintring i september/oktober.",
    out: "—",
    time: "Høst fra maj.",
    after: "Efter tidlig spinat: kål (blomkål, rødkål, savoy, spidskål) eller buskbønner.",
    match: ["spinat"],
    sources: ["frospiren", "bolius", "haveglad", "norris", "klimaMar", "hokus", "klimaOkt"]
  },
  {
    name: "Rucola",
    group: "blad",
    method: "Direkte",
    sow: "Direkte fra marts (i drivhus) og igen juli–oktober for høst i efteråret og foråret. Sår sig selv, hvis nogle får lov at blomstre.",
    out: "September for forspirede.",
    time: "",
    after: "",
    match: ["rucola"],
    sources: ["frospiren", "haveglad", "klimaMar", "norris", "fuglebjerg", "hokus", "klimaOkt"]
  },
  {
    name: "Asiatisk bladgrønt (pak choi, mizuna)",
    group: "blad",
    method: "Inde eller direkte",
    sow: "Pak choi og mizuna kan sås i drivhus fra marts. Udendørs fra juli. Mizuna ca. 25. august og komatsuna sidst i august til drivhus/mistbænk.",
    out: "August–september i ledige bede.",
    time: "",
    after: "Kan sås samme år efter tidlig spidskål, knudekål eller radiser. Fyld dybe riller med kompost og så i den — kålrødder i jorden kan hæmme spiringen. Komatsuna/mizuna kan plantes, når tomaterne i drivhuset ryddes.",
    match: ["asiatisk", "pak choi", "mizuna", "kinakål"],
    sources: ["frospiren", "haveselskabAsia", "klimaMar", "norris", "hokus", "klimaOkt"]
  },
  {
    name: "Hvid- & rødkål",
    group: "blad",
    method: "Forspires inde",
    sow: "Tidlige sorter forspires i februar; ellers marts–maj. Rødkål til efter tidlige kartofler sås ca. 15. april.",
    out: "Slut maj — eller i bedet, når de første kartofler er taget op.",
    time: "Høst september.",
    after: "",
    match: ["hvidkål", "rødkål", "rød-/hvidkål", "tidlig kål"],
    exact: ["kål"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "klimaMar"]
  },
  {
    name: "Spidskål",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir ca. 15. april til udplantning efter tidlige kartofler. Til overvintring: så midt i september, overvintrer i drivhus og plantes ud i marts.",
    out: "Kan også plantes ud i oktober.",
    time: "",
    after: "Efter tidlig spidskål kan du så asiatisk bladgrønt samme år.",
    match: ["spidskål"],
    exact: ["kål"],
    sources: ["frospiren", "haveglad", "haveselskabAsia", "norris"]
  },
  {
    name: "Broccoli",
    group: "blad",
    method: "Forspires inde",
    sow: "Hovedafgrøde sås ca. 15. april til udplantning sidst i maj — må ikke stå for varmt. Til efterår senest 15. juni. Til overvintring midt september.",
    out: "Sidst i maj; efterårsbroccoli efter kartoflerne.",
    time: "",
    after: "",
    match: ["broccoli"],
    exact: ["kål"],
    sources: ["frospiren", "norris", "klimaMar"]
  },
  {
    name: "Blomkål",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir i marts (tidlig) eller maj–juni. Overvintrende blomkål sås inde ved 20° i oktober og plantes ud i marts under plast.",
    out: "Forårssåede ofte først efter 1. juni, fx efter tidlige kartofler.",
    time: "",
    after: "",
    match: ["blomkål"],
    exact: ["kål"],
    sources: ["frospiren", "haveglad", "norris"]
  },
  {
    name: "Grønkål",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir i potter i marts. Palmekål kan sås om sommeren og spises vinteren igennem.",
    out: "Maj.",
    time: "Høst hele vinteren — sødere efter frost.",
    after: "Står vinteren over.",
    match: ["grønkål"],
    exact: ["kål"],
    sources: ["bolius", "haveglad", "fuglebjerg", "klimaOkt", "klimaMar"]
  },
  {
    name: "Palmekål",
    group: "blad",
    method: "Sås sommer",
    sow: "Sås om sommeren (juni) og spises vinteren igennem.",
    out: "Plantes ud når planterne er store nok, om sommeren.",
    time: "Høst hele vinteren — sødere efter frost.",
    after: "Står vinteren over.",
    match: ["palmekål"],
    sources: ["fuglebjerg"]
  },
  {
    name: "Rosenkål",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir marts–maj, eller så udendørs april–maj.",
    out: "",
    time: "Høst november–januar — sødere efter frost.",
    after: "Står vinteren over.",
    match: ["rosenkål"],
    exact: ["kål"],
    sources: ["haveglad", "bolius", "klimaOkt"]
  },
  {
    name: "Savoykål",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir i maj–juni. Vinterhårdfør savoy ca. 1. juni og andre ca. 26. juni — senere såning når måske ikke faste hoveder til midt oktober.",
    out: "Juli.",
    time: "Høst fra juli.",
    after: "",
    match: ["savoykål"],
    exact: ["kål"],
    sources: ["frospiren", "haveglad", "norris"]
  },
  {
    name: "Glaskål (kålrabi)",
    group: "blad",
    method: "Forspires inde",
    sow: "Tidlige forspires i februar; nyt hold i juni.",
    out: "Juli.",
    time: "Høst fra juli.",
    after: "",
    match: ["glaskål", "kålrabi"],
    sources: ["frospiren"]
  },
  {
    name: "Porre",
    group: "blad",
    method: "Forspires inde",
    sow: "Forspir fra januar–marts. Sommer- og efterårsporrer midt marts, vinterporrer ca. 10. april. Skal være mindst 25 cm før udplantning.",
    out: "Juni, gerne efter tidlige kartofler — i klumper, så du kan høste de største løbende.",
    time: "Høst september til vinter.",
    after: "Vinterporrer står vinteren over.",
    match: ["porre"],
    sources: ["frospiren", "idenyt", "haveglad", "bolius", "norris", "klimaMar", "klimaOkt"]
  },
  {
    name: "Løg",
    group: "rod",
    method: "Inde eller direkte",
    sow: "Forspir fra januar–februar med 2–4 frø pr. celle, eller sæt løgsæt i marts. Til overvintring: så ca. 18. august eller sæt vinterfaste sætteløg først i oktober.",
    out: "April–maj i klumper. Overvintrende ud sidst i oktober. Stikløg efter sommerferien giver løg til november.",
    time: "Høst juli–august, når toppen visner. Vinterløg giver løg i juni–juli.",
    after: "Peter Norris planter savoykål og stangbønner efter løg. I august: bladgrønt eller roer.",
    match: ["løg,", "løg &", "stikløg", "spiseløg"],
    exact: ["løg"],
    sources: ["frospiren", "haveglad", "idenyt", "bolius", "norris", "klimaOkt", "fuglebjerg"]
  },
  {
    name: "Forårsløg & pibeløg",
    group: "rod",
    method: "Inde eller direkte",
    sow: "Forspir fra januar, eller så direkte marts–maj. Flere frø pr. potte. Peter Norris sår forårsløg først i februar til udplantning i marts.",
    out: "April–maj, i klumper.",
    time: "",
    after: "",
    match: ["forårsløg", "pibeløg"],
    sources: ["frospiren", "haveglad", "norris"]
  },
  {
    name: "Hvidløg",
    group: "rod",
    method: "Lægges/sættes",
    sow: "Sæt fed om efteråret — oktober til midt november (Bolius' månedsguide siger fra slut september). Brug læggeløg, ikke supermarkedshvidløg. Spidsen op ca. 5 cm dybt, 10–15 cm mellem fed, 25–30 cm mellem rækker; dæk let med blade eller halm. På tung lerjord: let hævede bede.",
    out: "Vand de første 3 uger, hvis det ikke regner.",
    time: "Høst juli–september året efter.",
    after: "Peter Norris planter majs efter hvidløg. Feltsalat kan vokse omkring hvidløgene om efteråret.",
    match: ["hvidløg"],
    sources: ["hvidlog", "bolius", "frospiren", "haveglad", "klimaOkt", "norris", "hokus"]
  },
  {
    name: "Selleri (blad & knold)",
    group: "rod",
    method: "Forspires inde",
    sow: "Forspir sidste halvdel af marts, i overfladen — skal næsten ikke dækkes. Ikke for tidligt ud — kulde kan få den i stok.",
    out: "Sidst i maj.",
    time: "Høst september; første frost stopper den.",
    after: "Knoldselleri kan dækkes med halm i jorden; blegselleri tages op i november.",
    match: ["selleri"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "klimaMar"]
  },
  {
    name: "Fennikel",
    group: null,
    method: "Forspires inde",
    sow: "Så lidt ad gangen fra marts til august — en lang række bliver træet, før du når at spise den.",
    out: "Fra august (forspiret i juni).",
    time: "Høst fra juli; første frost stopper den.",
    after: "",
    match: ["fennikel"],
    sources: ["frospiren", "haveglad", "fuglebjerg"]
  },
  {
    name: "Persille",
    group: "rod",
    method: "Inde eller direkte",
    sow: "Forspir februar–marts, eller så direkte marts–august. Spirer bedst uden fiberdug. Bredbladet persille sået i august kan overvintre og skyder igen i april.",
    out: "April–maj.",
    time: "Høst maj–september; overvintrer og kan høstes om vinteren.",
    after: "",
    match: ["persille"],
    exclude: ["persillerod"],
    sources: ["frospiren", "haveglad", "bolius", "norris", "klimaMar", "fuglebjerg"]
  },
  {
    name: "Dild",
    group: null,
    method: "Direkte",
    sow: "Forspir inde i marts, eller så direkte fra marts–april.",
    out: "April.",
    time: "",
    after: "",
    match: ["dild"],
    sources: ["frospiren", "bolius", "norris", "klimaMar", "hokus"]
  },
  {
    name: "Kørvel & koriander",
    group: "frugt",
    method: "Inde eller direkte",
    sow: "Forspir i marts, eller så direkte. Sås igen juli–august — overvintrer.",
    out: "April–maj; sensommersåede august–oktober.",
    time: "Høst hele vinteren og foråret.",
    after: "Koriander mellem agurkerne holder spindemider væk. Kørvel sår sig selv — giv den et hjørne, så har du kørvel året rundt.",
    match: ["kørvel", "koriander"],
    sources: ["frospiren", "fuglebjerg"]
  },
  {
    name: "Basilikum",
    group: "drivhus",
    method: "Forspires inde",
    sow: "Forspir i april–maj (Peter Norris: ikke før starten af maj).",
    out: "Drivhus fra maj; friland i juni ved tomaterne — eller efter tidlig salat/løg.",
    time: "",
    after: "",
    match: ["basilikum"],
    sources: ["frospiren", "norris"]
  },
  {
    name: "Feltsalat/vårsalat",
    group: null,
    method: "Direkte",
    sow: "Direkte august til midt oktober.",
    out: "—",
    time: "Høst hele vinteren og som små rosetter i marts — derefter går den i blomst.",
    after: "Sår sig selv — giv den sit eget bed.",
    match: ["feltsalat", "vårsalat"],
    sources: ["frospiren", "bolius", "haveglad", "fuglebjerg", "klimaOkt"]
  },
  {
    name: "Artiskok",
    group: "flerarig",
    method: "Forspires inde",
    sow: "Forspir i februar i en lys, lun vindueskarm — så blomstrer den samme år.",
    out: "Juni, på en fast plads.",
    time: "",
    after: "Kan overvintre i milde vintre. Dæk kronen med tørre blade eller halm om efteråret.",
    match: ["artiskok"],
    sources: ["frospiren", "haveglad", "klimaOkt"]
  },
  {
    name: "Asparges",
    group: "flerarig",
    method: "Flerårig",
    sow: "Plant i april.",
    out: "—",
    time: "Høst maj.",
    after: "Klip visne stængler ned om efteråret og læg kompost; gød med kompost i juli.",
    match: ["asparges"],
    sources: ["frospiren", "bolius", "klimaOkt", "norris"]
  },
  {
    name: "Rabarber",
    group: "flerarig",
    method: "Flerårig",
    sow: "",
    out: "—",
    time: "Høst fra maj. En sort spand over planten i marts giver tidlige stængler.",
    after: "Fjern visne blade om efteråret. Del planten hvert 5.–6. år.",
    match: ["rabarber"],
    sources: ["frospiren", "bolius", "klimaOkt"]
  },
  {
    name: "Jordbær",
    group: "flerarig",
    method: "Flerårig",
    sow: "Lav nye planter af udløbere i juli. Klip gamle blade af i april. Kan stadig plantes først i oktober — men jo tidligere, jo bedre. Fjern visne blade i april.",
    out: "Så tidligt i august som muligt, så de når at etablere sig.",
    time: "Bær sommeren efter. Flyt bedet hvert 2.–3. år.",
    after: "",
    match: ["jordbær"],
    sources: ["frospiren", "bolius", "klimaOkt", "norris"]
  },
  {
    name: "Jordskokker",
    group: "flerarig",
    method: "Lægges/sættes",
    sow: "Læg i april. Spreder sig hurtigt — læg dem gerne i en spand.",
    out: "—",
    time: "Høst om vinteren, når jorden ikke er frossen. Bliver sødere efter frost. Kan deles og flyttes i oktober.",
    after: "",
    match: ["jordskok"],
    sources: ["frospiren", "bolius", "haveglad", "klimaOkt"]
  }
];
