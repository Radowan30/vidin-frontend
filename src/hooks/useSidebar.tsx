import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

/**
 * Sidebar State Hook
 * 
 * Manages sidebar open/close state using React Context.
 * This allows any component to control or read the sidebar state.
 */

interface SidebarContextType {
  isOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode
}

/**
 * SidebarProvider Component
 * Wraps the app and provides sidebar state functionality.
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openSidebar = useCallback(() => setIsOpen(true), [])
  const closeSidebar = useCallback(() => setIsOpen(false), [])
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

/**
 * Custom hook to access sidebar context.
 * Must be used within a SidebarProvider.
 */
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

