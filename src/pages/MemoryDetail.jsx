import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { loadContent } from '../utils/contentLoader'
import './MemoryDetail.css'

function MemoryDetail() {
  const { memoryId } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await loadContent('memories', memoryId)
        setContent(data)
      } catch (err) {
        console.error('Failed to load memory:', err)
        setError('Could not load this memory. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    load()
  }, [memoryId])

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="error-container">
        <p>{error || 'Something went wrong'}</p>
        <Link to="/memory" className="back-link">← Back to memories</Link>
      </div>
    )
  }

  return (
    <div className="memory-detail">
      <div className="memory-detail-container">
        <Link to="/memory" className="back-link">← Back to memories</Link>
        
        <article className="memory-card">
          <header className="memory-header">
            <h1 className="memory-title">{content.title}</h1>
            {content.date && <time className="memory-date">{content.date}</time>}
          </header>

          <div className="memory-content">
            {content.descriptionContent ? (
              <MarkdownRenderer content={content.descriptionContent} />
            ) : (
              <p>This memory is still being written...</p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default MemoryDetail

