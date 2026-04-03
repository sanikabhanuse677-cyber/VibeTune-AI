// ===== SAFE DATA ACCESS =====
function getSongsData() {
  if (!window.songsData) {
    console.error("songsData not loaded!");
    alert("⚠️ Songs data not loaded. Check data.js");
    return [];
  }
  return window.songsData;
}

// ===== SEARCH FUNCTION =====
function searchSongs() {
  const mood = document.getElementById("mood")?.value.trim().toLowerCase();
  const era = document.getElementById("era")?.value.trim().toLowerCase();

  const songs = getSongsData();

  let results = songs.filter(song => {
    const songMood = (song.mood || []).map(m => m.toLowerCase());
    const songEra = (song.era || "").toLowerCase();

    return (
      (!mood || songMood.includes(mood)) &&
      (!era || songEra === era)
    );
  });

  if (results.length === 0) {
    console.warn("No match → showing all songs");
    results = songs;
  }

  displaySongs(results);
}

// ===== PLAY SONG =====
function playSong(src) {
  const player = document.getElementById("audioPlayer");
  if (!player || !src) return;

  player.src = src;

  player.play().catch(err => {
    console.warn("Playback blocked:", err);
    alert("Click again to play (browser blocked autoplay)");
  });

  player.scrollIntoView({ behavior: "smooth" });
}

// ===== FAVORITES =====
function addToFav(songName) {
  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  if (!favs.includes(songName)) {
    favs.push(songName);
    localStorage.setItem("favs", JSON.stringify(favs));

    alert("❤️ Song added to favourites!");
  } else {
    alert("⚠️ Already in favourites");
  }
}

// ===== SHOW FAVORITES =====
function showFavs() {
  const favList = document.getElementById("favList");
  if (!favList) return;

  const songs = getSongsData();
  const favs = JSON.parse(localStorage.getItem("favs")) || [];

  favList.innerHTML = "";

  favs.forEach(name => {
    const song = songs.find(s => s.song === name);
    if (!song) return;

    const item = document.createElement("div");
    item.className = "song-card";

    item.innerHTML = `
      <h3>${song.song}</h3>
      <p>${song.artist}</p>
      <button onclick="playSong('${song.preview}')">▶</button>
      <button onclick="removeFav('${song.song}')">❌</button>
    `;

    favList.appendChild(item);
  });
}

// ===== REMOVE FAVORITE =====
function removeFav(songName) {
  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  favs = favs.filter(s => s !== songName);
  localStorage.setItem("favs", JSON.stringify(favs));

  showFavs();
}

// ===== TOGGLE FAVORITES PANEL =====
function toggleFav() {
  const panel = document.getElementById("favPanel");
  if (!panel) return;

  panel.classList.toggle("active");
  showFavs();
}

// ===== CLEAR SONGS =====
function clearSongs() {
  const container = document.getElementById("songsContainer");
  if (container) container.innerHTML = "";
}

// ===== BACKGROUND ANIMATION =====
window.addEventListener("load", () => {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    speedX: Math.random() - 0.5,
    speedY: Math.random() - 0.5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,255,0.7)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 800); // smooth delay
});
