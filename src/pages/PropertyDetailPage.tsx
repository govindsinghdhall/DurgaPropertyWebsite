import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { propertiesService } from '@/api/services/properties.service'
import { PropertyGallery } from '@/components/properties/PropertyGallery'
import { PremiumPropertyCard } from '@/components/properties/PremiumPropertyCard'
import { PropertyLeadActions } from '@/components/property/PropertyLeadActions'
import { NearbyPlaces } from '@/components/property/NearbyPlaces'
import { PropertyMap } from '@/components/property/PropertyMap'
import { CalculatorPanel } from '@/components/calculators/CalculatorPanel'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import { normalizeProperty, normalizeProperties, getSimilarProperties } from '@/utils/property'
import { formatCurrency, formatListingPrice, formatLabel } from '@/utils/formatters'
import { calculateEMI } from '@/utils/calculators'

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addViewed } = usePropertyStore()

  const { data: property, isLoading, isError } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesService.getById(id!),
    enabled: !!id,
  })

  const { data: allData } = useQuery({
    queryKey: ['properties', 'similar'],
    queryFn: () => propertiesService.getAll({ limit: 50 }),
  })

  useEffect(() => {
    if (id) addViewed(id)
  }, [id, addViewed])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="h-96 animate-shimmer rounded-2xl" />
      </div>
    )
  }

  if (isError || !property) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="text-xl font-semibold text-slate-700">Property not found</p>
        <Link to="/properties" className="mt-4 inline-block font-semibold text-brand-600 hover:underline">
          Back to properties
        </Link>
      </div>
    )
  }

  const enriched = normalizeProperty(property)
  const allEnriched = normalizeProperties(allData?.data ?? [])
  const similar = getSimilarProperties(enriched, allEnriched, 3)
  const price = Number(enriched.price) || 0
  const emi = calculateEMI(price * 0.8, 8.5, 20)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link to="/properties" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
        ← Back to properties
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <PropertyGallery images={enriched.images ?? []} title={enriched.title} />

          {/* Video / 360 badges */}
          <div className="flex flex-wrap gap-2">
            {enriched.hasVideoTour && (
              <span className="rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700">▶ Video Tour</span>
            )}
            <span className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-700">360° View</span>
            <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">Virtual Tour</span>
          </div>

          {/* Title & badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
                {formatLabel(enriched.type)}
              </span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
                {formatLabel(enriched.status)}
              </span>
              {enriched.isVerified && (
                <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold text-white">✓ Verified</span>
              )}
              {enriched.hasRera && (
                <span className="rounded-full bg-brand-700 px-3 py-1 text-sm font-bold text-white">RERA: {enriched.reraId}</span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 lg:text-4xl">{enriched.title}</h1>
            <p className="mt-2 text-slate-500">
              {enriched.locality}, {enriched.sector} · by {enriched.builderName}
            </p>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Price', value: formatListingPrice(enriched.price, enriched.listingCategory) },
              { label: 'Price/sq ft', value: `₹${enriched.pricePerSqFt.toLocaleString('en-IN')}` },
              { label: 'Area', value: `${enriched.area} sq ft` },
              { label: 'BHK', value: `${enriched.bedrooms ?? 0} BHK` },
              { label: 'Carpet Area', value: `${enriched.carpetArea} sq ft` },
              { label: 'Built-up', value: `${enriched.builtUpArea} sq ft` },
              { label: 'Age', value: enriched.propertyAge },
              { label: 'Possession', value: enriched.possessionDate },
            ].map((spec) => (
              <div key={spec.label} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{spec.label}</p>
                <p className="mt-1 font-bold text-slate-900">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* EMI breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-brand-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">Price Breakdown & EMI</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  {enriched.listingCategory === 'rent' || enriched.listingCategory === 'pg' ? 'Monthly Rent' : 'Property Price'}
                </p>
                <p className="text-xl font-bold text-brand-700">{formatListingPrice(price, enriched.listingCategory)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Est. EMI (80% loan, 20yr)</p>
                <p className="text-xl font-bold text-brand-700">{formatCurrency(emi)}/mo</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">ROI Potential</p>
                <p className="text-xl font-bold text-brand-700">{enriched.roiPotential ?? '—'}% p.a.</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {enriched.description && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">About This Property</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{enriched.description}</p>
            </div>
          )}

          {/* Amenities */}
          {enriched.amenities && enriched.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {enriched.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <span className="text-brand-600">✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor plan placeholder */}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="font-semibold text-slate-700">Floor Plans</p>
            <p className="mt-1 text-sm text-slate-500">Contact agent to view detailed floor plans</p>
          </div>

          {enriched.highlights && enriched.highlights.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Highlights</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {enriched.highlights.map((h) => (
                  <span key={h} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-slate-900">Locality Insights</h2>
            <div className="mt-4">
              <NearbyPlaces
                schools={enriched.nearbySchools}
                hospitals={enriched.nearbyHospitals}
                metro={enriched.nearbyMetroStations}
              />
            </div>
          </div>

          {/* Map */}
          <PropertyMap address={enriched.address} city={enriched.city} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PropertyLeadActions property={enriched} />
          <CalculatorPanel compact />
        </div>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900">Similar Properties</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PremiumPropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
