import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'
import Card from '../components/Card'
import { fetchIndexWithGroups } from '../utils/contentLoader'
import './FeelingGallery.css'

function FeelingGallery() {
  const [groups, setGroups] = useState([])
  const [feelings, setFeelings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadFeelings() {
      try {
        const { groups: groupsData, items } = await fetchIndexWithGroups('feelings')
        setGroups(groupsData)
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

  // Group feelings by their group field
  const groupedFeelings = groups.map(group => ({
    ...group,
    feelings: feelings.filter(f => f.group === group.id)
  })).filter(group => group.feelings.length > 0)

  // Calculate animation delay offset for each section
  let globalIndex = 0
  const sectionsWithDelays = groupedFeelings.map(group => {
    const startIndex = globalIndex
    globalIndex += group.feelings.length
    return { ...group, startIndex }
  })

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
                delay={group.startIndex + index}
              />
            ))}
          </div>
        </section>
      ))}
    </Gallery>
  )
}

export default FeelingGallery
