import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HeartProvider } from './contexts/HeartContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import SparklesCursor from './components/SparklesCursor'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import FeelingGallery from './pages/FeelingGallery'
import FeelingDetail from './pages/FeelingDetail'
import LetterGallery from './pages/LetterGallery'
import LetterDetail from './pages/LetterDetail'
import MemoryGallery from './pages/MemoryGallery'
import MemoryDetail from './pages/MemoryDetail'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load / wait for fonts and resources
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // Show loading screen for at least 1.2 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <HeartProvider>
        <LoadingScreen isLoading={isLoading} />
        <SparklesCursor />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="feeling" element={<FeelingGallery />} />
            <Route path="feeling/:emotion" element={<FeelingDetail />} />
            <Route path="letter" element={<LetterGallery />} />
            <Route path="letter/:letterId" element={<LetterDetail />} />
            <Route path="memory" element={<MemoryGallery />} />
            <Route path="memory/:memoryId" element={<MemoryDetail />} />
          </Route>
        </Routes>
      </HeartProvider>
    </ThemeProvider>
  )
}

export default App

