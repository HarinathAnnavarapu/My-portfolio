/**
 * Portfolio Main JavaScript
 * Author: Harinath Annavarapu
 */

// ===================================
// Smooth Scroll Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// Parallax Background Effect
// ===================================
let scrollPos = 0;
window.addEventListener('scroll', () => {
    scrollPos = window.pageYOffset;
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.style.transform = `translateY(${scrollPos * 0.5}px)`;
    }
});

// ===================================
// Dynamic Gradient Animation
// ===================================
const bgAnimation = document.querySelector('.bg-animation');
let hue = 0;
setInterval(() => {
    hue = (hue + 1) % 360;
    if (bgAnimation) {
        bgAnimation.style.filter = `hue-rotate(${hue}deg)`;
    }
}, 100);

// ===================================
// Navbar Background on Scroll
// ===================================
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 1, 24, 0.95)';
        nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 1, 24, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

// ===================================
// Cursor Trail Effect
// ===================================
let dots = [];
const maxDots = 20;

document.addEventListener('mousemove', (e) => {
    // Remove oldest dot if max reached
    if (dots.length >= maxDots) {
        const oldDot = dots.shift();
        oldDot.remove();
    }

    // Create new dot
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '50%';
    dot.style.background = 'var(--primary)';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.pointerEvents = 'none';
    dot.style.opacity = '0.6';
    dot.style.transition = 'all 0.5s ease-out';
    dot.style.zIndex = '9999';
    
    document.body.appendChild(dot);
    dots.push(dot);

    // Animate dot out
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 10);
});

// ===================================
// Typing Effect for Role
// ===================================
const roleText = document.querySelector('.role');
const roles = [
    'Software Architect',
    'Full Stack Developer',
    'Solution Designer',
    'Technical Leader'
];
let currentRole = 0;
let currentChar = 0;
let isDeleting = false;

function typeRole() {
    const current = roles[currentRole];
    
    if (isDeleting) {
        roleText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        roleText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
}

// Start typing effect after initial animation
setTimeout(() => {
    if (roleText) {
        roleText.textContent = '';
        typeRole();
    }
}, 2000);

// ===================================
// Button Click Ripple Effect
// ===================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================================
// Add Ripple Animation CSS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Stats Counter Animation
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue);
            let current = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    target.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
                }
            }, 30);
            
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
statNumbers.forEach(stat => statsObserver.observe(stat));

// ===================================
// Project Card Interactions
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Lazy Loading for Performance
// ===================================
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });

    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        lazyObserver.observe(el);
    });
}

// ===================================
// Active Navigation Link Highlight
// ===================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to my portfolio!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion by Harinath Annavarapu', 'color: #7928ca; font-size: 14px;');
console.log('%cInterested in collaborating? Let\'s connect!', 'color: #ff0080; font-size: 12px;');

// ===================================
// Page Load Performance
// ===================================
window.addEventListener('load', () => {
    console.log('✅ Portfolio loaded successfully!');
    document.body.classList.add('loaded');
});