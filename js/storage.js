// ===== GET FAVS =====
function getFavs() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}

// ===== SAVE FAVS =====
function saveFavs(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

// ===== SHOW FAVS =====
function showFavs() {
  const favList = document.getElementById("favList");
  if (!favList) return;

  const favs = getFavs();
  const songs = getSongsData();

  favList.innerHTML = "";

  // 🔥 map favourite names to full song objects
  const favSongs = songs.filter(song => favs.includes(song.song));

  if (favSongs.length === 0) {
    favList.innerHTML = "<p>No favourites yet 🎧</p>";
    return;
  }

  favSongs.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <div class="card-top">
        <h3>${song.song}</h3>
        <span class="fav-icon"
          onclick="removeFav('${song.song}')">❌</span>
      </div>

      <div class="card-center">
        <p class="artist">${song.artist}</p>
        <button class="play-btn" onclick="playSong('${song.preview}')">▶</button>
      </div>
    `;

    favList.appendChild(card);
  });
}

// ===== REMOVE FAV =====
function removeFav(songName) {
  let favs = getFavs();

  favs = favs.filter(s => s !== songName);
  saveFavs(favs);

  showFavs();

  showToast("❌ Removed from favourites");
}