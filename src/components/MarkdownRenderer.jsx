import React from 'react'
import ReactMarkdown from 'react-markdown'
import './MarkdownRenderer.css'

// Helper to build Bible Gateway URL for a specific verse
function buildVerseUrl(verseRef, version = 'NKJV') {
  const encoded = encodeURIComponent(verseRef)
  return `https://www.biblegateway.com/passage/?search=${encoded}&version=${version}`
}

// Helper to parse and transform verse citations (e.g., "— Psalm 118:24")
function transformCitationText(text, bibleVersion) {
  // Match patterns like "— Psalm 118:24" or "— 1 Corinthians 13:4-7"
  const citationRegex = /—\s*(.+)/
  const match = text.match(citationRegex)
  
  if (match) {
    const verseRef = match[1].trim()
    const url = buildVerseUrl(verseRef, bibleVersion)
    return {
      isCitation: true,
      verseRef,
      url
    }
  }
  return { isCitation: false }
}

function MarkdownRenderer({ content, bibleVersion = 'NKJV', parseVerses = false }) {
  // Build components object - only include citation parsing when parseVerses is true
  const components = {
    // Custom image rendering
    img: ({ node, ...props }) => (
      <img {...props} loading="lazy" />
    ),
    // Custom link rendering (open external in new tab)
    a: ({ node, href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a 
          href={href} 
          {...props}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
    // Allow video tags from markdown
    video: ({ node, ...props }) => (
      <video {...props} controls playsInline />
    ),
  }

  // Only add citation parsing when parseVerses is enabled
  if (parseVerses) {
    components.p = ({ node, children, ...props }) => {
      // Check if children is a string that matches citation pattern
      if (React.Children.count(children) === 1) {
        const child = React.Children.toArray(children)[0]
        if (typeof child === 'string') {
          const result = transformCitationText(child, bibleVersion)
          if (result.isCitation) {
            return (
              <p {...props} className="verse-citation">
                <a 
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verse-link"
                  title={`Read ${result.verseRef} on Bible Gateway`}
                >
                  📖
                </a>
                {' '}{result.verseRef}
              </p>
            )
          }
        }
      }
      return <p {...props}>{children}</p>
    }
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer

