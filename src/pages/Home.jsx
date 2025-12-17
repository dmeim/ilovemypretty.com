import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-hearts">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="floating-heart" style={{ animationDelay: `${i * 0.5}s` }}>
              🤍
            </span>
          ))}
        </div>
        
        <h1 className="home-title">
          Hello, My Pretty
        </h1>
        
        <p className="home-subtitle">
          A little corner of the internet, just for you
        </p>
      </div>
      
      <div className="home-message">
        <div className="home-card">
          <p>
            I made this website as a gift for you. Whenever you're feeling 
            something—happy, sad, anxious, or anything in between—just scan 
            one of the cards I gave you, and you'll find a message from me 
            along with some comforting words from Scripture.
          </p>
          <p>
            This is my way of being there for you, even when I can't be 
            there in person. I love you so much.
          </p>
          <p className="home-signature">
            — With all my love 🤍
          </p>
        </div>
      </div>
      
      <div className="home-actions">
        <Link to="/feeling" className="home-button">
          How are you feeling?
        </Link>
      </div>
    </div>
  )
}

export default Home

