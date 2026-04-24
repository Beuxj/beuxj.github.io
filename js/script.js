/* =============================================
   BEUXJ.DEV — Main Script
   Single source of truth: js/data.js
   ============================================= */

// ── Helpers ─────────────────────────────────────
const TYPE_CLS   = { GAME:'fc-type-game', RENDER:'fc-type-render', DEMO:'fc-type-demo', ASSET:'fc-type-asset' };
const STATUS_CLS = { 'NEW':'fc-status-new','LIVE':'fc-status-live','IN DEV':'fc-status-indev','UPDATED':'fc-status-updated' };
const M_TYPE_CLS = { GAME:'mb-type-game', RENDER:'mb-type-render', DEMO:'mb-type-demo', ASSET:'mb-type-asset' };
const M_ST_CLS   = { 'ACTIVE':'ms-active','IN DEV':'ms-indev','LIVE':'ms-live','NEW':'ms-new','UPDATED':'ms-new' };

function getProjects() {
  return (typeof BEUXJ_PROJECTS !== 'undefined') ? BEUXJ_PROJECTS : [];
}

// Work out the path prefix depending on which page we're on
// index.html is at root; sub-pages are in /html/ so need "../"
function pathPrefix() {
  return window.location.pathname.includes('/html/') ? '../' : '';
}

// ── Nav: scroll gold underline ──────────────────
const topnav = document.querySelector('.topnav');
if (topnav) {
  window.addEventListener('scroll',
    () => topnav.classList.toggle('scrolled', window.scrollY > 40),
    { passive: true }
  );
}

// ── Nav: active section highlight ──────────────
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');
function setActive() {
  let cur = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  allNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// ── Scroll reveal ───────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.08 });

function observeReveal(root) {
  (root || document).querySelectorAll(
    '.project-card,.skill-card,.contact-card,.contact-elsewhere,' +
    '.section-title,.diag-card,.featured-card,.section-header,' +
    '.diag-left,.diag-right,.recents-header,.render-card,' +
    '.demo-card,.game-card,.tool-card'
  ).forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });
}

// ── Skill bars ──────────────────────────────────
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animated'));
  });
}, { threshold: 0.3 })
  .observe(document.querySelector('.skill-bars') || document.createElement('div'));

// ── Smooth scroll — only pure "#hash" links ─────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href.startsWith('#')) return;
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── Hero tag typing effect ──────────────────────
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const txt = heroTag.textContent.trim();
  heroTag.innerHTML = '<span class="tag-dot"></span><span class="hero-tag-text"></span>';
  const span = heroTag.querySelector('.hero-tag-text');
  let i = 0;
  setTimeout(() => {
    const type = () => { if (i < txt.length) { span.textContent += txt[i++]; setTimeout(type, 38); } };
    type();
  }, 700);
}

// ── Gold cursor ─────────────────────────────────
const cur = document.createElement('div');
cur.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:6px;height:6px;border-radius:50%;background:rgba(200,184,130,0.55);transform:translate(-50%,-50%);mix-blend-mode:screen;';
document.body.appendChild(cur);
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
});

