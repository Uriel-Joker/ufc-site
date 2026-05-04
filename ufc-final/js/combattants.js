// ═══════════════════════════════════════════
//  FIGHTER SEARCH & FILTER
// ═══════════════════════════════════════════
const searchInput = document.getElementById('fighter-search');
const filterBtns  = document.querySelectorAll('.filter-btn');
const cards       = document.querySelectorAll('.fighter-card');
const noResults   = document.getElementById('no-results');

let activeFilter = 'all';

function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const name     = card.dataset.name || '';
    const category = card.dataset.category || '';
    const matchesSearch = name.includes(query);
    const matchesFilter = activeFilter === 'all' || category === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  noResults.classList.toggle('show', visible === 0);
}

searchInput.addEventListener('input', applyFilters);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

// ═══════════════════════════════════════════
//  LIGHTBOX
// ═══════════════════════════════════════════
const overlay   = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

const triggers = Array.from(document.querySelectorAll('.lb-trigger'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const trigger = triggers[index];
  lbImg.src     = trigger.src;
  lbImg.alt     = trigger.alt;
  lbCaption.textContent = trigger.dataset.caption || trigger.alt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function showNext() {
  openLightbox((currentIndex + 1) % triggers.length);
}

function showPrev() {
  openLightbox((currentIndex - 1 + triggers.length) % triggers.length);
}

triggers.forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

// Close on overlay click
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  showNext();
  if (e.key === 'ArrowLeft')   showPrev();
});
