import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

function PageTransition({ children }) {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    // Check if the path actually changed
    if (prevPathRef.current === location.pathname) {
      return
    }
    
    prevPathRef.current = location.pathname
    
    // Start exit animation
    setIsAnimating(true)
    setShouldRender(false)
    
    // After exit animation, trigger enter
    const exitTimer = setTimeout(() => {
      setShouldRender(true)
      
      // After enter animation completes
      const enterTimer = setTimeout(() => {
        setIsAnimating(false)
      }, 200)
      
      return () => clearTimeout(enterTimer)
    }, 200)

    return () => clearTimeout(exitTimer)
  }, [location.pathname])

  return (
    <div 
      className={`page-transition ${shouldRender ? 'visible' : 'hidden'}`}
      key={location.pathname}
    >
      {children}
    </div>
  )
}

export default PageTransition

