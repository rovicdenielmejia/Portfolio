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
      var item = e.target.closest('.gallery-item');
      if (!item) return;
      var img = item.querySelector('img');
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
