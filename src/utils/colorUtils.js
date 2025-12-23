/**
 * Color utility functions for dark mode theming
 */

/**
 * Convert hex color to HSL
 * @param {string} hex - Hex color string (e.g., "#FFFBEA")
 * @returns {{ h: number, s: number, l: number }} HSL values
 */
function hexToHSL(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, '')
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * Convert HSL to hex color
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color string
 */
function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }
  
  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Generate dark mode color variant from a light mode color
 * Keeps the hue, adjusts saturation and inverts/adjusts lightness
 * @param {string} hex - Light mode hex color
 * @param {string} type - Color type: 'background', 'text', or 'accent'
 * @returns {string} Dark mode hex color
 */
export function toDarkMode(hex, type = 'background') {
  if (!hex || !hex.startsWith('#')) return hex
  
  const hsl = hexToHSL(hex)
  let { h, s, l } = hsl
  
  switch (type) {
    case 'background':
      // Light backgrounds become dark: keep hue, reduce saturation slightly, darken significantly
      // Map light (80-100) to dark (15-25)
      l = Math.max(12, Math.min(25, 100 - l * 0.85))
      s = Math.max(15, s * 0.6) // Reduce saturation but keep some color
      break
      
    case 'text':
      // Dark text becomes light: invert lightness
      // Map dark text (10-40) to light (70-90)
      if (l < 50) {
        l = Math.min(90, Math.max(70, 100 - l))
        s = Math.min(50, s * 0.8) // Slightly desaturate for readability
      }
      break
      
    case 'accent':
      // Accents stay vibrant but shift to work on dark backgrounds
      // Keep saturation, adjust lightness to be visible
      if (l > 50) {
        // Light accents: keep bright but not too bright
        l = Math.min(70, Math.max(50, l * 0.8))
      } else {
        // Dark accents: brighten them
        l = Math.min(70, Math.max(45, l * 1.3))
      }
      s = Math.min(85, Math.max(40, s)) // Ensure good saturation
      break
  }
  
  return hslToHex(h, s, l)
}

/**
 * Generate a complete dark theme from light theme colors
 * @param {object} theming - Light mode theming object
 * @returns {object} Dark mode theming object
 */
export function generateDarkTheming(theming) {
  if (!theming) return null
  
  return {
    backgroundColor: toDarkMode(theming.backgroundColor, 'background'),
    textColor: toDarkMode(theming.textColor, 'text'),
    accentColor: toDarkMode(theming.accentColor, 'accent')
  }
}

