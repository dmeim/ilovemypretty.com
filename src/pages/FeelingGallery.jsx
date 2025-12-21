import { useState, useEffect, useRef } from 'react'
import Gallery from '../components/Gallery'
import Card from '../components/Card'
import { fetchIndexWithGroups, fetchAllConfigs } from '../utils/contentLoader'
import './FeelingGallery.css'

function FeelingGallery() {
  const [groups, setGroups] = useState([])
  const [feelings, setFeelings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  useEffect(() => {
    async function loadFeelings() {
      try {
        const { groups: groupsData, items } = await fetchIndexWithGroups('feelings')
        setGroups(groupsData)
        
        // Fetch individual configs to get theming data
        const ids = items.map(item => item.id)
        const configs = await fetchAllConfigs('feelings', ids)
        
        // Merge theming from configs into items
        const itemsWithTheming = items.map(item => ({
          ...item,
          theming: configs[item.id]?.theming || null
        }))
        
        setFeelings(itemsWithTheming)
      } catch (err) {
        console.error('Failed to load feelings:', err)
        setError('Could not load feelings. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    loadFeelings()
  }, [])

  // Filter feelings based on search query
  const filteredFeelings = searchQuery.trim()
    ? feelings.filter(f => 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.subtitle && f.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : feelings

  // Group feelings by their group field
  const groupedFeelings = groups.map(group => ({
    ...group,
    feelings: filteredFeelings.filter(f => f.group === group.id)
  })).filter(group => group.feelings.length > 0)

  // Calculate animation delay offset for each section
  let globalIndex = 0
  const sectionsWithDelays = groupedFeelings.map(group => {
    const startIndex = globalIndex
    globalIndex += group.feelings.length
    return { ...group, startIndex }
  })

  const isSearching = searchQuery.trim().length > 0

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
      useSections
    >
      {/* Search Box */}
      <div className="feeling-search-container">
        <div className="feeling-search-box">
          <svg 
            className="feeling-search-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="feeling-search-input"
            placeholder="Search for a feeling..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="feeling-search-clear"
              onClick={() => {
                setSearchQuery('')
                searchInputRef.current?.focus()
              }}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {isSearching && (
          <p className="feeling-search-results">
            {filteredFeelings.length === 0 
              ? "No feelings found... try another word 💕" 
              : `Found ${filteredFeelings.length} feeling${filteredFeelings.length !== 1 ? 's' : ''}`
            }
          </p>
        )}
      </div>

      {sectionsWithDelays.map((group) => (
        <section key={group.id} className="feeling-section">
          <div className="feeling-section-header">
            <h2 className="feeling-section-title">{group.title}</h2>
            <p className="feeling-section-description">{group.description}</p>
          </div>
          <div className="feeling-section-grid">
            {group.feelings.map((feeling, index) => (
              <Card
                key={feeling.id}
                to={`/feeling/${feeling.id}`}
                title={feeling.title}
                subtitle={feeling.subtitle}
                theming={feeling.theming}
                delay={isSearching ? 0 : group.startIndex + index}
              />
            ))}
          </div>
        </section>
      ))}
    </Gallery>
  )
}

export default FeelingGallery
