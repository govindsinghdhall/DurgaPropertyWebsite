import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  propertiesService,
  type PropertiesResult,
  type PropertyQuery,
} from '@/api/services/properties.service'

export function usePropertiesQuery(
  queryKey: unknown[],
  params?: PropertyQuery,
  options?: Omit<UseQueryOptions<PropertiesResult>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey,
    queryFn: () => propertiesService.getAll(params),
    ...options,
  })
}
