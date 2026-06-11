import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CompareBar } from '@/components/properties/CompareBar'
import { WhatsAppFloat } from './WhatsAppFloat'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
      <WhatsAppFloat />
    </div>
  )
}
