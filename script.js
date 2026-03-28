// ===== NAV SCROLL =====
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = contactForm.parentElement.querySelector('.form-success');
    contactForm.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}

// ===== GSAP & SCROLLTRIGGER SETUP =====
gsap.registerPlugin(ScrollTrigger);

// ===== HERO ANIMATION =====
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

// Initial state for hero elements
gsap.set('.hero h1', { y: 40, opacity: 0 });
gsap.set('.hero-sub', { y: 20, opacity: 0 });
gsap.set('.hero-actions .btn', { y: 20, opacity: 0 });
gsap.set('.hero-badge', { opacity: 0, scale: 0.9 });

// Play timeline on load
heroTimeline
  .to('.hero-badge', { opacity: 1, scale: 1, duration: 0.8 }, 0.2)
  .to('.hero h1', { y: 0, opacity: 1, duration: 1 }, 0.4)
  .to('.hero-sub', { y: 0, opacity: 1, duration: 0.8 }, 0.6)
  .to('.hero-actions .btn', { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.8);

// ===== SCROLL REVEALS & STAGGER =====
// Section Headers
gsap.utils.toArray('.section-label, .section-heading, .section-sub, .about-text p, .about-list li').forEach(el => {
  gsap.fromTo(el, 
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Services Grid Stagger
ScrollTrigger.create({
  trigger: ".services-grid",
  start: "top 80%",
  onEnter: () => {
    gsap.fromTo(".service-card",
      { opacity: 0, y: 40, autoAlpha: 0 },
      { opacity: 1, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }
});

// Portfolio Grid Stagger
ScrollTrigger.create({
  trigger: ".portfolio-grid",
  start: "top 80%",
  onEnter: () => {
    gsap.fromTo(".project-card",
      { opacity: 0, y: 40, autoAlpha: 0 },
      { opacity: 1, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }
});

// ===== COUNTER ANIMATION =====
const statsSection = document.querySelector('#stats');
if (statsSection) {
  ScrollTrigger.create({
    trigger: statsSection,
    start: "top 80%",
    once: true,
    onEnter: () => {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        gsap.to(el, {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            el.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix;
          }
        });
      });
      // Fade in stat items
      gsap.fromTo('.stat-item', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  });
}

// ===== PARALLAX & HOVER EFFECTS =====
// Background Grid Parallax
gsap.to('.hero-grid', {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Custom Hover Animations
const addHover = (selector, scale) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { scale: scale, duration: 0.4, ease: "back.out(1.5)" }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" }));
  });
};

addHover('.service-card', 1.02);
addHover('.project-card', 1.02);
addHover('.btn', 1.05);


// ===== START PROJECT PAGE =====
// Only runs on start-project.html
if (document.querySelector('.form-steps')) {

  let currentStep = 1;
  const totalSteps = 4;
  const selectedServices = new Set();
  let formData = {};

  // Step switching
  function goToStep(step) {
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach((s, i) => {
      s.classList.toggle('active', i + 1 === step);
      s.classList.toggle('done', i + 1 < step);
    });
    const panel = document.querySelector(`.step-panel[data-step="${step}"]`);
    if (panel) panel.classList.add('active');
    currentStep = step;
    window.scrollTo({ top: document.querySelector('.progress-bar').offsetTop - 80, behavior: 'smooth' });
    updateCounter();
  }

  // Service selection
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const val = opt.dataset.value;
      if (selectedServices.has(val)) {
        selectedServices.delete(val);
        opt.classList.remove('selected');
      } else {
        selectedServices.add(val);
        opt.classList.add('selected');
      }
      updateCounter();
    });
  });

  function updateCounter() {
    const count = document.querySelector('#service-count');
    if (count) count.textContent = selectedServices.size;
  }

  // Step 1 → 2
  const nextStep1 = document.querySelector('#next-step-1');
  if (nextStep1) {
    nextStep1.addEventListener('click', () => {
      if (selectedServices.size === 0) {
        alert('Please select at least one service.');
        return;
      }
      goToStep(2);
    });
  }

  // Step 2 → 3
  const nextStep2 = document.querySelector('#next-step-2');
  if (nextStep2) {
    nextStep2.addEventListener('click', () => {
      const name = document.querySelector('#sp-name').value.trim();
      const email = document.querySelector('#sp-email').value.trim();
      const business = document.querySelector('#sp-business').value.trim();
      const budget = document.querySelector('#sp-budget').value;
      const timeline = document.querySelector('#sp-timeline').value;
      if (!name || !email || !business || !budget || !timeline) {
        alert('Please fill in all required fields.');
        return;
      }
      formData = { name, email, business, budget, timeline, website: document.querySelector('#sp-website').value.trim() };
      goToStep(3);
    });
  }

  // Step 3 → 4
  const nextStep3 = document.querySelector('#next-step-3');
  if (nextStep3) {
    nextStep3.addEventListener('click', () => {
      buildSummary();
      goToStep(4);
    });
  }

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  });

  // Build summary on step 3
  function buildSummary() {
    // Services list
    const servicesContainer = document.querySelector('#summary-services');
    if (servicesContainer) {
      servicesContainer.innerHTML = [...selectedServices].map(s =>
        `<span class="summary-tag">${s}</span>`
      ).join('');
    }

    // Details
    document.querySelector('#sum-name') && (document.querySelector('#sum-name').textContent = formData.name);
    document.querySelector('#sum-email') && (document.querySelector('#sum-email').textContent = formData.email);
    document.querySelector('#sum-business') && (document.querySelector('#sum-business').textContent = formData.business);
    document.querySelector('#sum-budget') && (document.querySelector('#sum-budget').textContent = formData.budget);
    document.querySelector('#sum-timeline') && (document.querySelector('#sum-timeline').textContent = formData.timeline);
    if (formData.website && document.querySelector('#sum-website')) {
      document.querySelector('#sum-website').textContent = formData.website;
    }

    // Auto message
    buildAutoMessage();
  }

  function buildAutoMessage() {
    const serviceList = [...selectedServices].join(', ');
    const msg = `Hello Velora Studio,\n\nI'm ${formData.name} from ${formData.business} and I'd like to get started on a project with you.\n\nI'm looking for help with: ${serviceList}.\n\nMy budget range is ${formData.budget} and I'm aiming to complete the project within ${formData.timeline}.\n\nPlease get in touch at ${formData.email}.\n\nLooking forward to working with you!`;

    const msgEl = document.querySelector('#auto-message');
    if (msgEl) msgEl.textContent = msg;

    const waBtn = document.querySelector('#whatsapp-btn');
    if (waBtn) {
      const waMsg = encodeURIComponent(msg);
      waBtn.href = `https://wa.me/919999999999?text=${waMsg}`;
    }
  }

  // Copy button
  const copyBtn = document.querySelector('#copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = document.querySelector('#auto-message')?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => copyBtn.textContent = '⎘ Copy Message', 1800);
        });
      }
    });
  }
}

