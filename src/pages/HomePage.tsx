import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { PropertySection } from '@/components/home/PropertySection'
import { CalculatorPanel } from '@/components/calculators/CalculatorPanel'
import { getHomepageCollections, staticToProperty } from '@/data/localData'
import { MARKETPLACE_LOCALITIES } from '@/constants/locations'

const OLD_GURGAON_SECTORS = [
  'Sector 4', 'Sector 5', 'Sector 7', 'Sector 9', 'Sector 10',
  'Sector 12', 'Sector 14', 'Sector 15', 'Sector 17', 'Sector 21',
  'Sector 22', 'Sector 23', 'Palam Vihar', 'Civil Lines',
]

const HOMEPAGE_SECTIONS = [
  {
    key: 'featured' as const,
    title: 'Featured Properties in Gurgaon',
    subtitle: 'Handpicked premium residences from DLF, M3M, Paras & more',
    viewAllHref: '/properties',
    viewAllLabel: 'View All Properties',
  },
  {
    key: 'oldGurgaon' as const,
    title: 'Old Gurgaon Properties',
    subtitle: 'Underserved sectors with exceptional value — highly searched by local buyers',
    viewAllHref: '/properties?locality=old-gurgaon',
    viewAllLabel: 'View All Old Gurgaon Properties',
    variant: 'highlight' as const,
  },
  {
    key: 'builderFloors' as const,
    title: 'Builder Floors Collection',
    subtitle: 'Independent floors in established Gurgaon neighbourhoods',
    viewAllHref: '/properties?type=Builder%20Floor',
    viewAllLabel: 'View All Builder Floors',
  },
  {
    key: 'luxury' as const,
    title: 'Luxury Collection',
    subtitle: 'Ultra-premium homes on Golf Course Road and beyond',
    viewAllHref: '/properties?category=luxury',
    viewAllLabel: 'View All Luxury Homes',
  },
  {
    key: 'newGurgaon' as const,
    title: 'New Gurgaon Collection',
    subtitle: 'Modern developments on Dwarka Expressway & New Gurgaon corridor',
    viewAllHref: '/properties?locality=New%20Gurgaon',
    viewAllLabel: 'View All New Gurgaon Properties',
  },
]

export function HomePage() {
  const collections = useMemo(() => {
    const raw = getHomepageCollections()
    return {
      featured: raw.featured.map(staticToProperty),
      oldGurgaon: raw.oldGurgaon.map(staticToProperty),
      builderFloors: raw.builderFloors.map(staticToProperty),
      luxury: raw.luxury.map(staticToProperty),
      newGurgaon: raw.newGurgaon.map(staticToProperty),
    }
  }, [])

  return (
    <div>
      <HeroSection />

      <StatsBar />

      {/* Old Gurgaon sector spotlight */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Old Gurgaon — Where Buyers Are Searching
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Major portals overlook these high-demand sectors. We specialise in HUDA floors,
              builder floors, and independent homes across Old Gurgaon.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {OLD_GURGAON_SECTORS.map((sector) => (
                <Link
                  key={sector}
                  to={`/properties?locality=old-gurgaon&sector=${encodeURIComponent(sector)}`}
                  className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm transition hover:border-brand-400 hover:bg-brand-600 hover:text-white"
                >
                  {sector}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other localities — compact */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-lg font-bold text-slate-900">Explore by Locality</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {MARKETPLACE_LOCALITIES.filter((l) => l !== 'Old Gurgaon').map((loc) => (
            <Link
              key={loc}
              to={`/properties?locality=${encodeURIComponent(loc)}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
            >
              {loc}
            </Link>
          ))}
        </div>
      </section>

      {HOMEPAGE_SECTIONS.map((section, index) => (
        <PropertySection
          key={section.key}
          index={index}
          title={section.title}
          subtitle={section.subtitle}
          viewAllHref={section.viewAllHref}
          viewAllLabel={section.viewAllLabel}
          variant={section.variant}
          properties={collections[section.key]}
        />
      ))}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">Why Durga Property?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '✓', title: 'Curated Collections', desc: 'Premium picks — not an overwhelming classifieds feed' },
              { icon: '🏘️', title: 'Old Gurgaon Expert', desc: 'Deep inventory in underserved HUDA & builder floor sectors' },
              { icon: '📊', title: 'Market Tools', desc: 'EMI, ROI, and affordability calculators built in' },
              { icon: '🏗️', title: 'RERA Verified', desc: 'Trusted builders with full compliance' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-3xl" aria-hidden>{item.icon}</span>
                <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Plan Your Investment</h2>
            <p className="mt-4 text-slate-600">
              Estimate EMI, ROI, and affordability before you visit properties.
            </p>
            <Link
              to="/tools"
              className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700"
            >
              All Tools →
            </Link>
          </div>
          <CalculatorPanel compact />
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-800 to-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold">Explore the full inventory</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Browse every listing with advanced filters on our properties page.
          </p>
          <Link
            to="/properties"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-bold text-brand-700 hover:bg-brand-50"
          >
            View All Properties
          </Link>
        </div>
      </section>
    </div>
  )
}
