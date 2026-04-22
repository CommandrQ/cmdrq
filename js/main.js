/**
 * VANGUARD_OS // Full Dive Redirect
 */

function initiateFullDive() {
    const btn = document.getElementById('slice-button');
    const fade = document.getElementById('fade-overlay');

    // 1. Disable button to prevent double-clicks
    btn.disabled = true;

    // 2. Trigger the "Slice" animation
    btn.classList.add('sliced');

    // 3. Wait for the slice to fly apart (approx 400ms)
    setTimeout(() => {
        // 4. Trigger the fade to black
        fade.classList.add('faded-out');
    }, 400);

    // 5. Final Redirect once screen is fully black
    setTimeout(() => {
        // Mark session as active so they don't see intro again (optional)
        localStorage.setItem('vanguard_login', 'true');
        
        window.location.href = 'Menu.html';
    }, 1500); 
}
