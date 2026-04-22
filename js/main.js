/**
 * VANGUARD_OS | Core System Logic
 * Version: 4.2.0
 */

// --- CONFIGURATION ---
const SYSTEM_CONFIG = {
    bootSpeed: 30, // ms per character
    lineDelay: 500, // ms between lines
    storageKey: 'vanguard_access_granted'
};

const bootLogs = [
    "INITIALIZING VANGUARD_CORE V.4.2...",
    "LOCAL_HOST: 127.0.0.1",
    "SEARCHING FOR NEURAL LINK...",
    "LINK FOUND: ID_772-B (OPERATOR)",
    "DECRYPTING SECURITY PROTOCOLS...",
    "WIPE_PROTOCOL: DISABLED",
    "ACCESS GRANTED. WELCOME TO THE NETWORK."
];

// --- INITIALIZATION ---
window.onload = () => {
    const isLoginPage = document.getElementById('terminal-output');
    const isDashboard = document.querySelector('.dashboard');

    if (isLoginPage) {
        handleEntrySequence();
    }

    if (isDashboard) {
        initializeDashboard();
    }
};

// --- BOOT / LOGIN LOGIC ---

async function handleEntrySequence() {
    // Check if user has already logged in
    const hasVisited = localStorage.getItem(SYSTEM_CONFIG.storageKey);

    if (hasVisited === 'true') {
        // Fast-track to login module without the typing delay
        renderLogsInstantly();
        showLoginModule();
    } else {
        // First time boot sequence
        await runTerminalBoot();
        showLoginModule();
    }
}

async function runTerminalBoot() {
    const terminal = document.getElementById("terminal-output");
    
    for (let line of bootLogs) {
        let newLine = document.createElement("p");
        newLine.classList.add("log-entry");
        terminal.appendChild(newLine);
        
        await typeText(newLine, line);
        await new Promise(res => setTimeout(res, SYSTEM_CONFIG.lineDelay));
    }
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
        }, SYSTEM_CONFIG.bootSpeed);
    });
}

function renderLogsInstantly() {
    const terminal = document.getElementById("terminal-output");
    bootLogs.forEach(line => {
        let p = document.createElement("p");
        p.classList.add("log-entry");
        p.innerText = line;
        terminal.appendChild(p);
    });
}

function showLoginModule() {
    const loginBox = document.getElementById("login-module");
    if (loginBox) {
        loginBox.style.opacity = "1";
    }
}

// Set session flag and redirect
function authorizeUser() {
    localStorage.setItem(SYSTEM_CONFIG.storageKey, 'true');
    window.location.href = 'Menu.html';
}

// --- DASHBOARD LOGIC ---

function initializeDashboard() {
    updateClock();
    setInterval(updateClock, 1000);
    
    // Example: Fetching user stats from your /database folder
    fetchUserData();
    
    console.log("Vanguard_OS: HUD Systems Online.");
}

function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    clockElement.innerText = timeString;
}

/**
 * Fetches data from /database/user.json
 * Note: This requires a local server (like Live Server) to work.
 */
async function fetchUserData() {
    try {
        const response = await fetch('./database/user.json');
        if (!response.ok) throw new Error('Database Offline');
        
        const data = await response.json();
        console.log("Operator Data Loaded:", data);
        
        // Update UI elements if they exist
        // document.getElementById('user-name').innerText = data.username;
    } catch (err) {
        console.warn("Vanguard_OS: Running in Local Standalone Mode.");
    }
}

// Function to reset the OS (Logout)
function systemLogout() {
    localStorage.removeItem(SYSTEM_CONFIG.storageKey);
    window.location.href = 'Index.html';
}
