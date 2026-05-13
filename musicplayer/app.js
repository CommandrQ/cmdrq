let player;
let playlists = [];
let currentPlaylistIndex = 0;
let currentTrackIndex = 0;

async function loadData() {
    const res = await fetch('playlists.json');
    playlists = await res.json();
    renderPlaylists();
}

// YT API Ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0', width: '0',
        events: { 'onStateChange': onPlayerStateChange }
    });
}

function renderPlaylists() {
    const grid = document.getElementById('playlistGrid');
    playlists.forEach((pl, i) => {
        const div = document.createElement('div');
        div.className = 'pl-item';
        div.innerText = pl.playlistName;
        div.onclick = () => selectPlaylist(i);
        grid.appendChild(div);
    });
}

function selectPlaylist(index) {
    currentPlaylistIndex = index;
    currentTrackIndex = 0;
    
    // Update UI Theme
    const themeColor = playlists[index].color;
    document.documentElement.style.setProperty('--active-color', themeColor);
    document.getElementById('playlist-desc').innerText = playlists[index].description;
    
    loadTrack();
}

function loadTrack() {
    const track = playlists[currentPlaylistIndex].tracks[currentTrackIndex];
    player.loadVideoById(track.id);
    document.getElementById('now-playing').innerText = track.title;
    document.getElementById('current-artist').innerText = playlists[currentPlaylistIndex].playlistName;
    document.getElementById('playBtn').innerText = "PAUSE";
}

function togglePlay() {
    const state = player.getPlayerState();
    if (state === 1) {
        player.pauseVideo();
        document.getElementById('playBtn').innerText = "PLAY";
    } else {
        player.playVideo();
        document.getElementById('playBtn').innerText = "PAUSE";
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlists[currentPlaylistIndex].tracks.length;
    loadTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlists[currentPlaylistIndex].tracks.length) % playlists[currentPlaylistIndex].tracks.length;
    loadTrack();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) nextTrack();
}

window.onload = loadData;
