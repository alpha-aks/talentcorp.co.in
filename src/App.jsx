import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

const PRELOADER_DURATION_MS = 2800

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, PRELOADER_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="page-shell">
      {isLoading && (
        <div className="preloader" role="status" aria-label="Loading TSPL website">
          <div className="preloader-layer preloader-layer--orange" aria-hidden="true" />
          <div className="preloader-layer preloader-layer--blue" aria-hidden="true" />
          <div className="preloader-layer preloader-layer--white">
            <img
              src="/TSPL Logo preloader.png"
              alt="TSPL logo"
              className="preloader-logo"
            />
          </div>
        </div>
      )}

      <main className={`home ${isLoading ? 'home--hidden' : ''}`}>
        <HomePage animateWords={!isLoading} />
      </main>
    </div>
  )
}

export default App
