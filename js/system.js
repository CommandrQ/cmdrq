/* VANGUARD_OS // SYSTEM HUD & FOOTER */
document.addEventListener("DOMContentLoaded", function() {
    const isApp = window.location.pathname.includes('/apps/');
    const homePath = isApp ? '../menu.html' : 'menu.html';

    // 1. INJECT TOP TASKBAR
    const header = document.createElement('div');
    header.style.cssText = `position:fixed; top:0; left:0; width:100%; height:60px; background:rgba(0,0,0,0.9); z-index:9999; display:flex; align-items:center; justify-content:space-between; padding:0 25px; border-bottom:1px solid var(--bright-teal); box-sizing:border-box;`;
    header.innerHTML = `
        <div style="font-size:0.7rem; letter-spacing:2px; font-weight:bold;">VANGUARD_OS // ONLINE</div>
        <a href="${homePath}" style="color:var(--bright-teal); text-decoration:none; font-size:0.75rem; font-weight:bold; border:1px solid var(--bright-teal); padding:5px 15px; border-radius:5px;">MENU</a>
    `;
    document.body.appendChild(header);

    // 2. INJECT BOTTOM PERSISTENT FOOTER
    const footer = document.createElement('div');
    footer.style.cssText = `position:fixed; bottom:0; left:0; width:100%; height:40px; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; border-top:1px solid rgba(255,255,255,0.1); box-sizing:border-box;`;
    const year = new Date().getFullYear();
    footer.innerHTML = `<div style="font-size:0.65rem; color:rgba(255,255,255,0.5); letter-spacing:1px; text-transform:uppercase;">Built by Commander Q &copy; ${year}</div>`;
    document.body.appendChild(footer);
});
