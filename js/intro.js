document.addEventListener('DOMContentLoaded', () => {
    
    const insertCoinText = document.getElementById('insert-coin-text');
    const btnWrapper = document.getElementById('btn-wrapper');
    const initiateBtn = document.getElementById('initiate-btn');
    const impactFrame = document.getElementById('impact-frame');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 1. ARCADE ATTRACT MODE
    async function runArcadeBoot() {
        // Let "INSERT COIN" blink for 2 seconds
        await delay(2000);
        
        // Rapid blink right before changing
        insertCoinText.style.animation = "blinker 0.1s step-end infinite";
        await delay(400);
        
        // Swap to PRESS START button
        insertCoinText.classList.add('hidden');
        btnWrapper.classList.remove('hidden');
        
        // Add a slight "thump" animation when the button appears
        btnWrapper.style.animation = "power-on 0.3s cubic-bezier(0.1, 0.8, 0.3, 1)";
    }

    runArcadeBoot();

    // 2. THE KATANA CUT ACTION
    initiateBtn.addEventListener('click', async () => {
        // Log the visit so they bypass this screen next time
        localStorage.setItem('musubi_access_granted', 'true');
        
        // STEP A: HIT-STOP (Freeze and invert colors for a microsecond)
        initiateBtn.classList.add('hit-stop');
        
        // Pause for impact weight (150ms)
        await delay(150);

        // STEP B: IMPACT FRAME (Screen flashes white/negative)
        impactFrame.style.animation = "impact-flash 0.4s ease-out forwards";

        // STEP C: CREATE THE SLICED CLONES
        const topClone = document.createElement('div');
        const btmClone = document.createElement('div');
        const flashLine = document.createElement('div');

        // Copy exact HTML so the text slices in half too
        topClone.innerHTML = `<span class="btn-text">PRESS START</span>`;
        btmClone.innerHTML = `<span class="btn-text">PRESS START</span>`;

        topClone.className = 'slice-top';
        btmClone.className = 'slice-bottom';
        flashLine.className = 'slice-flash';

        // Hide original button and append the flying pieces
        initiateBtn.style.display = 'none';
        btnWrapper.appendChild(topClone);
        btnWrapper.appendChild(btmClone);
        btnWrapper.appendChild(flashLine);

        // STEP D: WARP TO MENU
        // Wait for the pieces to fly off screen (1 second animation, we warp at 800ms)
        await delay(800);
        window.location.href = 'menu.html';
    });
});
