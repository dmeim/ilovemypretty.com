import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'
import Card from '../components/Card'
import { fetchIndex } from '../utils/contentLoader'

function LetterGallery() {
  const [letters, setLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadLetters() {
      try {
        const items = await fetchIndex('letters')
        setLetters(items)
      } catch (err) {
        console.error('Failed to load letters:', err)
        setError('Could not load letters. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    loadLetters()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <Gallery
      title="Letters to You"
      subtitle="Words from my heart to yours"
    >
      {letters.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-warm-gray)', gridColumn: '1 / -1' }}>
          Letters coming soon...
        </p>
      ) : (
        letters.map((letter, index) => (
          <Card
            key={letter.id}
            to={`/letter/${letter.id}`}
            title={letter.title}
            subtitle={letter.date}
            theming={letter.theming}
            delay={index}
          />
        ))
      )}
    </Gallery>
  )
}

export default LetterGallery

