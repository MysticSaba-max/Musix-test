import React, { useState, useEffect } from 'react'
import { Play, Clock, Heart } from 'lucide-react'
import { getRecentlyPlayed, getLikedSongs, isTrackLiked, toggleLikedSong } from '../utils/localStorage'
import './MainContent.css'

const MainContent = ({ setCurrentTrack, currentView, selectedPlaylist, onRefresh }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [likedSongs, setLikedSongs] = useState([])

  useEffect(() => {
    loadData()
  }, [onRefresh])

  const loadData = () => {
    setRecentlyPlayed(getRecentlyPlayed())
    setLikedSongs(getLikedSongs())
  }

  const playlists = [
    {
      id: 1,
      title: 'Today\'s Top Hits',
      description: 'Ed Sheeran is on top of the Hottest 50!',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'RapCaviar',
      description: 'New music from Lil Baby, Juice WRLD and more',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'All Out 2010s',
      description: 'The biggest songs of the 2010s',
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Rock Classics',
      description: 'Rock legends & epic songs',
      coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
    },
    {
      id: 5,
      title: 'Chill Hits',
      description: 'Kick back to the best new and recent chill hits',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    },
    {
      id: 6,
      title: 'Viva Latino',
      description: 'Today\'s top Latin hits',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    },
  ]

  const sampleTracks = [
    {
      id: 't1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: '5:55',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    },
    {
      id: 't2',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      duration: '8:02',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    },
    {
      id: 't3',
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      duration: '6:30',
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    },
    {
      id: 't4',
      title: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      duration: '3:03',
      coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=100&h=100&fit=crop',
    },
    {
      id: 't5',
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      album: 'Nevermind',
      duration: '5:01',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    },
  ]

  const handlePlayTrack = (track) => {
    setCurrentTrack(track)
  }

  const handleToggleLike = (track) => {
    toggleLikedSong(track)
    loadData()
  }

  const renderTrackList = (tracks, title) => {
    if (!tracks || tracks.length === 0) {
      return (
        <div className="empty-state">
          <p>Aucun titre pour le moment</p>
        </div>
      )
    }

    return (
      <div className="track-list">
        <div className="track-list-header">
          <div className="track-number">#</div>
          <div className="track-title">Titre</div>
          <div className="track-album">Album</div>
          <div className="track-duration">
            <Clock size={16} />
          </div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="track-row"
          >
            <div className="track-number">
              <span className="number">{index + 1}</span>
              <button className="play-icon" onClick={() => handlePlayTrack(track)}>
                <Play size={16} fill="currentColor" />
              </button>
            </div>
            <div className="track-title">
              <img src={track.coverUrl} alt={track.title} />
              <div className="track-info">
                <div className="track-name">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
            </div>
            <div className="track-album">{track.album}</div>
            <div className="track-duration">
              <button
                className={`track-like-btn ${isTrackLiked(track.id) ? 'liked' : ''}`}
                onClick={() => handleToggleLike(track)}
              >
                <Heart size={16} fill={isTrackLiked(track.id) ? 'currentColor' : 'none'} />
              </button>
              <span>{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderHome = () => (
    <>
      <section className="content-section">
        <h1 className="greeting">Bonjour</h1>

        <div className="quick-picks">
          {playlists.slice(0, 4).map((playlist) => (
            <div key={playlist.id} className="quick-pick-item">
              <img src={playlist.coverUrl} alt={playlist.title} />
              <span>{playlist.title}</span>
              <button className="play-btn-small">
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h2>Playlists populaires</h2>
          <button className="see-all">Tout afficher</button>
        </div>

        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-card-image">
                <img src={playlist.coverUrl} alt={playlist.title} />
                <button className="play-btn">
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {recentlyPlayed.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2>Récemment écoutées</h2>
          </div>
          {renderTrackList(recentlyPlayed.slice(0, 10))}
        </section>
      )}

      {recentlyPlayed.length === 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2>Exemples de titres</h2>
          </div>
          {renderTrackList(sampleTracks)}
        </section>
      )}
    </>
  )

  const renderLikedSongs = () => (
    <section className="content-section">
      <div className="playlist-header liked-header">
        <div className="playlist-cover liked-cover">
          <Heart size={48} fill="currentColor" />
        </div>
        <div className="playlist-details">
          <p className="playlist-type">PLAYLIST</p>
          <h1 className="playlist-name">Titres likés</h1>
          <p className="playlist-info">{likedSongs.length} titre{likedSongs.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      {renderTrackList(likedSongs, 'Titres likés')}
    </section>
  )

  const renderPlaylist = () => {
    if (!selectedPlaylist) return renderHome()

    const playlistTracks = selectedPlaylist.tracks || []

    return (
      <section className="content-section">
        <div className="playlist-header">
          <div className="playlist-cover default-cover">
            <span className="playlist-icon">♫</span>
          </div>
          <div className="playlist-details">
            <p className="playlist-type">PLAYLIST</p>
            <h1 className="playlist-name">{selectedPlaylist.name}</h1>
            {selectedPlaylist.description && (
              <p className="playlist-description">{selectedPlaylist.description}</p>
            )}
            <p className="playlist-info">{playlistTracks.length} titre{playlistTracks.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {renderTrackList(playlistTracks.length > 0 ? playlistTracks : sampleTracks)}
      </section>
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case 'liked':
        return renderLikedSongs()
      case 'playlist':
        return renderPlaylist()
      case 'search':
        return (
          <div className="empty-state">
            <h2>Recherche</h2>
            <p>Fonctionnalité de recherche à venir...</p>
          </div>
        )
      case 'library':
        return (
          <div className="empty-state">
            <h2>Ma bibliothèque</h2>
            <p>Fonctionnalité de bibliothèque à venir...</p>
          </div>
        )
      default:
        return renderHome()
    }
  }

  return (
    <div className="main-content">
      <div className="main-header">
        <div className="header-buttons">
          <button className="header-btn">❮</button>
          <button className="header-btn">❯</button>
        </div>
        <div className="user-menu">
          <button className="upgrade-btn">Passer à Premium</button>
          <button className="user-btn">
            <div className="user-avatar">U</div>
            <span>Utilisateur</span>
          </button>
        </div>
      </div>

      <div className="main-scroll">
        {renderContent()}
      </div>
    </div>
  )
}

export default MainContent
