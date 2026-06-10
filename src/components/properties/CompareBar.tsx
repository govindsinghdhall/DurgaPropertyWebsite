import { Link } from 'react-router-dom'
import { usePropertyStore } from '@/context/PropertyStoreContext'

export function CompareBar() {
  const { compareList, clearCompare } = usePropertyStore()

  if (!compareList.length) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {compareList.length}
          </span>
          <p className="text-sm font-semibold text-slate-800">
            {compareList.length} propert{compareList.length === 1 ? 'y' : 'ies'} selected for comparison
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  )
}
