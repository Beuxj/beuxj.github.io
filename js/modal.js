/* =============================================
   PROJECT MODAL — shared across all pages
   Reads data-* attributes from each card's
   trigger element and builds the popup.
   ============================================= */

(function () {

  /* ── Build modal DOM once ── */
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'projectModal';
  overlay.innerHTML = `
    <div class="modal-box" id="modalBox">
      <button class="modal-close" id="modalClose" aria-label="Close">✕</button>

      <div class="modal-image" id="modalImage">
        <div class="modal-image-overlay"></div>
        <div class="modal-badges" id="modalBadges"></div>
        <div class="modal-status" id="modalStatus"></div>
      </div>

      <div class="modal-body">
        <div class="modal-left">
          <div class="modal-index" id="modalIndex"></div>
          <h2 class="modal-title" id="modalTitle"></h2>
          <p class="modal-desc" id="modalDesc"></p>
          <div class="modal-tags" id="modalTags"></div>
          <div class="modal-stats" id="modalStats"></div>
        </div>
        <div class="modal-right">
          <div class="modal-specs-label">TECHNICAL SPECS</div>
          <div class="modal-specs" id="modalSpecs"></div>
          <div class="modal-actions" id="modalActions"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  /* ── Helpers ── */
  const $ = id => document.getElementById(id);

  const TYPE_CLASS = {
    GAME:'mb-type-game', RENDER:'mb-type-render',
    DEMO:'mb-type-demo',  ASSET:'mb-type-asset'
  };
  const STATUS_CLASS = {
    'ACTIVE':'ms-active', 'IN DEV':'ms-indev',
    'LIVE':'ms-live',     'NEW':'ms-new', 'UPDATED':'ms-new'
  };

  function open(data) {
    // Image
    const imgEl = $('modalImage');
    const existing = imgEl.querySelector('img, .modal-image-placeholder');
    if (existing) existing.remove();
    if (data.image) {
      const img = document.createElement('img');
      img.src = data.image; img.alt = data.title;
      img.onerror = () => { img.replaceWith(makePlaceholder(data.type)); };
      imgEl.insertBefore(img, imgEl.firstChild);
    } else {
      imgEl.insertBefore(makePlaceholder(data.type), imgEl.firstChild);
    }

    // Badges
    $('modalBadges').innerHTML = `
      <span class="modal-badge ${TYPE_CLASS[data.type] || 'mb-type-asset'}">${data.type || 'PROJECT'}</span>
      ${data.platform ? `<span class="modal-badge" style="color:var(--text-dim);border-color:var(--border2);background:rgba(255,255,255,0.05)">${data.platform}</span>` : ''}
    `;

    // Status
    const sc = STATUS_CLASS[data.status] || 'ms-indev';
    $('modalStatus').className = `modal-status ${sc}`;
    $('modalStatus').innerHTML = `<span class="ms-dot"></span>${data.status || 'IN DEV'}`;

    // Index + title + desc
    $('modalIndex').textContent = data.index || '';
    $('modalTitle').textContent = data.title || '';
    $('modalDesc').textContent  = data.desc  || '';

    // Tags
    const tags = (data.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    $('modalTags').innerHTML = tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

    // Stats
    const stats = parseStats(data.stats || '');
    $('modalStats').innerHTML = stats.map(s =>
      `<div class="modal-stat">
        <div class="modal-stat-label">${s.key}</div>
        <div class="modal-stat-val">${s.val}</div>
      </div>`
    ).join('');

    // Specs
    const specs = parseStats(data.specs || '');
    $('modalSpecs').innerHTML = specs.length
      ? specs.map(s =>
          `<div class="modal-spec-row">
            <div class="modal-spec-key">${s.key}</div>
            <div class="modal-spec-val">${s.val}</div>
          </div>`).join('')
      : `<div class="modal-spec-row"><div class="modal-spec-key">INFO</div><div class="modal-spec-val">COMING SOON</div></div>`;

    // Action buttons
    $('modalActions').innerHTML = buildActions(data);

    // Show
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function makePlaceholder(type) {
    const d = document.createElement('div');
    d.className = 'modal-image-placeholder';
    d.innerHTML = `<span>${type || 'PROJECT'}</span>`;
    return d;
  }

  /* stats/specs format: "KEY:VAL|KEY:VAL" */
  function parseStats(str) {
    if (!str) return [];
    return str.split('|').map(s => {
      const [key, ...rest] = s.split(':');
      return { key: (key || '').trim(), val: rest.join(':').trim() };
    }).filter(s => s.key && s.val);
  }

  function buildActions(data) {
    let html = '';

    // Primary — itch / steam / direct download
    if (data.itchUrl) {
      html += `<a class="modal-btn-primary" href="${data.itchUrl}" target="_blank" rel="noopener">
        <span class="modal-btn-icon">🎮</span><span>PLAY ON ITCH.IO</span>
      </a>`;
    } else if (data.steamUrl) {
      html += `<a class="modal-btn-primary" href="${data.steamUrl}" target="_blank" rel="noopener">
        <span class="modal-btn-icon">🎮</span><span>VIEW ON STEAM</span>
      </a>`;
    } else if (data.downloadUrl) {
      html += `<a class="modal-btn-primary" href="${data.downloadUrl}" target="_blank" rel="noopener">
        <span class="modal-btn-icon">↓</span><span>DOWNLOAD</span>
      </a>`;
    } else {
      html += `<div class="modal-btn-disabled">
        <span>COMING SOON</span>
      </div>`;
    }

    // Secondary — source / devlog
    if (data.githubUrl) {
      html += `<a class="modal-btn-secondary" href="${data.githubUrl}" target="_blank" rel="noopener">
        <span>VIEW SOURCE</span>
      </a>`;
    }
    if (data.devlogUrl) {
      html += `<a class="modal-btn-secondary" href="${data.devlogUrl}" target="_blank" rel="noopener">
        <span>DEV LOG</span>
      </a>`;
    }

    return html;
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Wire up close ── */
  $('modalClose').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ── Wire up all trigger elements ── */
  function initTriggers() {
    document.querySelectorAll('[data-modal]').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        open(el.dataset);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriggers);
  } else {
    initTriggers();
  }

})();
