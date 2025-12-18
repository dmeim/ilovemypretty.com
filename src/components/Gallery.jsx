import './Gallery.css'

function Gallery({ title, subtitle, children, useSections = false }) {
  return (
    <div className="gallery">
      <header className="gallery-header">
        <h1 className="gallery-title">{title}</h1>
        {subtitle && <p className="gallery-subtitle">{subtitle}</p>}
      </header>
      {useSections ? (
        <div className="gallery-sections">
          {children}
        </div>
      ) : (
        <div className="gallery-grid">
          {children}
        </div>
      )}
    </div>
  )
}

export default Gallery