// ══════════════════════════════════════════════════════════════
//  MODAL ENGINE
// ══════════════════════════════════════════════════════════════
const modal = (function () {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" id="modalClose">✕</button>
      <div class="modal-image" id="modalImage">
        <div class="modal-image-overlay"></div>
        <div class="modal-badges" id="modalBadges"></div>
        <div class="modal-status" id="modalStatus"></div>
      </div>
      <div class="modal-body">
        <div class="modal-left">
          <div class="modal-index" id="modalIndex"></div>
          <h2  class="modal-title" id="modalTitle"></h2>
          <p   class="modal-desc"  id="modalDesc"></p>
          <div class="modal-tags"  id="modalTags"></div>
          <div class="modal-stats" id="modalStats"></div>
        </div>
        <div class="modal-right">
          <div class="modal-specs-label">TECHNICAL SPECS</div>
          <div class="modal-specs"   id="modalSpecs"></div>
          <div class="modal-actions" id="modalActions"></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(ov);

  const $el  = id => document.getElementById(id);
  let isOpen = false;

  function open(projectId) {
    if (isOpen) return;
    const p = getProjects().find(x => x.id === projectId);
    if (!p) return;
    isOpen = true;

    // ── Media ──
    const imgEl = $el('modalImage');
    imgEl.querySelectorAll('img,iframe,.modal-image-placeholder').forEach(n => n.remove());
    if (p.video) {
      const fr = document.createElement('iframe');
      fr.src = p.video; fr.allow = 'autoplay';
      fr.style.cssText = 'width:100%;height:100%;border:0;position:absolute;inset:0;';
      imgEl.insertBefore(fr, imgEl.firstChild);
    } else if (p.image) {
      const img = document.createElement('img');
      img.src = p.image; img.alt = p.title;
      img.onerror = () => img.replaceWith(makePH(p.category));
      imgEl.insertBefore(img, imgEl.firstChild);
    } else {
      imgEl.insertBefore(makePH(p.category), imgEl.firstChild);
    }

    // ── Badges ──
    $el('modalBadges').innerHTML =
      `<span class="modal-badge ${M_TYPE_CLS[p.category]||'mb-type-asset'}">${p.category}</span>
       ${p.date ? `<span class="modal-badge modal-badge-date">${p.date}</span>` : ''}`;

    const sc = M_ST_CLS[p.status] || 'ms-indev';
    $el('modalStatus').className = `modal-status ${sc}`;
    $el('modalStatus').innerHTML = `<span class="ms-dot"></span>${p.status}`;

    // ── Text ──
    $el('modalIndex').textContent = (p.id||'').toUpperCase().replace(/-/g,'_');
    $el('modalTitle').textContent = p.title || '';
    $el('modalDesc').textContent  = p.desc  || '';
    $el('modalTags').innerHTML    = (p.tags||[]).map(t=>`<span class="modal-tag">${t}</span>`).join('');
    $el('modalStats').innerHTML   = (p.stats||[]).map(s=>
      `<div class="modal-stat">
         <div class="modal-stat-label">${s.key}</div>
         <div class="modal-stat-val">${s.val}</div>
       </div>`
    ).join('');
    $el('modalSpecs').innerHTML = (p.specs&&p.specs.length)
      ? p.specs.map(s=>`<div class="modal-spec-row"><div class="modal-spec-key">${s.key}</div><div class="modal-spec-val">${s.val}</div></div>`).join('')
      : `<div class="modal-spec-row"><div class="modal-spec-key">INFO</div><div class="modal-spec-val">COMING SOON</div></div>`;

    // ── Action buttons ──
    // Determine full path to sub-page (works from both root and /html/)
    const prefix = pathPrefix();
    const pagePath = p.page ? prefix + p.page : null;

    let actions = '';

    // PRIMARY: external play/download link
    if (p.itchUrl)
      actions += mkBtn('primary', p.itchUrl, '🎮', 'PLAY ON ITCH.IO', true);
    else if (p.steamUrl)
      actions += mkBtn('primary', p.steamUrl, '🎮', 'VIEW ON STEAM', true);
    else if (p.downloadUrl)
      actions += mkBtn('primary', p.downloadUrl, '↓', 'DOWNLOAD', true);
    else
      actions += `<div class="modal-btn-disabled"><span class="modal-btn-icon">⏳</span><span>COMING SOON</span></div>`;

    // SECONDARY: navigate to the project's own page
    if (pagePath)
      actions += mkBtn('secondary', pagePath, '→', 'VIEW FULL PAGE', false);

    // TERTIARY: source / devlog
    if (p.githubUrl) actions += mkBtn('secondary', p.githubUrl, '', 'SOURCE CODE', true);
    if (p.devlogUrl) actions += mkBtn('secondary', p.devlogUrl, '', 'DEV LOG', true);

    $el('modalActions').innerHTML = actions;

    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    ov.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { isOpen = false; }, 350);
  }

  function makePH(cat) {
    const d = document.createElement('div');
    d.className = 'modal-image-placeholder';
    d.innerHTML = `<span>${cat||'PROJECT'}</span>`;
    return d;
  }

  function mkBtn(type, href, icon, label, newTab) {
    const target = newTab ? 'target="_blank" rel="noopener"' : '';
    return `<a class="modal-btn-${type}" href="${href}" ${target}>
      ${icon ? `<span class="modal-btn-icon">${icon}</span>` : ''}<span>${label}</span>
    </a>`;
  }

  $el('modalClose').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close(); });

  return { open };
})();

