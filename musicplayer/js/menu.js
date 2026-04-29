let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 
            'autoplay': 1, 
            'listType': 'playlist', 
            'controls': 1, // Standard controls visible
            'rel': 0
        }
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
            // Update Theme
            const root = document.documentElement;
            root.style.setProperty('--main-color', station.color);
            root.style.setProperty('--glow-opacity', station.color + "44");

            // Build Substations
            list.innerHTML = '';
            station.playlists.forEach(pl => {
                const plItem = document.createElement('div');
                plItem.className = 'substation-item';
                plItem.innerText = `> ${pl.title}`;
                
                // SINGLE CLICK PLAYBACK
                plItem.onclick = () => {
                    if (player && player.loadPlaylist) {
                        player.loadPlaylist({
                            list: pl.id,
                            listType: 'playlist',
                            index: 0
                        });
                        // Some browsers need an explicit play call after loading
                        setTimeout(() => { player.playVideo(); }, 100);
                    }
                };
                list.appendChild(plItem);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
