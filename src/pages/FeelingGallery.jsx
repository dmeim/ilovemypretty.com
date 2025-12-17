import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'
import Card from '../components/Card'
import { fetchIndex } from '../utils/contentLoader'

function FeelingGallery() {
  const [feelings, setFeelings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadFeelings() {
      try {
        const items = await fetchIndex('feelings')
        setFeelings(items)
      } catch (err) {
        console.error('Failed to load feelings:', err)
        setError('Could not load feelings. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    loadFeelings()
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
      title="How are you feeling?"
      subtitle="Tap on how you're feeling right now, and I'll be there for you"
    >
      {feelings.map((feeling, index) => (
        <Card
          key={feeling.id}
          to={`/feeling/${feeling.id}`}
          title={feeling.title}
          subtitle={feeling.subtitle}
          theming={feeling.theming}
          delay={index}
        />
      ))}
    </Gallery>
  )
}

export default FeelingGallery

