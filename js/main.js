/**
 * VANGUARD_OS // PHASE 1 LOGIC
 */

function initiateFullDive() {
    const btn = document.getElementById('slice-button');
    const fade = document.getElementById('fade-overlay');

    // 1. Lock input
    btn.disabled = true;

    // 2. Trigger the "Shatter"
    btn.classList.add('sliced');

    // 3. Initiate the transition to the Void
    setTimeout(() => {
        fade.classList.add('faded-out');
    }, 400);

    // 4. Full Dive into Menu.html
    setTimeout(() => {
        // We'll set a flag so the menu knows we just 'dove' in
        localStorage.setItem('vanguard_sync', 'true');
        window.location.href = 'Menu.html';
    }, 1500);
}
