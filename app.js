// Supabase Configuration
const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// Smooth Transition to Menu
function revealMenu() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-nav').classList.remove('hidden');
    window.scrollTo(0,0);
}

// Fetch and Render Links from JSON
async function loadMenu() {
    const menuGrid = document.getElementById('menu-grid');
    
    try {
        // You can host your links.json on GitHub or Supabase Storage
        const response = await fetch('links.json'); 
        const data = await response.json();
        
        data.links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = 'nav-link';
            anchor.innerText = link.title;
            menuGrid.appendChild(anchor);
        });
    } catch (error) {
        console.error('Error loading links:', error);
        // Fallback static links
        const defaults = ['About Me', 'Blog', 'Profile', 'Contact'];
        defaults.forEach(text => {
            const anchor = document.createElement('a');
            anchor.className = 'nav-link';
            anchor.innerText = text;
            anchor.href = "#";
            menuGrid.appendChild(anchor);
        });
    }
}

loadMenu();
