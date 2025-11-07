import React, { useState } from 'react'
import { X } from 'lucide-react'
import './CreatePlaylistModal.css'

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onCreate(name.trim(), description.trim())
      setName('')
      setDescription('')
      onClose()
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Créer une playlist</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="playlist-name">Nom de la playlist</label>
            <input
              type="text"
              id="playlist-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ma playlist"
              autoFocus
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="playlist-description">Description (optionnel)</label>
            <textarea
              id="playlist-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajouter une description..."
              maxLength={300}
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-create" disabled={!name.trim()}>
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal
