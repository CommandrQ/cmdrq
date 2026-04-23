document.addEventListener('DOMContentLoaded', () => {
    const logList = document.getElementById('log-list');
    const ytPlayer = document.getElementById('yt-player');
    
    // Telemetry Elements
    const logTitle = document.getElementById('log-title');
    const logCar = document.getElementById('log-car');
    const logTrack = document.getElementById('log-track');
    const logNotes = document.getElementById('log-notes');

    // 1. Fetch the JSON data
    fetch('logs.json')
        .then(response => response.json())
        .then(data => {
            buildLogMenu(data.logs);
            // Auto-load the first log if it exists
            if (data.logs.length > 0) {
                loadLog(data.logs[0]);
            }
        })
        .catch(error => console.error("Error loading drift logs:", error));

    // 2. Build the clickable sidebar menu
    function buildLogMenu(logs) {
        logs.forEach((log) => {
            const btn = document.createElement('button');
            btn.className = 'log-item';
            
            btn.innerHTML = `
                <span class="log-id">${log.id}</span>
                <span class="log-name">${log.title}</span>
            `;

            // Click event to load the video and update UI
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.log-item').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                loadLog(log);
            });

            logList.appendChild(btn);
        });
    }

    // 3. Load the specific log data into the UI
    function loadLog(log) {
        // Load YouTube iframe (autoplay=1 starts it when clicked, mute=0)
        ytPlayer.src = `https://www.youtube.com/embed/${log.youtubeId}?autoplay=1&rel=0`;
        
        // Update Telemetry UI
        logTitle.innerText = log.title;
        logCar.innerText = log.car;
        logTrack.innerText = log.track;
        logNotes.innerText = log.notes;
    }
});
