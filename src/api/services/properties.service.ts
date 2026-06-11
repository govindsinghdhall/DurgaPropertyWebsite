import type { ApiEnvelope, Property, PropertyFilters } from '@/types'
import { filtersToApiParams } from '@/utils/property'
import { queryStaticProperties, getStaticPropertyById } from '@/data/localData'
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
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

function useCache(params?: PropertyQuery): PropertiesResult {
  return queryStaticProperties(params)
}

export const propertiesService = {
  async getAll(params?: PropertyQuery): Promise<PropertiesResult> {
    try {
      const apiParams = {
        page: params?.page,
        limit: params?.limit,
        sortBy: params?.sortBy,
        sortOrder: params?.sortOrder,
        ...filtersToApiParams((params ?? {}) as Partial<PropertyFilters>),
      }
      const { data } = await apiClient.get<ApiEnvelope<Property[]>>('/public/properties', {
        params: apiParams,
        timeout: 5000,
      })
      if (data?.data?.length) {
        return { data: data.data, meta: data.meta }
      }
      // Empty API response — use rich local inventory
      return useCache(params)
    } catch {
      return useCache(params)
    }
  },

  async getById(id: string): Promise<Property> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Property>>(`/public/properties/${id}`, {
        timeout: 5000,
      })
      if (data?.data) {
        return data.data
      }
    } catch {
      /* fallback */
    }
    const cached = getStaticPropertyById(id)
    if (cached) {
      return cached
    }
    throw new Error('Property not found')
  },
}
