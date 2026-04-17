// Members data
const membersData = {
    "members": [
        {
            "name": "Luke",
            "discord": "lukeplg",
            "avatar": "luke.jpg"
        },
        {
            "name": "Cera",
            "discord": "ceraeor",
            "avatar": "cera.jpg"
        },
        {
            "name": "Danny",
            "discord": "dannynhe",
            "avatar": "danny.jpg"
        },
        {
            "name": "Cadaver",
            "discord": "cadaver_die",
            "avatar": "cadaver.jpg"
        },
        {
            "name": "Eattah",
            "discord": "shadowcompany93",
            "avatar": "eettah.jpg"
        },
        {
            "name": "Abus",
            "discord": "abus_e",
            "avatar": "abus.jpg"
        },
        {
            "name": "Kody",
            "discord": "_________sudo__________",
            "avatar": "kody.jpg"
        },
        {
            "name": "Ferdek",
            "discord": "ferdek69",
            "avatar": "ferdek.jpg"
        }
    ]
};

// Load members data and render cards
function loadMembers() {
    renderMembers(membersData.members);
}

function renderMembers(members) {
    const grid = document.getElementById('membersGrid');
    
    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-discord">${member.discord}</p>
        `;
        
        grid.appendChild(card);
    });
    
    observeElements();
}

// Intersection Observer for scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in, .member-card').forEach(el => {
        observer.observe(el);
    });
}

// Parallax background effect on scroll
let lastScrollY = window.scrollY;
let bgImage;

function updateBackground() {
    if (!bgImage) {
        bgImage = document.querySelector('.bg-image');
        if (!bgImage) return;
    }
    
    const scrollY = window.scrollY;
    const scrollSpeed = scrollY - lastScrollY;
    
    // Scale and move effect
    const scale = 1 + (scrollY * 0.0003);
    const opacity = Math.max(0.2, 0.4 - (scrollY * 0.0001));
    const translateY = scrollY * 0.5;
    
    bgImage.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    bgImage.style.opacity = opacity;
    
    lastScrollY = scrollY;
    requestAnimationFrame(updateBackground);
}

// Smooth scroll reveal on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 100);
});

// Matrix rain effect
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#4a0e4e';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    updateBackground();
    initMatrix();
    // showAnnouncementModal(); // Uncomment to enable announcement modal
});

// Announcement Modal
function showAnnouncementModal() {
    const modal = document.getElementById('announcementModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) return;
    
    // Show modal on page load
    modal.style.display = 'block';
    
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking X
    closeBtn.onclick = closeModal;
    
    // Close modal when clicking outside of it
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.bg-image');
    if (!bg) return;
    
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    bg.style.transform += ` translate(${moveX}px, ${moveY}px)`;
});

// ===== Gallery Popup — reads from master Gist =====

const MASTER_GIST_ID = 'a67bbfa0a2254bbf4f6567e3a4f94bf0';
const INDEX_FILENAME = 'gallery-index.json';

async function initGalleryPopup() {
    const overlay       = document.getElementById('galleryPopup');
    const closeBtn      = document.getElementById('galleryPopupClose');
    const img           = document.getElementById('galleryPopupImg');
    const desc          = document.getElementById('galleryPopupDesc');
    const dotsContainer = document.getElementById('galleryDots');
    const prevBtn       = document.getElementById('galleryPrev');
    const nextBtn       = document.getElementById('galleryNext');

    let images  = [];
    let current = 0;

    // ── Load images from Gist index ──────────────────────────
    try {
        // Use raw URL to avoid API rate limits (no auth needed)
        const rawUrl = `https://gist.githubusercontent.com/35au1/${MASTER_GIST_ID}/raw/${INDEX_FILENAME}`;
        const indexRes  = await fetch(rawUrl);
        if (!indexRes.ok) throw new Error(`HTTP ${indexRes.status}`);
        const ids = await indexRes.json();
        if (!Array.isArray(ids) || ids.length === 0) throw new Error('empty');

        const results = await Promise.allSettled(ids.slice().reverse().map(id => fetchImageGist(id)));
        images = results
            .filter(r => r.status === 'fulfilled' && r.value)
            .map(r => r.value);
    } catch (e) {
        if (e.message !== 'empty' && e.message !== 'index not found') {
            console.warn('Gallery load error:', e.message);
        }
    }

    if (images.length === 0) return;

    // ── Dots ─────────────────────────────────────────────────
    function buildDots() {
        dotsContainer.innerHTML = '';
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === current ? ' active' : '');
            dot.setAttribute('aria-label', `Go to image ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function goTo(index) {
        current = (index + images.length) % images.length;
        img.classList.add('fade-swap');
        setTimeout(() => {
            img.src = images[current].src;
            img.alt = images[current].description;
            desc.textContent = images[current].description;
            img.classList.remove('fade-swap');
        }, 200);
        updateDots();
    }

    img.src = images[0].src;
    img.alt = images[0].description;
    desc.textContent = images[0].description;
    buildDots();

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'Escape')     closePopup();
    });

    function closePopup() { overlay.classList.remove('active'); }
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });

    overlay.classList.add('active');
}

// Fetch a single image Gist → { src, description }
async function fetchImageGist(id) {
    // Use API to get file list (needed to find filenames)
    const res  = await fetch(`https://api.github.com/gists/${id}`);
    const data = await res.json();

    const metaFile = data.files && data.files['gallery.json'];
    const meta     = metaFile ? JSON.parse(metaFile.content) : {};

    const b64File  = Object.values(data.files || {}).find(f => f.filename.endsWith('.b64'));
    if (!b64File) return null;

    // Fetch raw b64 content via raw_url to avoid truncation and API limits
    const raw = await fetch(b64File.raw_url);
    const b64 = await raw.text();

    const ext  = b64File.filename.replace('.b64', '').split('.').pop().toLowerCase();
    const mime = { png: 'image/png', gif: 'image/gif', webp: 'image/webp' }[ext] || 'image/jpeg';

    return {
        src: `data:${mime};base64,${b64.trim()}`,
        description: meta.description || data.description || ''
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initGalleryPopup();
});
