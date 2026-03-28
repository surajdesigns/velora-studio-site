// ===== MAIN.JS — Velora Studio V2 =====
// Core functionality: navigation, mobile menu, scroll effects, sticky CTA, free plan popup, portfolio filters

// ===== NAV SCROLL =====
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== STICKY CTA =====
const stickyCta = document.getElementById('sticky-cta');
if (stickyCta) {
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    stickyCta.classList.toggle('visible', show);
    lastScrollY = window.scrollY;
  }, { passive: true });
}

// ===== FREE PLAN POPUP =====
const freePlanOverlay = document.getElementById('free-plan-overlay');
const freePlanTrigger = document.getElementById('free-plan-trigger');
const freePlanClose = document.getElementById('free-plan-close');
const freePlanForm = document.getElementById('free-plan-form');

if (freePlanTrigger && freePlanOverlay) {
  freePlanTrigger.addEventListener('click', () => {
    freePlanOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}
if (freePlanClose && freePlanOverlay) {
  freePlanClose.addEventListener('click', () => {
    freePlanOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  freePlanOverlay.addEventListener('click', (e) => {
    if (e.target === freePlanOverlay) {
      freePlanOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
if (freePlanForm) {
  freePlanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    freePlanForm.style.display = 'none';
    const success = document.getElementById('free-plan-success');
    if (success) success.style.display = 'block';
  });
}

// ===== PORTFOLIO FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');
if (filterBtns.length > 0 && projectCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== THREE.JS HERO — GLTF MODEL =====
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas && window.THREE) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07070d, 0.0015);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Lighting — soft ambient + directional + accent point lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 8);
  scene.add(dirLight);
  const blueLight = new THREE.PointLight(0x6366f1, 2.5, 100);
  blueLight.position.set(20, 20, 20);
  scene.add(blueLight);
  const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 100);
  purpleLight.position.set(-20, -20, 20);
  scene.add(purpleLight);
  const backLight = new THREE.PointLight(0x8b5cf6, 1.5, 80);
  backLight.position.set(0, -15, -20);
  scene.add(backLight);

  // Groups
  const outerGroup = new THREE.Group();
  const innerGroup = new THREE.Group();
  outerGroup.add(innerGroup);
  scene.add(outerGroup);

  // Ring
  const ringGeo = new THREE.TorusGeometry(12, 0.15, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.3, metalness: 0.7, transparent: true, opacity: 0.4 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  innerGroup.add(ring);

  // Particles
  const pCount = window.innerWidth < 768 ? 40 : 100;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 150;
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.35, color: 0x8b5cf6, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Load GLTF Model
  let gltfModel = null;
  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/models/model.gltf',
    function(gltf) {
      gltfModel = gltf.scene;
      // Auto-center and scale model
      const box = new THREE.Box3().setFromObject(gltfModel);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      gltfModel.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 14 / maxDim;
      gltfModel.scale.set(scale, scale, scale);
      innerGroup.add(gltfModel);
    },
    undefined,
    function(error) {
      console.warn('GLTF model load failed, using fallback:', error);
      // Fallback — procedural V shape
      const vMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
      const vShape = new THREE.Shape();
      vShape.moveTo(-6, 8); vShape.lineTo(-3, 8); vShape.lineTo(0, -4); vShape.lineTo(3, 8); vShape.lineTo(6, 8); vShape.lineTo(1.5, -8); vShape.lineTo(-1.5, -8); vShape.closePath();
      const vGeo = new THREE.ExtrudeGeometry(vShape, { depth: 1.5, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.2, bevelSegments: 3 });
      vGeo.center();
      innerGroup.add(new THREE.Mesh(vGeo, vMat));
    }
  );

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  const halfW = window.innerWidth / 2, halfH = window.innerHeight / 2;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - halfW);
    mouseY = (e.clientY - halfH);
  });

  // Animate
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    // Smooth floating animation
    innerGroup.position.y = Math.sin(t * 1.2) * 1.8;
    innerGroup.rotation.y = t * 0.2;
    ring.rotation.z = t * 0.15;
    // Mouse interaction — slight rotation
    outerGroup.rotation.y += 0.05 * (mouseX * 0.0012 - outerGroup.rotation.y);
    outerGroup.rotation.x += 0.05 * (mouseY * 0.0012 - outerGroup.rotation.x);
    particles.rotation.y = t * 0.04;
    particles.rotation.x = t * 0.02;
    renderer.render(scene, camera);
  }
  animate();

  // Responsive resize
  function updateScale() {
    const s = window.innerWidth < 768 ? 0.6 : 1;
    outerGroup.scale.set(s, s, s);
  }
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateScale();
  });
  updateScale();
}
