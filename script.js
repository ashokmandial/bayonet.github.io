/* ============================================================
   Bayonet Technologies – Main Script
   ============================================================ */

/* ---------- Mobile Menu ---------- */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');
const menuIconOpen  = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

function toggleMobileMenu(force) {
  const isOpen = mobileMenu.classList.contains('open');
  const open   = force !== undefined ? force : !isOpen;
  mobileMenu.classList.toggle('open', open);
  mobileMenuBtn.setAttribute('aria-expanded', open);
  if (menuIconOpen)  menuIconOpen.classList.toggle('hidden', open);
  if (menuIconClose) menuIconClose.classList.toggle('hidden', !open);
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
}

// Close mobile menu when any link is clicked
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    toggleMobileMenu(false);
  }
});

/* ---------- Smooth Scrolling ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href   = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Navbar: scroll shadow + active link ---------- */
const navbar   = document.getElementById('navbar');
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function onScroll() {
  // Navbar shadow
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }

  // Active nav link (scroll-spy)
  const scrollMid = window.scrollY + window.innerHeight / 3;
  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollMid) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
  });

  // Back-to-top visibility
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Back To Top ---------- */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Scroll-reveal (IntersectionObserver) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Contact Form ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate async; wire up real backend/EmailJS here
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1200);
  });
}


// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  if (themeToggleBtn) {
    // Set initial icon state
    if (document.documentElement.classList.contains('light-mode')) {
      themeIconDark.classList.remove('hidden');
      themeIconLight.classList.add('hidden');
    } else {
      themeIconDark.classList.add('hidden');
      themeIconLight.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      
      if (document.documentElement.classList.contains('light-mode')) {
        localStorage.theme = 'light';
        themeIconDark.classList.remove('hidden');
        themeIconLight.classList.add('hidden');
      } else {
        localStorage.theme = 'dark';
        themeIconDark.classList.add('hidden');
        themeIconLight.classList.remove('hidden');
      }
    });
  }
});

