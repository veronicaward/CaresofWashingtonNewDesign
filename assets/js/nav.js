const hamburger = document.querySelector('.hamburger');
const drawer = document.getElementById('mobile-drawer');
const overlay = document.getElementById('drawer-overlay');
const navList = document.querySelector('.nav-list');

// ===== DRAWER =====

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
});
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

// ===== DESKTOP DROPDOWNS =====

document.querySelectorAll('.has-dropdown .dropdown-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.has-dropdown');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
    });
  }
});

// ===== MOBILE DRAWER SUB-DROPDOWNS =====

document.querySelectorAll('.drawer-dropdown-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.drawer-has-dropdown');
    item.classList.toggle('open');
    btn.setAttribute('aria-expanded', item.classList.contains('open').toString());
  });
});

// ===== PRIORITY NAV =====
// Measures actual item widths so right-aligned (flex-end) nav works correctly.

const NAV_GAP = 4;        // gap between nav items (matches CSS gap: 4px)
const HAMBURGER_W = 72;   // hamburger button width + header gap buffer

function priorityNav() {
  const navItems = Array.from(navList.children);

  if (window.innerWidth <= 768) {
    navItems.forEach(item => item.removeAttribute('data-overflow'));
    hamburger.classList.remove('force-show');
    return;
  }

  // Reset: show all so we can measure their natural widths
  navItems.forEach(item => item.removeAttribute('data-overflow'));
  hamburger.classList.remove('force-show');

  // Sum of all item widths + gaps
  const totalItemWidth = navItems.reduce((sum, item, i) =>
    sum + item.getBoundingClientRect().width + (i > 0 ? NAV_GAP : 0), 0);

  const available = navList.clientWidth;

  if (totalItemWidth <= available) return; // everything fits — no hamburger needed

  // Items don't all fit; account for hamburger space and hide from right to left
  const budget = available - HAMBURGER_W;
  let remaining = totalItemWidth;

  for (let i = navItems.length - 1; i >= 0 && remaining > budget; i--) {
    remaining -= navItems[i].getBoundingClientRect().width + NAV_GAP;
    navItems[i].setAttribute('data-overflow', '');
  }

  hamburger.classList.add('force-show');
}

priorityNav();
new ResizeObserver(priorityNav).observe(document.querySelector('.header-inner'));
