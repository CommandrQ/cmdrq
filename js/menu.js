document.addEventListener('DOMContentLoaded', () => {
    const intelDisplay = document.getElementById('intel-display');
    const navAction = document.getElementById('nav-action');
    const zones = document.querySelectorAll('.map-zone');

    const zoneData = {
        'zone-comms': {
            title: "COMMUNICATIONS_CENTER",
            status: "ONLINE",
            desc: "Neural radio link active. Multiple frequency streams detected.",
            link: "musicplayer/index.html",
            action: "ENTER_COMMS"
        },
        'zone-db': {
            title: "MAIN_DATABASE",
            status: "RESTRICTED",
            desc: "Core records and user biometric logs stored here.",
            link: "database/stations.json",
            action: "OPEN_ARCHIVE"
        },
        'zone-intel': {
            title: "INTEL_ARRAY",
            status: "STANDBY",
            desc: "Global mission updates and world-state parameters.",
            link: "#",
            action: "SCAN_INTEL"
        },
        'zone-core': {
            title: "MUSUBI_CORE",
            status: "LOCKED",
            desc: "Neural override core. Authorization level insufficient.",
            link: null,
            action: "ACCESS_DENIED"
        }
    };

    zones.forEach(zone => {
        zone.addEventListener('mouseenter', () => {
            const data = zoneData[zone.id];
            
            // Update Intel Sidebar
            intelDisplay.innerHTML = `
                <h3 class="cyan-text">${data.title}</h3>
                <p>STATUS: <span class="intel-stat">${data.status}</span></p>
                <p>> ${data.desc}</p>
            `;

            // Update Action Button
            if (data.link) {
                navAction.innerText = data.action;
                navAction.className = "nav-lock nav-active";
                navAction.onclick = () => window.location.href = data.link;
            } else {
                navAction.innerText = data.action;
                navAction.className = "nav-lock";
                navAction.onclick = null;
            }
        });
    });

    // Simple HUD Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
});
