import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { loadContent, fetchIndex } from '../utils/contentLoader'
import { generateDarkTheming } from '../utils/colorUtils'
import { useTheme } from '../contexts/ThemeContext'
import './FeelingDetail.css'

const BIBLE_VERSIONS = [
  { code: 'NKJV', name: 'NKJV' },
  { code: 'NIV', name: 'NIV' },
  { code: 'ESV', name: 'ESV' },
  { code: 'KJV', name: 'KJV' },
  { code: 'NLT', name: 'NLT' },
]

const STORAGE_KEY = 'preferred-bible-version'

function FeelingDetail() {
  const { emotion } = useParams()
  const { isDark } = useTheme()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(() => {
    // Load from localStorage or default to NKJV
    return localStorage.getItem(STORAGE_KEY) || 'NKJV'
  })

  // Save version preference to localStorage when it changes
  const handleVersionChange = (e) => {
    const newVersion = e.target.value
    setSelectedVersion(newVersion)
    localStorage.setItem(STORAGE_KEY, newVersion)
  }

  // Helper to update the Bible Gateway URL with the selected version
  const getUpdatedBibleGatewayUrl = (url) => {
    if (!url) return null
    try {
      const urlObj = new URL(url)
      urlObj.searchParams.set('version', selectedVersion)
      return urlObj.toString()
    } catch {
      return url
    }
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        // Fetch both index (for title) and config (for page content)
        const [indexItems, pageContent] = await Promise.all([
          fetchIndex('feelings'),
          loadContent('feelings', emotion)
        ])
        
        // Find the matching feeling in the index to get the title
        const indexEntry = indexItems.find(item => item.id === emotion)
        
        // Merge: title from index, everything else from config
        setContent({
          ...pageContent,
          title: indexEntry?.title || emotion
        })
      } catch (err) {
        console.error('Failed to load feeling:', err)
        setError('Could not load this feeling. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    load()
  }, [emotion])

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
        <Link to="/feeling" className="back-link">← Back to feelings</Link>
      </div>
    )
  }

  // Generate appropriate theming based on light/dark mode
  const theming = content.theming 
    ? (isDark ? generateDarkTheming(content.theming) : content.theming)
    : null
    
  const pageStyle = theming ? {
    '--page-bg': theming.backgroundColor,
    '--page-text': theming.textColor,
    '--page-accent': theming.accentColor,
  } : {}

  return (
    <div className="feeling-detail" style={pageStyle}>
      <div className="feeling-detail-container">
        <Link to="/feeling" className="back-link">← Back to feelings</Link>
        
        <header className="feeling-header">
          <h1 className="feeling-title">{content.title}</h1>
        </header>

        {content.messageContent && (
          <section className="feeling-section feeling-message">
            <h2 className="section-title">A Message For You</h2>
            <div className="section-content">
              <MarkdownRenderer content={content.messageContent} />
            </div>
          </section>
        )}

        {content.versesContent && (
          <section className="feeling-section feeling-verses">
            <h2 className="section-title section-title-scripture">
              <span>From Scripture</span>
              <div className="scripture-controls">
                {content.bibleGatewayUrl && (
                  <a 
                    href={getUpdatedBibleGatewayUrl(content.bibleGatewayUrl)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bible-gateway-link"
                    title="Read all verses on Bible Gateway"
                  >
                    📖
                  </a>
                )}
                <select 
                  className="version-selector"
                  value={selectedVersion}
                  onChange={handleVersionChange}
                  aria-label="Select Bible version"
                >
                  {BIBLE_VERSIONS.map((v) => (
                    <option key={v.code} value={v.code}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </h2>
            <div className="section-content verses-content">
              <MarkdownRenderer content={content.versesContent} bibleVersion={selectedVersion} parseVerses />
            </div>
          </section>
        )}
        
        <footer className="feeling-footer">
          <p>I love you 🤍</p>
        </footer>
      </div>
    </div>
  )
}

export default FeelingDetail

