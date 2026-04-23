document.addEventListener('DOMContentLoaded', () => {
    const logList = document.getElementById('log-list');
    const ytPlayer = document.getElementById('yt-player');
    const logTitle = document.getElementById('log-title');
    const logCar = document.getElementById('log-car');

    // 1. Fetch JSON data
    fetch('logs.json')
        .then(response => response.json())
        .then(data => {
            buildLogMenu(data.logs);
            if (data.logs.length > 0) {
                loadLog(data.logs[0]);
            }
        })
        .catch(err => console.error("Archive fetch error:", err));

    // 2. Sidebar Menu Builder
    function buildLogMenu(logs) {
        logs.forEach((log) => {
            const btn = document.createElement('button');
            btn.className = 'log-item';
            btn.innerHTML = `
                <span class="log-id">${log.id}</span>
                <span class="log-name">${log.title}</span>
            `;

            btn.addEventListener('click', () => {
                document.querySelectorAll('.log-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadLog(log);
            });
            logList.appendChild(btn);
        });
    }

    // 3. Monitor Loader
    function loadLog(log) {
        // If it's a playlist ID (starts with PL), format differently, else assume standard video ID
        const isPlaylist = log.youtubeId.startsWith('PL');
        const embedUrl = isPlaylist 
            ? `https://www.youtube.com/embed?listType=playlist&list=${log.youtubeId}&autoplay=1`
            : `https://www.youtube.com/embed/${log.youtubeId}?autoplay=1&rel=0`;

        ytPlayer.src = embedUrl;
        logTitle.innerText = log.title;
        logCar.innerText = log.car;
    }
});
