/**
 * VANGUARD_OS SYSTEM LOGIC
 * Data-Driven App Injection & Optimized Core
 */

const VanguardOS = (() => {
    
    // ==========================================
    // 📂 THE REGISTRY: ADD OR EDIT APPS HERE
    // ==========================================
    const APP_REGISTRY = [
        { id: 'origins', label: 'Origins', iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        { id: 'warroom', label: 'War Room', iconPath: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z' },
        { id: 'frequencies', label: 'Frequencies', iconPath: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
        { id: 'uplink', label: 'Uplink', iconPath: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-10 12.5v-9l6 4.5-6 4.5z' }
        // To add a new one, just add a comma to the line above and drop in a new row!
    ];

    // --- 1. CORE INITIALIZATION ---
    const init = () => {
        renderApps();
        setupStarfield();
        setupSystemClock();
        setupAppInteractions();
    };

    // --- 2. DYNAMIC APP INJECTION ---
    const renderApps = () => {
        const dashboard = document.getElementById('dashboard-container');
        if (!dashboard) return;

        // Automatically map the registry data into HTML elements
        dashboard.innerHTML = APP_REGISTRY.map(app => `
            <div class="app-icon" data-id="${app.id}">
                <div class="icon-box">
                    <svg class="glyph" viewBox="0 0 24 24">
                        <path d="${app.iconPath}"/>
                    </svg>
                </div>
                <span>${app.label}</span>
            </div>
        `).join('');
    };

    // --- 3. STARFIELD WARP ENGINE ---
    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        
        const starCount = 140; 

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 4;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 0 },
                { transform: `translate(${(x - 50) * 5}px, ${(y - 50) * 5}px) scale(1)`, opacity: 0.8, offset: 0.5 },
                { transform: `translate(${(x - 50) * 20}px, ${(y - 50) * 20}px) scale(2.5)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                delay: delay * 1000,
                easing: 'linear' 
            });

            container.appendChild(star);
        }
    };

    // --- 4. HUD SYSTEM TIME ---
    const setupSystemClock = () => {
        const clockEl = document.getElementById('system-clock');
        const dateEl = document.getElementById('system-date');

        if (!clockEl || !dateEl) return;

        const updateTime = () => {
            const now = new Date();
            
            clockEl.textContent = now.toLocaleTimeString([], { 
                hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
            });

            dateEl.textContent = now.toLocaleDateString([], { 
                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
            }).toUpperCase();
        };

        updateTime();
        setInterval(updateTime, 1000);
    };

    // --- 5. EFFICIENT EVENT DELEGATION ---
    const setupAppInteractions = () => {
        const dashboard = document.getElementById('dashboard-container');
        if (!dashboard) return;

        // Attach ONE listener to the dashboard instead of individual listeners
        dashboard.addEventListener('click', (e) => {
            const app = e.target.closest('.app-icon');
            if (!app) return; // Ignore clicks in the empty space between icons

            const appId = app.getAttribute('data-id');
            console.log(`[SYSTEM]: Initializing ${appId.toUpperCase()} Sequence...`);
            
            // Visual click pulse
            app.style.transform = 'scale(0.95)';
            setTimeout(() => { app.style.transform = ''; }, 150);

            // Add navigation/modal logic here based on appId
            // if (appId === 'warroom') { window.location.href = 'warroom.html'; }
        });
    };

    return { init };
})();

// Boot OS when DOM is ready
document.addEventListener('DOMContentLoaded', VanguardOS.init);
