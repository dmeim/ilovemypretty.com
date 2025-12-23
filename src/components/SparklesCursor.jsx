import { useEffect, useRef, useCallback } from 'react'
import './SparklesCursor.css'

const PARTICLES = ['❤️', '✨', '💕', '⭐', '💗', '❤️‍🔥', '💌']
const PARTICLE_LIFETIME = 1000 // ms
const THROTTLE_DELAY = 20 // ms between particle spawns

function SparklesCursor() {
  const containerRef = useRef(null)
  const lastSpawnTime = useRef(0)

  const createParticle = useCallback((x, y) => {
    if (!containerRef.current) return

    const particle = document.createElement('span')
    particle.className = 'sparkle-particle'
    
    // Random particle type
    const emoji = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
    particle.textContent = emoji
    
    // Random size between 8-14px
    const size = 8 + Math.random() * 6
    particle.style.fontSize = `${size}px`
    
    // Random horizontal drift (-20 to 20px)
    const drift = (Math.random() - 0.5) * 40
    particle.style.setProperty('--drift', `${drift}px`)
    
    // Random animation duration (800-1200ms)
    const duration = 800 + Math.random() * 400
    particle.style.animationDuration = `${duration}ms`
    
    // Position at cursor
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    
    containerRef.current.appendChild(particle)
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, duration)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const now = Date.now()
    
    // Throttle particle creation
    if (now - lastSpawnTime.current < THROTTLE_DELAY) return
    lastSpawnTime.current = now
    
    // Use pageX/pageY to account for scroll position
    createParticle(e.pageX, e.pageY)
  }, [createParticle])

  useEffect(() => {
    // Only add listener on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return <div ref={containerRef} className="sparkles-container" aria-hidden="true" />
}

export default SparklesCursor

