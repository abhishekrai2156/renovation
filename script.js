// ============================================
//  ConstrucnovaLLC – Premium Website Script
// ============================================

// ---------- NAVBAR SCROLL ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});
// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---------- COUNTER ANIMATION ----------
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const countersStarted = { done: false };
function startCounters() {
  if (countersStarted.done) return;
  countersStarted.done = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    animateCounter(el, target);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) startCounters(); });
}, { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ---------- SCROLL REVEAL ----------
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ---------- ADD REVEAL CLASSES ----------
document.querySelectorAll('.service-card, .wu-card, .review-card, .qc-left, .qc-form, .section-header').forEach(el => {
  if (!el.classList.contains('reveal')) el.classList.add('reveal');
});
reveals.forEach(el => revealObserver.observe(el));

// ---------- BEFORE & AFTER SLIDER ----------
function initSlider(index) {
  const container = document.getElementById(`baContainer${index}`);
  const before = document.getElementById(`baBefore${index}`);
  const handle = document.getElementById(`baHandle${index}`);
  if (!container || !before || !handle) return;

  let isDragging = false;
  let pct = 50;

  function setPosition(x) {
    const rect = container.getBoundingClientRect();
    pct = Math.max(3, Math.min(97, ((x - rect.left) / rect.width) * 100));
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  container.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); });
  window.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
}

[0, 1, 2].forEach(i => initSlider(i));

function switchBA(index, btn) {
  document.querySelectorAll('.ba-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ba-slider').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`ba-${index}`).classList.add('active');
}

// ---------- CONTACT FORM ----------
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');

  btnText.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    document.getElementById('contactForm').reset();
  }, 1600);
}

// ---------- SMOOTH ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeObserver.observe(s));

// ---------- PARALLAX HERO ----------
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) hero.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
});

// ---------- ENTRANCE ANIMATION TRIGGER ----------
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
