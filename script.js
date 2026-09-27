/* ============================================= */
/*   あか牛料理 くれない — JavaScript                    */
/* ============================================= */

(function () {
  'use strict';

  /* ---------- ヘッダー：スクロールで背景変更 ---------- */
  const header = document.getElementById('site-header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ---------- ハンバーガーメニュー ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('global-nav');

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // ナビリンクをタップしたら閉じる
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });


  /* ---------- スクロールアニメーション (Intersection Observer) ---------- */
  const fadeTargets = document.querySelectorAll(
    '.section-header, .about-intro, .about-item, .menu-card, .doneness, .info-map-placeholder, .info-detail'
  );

  fadeTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    // 連続する要素に少しずつ遅延
    const delay = Math.min(i % 4, 3);
    if (delay > 0) el.classList.add(`fade-in-delay-${delay}`);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeTargets.forEach(el => observer.observe(el));


  /* ---------- スムーズスクロール（ハッシュリンク対応） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ---------- メニューカードのホバーエフェクト強化 ---------- */
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.3s ease, background 0.3s ease';
    });
  });

})();
