import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { PropertyImage } from './PropertyImage'
import { formatCurrency, formatLabel } from '@/utils/formatters'

interface PropertyListRowProps {
  property: Property
}

export function PropertyListRow({ property }: PropertyListRowProps) {
  const image = property.images?.find((img) => img.isPrimary) || property.images?.[0]

  return (
    <article className="card-premium group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition sm:flex-row">
      <Link to={`/properties/${property.id}`} className="block shrink-0 sm:w-80">
        <PropertyImage
          src={image?.url}
          alt={property.title}
          propertyType={property.type}
          luxury={property.luxury}
          className="property-image-frame--list"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {property.isVerified && (
              <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">Verified</span>
            )}
            {property.hasRera && (
              <span className="rounded-full bg-brand-700 px-2 py-0.5 text-xs font-bold text-white">RERA</span>
            )}
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
              {formatLabel(property.type)}
            </span>
          </div>

          <Link to={`/properties/${property.id}`}>
            <h3 className="mt-2 text-xl font-bold text-slate-900 transition group-hover:text-brand-600">
              {property.title}
            </h3>
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            {property.locality}, {property.sector} · {property.builderName}
          </p>

          <p className="mt-3 line-clamp-2 text-sm text-slate-600">{property.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-extrabold text-brand-700">{formatCurrency(property.price)}</p>
            <p className="text-xs text-slate-500">
              ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq ft · {property.configuration ?? `${property.bedrooms} BHK`} · {property.area} sq ft
            </p>
          </div>
          <Link
            to={`/properties/${property.id}`}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
