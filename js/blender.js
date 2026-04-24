/* =============================================
   BLENDER PAGE — particles + filter
   Cards are built by script.js from data.js
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  // ── Floating particle dots ──
  const container = document.getElementById('blParticles');
  if (container) {
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'bl-particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random()*100}%;bottom:${Math.random()*20}%;
        animation-duration:${6+Math.random()*10}s;
        animation-delay:${Math.random()*8}s;`;
      container.appendChild(p);
    }
  }

  // ── Filter bar (runs after grid is built by script.js) ──
  // script.js calls buildProjectGrid() on DOMContentLoaded too,
  // so we use a short delay to ensure cards exist first.
  setTimeout(() => {
    const btns  = document.querySelectorAll('.filter-btn');
    const count = document.getElementById('filterCount');

    function updateCount() {
      const vis = document.querySelectorAll('.render-card:not(.hidden)').length;
      if (count) count.textContent = vis + ' RENDERS';
    }

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        document.querySelectorAll('.render-card').forEach(card => {
          const cat = card.dataset.cat || '';
          if (filter === 'all') {
            card.classList.remove('hidden');
          } else if (filter === 'render' && (cat === 'render' || cat === 'environment')) {
            card.classList.remove('hidden');
          } else if (filter === 'asset' && cat === 'asset') {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        updateCount();
      });
    });

    updateCount();
  }, 200);

});
