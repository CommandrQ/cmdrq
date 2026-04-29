let player;
let stationData = [];

// Initialize YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 0, 'listType': 'playlist' }
    });
}

// Fetch and Build Interface
async function init() {
    const res = await fetch('playlists.json');
    stationData = (await res.json()).stations;

    const nav = document.getElementById('station-nav');
    const list = document.getElementById('playlist-list');
    const glow = document.getElementById('glow');

    stationData.forEach((station, index) => {
        // Create Main Station Button
        const btn = document.createElement('button');
        btn.className = 'station-btn';
        btn.innerText = station.name;
        
        btn.onclick = () => {
            // Update Glow
            glow.style.background = `radial-gradient(circle, ${station.color} 0%, transparent 70%)`;
            
            // Build Playlist (Substation) List
            list.innerHTML = ''; 
            station.playlists.forEach(pl => {
                const plBtn = document.createElement('div');
                plBtn.className = 'substation-item';
                plBtn.innerText = `> ${pl.title}`;
                plBtn.onclick = () => {
                    player.loadPlaylist({list: pl.id, listType: 'playlist'});
                };
                list.appendChild(plBtn);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', init);
