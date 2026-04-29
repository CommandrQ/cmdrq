let player;
let playlistData = [];

// Clock
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = `SYSTEM_TIME: ${now.toTimeString().split(' ')[0]}`;
}, 1000);

// YT API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 0, 'controls': 1, 'modestbranding': 1 },
        events: { 'onReady': initApp }
    });
}

async function initApp() {
    try {
        const response = await fetch('playlists.json');
        const data = await response.json();
        playlistData = data.stations;
        renderStations();
        // Load first station by default
        selectStation(playlistData[0]);
    } catch (e) { console.error("SIGNAL_LOST", e); }
}

function renderStations() {
    const nav = document.getElementById('station-nav');
    playlistData.forEach(station => {
        const btn = document.createElement('div');
        btn.className = 'station-btn';
        btn.innerText = station.name;
        btn.style.color = station.color;
        btn.onclick = () => selectStation(station);
        nav.appendChild(btn);
    });
}

function selectStation(station) {
    document.documentElement.style.setProperty('--theme-color', station.color);
    const list = document.getElementById('substation-list');
    list.innerHTML = '';

    station.substations.forEach(sub => {
        const item = document.createElement('div');
        item.className = 'sub-item';
        item.innerText = `> ${sub.name}`;
        item.onclick = () => playNow(sub.playlistId);
        list.appendChild(item);
    });
}

function playNow(id) {
    player.loadPlaylist({
        list: id,
        listType: 'playlist',
        index: 0
    });
    // The loadPlaylist call automatically starts playback if user interaction has occurred
}

function togglePlay() {
    const state = player.getPlayerState();
    if (state === 1) { player.pauseVideo(); }
    else { player.playVideo(); }
}
