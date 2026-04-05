# Music Player Pro 🎵

A lightweight, modern, and responsive web-based music player that allows users to upload and play local audio files directly in the browser.

## 🚀 Features

* **Local File Support:** Upload multiple audio files simultaneously from your device.
* **Smart Playlist:** Navigate through your uploaded tracks using "Previous" and "Next" controls.
* **Auto-play Logic:** Automatically transitions to the next track when the current one finishes.
* **Modern UI:** Clean, minimalist design built with CSS variables and the Inter font.
* **Memory Efficient:** Uses `URL.revokeObjectURL` to ensure stable performance and prevent memory leaks.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure and native Audio API.
* **CSS3:** Custom properties (variables), Flexbox, and modern UI styling.
* **JavaScript (ES6+):** Dynamic file handling and DOM manipulation.
* **Google Fonts:** "Inter" for a clean typography.

## 📂 Project Structure

```text
├── index.html   # Main application structure
├── styles.css   # Visual styling and responsiveness
└── script.js    # Playback logic and file management

```

## ⚙️ How to Use

1.  **Clone or Download** the repository to your local machine.
    
2.  Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
    
3.  Click the **"Subir Música"** button to select audio files from your computer.
    
4.  Use the player controls to play, pause, or skip between tracks.
    

## 📝 Technical Note

This player uses the **Web File API**. To comply with modern browser security policies, auto-play will trigger once the user has interacted with the page (e.g., after selecting the files).

----------

Developed with ❤️ for the web.
