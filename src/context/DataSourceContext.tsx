import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface DataSourceContextValue {
  isOfflineMode: boolean
  setOfflineMode: (value: boolean) => void
  notifyOfflineOnce: () => void
  offlineNotified: boolean
}

const DataSourceContext = createContext<DataSourceContextValue | null>(null)

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [offlineNotified, setOfflineNotified] = useState(false)

  const setOfflineMode = useCallback((value: boolean) => {
    setIsOfflineMode(value)
  }, [])

  const notifyOfflineOnce = useCallback(() => {
    setOfflineNotified(true)
  }, [])

  const value = useMemo(
    () => ({ isOfflineMode, setOfflineMode, notifyOfflineOnce, offlineNotified }),
    [isOfflineMode, setOfflineMode, notifyOfflineOnce, offlineNotified],
  )

  return (
    <DataSourceContext.Provider value={value}>
      {children}
    </DataSourceContext.Provider>
  )
}

export function useDataSource() {
  const ctx = useContext(DataSourceContext)
  if (!ctx) throw new Error('useDataSource must be used within DataSourceProvider')
  return ctx
}
