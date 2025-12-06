import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/**
 * ThemeToggle Component
 * 
 * A toggle switch for switching between light and dark mode.
 * Shows sun icon for light mode and moon icon for dark mode.
 */

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-colors duration-200
        ${isDark 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Animated icon switch */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon size={20} className="fill-current" />
        ) : (
          <Sun size={20} />
        )}
      </motion.div>
    </motion.button>
  )
}

