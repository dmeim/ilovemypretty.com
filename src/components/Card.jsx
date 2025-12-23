import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { generateDarkTheming } from '../utils/colorUtils'
import './Card.css'

function Card({ to, title, subtitle, theming, delay = 0 }) {
  const { isDark } = useTheme()
  
  // Generate appropriate theming based on light/dark mode
  const effectiveTheming = theming 
    ? (isDark ? generateDarkTheming(theming) : theming)
    : null
    
  const cardStyle = effectiveTheming ? {
    '--card-bg': effectiveTheming.backgroundColor,
    '--card-text': effectiveTheming.textColor,
    '--card-accent': effectiveTheming.accentColor
  } : {}

  return (
    <Link to={to} className="card" style={cardStyle}>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <div className="card-arrow">→</div>
    </Link>
  )
}

export default Card

