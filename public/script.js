// ============================================
// THEME TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// MATRIX RAIN ANIMATION (Background)
// ============================================

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentTheme = html.getAttribute('data-theme');
    ctx.fillStyle = currentTheme === 'dark' ? '#00ff88' : '#00cc6a';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// TYPING ANIMATION (Hero Section)
// ============================================

const typingText = document.querySelector('.typing-text');
if (typingText) {
    const phrases = [
        'whoami',
        'cat /etc/passwd',
        'nmap -sV target.com',
        'python exploit.py',
        'nano ./contact-me.txt'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// INTERSECTION OBSERVER (Fade-in animations)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Animate stats counter
            if (entry.target.classList.contains('stat-card')) {
                animateValue(entry.target.querySelector('.stat-value'));
            }
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('.about-content, .skill-category, .project-card, .blog-card, .contact-text').forEach(el => {
    observer.observe(el);
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

function animateValue(element) {
    if (!element) return;
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ============================================
// PARALLAX EFFECT ON MOUSE MOVE
// ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    // Move orbs based on mouse position
    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================
// PROJECT CARDS SUBTLE TILT EFFECT
// ============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(15px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0)';
    });
});

// ============================================
// SKILL BADGES ANIMATION
// ============================================

document.querySelectorAll('.skill-badge').forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.05}s`;
});

// ============================================
// CTA BUTTONS GLOW EFFECT
// ============================================

document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--accent);
    `;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KONAMI CODE EASTER EGG
// ============================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎉 Konami Code activated! You found the easter egg!');
    }, 2000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#mainContent';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent);
    color: var(--bg-primary);
    padding: 0.5rem 1rem;
    text-decoration: none;
    z-index: 10000;
    border-radius: 0 0 8px 0;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #00ff88; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #a0a0a8;');
console.log('%chttps://github.com/TimDcmtr', 'font-size: 14px; color: #00d4ff;');
console.log('%c\nLooking for vulnerabilities? 😏', 'font-size: 12px; color: #ff00ff;');
console.log('%cGood luck! This portfolio was built with security in mind.', 'font-size: 11px; color: #a0a0a8;');

// ============================================
// INITIALIZATION
// ============================================

console.log('✅ Portfolio initialized successfully');
console.log(`🎨 Theme: ${savedTheme}`);
console.log('🚀 All animations loaded');
console.log('🛡️ OPSEC mode: ON');