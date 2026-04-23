document.addEventListener('DOMContentLoaded', () => {
    const stationContainer = document.getElementById('station-container');
    const videoEmbed = document.getElementById('video-embed');
    const loadingOverlay = document.getElementById('loading-overlay');
    const syncText = document.getElementById('sync-text');
    const nowPlaying = document.getElementById('now-playing');

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

    function initiateUplink(id, title, element) {
        // UI Feedback
        document.querySelectorAll('.playlist-link').forEach(l => l.classList.remove('active'));
        element.classList.add('active');
        
        // Start System Check (The Delay)
        syncText.innerText = "STATUS: LINKING...";
        loadingOverlay.style.display = 'flex';
        videoEmbed.classList.remove('visible');
        
        // 450ms Delay to "process" the link
        setTimeout(() => {
            const embedUrl = `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&mute=0&rel=0`;
            videoEmbed.src = embedUrl;
            
            // Once iframe loads, reveal it
            videoEmbed.onload = () => {
                loadingOverlay.style.display = 'none';
                videoEmbed.classList.add('visible');
                syncText.innerText = "STATUS: CONNECTED";
                nowPlaying.innerText = title;
            };
        }, 450);
    }
});
