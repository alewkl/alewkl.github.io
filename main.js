/* ===========================
   WINKLER DEVELOP — main.js
   =========================== */

// ── Year footer ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar: scroll glass effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Terminal typing animation ─────────────────────────────────
const lines = [
  { cmd: 'whoami',            outputs: ['→ Winkler Develop', '→ Full-Stack Developer'] },
  { cmd: 'cat banner.txt',    outputs: ['  ╔══════════════╗', '  ║   </ WD >  ✦ ║', '  ╚══════════════╝'] },
  { cmd: 'ls ./skills',       outputs: ['HTML  CSS  JS  React', 'Node  Python  Git  Figma'] },
  { cmd: 'deploy --prod',     outputs: ['  ▓▓▓▓▓░░░░░  50%', '  ▓▓▓▓▓▓▓▓▓▓ 100%', '  ✦ shipped!'] },
  { cmd: 'git log --oneline', outputs: ['a1b2c3 feat: new project deployed', 'd4e5f6 fix: performance boost'] },
];

let lineIndex  = 0;
let charIndex  = 0;
let outIndex   = 0;
let isDeleting = false;
let isWaiting  = false;

const cmdEl  = document.getElementById('typed-cmd');
const out1   = document.getElementById('t-output-1');
const out2   = document.getElementById('t-output-2');
const out3   = document.getElementById('t-output-3');

function clearOutputs() {
  out1.textContent = '';
  out2.textContent = '';
  out3.textContent = '';
  outIndex = 0;
}

function showOutputs(outputs) {
  const targets = [out2, out3];
  out1.textContent = '';
  targets[0].textContent = '';
  targets[1].textContent = '';

  let i = 0;
  const show = () => {
    if (i < outputs.length) {
      const el = i === 0 ? out1 : targets[i - 1];
      el.textContent = outputs[i];
      i++;
      setTimeout(show, 280);
    }
  };
  show();
}

function typeLoop() {
  const current = lines[lineIndex];
  const full    = current.cmd;

  if (isWaiting) return;

  if (!isDeleting && charIndex <= full.length) {
    cmdEl.textContent = full.slice(0, charIndex);
    charIndex++;
    if (charIndex === full.length + 1) {
      isWaiting = true;
      showOutputs(current.outputs);
      setTimeout(() => {
        isWaiting  = false;
        isDeleting = true;
        typeLoop();
      }, 2800);
      return;
    }
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    cmdEl.textContent = full.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      clearOutputs();
      lineIndex  = (lineIndex + 1) % lines.length;
      setTimeout(typeLoop, 400);
      return;
    }
  }

  const speed = isDeleting ? 40 : 90;
  setTimeout(typeLoop, speed);
}

typeLoop();

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.about-grid, .service-card, .stack-item, .project-card, .contact-inner, .section-label, .section-title'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 60}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Contact form ──────────────────────────────────────────────
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    setStatus('Por favor, completa todos los campos.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    setStatus('Ingresa un email válido.', 'error');
    return;
  }

  // Simulate sending (replace with real endpoint / EmailJS / Formspree)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  await new Promise(r => setTimeout(r, 1200));

  setStatus('¡Mensaje enviado! Te responderé pronto.', 'success');
  form.reset();
  btn.disabled = false;
  btn.textContent = 'Enviar mensaje';
});

function setStatus(msg, type) {
  status.textContent = msg;
  status.className = `form-status ${type}`;
  setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Stack tooltip (visual only, CSS handles position) ─────────
// Tooltips are rendered via CSS data-tip attribute — no extra JS needed.
