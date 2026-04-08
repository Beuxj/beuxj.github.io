/* =============================================
   BEUXJ.DEV — Main Script
   ============================================= */

// ── Scrolled nav gold line ──────────────────────
const topnav = document.querySelector('.topnav');
if (topnav) {
  window.addEventListener('scroll', () => {
    topnav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Active nav on scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActive() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// ── Scroll reveal ───────────────────────────────
const revealEls = document.querySelectorAll(
  '.project-card, .skill-card, .contact-card, .contact-elsewhere,' +
  '.section-title, .diag-card, .featured-card, .section-header,' +
  '.diag-left, .diag-right, .recents-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.08 }
);
revealEls.forEach(el => observer.observe(el));

// ── Skill bars ──────────────────────────────────
const barObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animated'));
      barObs.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-bars').forEach(el => barObs.observe(el));

// ── Smooth scroll ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Typing effect on hero tag ───────────────────
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const original = heroTag.textContent.trim();
  heroTag.innerHTML = '<span class="tag-dot"></span><span class="hero-tag-text"></span>';
  heroTag.style.opacity = '1';
  const textSpan = heroTag.querySelector('.hero-tag-text');
  let i = 0;
  const type = () => { if (i < original.length) { textSpan.textContent += original[i++]; setTimeout(type, 38); } };
  setTimeout(type, 700);
}

// ── Gold cursor dot ─────────────────────────────
const cursor = document.createElement('div');
cursor.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:6px;height:6px;border-radius:50%;background:rgba(200,184,130,0.55);transform:translate(-50%,-50%);mix-blend-mode:screen;';
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// ════════════════════════════════════════════════
//  FEATURED "WHAT'S NEW" CARD RENDERER
//  Reads BEUXJ_RECENTS[0] from data.js
// ════════════════════════════════════════════════
function buildFeaturedCard() {
  const container = document.getElementById('featuredCard');
  if (!container) return;

  const items = (typeof BEUXJ_RECENTS !== 'undefined') ? BEUXJ_RECENTS : [];

  if (items.length === 0) {
    container.innerHTML = '<div class="fc-empty">NO UPLOADS YET — CHECK BACK SOON</div>';
    return;
  }

  const item = items[0]; // always show the latest (top of array)

  const typeClass = {
    GAME: 'fc-type-game', RENDER: 'fc-type-render',
    DEMO: 'fc-type-demo', ASSET: 'fc-type-asset', UPDATE: 'fc-type-update'
  };
  const statusClass = {
    'NEW': 'fc-status-new', 'LIVE': 'fc-status-live',
    'IN DEV': 'fc-status-indev', 'UPDATED': 'fc-status-updated'
  };

  const specsHTML = (item.specs && item.specs.length)
    ? `<div class="fc-specs-grid">
        ${item.specs.map(s => `
          <div class="fc-spec-row">
            <div class="fc-spec-key">${s.key}</div>
            <div class="fc-spec-val">${s.val}</div>
          </div>`).join('')}
      </div>`
    : '';

  container.innerHTML = `
    <div class="featured-card">

      <!-- LEFT: image -->
      <div class="fc-image-panel">
        ${item.image
          ? `<img src="${item.image}" alt="${item.title}"
               onerror="this.parentElement.innerHTML='<div class=fc-img-placeholder><span>${item.type}</span></div>'">`
          : `<div class="fc-img-placeholder"><span>${item.type}</span></div>`
        }
        <div class="fc-type-badge ${typeClass[item.type] || 'fc-type-asset'}">${item.type}</div>
        <div class="fc-status ${statusClass[item.status] || 'fc-status-indev'}">
          <span class="fc-status-dot"></span>${item.status}
        </div>
        <div class="fc-image-title-overlay">
          <div class="fc-overlay-label">LATEST UPLOAD</div>
          <div class="fc-overlay-title">${item.title}</div>
        </div>
      </div>

      <!-- RIGHT: info -->
      <div class="fc-info-panel">
        <div class="fc-info-top">
          <div class="fc-specs-label">TECHNICAL SPECS</div>
          ${specsHTML}
          <div class="fc-quote">"${item.desc}"</div>
          <div class="fc-meta-row">
            <span>${item.date}</span>
            <span class="fc-meta-sep">·</span>
            <span>${item.type}</span>
            <span class="fc-meta-sep">·</span>
            <span>${item.status}</span>
          </div>
        </div>
        <a class="fc-cta" href="${item.link || '#'}">
          <span>VIEW PROJECT</span>
          <span class="fc-cta-arrow">→</span>
        </a>
      </div>

    </div>
  `;

  // reveal animation
  const card = container.querySelector('.featured-card');
  if (card) { card.classList.add('reveal'); observer.observe(card); }
}

document.addEventListener('DOMContentLoaded', buildFeaturedCard);
