import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import './App.css'

function App() {
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  })

  return (
    <div className="app">
      <div className="app-container">
        <Sidebar />
        <MainContent setCurrentTrack={setCurrentTrack} />
      </div>
      <Player currentTrack={currentTrack} />
    </div>
  )
}

export default App