// ── Wire a trigger element exactly once ─────────
function wireTrigger(el, projectId) {
  if (el._modalWired) return;
  el._modalWired = true;
  el.style.cursor = 'pointer';
  el.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    modal.open(projectId);
  });
}

// ══════════════════════════════════════════════════════════════
//  FEATURED "WHAT'S NEW" CARD  (index.html)
//  Button navigates directly to the project page — no modal
//  User then clicks the card on that page to open the modal
// ══════════════════════════════════════════════════════════════
function buildFeaturedCard() {
  const wrap = document.getElementById('featuredCard');
  if (!wrap) return;
  const projects = getProjects();
  if (!projects.length) {
    wrap.innerHTML = '<div class="fc-empty">NO UPLOADS YET — CHECK BACK SOON</div>';
    return;
  }
  const p = projects[0];
  const prefix = pathPrefix();

  const imgHTML = p.image
    ? `<img src="${p.image}" alt="${p.title}" onerror="this.parentElement.innerHTML='<div class=fc-img-placeholder><span>${p.category}</span></div>'">`
    : `<div class="fc-img-placeholder"><span>${p.category}</span></div>`;

  const specsHTML = (p.specs||[]).map(s =>
    `<div class="fc-spec-row"><div class="fc-spec-key">${s.key}</div><div class="fc-spec-val">${s.val}</div></div>`
  ).join('') || `<div class="fc-spec-row"><div class="fc-spec-key">INFO</div><div class="fc-spec-val">COMING SOON</div></div>`;

  // The CTA is an <a> that navigates to the project's page
  // This is intentional: from the homepage, you go to the project page first
  const pagePath = p.page ? prefix + p.page : '#projects';

  wrap.innerHTML = `
    <div class="featured-card reveal">
      <div class="fc-image-panel">
        ${imgHTML}
        <div class="fc-type-badge ${TYPE_CLS[p.category]||'fc-type-asset'}">${p.category}</div>
        <div class="fc-status ${STATUS_CLS[p.status]||'fc-status-indev'}">
          <span class="fc-status-dot"></span>${p.status}
        </div>
        <div class="fc-image-title-overlay">
          <div class="fc-overlay-label">LATEST UPLOAD</div>
          <div class="fc-overlay-title">${p.title}</div>
        </div>
      </div>
      <div class="fc-info-panel">
        <div class="fc-info-top">
          <div class="fc-specs-label">TECHNICAL SPECS</div>
          <div class="fc-specs-grid">${specsHTML}</div>
          <div class="fc-quote">"${p.desc}"</div>
          <div class="fc-meta-row">
            <span>${p.date}</span>
            <span class="fc-meta-sep">·</span>
            <span>${p.category}</span>
            <span class="fc-meta-sep">·</span>
            <span>${p.status}</span>
          </div>
        </div>
        <div class="fc-cta-group">
          <a class="fc-cta" href="${pagePath}">
            <span>GO TO PROJECT PAGE</span><span class="fc-cta-arrow">→</span>
          </a>
          ${p.itchUrl   ? `<a class="fc-cta-ext" href="${p.itchUrl}"   target="_blank" rel="noopener">🎮 ITCH.IO</a>` : ''}
          ${p.downloadUrl ? `<a class="fc-cta-ext" href="${p.downloadUrl}" target="_blank" rel="noopener">↓ DOWNLOAD</a>` : ''}
        </div>
      </div>
    </div>`;

  const card = wrap.querySelector('.featured-card');
  if (card) { card.classList.add('reveal'); revealObserver.observe(card); }
}

