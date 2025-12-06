import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useToast } from '../context/ToastContext'
import type { ToastType } from '../types'

/**
 * ToastContainer Component
 * 
 * Renders all active toast notifications in a fixed position container.
 * Uses AnimatePresence for smooth enter/exit animations.
 */

// Icon and color mapping for each toast type
const toastConfig: Record<ToastType, { 
  icon: typeof CheckCircle, 
  bgClass: string, 
  iconClass: string 
}> = {
  success: {
    icon: CheckCircle,
    bgClass: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    iconClass: 'text-green-500',
  },
  error: {
    icon: AlertCircle,
    bgClass: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
    iconClass: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bgClass: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    iconClass: 'text-blue-500',
  },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = toastConfig[toast.type]
          const Icon = config.icon

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 40 
              }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl 
                         border shadow-lg backdrop-blur-sm max-w-sm ${config.bgClass}`}
            >
              {/* Icon */}
              <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconClass}`} />
              
              {/* Message */}
              <p className="text-sm text-gray-700 dark:text-gray-200 flex-1">
                {toast.message}
              </p>
              
              {/* Close button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 
                           transition-colors text-gray-400 hover:text-gray-600 
                           dark:hover:text-gray-300"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

