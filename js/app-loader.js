/* VANGUARD_OS // DATA LOADER */
async function loadVanguardData(endpoint, callback) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Link Severed");
        const data = await response.json();
        callback(data);
    } catch (err) {
        console.error("OS_ERROR:", err);
        // Fallback for offline mode
        const container = document.querySelector('.window-manager') || document.body;
        container.innerHTML += `<div style="color:red; padding:20px;">[LINK_ERROR]: Database Offline</div>`;
    }
}
