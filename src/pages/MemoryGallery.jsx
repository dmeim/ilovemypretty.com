import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'
import Card from '../components/Card'
import { fetchIndex } from '../utils/contentLoader'

function MemoryGallery() {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadMemories() {
      try {
        const items = await fetchIndex('memories')
        setMemories(items)
      } catch (err) {
        console.error('Failed to load memories:', err)
        setError('Could not load memories. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    loadMemories()
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
      title="Our Memories"
      subtitle="Moments I treasure with you"
    >
      {memories.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-warm-gray)', gridColumn: '1 / -1' }}>
          Memories coming soon...
        </p>
      ) : (
        memories.map((memory, index) => (
          <Card
            key={memory.id}
            to={`/memory/${memory.id}`}
            title={memory.title}
            subtitle={memory.date}
            theming={memory.theming}
            delay={index}
          />
        ))
      )}
    </Gallery>
  )
}

export default MemoryGallery

