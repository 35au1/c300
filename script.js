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
            "name": "Eettah",
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
