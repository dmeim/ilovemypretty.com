import { useRef, useCallback, useEffect } from 'react'
import './ConfettiBurst.css'

const PARTICLES = ['❤️', '💕', '💗', '💖', '💝', '✨', '⭐', '🩷', '🩵', '💜']
const PARTICLE_COUNT = 60
const PARTICLE_LIFETIME = 1500 // ms
const GRAVITY = 0.15
const INITIAL_VELOCITY = 12

function ConfettiBurst({ children, className = '' }) {
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  const canvasRef = useRef(null)

  const createParticles = useCallback((originX, originY) => {
    const particles = []
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5
      const velocity = INITIAL_VELOCITY * (0.5 + Math.random() * 0.5)
      
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5, // Bias upward
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        scale: 0.5 + Math.random() * 0.5,
        emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
        life: 1,
        decay: 0.015 + Math.random() * 0.01
      })
    }
    
    return particles
  }, [])

  const animate = useCallback(() => {
    if (!canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')
    const { width, height } = canvasRef.current
    
    ctx.clearRect(0, 0, width, height)
    
    let stillAlive = false
    
    particlesRef.current.forEach(particle => {
      if (particle.life <= 0) return
      stillAlive = true
      
      // Update physics
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += GRAVITY
      particle.rotation += particle.rotationSpeed
      particle.life -= particle.decay
      
      // Draw particle
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      ctx.globalAlpha = Math.max(0, particle.life)
      ctx.font = `${20 * particle.scale}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(particle.emoji, 0, 0)
      ctx.restore()
    })
    
    if (stillAlive) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Clean up when all particles are dead
      ctx.clearRect(0, 0, width, height)
      particlesRef.current = []
    }
  }, [])

  const triggerBurst = useCallback((event) => {
    if (!containerRef.current || !canvasRef.current) return
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const canvasRect = canvasRef.current.getBoundingClientRect()
    
    // Get click position relative to canvas
    const originX = rect.left + rect.width / 2 - canvasRect.left
    const originY = rect.top + rect.height / 2 - canvasRect.top
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    // Create new particles
    particlesRef.current = createParticles(originX, originY)
    
    // Start animation
    animate()
  }, [createParticles, animate])

  // Set up canvas on mount
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="confetti-canvas" 
        aria-hidden="true"
      />
      <span 
        ref={containerRef}
        className={`confetti-trigger ${className}`}
        onClick={triggerBurst}
        onKeyDown={(e) => e.key === 'Enter' && triggerBurst(e)}
        role="button"
        tabIndex={0}
        aria-label="Click for a surprise"
      >
        {children}
      </span>
    </>
  )
}

export default ConfettiBurst

