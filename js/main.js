const bootLogs = [
    "VANGUARD_NET: CONNECTION REQUEST DETECTED.",
    "SCANNING SOUL... CITIZEN OPERATOR CONFIRMED.",
    "THE MATRIX SAYS: 'WHY RETURN TO THE VOID?'",
    "RECONSTRUCTING WORLD_MAP.001...",
    "FULL DIVE PREPARATIONS COMPLETE.",
    "READY? ROUND 1... CONNECT!"
];

async function handleEntrySequence() {
    const terminal = document.getElementById("terminal-output");
    
    for (let line of bootLogs) {
        terminal.innerHTML = ""; // Clear for that dialogue box feel
        await typeText(terminal, line);
        await new Promise(res => setTimeout(res, 1500)); // Longer pause for reading
    }
    
    document.getElementById("login-module").style.display = "block";
}

function typeText(element, text) {
    return new Promise(resolve => {
        let i = 0;
        let interval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, 40);
    });
}

// ... include the authorizeUser and session logic from previous steps
