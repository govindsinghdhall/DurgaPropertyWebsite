import { useEffect } from 'react'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  propertiesService,
  registerOfflineModeHandler,
  type PropertiesResult,
  type PropertyQuery,
} from '@/api/services/properties.service'
import { useDataSource } from '@/context/DataSourceContext'
import { useToast } from '@/components/ui/Toast'

export function usePropertiesQuery(
  queryKey: unknown[],
  params?: PropertyQuery,
  options?: Omit<UseQueryOptions<PropertiesResult>, 'queryKey' | 'queryFn'>,
) {
  const { setOfflineMode, notifyOfflineOnce, offlineNotified } = useDataSource()
  const { showToast } = useToast()

  useEffect(() => {
    registerOfflineModeHandler(setOfflineMode)
    return () => registerOfflineModeHandler(() => {})
  }, [setOfflineMode])

  const query = useQuery({
    queryKey,
    queryFn: () => propertiesService.getAll(params),
    ...options,
  })

  useEffect(() => {
    if (query.data?.fromCache && !offlineNotified) {
      notifyOfflineOnce()
      showToast({
        type: 'success',
        title: 'Cached Inventory',
        message: 'Displaying cached property inventory',
      })
    }
  }, [query.data?.fromCache, offlineNotified, notifyOfflineOnce, showToast])

  return query
}
