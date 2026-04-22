// Global variable for the YouTube player instance
let player;
let stationsData = [];
const defaultPlaylist = 'PLwX0pb3GEremC1vfOY7jLfNqdfR2cTVi7'; // First one in JSON

// Elements
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

// 1. THIS FN IS AUTO-CALLED BY YOUTUBE API SCRIPT
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    // Initialize with a playlist to hide the default "related videos" 
    playerVars: {
      'listType': 'playlist',
      'list': defaultPlaylist,
      'autoplay': 0, // Don't autoplay on load
      'controls': 1, // Show YT controls inside iframe (needed for scrubbing)
      'modestbranding': 1,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 2. When player is ready, load app data
function onPlayerReady(event) {
  fetchData();
  setupMediaControls();
}

// 3. Sync custom buttons with YouTube actual state
function onPlayerStateChange(event) {
  // YT.PlayerState.PLAYING = 1, PAUSED = 2
  if (event.data == YT.PlayerState.PLAYING) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
  } else {
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  }
}

// 4. Fetch the JSON and setup UI
function fetchData() {
  const stationSelect = document.getElementById('station-select');

  fetch('data/stations.json')
    .then(response => response.json())
    .then(data => {
      stationsData = data.stations;

      // Populate Dropdown
      stationsData.forEach((station, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = station.name;
        stationSelect.appendChild(option);
      });

      // Handle selection change
      stationSelect.addEventListener('change', (e) => {
        renderPlaylists(e.target.value);
      });
    })
    .catch(error => console.error("Error loading stations:", error));
}

// 5. Render playlists for selected station
function renderPlaylists(stationIndex) {
  const container = document.getElementById('playlist-container');
  container.innerHTML = ''; // Clear

  const playlists = stationsData[stationIndex].playlists;

  if (playlists.length === 0) {
    container.innerHTML = '<div class="empty-state">No playlists found.</div>';
    return;
  }

  playlists.forEach((playlist) => {
    const btn = document.createElement('button');
    btn.className = 'playlist-btn';
    btn.innerHTML = `<div>${playlist.title}</div>`;
    
    btn.addEventListener('click', () => {
      // Highlight active
      document.querySelectorAll('.playlist-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Tell YT Player to load this playlist
      player.loadPlaylist({
        list: playlist.id,
        listType: 'playlist',
        index: 0,
        startSeconds: 0,
        suggestedQuality: 'default'
      });
    });

    container.appendChild(btn);
  });
}

// 6. Connect HTML buttons to API Commands
function setupMediaControls() {
  playBtn.addEventListener('click', () => player.playVideo());
  pauseBtn.addEventListener('click', () => player.pauseVideo());
  document.getElementById('next-btn').addEventListener('click', () => player.nextVideo());
  document.getElementById('prev-btn').addEventListener('click', () => player.previousVideo());
}
