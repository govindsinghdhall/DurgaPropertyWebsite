import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { formatCurrency, formatLabel, getImageUrl } from '@/utils/formatters'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const image = property.images?.find((img) => img.isPrimary) || property.images?.[0]

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={getImageUrl(image?.url)}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {(property.images?.length ?? 0) > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
            {property.images!.length} photos
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {formatLabel(property.type)}
          </span>
          <span className="text-lg font-bold text-brand-600">{formatCurrency(property.price)}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{property.title}</h3>
        <p className="mt-1 text-sm text-slate-500">
          {property.city}, {property.state}
        </p>
        <div className="mt-4 flex gap-4 text-sm text-slate-600">
          <span>{property.bedrooms ?? 0} Beds</span>
          <span>{property.bathrooms ?? 0} Baths</span>
          <span>{property.area} sq ft</span>
        </div>
      </div>
    </Link>
  )
}
