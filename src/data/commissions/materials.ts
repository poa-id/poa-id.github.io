export interface MaterialDef {
  id: string
  name: string
  tags: string[]
}

export const MATERIALS: MaterialDef[] = [
  { id: "steel", name: "Steel", tags: ["metal", "worked"] },
  { id: "iron", name: "Iron", tags: ["metal", "worked", "aged"] },
  { id: "bronze", name: "Bronze", tags: ["metal", "worked"] },
  { id: "copper", name: "Copper", tags: ["metal", "worked"] },
  { id: "pewter", name: "Pewter", tags: ["metal", "worked"] },
  { id: "lead", name: "Lead", tags: ["metal", "dull"] },
  { id: "leather", name: "Leather", tags: ["organic", "worked", "skin"] },
  { id: "rawhide", name: "Rawhide", tags: ["organic", "worked", "skin"] },
  { id: "bone", name: "Bone", tags: ["organic", "hard", "death"] },
  { id: "antler", name: "Antler", tags: ["organic", "hard", "growth"] },
  { id: "ivory-worn", name: "Worn ivory", tags: ["organic", "hard", "worked"] },
  { id: "wood", name: "Wood", tags: ["organic", "worked", "growth"] },
  { id: "rotten-wood", name: "Rotten wood", tags: ["organic", "decay", "wet"] },
  { id: "charred-wood", name: "Charred wood", tags: ["organic", "fire", "decay"] },
  { id: "bark", name: "Bark", tags: ["organic", "growth", "texture"] },
  { id: "polished-stone", name: "Polished stone", tags: ["mineral", "worked"] },
  { id: "rough-stone", name: "Rough stone", tags: ["mineral", "raw"] },
  { id: "wet-stone", name: "Wet stone", tags: ["mineral", "wet"] },
  { id: "brick", name: "Brick", tags: ["mineral", "worked", "civic"] },
  { id: "ceramic", name: "Ceramic", tags: ["worked", "fragile"] },
  { id: "glass", name: "Glass", tags: ["fragile", "worked", "specular"] },
  { id: "horn-pane", name: "Horn pane", tags: ["organic", "worked", "translucent"] },
  { id: "fabric", name: "Fabric", tags: ["textile", "worked"] },
  { id: "translucent-fabric", name: "Translucent fabric", tags: ["textile", "translucent"] },
  { id: "felt", name: "Felt", tags: ["textile", "dull"] },
  { id: "wool", name: "Wool", tags: ["textile", "organic"] },
  { id: "fur", name: "Fur", tags: ["organic", "skin", "growth"] },
  { id: "wet-fur", name: "Wet fur", tags: ["organic", "skin", "wet"] },
  { id: "feathers", name: "Feathers", tags: ["organic", "growth"] },
  { id: "scales", name: "Scales", tags: ["organic", "skin"] },
  { id: "chitin", name: "Chitin", tags: ["organic", "hard", "skin"] },
  { id: "foliage", name: "Foliage", tags: ["growth", "organic"] },
  { id: "moss", name: "Moss", tags: ["growth", "wet", "decay"] },
  { id: "lichen", name: "Lichen", tags: ["growth", "mineral", "decay"] },
  { id: "fungus", name: "Fungus", tags: ["growth", "decay", "organic"] },
  { id: "wet-surfaces", name: "Wet surfaces", tags: ["wet"] },
  { id: "shallow-water", name: "Shallow water", tags: ["wet", "water"] },
  { id: "deep-water", name: "Silted water", tags: ["wet", "water"] },
  { id: "ice", name: "Ice", tags: ["cold", "mineral", "specular"] },
  { id: "snow", name: "Snow", tags: ["cold", "dull"] },
  { id: "mud", name: "Mud", tags: ["wet", "earth"] },
  { id: "clay", name: "Clay", tags: ["earth", "worked"] },
  { id: "smoke", name: "Smoke", tags: ["fire", "atmosphere"] },
  { id: "ash", name: "Ash", tags: ["fire", "decay", "dull"] },
  { id: "pitch", name: "Pitch", tags: ["worked", "wet", "organic"] },
  { id: "rope", name: "Rope", tags: ["worked", "textile"] },
  { id: "wicker", name: "Wicker", tags: ["worked", "organic"] },
  { id: "thatch", name: "Thatch", tags: ["worked", "organic", "rural"] },
  { id: "plaster", name: "Plaster", tags: ["worked", "mineral", "civic"] },
  { id: "rust", name: "Rusted metal", tags: ["metal", "decay"] },
  { id: "verdigris", name: "Verdigris", tags: ["metal", "decay"] },
  { id: "paper-vellum", name: "Vellum or paper", tags: ["worked", "fragile"] },
  { id: "wax", name: "Wax", tags: ["worked", "organic", "translucent"] },
  { id: "salt-crust", name: "Salt crust", tags: ["mineral", "decay"] },
  { id: "shell", name: "Shell", tags: ["organic", "hard", "water"] },
]

export const MATERIAL_BY_ID: Record<string, MaterialDef> = Object.fromEntries(
  MATERIALS.map((material) => [material.id, material])
)

export function materialName(id: string): string {
  return MATERIAL_BY_ID[id]?.name ?? id
}

export const MATERIAL_ENV_TAGS: Record<string, string[]> = {
  water: ["wet-surfaces", "shallow-water", "wet-stone", "rotten-wood"],
  forest: ["bark", "foliage", "moss", "wood", "wet-fur"],
  swamp: ["mud", "rotten-wood", "fungus", "shallow-water", "wet-fur"],
  industrial: ["iron", "steel", "rust", "smoke", "charred-wood"],
  fire: ["charred-wood", "ash", "iron", "smoke", "bronze"],
  sacred: ["polished-stone", "fabric", "translucent-fabric", "wax", "bronze"],
  agricultural: ["wood", "wicker", "mud", "foliage", "leather"],
  coastal: ["wet-stone", "rope", "salt-crust", "shell", "wood"],
  cold: ["snow", "ice", "wool", "fur", "iron"],
  underground: ["rough-stone", "wet-stone", "iron", "bone", "lichen"],
  death: ["bone", "fabric", "wax", "rotten-wood", "lead"],
  civic: ["brick", "plaster", "ceramic", "fabric", "iron"],
  mountain: ["rough-stone", "iron", "wool", "leather", "ice"],
  decay: ["rotten-wood", "rust", "fungus", "moss", "mud"],
}
