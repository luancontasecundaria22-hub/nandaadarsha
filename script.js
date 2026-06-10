/* ========================================
   NANDA ADARSHA — Yoga & Bem-Estar
   Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV: scroll behavior ---- */
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ---- HAMBURGER / MOBILE MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ---- HERO FADE-IN ANIMATIONS ---- */
  const heroFadeEls = document.querySelectorAll('.fade-in');

  heroFadeEls.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => {
      el.classList.add('visible');
    }, delay + 100); // small initial offset so page doesn't flash
  });


  /* ---- INTERSECTION OBSERVER: scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 120);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---- TABS ---- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      const targetPanel = document.getElementById(`tab-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  /* ---- CTA FORM ---- */
  const ctaForm = document.getElementById('ctaForm');
  const ctaSuccess = document.getElementById('ctaSuccess');

  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = ctaForm.querySelector('.cta-form__btn');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulate async submit
      setTimeout(() => {
        ctaForm.style.opacity = '0';
        ctaForm.style.transform = 'translateY(-10px)';
        ctaForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
          ctaForm.style.display = 'none';
          ctaSuccess.classList.add('visible');
        }, 400);
      }, 800);
    });
  }


  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = anchor.getAttribute('href');
      if (target === '#') return;

      const el = document.querySelector(target);
      if (!el) return;

      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ---- PARALLAX: hero content subtle effect ---- */
  const hero = document.querySelector('.hero');
  const heroTexture = document.querySelector('.hero__texture');

  if (hero && heroTexture) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const pct = scrolled / window.innerHeight;
        heroTexture.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }


  /* ---- CURSOR TRAIL: subtle golden dots on hero ---- */
  const heroSection = document.querySelector('.hero');
  let trailTimeout;

  if (heroSection && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      clearTimeout(trailTimeout);

      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: rgba(212,186,136,0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.8s ease, transform 0.8s ease;
      `;
      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%, -50%) scale(3)';
      });

      setTimeout(() => dot.remove(), 900);
    });
  }


  /* ---- BREATHING ANIMATION on silhouette ---- */
  const silhouette = document.querySelector('.hero__silhouette');

  if (silhouette) {
    let breatheIn = true;
    const breathe = () => {
      silhouette.style.transition = breatheIn
        ? 'transform 4s cubic-bezier(0.4, 0, 0.2, 1)'
        : 'transform 4.5s cubic-bezier(0.4, 0, 0.2, 1)';
      silhouette.style.transform = breatheIn ? 'scaleY(1.025)' : 'scaleY(1)';
      breatheIn = !breatheIn;
    };

    breathe();
    setInterval(breathe, 4500);
  }


  /* ---- ACTIVE NAV link highlighting on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--cream)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));


  /* ---- COUNTER ANIMATION for about stats ---- */
  const statNumbers = document.querySelectorAll('.about__stat-number');

  const animateNumber = (el) => {
    const text = el.textContent;
    const num = parseInt(text, 10);
    const suffix = text.replace(/[0-9]/g, '');

    if (isNaN(num)) return;

    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = num / (duration / step);

    const timer = setInterval(() => {
      start = Math.min(start + increment, num);
      el.textContent = Math.round(start) + suffix;
      if (start >= num) {
        el.textContent = text; // restore exact original
        clearInterval(timer);
      }
    }, step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));


  /* ---- CARD HOVER: magnetic effect ---- */
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / rect.height) * -6;
      const rotY = (x / rect.width) * 6;

      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
