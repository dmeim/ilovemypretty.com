import { Link } from 'react-router-dom'
import './Card.css'

function Card({ to, title, subtitle, theming, delay = 0 }) {
  const cardStyle = theming ? {
    '--card-bg': theming.backgroundColor,
    '--card-text': theming.textColor,
    '--card-accent': theming.accentColor,
    animationDelay: `${delay * 100}ms`
  } : {
    animationDelay: `${delay * 100}ms`
  }

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

