import type { CulturePeriod, CultureRegion } from "@/lib/lineforge/types/library"

function p(
  name: string,
  era: string,
  aesthetics: string[],
  architecture: string[],
  clothing: string[],
  weapons: string[],
  motifs: string[],
  colors: string[],
  designNotes: string[],
  imageUrl?: string
): CulturePeriod {
  return { name, era, imageUrl, aesthetics, architecture, clothing, weapons, motifs, colors, designNotes }
}

export const cultureLibrary: CultureRegion[] = [
  {
    id: "japan",
    name: "Japan",
    region: "East Asia",
    icon: "🇯🇵",
    periods: [
      p("Heian Period", "794–1185 CE", ["refined court elegance", "asymmetry", "seasonal allusion"], ["shinden pavilions", "raised floors", "garden ponds"], ["jūnihitoe layers", "lacquered hair", "straight robes"], ["tachi", "bow", "court dagger"], ["clouds", "cranes", "cherry blossom", "flowing water"], ["safflower red", "indigo", "gold leaf", "pale green"], ["Suggest rather than display. Layers of cloth are the architecture of the body."]),
      p("Sengoku Period", "1467–1615 CE", ["martial utility", "clan identity", "lacquer and iron"], ["castles on stone bases", "steep gables", "watch towers"], ["armor over kimono", "sashimono banners", "jinbaori surcoats"], ["katana", "yari", "tanegashima"], ["mon crests", "dragonflies", "waves"], ["black lacquer", "vermillion", "rust iron"], ["Heraldry is graphic and flat. Armor is a designed silhouette, not chrome."]),
      p("Edo Period", "1603–1868 CE", ["urban print culture", "striped merchants", "controlled luxury"], ["machiya townhouses", "noren curtains", "wood grids"], ["kosode", "obi knots", "geta"], ["wakizashi", "police jitte"], ["ukiyo-e crops", "mount fuji", "carp"], ["indigo", "pale ochres", "black"], ["Everyday objects carry graphic taste. Empty space is a value."]),
    ],
  },
  {
    id: "china",
    name: "China",
    region: "East Asia",
    icon: "🇨🇳",
    periods: [
      p("Tang Dynasty", "618–907 CE", ["cosmopolitan court", "full silhouettes", "west-facing trade"], ["pagodas", "bracketed eaves", "wide courtyards"], ["round-neck robes", "sashes", "high shoes"], ["jian", "dao", "composite bow"], ["peonies", "cloud bands", "flying apsaras"], ["vermillion", "gold", "tricolor glaze"], ["Open, international, generous forms. Pottery informs costume color."]),
      p("Ming Dynasty", "1368–1644 CE", ["strict rank", "geometric borders", "lacquer red"], ["siheyuan", "meru halls", "stone balustrades"], ["bufu rank badges", "winged hats", "platform boots"], ["changdao", "zhanmadao", "crossbow"], ["dragons with five claws", "waves", "mountain"], ["cinnabar", "deep blue", "yellow reserved for court"], ["Rank is worn as a picture. Dragons are structured, not scribbles."]),
    ],
  },
  {
    id: "korea",
    name: "Korea",
    region: "East Asia",
    icon: "🇰🇷",
    periods: [
      p("Joseon Dynasty", "1392–1897 CE", ["Confucian restraint", "white cloth", "scholarly line"], ["hanok", "ondol floors", "curved giwa roofs"], ["hanbok volumes", "gat hats", "norigae"], ["hwando", "gakgung bow", "ssangsudo"], ["taegeuk", "cranes", "plum blossom"], ["white", "ink black", "pale jade"], ["Silhouette is the design. White reads as status, not blankness."]),
    ],
  },
  {
    id: "mongolia",
    name: "Mongolia",
    region: "Inner Asia",
    icon: "🇲🇳",
    periods: [
      p("Mongol Empire", "13th–14th c.", ["portable power", "felt and fur", "horsetail standards"], ["gers", "camp rings", "felt doors"], ["deel robes", "boots with upturned toes", "fur hats"], ["composite bow", "saber", "lasso"], ["knots", "cloud collars", "animal combat"], ["indigo", "rust red", "cream felt"], ["Everything packs. Ornament lives on the moving edge of cloth and tack."]),
    ],
  },
  {
    id: "egypt",
    name: "Egypt",
    region: "North Africa",
    icon: "🇪🇬",
    periods: [
      p("New Kingdom", "1550–1070 BCE", ["frontal sacred geometry", "lapis and gold", "river light"], ["pylon gates", "hypostyle halls", "obelisks"], ["pleated linen", "wesekh collars", "nemes cloth"], ["khepesh", "spear", "composite bow"], ["lotus", "was scepter", "winged sun"], ["gold", "lapis", "turquoise", "black kohl"], ["Profiles are chosen, not accidental. Scale jumps are political."]),
    ],
  },
  {
    id: "nubia",
    name: "Nubia / Kush",
    region: "Northeast Africa",
    icon: "🇸🇩",
    periods: [
      p("Kingdom of Kush", "c. 800 BCE–350 CE", ["steep pyramids", "ram cult", "gold and ivory"], ["Nubian pyramids", "temple approaches", "lion temples"], ["close-fitted robes", "ram amulets", "arm cuffs"], ["spears", "bows", "hide shields"], ["rams", "lions", "solar disks"], ["gold", "red ochre", "ivory"], ["Pyramids are sharper and denser than Egypt's. Rams are architecture."]),
    ],
  },
  {
    id: "mali",
    name: "Mali",
    region: "West Africa",
    icon: "🇲🇱",
    periods: [
      p("Mali Empire", "13th–16th c.", ["sudanic adobe", "gold trade", "calligraphic islam"], ["great mosques in banco", "timber torons", "flat roofs"], ["flowing robes", "indigo veils", "gold jewelry"], ["javelins", "swords", "cavalry tack"], ["geometric adobe", "quranic script", "cowrie"], ["banco ochre", "indigo", "gold"], ["Toron beams are both scaffold and ornament. Gold is weight, not glitter."]),
    ],
  },
  {
    id: "benin",
    name: "Benin",
    region: "West Africa",
    icon: "🇳🇬",
    periods: [
      p("Benin Kingdom", "13th–19th c.", ["cast bronze court", "coral beads", "palace plaques"], ["palace compounds", "altars of the hand", "city walls"], ["coral collars", "wrapper cloth", "beaded crowns"], ["eben swords", "spears", "ceremonial axes"], ["mudfish", "leopards", "portuguese helmets"], ["bronze", "coral red", "ivory"], ["Plaques are graphic history. Coral is rank worn as mass."]),
    ],
  },
  {
    id: "greece",
    name: "Greece",
    region: "Mediterranean",
    icon: "🇬🇷",
    periods: [
      p("Classical Greece", "5th–4th c. BCE", ["ideal proportion", "draped geometry", "painted marble"], ["doric and ionic temples", "stoas", "theaters"], ["chiton", "himation", "helmet crests"], ["dory spear", "hoplon", "xiphos"], ["meander", "palmette", "owl"], ["marble white", "oxidized bronze", "painted reds and blues"], ["Drapery is construction. Armor is anatomy in bronze."]),
    ],
  },
  {
    id: "rome",
    name: "Rome",
    region: "Mediterranean",
    icon: "🇮🇹",
    periods: [
      p("Imperial Rome", "1st–3rd c. CE", ["engineering display", " ranks of red", "marble and brick"], ["arches", "basilicas", "insulae", "aqueducts"], ["toga", "tunica", "caligae"], ["gladius", "pilum", "scutum"], ["eagles", "laurels", "acanthus"], ["porphyry", "brick red", "white marble"], ["Repeatable kit. Scale is civic. Ornament frames power."]),
    ],
  },
  {
    id: "byzantium",
    name: "Byzantium",
    region: "Eastern Mediterranean",
    icon: "🟡",
    periods: [
      p("Middle Byzantine", "9th–12th c.", ["gold ground", "icon frontality", "jeweled rank"], ["domes on pendentives", "mosaic interiors", "icon screens"], ["loros", "pearl collars", "pointed shoes"], ["paramerion", "kontarion", "lamellar"], ["crosses", "peacocks", "interlace"], ["gold", "deep blue", "imperial purple"], ["Flat gold is not empty — it is holy space. Faces are frontal on purpose."]),
    ],
  },
  {
    id: "persia",
    name: "Persia",
    region: "Iranian Plateau",
    icon: "🇮🇷",
    periods: [
      p("Achaemenid", "550–330 BCE", ["processional relief", "lotus and palmette", "imperial gardens"], ["apadana halls", "animal capitals", "gate of nations"], ["pleated court robes", "fluted hats", "beaded shoes"], ["akinakes", "bow and chariot"], ["lamassu", "rosettes", "winged disks"], ["lapis", "gold", "limestone"], ["Relief is a line of people in rhythm. Animals hold up roofs."]),
      p("Safavid", "1501–1736 CE", ["carpet geometry", "tile gardens", "calligraphic flow"], ["iwans", "turquoise domes", "four-fold gardens"], ["robes with cypress patterns", "turbans", "sashes"], ["shamshir", "mace", "bow"], ["arabesques", "cloud-bands", "simurgh"], ["turquoise", "lapis", "carmine"], ["Pattern is architecture at cloth scale. Curves never collapse into scribble."]),
    ],
  },
  {
    id: "india",
    name: "India",
    region: "South Asia",
    icon: "🇮🇳",
    periods: [
      p("Mughal", "16th–18th c.", ["inlay marble", "miniature precision", "garden axes"], ["charbagh gardens", "onion domes", "jalis"], ["jama coats", "patka sashes", "turban jewels"], ["talwar", "katar", "matchlock"], ["lotuses", "pietra dura flowers", "hunting scenes"], ["white marble", "jade", "gold", "poppy red"], ["Edges are inlaid, not painted on. Scale can jump from ring to tomb."]),
      p("Chola", "9th–13th c.", ["bronze gods in motion", "temple towers", "garlanded stone"], ["vimana towers", "mandapas", "water tanks"], ["dhoti", "sacred thread", "heavy jewelry"], ["vel", "bow of rama", "sword"], ["dancing shiva", "makara", "lotus roundels"], ["temple granite", "lost-wax bronze", "saffron"], ["Bronze catch a moment of dance. Jewelry is structural on the figure."]),
    ],
  },
  {
    id: "ottoman",
    name: "Ottoman",
    region: "Anatolia & Balkans",
    icon: "🇹🇷",
    periods: [
      p("Classical Ottoman", "15th–17th c.", ["tulip and cloud", "Iznik tile", "imperial tents"], ["central domes", "pencil minarets", "tile dados"], ["kaftans", "turbans of rank", "pointed slippers"], ["yatagan", "kilij", "composite bow"], ["tulips", "cintemani", "calligraphy"], ["Iznik coral red", "cobalt", "turquoise"], ["Tents can be architecture. Rank is worn in volume of cloth."]),
    ],
  },
  {
    id: "norse",
    name: "Norse",
    region: "North Atlantic",
    icon: "🇳🇴",
    periods: [
      p("Viking Age", "8th–11th c.", ["grip of wood and iron", "interlace beasts", "ship as world"], ["longhouses", "stave halls", "ship burials"], ["wool tunics", "cloak pins", "leg windings"], ["seax", "bearded axe", "round shield"], ["gripping beasts", "runes", "knots"], ["woad blue", "iron", "oak", "madder"], ["Interlace is anatomy of animals, not spaghetti. Ships are buildings that move."]),
    ],
  },
  {
    id: "celtic",
    name: "Celtic",
    region: "Atlantic Europe",
    icon: "☘️",
    periods: [
      p("La Tène", "5th–1st c. BCE", ["spiral metalwork", "enamel", "abstract faces"], ["timber roundhouses", "hillforts", "votive waters"], ["torcs", "checked cloaks", "trousers"], ["long sword", "spear", "oval shield"], ["triskeles", "leaf scrolls", "stylized horses"], ["enamel red", "bronze", "gold"], ["Spirals grow; they don't decorate. Metal is the drawing."]),
    ],
  },
  {
    id: "medieval-europe",
    name: "Medieval Europe",
    region: "Western Europe",
    icon: "🏰",
    periods: [
      p("High Gothic", "12th–14th c.", ["vertical stone", "heraldic color", "pointed silhouette"], ["cathedrals", "rib vaults", "timber halls"], ["cotehardie", "surcoat", "pointed shoes"], ["longsword", "crossbow", "heater shield"], ["fleurs-de-lis", "ivy", "heraldic beasts"], ["stained-glass jewel tones", "limestone", "gilding"], ["Heraldry is a graphic system. Architecture points up on purpose."]),
      p("Late Medieval", "14th–15th c.", ["plate as fashion", "dagged edges", "oil-dark interiors"], ["guild halls", "brick keeps", "oriel windows"], ["houppelande", "chaperon", "poulaines"], ["poleaxe", "longbow", "plate harness"], ["blackletter", "pomegranates", "flamboyant tracery"], ["black cloth", "crimson", "polished steel"], ["Silhouettes get extreme. Steel is tailored."]),
    ],
  },
  {
    id: "renaissance-italy",
    name: "Renaissance Italy",
    region: "Southern Europe",
    icon: "🇮🇹",
    periods: [
      p("Quattrocento", "15th c.", ["linear perspective", "civic marble", "tailored black"], ["palazzi", "arcades", "dome experiments"], ["giornea", "fitted doublets", "hats of status"], ["cinquedea", "partisan", "parade armour"], ["putti", "garlands", "classical medallions"], ["terra cotta", "gold ground fading", "ultramarine"], ["Perspective is a civic tool. Parade armor is sculpture you wear."]),
    ],
  },
  {
    id: "maya",
    name: "Maya",
    region: "Mesoamerica",
    icon: "🇬🇹",
    periods: [
      p("Classic Maya", "250–900 CE", ["stepped mass", "jade and quetzal", "ritual bloodline"], ["pyramids with roof combs", "ballcourts", "sacbe roads"], ["jade belts", "feathered backracks", "body paint"], ["atlatl", "obsidian, macuahuitl-like clubs", "shields"], ["serpent bars", "sun glyphs", "water lilies"], ["jade", "hematite", "maya blue"], ["Feathers are architecture on the body. Glyphs are designed pictures."]),
    ],
  },
  {
    id: "aztec",
    name: "Aztec",
    region: "Mesoamerica",
    icon: "🇲🇽",
    periods: [
      p("Mexica", "14th–16th c.", ["dual temples", "feather mosaics", "skull racks"], ["twin stair pyramids", "chinampas", "causeways"], ["ichcahuipilli cotton", "feather shields", "lip plugs"], ["macuahuitl", "atlatl", "obsidian"], ["eagles", "jaguars", "speech scrolls"], ["cochineal red", "turquoise", "obsidian"], ["Costume is rank and animal. Geometry of the city is water plus stone."]),
    ],
  },
  {
    id: "inca",
    name: "Inca",
    region: "Andes",
    icon: "🇵🇪",
    periods: [
      p("Tawantinsuyu", "15th–16th c.", ["ashlar fit", "textile rank", "mountain axis"], ["polygonal masonry", "usnu platforms", "terraces"], ["uncu tunics", "llautu headbands", "checker patterns"], ["star-headed mace", "slings", "bronze knives"], ["stepped fret", "sun face", "llama"], ["madder", "indigo", "gold", "stone gray"], ["Cloth is the empire's graphic. Stones lock without mortar — draw the joints."]),
    ],
  },
  {
    id: "polynesia",
    name: "Polynesia",
    region: "Pacific",
    icon: "🌊",
    periods: [
      p("Classic Polynesian", "pre-19th c.", ["tattoo as architecture", "bark cloth", "ocean geometry"], ["marae platforms", "raised storehouses", "canoe sheds"], ["tapa cloth", "feather cloaks", "shell"], ["clubs", "spears", "shark-tooth weapons"], ["spirals", "lizard", "wave"], ["tapa cream", "soot black", "feather red"], ["Canoes are buildings. Tattoo maps the body like a chart."]),
    ],
  },
  {
    id: "islamic-golden",
    name: "Islamic Golden Age",
    region: "Near East",
    icon: "🌙",
    periods: [
      p("Abbasid / Andalusian", "8th–13th c.", ["geometry as devotion", "water and shade", "script as ornament"], ["hypostyle halls", "horseshoe arches", "muqarnas"], ["turbans", "flowing robes", "tiraz bands"], ["saif", "composite bow", "mace"], ["stars", "arabesque", "kufic"], ["cobalt", "gold", "ivory", "courtyard white"], ["Avoid figurative default. Pattern, water, and script carry the scene."]),
    ],
  },
  {
    id: "victorian",
    name: "Victorian Britain",
    region: "North Atlantic",
    icon: "🇬🇧",
    periods: [
      p("High Victorian", "1850–1880", ["industrial soot", "patterned interiors", "rigid silhouette"], ["iron and glass halls", "terraces", "fogged brick"], ["crinolines", "frock coats", "top hats"], ["service revolvers", "walking sticks", "bayonets"], ["paisley", "florals", "rail geometry"], ["coal black", "gaslight yellow", "oxblood"], ["Smoke is atmosphere. Clothing is engineered volume. Iron is honest."]),
    ],
  },
]

export function getAllCultures(): { name: string; period: string }[] {
  const out: { name: string; period: string }[] = []
  for (const region of cultureLibrary) {
    for (const period of region.periods) {
      out.push({ name: region.name, period: period.name })
    }
  }
  return out
}
