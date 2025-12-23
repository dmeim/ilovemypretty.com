import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

function PageTransition({ children }) {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  // Trigger enter animation on mount/route change
  useEffect(() => {
    // Start hidden, then animate in
    setIsVisible(false)
    
    // Small delay to ensure CSS transition triggers
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })

    return () => cancelAnimationFrame(timer)
  }, [location.pathname])

  return (
    <div 
      className={`page-transition ${isVisible ? 'visible' : 'hidden'}`}
      key={location.pathname}
    >
      {children}
    </div>
  )
}

export default PageTransition

