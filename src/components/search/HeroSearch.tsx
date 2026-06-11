import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROPERTY_CATEGORIES, BHK_OPTIONS, BUDGET_RANGES, PROPERTY_TYPES, PROPERTY_STATUS_OPTIONS } from '@/constants/filters'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import type { PropertyCategory } from '@/types'
import { SearchAutocomplete } from './SearchAutocomplete'

export function HeroSearch() {
  const navigate = useNavigate()
  const { addRecentSearch } = usePropertyStore()
  const [category, setCategory] = useState<PropertyCategory>('buy')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [status, setStatus] = useState('')

  const handleSearch = () => {
    if (location.trim()) addRecentSearch(location.trim())
    const params = new URLSearchParams()
    params.set('category', category)
    if (location) params.set('search', location)
    if (propertyType) params.set('type', propertyType)
    if (budgetMin) params.set('minPrice', budgetMin)
    if (budgetMax) params.set('maxPrice', budgetMax)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (status) params.set('status', status)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="animate-fade-in-up">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {PROPERTY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              category === cat.id
                ? 'bg-white text-brand-700 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <span aria-hidden>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Search panel */}
      <div className="glass mt-6 rounded-2xl p-4 text-slate-900 shadow-2xl sm:p-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Location</label>
            <SearchAutocomplete
              value={location}
              onChange={setLocation}
              onSelect={setLocation}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">All Types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Budget Range</label>
            <select
              value={budgetMax}
              onChange={(e) => {
                const range = BUDGET_RANGES.find((r) => String(r.max) === e.target.value)
                if (range) {
                  setBudgetMin(String(range.min))
                  setBudgetMax(String(range.max))
                } else {
                  setBudgetMin('')
                  setBudgetMax('')
                }
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">Any Budget</option>
              {BUDGET_RANGES.map((r) => (
                <option key={r.label} value={r.max}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Bedrooms</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">Any BHK</option>
              {BHK_OPTIONS.map((b) => (
                <option key={b} value={b.replace(/\D/g, '') || '0'}>{b}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">Any Status</option>
              {PROPERTY_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-700 hover:shadow-xl sm:w-auto sm:px-12"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Properties
        </button>
      </div>
    </div>
  )
}
