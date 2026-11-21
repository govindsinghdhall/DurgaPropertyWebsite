import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { usePropertyStore } from '@/context/PropertyStoreContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/tools', label: 'Tools' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { compareList } = usePropertyStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mapsOpen, setMapsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-sm font-extrabold text-white shadow-md">
            DP
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-extrabold text-slate-900">
              Durga Property
            </p>
            <p className="text-[11px] font-medium text-slate-500">
              Where dreams come home
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Maps Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMapsOpen(true)}
            onMouseLeave={() => setMapsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMapsOpen(!mapsOpen)}
              className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                mapsOpen
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-brand-600'
              }`}
              aria-expanded={mapsOpen}
              aria-haspopup="true"
            >
              Maps
              <svg
                className={`h-4 w-4 transition-transform ${
                  mapsOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mapsOpen && (
              <div className="absolute left-0 top-full z-50 w-64 pt-2">
                <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link
                    to="/maps/residential"
                    onClick={() => setMapsOpen(false)}
                    className="flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-brand-50"
                  >
                    <span className="text-xl">🏠</span>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Residential Maps
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Sectors, colonies, plots & homes
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/maps/commercial"
                    onClick={() => setMapsOpen(false)}
                    className="flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-brand-50"
                  >
                    <span className="text-xl">🏢</span>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Commercial Maps
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Markets, shops, booths & SCO
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {compareList.length > 0 && (
            <Link
              to="/compare"
              className="hidden rounded-lg bg-accent-50 px-3 py-1.5 text-xs font-bold text-accent-600 sm:block"
            >
              Compare ({compareList.length})
            </Link>
          )}

          <Link
            to="/contact"
            className="hidden rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 sm:block"
          >
            +91 98100 78510
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="border-t border-slate-200 px-4 py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Maps Dropdown */}
          <button
            type="button"
            onClick={() => setMapsOpen(!mapsOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600"
          >
            <span>Maps</span>

            <svg
              className={`h-4 w-4 transition-transform ${
                mapsOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {mapsOpen && (
            <div className="ml-3 border-l border-slate-200 pl-3">
              <Link
                to="/maps/residential"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              >
                🏠 Residential Maps
              </Link>

              <Link
                to="/maps/commercial"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              >
                🏢 Commercial Maps
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  )
}