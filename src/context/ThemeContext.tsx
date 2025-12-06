import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Theme } from '../types'

/**
 * Theme Context - Manages light/dark mode across the application.
 * 
 * Features:
 * - Persists theme preference to localStorage
 * - Applies 'dark' class to document for Tailwind dark mode
 * - Provides toggle function and current theme state
 */

// Context type definition
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Create the context with undefined default (will be provided by ThemeProvider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// localStorage key for persisting theme
const THEME_STORAGE_KEY = 'vidin-theme'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider Component
 * Wraps the app and provides theme state + toggle functionality.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') {
      return stored
    }
    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // Apply theme class to document element whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // Toggle between light and dark
  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Set a specific theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to access theme context.
 * Must be used within a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

