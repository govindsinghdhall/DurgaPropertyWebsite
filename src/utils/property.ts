import type { PropertyQuery } from '@/api/services/properties.service'
import { BHK_OPTIONS } from '@/constants/filters'
import type { Property, PropertyCategory, PropertyFilters } from '@/types'

const BHK_TO_API: Record<string, string> = {
  Studio: 'studio',
  '1 BHK': '1_bhk',
  '2 BHK': '2_bhk',
  '3 BHK': '3_bhk',
  '4 BHK': '4_bhk',
  '5+ BHK': '5_plus_bhk',
}

const TYPE_TO_API: Record<string, string> = {
  Apartment: 'apartment',
  'Builder Floor': 'builder_floor',
  Villa: 'villa',
  'Independent House': 'independent_house',
  Plot: 'plot',
  Commercial: 'commercial',
  Office: 'office',
  Shop: 'shop',
  Warehouse: 'warehouse',
  'Coworking Space': 'coworking_space',
}

/** Map UI property-type labels to inventory labels for local search */
export const PROPERTY_TYPE_SEARCH_ALIASES: Record<string, string[]> = {
  apartment: ['apartment'],
  'builder floor': ['builder floor'],
  villa: ['villa'],
  'independent house': ['independent house', 'villa'],
  plot: ['plot'],
  commercial: ['commercial'],
  office: ['commercial', 'office'],
  shop: ['commercial', 'shop'],
  warehouse: ['commercial', 'warehouse'],
  'coworking space': ['commercial', 'coworking'],
}

export function bedroomsToBhkLabel(bedrooms: string): string | null {
  const match = BHK_OPTIONS.find((b) => (b.replace(/\D/g, '') || '0') === bedrooms)
  return match ?? null
}

export function normalizePropertyQuery(params?: PropertyQuery): PropertyQuery {
  if (!params) return {}

  const normalized: PropertyQuery = { ...params }

  if (params.bedrooms && !params.bhk?.length) {
    const bhkLabel = bedroomsToBhkLabel(params.bedrooms)
    if (bhkLabel) {
      normalized.bhk = [bhkLabel]
    }
    delete normalized.bedrooms
  }

  if (params.propertyTypes?.length) {
    normalized.propertyTypes = params.propertyTypes.filter(Boolean)
  }

  if (params.status) {
    normalized.status = params.status.toLowerCase().replace(/ /g, '_')
  }

  return normalized
}

const AGE_TO_API: Record<string, string> = {
  'Under Construction': 'under_construction',
  'Ready To Move': 'ready_to_move',
  New: 'new',
  '1-5 Years': '1_5_years',
  '5-10 Years': '5_10_years',
  '10+ Years': '10_plus_years',
}

const FURNISHING_TO_API: Record<string, string> = {
  'Fully Furnished': 'fully_furnished',
  'Semi Furnished': 'semi_furnished',
  Unfurnished: 'unfurnished',
}

const FACING_TO_API: Record<string, string> = {
  North: 'north',
  South: 'south',
  East: 'east',
  West: 'west',
}

const POSSESSION_TO_API: Record<string, string> = {
  Immediate: 'immediate',
  'Within 3 Months': 'within_3_months',
  'Within 6 Months': 'within_6_months',
  'Within 1 Year': 'within_1_year',
}

const AMENITY_TO_API: Record<string, string> = {
  'Swimming Pool': 'swimming_pool',
  Gym: 'gym',
  'Club House': 'club_house',
  'Power Backup': 'power_backup',
  Lift: 'lift',
  Parking: 'parking',
  Security: 'security',
  Garden: 'garden',
  'Kids Play Area': 'kids_play_area',
  'EV Charging': 'ev_charging',
}

const API_TO_AGE: Record<string, string> = Object.fromEntries(
  Object.entries(AGE_TO_API).map(([k, v]) => [v, k]),
)
const API_TO_FURNISHING: Record<string, string> = Object.fromEntries(
  Object.entries(FURNISHING_TO_API).map(([k, v]) => [v, k]),
)
const API_TO_FACING: Record<string, string> = Object.fromEntries(
  Object.entries(FACING_TO_API).map(([k, v]) => [v, k]),
)
const API_TO_POSSESSION: Record<string, string> = Object.fromEntries(
  Object.entries(POSSESSION_TO_API).map(([k, v]) => [v, k]),
)

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0
  return typeof value === 'number' ? value : Number(value) || 0
}

