document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.getElementById('category-tabs');
    const listContainer = document.getElementById('playlist-list');
    const player = document.getElementById('main-player');
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('status-text');
    const nowPlaying = document.getElementById('now-playing');

    let stationData = [];

    // 1. Fetch JSON (Looks for stations.json in the same musicplayer folder)
    fetch('stations.json')
        .then(res => res.json())
        .then(data => {
            stationData = data.stations;
            renderTabs();
        })
        .catch(err => {
            console.error("Uplink Failure:", err);
            statusText.innerText = "OFFLINE";
        });

    // 2. Build Category Tabs (The 4 Radio Stations)
    function renderTabs() {
        stationData.forEach((station, index) => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            btn.innerText = station.category;
            btn.onclick = () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPlaylists(index);
            };
            tabContainer.appendChild(btn);
        });
    }

    // 3. Build Playlist Items (Subchannels)
    function renderPlaylists(index) {
        listContainer.innerHTML = '';
        stationData[index].playlists.forEach(pl => {
            const btn = document.createElement('button');
            btn.className = 'pl-btn';
            btn.innerText = `> ${pl.title}`;
            // Corrected to use 'pl.playlistId' to match your JSON
            btn.onclick = () => loadPlaylist(pl.playlistId, pl.title, btn);
            listContainer.appendChild(btn);
        });
    }

    // 4. The Playlist Uplink
    function loadPlaylist(id, title, element) {
        // UI feedback
        document.querySelectorAll('.pl-btn').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        statusText.innerText = "LINKING...";
        loader.style.display = 'flex';
        player.classList.remove('active');
        player.src = ""; // Flush the player

        // 500ms Tactical Delay for that "System Processing" feel
        setTimeout(() => {
            // Using the Playlist-specific URL format
            player.src = `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&rel=0`;
            
            player.onload = () => {
                loader.style.display = 'none';
                player.classList.add('active');
                statusText.innerText = "STABLE";
                nowPlaying.innerText = `UPLINK: ${title}`;
            };
        }, 500);
    }
});
