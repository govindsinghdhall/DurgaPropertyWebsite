import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { propertiesService } from '@/api/services/properties.service'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import { normalizeProperties } from '@/utils/property'
import { formatCurrency } from '@/utils/formatters'

const compareFields = [
  { key: 'price', label: 'Price', render: (v: unknown) => formatCurrency(v as string | number) },
  { key: 'locality', label: 'Location' },
  { key: 'area', label: 'Area (sq ft)', render: (v: unknown) => `${v} sq ft` },
  { key: 'bedrooms', label: 'BHK', render: (v: unknown) => `${v ?? 0} BHK` },
  { key: 'builderName', label: 'Builder' },
  { key: 'propertyAge', label: 'Property Age' },
  { key: 'possessionDate', label: 'Possession' },
  { key: 'roiPotential', label: 'ROI Potential', render: (v: unknown) => `${v}% p.a.` },
  { key: 'pricePerSqFt', label: 'Price/sq ft', render: (v: unknown) => `₹${(v as number).toLocaleString('en-IN')}` },
  { key: 'furnishing', label: 'Furnishing' },
  { key: 'postedBy', label: 'Posted By' },
]

export function ComparePage() {
  const { compareList, toggleCompare } = usePropertyStore()

  const { data } = useQuery({
    queryKey: ['properties', 'compare'],
    queryFn: () => propertiesService.getAll({ limit: 600 }),
  })

  const enriched = normalizeProperties(data?.data ?? [])
  const properties = enriched.filter((p) => compareList.includes(p.id))

  if (!properties.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="text-xl font-semibold text-slate-700">No properties to compare</p>
        <p className="mt-2 text-slate-500">Add up to 4 properties from the listings page</p>
        <Link to="/properties" className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-bold text-white">
          Browse Properties
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Compare Properties</h1>
      <p className="mt-2 text-slate-500">Side-by-side comparison of {properties.length} properties</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-600">Feature</th>
              {properties.map((p) => (
                <th key={p.id} className="min-w-[200px] px-4 py-3 text-left">
                  <p className="font-bold text-slate-900 line-clamp-2">{p.title}</p>
                  <button type="button" onClick={() => toggleCompare(p.id)} className="mt-1 text-xs text-red-500 hover:underline">
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareFields.map((field) => (
              <tr key={field.key} className="border-t border-slate-100">
                <td className="sticky left-0 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{field.label}</td>
                {properties.map((p) => {
                  const val = p[field.key as keyof typeof p]
                  return (
                    <td key={p.id} className="px-4 py-3 text-sm text-slate-700">
                      {field.render ? field.render(val) : String(val ?? '—')}
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="border-t border-slate-100">
              <td className="sticky left-0 bg-white px-4 py-3 text-sm font-semibold text-slate-600">Amenities</td>
              {properties.map((p) => (
                <td key={p.id} className="px-4 py-3 text-sm text-slate-700">
                  {(p.amenities ?? []).slice(0, 4).join(', ') || '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
