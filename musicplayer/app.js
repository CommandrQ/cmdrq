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
        .then(res => {
            if (!res.ok) throw new Error("Could not find stations.json");
            return res.json();
        })
        .then(data => {
            stationData = data.stations;
            renderTabs();
        })
        .catch(err => {
            console.error("Uplink Failure:", err);
            statusText.innerText = "OFFLINE - USE LIVE SERVER";
            statusText.style.color = "#ff0055";
        });

    // 2. Build Category Tabs
    function renderTabs() {
        tabContainer.innerHTML = ''; // Clear
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
            // Corrected to playlistId to match your JSON
            btn.onclick = () => loadUplink(pl.playlistId, pl.title, btn);
            listContainer.appendChild(btn);
        });
    }

    // 4. THE UPLINK (The single-click fix)
    function loadUplink(id, title, element) {
        // UI reset
        document.querySelectorAll('.pl-btn').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        statusText.innerText = "LINKING...";
        loader.style.display = 'flex';
        player.style.opacity = '0'; // Hide player while loading
        player.src = ""; 

        // Tactical 500ms Delay
        setTimeout(() => {
            // Using the native iframe src swap (most stable method)
            player.src = `https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&rel=0`;
            
            player.onload = () => {
                loader.style.display = 'none';
                player.style.opacity = '1';
                statusText.innerText = "STABLE";
                nowPlaying.innerText = `UPLINK: ${title}`;
            };
        }, 500);
    }
});
