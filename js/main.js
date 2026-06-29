// ═══════════════════════════════════════════════════════════
// Tides of Devotion — Minimal JS
// ═══════════════════════════════════════════════════════════
(function() {
  'use strict';

  // Festival search/filter on index pages
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

  // Active nav link
  var path = window.location.pathname;
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function(link) {
    if (link.getAttribute('href') === path || 
        (path !== '/' && link.getAttribute('href') !== '/' && path.indexOf(link.getAttribute('href')) !== -1)) {
      link.classList.add('active');
    }
  });

  // Smooth internal link offsets for sticky header
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

})();
