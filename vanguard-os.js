/**
 * VANGUARD_OS SYSTEM LOGIC
 * Optimized and modularized framework.
 */

const VanguardOS = (() => {

    // --- 0. APP CONFIGURATION DATA ---
    // Edit this list to easily manage your dashboard apps
    const appsConfig = [
        {
            name: "About Me",
            path: "/about.html", // Replace with your actual link paths
            glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        },
        {
            name: "Dreamscape",
            path: "/dreamscape.html",
            glyph: "M11.1,12.08C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12c0,0.14,0.02,0.28,0.02,0.42 C2.62,12.15,3.29,12,4,12c1.66,0,3.18,0.83,4.1,2.15C9.77,14.63,11,16.17,11,18c0,1.52-0.87,2.83-2.12,3.51 c0.98,0.32,2.03,0.5,3.11,0.5c5.52,0,10-4.48,10-10C22,7.92,17.27,4.44,11.1,12.08z"
        },
        {
            name: "Music Player",
            path: "/music.html",
            glyph: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
        },
        {
            name: "Blog",
            path: "/blog.html",
            glyph: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
        },
        {
            name: "Social Media",
            path: "/social.html",
            glyph: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
        }
    ];
    
    // --- 1. CORE INITIALIZATION ---
    const init = () => {
        renderApps();
        setupStarfield();
        setupSystemClock();
    };

    // --- 2. DYNAMIC APP RENDERING ---
    const renderApps = () => {
        const dashboard = document.getElementById('app-dashboard');
        if (!dashboard) return;

        appsConfig.forEach(app => {
            // Create an anchor tag for native web routing
            const appElement = document.createElement('a');
            appElement.className = 'app-icon';
            appElement.href = app.path;
            
            // Build the inner HTML using the config data
            appElement.innerHTML = `
                <div class="icon-box">
                    <svg class="glyph" viewBox="0 0 24 24">
                        <path d="${app.glyph}"/>
                    </svg>
                </div>
                <span>${app.name}</span>
            `;

            // Click animation logic before navigating
            appElement.addEventListener('click', (e) => {
                e.preventDefault(); // Pause instant navigation
                console.log(`[SYSTEM]: Accessing ${app.name} at route: ${app.path}`);
                
                appElement.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    appElement.style.transform = '';
                    window.location.href = app.path; // Execute navigation
                }, 150);
            });

            dashboard.appendChild(appElement);
        });
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
                hour12: true, 
                hour: 'numeric', 
                minute: '2-digit', 
                second: '2-digit' 
            });

            dateEl.textContent = now.toLocaleDateString([], { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            }).toUpperCase();
        };

        updateTime();
        setInterval(updateTime, 1000);
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', VanguardOS.init);
