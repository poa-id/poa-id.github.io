"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { Navigation, DeskRail } from "@/components/rule-of-life/components/Navigation"
import { JournalEntryInput } from "@/components/rule-of-life/components/JournalEntryInput"
import { TodayScreen } from "@/components/rule-of-life/screens/TodayScreen"
import { PillarsScreen } from "@/components/rule-of-life/screens/PillarsScreen"
import { PillarDetailScreen } from "@/components/rule-of-life/screens/PillarDetailScreen"
import { PillarEditorScreen } from "@/components/rule-of-life/screens/PillarEditorScreen"
import { JournalScreen } from "@/components/rule-of-life/screens/JournalScreen"
import { DailyDetailScreen } from "@/components/rule-of-life/screens/DailyDetailScreen"
import { CollectionDetailScreen } from "@/components/rule-of-life/screens/CollectionDetailScreen"
import { WeeklyExamenScreen } from "@/components/rule-of-life/screens/WeeklyExamenScreen"
import { SettingsScreen } from "@/components/rule-of-life/screens/SettingsScreen"
import { dateKey, startOfWeek, endOfWeek } from "@/lib/rule-of-life/dates"
import { calculateContinuity } from "@/lib/rule-of-life/observance"
import { loadOrSeedStore, saveStore } from "@/lib/rule-of-life/persistence"
import type {
  Collection,
  EntrySymbol,
  Frequency,
  JournalEntry,
  Pillar,
  PillarMode,
  QuantityConfig,
  RuleOfLifeSettings,
  RuleOfLifeStore,
  ViewState,
} from "@/lib/rule-of-life/types"
import "@/components/rule-of-life/rule-of-life.css"

function resolveBack(view: ViewState): ViewState {
  if (view.type === "edit" && view.pillarId) return { type: "detail", pillarId: view.pillarId }
  if (view.type === "dailyDetail" || view.type === "collectionDetail") return { type: "main", screen: "journal" }
  if (view.type === "settings") return { type: "main", screen: "today" }
  return { type: "main", screen: "pillars" }
}

