import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import './App.css'

function App() {
  const [currentTrack, setCurrentTrack] = useState({
    id: 't1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  })
  const [currentView, setCurrentView] = useState('home')
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleNavigate = (view) => {
    setCurrentView(view)
    if (view !== 'playlist') {
      setSelectedPlaylist(null)
    }
  }

  const handlePlaylistSelect = (playlist) => {
    setCurrentView('playlist')
    setSelectedPlaylist(playlist)
  }

  const handleLikedSongsClick = () => {
    setCurrentView('liked')
    setSelectedPlaylist(null)
  }

  const handleLikedChange = () => {
    // Trigger refresh of components
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <div className="app-container">
        <Sidebar
          onNavigate={handleNavigate}
          onPlaylistSelect={handlePlaylistSelect}
          onLikedSongsClick={handleLikedSongsClick}
        />
        <MainContent
          setCurrentTrack={setCurrentTrack}
          currentView={currentView}
          selectedPlaylist={selectedPlaylist}
          onRefresh={refreshTrigger}
        />
      </div>
      <Player
        currentTrack={currentTrack}
        onLikedChange={handleLikedChange}
      />
    </div>
  )
}

export default App
