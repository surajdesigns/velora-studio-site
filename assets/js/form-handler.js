// ===== FORM-HANDLER.JS — Velora Studio V2 =====
// Handles contact form and free plan form submissions

(function() {
  'use strict';

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const inputs = contactForm.querySelectorAll('[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      // Email validation
      const emailInput = contactForm.querySelector('input[type="email"]');
      if (emailInput && !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
        return;
      }

      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center"><span class="shimmer" style="width:16px;height:16px;border-radius:50%"></span> Sending...</span>';
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        const success = contactForm.parentElement.querySelector('.form-success');
        if (success) {
          success.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.from(success, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' });
          }
        }
      }, 1200);
    });
  }

  // ===== EMAIL VALIDATION =====
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();
