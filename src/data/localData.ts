import type { PaginationMeta, Property } from '@/types'
import type { StaticBuilder, StaticLocality, StaticProperty } from '@/types/staticProperty'
import type { PropertyQuery } from '@/api/services/properties.service'
import staticProperties from './properties.json'
import staticBuilders from './builders.json'
import staticLocalities from './localities.json'

const CACHE: StaticProperty[] = staticProperties as StaticProperty[]
const BUILDERS: StaticBuilder[] = staticBuilders as StaticBuilder[]
const LOCALITIES: StaticLocality[] = staticLocalities as StaticLocality[]

export function getStaticBuilders() {
  return BUILDERS
}

export function getStaticLocalities() {
  return LOCALITIES
}

export function staticToProperty(sp: StaticProperty): Property {
  const area = sp.areaSqft
  return {
    id: sp.id,
    title: sp.title,
    description: sp.description,
    listingCategory: sp.listingCategory as Property['listingCategory'],
    type: sp.propertyType.toLowerCase().replace(/ /g, '_'),
    status: sp.status,
    price: sp.price,
    pricePerSqFt: sp.pricePerSqft,
    area,
    superArea: area,
    carpetArea: Math.round(area * 0.75),
    builtUpArea: Math.round(area * 0.85),
    bedrooms: sp.bedrooms,
    bathrooms: sp.bathrooms,
    address: sp.address,
    city: sp.city,
    state: sp.state,
    pincode: sp.pincode,
    locality: sp.locality,
    sector: sp.sector,
    landmark: sp.highlights[0] ?? '',
    latitude: sp.coordinates.lat,
    longitude: sp.coordinates.lng,
    builderName: sp.builder,
    propertyAge: sp.propertyAge,
    furnishing: sp.furnishing,
    facing: sp.facing,
    possessionStatus: sp.possessionStatus,
    possessionDate: sp.possession,
    postedBy: sp.postedBy,
    isVerified: sp.isVerified,
    hasRera: sp.rera,
    reraId: sp.reraId,
    hasVideoTour: sp.hasVideoTour,
    amenities: sp.amenities,
    images: sp.images,
    slug: sp.slug,
    configuration: sp.configuration,
    featured: sp.featured,
    luxury: sp.luxury,
    projectName: sp.projectName,
    nearbySchools: sp.nearbySchools,
    nearbyHospitals: sp.nearbyHospitals,
    nearbyMetroStations: sp.nearbyMetroStations,
    highlights: sp.highlights,
  }
}

function matchesBhk(p: StaticProperty, bhkFilters: string[]): boolean {
  if (!bhkFilters.length) return true
  const config = p.configuration.toLowerCase()
  const beds = p.bedrooms
  return bhkFilters.some((b) => {
    if (b === 'Studio') return beds === 0
    if (b === '5+ BHK') return beds >= 5
    const match = b.match(/(\d+)/)
    return match ? beds === Number(match[1]) : config.includes(b.toLowerCase())
  })
}

function matchesSearch(p: StaticProperty, q: string): boolean {
  const haystack = [
    p.title, p.projectName, p.builder, p.locality, p.sector, p.city,
    p.configuration, p.propertyType, p.address, p.description,
  ].join(' ').toLowerCase()
  return haystack.includes(q.toLowerCase())
}

