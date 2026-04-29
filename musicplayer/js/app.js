// Global State Variables
let player;
let isPlaying = false;

// =========================================================
// PHASE 1: DATALINK & HUD GENERATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the raw data from our JSON file
    fetch('playlists.json')
        .then(response => {
            if (!response.ok) throw new Error("Datalink offline: Cannot load playlists.json");
            return response.json();
        })
        .then(data => {
            buildTacticalHUD(data.stations);
        })
        .catch(error => console.error("System Error:", error));
});

function buildTacticalHUD(stations) {
    const sliderContainer = document.getElementById('station-slider-container');
    const playlistContainer = document.getElementById('playlist-master-container');
    
    stations.forEach((station, index) => {
        // 1. Build Station Buttons
        const isActiveStation = index === 0 ? 'active' : '';
        const stationBtn = document.createElement('button');
        stationBtn.className = `station-btn ${isActiveStation}`;
        stationBtn.setAttribute('data-target', station.id);
        stationBtn.innerText = station.name;
        sliderContainer.appendChild(stationBtn);

        // 2. Build Playlist Groups
        const isActiveGroup = index === 0 ? 'active-group' : '';
        const groupDiv = document.createElement('div');
        groupDiv.id = station.id;
        groupDiv.className = `playlist-group ${isActiveGroup}`;

        // 3. Build Playlist Buttons
        station.playlists.forEach(playlist => {
            const playlistBtn = document.createElement('button');
            playlistBtn.className = 'playlist-btn';
            playlistBtn.setAttribute('data-playlist', playlist.id);
            playlistBtn.innerText = playlist.title;
            groupDiv.appendChild(playlistBtn);
        });

        playlistContainer.appendChild(groupDiv);
    });

    // Initialize physical actions once structure is built
    initializeHUDControls();
}

// =========================================================
// PHASE 2: PHYSICAL ACTION & EVENT BINDING
// =========================================================
function initializeHUDControls() {
    const stationBtns = document.querySelectorAll('.station-btn');
    const playlistGroups = document.querySelectorAll('.playlist-group');
    const playlistBtns = document.querySelectorAll('.playlist-btn');

    // Station Switching Logic
    stationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            stationBtns.forEach(b => b.classList.remove('active'));
            playlistGroups.forEach(g => g.classList.remove('active-group'));

            e.target.classList.add('active');
            const targetId = e.target.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-group');
        });
    });

    // Playlist Loading & Auto-Play Logic
    playlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const playlistId = e.target.getAttribute('data-playlist');
            
            if (player && typeof player.loadPlaylist === 'function') {
                player.loadPlaylist({
                    listType: 'playlist',
                    list: playlistId,
                    index: 0,
                    startSeconds: 0
                });
                document.getElementById('track-title').innerText = "CONNECTING DATALINK...";
            } else {
                console.warn("YouTube Player not ready yet. Standby.");
            }
        });
    });

    // Media Controls Logic
    document.getElementById('btn-play-pause').addEventListener('click', () => {
        if (player && typeof player.getPlayerState === 'function') {
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        if (player && typeof player.nextVideo === 'function') player.nextVideo();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        if (player && typeof player.previousVideo === 'function') player.previousVideo();
    });
}

// =========================================================
// PHASE 3: YOUTUBE IFRAME API CORE
// =========================================================
function onYouTubeIframeAPIReady() {
    // This function is automatically called by the YouTube API script in the HTML
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'controls': 0, // Hide default YT controls
            'disablekb': 1, // Disable keyboard controls
            'fs': 0,       // Disable fullscreen
            'rel': 0       // Disable related videos
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("HUD Engine Online. Audio systems initialized.");
}

function onPlayerStateChange(event) {
    const trackTitleDisplay = document.getElementById('track-title');
    
    // State 1: Playing
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        let videoData = player.getVideoData();
        trackTitleDisplay.innerText = ">> " + videoData.title; 
    } 
    // State 2: Paused
    else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        let videoData = player.getVideoData();
        trackTitleDisplay.innerText = "[PAUSED] " + (videoData.title || "SYSTEM IDLE");
    }
}
