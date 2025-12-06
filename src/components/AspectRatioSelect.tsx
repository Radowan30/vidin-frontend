import { motion } from 'framer-motion'
import type { AspectRatio } from '../types'

/**
 * AspectRatioSelect Component
 * 
 * A visual selector for video aspect ratios.
 * Shows preview boxes that represent each aspect ratio.
 */

interface AspectRatioOption {
  value: AspectRatio
  label: string
  description: string
  // Width/height ratio for the preview box
  previewWidth: number
  previewHeight: number
}

const options: AspectRatioOption[] = [
  {
    value: '1:1',
    label: 'Square',
    description: 'Instagram, LinkedIn',
    previewWidth: 24,
    previewHeight: 24,
  },
  {
    value: '9:16',
    label: 'Vertical',
    description: 'TikTok, Reels',
    previewWidth: 18,
    previewHeight: 32,
  },
  {
    value: '16:9',
    label: 'Wide',
    description: 'YouTube, Twitter',
    previewWidth: 32,
    previewHeight: 18,
  },
]

interface AspectRatioSelectProps {
  value: AspectRatio
  onChange: (value: AspectRatio) => void
  disabled?: boolean
}

export default function AspectRatioSelect({ 
  value, 
  onChange, 
  disabled = false 
}: AspectRatioSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
        Aspect:
      </span>
      
      <div className="flex gap-1.5">
        {options.map((option) => {
          const isSelected = value === option.value
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              disabled={disabled}
              className={`relative p-2 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              whileHover={disabled ? {} : { scale: 1.05 }}
              whileTap={disabled ? {} : { scale: 0.95 }}
              title={`${option.label} (${option.value}) - ${option.description}`}
            >
              {/* Aspect ratio preview box */}
              <div 
                className={`rounded transition-colors duration-200
                  ${isSelected 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                style={{
                  width: option.previewWidth,
                  height: option.previewHeight,
                }}
              />
              
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="aspectRatioIndicator"
                  className="absolute inset-0 border-2 border-primary-500 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

