const database = {
    packs: [
        {
            id: "alya-v3-16x",
            title: "Alya V3 16x",
            videoId: "LSiNfoeD-s4",
            downloads: { "1.21": "https://www.mediafire.com/file/dlfb0nyi7j2n2nx/%2521_%25C2%25A7bAlya_V3_%252816x%2529.zip/file" }
        },
        {
            id: "chizuru-mizuhara-32x",
            title: "Chizuru Mizuhara 32x",
            videoId: "bj3wkSYdLaQ",
            downloads: { "1.21": "https://www.mediafire.com/file/93jmt66xl9o95ab/%2521_%25C2%25A7dChizuru_Mizuhara_%255B32x%255D.zip/file" }
        },
        {
            id: "furina-512x",
            title: "Furina 512x",
            videoId: "zT-XS6yMCwY",
            downloads: { "1.21": "https://www.mediafire.com/file/ts4m3e8i5ju3pfv/%2521_%25C2%25A7bFurina_%25C2%25A7f%255B512x%255D.zip/file" }
        }
    ]
};

const getThumb = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page');
    if (page === 'home') initHome();
    if (page === 'pack') initPack();
});

function initHome() {
    const hero = document.getElementById('heroSlideshow');
    const grid = document.getElementById('packGridInner');
    
    database.packs.forEach((p, i) => {
        const s = document.createElement('div');
        s.className = `slide ${i === 0 ? 'active' : ''}`;
        s.style.backgroundImage = `url('${getThumb(p.videoId)}')`;
        hero.prepend(s);
    });

    let cur = 0;
    setInterval(() => {
        const slides = document.querySelectorAll('.slide');
        slides[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('active');
    }, 5000);

    renderGrid(database.packs, grid);

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const filtered = database.packs.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase()));
        renderGrid(filtered, grid);
    });
}

function initPack() {
    const id = new URLSearchParams(window.location.search).get('id');
    const pack = database.packs.find(p => p.id === id);
    if (!pack) return;

    document.title = `${pack.title} | Ray Senpai Archive`;
    document.getElementById('packTitle').innerText = pack.title;
    document.getElementById('packHero').style.backgroundImage = `url('${getThumb(pack.videoId)}')`;
    document.getElementById('videoEmbed').innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${pack.videoId}" frameborder="0" allowfullscreen></iframe>`;

    document.getElementById('downloadLinks').innerHTML = Object.entries(pack.downloads).map(([v, url]) => `
        <a href="${url}" target="_blank" class="download-btn">
            <span>Version ${v}</span>
            <img src="https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F1674%2FPNG%2F512%2Fdownload_111133.png&id=111133&pack_or_individual=pack" style="width:20px; filter:invert(1);">
        </a>
    `).join('');

    const moreGrid = document.getElementById('morePacksGrid');
    const recommendations = database.packs.filter(p => p.id !== id);
    renderGrid(recommendations, moreGrid);
}

function renderGrid(data, container) {
    if(!container) return;
    container.innerHTML = data.map(p => `
        <a href="pack.html?id=${p.id}" class="pack-card">
            <img src="${getThumb(p.videoId)}" class="pack-img">
            <div class="pack-info">
                <h3>${p.title}</h3>
                <p style="color:var(--accent); font-weight:700; font-size:0.8rem;">VIEW PACK</p>
            </div>
        </a>
    `).join('');
}