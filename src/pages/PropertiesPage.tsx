import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { PremiumPropertyCard } from '@/components/properties/PremiumPropertyCard'
import { PropertyListRow } from '@/components/properties/PropertyListRow'
import { SearchAutocomplete } from '@/components/search/SearchAutocomplete'
import { DEFAULT_FILTERS } from '@/constants/filters'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import { usePropertiesQuery } from '@/hooks/usePropertiesQuery'
import { normalizeLocalityParam } from '@/data/localData'
import { normalizeProperties } from '@/utils/property'
import type { PropertyFilters as Filters, PropertyCategory } from '@/types'

type ViewMode = 'grid' | 'list'

export function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const { addRecentSearch, saveSearch } = usePropertyStore()
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS })
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const rawLocality = searchParams.get('locality') || ''
    setFilters((prev) => ({
      ...prev,
      search: searchParams.get('search') || '',
      category: (searchParams.get('category') as PropertyCategory) || 'buy',
      locality: rawLocality ? normalizeLocalityParam(rawLocality) : '',
      sector: searchParams.get('sector') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      bhk: searchParams.get('bhk') ? [searchParams.get('bhk')!] : [],
      status: searchParams.get('status') || '',
      city: searchParams.get('city') || 'Gurgaon',
      builder: searchParams.get('builder') || '',
      featured: searchParams.get('featured') === '1',
      reraOnly: searchParams.get('rera') === '1',
      readyToMove: searchParams.get('readyToMove') === '1',
      underConstruction: searchParams.get('underConstruction') === '1',
      possessionYear: searchParams.get('possessionYear') || '',
      propertyTypes: searchParams.get('type') ? [searchParams.get('type')!] : [],
    }))
  }, [searchParams])

  const sortParams = useMemo(() => {
    if (sortBy === 'price_asc') return { sortBy: 'price', sortOrder: 'asc' as const }
    if (sortBy === 'price_desc') return { sortBy: 'price', sortOrder: 'desc' as const }
    if (sortBy === 'newest') return { sortBy: 'newest', sortOrder: 'desc' as const }
    return {}
  }, [sortBy])

  const { data, isLoading } = usePropertiesQuery(
    ['properties', 'inventory', filters, sortBy],
    {
      ...filters,
      ...sortParams,
      limit: 600,
      featured: filters.featured || undefined,
      reraOnly: filters.reraOnly || undefined,
      readyToMove: filters.readyToMove || undefined,
      underConstruction: filters.underConstruction || undefined,
      possessionYear: filters.possessionYear || undefined,
      builder: filters.builder || undefined,
    },
  )

  const properties = useMemo(() => normalizeProperties(data?.data ?? []), [data])
  const total = data?.meta?.total ?? properties.length

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }))
    if (query.trim()) addRecentSearch(query.trim())
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">All Properties</h1>
          <p className="mt-1 text-slate-500">{total.toLocaleString()} listings in Gurgaon</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              List
            </button>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-brand-500"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button
            type="button"
            onClick={() => saveSearch(`Search: ${filters.search || 'All'}`, filters)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Save Search
          </button>
        </div>
      </div>

      <div className="mt-6">
        <SearchAutocomplete
          value={filters.search}
          onChange={(v) => setFilters((prev) => ({ ...prev, search: v }))}
          onSelect={handleSearch}
        />
      </div>

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 lg:hidden"
      >
        Filters ({total})
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
          <PropertyFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters({ ...DEFAULT_FILTERS })}
            resultCount={total}
          />
        </div>

        <div>
          {isLoading && (
            <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="aspect-video animate-shimmer" />
                  <div className="h-24 animate-shimmer" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && properties.length > 0 && viewMode === 'grid' && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PremiumPropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {!isLoading && properties.length > 0 && viewMode === 'list' && (
            <div className="space-y-4">
              {properties.map((property) => (
                <PropertyListRow key={property.id} property={property} />
              ))}
            </div>
          )}

          {!isLoading && properties.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <p className="text-xl font-semibold text-slate-700">No properties match your filters</p>
              <button
                type="button"
                onClick={() => setFilters({ ...DEFAULT_FILTERS })}
                className="mt-6 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
