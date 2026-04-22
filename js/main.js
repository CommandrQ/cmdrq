/**
 * VANGUARD_OS // Full Dive Interface
 * Ready Player One x SAO x 90s Capcom
 */

// --- PHASE 1: THE VOICE (Sentient Capcom Announcer) ---
const dialogueLogs = [
    "VANGUARD_NET: CONNECTION REQUEST DETECTED.",
    "SCANNING BIOMETRICS...CITIZEN OPERATOR CONFIRMED.",
    "ACCESS LEVEL: MINIMAL clearance.",
    "THE MATRIX SAYS: 'WHY RETURN TO THE VOID?'",
    "INITIALIZING Full Dive Protocols...",
    "READY, OPERATOR? R1... CONNECT!"
];

// Config
const typewriterSpeed = 25; // ms per char
const linePause = 1800;    // ms between lines

window.onload = async function() {
    console.log("VANGUARD_OS: Attract Mode Initiated.");
    await runCapcomDialogue();
};

/**
 * Runs the dialog loop, clearing the box for each line 
 * to mimic 90s game text boxes.
 */
async function runCapcomDialogue() {
    const dialogBox = document.getElementById("terminal-output");
    
    // Play sound logic would go here: const snd = new Audio('sfx/boot.mp3');

    for (let i = 0; i < dialogueLogs.length; i++) {
        // Clear box for next line (Capcom style)
        dialogBox.innerText = ""; 
        await typeText(dialogBox, dialogueLogs[i]);
        
        // Final line stays on screen until Press Start
        if (i < dialogueLogs.length - 1) {
            await new Promise(res => setTimeout(res, linePause));
        }
    }
}

/**
 * Basic typewriter function.
 */
function typeText(element, text) {
    return new Promise(resolve => {
        let charIndex = 0;
        let interval = setInterval(() => {
            element.innerText += text.charAt(charIndex);
            charIndex++;
            if (charIndex >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, typewriterSpeed);
    });
}

// --- PHASE 2: THE FULL DIVE (Start & Slice Logic) ---

let isDiving = false; // Prevent multi-clicks

/**
 * Activated by clicking 'PRESS START'.
 * Triggers the slice animation, fade, and redirect.
 */
function initiateFullDive() {
    if (isDiving) return;
    isDiving = true;

    console.log("VANGUARD_OS: Full Dive Sequence Initiated. Sayonara!");

    // 1. SOUNDS (Implied)
    // const sliceSound = new Audio('sfx/slice.mp3');
    // const fadeSound = new Audio('sfx/matrix_fade.mp3');
    // sliceSound.play();

    // 2. Add 'sliced' class (triggers the CSS diagonal animation)
    const sliceContainer = document.getElementById("slice-container");
    sliceContainer.classList.add("sliced");

    // 3. Optional: Add a brief intense screen flash
    // document.body.style.filter = "brightness(5) invert(1)";

    // 4. Delay (~500ms) for the slice animation to peak, then fade.
    setTimeout(() => {
        const fadeOverlay = document.getElementById("fade-overlay");
        fadeOverlay.classList.add("faded-out");
        
        // fadeSound.play();
    }, 500);

    // 5. Final Delay (~1500ms for slice + fade) before Redirect.
    setTimeout(() => {
        // Handle session persistent (the user asked for "plays once" earlier)
        localStorage.setItem('vanguard_session_id', 'TRUE_ACTIVE');
        
        window.location.href = 'Menu.html';
    }, 1500);
}
