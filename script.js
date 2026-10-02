/**
 * Quality Bakers — Maximalist Luxury & Ethical Interactive System
 * Established 2016 • Rohini Sector 24, Delhi
 */


document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Mobile Navigation Drawer Toggle
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');


  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });


    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // =========================================================================
  // 2. Cookie Consent Banner (Persistent & Privacy-First)
  // =========================================================================
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-cookie-accept');
  const btnDeclineCookies = document.getElementById('btn-cookie-decline');


  if (cookieBanner) {
    const consent = localStorage.getItem('qb_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }


    if (btnAcceptCookies) {
      btnAcceptCookies.addEventListener('click', () => {
        localStorage.setItem('qb_cookie_consent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }


    if (btnDeclineCookies) {
      btnDeclineCookies.addEventListener('click', () => {
        localStorage.setItem('qb_cookie_consent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }


  // =========================================================================
  // 3. Moving Digital Menu Board & Category Filtering (menu.html)
  // =========================================================================
  const tabButtons = document.querySelectorAll('.kiosk-tab-btn');
  const dishCards = document.querySelectorAll('.digital-dish-card');
  const searchInput = document.getElementById('kiosk-search');
  const toggleViewBtn = document.getElementById('btn-toggle-view');
  const menuContainer = document.getElementById('menu-display-area');


  let activeCategory = 'all';


  function filterMenuDisplay() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';


    let visibleCount = 0;
    dishCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const name = card.querySelector('.dish-name')?.textContent.toLowerCase() || '';


      const matchCategory = (activeCategory === 'all' || category === activeCategory);
      const matchSearch = (query === '' || name.includes(query));


      if (matchCategory && matchSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInUp 0.35s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });


    const emptyNotice = document.getElementById('menu-empty-notice');
    if (emptyNotice) {
      emptyNotice.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }


  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-target') || 'all';
        filterMenuDisplay();
      });
    });
  }


  if (searchInput) {
    searchInput.addEventListener('input', filterMenuDisplay);
  }


  // Toggle between Digital Kiosk (Moving/Card Grid) and Compact Classic List
  if (toggleViewBtn && menuContainer) {
    let isCompact = false;
    toggleViewBtn.addEventListener('click', () => {
      isCompact = !isCompact;
      menuContainer.classList.toggle('compact-view-mode', isCompact);
      toggleViewBtn.innerHTML = isCompact
        ? '<span>❖ Digital Kiosk View</span>'
        : '<span>📋 Full Classic Menu View</span>';
    });
  }


  // Quick Order button on menu items
  document.querySelectorAll('.dish-order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      const msg = encodeURIComponent(
        `Hi Quality Bakers, I would like to place an order for takeaway:\n\n` +
        `🍽️ *Item:* ${item} (${price})\n` +
        `\nPlease let me know the preparation time. Thank you!`
      );
      window.open(`https://wa.me/919810024016?text=${msg}`, '_blank');
    });
  });


  // =========================================================================
  // 4. Accessible Legal Modals (<dialog>)
  // =========================================================================
  const legalModal = document.getElementById('legal-dialog');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalBody = document.getElementById('legal-modal-body');
  const legalModalClose = document.getElementById('legal-modal-close');


  const legalContentMap = {
    privacy: {
      title: 'Privacy Policy & Data Minimalism',
      html: `
        <h4>No Unnecessary Data Collection</h4>
        <p>Quality Bakers operates on strict data minimization principles. We only collect the minimal details (name and phone) necessary to fulfill your takeaway orders or deliver celebration hampers.</p>
        <h4>Zero Third-Party Trackers</h4>
        <p>We do not deploy invasive marketing trackers, advertising pixels, or analytics surveillance SDKs. Your data is never sold or shared.</p>
        <h4>Age Consent &amp; Minors</h4>
        <p>Our website is designed for general family audiences. We do not knowingly collect personal data from minors under 18 years without parental consent.</p>
        <h4>Opt-Out Anytime</h4>
        <p>You can revoke messaging consent or stop order alerts anytime by messaging <strong>STOP</strong> on WhatsApp.</p>
      `
    },
    terms: {
      title: 'Terms of Service & Transparent Pricing',
      html: `
        <h4>Zero Hidden Fees Guarantee</h4>
        <p>All prices listed on our menu and festive hampers are in Indian Rupees (INR) and are 100% inclusive of all applicable taxes. We charge no surprise packaging fees, extra convenience charges, or hidden platform commissions.</p>
        <h4>No Dark Patterns</h4>
        <p>We believe in honest commerce. We do not use fake scarcity countdowns, pre-checked checkboxes, or manipulative interfaces.</p>
      `
    },
    refund: {
      title: 'Refund & Freshness Policy',
      html: `
        <h4>Perishable Hot Savories</h4>
        <p>Freshly baked hot snacks (puffs, rolls, chowmein) cannot be returned once handed over. However, if any product fails our rigorous freshness or quality standards, we will immediately replace it or issue an instant refund upon inspection.</p>
        <h4>Festive Hampers</h4>
        <p>Pre-orders for Diwali festive hampers can be adjusted or cancelled up to 48 hours before the scheduled dispatch date.</p>
      `
    },
    cookie: {
      title: 'Cookie Disclosures',
      html: `
        <h4>Strictly Functional Cookies Only</h4>
        <p>We only use minimal local browser storage to save your display preferences and cookie consent status. We do not utilize third-party tracking or behavioral profiling cookies.</p>
      `
    },
    deletion: {
      title: 'Data Deletion Request (Right to be Forgotten)',
      html: `
        <p>Under our ethical data policy, you have the right to request the permanent deletion of your phone number and order history from our contact records.</p>
        <p>Please message us directly on WhatsApp at <strong>+91 98100 24016</strong> with the text <em>"DELETE MY CONTACT DATA"</em> or visit our <a href="legal.html#data-deletion" style="color: var(--crimson-royal); text-decoration: underline;">Legal Hub</a> to submit a request.</p>
      `
    }
  };


  document.querySelectorAll('[data-open-legal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-open-legal');
      const data = legalContentMap[type];
      if (data && legalModal && legalModalTitle && legalModalBody) {
        legalModalTitle.textContent = data.title;
        legalModalBody.innerHTML = data.html;
        if (typeof legalModal.showModal === 'function') {
          legalModal.showModal();
        }
      }
    });
  });


  if (legalModalClose && legalModal) {
    legalModalClose.addEventListener('click', () => {
      legalModal.close();
    });
  }


  if (legalModal) {
    legalModal.addEventListener('click', (event) => {
      const rect = legalModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        legalModal.close();
      }
    });
  }
});



