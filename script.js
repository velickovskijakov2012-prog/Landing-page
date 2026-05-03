/* ===== LOADER ===== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  
  /* ===== NAVBAR: scroll style + active link ===== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    // Sticky style
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  
    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
  
  /* ===== MOBILE MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  
  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
  
  /* ===== SCROLL REVEAL ===== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards
        const delay = entry.target.closest('.about-cards, .contact-grid') ? i * 80 : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  /* ===== COUNTER ANIMATION ===== */
  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));
  
  /* ===== CONTACT FORM VALIDATION ===== */
  const form = document.getElementById('contactForm');
  
  function validate(id, errorId, rule, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(errorId);
    const valid = rule(el.value.trim());
    el.classList.toggle('error', !valid);
    err.textContent = valid ? '' : msg;
    return valid;
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
  
    const ok = [
      validate('name',    'nameError',    v => v.length >= 2,              'Please enter your name.'),
      validate('email',   'emailError',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address.'),
      validate('subject', 'subjectError', v => v.length >= 3,              'Please enter a subject.'),
      validate('message', 'messageError', v => v.length >= 10,             'Message must be at least 10 characters.'),
    ].every(Boolean);
  
    if (ok) {
      const success = document.getElementById('formSuccess');
      form.reset();
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }
  });
  
  // Live clear errors on input
  ['name','email','subject','message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
      this.classList.remove('error');
      document.getElementById(id + 'Error').textContent = '';
    });
  });
  