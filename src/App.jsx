import { useState } from 'react'
import './App.css'
import ShowlyTitle from './components/ShowlyTitle'
import DecryptedText from './components/DecryptedText'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-container">
        <ShowlyTitle/>
      </div>
      <div className='browse-category'>
        <h1>
          <DecryptedText 
            text="Browse category" 
            animateOn="view"
            sequential={true}
            speed={80}
            maxIterations={20}
            className="decrypted"
            encryptedClassName="encrypted"
            parentClassName="decryption-animation"
          />
        </h1>
        <div className="category-list">
          <div className="category-item">Movies</div>
          <div className="category-item">Food</div>
          <div className="category-item">Concerts</div>
          <div className='category-item'>Music</div>
          <div className="category-item">Comedy</div>
          <div className="category-item">Sports</div>
        </div>
      </div>
      <div className='Upcoming-Events'>
        <h1>Upcoming Events</h1>
      </div>
    </>
  )
}

export default App
