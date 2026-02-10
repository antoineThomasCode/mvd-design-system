/* ============================================
   MVD Design System — App Navigation
   SPA-like page switching for the mockup
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const bottomNavItems = document.querySelectorAll('.bottom-nav__item');
  const allNavLinks = document.querySelectorAll('[data-page]');

  function showPage(pageId) {
    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));

    // Show target page
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
      target.classList.add('active');
    }

    // Update bottom nav active state
    bottomNavItems.forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });

    // Update desktop header active state
    document.querySelectorAll('.header__link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Handle all navigation clicks
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      if (pageId) {
        showPage(pageId);
        // Update URL hash without scrolling
        history.pushState(null, '', `#${pageId}`);
      }
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '') || 'home';
    showPage(hash);
  });

  // Handle initial hash
  const initialPage = location.hash.replace('#', '') || 'home';
  showPage(initialPage);

  // ---- Chip toggle (filter pills) ----
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      // Remove active from siblings
      chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
    });
  });

  // ---- Tab toggle ----
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tab.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
      tab.classList.add('tab--active');
    });
  });

  // ---- Quantity controls ----
  document.querySelectorAll('.qty-control').forEach(control => {
    const decBtn = control.querySelector('.qty-control__btn:first-child');
    const incBtn = control.querySelector('.qty-control__btn:last-child');
    const valueEl = control.querySelector('.qty-control__value');

    decBtn.addEventListener('click', () => {
      let val = parseInt(valueEl.textContent);
      if (val > 1) {
        valueEl.textContent = val - 1;
      }
    });

    incBtn.addEventListener('click', () => {
      let val = parseInt(valueEl.textContent);
      valueEl.textContent = val + 1;
    });
  });

  // ---- Watch/favorite toggle ----
  document.querySelectorAll('.auction-card__watch').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('watched');
      const svg = btn.querySelector('svg');
      if (btn.classList.contains('watched')) {
        svg.setAttribute('fill', 'currentColor');
        btn.style.color = 'var(--color-wine)';
      } else {
        svg.setAttribute('fill', 'none');
        btn.style.color = '';
      }
    });
  });

  // ---- Simple countdown animation (demo only) ----
  function updateCountdowns() {
    document.querySelectorAll('.countdown').forEach(countdown => {
      const secEl = countdown.querySelector('.countdown__block:last-child .countdown__value');
      if (secEl) {
        let sec = parseInt(secEl.textContent);
        sec = sec > 0 ? sec - 1 : 59;
        secEl.textContent = String(sec).padStart(2, '0');
      }
    });
  }

  setInterval(updateCountdowns, 1000);
});
