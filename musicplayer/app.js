document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('main-audio');
    const video = document.getElementById('media-video');
    const glow = document.getElementById('glow');
    const progress = document.getElementById('progress');
    
    const playBtn = document.getElementById('play-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    const title = document.getElementById('track-title');
    const artist = document.getElementById('track-artist');

    let trackIndex = 0;
    let tracks = [];

    fetch('playlist.json')
        .then(res => res.json())
        .then(data => {
            tracks = data.tracks;
            loadTrack(trackIndex);
        });

    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.audioSrc;
        video.src = track.coverSrc;
        title.innerText = track.title;
        artist.innerText = track.artist;
        resetPlayer();
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            video.play();
            playBtn.innerText = "PAUSE";
            glow.style.animationPlayState = "running";
        } else {
            audio.pause();
            video.pause();
            playBtn.innerText = "PLAY";
            glow.style.animationPlayState = "paused";
        }
    }

    function resetPlayer() {
        playBtn.innerText = "PLAY";
        progress.style.width = '0%';
        glow.style.animationPlayState = "paused";
    }

    audio.ontimeupdate = () => {
        const pct = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${pct}%`;
    };

    playBtn.addEventListener('click', togglePlay);
    
    nextBtn.addEventListener('click', () => {
        trackIndex = (trackIndex + 1) % tracks.length;
        loadTrack(trackIndex);
        togglePlay();
    });

    prevBtn.addEventListener('click', () => {
        trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(trackIndex);
        togglePlay();
    });
});
