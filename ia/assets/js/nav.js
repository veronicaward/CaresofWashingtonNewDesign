// ===== SITE CHROME (single source of truth for header, mobile drawer, footer) =====
// Every page loads this file and includes an empty <div data-site-header></div> and
// <div data-site-footer></div>. This function builds and injects the shared markup so
// nav/footer changes only ever need to happen here, not in 20 duplicated HTML files.
(function () {
  // Derive depth from this script's own (unresolved) relative src rather than
  // window.location.pathname — the pathname includes whatever prefix the site
  // is hosted under (e.g. GitHub Pages project + /ia/ subdirectory), which has
  // nothing to do with how deep the current HTML file sits within the site.
  const scriptEl = document.currentScript || document.querySelector('script[src*="nav.js"]');
  const rawSrc = scriptEl.getAttribute('src') || '';
  const depth = (rawSrc.match(/\.\.\//g) || []).length;
  const prefix = '../'.repeat(depth);
  const isHome = depth === 0 && /(\/index\.html|\/)$/.test(window.location.pathname);
  const p = (path) => prefix + path;

  const headerHTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="${p('index.html')}" class="logo" aria-label="Cares of Washington home">
        <img src="${p('assets/cares-logo.webp')}" alt="Cares of Washington" class="logo-img" />
      </a>
      <nav class="desktop-nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li class="has-dropdown">
            <button class="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              For clients <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a href="${p('get-services/index.html')}" role="menuitem">Employment services</a></li>
              <li><a href="${p('earned-income-program.html')}" role="menuitem">Employer services</a></li>
            </ul>
          </li>
          <li class="has-dropdown">
            <button class="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              For partners <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a href="${p('partners/community-partners.html')}" role="menuitem">Community partners</a></li>
              <li><a href="${p('partners/foundation-funders.html')}" role="menuitem">Foundation funders</a></li>
              <li><a href="${p('who-we-serve/index.html')}" role="menuitem">Who we serve</a></li>
            </ul>
          </li>
          <li class="has-dropdown">
            <button class="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              Donate <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a href="${p('give/donate.html')}" role="menuitem">Donate</a></li>
              <li><a href="https://www.cardonationwizard.com/cars-for-charity/donate/donate-a-car-for-charity.html?affilID=Cares%20of%20Washington&affilName=Cares%20of%20Washington&ref=cars-for-charity" role="menuitem" target="_blank" rel="noopener noreferrer" class="external-link">Donate a car <svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a></li>
            </ul>
          </li>
          <li class="has-dropdown">
            <button class="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
              Who we are <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a href="${p('about/who-we-are.html')}" role="menuitem">Our team</a></li>
              <li><a href="${p('impact-stories/index.html')}" role="menuitem">Impact stories</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <div class="drawer-overlay" id="drawer-overlay" aria-hidden="true"></div>
  <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation" aria-hidden="true">
    <ul class="drawer-list">
      ${isHome ? '' : `<li>
        <a href="${p('index.html')}" class="drawer-link">Home</a>
        <span class="drawer-divider" aria-hidden="true"></span>
      </li>`}
      <li class="drawer-has-dropdown">
        <button class="drawer-link drawer-dropdown-trigger" aria-expanded="false">
          For clients <svg class="drawer-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <ul class="drawer-dropdown">
          <li><a href="${p('get-services/index.html')}">Employment services</a></li>
          <li><a href="${p('earned-income-program.html')}">Employer services</a></li>
        </ul>
        <span class="drawer-divider" aria-hidden="true"></span>
      </li>
      <li class="drawer-has-dropdown">
        <button class="drawer-link drawer-dropdown-trigger" aria-expanded="false">
          For partners <svg class="drawer-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <ul class="drawer-dropdown">
          <li><a href="${p('partners/community-partners.html')}">Community partners</a></li>
          <li><a href="${p('partners/foundation-funders.html')}">Foundation funders</a></li>
          <li><a href="${p('who-we-serve/index.html')}">Who we serve</a></li>
        </ul>
        <span class="drawer-divider" aria-hidden="true"></span>
      </li>
      <li class="drawer-has-dropdown">
        <button class="drawer-link drawer-dropdown-trigger" aria-expanded="false">
          Donate <svg class="drawer-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <ul class="drawer-dropdown">
          <li><a href="${p('give/donate.html')}">Donate</a></li>
          <li><a href="https://www.cardonationwizard.com/cars-for-charity/donate/donate-a-car-for-charity.html?affilID=Cares%20of%20Washington&affilName=Cares%20of%20Washington&ref=cars-for-charity" target="_blank" rel="noopener noreferrer" class="external-link">Donate a car <svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a></li>
        </ul>
        <span class="drawer-divider" aria-hidden="true"></span>
      </li>
      <li class="drawer-has-dropdown">
        <button class="drawer-link drawer-dropdown-trigger" aria-expanded="false">
          Who we are <svg class="drawer-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <ul class="drawer-dropdown">
          <li><a href="${p('about/who-we-are.html')}">Our team</a></li>
          <li><a href="${p('impact-stories/index.html')}">Impact stories</a></li>
        </ul>
        <span class="drawer-divider" aria-hidden="true"></span>
      </li>
    </ul>
    <div class="drawer-footer">
      <a href="${p('get-services/index.html')}" class="btn btn-primary btn-full">Service overview</a>
    </div>
  </nav>`;

  const footerHTML = `
  <footer class="site-footer site-footer-home">
    <div class="footer-home-inner">
      <div class="footer-home-col">
        <p class="footer-home-label">Location</p>
        <p class="footer-home-value">
          <a href="https://www.google.com/maps/search/?api=1&query=1833+N+105th+St+Suite+202%2C+Seattle%2C+WA+98133" target="_blank" rel="noopener noreferrer">
            1833 N 105th St Suite 202<br>Seattle, WA 98133
          </a>
        </p>
      </div>
      <div class="footer-home-col">
        <p class="footer-home-label">Contact cares</p>
        <p class="footer-home-value">Phone &nbsp;<a href="tel:+12069381253">(206) 938-1253</a></p>
        <p class="footer-home-value">Email &nbsp;<a href="mailto:admin@caresofwa.org">admin@caresofwa.org</a></p>
      </div>
      <div class="footer-home-col">
        <p class="footer-home-label">Hours</p>
        <p class="footer-home-value">Monday – Friday<br>8AM – 5PM</p>
      </div>
      <nav class="footer-home-col footer-home-links" aria-label="Footer navigation">
        <a href="https://www.indeed.com/cmp/Cares-of-Washington/jobs" target="_blank" rel="noopener noreferrer">Careers</a>
        <a href="${p('about/privacy-policy.html')}">Privacy Policy</a>
        <a href="${p('about/blog.html')}">Blog</a>
      </nav>
      <div class="footer-home-carf">
        <img src="${p('assets/logo-carf.webp')}" alt="CARF Accredited" />
      </div>
    </div>
  </footer>`;

  const headerRoot = document.querySelector('[data-site-header]');
  const footerRoot = document.querySelector('[data-site-footer]');
  if (headerRoot) headerRoot.outerHTML = headerHTML;
  if (footerRoot) footerRoot.outerHTML = footerHTML;
})();

// ===== EVERYTHING BELOW RUNS AGAINST THE INJECTED CHROME =====

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

// ===== ACTIVE NAV HIGHLIGHTING =====
// Highlights the top-level nav item matching the current page's section.
// Scans the full path (not just the first segment) so this also works when
// the site is opened via file:// or from a nested/proxied path.
(function () {
  const segments = window.location.pathname.split('/').filter(Boolean);

  const dirToCategory = {
    'get-services': 'get-services',
    'partners': 'partners',
    'who-we-serve': 'partners',
    'give': 'donate',
    'about': 'who-we-are',
    'impact-stories': 'who-we-are',
  };
  let category = null;
  for (const seg of segments) {
    if (dirToCategory[seg]) { category = dirToCategory[seg]; break; }
  }
  if (!category) return;

  const hrefHints = {
    'get-services': ['get-services'],
    partners: ['community-partners', 'foundation-funders', 'who-we-serve', 'become-a-partner'],
    donate: ['give/donate'],
    'who-we-are': ['who-we-are.html', 'impact-stories'],
  };

  function markActive(root) {
    if (!root) return;

    const hints = hrefHints[category];
    root.querySelectorAll('.has-dropdown, .drawer-has-dropdown').forEach(item => {
      const menu = item.querySelector('.dropdown-menu, .drawer-dropdown');
      if (!menu) return;
      const match = Array.from(menu.querySelectorAll('a[href]')).some(a =>
        hints.some(h => a.getAttribute('href').includes(h))
      );
      if (match) {
        const trigger = item.querySelector('.dropdown-trigger, .drawer-dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
    });
  }

  markActive(document.querySelector('.desktop-nav'));
  markActive(document.getElementById('mobile-drawer'));
})();

// ===== CONFIRMATION TOAST =====
if (sessionStorage.getItem('cares_message_sent')) {
  sessionStorage.removeItem('cares_message_sent');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-inner">
      <div class="toast-body">
        <p>Your message was sent! Someone from Cares will respond to you within 1–2 business days.</p>
      </div>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    </div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-show'));
  });
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('toast-show');
    toast.addEventListener('transitionend', () => toast.remove());
  });
}

if (sessionStorage.getItem('cares_applied')) {
  sessionStorage.removeItem('cares_applied');
  const applyUrl = sessionStorage.getItem('cares_apply_url') || '';
  sessionStorage.removeItem('cares_apply_url');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-inner">
      <div class="toast-body">
        <p>Your application was successfully submitted. You'll receive an automated confirmation email. Someone from Cares will be in touch with you in 3–5 business days.</p>
        ${applyUrl ? `<a class="toast-edit" href="${applyUrl}">Edit application</a>` : ''}
      </div>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    </div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-show'));
  });
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('toast-show');
    toast.addEventListener('transitionend', () => toast.remove());
  });
}
