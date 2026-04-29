let player;
let playlistData = [];

// 1. Clock Logic (24-hour tactical time)
setInterval(() => {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ":" + 
                 now.getMinutes().toString().padStart(2, '0') + ":" + 
                 now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `SYSTEM_TIME: ${time}`;
}, 1000);

// 2. Initialize YouTube Player with Native Controls
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '240',
        width: '100%',
        playerVars: {
            'listType': 'playlist',
            'autoplay': 0,
            'controls': 1,      // Enables the native YouTube seek bar, volume, etc.
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': initApp
        }
    });
}

// 3. Fetch Data and Render Stations
async function initApp() {
    try {
        const response = await fetch('playlists.json');
        const data = await response.json();
        playlistData = data.stations;
        renderStations();
    } catch (err) {
        console.error("DATA_LINK_FAILURE:", err);
    }
}

function renderStations() {
    const nav = document.getElementById('station-nav');
    playlistData.forEach(station => {
        const btn = document.createElement('button');
        btn.className = 'station-btn';
        btn.innerText = `[ ${station.name} ]`;
        btn.style.color = station.color;
        btn.style.borderColor = station.color;
        btn.onclick = () => selectStation(station);
        nav.appendChild(btn);
    });
}

// 4. Update Theme and Substation List
function selectStation(station) {
    // Update CSS Variables for the HUD Glow and Frame
    document.documentElement.style.setProperty('--theme-color', station.color);
    
    const list = document.getElementById('substation-list');
    list.innerHTML = ''; // Clear previous substations

    station.substations.forEach(sub => {
        const div = document.createElement('div');
        div.className = 'sub-item';
        div.innerHTML = `<span class="marker">></span> ${sub.name}`;
        
        // Single-click playback logic
        div.onclick = () => playPlaylist(sub.playlistId);
        
        list.appendChild(div);
    });
}

// 5. The "Single-Click" Solution
function playPlaylist(id) {
    // Immediate command to load the new playlist data
    player.loadPlaylist({
        list: id,
        listType: 'playlist',
        index: 0,
        startSeconds: 0
    });

    // Tactical Delay: Ensures the iframe has 'caught' the playlist ID 
    // before we force the play state.
    setTimeout(() => {
        if (player && player.playVideo) {
            player.playVideo();
        }
    }, 300); 
}
