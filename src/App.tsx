import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast'
import { PropertyStoreProvider } from '@/context/PropertyStoreContext'
import { DataSourceProvider } from '@/context/DataSourceContext'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { PropertiesPage } from '@/pages/PropertiesPage'
import { PropertyDetailPage } from '@/pages/PropertyDetailPage'
import { ContactPage } from '@/pages/ContactPage'
import { ComparePage } from '@/pages/ComparePage'
import { ToolsPage } from '@/pages/ToolsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'properties/:id', element: <PropertyDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'tools', element: <ToolsPage /> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider>
        <PropertyStoreProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </PropertyStoreProvider>
      </DataSourceProvider>
    </QueryClientProvider>
  )
}
