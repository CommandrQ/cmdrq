let player; // Global player variable
const syncText = document.getElementById('sync-text');
const nowPlaying = document.getElementById('now-playing');
const loadingOverlay = document.getElementById('loading-overlay');

// 1. Load the YouTube IFrame API asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function runs automatically when the API is ready
function onYouTubeIframeAPIReady() {
    console.log("YouTube API: ONLINE");
}

document.addEventListener('DOMContentLoaded', () => {
    const stationContainer = document.getElementById('station-container');

    // Fetch the stations and build the menu
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
                    link.onclick = (e) => {
                        e.preventDefault();
                        initiateUplink(pl.playlistId, pl.title, link);
                    };
                    list.appendChild(link);
                });
                stationContainer.appendChild(card);
            });
        });

    // BIND SVG BUTTONS TO PLAYER COMMANDS
    document.getElementById('play-hint').onclick = () => {
        if (player) player.playVideo();
    };

    document.getElementById('pause-hint').onclick = () => {
        if (player) player.pauseVideo();
    };
});

function initiateUplink(id, title, element) {
    // UI Feedback
    document.querySelectorAll('.playlist-link').forEach(l => l.classList.remove('active'));
    element.classList.add('active');
    
    syncText.innerText = "STATUS: LINKING...";
    loadingOverlay.style.display = 'flex';
    
    // If a player already exists, just load the new playlist
    if (player) {
        player.loadPlaylist({
            listType: 'playlist',
            list: id,
            index: 0,
            startSeconds: 0
        });
        finishUplink(title);
    } else {
        // Create the player for the first time
        player = new YT.Player('video-embed', {
            height: '100%',
            width: '100%',
            playerVars: {
                'listType': 'playlist',
                'list': id,
                'autoplay': 1,
                'mute': 0,
                'rel': 0,
                'controls': 1 // Keep this 1 if you want native seekbars, 0 for pure custom look
            },
            events: {
                'onReady': () => finishUplink(title)
            }
        });
    }
}

function finishUplink(title) {
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        syncText.innerText = "STATUS: CONNECTED";
        nowPlaying.innerText = title;
        
        // Ensure the iframe gets the "visible" class for your CSS transitions
        const iframe = document.getElementById('video-embed');
        if (iframe) iframe.classList.add('visible');
    }, 450);
}
