document.addEventListener("DOMContentLoaded", () => {
  const stationSelect = document.getElementById('station-select');
  const playlistContainer = document.getElementById('playlist-container');
  const ytPlayer = document.getElementById('yt-player');
  
  let stationsData = [];

  // Fetch the JSON file
  fetch('data/stations.json')
    .then(response => response.json())
    .then(data => {
      stationsData = data.stations;
      initializePlayer();
    })
    .catch(error => console.error("Error loading stations:", error));

  function initializePlayer() {
    // 1. Populate the Station Dropdown
    stationsData.forEach((station, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = station.name;
      stationSelect.appendChild(option);
    });

    // 2. Load playlists for the first station by default
    renderPlaylists(0);

    // 3. Listen for Station changes
    stationSelect.addEventListener('change', (e) => {
      renderPlaylists(e.target.value);
    });
  }

  function renderPlaylists(stationIndex) {
    // Clear current list
    playlistContainer.innerHTML = '';
    const playlists = stationsData[stationIndex].playlists;

    playlists.forEach((playlist) => {
      const btn = document.createElement('button');
      btn.className = 'playlist-btn';
      btn.textContent = playlist.title;
      
      btn.addEventListener('click', () => {
        // Highlight active button
        document.querySelectorAll('.playlist-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Load YouTube Playlist into iframe
        // videoseries?list= allows playing a whole playlist
        ytPlayer.src = `https://www.youtube.com/embed/videoseries?list=${playlist.id}&autoplay=1`;
      });

      playlistContainer.appendChild(btn);
    });
  }
});
