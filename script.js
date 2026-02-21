(function () {
  'use strict';

  // Cookie Banner
  (function () {
    if (typeof localStorage === 'undefined') return;
    var banner = document.getElementById('cookie-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.className = 'cookie-banner';
      banner.innerHTML = '<div class="cookie-content"><p>This website uses cookies to improve user experience, analyze site traffic, and ensure secure functionality. By continuing to browse, you agree to our use of cookies in accordance with our <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.</p><div class="cookie-buttons"><button type="button" id="cookie-accept">Accept All</button><button type="button" id="cookie-decline">Decline</button></div></div>';
      document.body.appendChild(banner);
    }
    function hide() { banner.style.display = 'none'; }
    function accept() { localStorage.setItem('cookieConsent', 'accepted'); hide(); }
    function decline() { localStorage.setItem('cookieConsent', 'declined'); hide(); }
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    if (acceptBtn) acceptBtn.addEventListener('click', accept);
    if (declineBtn) declineBtn.addEventListener('click', decline);
    if (!localStorage.getItem('cookieConsent')) banner.style.display = 'block';
  })();

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

  // FAQ accordion: only one open at a time
  document.querySelectorAll('.faq-list').forEach(function (list) {
    var items = list.querySelectorAll('[data-faq-item]');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  });

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

  // Premium: scroll-reveal – add .animate-on-scroll to sections/cards then observe
  var revealSelectors = [
    '.section', '.section-home', '.hero', '.hero-home', '.section-faq',
    '.featured-item', '.testimonial-card', '.expertise-card', '.services-overview-card',
    '.services-pillar-card', '.hr-services-list-card', '.tools-platforms-col',
    '.faq-item', '.about-preview-card', '.contact-form-wrap', '.page-header',
    '.portfolio-category', '.gallery', '.content-main > h2', '.content-main > h3',
    '.section-title', '.faq-page-tabs', '.faq-page-panel', '.faq-page-cta',
    '.block-cta', '.content-main > p', '.team-card', '.process-step'
  ];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    revealSelectors.forEach(function (sel) {
      try {
        document.querySelectorAll(sel).forEach(function (el, i) {
          if (el.closest('.animate-on-scroll')) return;
          el.classList.add('animate-on-scroll');
          if (i % 4 === 1) el.classList.add('animate-on-scroll-delay-1');
          if (i % 4 === 2) el.classList.add('animate-on-scroll-delay-2');
          if (i % 4 === 3) el.classList.add('animate-on-scroll-delay-3');
        });
      } catch (e) {}
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Start a Project modal (home + contact CTA)
  var startProjectModal = document.getElementById('start-project-modal');
  var startProjectForm = document.getElementById('start-project-form');
  if (startProjectModal && startProjectForm) {
    function getStartProjectRecipient(projectType) {
      if (!projectType) return 'rovicdenielmejia@gmail.com';
      var hrTypes = ['HR Consultation', 'Recruitment Support'];
      var creativeTypes = ['Brand Identity', 'Social Media Visual System', 'Marketing Creative', 'Website Graphics'];
      if (hrTypes.indexOf(projectType) !== -1) return 'wrs.workforce.hr@gmail.com';
      if (creativeTypes.indexOf(projectType) !== -1) return 'techprintcoreph@gmail.com';
      return 'rovicdenielmejia@gmail.com';
    }
    function openStartProjectModal() {
      var params = new URLSearchParams(window.location.search);
      var type = params.get('type');
      var select = startProjectForm.elements.project_type;
      if (type && select) {
        var opt = Array.prototype.find.call(select.options, function (o) { return o.value === type; });
        if (opt) select.value = type;
      }
      startProjectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var first = startProjectModal.querySelector('.inquire-modal-close') || startProjectForm.querySelector('input, select, textarea, button');
      if (first) first.focus();
    }
    function closeStartProjectModal() {
      startProjectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-open-start-project], .js-open-start-project').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openStartProjectModal();
      });
    });
    if (window.location.hash === '#start-project') {
      openStartProjectModal();
    }
    var closeBtn = startProjectModal.querySelector('.inquire-modal-close');
    var backdrop = startProjectModal.querySelector('.inquire-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeStartProjectModal);
    if (backdrop) backdrop.addEventListener('click', closeStartProjectModal);
    startProjectModal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeStartProjectModal();
    });
    var phoneInput = startProjectForm.elements.phone;
    if (phoneInput) {
      phoneInput.addEventListener('input', function () { this.value = this.value.replace(/[^0-9]/g, ''); });
      phoneInput.addEventListener('paste', function (e) {
        e.preventDefault();
        var pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
        var start = this.selectionStart, end = this.selectionEnd;
        this.value = this.value.slice(0, start) + pasted + this.value.slice(end);
        this.setSelectionRange(start + pasted.length, start + pasted.length);
      });
    }
    startProjectForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var el = startProjectForm.elements;
      var name = (el.name && el.name.value) ? el.name.value.trim() : '';
      var projectType = (el.project_type && el.project_type.value) ? el.project_type.value.trim() : 'Other';
      var to = getStartProjectRecipient(projectType);
      var subject = 'Inquiry: ' + projectType + ' - ' + (name || 'Contact');
      var body = [];
      if (name) body.push('Name: ' + name);
      if (el.email && el.email.value) body.push('Email: ' + el.email.value.trim());
      if (el.phone && el.phone.value) body.push('Phone: ' + el.phone.value.trim());
      if (el.company && el.company.value && el.company.value.trim()) body.push('Company: ' + el.company.value.trim());
      body.push('Project Type: ' + projectType);
      body.push('');
      if (el.message && el.message.value) body.push(el.message.value.trim());
      var bodyStr = body.join('\n');
      var maxBodyLen = 1200;
      if (bodyStr.length > maxBodyLen) bodyStr = bodyStr.slice(0, maxBodyLen) + '\n\n[... message truncated ...]';
      var a = document.createElement('a');
      a.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyStr);
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      closeStartProjectModal();
    });
  }

  // Policy viewer modal (Privacy, Terms, HR Client Policy) – open in modal, no nav/full footer
  (function () {
    var modal = document.getElementById('policy-viewer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'policy-viewer-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Policy document');
      modal.setAttribute('aria-hidden', 'true');
      modal.className = 'policy-modal';
      modal.innerHTML =
        '<div class="policy-modal-backdrop" tabindex="-1"></div>' +
        '<div class="policy-modal-box">' +
          '<button type="button" class="policy-modal-close" aria-label="Close">×</button>' +
          '<div class="policy-modal-iframe-wrap">' +
            '<iframe id="policy-viewer-iframe" title="Policy document" src="about:blank"></iframe>' +
          '</div>' +
          '<div class="policy-modal-footer">© 2026 Rovic Mejia. All Rights Reserved.</div>' +
        '</div>';
      document.body.appendChild(modal);
    }
    var iframe = document.getElementById('policy-viewer-iframe');
    var closeBtn = modal.querySelector('.policy-modal-close');
    var backdrop = modal.querySelector('.policy-modal-backdrop');

    function openPolicyModal(url) {
      if (!url || url === '#' || url === 'about:blank') return;
      if (url.indexOf('://') < 0 && url.indexOf('/') !== 0) {
        var path = url.split('?')[0];
        if (!/\.(html?|php|asp)(\?|$)/i.test(path)) url = path + '.html' + (url.indexOf('?') >= 0 ? url.substring(url.indexOf('?')) : '');
      }
      var sep = url.indexOf('?') >= 0 ? '&' : '?';
      iframe.src = url + sep + 'modal=1';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function closePolicyModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      iframe.src = 'about:blank';
    }

    document.body.addEventListener('click', function (e) {
      var a = e.target.closest('a.js-open-policy-modal');
      if (!a) return;
      e.preventDefault();
      openPolicyModal(a.getAttribute('href'));
    });

    if (closeBtn) closeBtn.addEventListener('click', closePolicyModal);
    if (backdrop) backdrop.addEventListener('click', closePolicyModal);
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePolicyModal();
    });
  })();
})();
