import { PLATFORM_STATS } from '@/constants/locations'

const stats = [
  { label: 'Total Properties', value: PLATFORM_STATS.totalProperties, icon: '🏘️' },
  { label: 'Active Buyers', value: PLATFORM_STATS.activeBuyers, icon: '👥' },
  { label: 'Happy Families', value: PLATFORM_STATS.happyFamilies, icon: '🏡' },
  { label: 'Cities Covered', value: PLATFORM_STATS.citiesCovered, icon: '🌆' },
]

export function StatsBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="animate-fade-in-up text-center"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="text-2xl" aria-hidden>{stat.icon}</span>
            <p className="mt-2 text-3xl font-extrabold text-brand-700">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
