import type { ApiEnvelope, Property, PropertyFilters, PaginationMeta } from '@/types'
import { filtersToApiParams, normalizeProperties, normalizeProperty, normalizePropertyQuery } from '@/utils/property'
import { queryAllStaticProperties, getStaticPropertyById } from '@/data/localData'
import { apiClient } from '../client'

export interface PropertyQuery {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc' | string
  search?: string
  category?: string
  city?: string
  locality?: string
  sector?: string
  pincode?: string
  landmark?: string
  minPrice?: string
  maxPrice?: string
  minArea?: string
  maxArea?: string
  bedrooms?: string
  bhk?: string[]
  propertyTypes?: string[]
  amenities?: string[]
  propertyAge?: string[]
  status?: string
  builder?: string
  featured?: boolean
  reraOnly?: boolean
  readyToMove?: boolean
  underConstruction?: boolean
  possessionYear?: string
}

export interface PropertiesResult {
  data: Property[]
  meta?: PaginationMeta
}

function buildMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

function mergePropertyLists(apiProperties: Property[], staticProperties: Property[]): Property[] {
  const seen = new Set<string>()
  const merged: Property[] = []

  for (const property of [...apiProperties, ...staticProperties]) {
    if (seen.has(property.id)) continue
    seen.add(property.id)
    merged.push(property)
  }

  return merged
}

function sortMergedProperties(
  properties: Property[],
  sortBy?: string,
  sortOrder?: string,
): Property[] {
  const list = [...properties]

  if (sortBy === 'price') {
    list.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price))
    return list
  }

  if (sortBy === 'area') {
    list.sort((a, b) => (sortOrder === 'asc' ? a.area - b.area : b.area - a.area))
    return list
  }

  if (sortBy === 'newest' || sortBy === 'createdAt') {
    list.sort((a, b) => b.id.localeCompare(a.id))
    return list
  }

  list.sort(
    (a, b) =>
      (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
      b.price - a.price,
  )
  return list
}

async function fetchAllApiProperties(query: PropertyQuery): Promise<Property[]> {
  const apiParams = {
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    ...filtersToApiParams((query ?? {}) as Partial<PropertyFilters>),
  }

  const all: Property[] = []
  let page = 1
  const limit = 100
  let hasNext = true

  while (hasNext && page <= 50) {
    const { data } = await apiClient.get<ApiEnvelope<Property[]>>('/public/properties', {
      params: { ...apiParams, page, limit },
      timeout: 8000,
    })

    if (!data?.success) break

    all.push(...normalizeProperties(data.data ?? []))
    hasNext = data.meta?.hasNext ?? false
    page += 1
  }

  return all
}

function mergeAndPaginate(
  apiProperties: Property[],
  staticProperties: Property[],
  query: PropertyQuery,
): PropertiesResult {
  const page = query.page ?? 1
  const limit = query.limit ?? 2000
  const merged = sortMergedProperties(
    mergePropertyLists(apiProperties, staticProperties),
    query.sortBy,
    query.sortOrder,
  )
  const total = merged.length
  const start = (page - 1) * limit

  return {
    data: merged.slice(start, start + limit),
    meta: buildMeta(page, limit, total),
  }
}

export const propertiesService = {
  async getAll(params?: PropertyQuery): Promise<PropertiesResult> {
    const query = normalizePropertyQuery(params)
    const staticProperties = queryAllStaticProperties(query)

    try {
      const apiProperties = await fetchAllApiProperties(query)
      return mergeAndPaginate(apiProperties, staticProperties, query)
    } catch {
      return mergeAndPaginate([], staticProperties, query)
    }
  },

  async getById(id: string): Promise<Property> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Property>>(`/public/properties/${id}`, {
        timeout: 5000,
      })
      if (data?.success && data.data) {
        return normalizeProperty(data.data)
      }
    } catch {
      /* fallback to demo inventory */
    }

    const cached = getStaticPropertyById(id)
    if (cached) {
      return cached
    }

    throw new Error('Property not found')
  },
}
