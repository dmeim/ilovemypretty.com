import { useMemo } from 'react'
import './LoadingScreen.css'

const HEART_EMOJIS = ['🤍', '❤️', '🧡', '💛', '💚', '💙', '💜', '🩷', '🩵', '🩶']
const HEART_COUNT = 25

function LoadingScreen({ isLoading }) {
  // Generate random hearts with random styles
  const hearts = useMemo(() => 
    [...Array(HEART_COUNT)].map(() => ({
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      style: {
        left: `${Math.random() * 95}%`,
        top: `${10 + Math.random() * 70}%`,
        fontSize: `${0.9 + Math.random() * 0.8}rem`,
        animationDuration: `${13 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 2}s`,
      }
    })),
    []
  )

  // Select a random primary heart for the center
  const primaryHeart = useMemo(() => 
    HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    []
  )

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${isLoading ? 'visible' : 'hidden'}`}>
      {/* Floating hearts background */}
      <div className="loading-hearts-bg">
        {hearts.map((heart, i) => (
          <span key={i} className="loading-floating-heart" style={heart.style}>
            {heart.emoji}
          </span>
        ))}
      </div>
      
      {/* Center pulsing heart */}
      <div className="loading-center">
        <span className="loading-main-heart">{primaryHeart}</span>
        <p className="loading-text">Loading with love...</p>
      </div>
    </div>
  )
}

export default LoadingScreen

