const guide = document.querySelector('.zedu-guide');
const bubble = document.querySelector('#guide-bubble');
const mascot = document.querySelector('.mascot-button');
const socials = document.querySelector('#socials');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let invitationTimer;
let highlightTimer;
let footerIsVisible = false;

// Storage is optional: the invitation works in browsers that disable it.
function readPreference(key) {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function savePreference(key, value) {
  try { sessionStorage.setItem(key, value); } catch { /* No storage needed. */ }
}

function openInvitation(announce = false) {
  clearTimeout(invitationTimer);
  if (footerIsVisible) return;
  bubble.hidden = false;
  mascot.setAttribute('aria-expanded', 'true');
  if (announce) {
    document.querySelector('#guide-announcement').textContent = 'Zedu says hello! Use the Let’s say hi link to visit our social links in the footer.';
  }
}

function closeInvitation(remember = false, restoreFocus = false) {
  clearTimeout(invitationTimer);
  bubble.hidden = true;
  mascot.setAttribute('aria-expanded', 'false');
  document.querySelector('#guide-announcement').textContent = '';
  if (remember) savePreference('zedu-invitation-dismissed', 'yes');
  if (restoreFocus) mascot.focus({ preventScroll: true });
}

mascot.addEventListener('click', () => {
  if (bubble.hidden) openInvitation();
  else closeInvitation(false);
});
document.querySelector('.guide-dismiss').addEventListener('click', () => closeInvitation(true, true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !bubble.hidden) {
    const focusWasInside = guide.contains(document.activeElement);
    closeInvitation(true, focusWasInside);
  }
});

document.querySelectorAll('.about-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    setMenuOpen(false);
    if (footerIsVisible) {
      document.querySelector('#main').scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth' });
      invitationTimer = setTimeout(() => openInvitation(true), reduceMotion.matches ? 60 : 700);
    } else openInvitation(true);
  });
});

document.querySelector('.guide-cta').addEventListener('click', event => {
  event.preventDefault();
  closeInvitation(true);
  // Focus the destination before the smooth scroll, without a second jump.
  socials.focus({ preventScroll: true });
  socials.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'center' });
  socials.classList.remove('is-highlighted');
  requestAnimationFrame(() => socials.classList.add('is-highlighted'));
  document.querySelector('.social-arrival').textContent = 'You made it! Pick a platform and say hi. ✦';
  clearTimeout(highlightTimer);
  highlightTimer = setTimeout(() => socials.classList.remove('is-highlighted'), 6000);
});

if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    footerIsVisible = entries[0].isIntersecting;
    // Never hide a keyboard-focused control. Once focus moves to the footer,
    // the floating guide can safely disappear.
    const guideHasFocus = guide.contains(document.activeElement);
    document.body.classList.toggle('guide-is-near-footer', footerIsVisible && !guideHasFocus);
    if (footerIsVisible && !guideHasFocus) closeInvitation();
  }, { threshold: 0.12 }).observe(socials);
  guide.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (footerIsVisible && !guide.contains(document.activeElement)) {
        document.body.classList.add('guide-is-near-footer');
        closeInvitation();
      }
    });
  });
}

// A small, once-per-tab hello. Clicking About or the icon always opens it again.
if (!readPreference('zedu-invitation-dismissed')) {
  invitationTimer = setTimeout(() => openInvitation(), 1400);
}

const menuButton = document.querySelector('.mobile-menu');
const navigation = document.querySelector('.navigation');
function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
}
menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  document.querySelectorAll('.nav-dropdown[open]').forEach(dropdown => {
    if (!dropdown.contains(event.target)) dropdown.open = false;
  });
});

// The original newsletter service is not included here. Avoid collecting
// or pretending to save emails in this static reproduction.
document.querySelector('.newsletter').addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('.newsletter-status');
  status.replaceChildren();
  status.append('Newsletter signup is available on ');
  const officialLink = document.createElement('a');
  officialLink.href = 'https://zedu.chat/';
  officialLink.textContent = 'zedu.chat';
  officialLink.style.textDecoration = 'underline';
  status.append(officialLink, '. Your email has not been submitted here.');
  status.hidden = false;
});