export function queryStaticProperties(params?: PropertyQuery): {
  data: Property[]
  meta: PaginationMeta
} {
  let results = [...CACHE]
  const page = params?.page ?? 1
  const limit = params?.limit ?? 100

  if (params?.search) {
    results = results.filter((p) => matchesSearch(p, params.search!))
  }

  if (params?.category && params.category !== 'buy') {
    results = results.filter((p) => p.listingCategory === params.category)
  }

  if (params?.city) {
    results = results.filter((p) =>
      p.city.toLowerCase().includes(params.city!.toLowerCase()),
    )
  }

  if (params?.locality) {
    const loc = normalizeLocalityParam(params.locality)
    results = results.filter((p) =>
      p.locality.toLowerCase().includes(loc.toLowerCase()),
    )
  }

  if (params?.sector) {
    results = results.filter((p) =>
      p.sector.toLowerCase().includes(params.sector!.toLowerCase()),
    )
  }

  if (params?.minPrice) {
    results = results.filter((p) => p.price >= Number(params.minPrice))
  }

  if (params?.maxPrice) {
    results = results.filter((p) => p.price <= Number(params.maxPrice))
  }

  if (params?.minArea) {
    results = results.filter((p) => p.areaSqft >= Number(params.minArea))
  }

  if (params?.maxArea) {
    results = results.filter((p) => p.areaSqft <= Number(params.maxArea))
  }

  if (params?.bedrooms) {
    const min = Number(params.bedrooms)
    results = results.filter((p) => p.bedrooms >= min)
  }

  if (params?.bhk?.length) {
    results = results.filter((p) => matchesBhk(p, params.bhk!))
  }

  if (params?.propertyTypes?.length) {
    results = results.filter((p) =>
      params.propertyTypes!.some((t) =>
        p.propertyType.toLowerCase().includes(t.toLowerCase().replace(/_/g, ' ')),
      ),
    )
  }

  if (params?.amenities?.length) {
    results = results.filter((p) =>
      params.amenities!.some((a) =>
        p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase())),
      ),
    )
  }

  if (params?.propertyAge?.length) {
    const ageMap: Record<string, string> = {
      'Under Construction': 'under_construction',
      'Ready To Move': 'ready_to_move',
      New: 'new',
      '1-5 Years': '1_5_years',
      '5-10 Years': '5_10_years',
      '10+ Years': '10_plus_years',
    }
    const ages = params.propertyAge.map((a) => ageMap[a] ?? a)
    results = results.filter((p) => ages.includes(p.propertyAge))
  }

  if (params?.status) {
    const s = params.status.toLowerCase().replace(/ /g, '_')
    results = results.filter((p) => p.status.toLowerCase().includes(s))
  }

  if (params?.builder) {
    results = results.filter((p) =>
      p.builder.toLowerCase().includes(params.builder!.toLowerCase()),
    )
  }

  const ext = params as { featured?: boolean; reraOnly?: boolean; readyToMove?: boolean; underConstruction?: boolean; possessionYear?: string }

  if (ext.featured) {
    results = results.filter((p) => p.featured)
  }

  if (ext.reraOnly) {
    results = results.filter((p) => p.rera)
  }

  if (ext.readyToMove) {
    results = results.filter((p) => p.propertyAge === 'ready_to_move')
  }

  if (ext.underConstruction) {
    results = results.filter((p) => p.propertyAge === 'under_construction')
  }

  if (ext.possessionYear) {
    results = results.filter((p) => p.possession.includes(ext.possessionYear!))
  }

  if (params?.sortBy === 'price') {
    results.sort((a, b) =>
      params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
    )
  } else if (params?.sortBy === 'area') {
    results.sort((a, b) =>
      params.sortOrder === 'asc' ? a.areaSqft - b.areaSqft : b.areaSqft - a.areaSqft,
    )
  } else if (params?.sortBy === 'newest') {
    results.sort((a, b) => b.id.localeCompare(a.id))
  } else {
    results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.price - a.price)
  }

  const total = results.length
  const totalPages = Math.ceil(total / limit) || 1
  const start = (page - 1) * limit
  const slice = results.slice(start, start + limit)

  return {
    data: slice.map(staticToProperty),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export function getStaticPropertyById(id: string): Property | null {
  const found = CACHE.find((p) => p.id === id || p.slug === id)
  return found ? staticToProperty(found) : null
}

const SECTION_LIMIT = 6

function pickByProjects(projectNames: string[]): StaticProperty[] {
  const picked: StaticProperty[] = []
  for (const name of projectNames) {
    const match = CACHE.find(
      (p) => p.projectName === name || p.projectName.toLowerCase().includes(name.toLowerCase()),
    )
    if (match && !picked.some((p) => p.id === match.id)) picked.push(match)
  }
  return picked.slice(0, SECTION_LIMIT)
}

const HOMEPAGE_PROPERTY_LIMIT = 6

/** Exactly 6 curated properties for the homepage — full inventory lives on /properties */
export function getHomepageFeaturedProperties(): StaticProperty[] {
  return pickByProjects([
    'DLF Camellias',
    'HUDA Floors Sector 4',
    'DLF Privana South',
    'M3M Mansion',
    'Paras Quartier',
    'Trump Towers Gurgaon',
  ]).slice(0, HOMEPAGE_PROPERTY_LIMIT)
}

/** @deprecated Use getHomepageFeaturedProperties — homepage shows 6 properties total */
export function getHomepageCollections() {
  const featured = getHomepageFeaturedProperties()
  return {
    featured,
    oldGurgaon: featured,
    builderFloors: featured,
    luxury: featured,
    newGurgaon: featured,
  }
}

export function normalizeLocalityParam(locality: string): string {
  if (locality === 'old-gurgaon' || locality === 'old_gurgaon') return 'Old Gurgaon'
  return locality.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export const STATIC_PROPERTY_COUNT = CACHE.length