export function RuleOfLifeApp({ serifVar, sansVar }: { serifVar: string; sansVar: string }) {
  const [store, setStore] = useState<RuleOfLifeStore | null>(null)
  const [viewState, setViewState] = useState<ViewState>({ type: "main", screen: "today" })
  const [composing, setComposing] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [systemDark, setSystemDark] = useState(false)
  const today = dateKey()

  useEffect(() => {
    const loaded = loadOrSeedStore()
    setStore(loaded)
    setViewState({ type: "main", screen: loaded.settings.defaultView })
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const sync = () => setSystemDark(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (store) saveStore(store)
  }, [store])

  const continuityMap = useMemo(() => {
    if (!store) return {}
    return Object.fromEntries(
      store.pillars.map((pillar) => [pillar.id, calculateContinuity(pillar, store.observations)])
    )
  }, [store])

  if (!store) {
    return (
      <div className={`rol-root ${serifVar} ${sansVar} h-[100dvh] w-full`} />
    )
  }

  const night = store.settings.theme === "night" || (store.settings.theme === "system" && systemDark)
  const weekStart = startOfWeek(new Date(), store.settings.weekStartsOn)
  const weekEnd = endOfWeek(new Date(), store.settings.weekStartsOn)
  const weekKey = dateKey(weekStart)
  const examenContent = store.examen.find((item) => item.weekStart === weekKey)?.content ?? ""

  const updateStore = (updater: (current: RuleOfLifeStore) => RuleOfLifeStore) => {
    setStore((current) => (current ? updater(current) : current))
  }

  const handleObserve = (pillarId: string) => {
    updateStore((current) => {
      const existing = current.observations.find((item) => item.pillarId === pillarId && item.date === today)
      if (existing) {
        return {
          ...current,
          observations: current.observations.map((item) =>
            item.id === existing.id ? { ...item, observed: !item.observed } : item
          ),
        }
      }
      return {
        ...current,
        observations: [
          ...current.observations,
          { id: `obs-${Date.now()}`, pillarId, date: today, observed: true },
        ],
      }
    })
  }

  const handleIncrement = (pillarId: string, amount: number) => {
    updateStore((current) => {
      const existing = current.observations.find((item) => item.pillarId === pillarId && item.date === today)
      if (existing) {
        return {
          ...current,
          observations: current.observations.map((item) =>
            item.id === existing.id ? { ...item, quantity: (item.quantity ?? 0) + amount } : item
          ),
        }
      }
      return {
        ...current,
        observations: [
          ...current.observations,
          { id: `obs-${Date.now()}`, pillarId, date: today, observed: false, quantity: amount },
        ],
      }
    })
  }

  const handleSavePillar = (data: {
    title: string
    description: string
    mode: PillarMode
    frequency: Frequency
    quantityConfig?: QuantityConfig
    isFocus: boolean
  }) => {
    if (viewState.type !== "edit") return
    if (viewState.pillarId) {
      updateStore((current) => ({
        ...current,
        pillars: current.pillars.map((pillar) =>
          pillar.id === viewState.pillarId ? { ...pillar, ...data } : pillar
        ),
      }))
      setViewState({ type: "detail", pillarId: viewState.pillarId })
      return
    }
    const id = `pillar-${Date.now()}`
    const pillar: Pillar = {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    }
    updateStore((current) => ({ ...current, pillars: [...current.pillars, pillar] }))
    setViewState({ type: "main", screen: "pillars" })
  }

  const handleAddJournalEntry = (
    content: string,
    symbol: EntrySymbol,
    hasCheckbox: boolean,
    linkedCollections: string[],
    date = today
  ) => {
    const entry: JournalEntry = {
      id: `je-${Date.now()}`,
      date,
      symbol,
      content,
      hasCheckbox,
      isChecked: false,
      linkedCollections: linkedCollections.length ? linkedCollections : undefined,
      createdAt: new Date().toISOString(),
    }
    updateStore((current) => ({ ...current, journal: [entry, ...current.journal] }))
  }

  const handleEditJournalEntry = (
    content: string,
    symbol: EntrySymbol,
    hasCheckbox: boolean,
    linkedCollections: string[],
    isChecked?: boolean
  ) => {
    if (!editingEntry) return
    updateStore((current) => ({
      ...current,
      journal: current.journal.map((entry) =>
        entry.id === editingEntry.id
          ? {
              ...entry,
              content,
              symbol,
              hasCheckbox,
              isChecked: hasCheckbox ? Boolean(isChecked) : undefined,
              linkedCollections: linkedCollections.length ? linkedCollections : undefined,
            }
          : entry
      ),
    }))
    setEditingEntry(null)
  }

  const handleToggleEntryCheck = (entryId: string) => {
    updateStore((current) => ({
      ...current,
      journal: current.journal.map((entry) =>
        entry.id === entryId ? { ...entry, isChecked: !entry.isChecked } : entry
      ),
    }))
  }

  const handleDeleteEntry = (entryId: string) => {
    updateStore((current) => ({
      ...current,
      journal: current.journal.filter((entry) => entry.id !== entryId),
    }))
    if (editingEntry?.id === entryId) setEditingEntry(null)
  }

  const handleReflectionChange = (date: string, content: string) => {
    updateStore((current) => {
      const exists = current.reflections.some((item) => item.date === date)
      return {
        ...current,
        reflections: exists
          ? current.reflections.map((item) => (item.date === date ? { ...item, content } : item))
          : [...current.reflections, { date, content }],
      }
    })
  }

  const handleSettings = (patch: Partial<RuleOfLifeSettings>) => {
    updateStore((current) => ({ ...current, settings: { ...current.settings, ...patch } }))
  }

  const handleCreateCollection = (name: string) => {
    const collection: Collection = {
      id: `col-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
    }
    updateStore((current) => ({ ...current, collections: [...current.collections, collection] }))
  }

  const handleDeletePillar = (pillarId: string) => {
    updateStore((current) => ({
      ...current,
      pillars: current.pillars.filter((pillar) => pillar.id !== pillarId),
      observations: current.observations.filter((item) => item.pillarId !== pillarId),
    }))
    setPendingDelete(null)
    setViewState({ type: "main", screen: "pillars" })
  }

  const editorOverlay = editingEntry ? (
    <div className="absolute inset-x-0 bottom-0 z-[60] px-4 pb-6">
      <div className="w-full">
        <JournalEntryInput
          collections={store.collections}
          defaultSymbol={store.settings.defaultSymbol}
          initial={editingEntry}
          submitLabel="Save"
          onSubmit={handleEditJournalEntry}
          onCancel={() => setEditingEntry(null)}
        />
      </div>
    </div>
  ) : null

  let body: ReactNode = null

  if (viewState.type === "main" && viewState.screen === "today") {
    body = (
      <TodayScreen
        today={today}
        pillars={store.pillars}
        observations={store.observations}
        journal={store.journal}
        collections={store.collections}
        continuityMap={continuityMap}
        defaultSymbol={store.settings.defaultSymbol}
        composing={composing}
        onComposingChange={setComposing}
        onOpenSettings={() => setViewState({ type: "settings" })}
        onOpenPillar={(pillar) => setViewState({ type: "detail", pillarId: pillar.id })}
        onObserve={handleObserve}
        onIncrement={handleIncrement}
        onAddEntry={handleAddJournalEntry}
        onToggleCheck={handleToggleEntryCheck}
        onOpenCollection={(id) => setViewState({ type: "collectionDetail", collectionId: id })}
        onEditEntry={setEditingEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    )
  } else if (viewState.type === "main" && viewState.screen === "pillars") {
    body = (
      <PillarsScreen
        pillars={store.pillars}
        onCreate={() => setViewState({ type: "edit" })}
        onOpen={(pillar) => setViewState({ type: "detail", pillarId: pillar.id })}
      />
    )
  } else if (viewState.type === "main" && viewState.screen === "journal") {
    body = (
      <JournalScreen
        today={today}
        journal={store.journal}
        collections={store.collections}
        defaultSymbol={store.settings.defaultSymbol}
        composing={composing}
        onComposingChange={setComposing}
        onAddEntry={handleAddJournalEntry}
        onToggleCheck={handleToggleEntryCheck}
        onOpenCollection={(id) => setViewState({ type: "collectionDetail", collectionId: id })}
        onOpenDay={(date) => setViewState({ type: "dailyDetail", date })}
        onCreateCollection={handleCreateCollection}
        onEditEntry={setEditingEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    )
  } else if (viewState.type === "main" && viewState.screen === "review") {
    body = (
      <WeeklyExamenScreen
        weekStart={weekStart}
        weekEnd={weekEnd}
        pillars={store.pillars}
        observations={store.observations}
        content={examenContent}
        onChange={(content) => {
          updateStore((current) => {
            const exists = current.examen.some((item) => item.weekStart === weekKey)
            return {
              ...current,
              examen: exists
                ? current.examen.map((item) => (item.weekStart === weekKey ? { ...item, content } : item))
                : [...current.examen, { weekStart: weekKey, content }],
            }
          })
        }}
        onSave={() => {
          updateStore((current) => {
            const exists = current.examen.some((item) => item.weekStart === weekKey)
            return {
              ...current,
              examen: exists
                ? current.examen.map((item) =>
                    item.weekStart === weekKey ? { ...item, content: examenContent } : item
                  )
                : [...current.examen, { weekStart: weekKey, content: examenContent }],
            }
          })
        }}
      />
    )
  } else if (viewState.type === "detail") {
    const pillar = store.pillars.find((item) => item.id === viewState.pillarId)
    if (pillar) {
      body = (
        <PillarDetailScreen
          pillar={pillar}
          continuity={continuityMap[pillar.id] ?? { current: 0, longest: 0, history: [] }}
          onBack={() => setViewState(resolveBack(viewState))}
          onEdit={() => setViewState({ type: "edit", pillarId: pillar.id })}
          onDelete={() => setPendingDelete(pillar.id)}
        />
      )
    }
  } else if (viewState.type === "edit") {
    const pillar = viewState.pillarId
      ? store.pillars.find((item) => item.id === viewState.pillarId)
      : undefined
    body = (
      <PillarEditorScreen
        pillar={pillar}
        onBack={() => setViewState(resolveBack(viewState))}
        onSave={handleSavePillar}
      />
    )
  } else if (viewState.type === "dailyDetail") {
    body = (
      <DailyDetailScreen
        date={viewState.date}
        pillars={store.pillars}
        observations={store.observations}
        entries={store.journal.filter((entry) => entry.date === viewState.date)}
        collections={store.collections}
        reflection={store.reflections.find((item) => item.date === viewState.date)?.content ?? ""}
        onBack={() => setViewState(resolveBack(viewState))}
        onReflectionChange={(content) => handleReflectionChange(viewState.date, content)}
        onToggleCheck={handleToggleEntryCheck}
        onOpenCollection={(id) => setViewState({ type: "collectionDetail", collectionId: id })}
        onEditEntry={setEditingEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    )
  } else if (viewState.type === "collectionDetail") {
    const collection = store.collections.find((item) => item.id === viewState.collectionId)
    if (collection) {
      body = (
        <CollectionDetailScreen
          collection={collection}
          collections={store.collections}
          entries={store.journal.filter((entry) => entry.linkedCollections?.includes(collection.id))}
          defaultSymbol={store.settings.defaultSymbol}
          composing={composing}
          onComposingChange={setComposing}
          onBack={() => setViewState(resolveBack(viewState))}
          onRename={(name) =>
            updateStore((current) => ({
              ...current,
              collections: current.collections.map((item) =>
                item.id === collection.id ? { ...item, name } : item
              ),
            }))
          }
          onAddEntry={(content, symbol, hasCheckbox, linked) =>
            handleAddJournalEntry(content, symbol, hasCheckbox, linked)
          }
          onToggleCheck={handleToggleEntryCheck}
          onOpenCollection={(id) => setViewState({ type: "collectionDetail", collectionId: id })}
          onEditEntry={setEditingEntry}
          onDeleteEntry={handleDeleteEntry}
          onUnlink={(entryId) =>
            updateStore((current) => ({
              ...current,
              journal: current.journal.map((entry) =>
                entry.id === entryId
                  ? {
                      ...entry,
                      linkedCollections: entry.linkedCollections?.filter((id) => id !== collection.id),
                    }
                  : entry
              ),
            }))
          }
        />
      )
    }
  } else if (viewState.type === "settings") {
    body = (
      <SettingsScreen
        settings={store.settings}
        store={store}
        onChange={handleSettings}
        onBack={() => setViewState(resolveBack(viewState))}
        onManageCollections={() => setViewState({ type: "main", screen: "journal" })}
        onRestore={(next) => {
          saveStore(next)
          setStore(next)
        }}
        onResetObservances={() => {
          updateStore((current) => ({ ...current, observations: [] }))
        }}
      />
    )
  }

  return (
    <div
      className={`rol-root ${serifVar} ${sansVar} h-[100dvh] w-full overflow-hidden relative ${night ? "rol-night" : ""} ${store.settings.reduceMotion ? "rol-reduce-motion" : ""}`}
      data-text-size={store.settings.textSize}
    >
      <div className="rol-side-shelves rol-side-shelves--left" aria-hidden="true">
        <img src="/forge/rule-of-life/scriptorium-shelves.png" alt="" />
      </div>

      <div className="rol-app">
        <Link
          href="/forge"
          className="absolute top-3 left-3 z-40 text-[10px] uppercase tracking-widest text-rol-muted-foreground/70 hover:text-rol-foreground font-serif"
        >
          ← Forge
        </Link>

        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto pt-8">{body}</div>

        {editorOverlay}
      </div>

      <div className="rol-side-shelves rol-side-shelves--right" aria-hidden="true">
        <img src="/forge/rule-of-life/scriptorium-shelves.png" alt="" />
      </div>

      {viewState.type === "main" ? (
        <Navigation
          screen={viewState.screen}
          onChange={(screen) => {
            setComposing(false)
            setViewState({ type: "main", screen })
          }}
        />
      ) : (
        <DeskRail />
      )}

      {pendingDelete ? (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/30 px-4 pb-10">
          <div className="w-full max-w-md rounded bg-rol-card border border-rol-border/50 shadow-card p-5">
            <p className="font-serif text-lg">Delete this pillar?</p>
            <p className="text-sm text-rol-muted-foreground mt-2">
              Its observances will be laid aside. This cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="h-9 px-3 text-sm rounded hover:bg-rol-muted/50"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 px-3 text-sm rounded bg-rol-destructive text-rol-destructive-foreground"
                onClick={() => handleDeletePillar(pendingDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
