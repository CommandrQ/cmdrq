let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '100%',
        width: '100%',
        playerVars: { 
            'autoplay': 1, 
            'listType': 'playlist', 
            'controls': 1,
            'enablejsapi': 1
        },
        events: {
            'onReady': () => console.log("Commander, the system is ready.")
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
            // Theme Update
            const root = document.documentElement;
            root.style.setProperty('--main-color', station.color);
            root.style.setProperty('--glow-opacity', station.color + "44");

            // Build Playlist
            list.innerHTML = '';
            station.playlists.forEach(pl => {
                const plItem = document.createElement('div');
                plItem.className = 'substation-item';
                plItem.innerText = `> ${pl.title}`;
                
                // SINGLE CLICK PLAY
                plItem.onclick = (e) => {
                    e.stopPropagation();
                    if (player && player.loadPlaylist) {
                        player.loadPlaylist({
                            list: pl.id,
                            listType: 'playlist',
                            index: 0,
                            suggestedQuality: 'default'
                        });
                        player.playVideo(); // Force start
                    }
                };
                list.appendChild(plItem);
            });
        };
        nav.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
