/**
 * VANGUARD_OS SYSTEM LOGIC
 * Optimized and modularized framework.
 */

const VanguardOS = (() => {
    
    // --- 1. CORE INITIALIZATION ---
    const init = () => {
        setupStarfield();
        setupSystemClock();
        setupAppInteractions();
    };

    // --- 2. STARFIELD WARP ENGINE ---
    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        
        const starCount = 140; // Optimal for mobile and desktop

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Pre-calculate randomized values to save memory
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 0.5;
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * 4;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Simplified and highly efficient Web Animations API call
            star.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 0 },
                { transform: `translate(${(x - 50) * 5}px, ${(y - 50) * 5}px) scale(1)`, opacity: 0.8, offset: 0.5 },
                { transform: `translate(${(x - 50) * 20}px, ${(y - 50) * 20}px) scale(2.5)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                delay: delay * 1000,
                easing: 'linear' // Linear prevents jerky speed changes
            });

            container.appendChild(star);
        }
    };

    // --- 3. HUD SYSTEM TIME ---
    const setupSystemClock = () => {
        const clockEl = document.getElementById('system-clock');
        const dateEl = document.getElementById('system-date');

        if (!clockEl || !dateEl) return;

        const updateTime = () => {
            const now = new Date();
            
            // Updated to 12-hour AM/PM format
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

        // Run immediately, then sync every second
        updateTime();
        setInterval(updateTime, 1000);
    };

    // --- 4. APP INTERACTION LOGIC ---
    const setupAppInteractions = () => {
        const apps = document.querySelectorAll('.app-icon');
        
        apps.forEach(app => {
            app.addEventListener('click', (e) => {
                const label = app.getAttribute('data-label');
                console.log(`[SYSTEM]: Initializing ${label} Sequence...`);
                
                // Add click pulse effect
                app.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    app.style.transform = '';
                }, 150);
            });
        });
    };

    // Expose init function
    return { init };
})();

// Boot OS when DOM is ready
document.addEventListener('DOMContentLoaded', VanguardOS.init);
