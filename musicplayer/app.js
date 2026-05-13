let player;
let playlists = [];

// 1. Fetch JSON
async function loadData() {
    try {
        const res = await fetch('playlists.json');
        if (!res.ok) throw new Error('Could not find playlists.json');
        playlists = await res.json();
        renderPlaylistButtons();
    } catch (e) {
        console.error("Vanguard Data Error:", e);
    }
}

// 2. Setup YouTube Player
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '0', width: '0',
        playerVars: { 'listType': 'playlist' },
        events: {
            'onReady': () => console.log("Uplink Established"),
            'onStateChange': onPlayerStateChange
        }
    });
};

function renderPlaylistButtons() {
    const grid = document.getElementById('playlistGrid');
    grid.innerHTML = ''; 
    playlists.forEach((pl, i) => {
        const btn = document.createElement('div');
        btn.className = 'pl-item';
        btn.innerText = pl.name;
        btn.onclick = () => tuneToFrequency(i);
        grid.appendChild(btn);
    });
}

function tuneToFrequency(index) {
    const target = playlists[index];
    
    // This part grabs the ID from your YouTube link automatically
    const urlObj = new URL(target.url);
    const playlistId = urlObj.searchParams.get('list');

    if (playlistId && player) {
        // Apply your sleek glow effect
        document.documentElement.style.setProperty('--active-color', target.glow || '#8ecae6');
        document.getElementById('now-playing').innerText = target.name;
        document.getElementById('playlist-desc').innerText = "FREQUENCY LOCKED";

        // COMMAND: Load the full YouTube playlist
        player.loadPlaylist({
            list: playlistId,
            listType: 'playlist',
            index: 0
        });

        document.getElementById('playBtn').innerText = "PAUSE";
    }
}

function togglePlay() {
    const state = player.getPlayerState();
    if (state === 1) { // 1 is 'playing'
        player.pauseVideo();
        document.getElementById('playBtn').innerText = "PLAY";
    } else {
        player.playVideo();
        document.getElementById('playBtn').innerText = "PAUSE";
    }
}

function nextTrack() { player.nextVideo(); }
function prevTrack() { player.previousVideo(); }

function onPlayerStateChange(event) {
    // If the playlist ends or a video is cued, update UI as needed
}

window.onload = loadData;
