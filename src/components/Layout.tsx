import { ReactNode } from 'react'
import Navbar from './Navbar'
import ToastContainer from './ToastContainer'
import Sidebar from './Sidebar'

/**
 * Layout Component
 * 
 * Wraps all pages with:
 * - Navbar (top navigation)
 * - Toast container (for notifications)
 * - Sidebar (for video history)
 * - Main content area
 */

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern">
      {/* Navigation bar at the top */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1 pt-32">
        {children}
      </main>

      {/* Sidebar for video history (slides in from right) */}
      <Sidebar />

      {/* Toast notifications container (fixed position) */}
      <ToastContainer />
    </div>
  )
}

