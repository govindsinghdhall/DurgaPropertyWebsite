import { useDataSource } from '@/context/DataSourceContext'

export function OfflineBanner() {
  const { isOfflineMode } = useDataSource()

  if (!isOfflineMode) return null

  return (
    <div
      role="status"
      className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm font-medium text-amber-900"
    >
      Displaying cached property inventory — live backend is currently unavailable.
    </div>
  )
}
