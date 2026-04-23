document.addEventListener('DOMContentLoaded', () => {
    const nodeMatrix = document.getElementById('node-matrix');

    // 1. Fetch the flashy JSON data
    fetch('database/menu.json')
        .then(response => response.json())
        .then(data => {
            buildLinks(data.links);
        })
        .catch(error => console.error("Error loading Musubi HUD:", error));

    // 2. Build the flashy direct links
    function buildLinks(links) {
        links.forEach(item => {
            const a = document.createElement('a');
            
            // Apply standard class + dynamic color class from JSON
            a.className = `node-link ${item.color || 'cyan'}`;
            a.href = item.link;

            const isExternal = item.link.startsWith('http');
            if (isExternal) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }

            // Define icons based on color vibe
            let icon = '>>'; // Cyan internal default
            if(item.color === 'magenta') icon = '↗'; // External Action
            if(item.color === 'red') icon = '!!'; // System warning/Database

            a.innerHTML = `
                <span class="node-title">${item.title}</span>
                <span class="action-icon">${icon}</span>
            `;

            nodeMatrix.appendChild(a);
        });
    }

    // 3. Simple HUD Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
});
