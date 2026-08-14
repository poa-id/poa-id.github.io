import { dateSeed, seededRandom, shuffleWithSeed } from "./seed"
import { getDrillMinutes } from "./session"

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message)
}

const randA = seededRandom(dateSeed("2026-08-14", 0))
const randB = seededRandom(dateSeed("2026-08-14", 0))
for (let i = 0; i < 20; i++) {
  assert(randA() === randB(), "mulberry32 must be deterministic for the same seed")
}

const randC = seededRandom(dateSeed("2026-08-14", 1))
assert(randC() !== seededRandom(dateSeed("2026-08-14", 0))(), "remix must change the seed")

const seq = shuffleWithSeed([1, 2, 3, 4, 5], seededRandom(dateSeed("2026-08-14", 2)))
const seq2 = shuffleWithSeed([1, 2, 3, 4, 5], seededRandom(dateSeed("2026-08-14", 2)))
assert(seq.join(",") === seq2.join(","), "shuffleWithSeed must be deterministic")

assert(getDrillMinutes(30) === 10, "30m drills")
assert(getDrillMinutes(60) === 15, "60m drills")
assert(getDrillMinutes(90) === 18, "90m drills")
assert(getDrillMinutes(120) === 20, "120m drills")

console.log("lineforge determinism checks passed")
