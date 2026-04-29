let player;
let isPlaying = false;

// 1. Initialize the YouTube API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'controls': 0, // Hide default YT controls
            'disablekb': 1, // Disable keyboard controls
            'fs': 0,       // Disable fullscreen button
            'rel': 0       // Don't show related videos at the end
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("HUD Engine Online. Awaiting commands.");
}

// 2. Track State Changes & Update Metadata
function onPlayerStateChange(event) {
    const trackTitleDisplay = document.getElementById('track-title');
    
    // When playing (State 1) or buffering (State 3), update the title
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        let videoData = player.getVideoData();
        // YouTube API provides title and author together in the title string usually
        trackTitleDisplay.innerText = ">> " + videoData.title; 
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        trackTitleDisplay.innerText = "[PAUSED] " + player.getVideoData().title;
    }
}

// 3. Media Controls Logic
document.getElementById('btn-play-pause').addEventListener('click', () => {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

document.getElementById('btn-next').addEventListener('click', () => {
    player.nextVideo();
});

document.getElementById('btn-prev').addEventListener('click', () => {
    player.previousVideo();
});

// 4. Station Switching Logic
const stationBtns = document.querySelectorAll('.station-btn');
const playlistGroups = document.querySelectorAll('.playlist-group');

stationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Reset active states
        stationBtns.forEach(b => b.classList.remove('active'));
        playlistGroups.forEach(g => g.classList.remove('active-group'));

        // Set new active states
        e.target.classList.add('active');
        const targetId = e.target.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-group');
    });
});

// 5. Playlist Loading Logic
const playlistBtns = document.querySelectorAll('.playlist-btn');

playlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const playlistId = e.target.getAttribute('data-playlist');
        
        // Load the playlist and auto-play immediately
        player.loadPlaylist({
            listType: 'playlist',
            list: playlistId,
            index: 0,
            startSeconds: 0
        });
        
        document.getElementById('track-title').innerText = "CONNECTING DATALINK...";
    });
});
