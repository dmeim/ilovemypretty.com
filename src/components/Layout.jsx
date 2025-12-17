import { Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout() {
  const location = useLocation()
  
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
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-logo">
            🤍
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
        </nav>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>Made with love, for you 🤍</p>
      </footer>
    </div>
  )
}

export default Layout

