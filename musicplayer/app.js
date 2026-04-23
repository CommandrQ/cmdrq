let player;
const syncText = document.getElementById('sync-text');
const nowPlaying = document.getElementById('now-playing');
const loadingOverlay = document.getElementById('loading-overlay');

// 1. Load the YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    console.log("VANGUARD_API: ONLINE");
}

document.addEventListener('DOMContentLoaded', () => {
    const stationContainer = document.getElementById('station-container');

    fetch('stations.json')
        .then(res => res.json())
        .then(data => {
            data.stations.forEach(station => {
                const card = document.createElement('div');
                card.className = 'station-card';
                card.innerHTML = `<h2>${station.category}</h2><div class="pl-list"></div>`;
                
                const list = card.querySelector('.pl-list');
                station.playlists.forEach(pl => {
                    const link = document.createElement('a');
                    link.className = 'playlist-link';
                    link.innerHTML = `> ${pl.title}`;
                    link.href = "#";
                    // THE FIX: Use a clean click handler that prevents default behavior
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Stops the click from "bleeding" to other elements
                        initiateUplink(pl.playlistId, pl.title, link);
                    });
                    list.appendChild(link);
                });
                stationContainer.appendChild(card);
            });
        });

    // MEDIA CONTROL BINDINGS
    document.getElementById('play-hint').onclick = () => { if (player) player.playVideo(); };
    document.getElementById('pause-hint').onclick = () => { if (player) player.pauseVideo(); };
});

function initiateUplink(id, title, element) {
    // 1. Visual Feedback
    document.querySelectorAll('.playlist-link').forEach(l => l.classList.remove('active'));
    element.classList.add('active');
    
    // 2. Clear previous state to prevent "Restart Glitch"
    syncText.innerText = "STATUS: LINKING...";
    loadingOverlay.style.display = 'flex';
    
    if (player) {
        // Stop current audio entirely before swapping
        player.stopVideo(); 
    }

    // 3. The Tactical Delay (450ms)
    setTimeout(() => {
        if (player && typeof player.loadPlaylist === 'function') {
            // Swap the playlist data directly
            player.loadPlaylist({
                listType: 'playlist',
                list: id,
                index: 0,
                startSeconds: 0,
                suggestedQuality: 'default'
            });
            finishUplink(title);
        } else {
            // First time initialization
            player = new YT.Player('video-embed', {
                height: '100%',
                width: '100%',
                playerVars: {
                    'listType': 'playlist',
                    'list': id,
                    'autoplay': 1,
                    'mute': 0,
                    'rel': 0,
                    'controls': 1
                },
                events: {
                    'onReady': () => finishUplink(title),
                    'onError': (e) => {
                        console.error("Uplink Error:", e);
                        syncText.innerText = "STATUS: ERROR";
                    }
                }
            });
        }
    }, 450);
}

function finishUplink(title) {
    loadingOverlay.style.display = 'none';
    syncText.innerText = "STATUS: CONNECTED";
    nowPlaying.innerText = title;
    
    const iframe = document.getElementById('video-embed');
    if (iframe) iframe.classList.add('visible');
    
    // Force play in case browser blocked autoplay
    if (player) player.playVideo();
}