// ===== THREE.JS HERO BACKGROUND =====
const canvasSource = document.querySelector('#hero-canvas');
if (canvasSource && window.THREE) {
  // Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07070d, 0.0015); // Match background slightly

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasSource,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft overall
  scene.add(ambientLight);

  const pointLightBlue = new THREE.PointLight(0x6366f1, 2.5, 100);
  pointLightBlue.position.set(20, 20, 20);
  scene.add(pointLightBlue);

  const pointLightPurple = new THREE.PointLight(0xa855f7, 2.5, 100);
  pointLightPurple.position.set(-20, -20, 20);
  scene.add(pointLightPurple);

  // Group Hierarchy for separated animations
  const logoOuterGroup = new THREE.Group(); // For Parallax
  const logoInnerGroup = new THREE.Group(); // For continuous Float & Rotate
  logoOuterGroup.add(logoInnerGroup);
  scene.add(logoOuterGroup);

  // Load Logo as elegant flat planes
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('logo-transparent.png', (texture) => {
    // Generate an elegant material reacting to colored lights
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.15,
      metalness: 0.6,
      side: THREE.DoubleSide
    });
    
    // Scale plane to match texture aspect ratio naturally
    const aspect = texture.image.width / texture.image.height;
    const height = 22; // Base scale
    const geometry = new THREE.PlaneGeometry(height * aspect, height);
    
    // Front plane
    const meshFront = new THREE.Mesh(geometry, material);
    meshFront.position.z = 0.2;
    logoInnerGroup.add(meshFront);
    
    // Back plane to simulate thickness
    const meshBack = new THREE.Mesh(geometry, material);
    meshBack.position.z = -0.2;
    logoInnerGroup.add(meshBack);
  });

  // Glowing Particle System
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = window.innerWidth < 768 ? 40 : 100; // Responsive count
  
  const posArray = new Float32Array(particleCount * 3);
  for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 150; // Vast spherical space
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.35,
    color: 0x8b5cf6, // Mid accent purple
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  
  const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleMesh);

  // Parallax Event Vars
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  // Track Mouse Movement smoothly
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  });

  // Main Render Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Float and slow continuous spin
    logoInnerGroup.position.y = Math.sin(elapsedTime * 1.5) * 1.5;
    logoInnerGroup.rotation.y = elapsedTime * 0.25;

    // 2. Smooth Lerp Parallax Tilt
    targetX = mouseX * 0.0012; // Modifiers for angle intensity
    targetY = mouseY * 0.0012;
    
    logoOuterGroup.rotation.y += 0.05 * (targetX - logoOuterGroup.rotation.y);
    logoOuterGroup.rotation.x += 0.05 * (targetY - logoOuterGroup.rotation.x);

    // 3. Orbit Particles
    particleMesh.rotation.y = elapsedTime * 0.04;
    particleMesh.rotation.x = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Optional: adapt scale for mobile slightly
    if (window.innerWidth < 768) {
        logoOuterGroup.scale.set(0.6, 0.6, 0.6);
    } else {
        logoOuterGroup.scale.set(1, 1, 1);
    }
  });
  
  // Set initial scale manually
  if (window.innerWidth < 768) {
      logoOuterGroup.scale.set(0.6, 0.6, 0.6);
  }
}
