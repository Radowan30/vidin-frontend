import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import type { ToastItem, ToastType } from '../types'

/**
 * Toast Context - Manages toast notifications across the application.
 * 
 * Features:
 * - Show success, error, info, warning toasts
 * - Auto-dismiss after duration
 * - Stack multiple toasts
 */

// Context type definition
interface ToastContextType {
  toasts: ToastItem[]
  showToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

/**
 * Generate a unique ID for each toast
 */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * ToastProvider Component
 * Wraps the app and provides toast functionality.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Show a new toast
  const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = generateId()
    const newToast: ToastItem = { id, type, message, duration }
    
    // Add to toasts array
    setToasts(prev => [...prev, newToast])
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

/**
 * Custom hook to access toast context.
 * Must be used within a ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

