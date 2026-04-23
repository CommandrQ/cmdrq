document.addEventListener("DOMContentLoaded", () => {
    const stationListEl = document.getElementById("station-list");
    const ytPlayer = document.getElementById("yt-player");
    const stationTitleEl = document.getElementById("station-title");
    const stationGenreEl = document.getElementById("station-genre");

    // Initialize the application
    async function initPlayer() {
        try {
            // Fetch the external JSON file
            const response = await fetch('stations.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const stations = await response.json();
            buildInterface(stations);
            
        } catch (error) {
            console.error("Signal Lost: Failed to load station data.", error);
            stationTitleEl.innerText = "ERROR: SIGNAL LOST";
            stationGenreEl.innerText = "CHECK DATA CONNECTION";
        }
    }

    // Function to load a specific station into the player
    function loadStation(station, buttonElement) {
        // Update YouTube Iframe (Autoplay enabled)
        ytPlayer.src = `https://www.youtube.com/embed/videoseries?list=${station.playlistId}&autoplay=1`;

        // Update Telemetry Panel UI
        stationTitleEl.innerText = `NOW PLAYING: ${station.name}`;
        stationGenreEl.innerText = station.genre;

        // Update active button states
        document.querySelectorAll('.log-item').forEach(btn => btn.classList.remove('active'));
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
    }

    // Build the station buttons dynamically
    function buildInterface(stations) {
        stations.forEach((station, index) => {
            const btn = document.createElement("button");
            btn.className = "log-item";
            btn.setAttribute("role", "menuitem");
            
            btn.innerHTML = `
                <span class="log-id">[${station.id}]</span>
                <span class="log-name">${station.name}</span>
            `;

            btn.addEventListener("click", () => loadStation(station, btn));

            stationListEl.appendChild(btn);

            // Auto-load the first station on startup
            if (index === 0) {
                loadStation(station, btn);
            }
        });
    }

    // Start the intercept
    initPlayer();
});
