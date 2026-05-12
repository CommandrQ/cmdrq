const VanguardOS = (() => {
    const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
    const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
    let supabase = null;
    if (window.supabase) supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let currentPostId = null;

    const setupStarfield = () => {
        const container = document.getElementById('star-field');
        if (!container) return;
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 50; 
            const duration = (Math.random() * 8 + 4) * 1000;
            star.style.left = `50%`; star.style.top = `50%`;
            star.style.width = star.style.height = `2px`;
            star.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { opacity: 1, offset: 0.2 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}vw), calc(-50% + ${Math.sin(angle) * velocity}vh)) scale(2.5)`, opacity: 0 }
            ], { duration: duration, iterations: Infinity, easing: 'linear', delay: -Math.random() * duration });
            container.appendChild(star);
        }
    };

    const renderApps = () => {
        const dashboard = document.getElementById('app-dashboard');
        if (!dashboard) return;
        const apps = [
            { name: "About", path: "/about.html", glyph: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
            { name: "Journal", path: "/journal/index.html", glyph: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" },
            { name: "Music", path: "/music.html", glyph: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" },
            { name: "TikTok", path: "https://www.tiktok.com/@commandr_q", glyph: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7" }
        ];
        apps.forEach(app => {
            const a = document.createElement('a');
            a.className = 'app-icon';
            a.href = app.path;
            a.innerHTML = `<svg viewBox="0 0 24 24" width="32" height="32" fill="var(--color-blue)"><path d="${app.glyph}"/></svg><span>${app.name}</span>`;
            dashboard.appendChild(a);
        });
    };

    const loadJournal = async () => {
        const deck = document.getElementById('log-deck');
        if (!deck) return;
        try {
            const res = await fetch('entries.json');
            const data = await res.json();
            data.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'log-entry-card';
                card.onclick = () => {
                    currentPostId = entry.id;
                    document.getElementById('blog-modal-title').textContent = entry.title;
                    document.getElementById('blog-modal-content').innerHTML = entry.content;
                    document.getElementById('blog-modal').style.display = 'flex';
                };
                card.innerHTML = `<h3>${entry.title}</h3>`;
                deck.appendChild(card);
            });
        } catch (e) { console.error("Data Uplink Failed", e); }
    };

    return {
        init: () => { setupStarfield(); renderApps(); loadJournal(); },
        closeModals: () => document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none'),
        handleShare: () => { navigator.clipboard.writeText(window.location.href); VanguardOS.closeModals(); document.getElementById('share-confirm-modal').style.display = 'flex'; },
        handleReplyClick: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            VanguardOS.closeModals();
            if (session) {
                document.getElementById('reply-name').value = session.user.user_metadata.full_name || '';
                document.getElementById('reply-email').value = session.user.email || '';
                document.getElementById('reply-modal').style.display = 'flex';
            } else { document.getElementById('auth-modal').style.display = 'flex'; }
        },
        submitAuth: async (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const pass = document.getElementById('auth-pass').value;
            const name = document.getElementById('auth-name').value;
            const isLogin = document.getElementById('auth-submit-btn').textContent === "Login";
            let res = isLogin ? await supabase.auth.signInWithPassword({ email, password: pass }) : await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
            if (res.error) alert(res.error.message); else VanguardOS.handleReplyClick();
        },
        submitReply: async (e) => {
            e.preventDefault();
            const { data: { session } } = await supabase.auth.getSession();
            const { error } = await supabase.from('Blogreplies').insert([{
                post_id: currentPostId, uuid: session.user.id,
                full_name: document.getElementById('reply-name').value,
                email: document.getElementById('reply-email').value,
                message: document.getElementById('reply-text').value
            }]);
            if (error) alert(error.message); else { alert("Signal Transmitted."); VanguardOS.closeModals(); }
        },
        toggleAuthMode: () => {
            const btn = document.getElementById('auth-submit-btn');
            const nameGrp = document.getElementById('name-group');
            if (btn.textContent === "Register") { btn.textContent = "Login"; nameGrp.style.display = 'none'; }
            else { btn.textContent = "Register"; nameGrp.style.display = 'block'; }
        }
    };
})();

document.addEventListener('DOMContentLoaded', VanguardOS.init);
