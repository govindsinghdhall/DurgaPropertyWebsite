import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { formatCurrency, formatLabel, getImageUrl } from '@/utils/formatters'
import { selectPrimaryImage } from '@/utils/imageUtils'
import { Camera } from 'lucide-react'

interface PropertyCardWithGalleryProps {
  property: Property
}

export function PropertyCardWithGallery({ property }: PropertyCardWithGalleryProps) {
  const image = selectPrimaryImage(property.images)
  
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={getImageUrl(image?.url, property.type, property.luxury)}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {(property.images?.length ?? 0) > 1 && (
          <button
            type="button"
            className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white flex items-center gap-1"
            aria-label={`View all ${property.images!.length} photos`}
          >
            <Camera className="h-3 w-3" />
            {property.images!.length}
          </button>
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