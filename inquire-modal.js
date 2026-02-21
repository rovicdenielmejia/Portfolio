(function() {
  function initInquireModal() {
    var modal = document.getElementById('inquire-modal');
    var modalTitle = document.getElementById('inquire-modal-title');
    var modalForm = document.getElementById('inquire-modal-form');
    var subjectInput = modalForm ? modalForm.querySelector('input[name="subject"]') : null;
    var lastFocused = null;
    var inquireToOverride = null;

    function openModal(subject, title, triggerEl) {
      if (!modal || !modalForm) return;
      lastFocused = triggerEl || document.activeElement;
      inquireToOverride = triggerEl && triggerEl.getAttribute('data-inquire-to');
      if (subjectInput) subjectInput.value = subject || '';
      if (modalTitle) modalTitle.textContent = title || 'Book a Strategic Consultation';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var closeBtn = modal.querySelector('.inquire-modal-close');
      var firstFocusable = closeBtn || modalForm.querySelector('input, textarea, button');
      if (firstFocusable) setTimeout(function() { firstFocusable.focus(); }, 50);
    }

    function closeModal() {
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    var closeBtn = modal ? modal.querySelector('.inquire-modal-close') : null;
    var backdrop = modal ? modal.querySelector('.inquire-modal-backdrop') : null;
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });

    var inquireSelectors = '.services-inquire-btn, .pageant-inquire-btn, .live-coverage-inquire-btn';
    document.querySelectorAll(inquireSelectors).forEach(function(btn) {
      btn.addEventListener('click', function() {
        var subject = this.getAttribute('data-inquire-subject') || '';
        var title = this.getAttribute('data-inquire-title') || 'Book a Strategic Consultation';
        openModal(subject, title, this);
      });
    });

    if (!modalForm) return;

    var phoneInput = modalForm.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() { this.value = this.value.replace(/[^0-9]/g, ''); });
      phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        var pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
        var start = this.selectionStart, end = this.selectionEnd;
        this.value = this.value.slice(0, start) + pasted + this.value.slice(end);
        this.setSelectionRange(start + pasted.length, start + pasted.length);
      });
    }

    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var to, cc;
      if (inquireToOverride) {
        to = inquireToOverride;
        cc = '';
      } else {
        to = 'rovicdenielmejia@gmail.com';
        cc = 'wrs.recruitment.hr@gmail.com,techprintcoreph@gmail.com,rovicmejia.hrd@gmail.com';
      }
      var subj = (subjectInput && subjectInput.value) ? subjectInput.value.trim() : 'Inquiry from portfolio';
      var body = [];
      var nameEl = modalForm.elements.name;
      var emailEl = modalForm.elements.email;
      var phoneEl = modalForm.elements.phone;
      var messageEl = modalForm.elements.message;
      if (nameEl && nameEl.value) body.push('Name: ' + nameEl.value.trim());
      if (emailEl && emailEl.value) body.push('Email: ' + emailEl.value.trim());
      if (phoneEl && phoneEl.value.trim()) body.push('Phone: ' + phoneEl.value.trim());
      body.push('');
      if (messageEl && messageEl.value) body.push(messageEl.value.trim());
      var bodyStr = body.join('\n');
      if (bodyStr.length > 1200) bodyStr = bodyStr.slice(0, 1200) + '\n\n[... message truncated for email link ...]';
      var mailto = 'mailto:' + to + (cc ? '?cc=' + encodeURIComponent(cc) + '&' : '?') + 'subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(bodyStr);
      closeModal();
      inquireToOverride = null;
      window.location.href = mailto;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInquireModal);
  } else {
    initInquireModal();
  }
})();
