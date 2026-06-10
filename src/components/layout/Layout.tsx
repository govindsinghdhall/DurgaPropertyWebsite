import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CompareBar } from '@/components/properties/CompareBar'
import { OfflineBanner } from '@/components/common/OfflineBanner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
    </div>
  )
}
