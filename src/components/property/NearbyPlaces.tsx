interface NearbyPlacesProps {
  schools?: string[]
  hospitals?: string[]
  metro?: string[]
}

export function NearbyPlaces({ schools, hospitals, metro }: NearbyPlacesProps) {
  const nearbyData = {
    schools: schools ?? ['Delhi Public School (1.2 km)', 'GD Goenka School (2.5 km)', 'Heritage Xperiential (3.1 km)'],
    hospitals: hospitals ?? ['Medanta Hospital (4.5 km)', 'Fortis Gurgaon (3.8 km)', 'Artemis Hospital (5.2 km)'],
    metro: metro ?? ['IFFCO Chowk Metro (2.1 km)', 'Huda City Centre (3.5 km)', 'Millennium City Centre (4.0 km)'],
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(nearbyData).map(([key, places]) => (
        <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
            <span aria-hidden>{icons[key as keyof typeof icons]}</span>
            Nearby {key}
          </h3>
          <ul className="mt-3 space-y-2">
            {places.map((place) => (
              <li key={place} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {place}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const icons = {
  schools: '🏫',
  hospitals: '🏥',
  metro: '🚇',
}
