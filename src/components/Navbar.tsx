import { Link, useLocation } from 'react-router-dom'
import { Settings, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import LogoPlaceholder from './LogoPlaceholder'
import ThemeToggle from './ThemeToggle'
import { useSidebar } from '../hooks/useSidebar'

/**
 * Navbar Component
 * 
 * Top navigation bar with:
 * - Logo (left) - includes VidIn text in the image
 * - Settings link
 * - Theme toggle
 * - Menu button for video history sidebar
 */

export default function Navbar() {
  const location = useLocation()
  const { toggleSidebar } = useSidebar()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Left side: Logo (includes VidIn text) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <LogoPlaceholder />
            </Link>
          </div>

          {/* Right side: Settings, Theme Toggle, Menu */}
          <div className="flex items-center gap-3">
            {/* Settings button */}
            <Link 
              to="/settings"
              className={`p-2 rounded-lg transition-all duration-200 
                ${location.pathname === '/settings' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              title="Settings"
            >
              <Settings size={20} />
            </Link>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Menu button for sidebar */}
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                         text-gray-600 dark:text-gray-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Video History"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}
