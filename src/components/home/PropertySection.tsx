import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { PremiumPropertyCard } from '@/components/properties/PremiumPropertyCard'
import { normalizeProperties } from '@/utils/property'

const MAX_VISIBLE = 6

interface PropertySectionProps {
  title: string
  subtitle: string
  properties: Property[]
  viewAllHref: string
  viewAllLabel?: string
  loading?: boolean
  variant?: 'default' | 'highlight'
  index?: number
}

export function PropertySection({
  title,
  subtitle,
  properties,
  viewAllHref,
  viewAllLabel = 'View All Properties',
  loading,
  variant = 'default',
  index = 0,
}: PropertySectionProps) {
  const items = normalizeProperties(properties).slice(0, MAX_VISIBLE)

  if (!loading && !items.length) return null

  const isHighlight = variant === 'highlight'

  return (
    <section
      className={`animate-fade-in-up ${isHighlight ? 'bg-gradient-to-b from-brand-50/80 to-white py-16' : 'py-14'}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {isHighlight && (
              <span className="mb-2 inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Highly Searched
              </span>
            )}
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <p className="mt-2 text-slate-500">{subtitle}</p>
          </div>
          <Link
            to={viewAllHref}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-sm transition hover:border-brand-400 hover:bg-brand-50 hover:shadow-md"
          >
            {viewAllLabel} →
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: MAX_VISIBLE }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-video animate-shimmer" />
                <div className="space-y-3 p-5">
                  <div className="h-6 w-2/3 animate-shimmer rounded" />
                  <div className="h-4 w-full animate-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property, i) => (
              <PremiumPropertyCard key={property.id} property={property} priority={index === 0 && i < 2} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
