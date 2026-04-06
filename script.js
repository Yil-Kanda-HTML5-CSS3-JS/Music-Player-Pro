const audioElement = document.getElementById('audio');
const songTitleElement = document.getElementById('songTitle');
const artistNameElement = document.getElementById('artistName');
const fileInput = document.getElementById('file-input');
const playPauseBtn = document.getElementById('playPauseBtn');
const playlistContainer = document.getElementById('playlist');

let songs = [];
let currentSongIndex = 0;
let currentObjectURL = null;

fileInput.addEventListener('change', (e) => {
  songs = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
  if (songs.length > 0) {
    renderPlaylist();
    loadSong(0);
  }
});

function renderPlaylist() {
  playlistContainer.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    if (index === currentSongIndex) item.classList.add('active');
    
    item.innerHTML = `<span>${index + 1}. ${song.name.substring(0, 30)}...</span>`;
    item.onclick = () => loadSong(index);
    playlistContainer.appendChild(item);
  });
}

function loadSong(index) {
  if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
  
  currentSongIndex = index;
  const song = songs[index];
  currentObjectURL = URL.createObjectURL(song);
  
  audioElement.src = currentObjectURL;
  songTitleElement.textContent = song.name.replace(/\.[^/.]+$/, "");
  artistNameElement.textContent = "Archivo Local";
  
  renderPlaylist(); // Actualizar color en la lista
  togglePlay(true);
}

function togglePlay(forcePlay = false) {
  if (audioElement.paused || forcePlay) {
    audioElement.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audioElement.pause();
    playPauseBtn.textContent = '▶';
  }
}

function nextTrack() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

function prevTrack() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

audioElement.addEventListener('ended', nextTrack);