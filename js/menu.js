document.addEventListener('DOMContentLoaded', () => {
    const nodeMatrix = document.getElementById('node-matrix');

    // 1. Fetch the simplified JSON data
    fetch('database/menu.json')
        .then(response => response.json())
        .then(data => {
            buildLinks(data.links);
        })
        .catch(error => console.error("Error loading Musubi Links:", error));

    // 2. Build the direct links
    function buildLinks(links) {
        links.forEach(item => {
            // Create an anchor tag instead of a button
            const a = document.createElement('a');
            a.className = 'node-link';
            a.href = item.link;

            // Check if it's an external link
            const isExternal = item.link.startsWith('http');
            
            if (isExternal) {
                // Open in new tab securely
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }

            // Build the inner HTML. Add an arrow icon if it's external.
            a.innerHTML = `
                <span class="node-title">${item.title}</span>
                ${isExternal ? '<span class="external-icon">↗</span>' : ''}
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
