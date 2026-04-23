let player;
let isAPILoaded = false;

// 1. Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    isAPILoaded = true;
    player = new YT.Player('youtube-iframe', {
        height: '100%',
        width: '100%',
        playerVars: {
            'listType': 'playlist',
            'autoplay': 0,
            'controls': 1, // Show YT controls or 0 to hide them
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    loadStations();
}

// 2. Fetch and Build the Station List
async function loadStations() {
    try {
        const response = await fetch('stations.json');
        const data = await response.json();
        const stationContainer = document.getElementById('station-list');

        data.stations.forEach(category => {
            // Add Category Label
            const catTitle = document.createElement('div');
            catTitle.className = 'category-header';
            catTitle.innerText = category.category;
            stationContainer.appendChild(catTitle);

            // Add Playlists
            category.playlists.forEach(pl => {
                const btn = document.createElement('button');
                btn.className = 'playlist-link';
                btn.innerText = pl.title;
                btn.onclick = () => {
                    player.loadPlaylist({
                        list: pl.playlistId,
                        listType: 'playlist',
                        index: 0,
                        startSeconds: 0
                    });
                    document.getElementById('now-playing').innerText = pl.title;
                };
                stationContainer.appendChild(btn);
            });
        });
    } catch (error) {
        console.error("Error loading stations.json. Make sure you are running on a server!", error);
    }
}

// 3. Manual Controls
function playPause() {
    const state = player.getPlayerState();
    if (state === 1) { // 1 = Playing
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function nextTrack() {
    player.nextVideo();
}

function prevTrack() {
    player.previousVideo();
}
