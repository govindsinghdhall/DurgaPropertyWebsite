import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/ui/Toast";
import { PropertyStoreProvider } from "@/context/PropertyStoreContext";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { PropertiesPage } from "@/pages/PropertiesPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";
import { ContactPage } from "@/pages/ContactPage";
import { ComparePage } from "@/pages/ComparePage";
import { ToolsPage } from "@/pages/ToolsPage";
import { TcpHaryanaFaridabad } from "@/pages/TcpHaryanaFaridabad";
import { MapsPage } from "@/pages/MapsPage";
import { ResidentialMapsPage } from "@/pages/ResidentialMapsPage";
import { ResidentialSectorMapsPage } from "@/pages/ResidentialSectorMapsPage";
import { CommercialMapsPage } from "@/pages/CommercialMapsPage";
import { CommercialSectorMapsPage } from "@/pages/CommercialSectorMapsPage";
import { CommercialMarketsMapsPage } from "@/pages/CommercialMarketsMapsPage";
import { MapDetailPage } from "@/pages/MapDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "properties/:id", element: <PropertyDetailPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "tools", element: <ToolsPage /> },

      { path: "maps", element: <MapsPage /> },

      {
        path: "maps/residential",
        element: <ResidentialMapsPage />,
      },

      {
        path: "maps/residential/sectors",
        element: <ResidentialSectorMapsPage />,
      },

      {
        path: "maps/commercial",
        element: <CommercialMapsPage />,
      },

      {
        path: "maps/commercial/sectors",
        element: <CommercialSectorMapsPage />,
      },

      {
        path: "maps/commercial/markets",
        element: <CommercialMarketsMapsPage />,
      },

      {
        path: "maps/:category/:type/:slug",
        element: <MapDetailPage />,
      },

      {
        path: "tcp-haryana-faridabad",
        element: <TcpHaryanaFaridabad />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PropertyStoreProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </PropertyStoreProvider>
    </QueryClientProvider>
  );
}
