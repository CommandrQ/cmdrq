const bootLogs = [
    "INITIALIZING VANGUARD_CORE V.4.2...",
    "SEARCHING FOR NEURAL LINK...",
    "LINK FOUND: ID_772-B",
    "DECRYPTING SECURITY PROTOCOLS...",
    "ACCESS GRANTED. WELCOME, OPERATOR."
];

async function startBootSequence() {
    const terminal = document.getElementById("terminal-output");
    
    for (let line of bootLogs) {
        let newLine = document.createElement("p");
        newLine.classList.add("log-entry");
        terminal.appendChild(newLine);
        
        // Typewriter effect for the specific line
        await typeText(newLine, line);
        
        // Brief pause between lines for realism
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Reveal the login button after sequences finish
    document.querySelector(".auth-box").style.opacity = "1";
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
        }, 30); // Adjust speed here (ms per character)
    });
}

window.onload = startBootSequence;
