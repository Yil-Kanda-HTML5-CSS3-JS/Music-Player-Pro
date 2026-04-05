const audioElement = document.getElementById('audio');
const songTitleElement = document.getElementById('songTitle');
const fileInput = document.getElementById('file-input');
const playlistElement = document.getElementById('playlist');

let songs = [];
let currentSongIndex = 0;
let currentObjectURL = null;

fileInput.addEventListener('change', (e) => {
  songs = Array.from(e.target.files).filter(file => file.type.startsWith('audio/'));
  
  if (songs.length > 0) {
    updatePlaylistUI();
    currentSongIndex = 0;
    loadSong(currentSongIndex);
  }
});

function updatePlaylistUI() {
    playlistElement.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${song.name.replace(/\.[^/.]+$/, "")}`;
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        };
        if (index === currentSongIndex) li.classList.add('active');
        playlistElement.appendChild(li);
    });
}

function loadSong(index) {
  if (songs.length === 0) return;
  
  if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
  
  const song = songs[index];
  currentObjectURL = URL.createObjectURL(song);
  
  audioElement.src = currentObjectURL;
  songTitleElement.textContent = song.name.replace(/\.[^/.]+$/, ""); 
  
  // Actualizar visual de la lista
  updatePlaylistUI();

  audioElement.play().catch(e => console.log("Play bloqueado"));
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