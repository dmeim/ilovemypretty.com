import { useMemo } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useHeart } from '../contexts/HeartContext'
import PageTransition from './PageTransition'
import ThemeToggle from './ThemeToggle'
import PullToRefresh from './PullToRefresh'
import './Layout.css'

// Configuration - just change this number!
const HEART_COUNT = 30

function Layout() {
  const location = useLocation()
  const { selectedHeart, heartEmojis } = useHeart()
  
  // Generate random hearts with random styles once on mount
  const hearts = useMemo(() => 
    [...Array(HEART_COUNT)].map(() => ({
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      style: {
        left: `${Math.random() * 95}%`,
        top: `${10 + Math.random() * 70}%`, // Spawn between 10% and 80% from top
        fontSize: `${0.9 + Math.random() * 0.8}rem`,
        animationDuration: `${13 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 2}s`, // Shorter initial delay since they're already visible
      }
    })),
    [heartEmojis]
  )
  
  // Navigation items - letters and memories are hidden for now
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/feeling', label: 'Feelings' },
    // Hidden until ready:
    // { path: '/letter', label: 'Letters' },
    // { path: '/memory', label: 'Memories' },
  ]

  return (
    <div className="layout">
      {/* Floating hearts background animation */}
      <div className="floating-hearts-bg">
        {hearts.map((heart, i) => (
          <span key={i} className="floating-heart" style={heart.style}>
            {heart.emoji}
          </span>
        ))}
      </div>
      
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-logo">
            {selectedHeart}
          </Link>
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </header>
      
      <main className="main">
        <PullToRefresh>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </PullToRefresh>
      </main>
      
      <footer className="footer">
        <p>Made with love</p>
      </footer>
    </div>
  )
}

export default Layout

