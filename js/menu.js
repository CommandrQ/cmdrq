document.addEventListener('DOMContentLoaded', () => {
    const nodeMatrix = document.getElementById('node-matrix');
    const intelDisplay = document.getElementById('intel-display');
    const navActionBtn = document.getElementById('nav-action');

    // 1. Fetch the JSON data
    fetch('database/menu.json')
        .then(response => response.json())
        .then(data => {
            buildNodeMatrix(data.nodes);
        })
        .catch(error => console.error("Error loading Musubi Nodes:", error));

    // 2. Build the buttons dynamically
    function buildNodeMatrix(nodes) {
        nodes.forEach(node => {
            const btn = document.createElement('button');
            btn.className = 'node-btn';
            
            // Layout of the grid button
            btn.innerHTML = `
                <span class="node-title">${node.title}</span>
                <span class="node-status">[ ${node.status} ]</span>
            `;

            // Mobile & Desktop Click Logic
            btn.addEventListener('click', () => {
                
                // Highlight active button
                document.querySelectorAll('.node-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update the Intel Panel
                intelDisplay.innerHTML = `
                    <h3 class="cyan-text">${node.title}</h3>
                    <p>STATUS: <span class="intel-stat">${node.status}</span></p>
                    <p>> ${node.desc}</p>
                `;

                // Update the Action Button
                if (node.link && node.link !== "#") {
                    navActionBtn.innerText = node.action;
                    navActionBtn.className = "nav-btn active";
                    navActionBtn.disabled = false;
                    navActionBtn.onclick = () => {
                        window.location.href = node.link;
                    };
                } else {
                    // Lock the button if there is no valid link
                    navActionBtn.innerText = node.action;
                    navActionBtn.className = "nav-btn locked";
                    navActionBtn.disabled = true;
                    navActionBtn.onclick = null;
                }
            });

            nodeMatrix.appendChild(btn);
        });
    }

    // 3. Simple HUD Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
});
