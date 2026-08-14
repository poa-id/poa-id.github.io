import type { Subject } from "@/lib/commissions/types"

export interface SceneDef {
  id: string
  label: string
  beingVerbs: string[]
  objectVerbs: string[]
  placeVerbs: string[]
  eventVerbs: string[]
  witnesses: string[]
  subjectWeights: Partial<Record<Subject, number>>
}

export const SCENES: SceneDef[] = [
  {
    id: "encounter",
    label: "Encounter",
    beingVerbs: ["halts at the edge of", "comes upon", "stands facing"],
    objectVerbs: ["has been left in", "waits in", "has been set down in"],
    placeVerbs: ["opens onto", "faces", "holds the meeting-place of"],
    eventVerbs: ["hangs unresolved over", "takes shape in"],
    witnesses: [
      "while a second party remains half-hidden among the nearer forms",
      "as neither side has yet decided whether to advance",
    ],
    subjectWeights: { creature: 1.4, character: 1.3, beast: 1.3, "group-scene": 1.4 },
  },
  {
    id: "ritual",
    label: "Ritual",
    beingVerbs: ["kneels in", "keeps vigil in", "performs the appointed work in"],
    objectVerbs: ["has been prepared in", "occupies the center of", "is being passed through"],
    placeVerbs: ["is arranged for ceremony in", "holds a repeated rite above"],
    eventVerbs: ["is being completed over", "moves through the gathered bodies in"],
    witnesses: [
      "while attendants wait with ordinary tools rather than theatrical props",
      "as the participants treat the act as familiar labor",
    ],
    subjectWeights: { character: 1.5, "group-scene": 1.8, architecture: 1.3, "spell-moment": 1.4, artifact: 1.2 },
  },
  {
    id: "exploration",
    label: "Exploration",
    beingVerbs: ["picks a path through", "tests the ground in", "enters"],
    objectVerbs: ["is being examined in", "has been uncovered in", "lies partly revealed in"],
    placeVerbs: ["recedes into unmapped ground beyond", "offers a passage through"],
    eventVerbs: ["reveals itself across", "alters the readable space of"],
    witnesses: [
      "with measuring tools, notes or a held lamp doing practical work",
      "as if the explorer has already been here longer than intended",
    ],
    subjectWeights: { character: 1.3, "environment-land": 1.6, architecture: 1.4, artifact: 1.3, creature: 1.1 },
  },
  {
    id: "combat",
    label: "Combat",
    beingVerbs: ["collides with an opponent in", "is driven back through", "commits to a strike in"],
    objectVerbs: ["has been dropped mid-use in", "lies between two bodies in"],
    placeVerbs: ["is being fought through", "channels the fight along"],
    eventVerbs: ["breaks the space of", "turns the air violent over"],
    witnesses: [
      "before the outcome is decided",
      "with the surrounding place still more important than the blow itself",
    ],
    subjectWeights: { character: 1.4, "group-scene": 1.5, "weapon-tool": 1.5, beast: 1.3, creature: 1.2 },
  },
  {
    id: "discovery",
    label: "Discovery",
    beingVerbs: ["finds something unexpected in", "stops short inside", "uncovers a presence in"],
    objectVerbs: ["has been found where it does not belong in", "sits newly exposed in"],
    placeVerbs: ["conceals a second space within", "gives way to a hidden interior in"],
    eventVerbs: ["makes the overlooked visible across", "changes what the place seemed to be in"],
    witnesses: [
      "while the discoverer has not yet touched it",
      "while the find is still being understood at a glance",
    ],
    subjectWeights: { artifact: 1.5, character: 1.3, architecture: 1.3, "plant-fungus": 1.2, creature: 1.2 },
  },
  {
    id: "transformation",
    label: "Transformation",
    beingVerbs: ["is changing in", "can no longer fully belong to", "is caught between states in"],
    objectVerbs: ["is in the process of becoming something else in", "shows two material lives at once in"],
    placeVerbs: ["is being rewritten by growth or damage across", "no longer holds a single identity in"],
    eventVerbs: ["is converting one state into another across", "unmakes and remakes"],
    witnesses: [
      "without a convenient glow to explain the change",
      "so the transition must be read in anatomy, material or weather",
    ],
    subjectWeights: { creature: 1.5, "plant-fungus": 1.5, "spell-moment": 1.6, character: 1.2, "construct-machine": 1.3 },
  },
  {
    id: "aftermath",
    label: "Aftermath",
    beingVerbs: ["remains among what is left of", "surveys the damage in", "sits exhausted in"],
    objectVerbs: ["has survived the event in", "is the remaining evidence in"],
    placeVerbs: ["still smokes, drips or settles after use in", "shows the work already finished across"],
    eventVerbs: ["has already passed through", "leaves its residue over"],
    witnesses: [
      "when the decisive action is already over",
      "with the picture about consequence rather than climax"
    ],
    subjectWeights: { "environment-land": 1.5, architecture: 1.4, "group-scene": 1.3, artifact: 1.2, character: 1.2 },
  },
  {
    id: "journey",
    label: "Journey",
    beingVerbs: ["follows the long route through", "is still hours from rest in", "crosses"],
    objectVerbs: ["is being carried along", "marks a waypoint in"],
    placeVerbs: ["is a passage rather than a destination through", "stretches onward across"],
    eventVerbs: ["travels the length of", "weather moves with the travelers across"],
    witnesses: [
      "with distance made visible by scale and atmosphere",
      "as if this is one ordinary day of a much longer movement",
    ],
    subjectWeights: { "environment-land": 1.7, character: 1.3, "group-scene": 1.4, beast: 1.3 },
  },
  {
    id: "procession",
    label: "Procession",
    beingVerbs: ["moves in an ordered line through", "is carried among others along", "walks the repeated path of"],
    objectVerbs: ["is borne at the head of a line through", "is displayed in motion along"],
    placeVerbs: ["is built to receive a moving column through", "channels a public route across"],
    eventVerbs: ["travels with the column through", "occupies the air above the moving line in"],
    witnesses: [
      "with the crowd treated as a rhythmic mass rather than a set of portraits",
      "with one figure or object slightly breaking the pattern"
    ],
    subjectWeights: { "group-scene": 2, character: 1.2, architecture: 1.3, artifact: 1.2 },
  },
  {
    id: "ambush",
    label: "Ambush",
    beingVerbs: ["waits inside", "is already too far into", "uses the cover of"],
    objectVerbs: ["has been placed to interrupt movement in", "lies where a path narrows in"],
    placeVerbs: ["offers a killing corner inside", "conceals a second position above"],
    eventVerbs: ["is about to close over", "breaks from cover across"],
    witnesses: [
      "a moment before contact",
      "with the trap readable in space rather than in facial expression",
    ],
    subjectWeights: { character: 1.3, creature: 1.4, beast: 1.4, "group-scene": 1.4, architecture: 1.1 },
  },
  {
    id: "construction",
    label: "Construction",
    beingVerbs: ["raises timber in", "directs the lift inside", "works the joints of"],
    objectVerbs: ["is being fitted into", "leans unfinished against"],
    placeVerbs: ["is incomplete and still being made across", "shows scaffolding and true work in"],
    eventVerbs: ["coincides with the raising of", "stresses the unfinished structure of"],
    witnesses: [
      "with ropes, props, wedges or wet mortar doing real mechanical work",
      "with the unfinished state more interesting than the imagined completion"
    ],
    subjectWeights: { architecture: 1.8, "construct-machine": 1.6, "group-scene": 1.5, "weapon-tool": 1.3, character: 1.2 },
  },
  {
    id: "harvest",
    label: "Harvest",
    beingVerbs: ["cuts, pulls or gathers in", "wades the crop of", "sorts the take in"],
    objectVerbs: ["is stacked, bound or dripping in", "has just been taken from"],
    placeVerbs: ["is being emptied of its yield across", "holds the season's work in"],
    eventVerbs: ["ripens and is taken across", "moves through the working bodies in"],
    witnesses: [
      "as practical agricultural labor rather than pastoral decoration",
      "with waste, mud and repetition kept in the picture",
    ],
    subjectWeights: { "plant-fungus": 1.6, "group-scene": 1.6, "environment-land": 1.5, beast: 1.2, character: 1.2 },
  },
  {
    id: "funeral",
    label: "Funeral",
    beingVerbs: ["attends the lowering in", "carries the weight through", "stands last in"],
    objectVerbs: ["is being committed to", "rests before internment in"],
    placeVerbs: ["is prepared for the dead in", "receives a burial party at"],
    eventVerbs: ["settles over the mourners in", "marks the last public moment in"],
    witnesses: [
      "with grief shown in posture, clothing and the practical difficulty of the task",
      "without theatrical mourning poses"
    ],
    subjectWeights: { "group-scene": 1.8, character: 1.4, architecture: 1.3, artifact: 1.2, "environment-land": 1.2 },
  },
  {
    id: "celebration",
    label: "Celebration",
    beingVerbs: ["is caught mid-laugh or mid-work in", "carries food or drink through", "occupies the noisy center of"],
    objectVerbs: ["is being shared in", "has been brought out for the occasion in"],
    placeVerbs: ["is temporarily claimed by a gathering in", "holds tables, smoke and leftover heat in"],
    eventVerbs: ["briefly occupies", "moves between bodies in"],
    witnesses: [
      "as a lived gathering, not a festival poster",
      "with tiredness, spill and ordinary clutter still present",
    ],
    subjectWeights: { "group-scene": 1.8, character: 1.3, architecture: 1.2, "environment-land": 1.1 },
  },
  {
    id: "guarding",
    label: "Guarding",
    beingVerbs: ["keeps a long watch over", "stands assigned to", "has been posted at"],
    objectVerbs: ["is the thing being kept in", "occupies the watched threshold of"],
    placeVerbs: ["is a threshold meant to be held at", "presents a single approach through"],
    eventVerbs: ["threatens the watched line of", "has not yet arrived at"],
    witnesses: [
      "after hours of uneventful duty rather than at the instant of heroism",
      "with boredom, cold or stiffness allowed to shape the body",
    ],
    subjectWeights: { character: 1.5, "group-scene": 1.3, architecture: 1.4, beast: 1.3, "construct-machine": 1.2 },
  },
  {
    id: "rest",
    label: "Rest",
    beingVerbs: ["has stopped in", "sleeps or sits heavily in", "unloads a burden in"],
    objectVerbs: ["has been set aside in", "leans unused in"],
    placeVerbs: ["offers a pause inside", "holds a quiet interval in"],
    eventVerbs: ["has thinned to almost nothing over", "lingers as leftover weather in"],
    witnesses: [
      "when the body has finally given up its working tension",
      "with equipment, animals or architecture still describing the labor that came before",
    ],
    subjectWeights: { character: 1.4, beast: 1.4, "group-scene": 1.2, architecture: 1.1, "environment-land": 1.2 },
  },
  {
    id: "escape",
    label: "Escape",
    beingVerbs: ["breaks away through", "is already leaving", "forces a gap in"],
    objectVerbs: ["has been abandoned during flight in", "is clutched while leaving"],
    placeVerbs: ["offers a narrowing way out of", "is being left behind across"],
    eventVerbs: ["opens a brief route through", "collapses the remaining cover of"],
    witnesses: [
      "with the exit more important than the pursuer",
      "with motion shown through bodies, debris and compressed space"
    ],
    subjectWeights: { character: 1.4, creature: 1.3, "group-scene": 1.4, architecture: 1.2, beast: 1.2 },
  },
  {
    id: "repair",
    label: "Repair",
    beingVerbs: ["mends a broken joint in", "holds a failed part together in", "works a repair in"],
    objectVerbs: ["is being restored in", "shows the failed part inside"],
    placeVerbs: ["is under repair across", "has been shored up inside"],
    eventVerbs: ["is the moment a failure is caught in", "passes through a damaged system in"],
    witnesses: [
      "with the broken thing more specific than the worker's face",
      "with the method of repair made visually clear"
    ],
    subjectWeights: { "weapon-tool": 1.6, "construct-machine": 1.6, architecture: 1.4, artifact: 1.4, character: 1.3 },
  },
  {
    id: "crossing",
    label: "Crossing",
    beingVerbs: ["fords, climbs or is lowered through", "commits to the crossing of", "waits for a gap in"],
    objectVerbs: ["is being passed from one side to the other in", "hangs over the gap of"],
    placeVerbs: ["is a threshold between two grounds in", "must be crossed rather than inhabited in"],
    eventVerbs: ["occurs at the unstable middle of", "makes the crossing costly across"],
    witnesses: [
      "at the most awkward point of the crossing, not the scenic overlook",
      "with weight, rope, current or drop doing real work",
    ],
    subjectWeights: { "environment-land": 1.6, architecture: 1.3, character: 1.3, "group-scene": 1.3, beast: 1.2 },
  },
  {
    id: "offering",
    label: "Offering",
    beingVerbs: ["leaves a portion in", "sets down a gift along", "waits after placing something in"],
    objectVerbs: ["has been given over to", "sits as a tithe in"],
    placeVerbs: ["is a place where things are left in", "receives goods, food or tokens at"],
    eventVerbs: ["accepts or ignores the gift in", "moves toward what has been left in"],
    witnesses: [
      "while the givers keep a respectful or fearful distance",
      "as if this exchange has happened many times before",
    ],
    subjectWeights: { creature: 1.5, "plant-fungus": 1.2, artifact: 1.3, "group-scene": 1.4, character: 1.3 },
  },
  {
    id: "labor",
    label: "Labor",
    beingVerbs: ["works a repetitive task in", "hauls, pumps, saws or carries through", "is bent to the job in"],
    objectVerbs: ["is the day's tool in", "is being used down to the grain in"],
    placeVerbs: ["exists to be worked in", "is organized around a practical task in"],
    eventVerbs: ["is incidental to the work happening in", "interrupts a shift inside"],
    witnesses: [
      "with economy of motion rather than dramatic strain",
      "with the workplace more particular than a generic mill or mine"
    ],
    subjectWeights: { character: 1.4, "group-scene": 1.6, "construct-machine": 1.4, "weapon-tool": 1.3, architecture: 1.2 },
  },
  {
    id: "survey",
    label: "Survey",
    beingVerbs: ["measures, maps or estimates in", "sights along a line through", "records what the land is doing in"],
    objectVerbs: ["is being used to take a reading in", "lies among notes and stakes in"],
    placeVerbs: ["is being understood as quantity across", "has been marked with temporary lines in"],
    eventVerbs: ["makes measurement briefly possible over", "interferes with a clean reading of"],
    witnesses: [
      "with poles, cords, ledgers or levels included as drawing problems",
      "with the landscape treated as something to be known, not worshipped"
    ],
    subjectWeights: { character: 1.4, "environment-land": 1.6, architecture: 1.3, artifact: 1.3 },
  },
  {
    id: "descent",
    label: "Descent",
    beingVerbs: ["goes down into", "is lowered through", "pauses on the way into"],
    objectVerbs: ["has been taken below into", "marks the drop into"],
    placeVerbs: ["falls away underfoot in", "is entered from above through"],
    eventVerbs: ["follows the downward axis of", "makes the lower dark readable in"],
    witnesses: [
      "with the change in light and air as important as the figure",
      "with the vertical drop used as a compositional engine"
    ],
    subjectWeights: { architecture: 1.5, "environment-land": 1.4, character: 1.3, "construct-machine": 1.2, creature: 1.2 },
  },
  {
    id: "market",
    label: "Market",
    beingVerbs: ["haggles, waits or carries stock through", "moves a load between stalls in", "works a narrow aisle of"],
    objectVerbs: ["is displayed among lesser goods in", "sits priced, wrapped or leaking in"],
    placeVerbs: ["is packed with temporary commerce in", "holds a morning of trade across"],
    eventVerbs: ["passes almost unnoticed through the traffic of", "briefly stills a crowded aisle in"],
    witnesses: [
      "with goods, animals, mud and overlapping roofs doing most of the drawing work",
      "with faces kept secondary to stuff and space"
    ],
    subjectWeights: { "group-scene": 1.8, artifact: 1.4, architecture: 1.3, "plant-fungus": 1.2, beast: 1.2 },
  },
  {
    id: "shelter",
    label: "Shelter",
    beingVerbs: ["has taken cover in", "packs bodies and gear into", "listens to weather from inside"],
    objectVerbs: ["has been brought in out of the weather in", "occupies the dry corner of"],
    placeVerbs: ["keeps the outside from fully entering", "is only just adequate as refuge in"],
    eventVerbs: ["presses against the thin protection of", "makes the interior feel provisional in"],
    witnesses: [
      "with wet gear, breath and cramped overlapping forms",
      "with the outside still visible as a threat or a relief"
    ],
    subjectWeights: { character: 1.3, "group-scene": 1.4, architecture: 1.5, beast: 1.2, "environment-land": 1.2 },
  },
  {
    id: "tracking",
    label: "Tracking",
    beingVerbs: ["reads sign through", "follows a trail into", "crouches over evidence in"],
    objectVerbs: ["has been dropped or shed in", "is the remaining trace in"],
    placeVerbs: ["still holds the passage of something through", "is a record of movement across"],
    eventVerbs: ["has left a readable disturbance in", "is inferred rather than seen in"],
    witnesses: [
      "with prints, breakage, scent-marks or discarded matter doing narrative work",
      "with the quarry not necessarily visible"
    ],
    subjectWeights: { character: 1.4, beast: 1.4, creature: 1.3, "environment-land": 1.5 },
  },
  {
    id: "kindling",
    label: "Kindling",
    beingVerbs: ["starts a fire in", "feeds a reluctant flame in", "shields a first light in"],
    objectVerbs: ["is being heated, quenched or annealed in", "waits beside the new fire in"],
    placeVerbs: ["is organized around a new heat source in", "dark except where work has begun in"],
    eventVerbs: ["begins as a small controlled heat in", "takes at the edge of"],
    witnesses: [
      "when the light is still weak and local",
      "with faces or forms only partly available to the eye"
    ],
    subjectWeights: { character: 1.3, "construct-machine": 1.3, "spell-moment": 1.4, architecture: 1.2, artifact: 1.2 },
  },
  {
    id: "flood",
    label: "Flood",
    beingVerbs: ["wades, poles or is stranded in", "salvages what can still be lifted from", "moves livestock out of"],
    objectVerbs: ["floats, snags or is half-submerged in", "has come to rest against"],
    placeVerbs: ["is no longer the dry place it was built to be in", "holds a raised waterline across"],
    eventVerbs: ["rearranges the usable ground of", "turns paths into channels through"],
    witnesses: [
      "with reflections, submerged structure and interrupted work as the subject",
      "treated as a local inundation rather than a disaster panorama"
    ],
    subjectWeights: { "environment-land": 1.7, architecture: 1.4, "group-scene": 1.3, "plant-fungus": 1.3, creature: 1.2 },
  },
  {
    id: "study",
    label: "Study",
    beingVerbs: ["examines a specimen in", "copies, dissects or compares in", "sits with a problem in"],
    objectVerbs: ["is laid out for inspection in", "occupies a table, sling or clamp in"],
    placeVerbs: ["is a room for looking closely inside", "keeps tools of attention in"],
    eventVerbs: ["is understood only by close looking in", "occupies the specimen and the air of"],
    witnesses: [
      "with the act of looking as the pose",
      "with the object of study given as much body as the student"
    ],
    subjectWeights: { artifact: 1.5, creature: 1.3, "plant-fungus": 1.4, character: 1.3, "construct-machine": 1.2 },
  },
  {
    id: "homecoming",
    label: "Homecoming",
    beingVerbs: ["arrives back at", "is recognized from a doorway in", "carries news or a load into"],
    objectVerbs: ["has been brought home to", "is set down at last in"],
    placeVerbs: ["receives a returning body at", "is slightly changed in the absence of"],
    eventVerbs: ["reaches the threshold of", "thins out as the journey ends in"],
    witnesses: [
      "with the domestic interior and the traveler's wear in the same picture",
      "without a dramatic reunion gesture"
    ],
    subjectWeights: { character: 1.5, architecture: 1.4, "group-scene": 1.3, beast: 1.2 },
  },
  {
    id: "trespass",
    label: "Trespass",
    beingVerbs: ["has gone where they should not in", "is already inside", "crosses a boundary into"],
    objectVerbs: ["does not belong in", "has been brought illicitly into"],
    placeVerbs: ["was not meant to be entered this way in", "still shows the marks of its proper use in"],
    eventVerbs: ["follows an unauthorized path through", "makes the interior briefly public in"],
    witnesses: [
      "with the wrongness coming from context and scale, not from a glowing ward",
      "with the trespasser kept small relative to the place"
    ],
    subjectWeights: { character: 1.4, architecture: 1.5, artifact: 1.2, creature: 1.2, "environment-land": 1.2 },
  },
]
