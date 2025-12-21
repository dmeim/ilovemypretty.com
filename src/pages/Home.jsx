import { Link } from 'react-router-dom'
import { useHeart } from '../contexts/HeartContext'
import './Home.css'

function Home() {
  const { selectedHeart } = useHeart()
  
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">
          My Pretty {selectedHeart}
        </h1>
        
        <p className="home-subtitle">
          A little corner of the internet, just for you
        </p>
      </div>
      
      <div className="home-message">
        <div className="home-card">
          <p>
            I wanted my gift to you to be something custom, personal, and timeless, so I decided "Why not make a website?"
          </p>
          <p>
            When you are having some feelings, big or small, 
            you can come here and browse, 
            or scan one of the cards I gave you with your phone, 
            and get a message from me along with some comforting words from Scripture.
          </p>
          <p>
            This is my way of being there with and for you, even when I can't be 
            there in person. I love you My Pretty {selectedHeart}.
          </p>
          <p className="home-signature">
            — Your Handsome, Swole, Nerdy Man
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

