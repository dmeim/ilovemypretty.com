import ReactMarkdown from 'react-markdown'
import './MarkdownRenderer.css'

function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer

