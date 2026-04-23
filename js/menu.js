document.addEventListener('DOMContentLoaded', () => {
    const matrixLeft = document.getElementById('node-matrix-left');
    const matrixRight = document.getElementById('node-matrix-right');

    fetch('database/menu.json')
        .then(response => response.json())
        .then(data => {
            buildLinks(data.links);
        })
        .catch(error => console.error("Error loading Musubi HUD:", error));

    function buildLinks(links) {
        const half = Math.ceil(links.length / 2);
        
        links.forEach((item, index) => {
            const a = document.createElement('a');
            
            a.className = `node-link ${item.color || 'cyan'}`;
            a.href = item.link;

            const isExternal = item.link.startsWith('http');
            if (isExternal) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }

            let icon = '>>'; 
            if(item.color === 'magenta') icon = '↗'; 
            if(item.color === 'red') icon = '!!'; 

            a.innerHTML = `
                <span class="node-title">${item.title}</span>
                <span class="action-icon">${icon}</span>
            `;

            if (index < half) {
                matrixLeft.appendChild(a);
            } else {
                matrixRight.appendChild(a);
            }
        });
    }

    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
});
