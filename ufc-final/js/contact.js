// ═══════════════════════════════════════════
//  CONTACT FORM — connecté à Formspree
//  Email de réception : adabraemmanueluriel@gmail.com
// ═══════════════════════════════════════════
const FORMSPREE_URL = 'https://formspree.io/f/mlgzgzap';

const submitBtn = document.getElementById('form-submit');
const toast     = document.getElementById('toast');

function showToast(message, isError = false) {
  toast.textContent        = message;
  toast.style.background   = isError ? '#3a1a1a' : '#1a3a1a';
  toast.style.borderColor  = isError ? '#6a2d2d' : '#2d6a2d';
  toast.style.color        = isError ? '#e87e7e' : '#7ec87e';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function validate() {
  const prenom  = document.getElementById('f-prenom').value.trim();
  const nom     = document.getElementById('f-nom').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const sujet   = document.getElementById('f-sujet').value;
  const message = document.getElementById('f-message').value.trim();

  if (!prenom || !nom) {
    showToast('⚠️ Veuillez entrer votre prénom et nom.', true);
    return null;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Veuillez entrer une adresse email valide.', true);
    return null;
  }
  if (!sujet) {
    showToast('⚠️ Veuillez choisir un sujet.', true);
    return null;
  }
  if (message.length < 10) {
    showToast('⚠️ Le message doit contenir au moins 10 caractères.', true);
    return null;
  }

  return { prenom, nom, email, sujet, message };
}

submitBtn.addEventListener('click', async () => {
  const data = validate();
  if (!data) return;

  // UI : chargement
  submitBtn.textContent = '⏳ Envoi en cours...';
  submitBtn.disabled    = true;

  try {
    const response = await fetch(FORMSPREE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        prenom:  data.prenom,
        nom:     data.nom,
        email:   data.email,
        sujet:   data.sujet,
        message: data.message,
        _subject: `[Site UFC] ${data.sujet} — ${data.prenom} ${data.nom}`
      })
    });

    if (response.ok) {
      // ✅ SUCCÈS — email envoyé à adabraemmanueluriel@gmail.com
      showToast('✅ Message envoyé ! Tu recevras une réponse bientôt.');
      // Vider le formulaire
      ['f-prenom', 'f-nom', 'f-email', 'f-message'].forEach(id => {
        document.getElementById(id).value = '';
      });
      document.getElementById('f-sujet').selectedIndex = 0;
    } else {
      const result = await response.json();
      const msg = result?.errors?.[0]?.message || 'Erreur inconnue.';
      showToast('❌ Erreur : ' + msg, true);
    }
  } catch (err) {
    showToast('❌ Connexion impossible. Vérifie ta connexion internet.', true);
  } finally {
    submitBtn.textContent = 'Envoyer le message ✈️';
    submitBtn.disabled    = false;
  }
});
