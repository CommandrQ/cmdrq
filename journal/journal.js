/**
 * VANGUARD_OS: JOURNAL MODULE
 */

const JournalModule = (() => {
    let currentPostId = null;

    const loadEntries = async () => {
        const deck = document.getElementById('log-deck');
        if (!deck) return;

        try {
            const response = await fetch('entries.json');
            const entries = await response.json();
            
            deck.innerHTML = ''; // Clear previous
            entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'log-entry-card';
                card.innerHTML = `<h3>${entry.title}</h3>`;
                card.onclick = () => openEntry(entry);
                deck.appendChild(card);
            });
        } catch (err) {
            console.error("Uplink Failure: entries.json unreachable.", err);
        }
    };

    const openEntry = (entry) => {
        currentPostId = entry.id;
        document.getElementById('blog-modal-title').textContent = entry.title;
        document.getElementById('blog-modal-content').innerHTML = entry.content;
        document.getElementById('blog-modal').style.display = 'flex';
    };

    return {
        init: loadEntries
    };
})();

document.addEventListener('DOMContentLoaded', JournalModule.init);
