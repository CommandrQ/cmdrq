/* VANGUARD_OS // HUD INJECTOR */
document.addEventListener("DOMContentLoaded", function() {
    const taskbar = document.createElement('div');
    taskbar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 50px;
        background: #000; border-bottom: 1px solid rgba(255,255,255,0.1);
        z-index: 5000; display: flex; align-items: center; justify-content: space-between;
        padding: 0 20px; box-sizing: border-box; font-family: -apple-system, sans-serif;
    `;

    // Determine path prefix based on file location
    const isApp = window.location.pathname.includes('/apps/');
    const homePath = isApp ? '../home.html' : 'home.html';

    taskbar.innerHTML = `
        <div style="color: #fff; font-size: 0.7rem; letter-spacing: 2px;">VANGUARD_OS // SECURE_TRANS</div>
        <div style="display: flex; gap: 20px;">
            <a href="${homePath}" style="color: #01cdfe; text-decoration: none; font-size: 0.7rem;">DASHBOARD</a>
            <span id="os-clock" style="color: #ffd700; font-size: 0.7rem;">00:00:00</span>
        </div>
    `;

    document.body.appendChild(taskbar);

    // Live System Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('os-clock').innerText = now.toLocaleTimeString();
    }, 1000);
});
