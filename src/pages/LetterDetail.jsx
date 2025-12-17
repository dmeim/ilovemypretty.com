import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { loadContent } from '../utils/contentLoader'
import './LetterDetail.css'

function LetterDetail() {
  const { letterId } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await loadContent('letters', letterId)
        setContent(data)
      } catch (err) {
        console.error('Failed to load letter:', err)
        setError('Could not load this letter. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    load()
  }, [letterId])

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
        <Link to="/letter" className="back-link">← Back to letters</Link>
      </div>
    )
  }

  return (
    <div className="letter-detail">
      <div className="letter-detail-container">
        <Link to="/letter" className="back-link">← Back to letters</Link>
        
        <article className="letter-paper">
          <header className="letter-header">
            <h1 className="letter-title">{content.title}</h1>
            {content.date && <time className="letter-date">{content.date}</time>}
          </header>

          <div className="letter-content">
            {content.contentContent ? (
              <MarkdownRenderer content={content.contentContent} />
            ) : (
              <p>This letter is still being written...</p>
            )}
          </div>
          
          <footer className="letter-footer">
            <p>Forever yours 🤍</p>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default LetterDetail

