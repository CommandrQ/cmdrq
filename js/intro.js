document.addEventListener('DOMContentLoaded', () => {
    
    // Elements - Apple UI
    const appleUI = document.getElementById('apple-ui');
    const appleLoader = document.getElementById('apple-loader');
    const overrideText = document.getElementById('override-text');
    const appleGlass = document.querySelector('.apple-glass');
    
    // Elements - Transition & Neon UI
    const flashBang = document.getElementById('flash-bang');
    const scanlines = document.getElementById('scanlines');
    const neonUI = document.getElementById('neon-ui');
    const initiateBtn = document.getElementById('initiate-btn');
    const btnWrapper = document.getElementById('btn-wrapper');
    const fadeOverlay = document.getElementById('fade-to-black');

    // Helper function to pause time
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // THE CINEMATIC SEQUENCE (Slowed down for smoothness)
    async function runBootSequence() {
        
        // 1. Initial smooth load
        await delay(800);
        appleLoader.style.width = '75%';
        
        // 2. The Slow Struggle
        await delay(1500);
        appleLoader.style.width = '82%';
        
        await delay(600);
        appleLoader.style.width = '79%';
        
        await delay(800);
        appleLoader.style.width = '88%';
        
        // 3. The Override text slowly fades in
        await delay(500);
        overrideText.style.opacity = '1';
        
        // 4. Mounting Pressure
        await delay(1200);
        appleLoader.style.background = '#ff2a2a'; // Fades to red
        appleLoader.style.width = '96%';
        appleGlass.classList.add('glitch-shake');
        
        // Let it shake and build tension for almost 2 seconds
        await delay(1800);
        
        // 5. The Cinematic Explosion
        // A slightly longer flash bang (1.2s total via CSS)
        flashBang.style.animation = 'flash-white 1.2s ease-out forwards';
        
        appleGlass.classList.remove('glitch-shake');
        appleGlass.classList.add('explode');
        
        // Wait until the screen is completely white (about 250ms) to swap UIs quietly
        await delay(250); 
        appleUI.classList.add('hidden');
        document.body.classList.add('tactical-mode'); 
        scanlines.style.opacity = '1';
        neonUI.classList.remove('hidden');
        
        // The purple background and neon UI will slowly fade in as the flashbang clears
    }

    // Start the intro sequence
    runBootSequence();

    // ----------------------------------------------------
    // NEURAL OVERRIDE BUTTON LOGIC
    // ----------------------------------------------------
    initiateBtn.addEventListener('click', () => {
        // Log the visit
        localStorage.setItem('musubi_access_granted', 'true');
        
        // 1. Create top half, bottom half, and laser flash
        const topClone = initiateBtn.cloneNode(true);
        const btmClone = initiateBtn.cloneNode(true);
        const flashLine = document.createElement('div');

        // 2. Assign animation classes
        topClone.className = 'neon-btn slice-top';
        btmClone.className = 'neon-btn slice-bottom';
        flashLine.className = 'slice-flash';

        // 3. Strip IDs
        topClone.removeAttribute('id');
        btmClone.removeAttribute('id');

        // 4. Hide original button and append clones
        initiateBtn.style.opacity = '0';
        btnWrapper.appendChild(topClone);
        btnWrapper.appendChild(btmClone);
        btnWrapper.appendChild(flashLine);

        // 5. Fade to Black triggers later now (at 800ms) because slice is slower
        setTimeout(() => {
            fadeOverlay.classList.add('active');
        }, 800);

        // 6. Warp safely in the dark
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000); // Extended to 2 seconds to let the black screen linger for a moment
    });
});
