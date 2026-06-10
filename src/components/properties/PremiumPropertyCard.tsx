import { Link } from 'react-router-dom'
import type { EnrichedProperty } from '@/types'
import { formatCurrency, formatLabel } from '@/utils/formatters'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import { useToast } from '@/components/ui/Toast'
import { PropertyImage } from './PropertyImage'

interface PremiumPropertyCardProps {
  property: EnrichedProperty
  priority?: boolean
}

export function PremiumPropertyCard({ property, priority = false }: PremiumPropertyCardProps) {
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare, canAddToCompare } = usePropertyStore()
  const { showToast } = useToast()
  const image = property.images?.find((img) => img.isPrimary) || property.images?.[0]
  const fav = isFavorite(property.id)
  const comparing = isInCompare(property.id)

  const shareProperty = async () => {
    const url = `${window.location.origin}/properties/${property.id}`
    if (navigator.share) {
      await navigator.share({ title: property.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      showToast({ type: 'success', title: 'Link copied', message: 'Property link copied to clipboard.' })
    }
  }

  const whatsappUrl = `https://wa.me/919810078510?text=${encodeURIComponent(
    `Hi, I'm interested in ${property.title} listed at ${formatCurrency(property.price)}. ${window.location.origin}/properties/${property.id}`,
  )}`

  return (
    <article className="card-premium card-glass group overflow-hidden rounded-2xl">
      <div className="relative overflow-hidden">
        <Link to={`/properties/${property.id}`} className="block">
          <PropertyImage
            src={image?.url}
            alt={property.title}
            propertyType={property.type}
            luxury={property.luxury}
            priority={priority}
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {property.isVerified && (
            <span className="rounded-full bg-green-600/95 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">✓ Verified</span>
          )}
          {property.hasRera && (
            <span className="rounded-full bg-brand-700/95 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">RERA</span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {(property.images?.length ?? 0) > 0 && (
            <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              📷 {property.images!.length}
            </span>
          )}
          {property.hasVideoTour && (
            <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">▶ Video</span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ActionBtn label={fav ? 'Remove from favorites' : 'Add to favorites'} onClick={() => toggleFavorite(property.id)} active={fav}>
            {fav ? '❤️' : '🤍'}
          </ActionBtn>
          <ActionBtn
            label="Compare"
            onClick={() => {
              if (!comparing && !canAddToCompare) {
                showToast({ type: 'error', title: 'Compare limit', message: 'You can compare up to 4 properties.' })
                return
              }
              toggleCompare(property.id)
            }}
            active={comparing}
          >
            ⚖️
          </ActionBtn>
          <ActionBtn label="Share" onClick={shareProperty}>↗</ActionBtn>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-extrabold text-brand-700">{formatCurrency(property.price)}</p>
            <p className="text-xs text-slate-500">₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq ft</p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {formatLabel(property.type)}
          </span>
        </div>

        <Link to={`/properties/${property.id}`}>
          <h3 className="mt-3 text-lg font-bold text-slate-900 transition hover:text-brand-600 line-clamp-2">
            {property.title}
          </h3>
        </Link>

        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {property.locality}, {property.sector}
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
          <span>{property.configuration ?? `${property.bedrooms ?? 0} BHK`}</span>
          <span>·</span>
          <span>{property.area} sq ft</span>
        </div>

        <p className="mt-2 text-xs text-slate-400">by {property.builderName}</p>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/properties/${property.id}`}
            className="flex-1 rounded-xl bg-brand-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl border border-green-500 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-100"
            aria-label="Contact via WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function ActionBtn({
  children, label, onClick, active,
}: { children: React.ReactNode; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => { e.preventDefault(); onClick() }}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm shadow-md backdrop-blur-sm transition ${active ? 'bg-brand-600 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'}`}
    >
      {children}
    </button>
  )
}
