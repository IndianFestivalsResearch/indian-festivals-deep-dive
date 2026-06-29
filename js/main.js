// ═══════════════════════════════════════════════════════════
// Tides of Devotion — Site JS
// ═══════════════════════════════════════════════════════════
(function() {
  'use strict';

  // ── Festival search/filter ──
  var searchInput = document.getElementById('festival-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      var query = e.target.value.toLowerCase().trim();
      var cards = document.querySelectorAll('.festival-card');
      var found = 0;
      cards.forEach(function(card) {
        var text = card.textContent.toLowerCase();
        var match = !query || text.indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) found++;
      });
      var noResults = document.getElementById('no-results');
      if (noResults) noResults.style.display = found ? 'none' : '';
    });
  }

  // ── Active nav link ──
  var path = window.location.pathname;
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === '/' && path === '/') { link.classList.add('active'); }
    else if (href !== '/' && path.indexOf(href) === 0) { link.classList.add('active'); }
  });

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerH = document.querySelector('.site-header').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Dark mode toggle ──
  var darkBtn = document.getElementById('dark-toggle');
  if (darkBtn) {
    var stored = localStorage.getItem('tdod-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('force-dark');
      darkBtn.textContent = '☀️';
    }
    darkBtn.addEventListener('click', function() {
      var html = document.documentElement;
      if (html.classList.contains('force-dark')) {
        html.classList.remove('force-dark');
        localStorage.setItem('tdod-theme', 'light');
        darkBtn.textContent = '🌙';
      } else {
        html.classList.add('force-dark');
        localStorage.setItem('tdod-theme', 'dark');
        darkBtn.textContent = '☀️';
      }
    });
  }

  // ── Back to top button ──
  var btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.innerHTML = '↑';
  btt.setAttribute('aria-label', 'Back to top');
  btt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(btt);
  window.addEventListener('scroll', function() {
    btt.classList.toggle('visible', window.pageYOffset > 600);
  });

  // ── Reading time ──
  var rtEl = document.getElementById('reading-time');
  if (rtEl) {
    var text = document.querySelector('main').textContent;
    var words = text.split(/\s+/).length;
    var mins = Math.max(1, Math.round(words / 200));
    rtEl.textContent = '~' + mins + ' min read';
  }

})();
