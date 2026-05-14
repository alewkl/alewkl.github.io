// ==========================================
// TYPEWRITER EFFECT - Multiple texts rotating
// ==========================================
class Typewriter {
    constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        this.type();
    }
}

// ==========================================
// SCROLL ANIMATIONS - Fade in on scroll
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// ==========================================
// COUNTER ANIMATION - Number count up
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// ==========================================
// SMOOTH SCROLL for navigation links
// ==========================================
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

// ==========================================
// NAVBAR SCROLL EFFECT - Add shadow on scroll
// ==========================================
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// PARALLAX EFFECT for sections
// ==========================================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ==========================================
// TYPING STATISTICS ANIMATION
// ==========================================
function initStatsAnimation() {
    const statsElements = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(el => statsObserver.observe(el));
}

// ==========================================
// CARD HOVER 3D EFFECT
// ==========================================
document.querySelectorAll('.skill-cell, .contact-card, .skill-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==========================================
// TYPING EFFECT FOR SUBTITLES
// ==========================================
function typeSubtitle(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter effect for main heading
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const texts = [
            'Building Modern',
            'Architecting Solutions',
            'Developing Excellence',
            'Creating Innovation'
        ];
        const typewriter = new Typewriter(typewriterElement, texts, 120, 60, 2000);
        setTimeout(() => typewriter.start(), 500);
    }

    // Initialize subtitle typing effect
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const subtitleText = subtitle.textContent;
        setTimeout(() => {
            typeSubtitle(subtitle, subtitleText, 30);
        }, 4000);
    }

    // Initialize scroll animations
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // Initialize statistics animation
    initStatsAnimation();

    // Add loading animation complete
    document.body.classList.add('loaded');
});

// ==========================================
// CURSOR CUSTOM EFFECT (Optional - Professional)
// ==========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX / 10;
    followerY += distY / 10;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor interactions with links and buttons
document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// ==========================================
// FORM VALIDATION AND ANIMATION
// ==========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add success animation
        contactForm.classList.add('form-submitted');

        setTimeout(() => {
            alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
            contactForm.reset();
            contactForm.classList.remove('form-submitted');
        }, 500);
    });

    // Input focus animations
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
}

// ==========================================
// PARTICLE BACKGROUND EFFECT (Subtle)
// ==========================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();
