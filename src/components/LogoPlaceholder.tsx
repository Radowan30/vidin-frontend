import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

/**
 * LogoPlaceholder Component
 * 
 * Displays the VidIn logo, switching between light and dark versions
 * based on the current theme:
 * - Dark theme: Uses logo-light.png (bright/white "Vid" text)
 * - Light theme: Uses logo-dark.png (dark "Vid" text)
 */

export default function LogoPlaceholder() {
  const { theme } = useTheme()
  
  // Select logo based on theme:
  // - Dark theme needs the bright/light logo (white text visible on dark background)
  // - Light theme needs the dark logo (dark text visible on light background)
  const logoSrc = theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'

  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img 
        src={logoSrc}
        alt="VidIn Logo"
        className="h-16 sm:h-20 md:h-24 w-auto object-contain"
      />
    </motion.div>
  )
}