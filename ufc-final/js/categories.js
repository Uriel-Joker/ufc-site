// ═══════════════════════════════════════════
//  GENDER TABS
// ═══════════════════════════════════════════
const genderTabs  = document.querySelectorAll('.gender-tab');
const gridHommes  = document.getElementById('grid-hommes');
const gridFemmes  = document.getElementById('grid-femmes');

genderTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    genderTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (tab.dataset.gender === 'hommes') {
      gridHommes.style.display = 'grid';
      gridFemmes.style.display = 'none';
    } else {
      gridHommes.style.display = 'none';
      gridFemmes.style.display = 'grid';
    }
  });
});
