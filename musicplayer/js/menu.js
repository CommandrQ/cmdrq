let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 0, 'listType': 'playlist', 'controls': 1 }
    });
}

async function initHUD() {
    const res = await fetch('playlists.json');
    const data = await res.json();
    
    const nav = document.getElementById('station-nav');
    const list = document.getElementById('playlist-list');

    data.stations.forEach(station => {
        const btn = document.createElement('button');
        btn.className = 'station-btn';
        btn.innerText = station.name;
        
        btn.onclick = () => {
            // THEME ENGINE TRIGGER
            const root = document.documentElement;
            root.style.setProperty('--main-color', station.color);
            // Create a low-opacity version for the glow
            root.style.setProperty('--glow-opacity', station.color + "66"); 

            // Load Playlists
            list.innerHTML = '';
            station.playlists.forEach(pl => {
                const plItem = document.createElement('div');
                plItem.className = 'substation-item';
                plItem.innerText = `> ${pl.title}`;
                plItem.onclick = () => player.loadPlaylist({list: pl.id, listType: 'playlist'});
                list.appendChild(plItem);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
