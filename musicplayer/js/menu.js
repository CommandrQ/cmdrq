let player;
const radialGlow = document.querySelector('.purple-radial-glow');

// 1. YouTube IFrame API Initialization
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-engine', {
        height: '0',
        width: '0',
        playerVars: { 
            'listType': 'playlist', 
            'autoplay': 1,
            'controls': 0 
        },
        events: {
            'onReady': () => console.log("HUD Engine: Online")
        }
    });
}

// 2. Fetch and Build Menu
async function initHUD() {
    try {
        const response = await fetch('playlists.json');
        const data = await response.json();
        
        const leftMatrix = document.getElementById('node-matrix-left');
        const rightMatrix = document.getElementById('node-matrix-right');

        data.stations.forEach(station => {
            const btn = document.createElement('div');
            btn.className = 'node-item';
            btn.innerHTML = `<span class="node-label">${station.name}</span>`;
            
            btn.onclick = () => {
                // Update the Flow Color
                radialGlow.style.background = `radial-gradient(circle, ${station.color} 0%, transparent 70%)`;
                loadSubstations(station, data);
            };

            if (station.side === 'left') leftMatrix.appendChild(btn);
            else rightMatrix.appendChild(btn);
        });
    } catch (err) {
        console.error("System Error: Could not load JSON data", err);
    }
}

// 3. Render Substations (Playlists)
function loadSubstations(station, fullData) {
    const targetId = station.side === 'left' ? 'node-matrix-left' : 'node-matrix-right';
    const container = document.getElementById(targetId);
    
    // Clear and add back button
    container.innerHTML = `<div class="node-item" onclick="location.reload()"> [ RETURN_TO_MAIN ] </div>`;
    
    station.playlists.forEach(pl => {
        const plBtn = document.createElement('div');
        plBtn.className = 'node-item';
        plBtn.innerHTML = `<span class="node-label">> ${pl.title}</span>`;
        plBtn.onclick = () => {
            if (player && player.loadPlaylist) {
                player.loadPlaylist({ list: pl.id, listType: 'playlist' });
            }
        };
        container.appendChild(plBtn);
    });
}

document.addEventListener('DOMContentLoaded', initHUD);
