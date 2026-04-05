const audioElement = document.getElementById('audio');
const songTitleElement = document.getElementById('songTitle');
const fileInput = document.getElementById('file-input');

let songs = [];
let currentSongIndex = 0;
let currentObjectURL = null; // Guardamos la URL actual para liberarla después

fileInput.addEventListener('change', (e) => {
  // Convertimos la lista de archivos en un array
  songs = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
  
  if (songs.length > 0) {
    currentSongIndex = 0;
    loadSong(currentSongIndex);
  }
});

function loadSong(index) {
  if (songs.length === 0) return;
  
  // 1. Limpieza de memoria: Liberamos la URL anterior si existe
  if (currentObjectURL) {
    URL.revokeObjectURL(currentObjectURL);
  }
  
  const song = songs[index];
  
  // 2. Crear nueva URL para el archivo seleccionado
  currentObjectURL = URL.createObjectURL(song);
  
  audioElement.src = currentObjectURL;
  songTitleElement.textContent = song.name.replace(/\.[^/.]+$/, ""); 
  
  // Intentar reproducir automáticamente
  audioElement.play().catch(error => {
    console.log("La reproducción automática fue bloqueada por el navegador hasta que interactúes con la página.");
  });
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

// 3. ¡Magia! Pasar a la siguiente canción automáticamente al terminar
audioElement.addEventListener('ended', () => {
  nextTrack();
});