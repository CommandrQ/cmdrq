let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 
            'autoplay': 0, 
            'listType': 'playlist', 
            'controls': 1,
            'modestbranding': 1 
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
            // Update Theme Accent Variables
            const root = document.documentElement;
            root.style.setProperty('--main-color', station.color);
            root.style.setProperty('--glow-opacity', station.color + "66"); // Adding alpha

            // Clear and Load Substation list
            list.innerHTML = '';
            station.playlists.forEach(pl => {
                const plItem = document.createElement('div');
                plItem.className = 'substation-item';
                plItem.innerText = `> ${pl.title}`;
                
                plItem.onclick = () => {
                    player.loadPlaylist({list: pl.id, listType: 'playlist'});
                };
                
                list.appendChild(plItem);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
