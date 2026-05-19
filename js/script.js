/* ============================================================
   EduTech & SkillsTech RC — Main Script
   ============================================================ */

// ---- Navbar scroll behaviour ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ---- Mobile hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Back to top ----
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active-link', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ---- Animate counters when highlights section is visible ----
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const countersDone = new Set();

const highlightObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(el => {
        if (!countersDone.has(el)) {
          countersDone.add(el);
          animateCounter(el);
        }
      });
    }
  });
}, { threshold: 0.2 });

const highlightsSection = document.getElementById('highlights');
if (highlightsSection) highlightObserver.observe(highlightsSection);

// ---- Fade-in on scroll ----
const fadeEls = document.querySelectorAll(
  '.highlight-card, .event-card, .pub-card, .project-card, ' +
  '.ip-card, .asset-card, .brochure-card, .member-card, .about-text, .about-image-block'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ---- Events filter ----
const filterBtns  = document.querySelectorAll('.filter-btn');
const eventItems  = document.querySelectorAll('.event-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    eventItems.forEach(item => {
      const match = filter === 'all' || item.getAttribute('data-type') === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

// ---- Publications tabs ----
const pubTabs    = document.querySelectorAll('.pub-tab');
const pubContents = document.querySelectorAll('.pub-content');

pubTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    pubTabs.forEach(t => t.classList.remove('active'));
    pubContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.getAttribute('data-tab'));
    if (target) target.classList.add('active');
  });
});

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ---- Brochures dropdown (click on mobile, hover handled by CSS on desktop) ----
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  toggle.addEventListener('click', e => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      e.preventDefault();
      dropdown.classList.toggle('open');
      navDropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-dropdown')) {
    navDropdowns.forEach(d => d.classList.remove('open'));
  }
});

// ---- Video tab switcher (YouTube iframe) ----
const player     = document.getElementById('mainVideoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDesc  = document.getElementById('videoDesc');
const vtabs      = document.querySelectorAll('.vtab');

vtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    vtabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    player.src = tab.getAttribute('data-src') + '?autoplay=1';
    videoTitle.textContent = tab.getAttribute('data-title');
    videoDesc.textContent  = tab.getAttribute('data-desc');
  });
});

// ---- Stagger fade-in delays for grids ----
function staggerChildren(selector, baseDelay = 100) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * baseDelay}ms`;
  });
}

staggerChildren('.highlights-grid .highlight-card', 80);
staggerChildren('.projects-grid .project-card', 80);
staggerChildren('.team-grid .member-card', 40);
staggerChildren('.assets-grid .asset-card', 60);
staggerChildren('.brochures-grid .brochure-card', 80);
