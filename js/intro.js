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

    // Helper function to pause time in the script
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // THE CINEMATIC SEQUENCE
    async function runBootSequence() {
        
        // 1. Smoothly load the Apple bar to 80%
        await delay(500);
        appleLoader.style.width = '80%';
        
        // 2. The Struggle: jump around near the end
        await delay(1200);
        appleLoader.style.width = '85%';
        await delay(200);
        appleLoader.style.width = '82%';
        await delay(300);
        appleLoader.style.width = '90%';
        await delay(150);
        appleLoader.style.width = '84%';
        
        // 3. The Override text appears
        await delay(400);
        overrideText.style.opacity = '1';
        
        // 4. More struggling and shaking
        await delay(800);
        appleLoader.style.background = '#ff2a2a'; // Bar turns red
        appleLoader.style.width = '95%';
        appleGlass.classList.add('glitch-shake');
        
        // 5. The Explosion (Bait & Switch)
        await delay(1500);
        
        // Trigger the flash bang
        flashBang.style.animation = 'flash-white 0.8s forwards';
        
        // Explode the apple container
        appleGlass.classList.remove('glitch-shake');
        appleGlass.classList.add('explode');
        
        // Wait exactly halfway through the flash bang to swap the UI
        await delay(100); 
        appleUI.classList.add('hidden');
        document.body.classList.add('tactical-mode');
        scanlines.style.opacity = '1';
        neonUI.classList.remove('hidden');
    }

    // Start the intro sequence
    runBootSequence();

    // ----------------------------------------------------
    // NEURAL OVERRIDE BUTTON LOGIC (The Slice)
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

        // 3. Strip IDs from clones
        topClone.removeAttribute('id');
        btmClone.removeAttribute('id');

        // 4. Hide original button and append clones
        initiateBtn.style.opacity = '0';
        btnWrapper.appendChild(topClone);
        btnWrapper.appendChild(btmClone);
        btnWrapper.appendChild(flashLine);

        // 5. Trigger the Fade to Black slightly before the slice ends
        setTimeout(() => {
            fadeOverlay.classList.add('active');
        }, 600);

        // 6. Warp to menu.html safely in the dark
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1500); 
    });
});
