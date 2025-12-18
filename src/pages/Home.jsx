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
            I wanted my gift to you to be something custom and personal, so I decided why not make a website.
            No matter what you are feeling, you can either scan one of the cards I gave you, 
            or come straight to this website, and get a message from me 
            along with some comforting words from Scripture.
          </p>
          <p>
            This is my way of being there for you, even when I can't be 
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

