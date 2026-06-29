import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AMENITY_OPTIONS, BHK_OPTIONS, FACING_OPTIONS,
  FURNISHING_OPTIONS, POSSESSION_OPTIONS,
  PROPERTY_AGE_OPTIONS, PROPERTY_TYPES,
} from '@/constants/filters'
import { GURGAON_LOCALITIES, GURGAON_SECTORS, POSSESSION_YEARS } from '@/constants/locations'
import { publicService } from '@/api/services/public.service'
import { getStaticBuilders } from '@/data/localData'
import type { PropertyFilters as Filters } from '@/types'

const STATIC_BUILDER_NAMES = getStaticBuilders().map((b) => b.name)

interface PropertyFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onReset: () => void
  resultCount: number
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-100 py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-slate-800"
      >
        {title}
        <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: string[]
  onToggle: (val: string) => void
}) {
  return (
    <div className="space-y-1.5">
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

export function PropertyFilters({ filters, onChange, onReset, resultCount }: PropertyFiltersProps) {
  const { data: builders = [] } = useQuery({
    queryKey: ['public', 'builders'],
    queryFn: () => publicService.getBuilders(),
    staleTime: 5 * 60 * 1000,
  })
  const builderNames = builders.length
    ? builders.map((builder) => builder.name)
    : STATIC_BUILDER_NAMES

  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  const toggleArray = (key: keyof Filters, val: string) => {
    const arr = filters[key] as string[]
    update({
      [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
    } as Partial<Filters>)
  }

  return (
    <aside className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <p className="text-xs text-slate-500">{resultCount} properties found</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          Reset All
        </button>
      </div>

      <FilterSection title="Location">
        <input
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
          placeholder="City"
          className={inputClass}
        />
        <select
          value={filters.locality}
          onChange={(e) => update({ locality: e.target.value })}
          className={inputClass}
        >
          <option value="">All Localities</option>
          {GURGAON_LOCALITIES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={filters.sector}
          onChange={(e) => update({ sector: e.target.value })}
          className={inputClass}
        >
          <option value="">All Sectors</option>
          {GURGAON_SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          value={filters.pincode}
          onChange={(e) => update({ pincode: e.target.value })}
          placeholder="Pincode"
          className={inputClass}
        />
        <input
          value={filters.landmark}
          onChange={(e) => update({ landmark: e.target.value })}
          placeholder="Landmark"
          className={inputClass}
        />
      </FilterSection>

      <FilterSection title="Budget">
        <div className="grid grid-cols-2 gap-2">
          <input
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            placeholder="Min Price (₹)"
            type="number"
            className={inputClass}
          />
          <input
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            placeholder="Max Price (₹)"
            type="number"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={filters.emiMin}
            onChange={(e) => update({ emiMin: e.target.value })}
            placeholder="EMI Min (₹)"
            type="number"
            className={inputClass}
          />
          <input
            value={filters.emiMax}
            onChange={(e) => update({ emiMax: e.target.value })}
            placeholder="EMI Max (₹)"
            type="number"
            className={inputClass}
          />
        </div>
      </FilterSection>

      <FilterSection title="Property Type">
        <CheckboxGroup
          options={PROPERTY_TYPES}
          selected={filters.propertyTypes}
          onToggle={(v) => toggleArray('propertyTypes', v)}
        />
      </FilterSection>

      <FilterSection title="Configuration">
        <CheckboxGroup
          options={BHK_OPTIONS}
          selected={filters.bhk}
          onToggle={(v) => toggleArray('bhk', v)}
        />
      </FilterSection>

      <FilterSection title="Area (sq ft)" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={filters.minArea}
            onChange={(e) => update({ minArea: e.target.value })}
            placeholder="Min Area"
            type="number"
            className={inputClass}
          />
          <input
            value={filters.maxArea}
            onChange={(e) => update({ maxArea: e.target.value })}
            placeholder="Max Area"
            type="number"
            className={inputClass}
          />
        </div>
      </FilterSection>

      <FilterSection title="Amenities" defaultOpen={false}>
        <CheckboxGroup
          options={AMENITY_OPTIONS}
          selected={filters.amenities}
          onToggle={(v) => toggleArray('amenities', v)}
        />
      </FilterSection>

      <FilterSection title="Property Age" defaultOpen={false}>
        <CheckboxGroup
          options={PROPERTY_AGE_OPTIONS}
          selected={filters.propertyAge}
          onToggle={(v) => toggleArray('propertyAge', v)}
        />
      </FilterSection>

      <FilterSection title="Furnishing" defaultOpen={false}>
        <CheckboxGroup
          options={FURNISHING_OPTIONS}
          selected={filters.furnishing}
          onToggle={(v) => toggleArray('furnishing', v)}
        />
      </FilterSection>

      <FilterSection title="Facing" defaultOpen={false}>
        <CheckboxGroup
          options={FACING_OPTIONS}
          selected={filters.facing}
          onToggle={(v) => toggleArray('facing', v)}
        />
      </FilterSection>

      <FilterSection title="Possession" defaultOpen={false}>
        <CheckboxGroup
          options={POSSESSION_OPTIONS}
          selected={filters.possessionStatus}
          onToggle={(v) => toggleArray('possessionStatus', v)}
        />
      </FilterSection>

      <FilterSection title="Builder">
        <select
          value={filters.builder}
          onChange={(e) => update({ builder: e.target.value })}
          className={inputClass}
        >
          <option value="">All Builders</option>
          {builderNames.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Possession Year" defaultOpen={false}>
        <select
          value={filters.possessionYear}
          onChange={(e) => update({ possessionYear: e.target.value })}
          className={inputClass}
        >
          <option value="">Any Year</option>
          {POSSESSION_YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Quick Filters" defaultOpen={false}>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => update({ featured: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-600"
          />
          Featured Properties
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.reraOnly}
            onChange={(e) => update({ reraOnly: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-600"
          />
          RERA Approved
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.readyToMove}
            onChange={(e) => update({ readyToMove: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-600"
          />
          Ready To Move
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.underConstruction}
            onChange={(e) => update({ underConstruction: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-brand-600"
          />
          Under Construction
        </label>
      </FilterSection>
    </aside>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
