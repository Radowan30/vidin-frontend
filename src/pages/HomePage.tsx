import { motion } from 'framer-motion'
import TextInputPanel from '../components/TextInputPanel'
import VideoPanel from '../components/VideoPanel'

/**
 * HomePage Component
 * 
 * Main page of VidIn with a two-column layout:
 * - Left: Text input panel for entering LinkedIn post text
 * - Right: Video preview panel for viewing generated videos
 * 
 * The layout is responsive:
 * - Desktop: Two columns side by side
 * - Mobile: Stacked vertically (text input on top, video below)
 */

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-stretch">
      {/* Container with max width and padding */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Two-column grid layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full min-h-[calc(100vh-8rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left column: Text input */}
          <div className="min-h-[400px] lg:min-h-0">
            <TextInputPanel />
          </div>
          
          {/* Right column: Video preview */}
          <div className="min-h-[400px] lg:min-h-0">
            <VideoPanel />
          </div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradient orb - top right */}
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 
                     bg-gradient-to-br from-primary-500/20 to-accent-500/20 
                     dark:from-primary-500/10 dark:to-accent-500/10
                     rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Gradient orb - bottom left */}
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 
                     bg-gradient-to-tr from-accent-500/20 to-primary-500/20 
                     dark:from-accent-500/10 dark:to-primary-500/10
                     rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

