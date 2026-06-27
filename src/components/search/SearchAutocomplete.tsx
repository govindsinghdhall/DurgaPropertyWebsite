import { useEffect, useRef, useState } from 'react'
import { TRENDING_LOCATIONS } from '@/constants/locations'
import { usePropertyStore } from '@/context/PropertyStoreContext'

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Search by city, locality, sector, or landmark in Gurgaon',
  className = '',
}: SearchAutocompleteProps) {
  const { recentSearches } = usePropertyStore()
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const suggestions = value.trim()
    ? TRENDING_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      ).slice(0, 6)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const startVoiceSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    setListening(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onChange(transcript)
      onSelect(transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognition.start()
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Location search"
          aria-expanded={open}
          aria-autocomplete="list"
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:text-base"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <button
            type="button"
            onClick={startVoiceSearch}
            aria-label="Voice search"
            className={`rounded-lg p-2 transition ${listening ? 'bg-red-100 text-red-600' : 'text-slate-400 hover:bg-slate-100 hover:text-brand-600'}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-scale-in">
          {suggestions.length > 0 && (
            <div className="border-b border-slate-100 p-2">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Suggestions</p>
              {suggestions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { onSelect(loc); setOpen(false) }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {loc}
                </button>
              ))}
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="border-b border-slate-100 p-2">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Recent Searches</p>
              {recentSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { onSelect(s); setOpen(false) }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"
                >
                  <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-2">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Trending in Gurgaon</p>
            <div className="flex flex-wrap gap-1.5 px-3 py-2">
              {TRENDING_LOCATIONS.slice(0, 6).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { onSelect(loc); setOpen(false) }}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-brand-100 hover:text-brand-700"
                >
                  {loc.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
