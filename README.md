# Spotify Clone - Frontend

Un clone du frontend de Spotify créé avec React et Vite.

![Spotify Clone](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.5-yellow)

## Aperçu

Ce projet est une reproduction fidèle de l'interface utilisateur de Spotify, incluant :

- **Sidebar** avec navigation et liste de playlists
- **Page principale** avec playlists populaires et titres récemment écoutés
- **Lecteur audio** en bas de page avec tous les contrôles (lecture, pause, volume, etc.)
- **Design responsive** qui s'adapte aux différentes tailles d'écran
- **Animations et interactions** similaires à Spotify

## Fonctionnalités

### Navigation
- Accueil
- Recherche
- Ma bibliothèque
- Créer une playlist
- Titres likés

### Contenu principal
- Playlists populaires avec cartes interactives
- Liste des titres récemment écoutés
- Effets de survol et animations
- Boutons de lecture sur les playlists

### Lecteur audio
- Contrôles de lecture (lecture/pause, suivant, précédent)
- Barre de progression
- Contrôle du volume
- Mode shuffle
- Mode repeat (désactivé, tous, un titre)
- Bouton like pour les titres

## Technologies utilisées

- **React 18.2** - Bibliothèque UI
- **Vite 4.4** - Build tool et dev server
- **Lucide React** - Icônes modernes
- **CSS personnalisé** - Styling avec variables CSS

## Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. Clonez le repository :
```bash
git clone https://github.com/MysticSaba-max/Musix-test.git
cd Musix-test
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production dans le dossier `dist`
- `npm run preview` - Prévisualise la version de production

## Structure du projet

```
Musix-test/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── MainContent.jsx
│   │   ├── MainContent.css
│   │   ├── Player.jsx
│   │   └── Player.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Composants principaux

### Sidebar
Barre latérale gauche contenant :
- Logo Spotify
- Navigation principale
- Actions (créer playlist, titres likés)
- Liste des playlists

### MainContent
Zone de contenu principale avec :
- En-tête avec navigation et profil utilisateur
- Section de bienvenue
- Playlists populaires en grille
- Liste des titres récemment écoutés

### Player
Lecteur audio en bas de page avec :
- Informations du titre en cours
- Contrôles de lecture
- Barre de progression
- Contrôles de volume

## Personnalisation

Les couleurs et styles peuvent être modifiés dans `src/index.css` :

```css
:root {
  --spotify-green: #1db954;
  --spotify-black: #000000;
  --spotify-dark: #121212;
  --spotify-gray: #181818;
  --spotify-light-gray: #282828;
  --spotify-white: #ffffff;
  --spotify-text-gray: #b3b3b3;
}
```

## Améliorations futures

- [ ] Intégration avec l'API Spotify
- [ ] Système d'authentification
- [ ] Lecture audio réelle
- [ ] Page de recherche fonctionnelle
- [ ] Page de playlist détaillée
- [ ] Gestion des favoris persistante
- [ ] Support des thèmes (clair/sombre)

## License

Ce projet est uniquement à des fins éducatives. Spotify et son logo sont des marques déposées de Spotify AB.

## Auteur

Créé avec ❤️ pour apprendre React et reproduire des interfaces complexes.
