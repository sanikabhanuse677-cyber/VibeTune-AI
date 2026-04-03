// ===== DISPLAY SONGS =====
function displaySongs(songs) {
  const container = document.getElementById("songsContainer");
  if (!container) return;

  container.innerHTML = "";

  songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <div class="card-top">
        <h2>${song.song}</h2>
        <span class="fav-icon"
          onclick="event.stopPropagation(); addToFav('${song.song}')">
          ❤️
        </span>
      </div>

      <div class="card-center">
        <p class="artist">${song.artist}</p>
        <button class="play-btn"
          onclick="playPreview('${song.preview}')">
          ▶
        </button>
      </div>

      <div class="card-bottom">
        <span>${song.movie}</span>
        <span>${song.year}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function playPreview(url) {
  const player = document.getElementById("audioPlayer");
  if (!player || !url) return;

  player.src = url;

  player.play().catch(err => {
    console.warn("Playback blocked:", err);
    alert("Click again to play 🎧");
  });

  // smooth scroll to player
  player.scrollIntoView({ behavior: "smooth" });
}