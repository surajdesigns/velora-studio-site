// ===== ANIMATIONS.JS — Velora Studio V2 =====
// GSAP + ScrollTrigger powered animations

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // ===== HERO ANIMATION =====
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set('.hero-badge', { opacity: 0, scale: 0.9 });
    gsap.set('.hero h1', { y: 40, opacity: 0 });
    gsap.set('.hero-sub', { y: 20, opacity: 0 });
    gsap.set('.hero-actions .btn', { y: 20, opacity: 0 });

    tl.to('.hero-badge', { opacity: 1, scale: 1, duration: 0.8 }, 0.2)
      .to('.hero h1', { y: 0, opacity: 1, duration: 1 }, 0.4)
      .to('.hero-sub', { y: 0, opacity: 1, duration: 0.8 }, 0.6)
      .to('.hero-actions .btn', { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.8);
  }

  // ===== PAGE HERO ANIMATION =====
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set('.page-hero .hero-badge', { opacity: 0, y: 10 });
    gsap.set('.page-hero h1', { y: 30, opacity: 0 });
    gsap.set('.page-hero p', { y: 20, opacity: 0 });

    tl.to('.page-hero .hero-badge', { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to('.page-hero h1', { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      .to('.page-hero p', { y: 0, opacity: 1, duration: 0.6 }, 0.5);
  }

  // ===== SCROLL REVEALS =====
  const revealSelectors = '.section-label, .section-heading, .section-sub, .about-text p, .about-list li, .contact-info p, .contact-detail-item, .testimonials-header, .value-card, .team-card, .process-step';
  gsap.utils.toArray(revealSelectors).forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // ===== REVEAL CLASS SUPPORT =====
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
      }
    );
  });

  // ===== SERVICE CARDS STAGGER =====
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    ScrollTrigger.create({
      trigger: '.services-grid', start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.service-card',
          { opacity: 0, y: 40, autoAlpha: 0 },
          { opacity: 1, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      }
    });
  }

  // ===== PORTFOLIO CARDS STAGGER =====
  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid) {
    ScrollTrigger.create({
      trigger: '.portfolio-grid', start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.project-card',
          { opacity: 0, y: 40, autoAlpha: 0 },
          { opacity: 1, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      }
    });
  }

  // ===== TESTIMONIALS STAGGER =====
  const testiGrid = document.querySelector('.testimonials-grid');
  if (testiGrid) {
    ScrollTrigger.create({
      trigger: '.testimonials-grid', start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.testimonial-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }
    });
  }

  // ===== STATS COUNTER =====
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    ScrollTrigger.create({
      trigger: statsSection, start: 'top 80%', once: true,
      onEnter: () => {
        document.querySelectorAll('.stat-num[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          gsap.to(el, {
            innerHTML: target, duration: 2, ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate() { el.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix; }
          });
        });
        gsap.fromTo('.stat-item', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
      }
    });
  }

  // ===== PARALLAX =====
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    gsap.to('.hero-grid', {
      yPercent: 30, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ===== CTA BANNER =====
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    gsap.fromTo('.cta-inner',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' }
      }
    );
  }

  // ===== HOVER EFFECTS =====
  const addHover = (selector, scale) => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(el, { scale, duration: 0.4, ease: 'back.out(1.5)' }));
      el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.4, ease: 'power2.out' }));
    });
  };
  addHover('.service-card', 1.02);
  addHover('.project-card', 1.02);
  addHover('.btn', 1.05);
}
