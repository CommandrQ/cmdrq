let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 
            'autoplay': 1, 
            'listType': 'playlist', 
            'controls': 1,
            'modestbranding': 1,
            'origin': window.location.origin
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
            const root = document.documentElement;
            root.style.setProperty('--main-color', station.color);
            root.style.setProperty('--glow-opacity', station.color + "33");

            list.innerHTML = '';
            station.playlists.forEach(pl => {
                const plItem = document.createElement('div');
                plItem.className = 'substation-item';
                plItem.innerText = `[ ${pl.title} ]`;
                
                // CRITICAL: Single-Click Fix
                plItem.addEventListener('click', function() {
                    if (player && player.loadPlaylist) {
                        player.stopVideo(); // Clear existing
                        player.loadPlaylist({
                            list: pl.id,
                            listType: 'playlist',
                            index: 0
                        });
                        // Explicitly call play to override browser focus blocks
                        setTimeout(() => { player.playVideo(); }, 200);
                    }
                });
                list.appendChild(plItem);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
