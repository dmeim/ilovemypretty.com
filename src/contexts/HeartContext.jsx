import { createContext, useContext, useMemo } from 'react'

// All heart emoji colors
const heartEmojis = ['🤍', '❤️', '🧡', '💛', '💚', '💙', '💜', '🩷', '🩵', '🩶']

const HeartContext = createContext()

export function HeartProvider({ children }) {
  // Randomly select one heart emoji once on app load
  const selectedHeart = useMemo(() => 
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    []
  )
  
  return (
    <HeartContext.Provider value={{ selectedHeart, heartEmojis }}>
      {children}
    </HeartContext.Provider>
  )
}

export function useHeart() {
  const context = useContext(HeartContext)
  if (!context) {
    throw new Error('useHeart must be used within a HeartProvider')
  }
  return context
}

