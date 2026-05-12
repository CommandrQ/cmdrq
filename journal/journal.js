const JournalModule = (() => {
    const init = async () => {
        const deck = document.getElementById('log-deck');
        if (!deck) return;

        try {
            const response = await fetch('entries.json');
            const entries = await response.json();
            
            deck.innerHTML = '';
            entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'log-entry-card';
                card.innerHTML = `<h3>${entry.title}</h3>`;
                
                // Click Event
                card.addEventListener('click', () => {
                    if (window.VanguardOS) {
                        window.VanguardOS.openBlogModal(entry.title, entry.content, entry.id);
                    }
                });
                
                deck.appendChild(card);
            });
        } catch (err) {
            console.error("Journal Uplink Error:", err);
        }
    };

    return { init };
})();

window.addEventListener('load', JournalModule.init);
