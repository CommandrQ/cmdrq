document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('radio-core');
    const visual = document.getElementById('bg-visual');
    const aura = document.getElementById('aura');
    const playBtn = document.getElementById('play-pause');
    
    let stations = [];
    let currentStationIndex = 0;

    fetch('stations.json').then(r => r.json()).then(data => {
        stations = data.stations;
        initStations();
        loadStation(0);
    });

    function initStations() {
        const nav = document.getElementById('station-tabs');
        stations.forEach((s, i) => {
            const btn = document.createElement('div');
            btn.className = 'station-tab';
            btn.innerText = s.name;
            btn.onclick = () => loadStation(i);
            nav.appendChild(btn);
        });
    }

    function loadStation(idx) {
        currentStationIndex = idx;
        const tabs = document.querySelectorAll('.station-tab');
        tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
        
        const list = document.getElementById('channel-list');
        list.innerHTML = '';
        
        stations[idx].channels.forEach((ch, ci) => {
            const item = document.createElement('div');
            item.className = 'channel-item';
            item.innerText = ch.title;
            item.onclick = () => playChannel(ch, item);
            list.appendChild(item);
        });
        
        document.getElementById('current-station').innerText = `FREQ: ${stations[idx].name}`;
    }

    function playChannel(ch, el) {
        document.querySelectorAll('.channel-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
        
        audio.src = ch.url;
        visual.src = ch.visual;
        document.getElementById('current-title').innerText = ch.title;
        
        audio.play();
        visual.play();
        playBtn.innerText = "PAUSE";
        aura.style.animationPlayState = "running";

        // BACKGROUND AUDIO LOGIC (Media Session API)
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: ch.title,
                artist: 'COMMANDER_Q',
                album: stations[currentStationIndex].name
            });
        }
    }

    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play(); visual.play();
            playBtn.innerText = "PAUSE";
            aura.style.animationPlayState = "running";
        } else {
            audio.pause(); visual.pause();
            playBtn.innerText = "PLAY";
            aura.style.animationPlayState = "paused";
        }
    };
});
