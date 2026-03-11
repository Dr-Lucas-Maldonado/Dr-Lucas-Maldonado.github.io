/* ============================================================
   DR. LUCAS L. MALDONADO — PORTFOLIO
   main.js
   ============================================================ */

'use strict';

/* ── NAVBAR SCROLL ────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ── REVEAL ON SCROLL ─────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── COUNTER ANIMATION ────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let started = false;

  function runCounters() {
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const step = target / (duration / 16);
      let current = 0;

      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current);
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  const heroSection = document.getElementById('hero');
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      // Slight delay so page has rendered
      setTimeout(runCounters, 600);
    }
  }, { threshold: 0.4 });

  if (heroSection) io.observe(heroSection);
})();

/* ── GENOME CANVAS BACKGROUND ─────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('genome-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, animFrame;

  const ACCENT    = 'rgba(91,192,190,';
  const NODE_COUNT = window.innerWidth < 640 ? 28 : 52;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }

  function drawHelix(t) {
    const x0 = W * 0.72;
    const amplitude = 60;
    const freq = 0.018;
    const spacing = 22;

    ctx.lineWidth = 1;

    for (let y = 0; y < H + spacing; y += spacing) {
      const angle1 = y * freq + t;
      const angle2 = y * freq + t + Math.PI;
      const x1 = x0 + Math.cos(angle1) * amplitude;
      const x2 = x0 + Math.cos(angle2) * amplitude;
      const alpha = 0.06 + Math.abs(Math.cos(angle1)) * 0.14;

      // strand 1 dot
      ctx.beginPath();
      ctx.arc(x1, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT + alpha + ')';
      ctx.fill();

      // strand 2 dot
      ctx.beginPath();
      ctx.arc(x2, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT + alpha + ')';
      ctx.fill();

      // rung
      if (Math.round(y / spacing) % 2 === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = ACCENT + (alpha * 0.5) + ')';
        ctx.stroke();
      }
    }

    // continuous strands
    ctx.beginPath();
    for (let y = 0; y < H; y += 2) {
      const angle = y * freq + t;
      const x = x0 + Math.cos(angle) * amplitude;
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ACCENT + '0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    for (let y = 0; y < H; y += 2) {
      const angle = y * freq + t + Math.PI;
      const x = x0 + Math.cos(angle) * amplitude;
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    const t = ts * 0.00028;

    // Nodes
    nodes.forEach((n, i) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT + n.opacity + ')';
      ctx.fill();

      // Connections
      nodes.slice(i + 1).forEach(m => {
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = ACCENT + (0.07 * (1 - dist / 140)) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });

    drawHelix(t);

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  animFrame = requestAnimationFrame(draw);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
})();

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────── */
(function initActiveSections() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + e.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();

/* ── SMOOTH HOVER TILT ON CARDS ───────────────────────────── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.spec-card, .infra-card, .ach-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
