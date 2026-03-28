// ===== PRICING-CALCULATOR.JS — Velora Studio V2 =====
// Smart project calculator with multi-step form and real-time pricing

(function() {
  'use strict';

  // ===== STATE =====
  const state = {
    currentStep: 1,
    bizType: null,
    bizLabel: '',
    bizBase: 0,
    services: [],
    websiteType: null,
    websiteTypeAdd: 0,
    pages: null,
    pagesCount: 0
  };

  // ===== PRICING ENGINE =====
  const SERVICE_PRICES = {
    'Landing Page': 2000,
    'Full Website Development': 5000,
    'E-commerce Website': 8000,
    'Technical SEO': 3000,
    'Local SEO': 3000,
    'Full SEO Optimization': 3000,
    'Instagram Growth Strategy': 3000,
    'Content Creation': 3000,
    'Social Media Management': 3000,
    'Logo Design': 2000,
    'Brand Identity': 2000,
    'Website Redesign': 5000,
    'WordPress Website': 5000,
    'Website Maintenance': 2000
  };
  const PAGE_PRICE = 1000;

  function calculatePrice() {
    const breakdown = [];
    let total = 0;
    if (state.bizBase > 0) {
      breakdown.push({ label: `Base — ${state.bizLabel}`, amount: state.bizBase });
      total += state.bizBase;
    }
    state.services.forEach(svc => {
      const add = SERVICE_PRICES[svc] || 0;
      if (add > 0) { breakdown.push({ label: svc, amount: add }); total += add; }
    });
    if (state.websiteTypeAdd > 0) {
      breakdown.push({ label: `Website Type — ${state.websiteType}`, amount: state.websiteTypeAdd });
      total += state.websiteTypeAdd;
    }
    if (state.pagesCount > 0) {
      const pt = state.pagesCount * PAGE_PRICE;
      breakdown.push({ label: `Pages (${state.pagesCount} avg × ₹1,000)`, amount: pt });
      total += pt;
    }
    return { total, breakdown };
  }

  function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

  // ===== STEP NAVIGATION =====
  function goToStep(target) {
    const current = document.querySelector(`.step-panel[data-step="${state.currentStep}"]`);
    const next = document.querySelector(`.step-panel[data-step="${target}"]`);
    if (!next) return;

    if (current) {
      current.classList.add('exit-left');
      setTimeout(() => { current.classList.remove('active', 'exit-left'); current.style.display = 'none'; }, 350);
    }
    setTimeout(() => {
      next.style.display = 'block';
      requestAnimationFrame(() => { next.classList.add('active'); });
    }, 200);

    document.querySelectorAll('.progress-step').forEach(s => {
      const n = parseInt(s.dataset.step);
      s.classList.toggle('active', n === target);
      s.classList.toggle('done', n < target);
    });

    state.currentStep = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== BUSINESS TYPE CARDS =====
  const BIZ_LABELS = { small: 'Small Business', medium: 'Growing Business', high: 'High Value Business' };
  document.querySelectorAll('.biz-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.biz-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.bizType = card.dataset.biz;
      state.bizBase = parseInt(card.dataset.base, 10);
      state.bizLabel = BIZ_LABELS[state.bizType];
      updatePill();
    });
  });

  // ===== SERVICE OPTIONS =====
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const val = opt.dataset.value;
      if (opt.classList.contains('selected')) {
        if (!state.services.includes(val)) state.services.push(val);
      } else {
        state.services = state.services.filter(s => s !== val);
      }
      const countEl = document.getElementById('service-count');
      if (countEl) countEl.textContent = state.services.length;
      updatePill();
    });
  });

  // ===== CONFIG OPTIONS =====
  document.querySelectorAll('.config-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.dataset.config;
      document.querySelectorAll(`.config-option[data-config="${group}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      if (group === 'websiteType') {
        state.websiteType = opt.dataset.value;
        state.websiteTypeAdd = parseInt(opt.dataset.add, 10) || 0;
      } else if (group === 'pages') {
        state.pages = opt.dataset.value;
        state.pagesCount = parseInt(opt.dataset.pages, 10) || 0;
      }
      updatePill();
    });
  });

  // ===== LIVE PRICE PILL =====
  function updatePill() {
    const { total } = calculatePrice();
    const f = fmt(total);
    const pill1 = document.getElementById('price-pill-step1');
    const pill1Val = document.getElementById('price-pill-step1-val');
    if (pill1 && (state.bizBase > 0 || state.services.length > 0)) {
      pill1.style.display = 'inline-flex';
      if (pill1Val) pill1Val.textContent = f;
    }
    const pill2Val = document.getElementById('price-pill-step2-val');
    if (pill2Val) pill2Val.textContent = f;
  }

  // ===== SUMMARY =====
  function populateSummary() {
    const el = id => document.getElementById(id);
    el('sum-biz-type').textContent = state.bizLabel || '—';
    el('sum-website-type').textContent = state.websiteType || '—';
    el('sum-pages').textContent = state.pages || '—';

    const name = el('sp-name')?.value || '';
    const email = el('sp-email')?.value || '';
    const business = el('sp-business')?.value || '';
    const budget = el('sp-budget')?.value || '';
    const timeline = el('sp-timeline')?.value || '';
    const website = el('sp-website')?.value || '';

    el('sum-name').textContent = name || '—';
    el('sum-email').textContent = email || '—';
    el('sum-business').textContent = business || '—';
    el('sum-budget').textContent = budget || '—';
    el('sum-timeline').textContent = timeline || '—';

    const wRow = el('website-row');
    if (website && wRow) { wRow.style.display = 'flex'; el('sum-website').textContent = website; }

    const tagsEl = el('summary-services');
    if (tagsEl) {
      tagsEl.innerHTML = state.services.length === 0
        ? '<span style="color:var(--text-muted);font-size:.85rem">No services selected</span>'
        : state.services.map(s => `<span class="summary-tag">${s}</span>`).join('');
    }

    const { total, breakdown } = calculatePrice();
    el('sum-total-price').textContent = fmt(total);

    const bdEl = el('price-breakdown');
    if (bdEl) {
      bdEl.innerHTML = breakdown.map(r =>
        `<div class="price-breakdown-row"><span>${r.label}</span><span class="amount">${fmt(r.amount)}</span></div>`
      ).join('') +
        `<div class="price-breakdown-total-row"><span>Total Estimate</span><span class="amount">${fmt(total)}</span></div>`;
    }
  }

  // ===== AUTO MESSAGE =====
  function generateMessage() {
    const name = document.getElementById('sp-name')?.value || 'there';
    const business = document.getElementById('sp-business')?.value || 'my business';
    const budget = document.getElementById('sp-budget')?.value || 'Not specified';
    const timeline = document.getElementById('sp-timeline')?.value || 'Flexible';
    const website = document.getElementById('sp-website')?.value;
    const { total } = calculatePrice();
    const svcs = state.services.length > 0 ? state.services.join(', ') : 'Not specified';

    let msg = `Hello Velora Studio,\n\nMy name is ${name} and I run ${business}.\n`;
    msg += `Business Type: ${state.bizLabel || 'Not specified'}\n\n`;
    msg += `I'm interested in the following services:\n${svcs}\n\n`;
    msg += `Website Type: ${state.websiteType || 'Not specified'}\n`;
    msg += `Number of Pages: ${state.pages || 'Not specified'}\n\n`;
    msg += `Budget Range: ${budget}\nDesired Timeline: ${timeline}\n`;
    if (website) msg += `Current Website: ${website}\n`;
    msg += `\n💰 Estimated Project Cost: ${fmt(total)}\n`;
    msg += `\nLooking forward to hearing from you!\n\nBest regards,\n${name}`;
    return msg;
  }

  // ===== NAVIGATION BUTTONS =====
  document.getElementById('next-step-1')?.addEventListener('click', () => {
    if (!state.bizType) { alert('Please select your business type before continuing.'); return; }
    if (state.services.length === 0) { alert('Please select at least one service before continuing.'); return; }
    goToStep(2);
    updatePill();
  });

  document.getElementById('next-step-2')?.addEventListener('click', () => {
    const n = document.getElementById('sp-name')?.value.trim();
    const e = document.getElementById('sp-email')?.value.trim();
    const b = document.getElementById('sp-business')?.value.trim();
    const bu = document.getElementById('sp-budget')?.value;
    const t = document.getElementById('sp-timeline')?.value;
    if (!n || !e || !b || !bu || !t) { alert('Please fill in all required fields.'); return; }
    populateSummary();
    goToStep(3);
  });

  document.getElementById('next-step-3')?.addEventListener('click', () => {
    const msg = generateMessage();
    const msgEl = document.getElementById('auto-message');
    if (msgEl) msgEl.textContent = msg;

    const waUrl = `https://wa.me/919811922637?text=${encodeURIComponent(msg)}`;
    const waBtn = document.getElementById('whatsapp-btn');
    if (waBtn) waBtn.href = waUrl;

    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
      const sub = encodeURIComponent(`New Project Inquiry — ${document.getElementById('sp-business')?.value || 'Client'}`);
      emailBtn.href = `mailto:hello@velorastudio.com?subject=${sub}&body=${encodeURIComponent(msg)}`;
    }
    goToStep(4);

    // Auto-open WhatsApp with the full message
    setTimeout(() => { window.open(waUrl, '_blank'); }, 600);
  });

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => { if (state.currentStep > 1) goToStep(state.currentStep - 1); });
  });

  // Copy button
  document.getElementById('copy-btn')?.addEventListener('click', function() {
    const msg = document.getElementById('auto-message')?.textContent || '';
    navigator.clipboard.writeText(msg).then(() => {
      this.textContent = '✓ Copied!';
      setTimeout(() => { this.textContent = '⎘ Copy Message'; }, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = msg;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.textContent = '✓ Copied!';
      setTimeout(() => { this.textContent = '⎘ Copy Message'; }, 2000);
    });
  });

  // Init
  const firstPanel = document.querySelector('.step-panel[data-step="1"]');
  if (firstPanel) { firstPanel.style.display = 'block'; firstPanel.classList.add('active'); }

})();
