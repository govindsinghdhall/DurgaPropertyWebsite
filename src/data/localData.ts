import type { PaginationMeta, Property } from '@/types'
import type {
  StaticBuilder,
  StaticLocality,
  StaticProperty,
} from '@/types/staticProperty'
import type { PropertyQuery } from '@/api/services/properties.service'
import { PROPERTY_TYPE_SEARCH_ALIASES } from '@/utils/property'

/**
 * Optional local JSON data.
 *
 * These files are optional:
 * - properties.json
 * - builders.json
 * - localities.json
 *
 * If a file is missing or cannot be parsed, an empty array is used.
 *
 * This means the website can run without local/demo properties.
 */

/**
 * Vite import.meta.glob is used without `import: 'default'`
 * so it works correctly with Vite 8 / Rolldown JSON handling.
 *
 * `?raw` gives us the file contents as text when the file exists.
 */
const propertyModules = import.meta.glob('./properties.json', {
  eager: true,
  query: '?raw',
})

const builderModules = import.meta.glob('./builders.json', {
  eager: true,
  query: '?raw',
})

const localityModules = import.meta.glob('./localities.json', {
  eager: true,
  query: '?raw',
})

/**
 * Safely extract and parse optional JSON.
 */
function parseOptionalJson<T>(
  modules: Record<string, unknown>,
): T[] {
  const moduleValue = Object.values(modules)[0]

  if (!moduleValue) {
    return []
  }

  try {
    let raw: unknown = moduleValue

    /**
     * Depending on the Vite/Rolldown output, the glob value
     * can either be the raw string or an object containing
     * a default value.
     */
    if (
      typeof moduleValue === 'object' &&
      moduleValue !== null &&
      'default' in moduleValue
    ) {
      raw = (moduleValue as { default: unknown }).default
    }

    if (typeof raw !== 'string') {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    return Array.isArray(parsed) ? (parsed as T[]) : []
  } catch {
    /**
     * Invalid/missing optional JSON should never break
     * the application.
     */
    return []
  }
}

/**
 * Local/demo property inventory.
 *
 * If properties.json does not exist:
 * CACHE = []
 */
const CACHE: StaticProperty[] =
  parseOptionalJson<StaticProperty>(propertyModules)

/**
 * Optional builders data.
 *
 * If builders.json does not exist:
 * BUILDERS = []
 */
const BUILDERS: StaticBuilder[] =
  parseOptionalJson<StaticBuilder>(builderModules)

/**
 * Optional localities data.
 *
 * If localities.json does not exist:
 * LOCALITIES = []
 */
const LOCALITIES: StaticLocality[] =
  parseOptionalJson<StaticLocality>(localityModules)

/**
 * Static builders
 */
export function getStaticBuilders() {
  return BUILDERS
}

/**
 * Static localities
 */
export function getStaticLocalities() {
  return LOCALITIES
}

/**
 * Convert a StaticProperty into the application's
 * standard Property type.
 */
export function staticToProperty(
  sp: StaticProperty,
): Property {
  const area = sp.areaSqft

  return {
    id: sp.id,
    title: sp.title,
    description: sp.description,
    listingCategory:
      sp.listingCategory as Property['listingCategory'],
    type: sp.propertyType
      .toLowerCase()
      .replace(/ /g, '_'),
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

/**
 * Match BHK filters.
 */
function matchesBhk(
  p: StaticProperty,
  bhkFilters: string[],
): boolean {
  if (!bhkFilters.length) {
    return true
  }

  const beds = p.bedrooms

  return bhkFilters.some((b) => {
    if (b === 'Studio') {
      return beds === 0
    }

    if (b === '5+ BHK') {
      return beds >= 5
    }

    const match = b.match(/(\d+)/)

    return match
      ? beds === Number(match[1])
      : false
  })
}

/**
 * Match property type filters.
 */
function matchesPropertyType(
  p: StaticProperty,
  filterType: string,
): boolean {
  const key = filterType
    .toLowerCase()
    .replace(/_/g, ' ')

  const aliases =
    PROPERTY_TYPE_SEARCH_ALIASES[key] ?? [key]

  const propType =
    p.propertyType.toLowerCase()

  return aliases.some(
    (alias) =>
      propType.includes(alias) ||
      alias.includes(propType),
  )
}

/**
 * Match listing category.
 */
function matchesCategory(
  p: StaticProperty,
  category: string,
): boolean {
  switch (category) {
    case 'commercial':
      return (
        p.listingCategory === 'commercial' ||
        p.propertyType.toLowerCase() ===
          'commercial'
      )

    case 'plot':
      return (
        p.listingCategory === 'plot' ||
        p.propertyType.toLowerCase() === 'plot'
      )

    case 'luxury':
      return (
        p.listingCategory === 'luxury' ||
        p.luxury === true
      )

    case 'new_projects':
      return p.listingCategory === 'new_projects'

    case 'rent':
      return p.listingCategory === 'rent'

    case 'pg':
      return p.listingCategory === 'pg'

    default:
      return p.listingCategory === category
  }
}

/**
 * Match free-text search.
 */
function matchesSearch(
  p: StaticProperty,
  q: string,
): boolean {
  const haystack = [
    p.title,
    p.projectName,
    p.builder,
    p.locality,
    p.sector,
    p.city,
    p.configuration,
    p.propertyType,
    p.address,
    p.description,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(q.toLowerCase())
}

/**
 * Return all static/demo properties matching filters.
 *
 * If properties.json is missing, this returns [].
 */
export function queryAllStaticProperties(
  params?: PropertyQuery,
): Property[] {
  return queryStaticProperties({
    ...params,
    page: 1,
    limit: CACHE.length + 1,
  }).data
}

/**
 * Query static/demo properties.
 *
 * If properties.json is missing, CACHE is empty,
 * so this safely returns no properties.
 */
export function queryStaticProperties(
  params?: PropertyQuery,
): {
  data: Property[]
  meta: PaginationMeta
} {
  let results = [...CACHE]

  const page = params?.page ?? 1
  const limit = params?.limit ?? 100

  if (params?.search) {
    results = results.filter((p) =>
      matchesSearch(
        p,
        params.search!,
      ),
    )
  }

  if (
    params?.category &&
    params.category !== 'buy'
  ) {
    results = results.filter((p) =>
      matchesCategory(
        p,
        params.category!,
      ),
    )
  }

  if (params?.city) {
    results = results.filter((p) =>
      p.city
        .toLowerCase()
        .includes(
          params.city!.toLowerCase(),
        ),
    )
  }

  if (params?.locality) {
    const loc =
      normalizeLocalityParam(
        params.locality,
      )

    results = results.filter((p) =>
      p.locality
        .toLowerCase()
        .includes(
          loc.toLowerCase(),
        ),
    )
  }

  if (params?.sector) {
    results = results.filter((p) =>
      p.sector
        .toLowerCase()
        .includes(
          params.sector!.toLowerCase(),
        ),
    )
  }

  if (params?.pincode) {
    results = results.filter((p) =>
      p.pincode.includes(
        params.pincode!,
      ),
    )
  }

  if (params?.landmark) {
    const landmark =
      params.landmark.toLowerCase()

    results = results.filter((p) =>
      [
        p.address,
        ...p.highlights,
        p.sector,
        p.locality,
      ].some((field) =>
        field
          ?.toLowerCase()
          .includes(landmark),
      ),
    )
  }

  if (params?.minPrice) {
    results = results.filter(
      (p) =>
        p.price >=
        Number(params.minPrice),
    )
  }

  if (params?.maxPrice) {
    results = results.filter(
      (p) =>
        p.price <=
        Number(params.maxPrice),
    )
  }

  if (params?.minArea) {
    results = results.filter(
      (p) =>
        p.areaSqft >=
        Number(params.minArea),
    )
  }

  if (params?.maxArea) {
    results = results.filter(
      (p) =>
        p.areaSqft <=
        Number(params.maxArea),
    )
  }

  if (params?.bedrooms) {
    const beds =
      Number(params.bedrooms)

    results = results.filter(
      (p) =>
        p.bedrooms === beds,
    )
  }

  if (params?.bhk?.length) {
    results = results.filter((p) =>
      matchesBhk(
        p,
        params.bhk!,
      ),
    )
  }

  if (params?.propertyTypes?.length) {
    results = results.filter((p) =>
      params.propertyTypes!.some(
        (t) =>
          matchesPropertyType(
            p,
            t,
          ),
      ),
    )
  }

  if (params?.amenities?.length) {
    results = results.filter((p) =>
      params.amenities!.some(
        (a) =>
          p.amenities.some(
            (pa) =>
              pa
                .toLowerCase()
                .includes(
                  a.toLowerCase(),
                ),
          ),
      ),
    )
  }

  if (params?.propertyAge?.length) {
    const ageMap: Record<
      string,
      string
    > = {
      'Under Construction':
        'under_construction',
      'Ready To Move':
        'ready_to_move',
      New: 'new',
      '1-5 Years':
        '1_5_years',
      '5-10 Years':
        '5_10_years',
      '10+ Years':
        '10_plus_years',
    }

    const ages =
      params.propertyAge.map(
        (a) =>
          ageMap[a] ?? a,
      )

    results = results.filter(
      (p) =>
        ages.includes(
          p.propertyAge,
        ),
    )
  }

  if (params?.status) {
    const s =
      params.status
        .toLowerCase()
        .replace(/ /g, '_')

    results = results.filter(
      (p) =>
        p.status
          .toLowerCase() === s ||
        p.status
          .toLowerCase()
          .includes(s),
    )
  }

  if (params?.builder) {
    results = results.filter((p) =>
      p.builder
        .toLowerCase()
        .includes(
          params.builder!
            .toLowerCase(),
        ),
    )
  }

  const ext = params as {
    featured?: boolean
    reraOnly?: boolean
    readyToMove?: boolean
    underConstruction?: boolean
    possessionYear?: string
  }

  if (ext.featured) {
    results = results.filter(
      (p) => p.featured,
    )
  }

  if (ext.reraOnly) {
    results = results.filter(
      (p) => p.rera,
    )
  }

  if (ext.readyToMove) {
    results = results.filter(
      (p) =>
        p.propertyAge ===
        'ready_to_move',
    )
  }

  if (ext.underConstruction) {
    results = results.filter(
      (p) =>
        p.propertyAge ===
        'under_construction',
    )
  }

  if (ext.possessionYear) {
    results = results.filter(
      (p) =>
        p.possession.includes(
          ext.possessionYear!,
        ),
    )
  }

  /**
   * Sorting
   */
  if (params?.sortBy === 'price') {
    results.sort((a, b) =>
      params.sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price,
    )
  } else if (
    params?.sortBy === 'area'
  ) {
    results.sort((a, b) =>
      params.sortOrder === 'asc'
        ? a.areaSqft -
          b.areaSqft
        : b.areaSqft -
          a.areaSqft,
    )
  } else if (
    params?.sortBy === 'newest'
  ) {
    results.sort((a, b) =>
      b.id.localeCompare(
        a.id,
      ),
    )
  } else {
    results.sort(
      (a, b) =>
        (b.featured ? 1 : 0) -
          (a.featured ? 1 : 0) ||
        b.price - a.price,
    )
  }

  const total =
    results.length

  const totalPages =
    Math.ceil(
      total / limit,
    ) || 1

  const start =
    (page - 1) * limit

  const slice =
    results.slice(
      start,
      start + limit,
    )

  return {
    data: slice.map(
      staticToProperty,
    ),

    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext:
        page < totalPages,
      hasPrev:
        page > 1,
    },
  }
}

/**
 * Find a static/demo property by
 * ID or slug.
 *
 * Returns null when the local
 * inventory is empty.
 */
export function getStaticPropertyById(
  id: string,
): Property | null {
  const found =
    CACHE.find(
      (p) =>
        p.id === id ||
        p.slug === id,
    )

  return found
    ? staticToProperty(found)
    : null
}

const SECTION_LIMIT = 6

/**
 * Pick properties by project name.
 */
function pickByProjects(
  projectNames: string[],
): StaticProperty[] {
  const picked: StaticProperty[] =
    []

  for (
    const name of projectNames
  ) {
    const match =
      CACHE.find(
        (p) =>
          p.projectName ===
            name ||
          p.projectName
            .toLowerCase()
            .includes(
              name.toLowerCase(),
            ),
      )

    if (
      match &&
      !picked.some(
        (p) =>
          p.id === match.id,
      )
    ) {
      picked.push(match)
    }
  }

  return picked.slice(
    0,
    SECTION_LIMIT,
  )
}

const HOMEPAGE_PROPERTY_LIMIT = 6

/**
 * Returns up to 6 curated
 * local/demo properties.
 *
 * If properties.json is missing,
 * this returns [].
 */
export function getHomepageFeaturedProperties(): StaticProperty[] {
  return pickByProjects([
    'DLF Camellias',
    'HUDA Floors Sector 4',
    'DLF Privana South',
    'M3M Mansion',
    'Paras Quartier',
    'Trump Towers Gurgaon',
  ]).slice(
    0,
    HOMEPAGE_PROPERTY_LIMIT,
  )
}

/**
 * @deprecated
 *
 * Kept for backwards compatibility
 * with existing components.
 */
export function getHomepageCollections() {
  const featured =
    getHomepageFeaturedProperties()

  return {
    featured,
    oldGurgaon: featured,
    builderFloors: featured,
    luxury: featured,
    newGurgaon: featured,
  }
}

/**
 * Normalize locality parameters.
 */
export function normalizeLocalityParam(
  locality: string,
): string {
  if (
    locality ===
      'old-gurgaon' ||
    locality ===
      'old_gurgaon'
  ) {
    return 'Old Gurgaon'
  }

  return locality
    .replace(/-/g, ' ')
    .replace(
      /\b\w/g,
      (c) =>
        c.toUpperCase(),
    )
}

/**
 * Number of locally loaded
 * properties.
 *
 * Returns 0 when
 * properties.json is absent.
 */
export const STATIC_PROPERTY_COUNT =
  CACHE.length