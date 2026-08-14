import type { ObjectCategory, ObjectEntry, ObjectVariation } from "@/lib/lineforge/types/library"

function v(name: string, notes: string): ObjectVariation {
  return { name, notes }
}

function e(
  id: string,
  name: string,
  keyShapes: string[],
  tips: string[],
  mistakes: string[],
  variations: ObjectVariation[],
  imageUrl?: string
): ObjectEntry {
  return { id, name, imageUrl, keyShapes, tips, mistakes, variations }
}

export const objectLibrary: ObjectCategory[] = [
  {
    id: "weapons",
    name: "Weapons",
    icon: "Swords",
    description: "Blades, polearms, bows, and firearms. Construction before ornament.",
    entries: [
      e("obj-longsword", "Longsword", ["tapered bar", "crossguard T", "pommel sphere"], ["Keep the blade a rigid taper, not a noodle", "The guard is a volume sitting on the grip", "Fullers are channels, they don't split the blade"], ["Blade too thin at the hilt", "Guard floating off-axis"], [v("Arming sword", "Shorter, one-handed, broader blade"), v("Bastard sword", "Longer grip, hybrid balance"), v("Ceremonial sword", "Heavier guard, engraved fuller")]),
      e("obj-katana", "Katana", ["gentle curve", "circular guard", "wrapped rectangle grip"], ["The sori is one curve, not a banana kink", "Hamon follows the edge", "Saya is an oval tube"], ["European taper by habit", "Tsuba as a coin glued on"], [v("Wakizashi", "Shorter companion blade"), v("Tachi", "Deeper curve, hung edge-down"), v("Naginata", "Curved blade on a long shaft")]),
      e("obj-axe", "Battle Axe", ["wedge head", "socket cylinder", "tapered haft"], ["The bit is a wedge, the eye is a socket", "Haft enters the head", "Beard of the axe carries weight"], ["Head too thin to chop", "Haft as a broomstick"], [v("Bearded axe", "Extended lower bit for hooking"), v("Throwing axe", "Shorter haft, compact head"), v("Poleaxe", "Axe, hammer and spike on a long shaft")]),
      e("obj-spear", "Spear", ["leaf blade", "socket", "long cylinder shaft"], ["The socket is how it mounts", "Shaft tapers slightly", "Balance sits forward of center"], ["Blade too large for the shaft", "No socket"], [v("Pike", "Very long, small head"), v("Halberd", "Axe blade, spear tip and hook"), v("Trident", "Three tines, heavier head")]),
      e("obj-bow", "Bow", ["curved limbs", "rectangular grip", "string in tension"], ["Unstrung and strung silhouettes differ", "The shelf is a small plane", "Limb thickness matters"], ["A simple C without tips", "Arrows as noodles"], [v("Recurve bow", "Tips curve away from the archer"), v("Longbow", "D-section, little recurve"), v("Crossbow", "Prod on a tiller stock with a lock")]),
      e("obj-shield", "Shield", ["disc or kite plane", "boss hemisphere", "rim thickness"], ["Give it thickness in profile", "Straps sit on the back plane", "Boss is a volume"], ["Paper-thin disc", "No rim"], [v("Kite shield", "Tapered for horseback"), v("Buckler", "Small fist shield, heavy boss"), v("Tower shield", "Tall rectangle, planted")]),
      e("obj-dagger", "Dagger", ["short taper", "simple guard", "compact grip"], ["A thrusting tool first", "Grip fills a closed fist"], ["Scaled-down longsword", "Spikes on the guard by default"], [v("Stiletto", "Needle blade, almost no edge"), v("Kukri", "Forward-weighted recurve"), v("Kris", "Wavy blade, distinct pamor")]),
      e("obj-firearm", "Firearm", ["barrel cylinder", "lock box", "stock wedge"], ["Barrel is a tube with walls", "Stock has a cheek plane", "Sights sit on the top rib"], ["Melting barrel into the stock", "No trigger guard volume"], [v("Matchlock musket", "Long barrel, serpentine lock"), v("Flintlock pistol", "Short barrel, swan-neck cock"), v("Repeating rifle", "Receiver, magazine, longer stock")]),
      e("obj-mace", "Mace", ["haft cylinder", "flanged head", "socket"], ["Weight lives in the head", "Flanges are radial wedges"], ["Head too light", "Flanges as 2D stars"], [v("Morning star", "Spiked sphere"), v("War hammer", "Beak and hammer face"), v("Flail", "Head on a short chain")]),
    ],
  },
  {
    id: "armor",
    name: "Armor",
    icon: "Shield",
    description: "Plate, mail, leather, and the body that wears them.",
    entries: [
      e("obj-helmet", "Helmet", ["skull bowl", "visor plane", "neck flare"], ["A shell around a head, not a hat sticker", "Visor needs a hinge and a sight slit"], ["Sitting on the scalp with no volume", "Ignoring the gorget"], [v("Sallet", "Long tail protecting the neck"), v("Great helm", "Cylindrical, small sights"), v("Kabuto", "Bowl with a pronounced neck guard")]),
      e("obj-breastplate", "Breastplate", ["convex torso shell", "fauld lames", "arm gussets"], ["It is globose — it turns a blow", "Straps and hinges live on the sides"], ["Flat cardboard chest", "No overlap onto the hips"], [v("Cuirass", "Breast and backplate"), v("Brigandine", "Plates riveted inside cloth"), v("Lorica segmentata", "Horizontal ferrous bands")]),
      e("obj-gauntlet", "Gauntlet", ["palm shell", "finger lames", "cuff flare"], ["Fingers are articulated plates", "Thumb is a separate construction"], ["Solid mittens that cannot close", "Ignoring palm leather"], [v("Mitts", "Fingers grouped"), v("Hourglass gauntlet", "Flared cuff"), v("Kote", "Mail and plate sleeve")]),
      e("obj-greaves", "Greaves", ["shin gutter", "knee cop", "ankle close"], ["Shin is a half-pipe wrapping bone", "Knee cop must rotate"], ["Painted-on shins", "Knee as a disk"], [v("Sabatons", "Articulated shoe plates"), v("Suneate", "Japanese shin guards"), v("Jack boots", "Thick leather instead of plate")]),
      e("obj-mail", "Mail Shirt", ["draped mesh volume", "shoulder slope", "hem drape"], ["Mail drapes like heavy fabric", "It pulls at the shoulders"], ["Drawing every ring", "Hovering off the body"], [v("Hauberk", "Long mail to the knees"), v("Coif", "Mail hood"), v("Standard", "Mail collar")]),
      e("obj-leather-armor", "Leather Armor", ["thick hide planes", "stitched overlaps", "buckled straps"], ["Leather has thickness and edge", "It wrinkles at joints"], ["Spray-painted skin-tight leather", "No edge thickness"], [v("Cuir bouilli", "Hard boiled leather shapes"), v("Buff coat", "Soft thick leather coat"), v("Lamellar", "Laces holding small plates")]),
      e("obj-pauldron", "Pauldron", ["shoulder dome", "lames", "strap"], ["It must rotate with the arm", "Overlap the breastplate, do not fuse"], ["Shoulder pads glued on", "No underside"], [v("Spaudler", "Smaller, lighter lames"), v("Kote sode", "Square Japanese shoulder boards"), v("Ailette", "Flat heraldic shoulder plate")]),
    ],
  },
  {
    id: "vehicles",
    name: "Vehicles",
    icon: "Car",
    description: "Carts, ships, aircraft, and ground machines. Plant them on a surface.",
    entries: [
      e("obj-wagon", "Wagon", ["box bed", "large wheel cylinders", "draught pole"], ["Wheels are cylinders with hubs", "The bed is a box in perspective", "Axles must line up"], ["Ellipses that don't share an axle", "Floating tongue"], [v("Covered wagon", "Hoop canvas over the bed"), v("Chariot", "Light, open, two-wheeled"), v("Carriage", "Suspended cabin, finer wheels")]),
      e("obj-sailing-ship", "Sailing Ship", ["hull wedge", "mast cylinders", "sail planes"], ["The hull is a volume that displaces water", "Masts rake; they are not always vertical", "Sails are billowing planes with thickness at the edge"], ["A banana hull", "Sails as rectangles pasted on"], [v("Cog", "Single mast, high sides"), v("Caravel", "Lateen sails, lighter hull"), v("Junk", "Battened sails, flat bottom")]),
      e("obj-rowboat", "Rowboat", ["open hull", "thwarts", "oar cylinders"], ["Show interior ribs", "Waterline is a contour on the hull", "Oarlocks are hardware"], ["A canoe outline with seats", "No thickness to the gunwale"], [v("Skiff", "Small, pointed"), v("Longboat", "Many thwarts, clinker sides"), v("Gondola", "Asymmetric, rising ends")]),
      e("obj-motorcycle", "Motorcycle", ["two wheels", "frame triangles", "tank volume"], ["Wheels share a ground plane", "Forks have thickness and rake", "The rider's triangle dictates the silhouette"], ["Wheels as ellipses in different perspectives", "No drivetrain"], [v("Cruiser", "Low seat, long wheelbase"), v("Dirt bike", "High fenders, knobby tires"), v("Scooter", "Step-through frame, small wheels")]),
      e("obj-automobile", "Automobile", ["cabin box", "wheel cylinders", "body as lofted panels"], ["Establish a perspective box first", "Wheel wells cut into the body", "Ground contact is four shared points"], ["A cartoon loaf with circles", "Windows ignoring the cabin volume"], [v("Truck", "Cab plus cargo box"), v("Sedan", "Three-box: hood, cabin, trunk"), v("Armored car", "Angled plates, small glass")]),
      e("obj-aircraft", "Aircraft", ["fuselage cylinder", "wing planes", "tail fins"], ["Wings have airfoil thickness", "Landing gear plants or tucks", "The prop or intake is a volume"], ["Paper airplane with windows", "Wings with no root"], [v("Biplane", "Two wings, struts and wires"), v("Jet fighter", "Blended body, intakes"), v("Airship", "Gas envelope plus gondola")]),
      e("obj-locomotive", "Locomotive", ["boiler cylinder", "cab box", "driving wheels"], ["Boiler is a big cylinder with bands", "Wheels plus rods are a mechanism", "The cab is a room"], ["A smiley face on a kettle", "No rails"], [v("Steam tank engine", "Water tanks beside the boiler"), v("Diesel", "Boxier hood, no boiler"), v("Tram", "Passenger body, trolley pole")]),
      e("obj-bicycle", "Bicycle", ["diamond frame", "two thin wheels", "saddle"], ["Frame tubes are cylinders meeting at lugs", "Chainring and sprocket are circles in perspective"], ["A stick figure bike", "Wheels not foreshortened together"], [v("Penny-farthing", "Huge front wheel"), v("Cargo bike", "Front box, long wheelbase"), v("Motorcycle bicycle", "Heavier tubes, engine block")]),
    ],
  },
  {
    id: "mechs",
    name: "Mechs",
    icon: "Bot",
    description: "Walkers, frames, and industrial robots. Skeleton first, plates second.",
    entries: [
      e("obj-biped-mech", "Biped Mech", ["torso box", "limb cylinders", "foot plates"], ["Give it a pelvis and a ribcage analog", "Knees need a stop", "Feet plant with weight"], ["Human armor with pistons", "No ankle"], [v("Scout walker", "Light, long legs"), v("Heavy assault", "Wide feet, hunched torso"), v("Exosuit", "Human visible inside the frame")]),
      e("obj-quad-mech", "Quad Mech", ["central body", "four limb chains", "hip boxes"], ["Decide insect vs mammal gait", "Hips are mechanical joints with range"], ["Four arms glued to a fridge", "No spine"], [v("Spider tank", "Low, many joints"), v("Pack mule", "Cargo rack, slower stance"), v("Hunter", "Raised, digitigrade legs")]),
      e("obj-mech-hand", "Mech Hand", ["palm box", "finger pistons", "knuckle hinges"], ["Hinges are visible design", "Fingers need a range of motion"], ["Human hand chrome-plated", "No palm thickness"], [v("Clamp", "Two-finger industrial"), v("Fine manipulator", "Many small actuators"), v("Weapon hand", "Integrated barrel or blade")]),
      e("obj-cockpit-head", "Cockpit Head", ["canopy bubble", "sensor block", "neck gimbal"], ["The pilot needs volume", "Glass is a cut in a shell"], ["A visor sticker", "No neck"], [v("Fighter cockpit", "Forward canopy, HUD"), v("Industrial cab", "Boxy, heavy glass"), v("Sensor head", "Cameras, no windows")]),
      e("obj-thruster", "Thruster", ["nozzle cone", "housing cylinder", "heat vanes"], ["A cone cutting a cylinder", "Heat discoloration follows flow"], ["A circle on the back", "No interior of the nozzle"], [v("Ion cluster", "Many small nozzles"), v("Afterburning jet", "Petal nozzle"), v("Rocket bell", "Large expansion bell")]),
      e("obj-industrial-arm", "Industrial Arm", ["base", "segment boxes", "wrist roll"], ["Each joint is a designed hinge", "Cables need a path"], ["A noodle with a claw", "Ignoring base mass"], [v("Welder arm", "Torch head, cable bundle"), v("Crane", "Lattice boom"), v("Docking arm", "End effector with latches")]),
    ],
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: "Landmark",
    description: "Doors, towers, bridges, and the masses they belong to.",
    entries: [
      e("obj-doorway", "Doorway", ["frame box", "door plane", "threshold slab"], ["The frame has depth", "The door is a volume that hinges", "Hardware is construction"], ["A rectangle on a wall", "No jamb"], [v("Temple portal", "Stepped jambs, heavy lintel"), v("Postern", "Small, thick, iron-bound"), v("Sliding gate", "Track, rollers, counterweight")]),
      e("obj-tower", "Tower", ["vertical prism", "battered base", "crowning mass"], ["Batter the walls slightly", "Openings recede into the wall", "The crown is a designed cap"], ["A cylinder with windows stamped on", "No wall thickness"], [v("Keep", "Square, corner turrets"), v("Minaret", "Balconies, tapering shaft"), v("Lighthouse", "Lantern room, gallery")]),
      e("obj-bridge", "Bridge", ["span", "piers", "road plane"], ["Piers sit in the water or ravine with mass", "The road is a plane with thickness", "Underside structure tells the type"], ["A flat plank in space", "No abutments"], [v("Arch bridge", "Voussoirs, keystone"), v("Rope bridge", "Catenary, slats"), v("Drawbridge", "Hinges, chains, slot")]),
      e("obj-window", "Window", ["opening box", "mullions", "sill"], ["Reveal depth in the wall", "Glass is a plane inside the reveal", "Sill sheds water"], ["A black rectangle", "Mullions as drawn lines with no thickness"], [v("Oriel", "Projected bay"), v("Rose window", "Radial tracery"), v("Shoji", "Grid, translucent panels")]),
      e("obj-stair", "Stair", ["repeating wedges", "stringer", "landing"], ["Treads and risers stay consistent", "The stringer is a supporting plane", "Landing is a pause in space"], ["A zigzag with no thickness", "Steps that change size randomly"], [v("Spiral stair", "Winding around a newel"), v("Monumental stair", "Wide, shallow, ceremonial"), v("Ladder", "Rungs on two stiles")]),
      e("obj-column", "Column", ["shaft cylinder", "capital", "base"], ["Entasis is a subtle swell", "Capital is a transition, not a hat", "It carries a load"], ["A tube under a roof", "Ignoring the base"], [v("Doric", "Simple capital, fluted shaft"), v("Lotus column", "Plant-form capital"), v("Iron column", "Bolted segments, thinner")]),
      e("obj-roof", "Roof", ["planes meeting at ridges", "eave overhang", "thickness at the edge"], ["Eaves have a third dimension", "Tiles or shingles are a texture on a plane", "Chimneys pierce, they don't float"], ["A V sitting on a box", "No underside"], [v("Pagoda roof", "Upturned corners, stacked eaves"), v("Dome", "Spherical cap, drum"), v("Thatched", "Thick organic edge")]),
      e("obj-well", "Well", ["cylinder shaft", "curb", "winch or sweep"], ["The interior hole has darkness and depth", "The curb is a thick ring"], ["An O on the ground", "No winding gear"], [v("Village well", "Roofed, bucket"), v("Stepwell", "Descending terraces"), v("Fountain", "Basin, jets, sculpture")]),
    ],
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "Armchair",
    description: "Chairs, tables, chests — joinery you can believe.",
    entries: [
      e("obj-chair", "Chair", ["seat plane", "four legs", "backrest"], ["All legs share the ground", "The seat has thickness", "Backrest is a plane or spindles"], ["A throne blob", "Legs that miss the corners"], [v("Stool", "No back"), v("Throne", "High back, arms, dais"), v("Folding chair", "Crossing legs, hinges")]),
      e("obj-table", "Table", ["top plane", "apron", "legs"], ["The apron hides the joint", "Thickness of the top is visible", "Perspective of the ellipse or rectangle first"], ["A floating slab", "Legs at random"], [v("Trestle table", "Brace and beam"), v("Low tea table", "Short legs, wide top"), v("WorkBench", "Vises, thick top")]),
      e("obj-chest", "Chest", ["box", "lid with thickness", "hasp and straps"], ["The lid is a volume", "Iron straps wrap the box", "Feet or a plinth lift it"], ["A rectangle with a smile lock", "No hinge"], [v("Coffer", "Domed lid"), v("Hope chest", "Flat lid, interior tray"), v("Strongbox", "Heavy rivets, small")]),
      e("obj-bed", "Bed", ["frame box", "mattress volume", "posts"], ["Mattress is a soft box with compressed corners", "Posts are cylinders", "Drapery hangs from a real rail"], ["A pillow on a platform", "No frame"], [v("Four-poster", "Canopy, curtains"), v("Cot", "Light, folding"), v("Stone bier", "Hard, ceremonial")]),
      e("obj-bookshelf", "Bookshelf", ["uprights", "shelves as planes", "books as packed boxes"], ["Shelves have thickness and a front edge", "Books vary but share a ground line"], ["Lines of color with no volume", "No uprights"], [v("Lectern", "Angled reading plane"), v("Archive stack", "Tall, ladder"), v("Wall niche", "Recessed shelves")]),
      e("obj-lantern", "Lantern", ["frame cage", "glass planes", "candle or lamp volume"], ["The flame is inside a cage", "Handle or hook is how it hangs"], ["A yellow blob", "No glass plane"], [v("Paper lantern", "Soft glowing volume"), v("Storm lantern", "Wire guard, fuel fount"), v("Chandelier", "Many arms, hanging")]),
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "Wrench",
    description: "Hammers, keys, instruments — used objects with handles and heads.",
    entries: [
      e("obj-hammer", "Hammer", ["handle cylinder", "head block", "peen or claw"], ["The head is a forged block", "Handle enters an eye", "Balance is forward"], ["A cartoon mallet", "No wedge in the eye"], [v("Claw hammer", "Split peen for nails"), v("Sledge", "Heavy two-handed head"), v("Chasing hammer", "Broad face, light")]),
      e("obj-anvil", "Anvil", ["body mass", "horn cone", "face plane"], ["It is a heavy block with a working face", "The horn is for curves", "It sits on a stump"], ["A silhouette from a logo", "No hardy hole"], [v("Stake anvil", "Small, horn-heavy"), v("Power hammer die", "Industrial block"), v("Farrier anvil", "Cliphorn, Pritchel hole")]),
      e("obj-key", "Key", ["bow", "shank", "bit"], ["The bit is a designed profile", "Bow is a handle silhouette", "It has thickness"], ["A cartoon keyhole shape", "No bit wards"], [v("Skeleton key", "Simple bit"), v("Padlock key", "Small, cylindrical variants"), v("Ceremonial key", "Oversized bow")]),
      e("obj-lock", "Padlock", ["body", "shackle U", "keyway"], ["The shackle is a bent bar", "Body is a thick case"], ["A heart with a hole", "No shackle thickness"], [v("Stock lock", "Mounted on a chest"), v("Combination lock", "Dial, no key"), v("Bar lock", "Sliding bolt")]),
      e("obj-saw", "Saw", ["toothed blade plane", "handle grip", "spine or frame"], ["Teeth are a rhythm on an edge", "Handle is a designed grip", "Blade is thin but not a line"], ["A triangle with spikes", "No set to the teeth"], [v("Handsaw", "Open blade, pistol grip"), v("Frame saw", "Blade in a wooden frame"), v("Hacksaw", "Narrow blade, metal frame")]),
      e("obj-tongs", "Tongs", ["two arms", "pivot", "jaws"], ["They are a pair of levers", "Jaws match the work"], ["Tweezers scaled up", "No rivet"], [v("Blacksmith tongs", "Long reins, forged jaws"), v("Crucible tongs", "Ring jaws"), v("Forceps", "Fine, medical")]),
      e("obj-compass", "Compass / Divider", ["two legs", "hinge", "points or pen"], ["The hinge is the design", "Legs taper"], ["A V", "No adjustment"], [v("Dividers", "Two points"), v("Beam compass", "Long bar, two heads"), v("Proportional dividers", "Pivot along the legs")]),
      e("obj-lantern-tool", "Oil Lamp", ["reservoir", "wick channel", "handle or spout"], ["Fuel is a volume", "Flame sits on a wick, not in space"], ["Aladdin cartoon", "No reservoir"], [v("Cruse", "Simple bowl lamp"), v("Argand", "Glass chimney"), v("Miner's lamp", "Cage, hook")]),
    ],
  },
  {
    id: "vessels",
    name: "Vessels",
    icon: "Cup",
    description: "Pots, bottles, barrels — ellipses and thickness.",
    entries: [
      e("obj-bottle", "Bottle", ["cylinder body", "shoulder", "neck and mouth"], ["Ellipses share an axis", "Glass has thickness at the lip", "The shoulder is a designed turn"], ["A bowling pin outline", "No ellipse degree change"], [v("Amphora", "Two handles, pointed toe"), v("Flask", "Flat faces, short neck"), v("Decanter", "Wide base, stopper")]),
      e("obj-cup", "Cup / Goblet", ["bowl", "stem or none", "foot"], ["The bowl is a volume you could fill", "Foot is an ellipse on the table"], ["A U with a stick", "Ignoring the lip thickness"], [v("Mug", "Handle, thick wall"), v("Chalice", "Stemmed, ceremonial"), v("Tea bowl", "No handle, subtle foot")]),
      e("obj-barrel", "Barrel", ["bulged cylinder", "hoops", "heads"], ["Bilge is the widest ellipse", "Hoops are bands in perspective", "Bung sits on the bulge"], ["A cylinder with lines", "Flat sides"], [v("Cask", "Smaller, tighter"), v("Drum", "Steel, less bulge"), v("Keg", "Short, handled")]),
      e("obj-pot", "Cooking Pot", ["body of revolution", "rim", "handles"], ["It sits on a hearth or trivet", "Interior is a darker ellipse"], ["A bucket with no thickness", "Handles as wires with no attach"], [v("Cauldron", "Rounded, hanging bale"), v("Kettle", "Spout, lid"), v("Tagine", "Conical lid")]),
      e("obj-basket", "Basket", ["woven volume", "rim", "handle"], ["Weave is a surface direction", "The rim finishes the form"], ["A texture oval", "No structure"], [v("Creel", "Lidded fishing basket"), v("Hamper", "Large, rectangular"), v("Winnowing basket", "Wide, shallow")]),
      e("obj-urn", "Urn", ["symmetric body", "lid", "foot or lugs"], ["A body of revolution with a designed profile", "Lid is a separate volume"], ["A vase blob", "No lid seating"], [v("Canopic jar", "Lidded, figured top"), v("Garden urn", "Wide mouth, pedestal"), v("Cinerary urn", "Closed, compact")]),
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: "Shirt",
    description: "Garments as draped cloth over a body, not painted skin.",
    entries: [
      e("obj-cloak", "Cloak", ["shoulder drape", "hem", "clasp"], ["Folds radiate from the clasp and shoulders", "Hem is a contour in space"], ["A cape sticker", "No thickness at the edge"], [v("Hooded cloak", "Hood volume"), v("Half-cape", "Shorter, one shoulder"), v("Ceremonial mantle", "Heavy, embroidered")]),
      e("obj-boot", "Boot", ["foot wedge", "shaft cylinder", "sole thickness"], ["Sole is a plane with an edge", "Shaft wraps the calf", "Ankle is a designed turn"], ["A sock with a heel slash", "No sole"], [v("Riding boot", "Tall, rigid shaft"), v("Work boot", "Thick sole, laces"), v("Sabatons", "Plate shoe")]),
      e("obj-hat", "Hat", ["crown volume", "brim plane", "band"], ["The crown is a shell over a head", "Brim is a plane with thickness"], ["A shape floating above hair", "No band"], [v("Helmet-hat", "Rigid, small brim"), v("Wide brim", "Farmer or pilgrim"), v("Cap", "Soft crown, visor")]),
      e("obj-belt", "Belt", ["strap", "buckle", "hanging end"], ["It wraps a cylinder (the waist)", "Buckle is a frame and a prong", "Things hang from it"], ["A line around a waist", "No buckle volume"], [v("Baldric", "Shoulder belt"), v("Obi", "Wide wrapped sash"), v("Gun belt", "Loops, holster")]),
      e("obj-bag", "Bag / Satchel", ["soft box", "flap", "strap"], ["It has a hanging drape from the strap", "The flap is a plane"], ["A rectangle on a hip", "Strap with no attach"], [v("Backpack", "Two straps, box body"), v("Pouch", "Small, drawstring"), v("Scroll case", "Tube with caps")]),
      e("obj-glove", "Glove", ["hand volume", "cuffs", "creases at knuckles"], ["It is a hand plus thickness", "Creases follow flexion"], ["Sausage fingers", "No cuff"], [v("Gauntlet cuff", "Flared"), v("Work glove", "Heavy, short"), v("Mail mitten", "Mesh plus leather palm")]),
    ],
  },
  {
    id: "nature",
    name: "Nature",
    icon: "Leaf",
    description: "Trees, rocks, bones, and growth. Structure before texture.",
    entries: [
      e("obj-tree", "Tree", ["trunk cylinder", "branching Ys", "canopy masses"], ["Branches taper and never outgrow the parent", "Canopy is overlapping pillows", "Roots grip a plane"], ["Broccoli on a stick", "Leaf soup"], [v("Pine", "Whorled branches, conical"), v("Oak", "Heavy limbs, irregular canopy"), v("Dead tree", "No canopy, broken limbs")]),
      e("obj-rock", "Rock", ["faulted planes", "overlap", "grounding"], ["Rocks have plane changes, not cloud outlines", "They sit with weight", "Crack direction is structural"], ["Pebble piles as circles", "Floating boulders"], [v("Standing stone", "Vertical, weathered"), v("Cliff face", "Stratified planes"), v("Pebble", "Worn, small, many")]),
      e("obj-skull-animal", "Animal Skull", ["cranium egg", "jaw", "zygomatic / horn roots"], ["The jaw hinges", "Orbits are holes in a volume", "Teeth are a row on a curve"], ["A logo skull", "No zygomatic arch"], [v("Horned skull", "Horn cores as cones"), v("Bird skull", "Light, large orbits, beak"), v("Crocodile skull", "Long, teeth interlocking")]),
      e("obj-mushroom", "Mushroom", ["stem cylinder", "cap", "gills or pores"], ["The cap is a volume with an underside", "Stem inserts, it isn't glued"], ["A pancake on a stick", "No gills"], [v("Shelf fungus", "Lateral on a trunk"), v("Puffball", "Spherical, no stem"), v("Morel", "Pitted conical cap")]),
      e("obj-shell", "Shell", ["spiral or bivalve", "aperture", "thickness at lip"], ["A spiral is a 3D growth, not a 2D swirl", "The lip has thickness"], ["A cartoon beach shell", "No aperture"], [v("Conch", "Heavy spiral, flared lip"), v("Scallop", "Fan ridges, two valves"), v("Nautilus", "Chambered, sliced view")]),
      e("obj-crystal", "Crystal", ["prismatic shafts", "terminations", "cluster base"], ["Crystals are geometric, not sparkles", "They grow from a matrix"], ["Stars pasted on rock", "No facets"], [v("Quartz cluster", "Many terminations"), v("Geode", "Hollow, inward crystals"), v("Ore vein", "Banded in host rock")]),
      e("obj-coral", "Coral", ["branching or plate masses", "porous surface", "base"], ["Think of it as slow branching architecture", "Negative space matters"], ["Pink texture blobs", "No structure"], [v("Staghorn", "Antler branches"), v("Brain coral", "Meandering grooves"), v("Fan", "Flat plane of branches")]),
    ],
  },
  {
    id: "instruments",
    name: "Instruments",
    icon: "Music",
    description: "Sound-making objects with resonating volumes and strings or bells.",
    entries: [
      e("obj-lute", "Lute / Guitar", ["resonating body", "neck", "headstock"], ["The body is a volume with a sound hole", "Frets are on a plane", "Strings vanish to a vanishing of the nut"], ["A ping-pong paddle", "No depth to the bowl"], [v("Oud", "Fretless, short neck"), v("Shamisen", "Square body, long neck"), v("Harp", "Pillar, soundbox, strings in a plane")]),
      e("obj-drum", "Drum", ["shell cylinder", "skin ellipses", "lugs"], ["Two skins if double-headed", "The shell has thickness", "It sits or hangs"], ["A circle", "No shell"], [v("Snare", "Shallow, wires underneath"), v("Frame drum", "Shallow, handheld"), v("Kettle drum", "Bowl body, single skin")]),
      e("obj-horn", "Horn", ["expanding tube", "bell", "mouthpiece"], ["It is a wrapped or coiled cone", "The bell is a flare"], ["A party blower", "No mouthpiece"], [v("War horn", "Simple curve, animal horn"), v("Trumpet", "Coiled, valves or none"), v("Conch trumpet", "Shell with a mouth hole")]),
      e("obj-bell", "Bell", ["flared cup", "clapper", "yoke or handle"], ["A body of revolution", "The lip is thick", "Clapper hangs inside"], ["A cartoon ding-dong", "No interior"], [v("Handbell", "Handle, small"), v("Temple bell", "Struck from outside"), v("Chime", "Tubes or bars in a row")]),
    ],
  },
  {
    id: "relics",
    name: "Relics",
    icon: "Gem",
    description: "Crowns, idols, books, and objects that carry culture.",
    entries: [
      e("obj-crown", "Crown", ["circlet", "rising elements", "lining"], ["It is a ring around a head volume", "Fleurs or spikes are designed repeats"], ["A princess sticker", "No inner band"], [v("Diadem", "Low, jeweled band"), v("Papal tiara", "Stacked rings"), v("War crown", "Heavier, closed")]),
      e("obj-idol", "Idol", ["figure mass", "base", "attributes"], ["Simplify the figure into worshipable shapes", "The base is part of the object"], ["A miniature person", "No pedestal"], [v("Household god", "Small, worn"), v("Temple statue", "Over-life, frontal"), v("Mask", "Hollow back, worn")]),
      e("obj-book", "Book", ["block", "covers", "spine"], ["A book is a box with a spine radius", "Pages are a stacked edge", "It opens as two planes"], ["A rectangle with lines", "No thickness"], [v("Codex", "Bound pages"), v("Scroll", "Rolled cylinder, handles"), v("Tablet", "Slab, inscribed")]),
      e("obj-reliquary", "Reliquary", ["casket volume", "crystal or grille", "ornament"], ["A container that displays", "Architecture in miniature"], ["A fancy box", "No window"], [v("Arm reliquary", "Shaped as a body part"), v("Phylactery", "Small, worn"), v("Shrine cabinet", "Doors, interior")]),
      e("obj-banner", "Banner", ["cloth plane", "staff", "finial"], ["Cloth hangs and folds from the staff", "The field is a designed graphic on a moving plane"], ["A flag sticker", "No staff"], [v("Gonfalon", "Hangs from a crossbar"), v("Standard", "Rigid, emblem-heavy"), v("Prayer flag", "String of small cloths")]),
      e("obj-mirror", "Mirror", ["plane", "frame", "stand or handle"], ["The reflection is a design problem", "Frame has depth"], ["An oval with shine", "No thickness"], [v("Hand mirror", "Handle"), v("Standing mirror", "Support, tilt"), v("Bronze mirror", "Cast back, polished face")]),
    ],
  },
]

export function getAllObjects(): { name: string; category: string }[] {
  const out: { name: string; category: string }[] = []
  for (const category of objectLibrary) {
    for (const entry of category.entries) {
      if (entry.variations.length > 0) {
        for (const variation of entry.variations) {
          out.push({ name: variation.name, category: category.name })
        }
      } else {
        out.push({ name: entry.name, category: category.name })
      }
    }
  }
  return out
}

export function findObjectEntry(name: string): { category: ObjectCategory; entry: ObjectEntry } | null {
  const needle = name.trim().toLowerCase()
  for (const category of objectLibrary) {
    for (const entry of category.entries) {
      if (entry.name.toLowerCase() === needle) return { category, entry }
      if (entry.variations.some((item) => item.name.toLowerCase() === needle)) {
        return { category, entry }
      }
    }
  }
  for (const category of objectLibrary) {
    for (const entry of category.entries) {
      if (entry.name.toLowerCase().includes(needle) || needle.includes(entry.name.toLowerCase())) {
        return { category, entry }
      }
      if (entry.variations.some((item) => item.name.toLowerCase().includes(needle))) {
        return { category, entry }
      }
    }
  }
  return null
}
