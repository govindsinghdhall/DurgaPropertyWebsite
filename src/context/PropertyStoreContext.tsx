import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { PropertyAlert, PropertyFilters, SavedSearch, ScheduledVisit } from '@/types'

interface PropertyStore {
  favorites: string[]
  compareList: string[]
  viewedProperties: string[]
  recentSearches: string[]
  savedSearches: SavedSearch[]
  scheduledVisits: ScheduledVisit[]
  alerts: PropertyAlert[]
  inquiries: { id: string; propertyId?: string; date: string; message: string }[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleCompare: (id: string) => void
  isInCompare: (id: string) => boolean
  canAddToCompare: boolean
  addViewed: (id: string) => void
  addRecentSearch: (query: string) => void
  saveSearch: (label: string, filters: Partial<PropertyFilters>) => void
  removeSavedSearch: (id: string) => void
  scheduleVisit: (visit: Omit<ScheduledVisit, 'id' | 'status'>) => void
  addAlert: (label: string, filters: Partial<PropertyFilters>) => void
  addInquiry: (propertyId: string | undefined, message: string) => void
  clearCompare: () => void
}

const PropertyStoreContext = createContext<PropertyStore | null>(null)

const MAX_COMPARE = 4
const MAX_RECENT = 8

export function PropertyStoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('dp_favorites', [])
  const [compareList, setCompareList] = useLocalStorage<string[]>('dp_compare', [])
  const [viewedProperties, setViewed] = useLocalStorage<string[]>('dp_viewed', [])
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('dp_recent_searches', [])
  const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>('dp_saved_searches', [])
  const [scheduledVisits, setScheduledVisits] = useLocalStorage<ScheduledVisit[]>('dp_visits', [])
  const [alerts, setAlerts] = useLocalStorage<PropertyAlert[]>('dp_alerts', [])
  const [inquiries, setInquiries] = useLocalStorage<PropertyStore['inquiries']>('dp_inquiries', [])

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      )
    },
    [setFavorites],
  )

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareList((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id)
        if (prev.length >= MAX_COMPARE) return prev
        return [...prev, id]
      })
    },
    [setCompareList],
  )

  const addViewed = useCallback(
    (id: string) => {
      setViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 50))
    },
    [setViewed],
  )

  const addRecentSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return
      setRecentSearches((prev) =>
        [query, ...prev.filter((x) => x !== query)].slice(0, MAX_RECENT),
      )
    },
    [setRecentSearches],
  )

  const saveSearch = useCallback(
    (label: string, filters: Partial<PropertyFilters>) => {
      setSavedSearches((prev) => [
        { id: crypto.randomUUID(), label, filters, createdAt: new Date().toISOString() },
        ...prev,
      ])
    },
    [setSavedSearches],
  )

  const removeSavedSearch = useCallback(
    (id: string) => setSavedSearches((prev) => prev.filter((s) => s.id !== id)),
    [setSavedSearches],
  )

  const scheduleVisit = useCallback(
    (visit: Omit<ScheduledVisit, 'id' | 'status'>) => {
      setScheduledVisits((prev) => [
        { ...visit, id: crypto.randomUUID(), status: 'pending' },
        ...prev,
      ])
    },
    [setScheduledVisits],
  )

  const addAlert = useCallback(
    (label: string, filters: Partial<PropertyFilters>) => {
      setAlerts((prev) => [
        { id: crypto.randomUUID(), label, filters, active: true },
        ...prev,
      ])
    },
    [setAlerts],
  )

  const addInquiry = useCallback(
    (propertyId: string | undefined, message: string) => {
      setInquiries((prev) => [
        { id: crypto.randomUUID(), propertyId, date: new Date().toISOString(), message },
        ...prev,
      ])
    },
    [setInquiries],
  )

  const value = useMemo<PropertyStore>(
    () => ({
      favorites,
      compareList,
      viewedProperties,
      recentSearches,
      savedSearches,
      scheduledVisits,
      alerts,
      inquiries,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      toggleCompare,
      isInCompare: (id) => compareList.includes(id),
      canAddToCompare: compareList.length < MAX_COMPARE,
      addViewed,
      addRecentSearch,
      saveSearch,
      removeSavedSearch,
      scheduleVisit,
      addAlert,
      addInquiry,
      clearCompare: () => setCompareList([]),
    }),
    [
      favorites, compareList, viewedProperties, recentSearches, savedSearches,
      scheduledVisits, alerts, inquiries, toggleFavorite, toggleCompare,
      addViewed, addRecentSearch, saveSearch, removeSavedSearch,
      scheduleVisit, addAlert, addInquiry, setCompareList,
    ],
  )

  return (
    <PropertyStoreContext.Provider value={value}>
      {children}
    </PropertyStoreContext.Provider>
  )
}

export function usePropertyStore() {
  const ctx = useContext(PropertyStoreContext)
  if (!ctx) throw new Error('usePropertyStore must be used within PropertyStoreProvider')
  return ctx
}
