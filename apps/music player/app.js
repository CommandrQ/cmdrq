let player;
let stationsData = [];
const defaultPlaylist = 'PLwX0pb3GEremC1vfOY7jLfNqdfR2cTVi7'; 

const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    playerVars: {
      'listType': 'playlist',
      'list': defaultPlaylist,
      'autoplay': 0, 
      'controls': 1, 
      'modestbranding': 1,
      'rel': 0,
      'playsinline': 1 // CRITICAL: Fixes mobile video blocking
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  fetchData();
  setupMediaControls();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
  } else {
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  }
}

function fetchData() {
  const stationSelect = document.getElementById('station-select');

  fetch('data/stations.json')
    .then(response => response.json())
    .then(data => {
      stationsData = data.stations;

      stationsData.forEach((station, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = station.name;
        stationSelect.appendChild(option);
      });

      stationSelect.addEventListener('change', (e) => {
        renderPlaylists(e.target.value);
      });
    })
    .catch(error => console.error("Error loading stations:", error));
}

function renderPlaylists(stationIndex) {
  const container = document.getElementById('playlist-container');
  container.innerHTML = ''; 

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
      document.querySelectorAll('.playlist-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
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

function setupMediaControls() {
  playBtn.addEventListener('click', () => player.playVideo());
  pauseBtn.addEventListener('click', () => player.pauseVideo());
  document.getElementById('next-btn').addEventListener('click', () => player.nextVideo());
  document.getElementById('prev-btn').addEventListener('click', () => player.previousVideo());
}