/** Normalize API property — compute fallbacks only when backend omits values */
export function normalizeProperty(property: Property): Property {
  const price = toNumber(property.price)
  const superArea = toNumber(property.superArea ?? property.area)
  return {
    ...property,
    price,
    area: toNumber(property.area),
    superArea: superArea || toNumber(property.area),
    pricePerSqFt: property.pricePerSqFt || (superArea > 0 ? Math.round(price / superArea) : 0),
    carpetArea: property.carpetArea ?? null,
    builtUpArea: property.builtUpArea ?? null,
    locality: property.locality || property.city,
    postedBy: property.postedBy || 'Durga Property',
    listingCategory: (property.listingCategory || 'buy') as PropertyCategory,
    propertyAge: property.propertyAge ? (API_TO_AGE[property.propertyAge] ?? property.propertyAge) : null,
    furnishing: property.furnishing ? (API_TO_FURNISHING[property.furnishing] ?? property.furnishing) : null,
    facing: property.facing ? (API_TO_FACING[property.facing] ?? property.facing) : null,
    possessionStatus: property.possessionStatus
      ? (API_TO_POSSESSION[property.possessionStatus] ?? property.possessionStatus)
      : null,
  }
}

export function normalizeProperties(properties: Property[]): Property[] {
  return properties.map(normalizeProperty)
}

/** @deprecated Use normalizeProperty */
export const enrichProperty = normalizeProperty
/** @deprecated Use normalizeProperties */
export const enrichProperties = normalizeProperties

export function filtersToApiParams(filters: Partial<PropertyFilters>) {
  const params: Record<string, string | number> = {}

  if (filters.search) params.search = filters.search
  if (filters.category && filters.category !== 'buy') params.category = filters.category
  if (filters.city) params.city = filters.city
  if (filters.locality) params.locality = filters.locality
  if (filters.sector) params.sector = filters.sector
  if (filters.pincode) params.pincode = filters.pincode
  if (filters.landmark) params.landmark = filters.landmark
  if (filters.minPrice) params.minPrice = filters.minPrice
  if (filters.maxPrice) params.maxPrice = filters.maxPrice
  if (filters.minArea) params.minArea = filters.minArea
  if (filters.maxArea) params.maxArea = filters.maxArea
  if (filters.bedrooms) params.bedrooms = filters.bedrooms
  if (filters.status) params.status = filters.status.toLowerCase().replace(/ /g, '_')

  if (filters.propertyTypes?.length) {
    params.type = filters.propertyTypes.map((t) => TYPE_TO_API[t] ?? t.toLowerCase().replace(/ /g, '_')).join(',')
  }

  if (filters.bhk?.length) {
    params.bhk = filters.bhk.map((b) => BHK_TO_API[b] ?? b).join(',')
  }

  if (filters.amenities?.length) {
    params.amenities = filters.amenities.map((a) => AMENITY_TO_API[a] ?? a).join(',')
  }

  if (filters.propertyAge?.length) {
    params.propertyAge = filters.propertyAge.map((a) => AGE_TO_API[a] ?? a).join(',')
  }

  if (filters.furnishing?.length) {
    params.furnishing = filters.furnishing.map((f) => FURNISHING_TO_API[f] ?? f).join(',')
  }

  if (filters.facing?.length) {
    params.facing = filters.facing.map((f) => FACING_TO_API[f] ?? f).join(',')
  }

  if (filters.possessionStatus?.length) {
    params.possessionStatus = filters.possessionStatus.map((p) => POSSESSION_TO_API[p] ?? p).join(',')
  }

  return params
}

export function filterProperties(properties: Property[], filters: Partial<PropertyFilters>): Property[] {
  return properties.filter((p) => {
    if (filters.category && filters.category !== 'buy' && p.listingCategory !== filters.category) {
      return false
    }
    return true
  })
}

export function getSimilarProperties(property: Property, all: Property[], limit = 4): Property[] {
  return all
    .filter((p) => p.id !== property.id)
    .filter(
      (p) =>
        p.city === property.city ||
        p.type === property.type ||
        Math.abs(Number(p.price) - Number(property.price)) < Number(property.price) * 0.3,
    )
    .slice(0, limit)
}

export function getRecommendedProperties(
  viewedIds: string[],
  all: Property[],
  limit = 6,
): Property[] {
  if (!viewedIds.length) return all.slice(0, limit)
  const viewed = all.filter((p) => viewedIds.includes(p.id))
  const cities = new Set(viewed.map((p) => p.city))
  const types = new Set(viewed.map((p) => p.type))
  return all
    .filter((p) => !viewedIds.includes(p.id))
    .filter((p) => cities.has(p.city) || types.has(p.type))
    .slice(0, limit)
}

export function formatPropertyLabel(value?: string | null): string {
  if (!value) return '—'
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
