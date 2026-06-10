interface PropertyMapProps {
  address: string
  city: string
}

export function PropertyMap({ address, city }: PropertyMapProps) {
  const query = encodeURIComponent(`${address}, ${city}`)
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=77.02%2C28.42%2C77.12%2C28.52&layer=mapnik&marker=28.47%2C77.07`

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-bold text-slate-900">Location & Commute</h3>
          <p className="text-sm text-slate-500">{address}, {city}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
        >
          Open in Maps
        </a>
      </div>

      <iframe
        title={`Map of ${address}`}
        src={mapSrc}
        className="h-80 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="grid grid-cols-3 gap-4 border-t border-slate-100 p-5">
        {[
          { label: 'To Cyber City', time: '12 min' },
          { label: 'To Airport', time: '25 min' },
          { label: 'To Metro', time: '8 min' },
        ].map((c) => (
          <div key={c.label} className="text-center">
            <p className="text-lg font-bold text-brand-700">{c.time}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
