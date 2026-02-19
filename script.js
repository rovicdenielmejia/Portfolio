(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back to top
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function toggleBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var parent = link.closest('.nav-item-has-children');
        if (parent && window.matchMedia('(max-width: 700px)').matches && link.parentElement === parent) {
          e.preventDefault();
          parent.classList.toggle('is-open');
          return;
        }
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.querySelectorAll('.nav-dropdown a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close mobile menu when resizing to desktop
    function closeNavIfDesktop() {
      if (window.matchMedia('(min-width: 701px)').matches) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
    window.addEventListener('resize', closeNavIfDesktop);
  }

  // Lightbox for gallery (works with multiple .gallery sections)
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    document.body.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery-item') || e.target.closest('.portfolio-carousel-slide');
      if (!item) return;
      var img = item.querySelector('img') || (e.target.tagName === 'IMG' ? e.target : null);
      if (!img) return;
      e.preventDefault();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    });
  }

  // Portfolio category carousel (autoplay every 3 seconds)
  var AUTOPLAY_DELAY_MS = 3000;
  document.querySelectorAll('.portfolio-carousel').forEach(function (carousel) {
    var viewport = carousel.querySelector('.portfolio-carousel-viewport');
    var track = carousel.querySelector('.portfolio-carousel-track');
    var slides = carousel.querySelectorAll('.portfolio-carousel-slide');
    var prev = carousel.querySelector('.portfolio-carousel-prev');
    var next = carousel.querySelector('.portfolio-carousel-next');
    var dotsWrap = carousel.querySelector('.portfolio-carousel-dots');
    var counter = carousel.querySelector('.portfolio-carousel-counter');
    var total = slides.length;
    var index = 0;
    var autoplayTimer = null;
    if (!track || total === 0) return;
    function goTo(i) {
      index = (i + total) % total;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      carousel.querySelectorAll('.portfolio-carousel-dot').forEach(function (dot, j) {
        dot.setAttribute('aria-current', j === index ? 'true' : 'false');
      });
      if (counter) counter.textContent = (index + 1) + ' / ' + total;
    }
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function () { goTo(index + 1); }, AUTOPLAY_DELAY_MS);
    }
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    function onUserNavigate() {
      stopAutoplay();
      setTimeout(startAutoplay, 5000);
    }
    if (prev) prev.addEventListener('click', function () { goTo(index - 1); onUserNavigate(); });
    if (next) next.addEventListener('click', function () { goTo(index + 1); onUserNavigate(); });
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'portfolio-carousel-dot';
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () { goTo(i); onUserNavigate(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    if (counter) counter.textContent = '1 / ' + total;
    goTo(0);
    startAutoplay();
  });

  // See more / See less per category
  document.querySelectorAll('.btn-see-more').forEach(function (btn) {
    var category = btn.closest('.portfolio-category');
    var moreItems = category ? category.querySelectorAll('.gallery-item-more') : [];
    if (moreItems.length === 0) {
      btn.closest('.category-actions').style.display = 'none';
      return;
    }
    btn.addEventListener('click', function () {
      category.classList.toggle('is-expanded');
      btn.textContent = category.classList.contains('is-expanded') ? 'See less' : 'See more';
    });
  });
})();
