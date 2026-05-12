/**
 * VANGUARD_OS SYSTEM LOGIC
 */
const VanguardOS = (() => {
    const supabaseUrl = 'https://dvyjupytbwbrcoyouxpf.supabase.co';
    const supabaseKey = 'sb_publishable_wjgbPekKmodd5mSDXIeUeg_Wq73GzOk';
    let supabase = null;
    if (window.supabase) supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let currentPostId = null;

    const openBlogModal = (title, content, id) => {
        currentPostId = id;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-content').innerHTML = content;
        document.getElementById('blog-modal').style.display = 'flex';
    };

    const closeModals = () => document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        closeModals();
        document.getElementById('share-confirm-modal').style.display = 'flex';
    };

    const handleReplyClick = async () => {
        if (!supabase) return;
        const { data: { session } } = await supabase.auth.getSession();
        closeModals();
        if (session) {
            // Pre-fill fields if signed in
            document.getElementById('reply-name').value = session.user.user_metadata.full_name || '';
            document.getElementById('reply-email').value = session.user.email || '';
            document.getElementById('reply-modal').style.display = 'flex';
        } else {
            document.getElementById('auth-modal').style.display = 'flex';
        }
    };

    const submitAuth = async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-pass').value;
        const name = document.getElementById('auth-name').value;
        const isLogin = document.getElementById('auth-submit-btn').textContent === "Login";
        let res = isLogin ? await supabase.auth.signInWithPassword({ email, password: pass }) : await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
        if (res.error) alert(res.error.message);
        else handleReplyClick(); // Open reply window after auth
    };

    const submitReply = async (e) => {
        e.preventDefault();
        const { data: { session } } = await supabase.auth.getSession();
        const { error } = await supabase.from('Blogreplies').insert([{
            post_id: currentPostId,
            uuid: session.user.id,
            full_name: document.getElementById('reply-name').value,
            email: document.getElementById('reply-email').value,
            message: document.getElementById('reply-text').value
        }]);
        if (error) alert(error.message);
        else { alert("Signal Transmitted."); closeModals(); }
    };

    const toggleAuthMode = () => {
        const btn = document.getElementById('auth-submit-btn');
        const nameGrp = document.getElementById('name-group');
        if (btn.textContent === "Register") { btn.textContent = "Login"; nameGrp.style.display = 'none'; }
        else { btn.textContent = "Register"; nameGrp.style.display = 'block'; }
    };

    // ... setupStarfield and renderApps logic remains the same ...

    return { openBlogModal, closeModals, handleShare, handleReplyClick, submitAuth, submitReply, toggleAuthMode, init: () => { /* init logic */ } };
})();
