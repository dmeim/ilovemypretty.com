import { useState, useRef, useCallback, useEffect } from 'react'
import { useHeart } from '../contexts/HeartContext'
import './PullToRefresh.css'

const PULL_THRESHOLD = 80 // px needed to trigger refresh
const MAX_PULL = 120 // max pull distance for visual feedback
const PARTICLE_COUNT = 30

function PullToRefresh({ children }) {
  const { selectedHeart, heartEmojis } = useHeart()
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [particles, setParticles] = useState([])
  
  const containerRef = useRef(null)
  const startYRef = useRef(0)
  const isPullingRef = useRef(false)
  
  // Check if this is a touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const createExplosionParticles = useCallback(() => {
    const newParticles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT
      const velocity = 5 + Math.random() * 5
      newParticles.push({
        id: i,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
      })
    }
    setParticles(newParticles)
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 1000)
  }, [heartEmojis])

  const handleTouchStart = useCallback((e) => {
    // Only activate if we're at the top of the page
    if (window.scrollY > 5) return
    
    startYRef.current = e.touches[0].clientY
    isPullingRef.current = true
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isPullingRef.current || isRefreshing) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startYRef.current
    
    // Only pull down, not up
    if (diff > 0 && window.scrollY <= 0) {
      // Apply resistance for smooth feel
      const resistance = 0.5
      const distance = Math.min(diff * resistance, MAX_PULL)
      setPullDistance(distance)
      
      // Prevent page scroll while pulling
      if (distance > 10) {
        e.preventDefault()
      }
    }
  }, [isRefreshing])

  const handleTouchEnd = useCallback(() => {
    if (!isPullingRef.current) return
    isPullingRef.current = false
    
    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      // Trigger refresh
      setIsRefreshing(true)
      createExplosionParticles()
      
      // Actually refresh the page after animation
      setTimeout(() => {
        window.location.reload()
      }, 600)
    } else {
      // Reset without refresh
      setPullDistance(0)
    }
  }, [pullDistance, isRefreshing, createExplosionParticles])

  // Set up touch event listeners
  useEffect(() => {
    if (!isTouchDevice) return
    
    const container = containerRef.current
    if (!container) return
    
    // Use passive: false for touchmove to allow preventDefault
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isTouchDevice, handleTouchStart, handleTouchMove, handleTouchEnd])

  // Calculate visual feedback values
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const heartScale = 1 + progress * 0.5
  const heartOpacity = Math.min(pullDistance / 30, 1)
  const heartStretch = 1 + progress * 0.3

  // Don't render pull indicator on non-touch devices
  if (!isTouchDevice) {
    return <>{children}</>
  }

  return (
    <div ref={containerRef} className="pull-to-refresh-container">
      {/* Pull indicator */}
      <div 
        className={`pull-indicator ${isRefreshing ? 'refreshing' : ''}`}
        style={{ 
          transform: `translateY(${pullDistance - 60}px)`,
          opacity: heartOpacity
        }}
      >
        <span 
          className="pull-heart"
          style={{
            transform: `scale(${heartScale}) scaleY(${heartStretch})`,
            opacity: isRefreshing ? 0 : 1
          }}
        >
          {selectedHeart}
        </span>
        
        {/* Explosion particles */}
        {particles.map(particle => (
          <span
            key={particle.id}
            className="pull-particle"
            style={{
              '--vx': particle.vx,
              '--vy': particle.vy,
              '--scale': particle.scale,
              '--rotation': `${particle.rotation}deg`,
            }}
          >
            {particle.emoji}
          </span>
        ))}
      </div>
      
      {/* Main content */}
      <div 
        className="pull-content"
        style={{ 
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none' 
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default PullToRefresh

