import './Gallery.css'

function Gallery({ title, subtitle, children }) {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1 className="gallery-title">{title}</h1>
        {subtitle && <p className="gallery-subtitle">{subtitle}</p>}
      </header>
      <div className="gallery-grid">
        {children}
      </div>
    </div>
  )
}

export default Gallery

