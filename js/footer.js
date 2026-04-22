/* VANGUARD_OS // HUD INJECTOR V2.2 */
document.addEventListener("DOMContentLoaded", function() {
    const taskbar = document.createElement('div');
    
    // Determine path prefix based on file location
    const isApp = window.location.pathname.includes('/apps/');
    const homePath = isApp ? '../home.html' : 'home.html';

    taskbar.style.cssText = `
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 55px;
        background: #000000; 
        border-bottom: 2px solid rgba(1, 205, 254, 0.3); /* Subtle Teal Glow */
        z-index: 9999 !important; /* Forces it above all cinematic layers */
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        padding: 0 25px; 
        box-sizing: border-box; 
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.8);
    `;

    taskbar.innerHTML = `
        <div style="color: #fff; font-size: 0.7rem; letter-spacing: 3px; font-weight: bold; text-transform: uppercase;">
            Vanguard_OS <span style="color: #ff71ce; margin: 0 5px;">//</span> <span id="os-path">SECURE_LINK</span>
        </div>
        <div style="display: flex; gap: 25px; align-items: center;">
            <a href="${homePath}" style="color: #01cdfe; text-decoration: none; font-size: 0.75rem; letter-spacing: 1px; font-weight: 600;">DASHBOARD</a>
            <span id="os-clock" style="color: #ffd700; font-size: 0.75rem; font-family: monospace; min-width: 80px; text-align: right;">00:00:00</span>
        </div>
    `;

    document.body.appendChild(taskbar);

    // Dynamic Path Readout
    const pathName = window.location.pathname.split('/').pop().replace('.html', '') || 'ROOT';
    document.getElementById('os-path').innerText = pathName.toUpperCase();

    // Live System Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('os-clock').innerText = now.toLocaleTimeString([], { hour12: false });
    }, 1000);
});
