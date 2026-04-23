document.addEventListener('DOMContentLoaded', () => {
    const tabContainer = document.getElementById('category-tabs');
    const listContainer = document.getElementById('playlist-list');
    const player = document.getElementById('main-player');
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('status-text');
    const nowPlaying = document.getElementById('now-playing');

    let stationData = [];

    // 1. Fetch JSON
    fetch('stations.json')
        .then(res => res.json())
        .then(data => {
            stationData = data.stations;
            renderTabs();
        });

    // 2. Build Category Tabs
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

    // 3. Build Playlist Items
    function renderPlaylists(index) {
        listContainer.innerHTML = '';
        stationData[index].playlists.forEach(pl => {
            const btn = document.createElement('button');
            btn.className = 'pl-btn';
            btn.innerText = `> ${pl.title}`;
            btn.onclick = () => loadVideo(pl.id, pl.title, btn);
            listContainer.appendChild(btn);
        });
    }

    // 4. Load the Uplink (The Fix)
    function loadVideo(id, title, element) {
        // Visual Reset
        document.querySelectorAll('.pl-btn').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        statusText.innerText = "LINKING...";
        loader.style.display = 'flex';
        player.classList.remove('active');
        player.src = ""; // Wipe the current source immediately

        // Tactical Delay (500ms)
        setTimeout(() => {
            // We use the 'videoseries' embed for playlists
            player.src = `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&rel=0`;
            
            player.onload = () => {
                loader.style.display = 'none';
                player.classList.add('active');
                statusText.innerText = "STABLE";
                nowPlaying.innerText = `STREAMING: ${title}`;
            };
        }, 500);
    }
});
