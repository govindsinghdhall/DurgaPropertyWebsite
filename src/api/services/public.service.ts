import type { ApiEnvelope } from '@/types'
import { getStaticBuilders, STATIC_PROPERTY_COUNT } from '@/data/localData'
import { apiClient } from '../client'

export interface PublicBuilder {
  name: string
  count: number
}

export interface PublicStats {
  totalProperties: number
}

function mergeBuilders(apiBuilders: PublicBuilder[]): PublicBuilder[] {
  const byName = new Map<string, number>()

  for (const builder of apiBuilders) {
    byName.set(builder.name, (byName.get(builder.name) ?? 0) + builder.count)
  }

  for (const builder of getStaticBuilders()) {
    byName.set(builder.name, (byName.get(builder.name) ?? 0) + 1)
  }

  return [...byName.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const publicService = {
  async getBuilders(): Promise<PublicBuilder[]> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<PublicBuilder[]>>('/public/builders', {
        timeout: 5000,
      })
      return mergeBuilders(data.data ?? [])
    } catch {
      return getStaticBuilders().map((builder) => ({ name: builder.name, count: 1 }))
    }
  },

  async getStats(): Promise<PublicStats> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<PublicStats>>('/public/stats', {
        timeout: 5000,
      })
      return {
        totalProperties: (data.data?.totalProperties ?? 0) + STATIC_PROPERTY_COUNT,
      }
    } catch {
      return { totalProperties: STATIC_PROPERTY_COUNT }
    }
  },
}
