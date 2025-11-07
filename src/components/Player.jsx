import React, { useState, useEffect } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Maximize2,
  Heart
} from 'lucide-react'
import { toggleLikedSong, isTrackLiked, addToRecentlyPlayed } from '../utils/localStorage'
import './Player.css'

const Player = ({ currentTrack, onLikedChange }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(245) // 4:05 in seconds
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0) // 0: off, 1: all, 2: one

  // Check if current track is liked when track changes
  useEffect(() => {
    if (currentTrack && currentTrack.id) {
      setIsLiked(isTrackLiked(currentTrack.id))
    }
  }, [currentTrack])

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prevTime + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying
    setIsPlaying(newPlayingState)

    // Add to recently played when starting playback
    if (newPlayingState && currentTrack && currentTrack.id) {
      addToRecentlyPlayed(currentTrack)
    }
  }

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleLike = () => {
    if (currentTrack && currentTrack.id) {
      const newLikedState = toggleLikedSong(currentTrack)
      setIsLiked(newLikedState)

      // Notify parent component about the change
      if (onLikedChange) {
        onLikedChange()
      }
    }
  }

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled)
  }

  const cycleRepeat = () => {
    setRepeatMode((repeatMode + 1) % 3)
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="player">
      <div className="player-left">
        <img src={currentTrack.coverUrl} alt={currentTrack.title} />
        <div className="track-info">
          <div className="track-title">{currentTrack.title}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={toggleLike}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button
            className={`control-btn ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
          >
            <Shuffle size={16} />
          </button>
          <button className="control-btn">
            <SkipBack size={20} />
          </button>
          <button className="play-pause-btn" onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
          <button className="control-btn">
            <SkipForward size={20} />
          </button>
          <button
            className={`control-btn ${repeatMode > 0 ? 'active' : ''}`}
            onClick={cycleRepeat}
          >
            <Repeat size={16} />
            {repeatMode === 2 && <span className="repeat-one">1</span>}
          </button>
        </div>

        <div className="progress-bar-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="progress-bar">
            <div className="progress-background">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="progress-slider"
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="volume-btn" onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX size={16} />
          ) : (
            <Volume2 size={16} />
          )}
        </button>
        <div className="volume-slider-container">
          <div className="volume-bar">
            <div
              className="volume-fill"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <button className="control-btn">
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default Player
