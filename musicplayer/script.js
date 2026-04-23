let player;
const stationList = document.getElementById('station-list');
const currentTrackLabel = document.getElementById('current-track');

// 1. Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        playerVars: {
            'listType': 'playlist',
            'list': 'PLwX0pb3GEremC1vfOY7jLfNqdfR2cTVi7' // Default playlist
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("Player Ready");
    loadStations();
}

// 2. Fetch and Load Stations
async function loadStations() {
    try {
        const response = await fetch('stations.json');
        const data = await response.json();
        
        data.stations.forEach(station => {
            const catDiv = document.createElement('div');
            catDiv.className = 'category-label';
            catDiv.innerText = station.category;
            stationList.appendChild(catDiv);

            station.playlists.forEach(pl => {
                const item = document.createElement('div');
                item.className = 'playlist-item';
                item.innerText = pl.title;
                item.onclick = () => playPlaylist(pl.playlistId, pl.title);
                stationList.appendChild(item);
            });
        });
    } catch (err) {
        console.error("Error loading JSON:", err);
    }
}

// 3. Player Logic
function playPlaylist(id, title) {
    player.loadPlaylist({
        list: id,
        listType: 'playlist',
        index: 0,
        startSeconds: 0
    });
    currentTrackLabel.innerText = `Station: ${title}`;
    document.getElementById('play-pause').innerText = "PAUSE";
}

function onPlayerStateChange(event) {
    const btn = document.getElementById('play-pause');
    if (event.data == YT.PlayerState.PLAYING) {
        btn.innerText = "PAUSE";
    } else {
        btn.innerText = "PLAY";
    }
}

// 4. Button Listeners
document.getElementById('play-pause').addEventListener('click', () => {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

document.getElementById('next').addEventListener('click', () => player.nextVideo());
document.getElementById('prev').addEventListener('click', () => player.previousVideo());
