import type { IllustrationCommission } from "@/lib/commissions/types"

const STORAGE_KEY = "poa-forge-commission"

export function loadStoredCommission(): IllustrationCommission | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as IllustrationCommission
    if (!parsed?.id || !parsed?.seed || !parsed?.title) return null
    return parsed
  } catch {
    return null
  }
}

export function saveStoredCommission(commission: IllustrationCommission | null) {
  if (typeof window === "undefined") return
  if (!commission) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commission))
}
