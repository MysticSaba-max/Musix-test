// LocalStorage utility functions for Spotify Clone

const STORAGE_KEYS = {
  PLAYLISTS: 'spotify_playlists',
  LIKED_SONGS: 'spotify_liked_songs',
  RECENTLY_PLAYED: 'spotify_recently_played',
}

// Playlists
export const getPlaylists = () => {
  try {
    const playlists = localStorage.getItem(STORAGE_KEYS.PLAYLISTS)
    return playlists ? JSON.parse(playlists) : []
  } catch (error) {
    console.error('Error reading playlists from localStorage:', error)
    return []
  }
}

export const savePlaylists = (playlists) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists))
    return true
  } catch (error) {
    console.error('Error saving playlists to localStorage:', error)
    return false
  }
}

export const createPlaylist = (name, description = '') => {
  const playlists = getPlaylists()
  const newPlaylist = {
    id: Date.now().toString(),
    name,
    description,
    tracks: [],
    createdAt: new Date().toISOString(),
  }
  playlists.push(newPlaylist)
  savePlaylists(playlists)
  return newPlaylist
}

export const deletePlaylist = (playlistId) => {
  const playlists = getPlaylists()
  const updatedPlaylists = playlists.filter(p => p.id !== playlistId)
  savePlaylists(updatedPlaylists)
  return true
}

export const addTrackToPlaylist = (playlistId, track) => {
  const playlists = getPlaylists()
  const playlist = playlists.find(p => p.id === playlistId)
  if (playlist) {
    // Check if track already exists in playlist
    const trackExists = playlist.tracks.some(t => t.id === track.id)
    if (!trackExists) {
      playlist.tracks.push(track)
      savePlaylists(playlists)
      return true
    }
  }
  return false
}

export const removeTrackFromPlaylist = (playlistId, trackId) => {
  const playlists = getPlaylists()
  const playlist = playlists.find(p => p.id === playlistId)
  if (playlist) {
    playlist.tracks = playlist.tracks.filter(t => t.id !== trackId)
    savePlaylists(playlists)
    return true
  }
  return false
}

// Liked Songs
export const getLikedSongs = () => {
  try {
    const likedSongs = localStorage.getItem(STORAGE_KEYS.LIKED_SONGS)
    return likedSongs ? JSON.parse(likedSongs) : []
  } catch (error) {
    console.error('Error reading liked songs from localStorage:', error)
    return []
  }
}

export const saveLikedSongs = (songs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(songs))
    return true
  } catch (error) {
    console.error('Error saving liked songs to localStorage:', error)
    return false
  }
}

export const toggleLikedSong = (track) => {
  const likedSongs = getLikedSongs()
  const index = likedSongs.findIndex(s => s.id === track.id)

  if (index !== -1) {
    // Song is already liked, remove it
    likedSongs.splice(index, 1)
    saveLikedSongs(likedSongs)
    return false
  } else {
    // Song is not liked, add it
    likedSongs.push(track)
    saveLikedSongs(likedSongs)
    return true
  }
}

export const isTrackLiked = (trackId) => {
  const likedSongs = getLikedSongs()
  return likedSongs.some(s => s.id === trackId)
}

// Recently Played
export const getRecentlyPlayed = () => {
  try {
    const recentlyPlayed = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED)
    return recentlyPlayed ? JSON.parse(recentlyPlayed) : []
  } catch (error) {
    console.error('Error reading recently played from localStorage:', error)
    return []
  }
}

export const addToRecentlyPlayed = (track) => {
  try {
    let recentlyPlayed = getRecentlyPlayed()

    // Remove if already exists
    recentlyPlayed = recentlyPlayed.filter(t => t.id !== track.id)

    // Add to beginning
    recentlyPlayed.unshift(track)

    // Keep only last 50 tracks
    if (recentlyPlayed.length > 50) {
      recentlyPlayed = recentlyPlayed.slice(0, 50)
    }

    localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(recentlyPlayed))
    return true
  } catch (error) {
    console.error('Error adding to recently played:', error)
    return false
  }
}

// Initialize default data if needed
export const initializeDefaultData = () => {
  const playlists = getPlaylists()
  if (playlists.length === 0) {
    // Create some default playlists
    const defaultPlaylists = [
      {
        id: '1',
        name: 'Ma playlist #1',
        description: 'Ma première playlist',
        tracks: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Favoris',
        description: 'Mes titres favoris',
        tracks: [],
        createdAt: new Date().toISOString(),
      },
    ]
    savePlaylists(defaultPlaylists)
  }
}