// ══════════════════════════════════════════════════════════════
//  SUB-PAGE GRIDS  (blender / godot / games)
// ══════════════════════════════════════════════════════════════
function buildProjectGrid() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  const cats     = (grid.dataset.category||'').split(',').map(c=>c.trim().toUpperCase()).filter(Boolean);
  const template = grid.dataset.template || 'default';
  const projects = getProjects().filter(p => !cats.length || cats.includes(p.category));

  if (!projects.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px;font-family:var(--font-mono);font-size:11px;color:var(--text-xdim);letter-spacing:2px">NO PROJECTS YET — CHECK BACK SOON</div>';
    return;
  }

  grid.innerHTML = projects.map((p, i) => cardHTML(p, i, template)).join('');
  observeReveal(grid);

  grid.querySelectorAll('[data-modal-trigger]').forEach(el =>
    wireTrigger(el, el.dataset.modalTrigger)
  );
}

function cardHTML(p, i, template) {
  const imgHTML   = p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">` : '';
  const phHTML    = `<div class="rc-img-placeholder"><span>${p.category}</span></div>`;

  if (template === 'render') {
    return `
      <div class="render-card reveal" data-cat="${p.category.toLowerCase()}">
        <div class="render-thumb">
          ${imgHTML || phHTML}
          <div class="render-overlay">
            <div class="render-overlay-content">
              <div class="ro-tag">${p.category}</div>
              <div class="ro-title">${p.title}</div>
              <div class="ro-meta">${(p.specs||[]).slice(0,2).map(s=>s.val).join(' · ')}</div>
            </div>
          </div>
        </div>
        <div class="render-info">
          <div class="ri-left">
            <div class="ri-title">${p.title}</div>
            <div class="ri-sub">${p.desc.substring(0,60)}${p.desc.length>60?'...':''}</div>
          </div>
          <button class="ri-tag bl-chip" data-modal-trigger="${p.id}">VIEW ↗</button>
        </div>
      </div>`;
  }

  if (template === 'demo') {
    const live    = ['LIVE','NEW','UPDATED'].includes(p.status);
    const tagHTML = (p.tags||[]).map(t=>`<span class="gd-tag">${t}</span>`).join('');
    const stHTML  = (p.stats||[]).map(s=>`<span class="dm-item"><span class="dm-label">${s.key}</span>${s.val}</span>`).join('');
    return `
      <div class="demo-card reveal">
        <div class="demo-card-header">
          <div class="dc-index">DEMO_${String(i+1).padStart(2,'0')}</div>
          <div class="dc-status ${live?'gd-status-active':'gd-status-wip'}">${live?'● ACTIVE':'◌ IN DEV'}</div>
        </div>
        <div class="demo-thumb">
          ${imgHTML || phHTML}
          <div class="demo-play-btn" data-modal-trigger="${p.id}">▶</div>
        </div>
        <div class="demo-body">
          <h3 class="demo-title">${p.title}</h3>
          <p  class="demo-desc">${p.desc}</p>
          <div class="demo-tags">${tagHTML}</div>
          <div class="demo-meta">${stHTML}</div>
        </div>
      </div>`;
  }

  if (template === 'game') {
    const live     = p.status === 'LIVE';
    const platform = (p.specs||[]).find(s=>s.key==='PLATFORM')?.val || 'PC';
    const engine   = (p.specs||[]).find(s=>s.key==='ENGINE')?.val   || '';
    return `
      <div class="game-card reveal">
        <div class="gc-media">
          ${imgHTML || phHTML}
          <div class="gc-overlay"><div class="gc-platform">${platform}</div></div>
        </div>
        <div class="gc-body">
          <div class="gc-header">
            <h3 class="gc-title">${p.title}</h3>
            <span class="gc-status ${live?'gm-status-live':'gm-status-dev'}">${p.status}</span>
          </div>
          <p class="gc-desc">${p.desc}</p>
          <div class="gc-engine"><span class="ge-label">ENGINE</span><span class="ge-val">${engine}</span></div>
          <button class="gc-btn" data-modal-trigger="${p.id}">${live?'PLAY NOW ▶':'VIEW PROJECT'}</button>
        </div>
      </div>`;
  }

  return `
    <div class="project-card reveal">
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p  class="card-desc">${p.desc}</p>
        <button class="card-btn" data-modal-trigger="${p.id}">VIEW</button>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
//  FEATURED GAME SPOTLIGHT  (games.html)
// ══════════════════════════════════════════════════════════════
function buildFeaturedGame() {
  const wrap = document.getElementById('featuredGameSpot');
  if (!wrap) return;
  const games = getProjects().filter(p => p.category === 'GAME');
  const p     = games.find(g => g.status === 'IN DEV') || games[0];
  if (!p) return;

  const imgHTML = p.image
    ? `<img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'">`
    : `<div class="rc-img-placeholder" style="height:100%"><span>${p.category}</span></div>`;

  const feats = (p.tags||[]).map(t=>`<div class="fg-feat"><span class="ff-dot"></span>${t}</div>`).join('');

  wrap.innerHTML = `
    <div class="featured-game">
      <div class="fg-media">
        ${imgHTML}
        <div class="fg-media-overlay"><div class="fg-badge">${p.status}</div></div>
      </div>
      <div class="fg-content">
        <div class="fg-tag">${(p.specs||[]).slice(0,2).map(s=>s.val).join(' + ')}</div>
        <h2 class="fg-title">${p.title}</h2>
        <p  class="fg-desc">${p.desc}</p>
        <div class="fg-features">${feats}</div>
        <div class="fg-cta">
          <button class="gm-btn-primary" data-modal-trigger="${p.id}">VIEW PROJECT</button>
          ${p.devlogUrl ? `<a href="${p.devlogUrl}" class="gm-btn-ghost" target="_blank" rel="noopener">DEV LOG</a>` : ''}
        </div>
      </div>
    </div>`;

  wrap.querySelectorAll('[data-modal-trigger]').forEach(el =>
    wireTrigger(el, el.dataset.modalTrigger)
  );
}

// ── Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildFeaturedCard();
  buildProjectGrid();
  buildFeaturedGame();
  observeReveal();
});

// ══════════════════════════════════════════════════════════════
//  LEAF PARTICLE EFFECT — fires when hovering organic buttons
// ══════════════════════════════════════════════════════════════
(function leafSystem() {
  const LEAF_SVG = (color) => `
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2 C14 2 18 6 16 11 C14 16 8 18 4 15 C1 13 2 8 6 5 C8 3 10 2 10 2Z"
            fill="${color}" opacity="0.85"/>
    </svg>`;

  function spawnLeaves(x, y, color) {
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf-particle';
      leaf.innerHTML = LEAF_SVG(color);
      const size = 6 + Math.random() * 8;
      leaf.style.cssText = `
        left: ${x + (Math.random() - 0.5) * 40}px;
        top:  ${y + (Math.random() - 0.5) * 20}px;
        width: ${size}px; height: ${size}px;
        animation-delay: ${Math.random() * 0.3}s;
        animation-duration: ${0.7 + Math.random() * 0.5}s;
      `;
      document.body.appendChild(leaf);
      leaf.addEventListener('animationend', () => leaf.remove());
    }
  }

  document.addEventListener('mouseenter', e => {
    const el = e.target;
    if (!el.matches(
      '.btn-primary,.btn-ghost,.card-btn,.social-chip,.contact-email,' +
      '.fc-cta,.filter-btn,.ri-tag,.gc-btn,.gm-btn-primary,.gm-btn-ghost,.modal-btn-primary,.modal-btn-secondary'
    )) return;
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    // Color based on page
    const color = document.body.classList.contains('page-blender') ? '#d4884a'
                : document.body.classList.contains('page-godot')   ? '#33ff66'
                : document.body.classList.contains('page-games')   ? '#c86030'
                : '#82c878';
    spawnLeaves(x, y, color);
  }, true);
})();
