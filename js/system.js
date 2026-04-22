/* VANGUARD_OS // SYSTEM HUD & PROFILE V2.5 */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT TOP TASKBAR
    const header = document.createElement('div');
    header.style.cssText = `position:fixed; top:0; left:0; width:100%; height:60px; background:rgba(0,0,0,0.95); z-index:9999; display:flex; align-items:center; justify-content:space-between; padding:0 25px; border-bottom:1px solid #01cdfe; box-sizing:border-box; backdrop-filter:blur(10px);`;
    header.innerHTML = `
        <div style="font-size:0.7rem; letter-spacing:2px; font-family:sans-serif; font-weight:bold;">VANGUARD_OS // ONLINE</div>
        <button id="about-trigger" style="color:#01cdfe; background:transparent; font-size:0.7rem; font-weight:bold; border:1px solid #01cdfe; padding:6px 15px; border-radius:5px; cursor:pointer; text-transform:uppercase;">About Me</button>
    `;
    document.body.appendChild(header);

    // 2. INJECT PROFILE MODAL (Hidden)
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'profile-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-window apple-glass">
            <button class="close-modal-btn" onclick="toggleModal(false)">&times;</button>
            <h2 style="font-size: 1.2rem;">OPERATIVE DOSSIER</h2>
            <div style="border-bottom: 1px solid var(--bright-teal); margin-bottom: 20px;"></div>
            <p>Hello! Thank you for visiting my page!</p>
            <p>My name is <strong>Quincy</strong>, also known as <strong>Commander Q</strong>. But beyond the callsign, I am a self-taught developer driven by relentless curiosity and disciplined execution. My architecture wasn't built in a traditional computer science lab. It was forged through rigorous self-study, late-night debugging, and a commitment to building systems from the ground up.</p>
            <p>My operational history extends beyond my military service. In the civilian sector, my resume reflects a versatile tech operative, with frontline experience at industry giants like <strong>Apple</strong> and <strong>Best Buy</strong>. Navigating these fast-paced, high-volume environments honed my ability to troubleshoot complex systems under pressure, manage hardware logistics, and deliver elite-level support directly to the end user. I learn, adapt, and deploy solutions.</p>
            <p>Yet, in a digital landscape constantly threatened by the overwhelming storms of negativity, toxicity, and division, technical skills alone aren't enough. My mission is absolute: to protect the positive energy of our community and the individuals that power it.</p>
            <p>The <strong>Vanguard Knights</strong> isn't just a collective. We believe that hard work, discipline, and a balanced perspective are the ultimate weapons against the dark sectors of the net.</p>
            <p style="color:var(--gold); font-weight:bold;">Stand with me and defend the light.</p>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // 3. INJECT BOTTOM FOOTER
    const footer = document.createElement('div');
    footer.style.cssText = `position:fixed; bottom:0; left:0; width:100%; height:45px; background:rgba(0,0,0,0.9); z-index:9999; display:flex; align-items:center; justify-content:center; border-top:1px solid rgba(255,255,255,0.1); box-sizing:border-box; backdrop-filter:blur(5px);`;
    const year = new Date().getFullYear();
    footer.innerHTML = `<div style="font-size:0.7rem; color:rgba(255,255,255,0.6); letter-spacing:1px; font-family:sans-serif;">Built by Commander Q &copy; ${year}</div>`;
    document.body.appendChild(footer);

    // 4. MODAL LOGIC
    const trigger = document.getElementById('about-trigger');
    trigger.addEventListener('click', () => toggleModal(true));
    
    // Close on clicking outside the window
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) toggleModal(false);
    });
});

function toggleModal(show) {
    const modal = document.getElementById('profile-modal');
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}
