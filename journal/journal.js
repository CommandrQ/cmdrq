/**
 * VANGUARD_OS: JOURNAL MODULE
 */

const JournalModule = (() => {
    
    const loadEntries = async () => {
        const deck = document.getElementById('log-deck');
        if (!deck) return;

        try {
            console.log("Journal: Fetching entries.json...");
            const response = await fetch('entries.json');
            const entries = await response.json();
            
            deck.innerHTML = ''; 
            entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'log-entry-card';
                card.innerHTML = `<h3>${entry.title}</h3>`;
                
                // HARD LINK TO MAIN OS MODAL
                card.onclick = (e) => {
                    e.preventDefault();
                    console.log("Card Clicked:", entry.title);
                    if (window.VanguardOS) {
                        window.VanguardOS.openBlogModal(entry.title, entry.content, entry.id);
                    } else {
                        console.error("OS Link Missing: VanguardOS not found in global scope.");
                    }
                };
                
                deck.appendChild(card);
            });
        } catch (err) {
            console.error("Uplink Failure:", err);
        }
    };

    return {
        init: loadEntries
    };
})();

// Initialize only once the page is fully ready
window.addEventListener('load', JournalModule.init);
