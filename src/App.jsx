import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import BouquetBuilder from './pages/BouquetBuilder'
import PreviewScreen from './pages/PreviewScreen'
import SharedBouquetPage from './pages/SharedBouquetPage'
import { getBouquetFromUrl } from './utils/urlEncoding'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [bouquetData, setBouquetData] = useState(null)
  const [sharedBouquet, setSharedBouquet] = useState(null)

  useEffect(() => {
    // Check if there's a bouquet in the URL
    const urlBouquet = getBouquetFromUrl()
    if (urlBouquet) {
      setSharedBouquet(urlBouquet)
      setCurrentPage('shared')
    }
  }, [])

  const handleCreateBouquet = () => {
    setCurrentPage('builder')
  }

  const handleBouquetComplete = (data) => {
    setBouquetData(data)
    setCurrentPage('preview')
  }

  const handleBackToBuilder = () => {
    setCurrentPage('builder')
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
    setBouquetData(null)
    // Clear URL
    window.history.pushState({}, '', '/')
  }

  return (
    <div className="bg-cream min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage onCreateBouquet={handleCreateBouquet} />
      )}
      {currentPage === 'builder' && (
        <BouquetBuilder onComplete={handleBouquetComplete} />
      )}
      {currentPage === 'preview' && bouquetData && (
        <PreviewScreen
          bouquetData={bouquetData}
          onBack={handleBackToBuilder}
          onShare={handleBackToHome}
        />
      )}
      {currentPage === 'shared' && sharedBouquet && (
        <SharedBouquetPage bouquetData={sharedBouquet} />
      )}
    </div>
  )
}

export default App
