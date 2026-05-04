// ═══════════════════════════════════════════
//  MENU TOGGLE
// ═══════════════════════════════════════════
const toggle = document.getElementById('menu-toggle');
const menu   = document.querySelector('.nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();      // empêche toute navigation
    e.stopPropagation();     // empêche la propagation vers le lien parent
    menu.classList.toggle('active');
  });
  // Fermer le menu quand on clique sur un lien
  menu.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => menu.classList.remove('active'))
  );
  // Fermer le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== toggle) {
      menu.classList.remove('active');
    }
  });
}

// ═══════════════════════════════════════════
//  ACTIVE NAV LINK
// ═══════════════════════════════════════════
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === page) link.classList.add('active');
});

// ═══════════════════════════════════════════
//  THEME TOGGLE
// ═══════════════════════════════════════════
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ═══════════════════════════════════════════
//  INTERSECTION OBSERVER (scroll-anim + timeline)
// ═══════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.scroll-anim, .timeline-item').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════
//  PROGRESS BAR
// ═══════════════════════════════════════════
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop;
    const h   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (h > 0 ? (top / h) * 100 : 0) + '%';
  }, { passive: true });
}

// ═══════════════════════════════════════════
//  BACK TO TOP
// ═══════════════════════════════════════════
const backTop = document.getElementById('back-to-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ═══════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════
function animateCounter(el, target, duration = 1800, suffix = '') {
  let start = null;
  const startVal = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out expo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(eased * (target - startVal) + startVal);
    el.textContent = current.toLocaleString('fr-FR') + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('fr-FR') + suffix;
  }
  requestAnimationFrame(step);
}

// Trigger counters when visible
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, 2000, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.counter-num[data-target]').forEach(el => counterObserver.observe(el));

// ═══════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════
const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.top  = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  }, { passive: true });

  const hoverTargets = 'a, button, .fighter-card, .feature-card, .founder-card, .stat-card, .category-card, .form-submit, .filter-btn, .lb-trigger';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.8)';
      cursor.style.opacity   = '0.45';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity   = '1';
    });
  });
} else if (cursor) {
  cursor.style.display = 'none';
}
