/**
 * Fram Digital Fusion — Navbar Component
 * Top navigation bar with logo, search, language switcher, cart, notifications, and user menu.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from './toast.js';

/**
 * Render the top navigation bar.
 * @returns {string} HTML string
 */
export function renderNavbar() {
  const user = store.getCurrentUser();
  const cartCount = store.getCartCount();
  const currentLang = i18n.getLanguage();
  const languages = i18n.getLanguages();
  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];
  const isBuyer = user?.role === 'buyer';

  return `
    <nav class="navbar" id="main-navbar" style="
      position:fixed;top:0;left:0;right:0;height:64px;
      background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);
      border-bottom:1px solid #e5e7eb;
      display:flex;align-items:center;padding:0 24px;gap:16px;
      z-index:1000;font-family:'Inter',sans-serif;">

      <!-- Logo -->
      <a href="#/home" class="navbar-logo" id="navbar-logo" style="
        display:flex;align-items:center;gap:10px;text-decoration:none;
        font-family:'Outfit','Inter',sans-serif;flex-shrink:0;">
        <span style="font-size:28px;">🌾</span>
        <span style="font-size:18px;font-weight:800;
          background:linear-gradient(135deg,#059669,#10b981);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;">
          ${i18n.t('app.name')}
        </span>
      </a>

      <!-- Search Bar -->
      <div style="flex:1;max-width:480px;margin:0 auto;">
        <div style="position:relative;">
          <i data-lucide="search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);
            width:18px;height:18px;color:#9ca3af;"></i>
          <input type="text" id="navbar-search-input" placeholder="${i18n.t('nav.search')}"
            style="width:100%;padding:10px 14px 10px 42px;
            border:1px solid #e5e7eb;border-radius:12px;
            font-size:14px;font-family:'Inter',sans-serif;
            background:#f9fafb;outline:none;transition:all 0.2s;"
            onfocus="this.style.borderColor='#10b981';this.style.background='white';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'"
            onblur="this.style.borderColor='#e5e7eb';this.style.background='#f9fafb';this.style.boxShadow='none'" />
        </div>
      </div>

      <!-- Right Section -->
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">

        <!-- Language Switcher -->
        <div class="nav-dropdown" id="lang-dropdown" style="position:relative;">
          <button id="lang-toggle-btn" style="
            display:flex;align-items:center;gap:6px;padding:8px 12px;
            border:1px solid #e5e7eb;border-radius:10px;background:white;
            cursor:pointer;font-size:13px;font-weight:600;color:#374151;
            font-family:'Inter',sans-serif;transition:all 0.2s;"
            aria-label="${i18n.t('nav.language')}">
            <span>🌐</span>
            <span>${currentLangObj.nativeName}</span>
            <i data-lucide="chevron-down" style="width:14px;height:14px;"></i>
          </button>
          <div id="lang-dropdown-menu" class="dropdown-menu" style="
            display:none;position:absolute;top:calc(100% + 8px);right:0;
            background:white;border-radius:12px;
            box-shadow:0 10px 40px rgba(0,0,0,0.15);
            border:1px solid #e5e7eb;overflow:hidden;min-width:180px;z-index:1001;">
            ${languages.map(lang => `
              <button class="lang-option" data-lang="${lang.code}" style="
                display:flex;align-items:center;gap:10px;
                width:100%;padding:12px 16px;border:none;
                background:${lang.code === currentLang ? '#f0fdf4' : 'white'};
                cursor:pointer;font-size:14px;color:#1f2937;
                font-family:'Inter',sans-serif;text-align:left;
                transition:background 0.15s;
                ${lang.code === currentLang ? 'font-weight:700;color:#059669;' : ''}">
                <span style="font-size:18px;">${lang.flag}</span>
                <span>${lang.nativeName}</span>
                ${lang.code === currentLang ? '<i data-lucide="check" style="width:16px;height:16px;margin-left:auto;color:#059669;"></i>' : ''}
              </button>
            `).join('')}
          </div>
        </div>

        ${isBuyer ? `
        <!-- Cart Icon -->
        <button id="navbar-cart-btn" style="
          position:relative;padding:8px;border:none;background:none;
          cursor:pointer;border-radius:10px;transition:background 0.2s;"
          aria-label="${i18n.t('nav.cart')}">
          <i data-lucide="shopping-cart" style="width:22px;height:22px;color:#374151;"></i>
          ${cartCount > 0 ? `
            <span id="cart-badge" style="
              position:absolute;top:2px;right:2px;
              min-width:18px;height:18px;border-radius:9px;
              background:#dc2626;color:white;font-size:10px;font-weight:700;
              display:flex;align-items:center;justify-content:center;padding:0 4px;">
              ${cartCount}
            </span>
          ` : '<span id="cart-badge" style="display:none;"></span>'}
        </button>
        ` : ''}

        <!-- Notification Bell -->
        <button id="navbar-notification-btn" style="
          position:relative;padding:8px;border:none;background:none;
          cursor:pointer;border-radius:10px;transition:background 0.2s;"
          aria-label="${i18n.t('nav.notifications')}">
          <i data-lucide="bell" style="width:22px;height:22px;color:#374151;"></i>
          <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;
            border-radius:50%;background:#dc2626;border:2px solid white;"></span>
        </button>

        <!-- User Avatar Dropdown -->
        <div class="nav-dropdown" id="user-dropdown" style="position:relative;">
          <button id="user-toggle-btn" style="
            display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;
            border:1px solid #e5e7eb;border-radius:12px;background:white;
            cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;">
            <span style="font-size:24px;line-height:1;">${user?.avatar || '👤'}</span>
            <span style="font-size:13px;font-weight:600;color:#1f2937;max-width:100px;
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              ${user?.name || ''}
            </span>
            <i data-lucide="chevron-down" style="width:14px;height:14px;color:#9ca3af;"></i>
          </button>
          <div id="user-dropdown-menu" class="dropdown-menu" style="
            display:none;position:absolute;top:calc(100% + 8px);right:0;
            background:white;border-radius:12px;
            box-shadow:0 10px 40px rgba(0,0,0,0.15);
            border:1px solid #e5e7eb;overflow:hidden;min-width:200px;z-index:1001;">
            <div style="padding:16px;border-bottom:1px solid #f3f4f6;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${user?.name || ''}</p>
              <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">${user?.email || ''}</p>
            </div>
            <button class="user-menu-item" data-action="profile" style="
              display:flex;align-items:center;gap:10px;
              width:100%;padding:12px 16px;border:none;background:white;
              cursor:pointer;font-size:14px;color:#374151;
              font-family:'Inter',sans-serif;text-align:left;transition:background 0.15s;">
              <i data-lucide="user" style="width:16px;height:16px;"></i>
              ${i18n.t('nav.profile')}
            </button>
            <button class="user-menu-item" data-action="settings" style="
              display:flex;align-items:center;gap:10px;
              width:100%;padding:12px 16px;border:none;background:white;
              cursor:pointer;font-size:14px;color:#374151;
              font-family:'Inter',sans-serif;text-align:left;transition:background 0.15s;">
              <i data-lucide="settings" style="width:16px;height:16px;"></i>
              ${i18n.t('nav.settings')}
            </button>
            <div style="border-top:1px solid #f3f4f6;"></div>
            <button class="user-menu-item" data-action="logout" style="
              display:flex;align-items:center;gap:10px;
              width:100%;padding:12px 16px;border:none;background:white;
              cursor:pointer;font-size:14px;color:#dc2626;
              font-family:'Inter',sans-serif;text-align:left;transition:background 0.15s;">
              <i data-lucide="log-out" style="width:16px;height:16px;"></i>
              ${i18n.t('nav.logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Initialize navbar event handlers.
 */
export function initNavbar() {
  // Language dropdown toggle
  const langToggle = document.getElementById('lang-toggle-btn');
  const langMenu = document.getElementById('lang-dropdown-menu');
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.style.display === 'block';
      closeAllDropdowns();
      langMenu.style.display = isOpen ? 'none' : 'block';
    });
  }

  // Language options
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      i18n.setLanguage(btn.dataset.lang);
      closeAllDropdowns();
    });
  });

  // User dropdown toggle
  const userToggle = document.getElementById('user-toggle-btn');
  const userMenu = document.getElementById('user-dropdown-menu');
  if (userToggle && userMenu) {
    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = userMenu.style.display === 'block';
      closeAllDropdowns();
      userMenu.style.display = isOpen ? 'none' : 'block';
    });
  }

  // User menu items
  document.querySelectorAll('.user-menu-item').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.background = '#f9fafb');
    btn.addEventListener('mouseleave', () => btn.style.background = 'white');
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      closeAllDropdowns();
      if (action === 'profile') router.navigate('#/profile');
      else if (action === 'settings') router.navigate('#/profile');
      else if (action === 'logout') {
        store.logout();
        showToast(i18n.t('toast.logoutSuccess'), 'info');
        router.navigate('#/login');
      }
    });
  });

  // Cart button
  const cartBtn = document.getElementById('navbar-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => router.navigate('#/cart'));
  }

  // Notification bell
  const notifBtn = document.getElementById('navbar-notification-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('No new notifications', 'info');
    });
  }

  // Search
  const searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          router.navigate(`#/marketplace?search=${encodeURIComponent(query)}`);
        }
      }
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', closeAllDropdowns);

  // Hover styles for nav buttons
  [cartBtn, notifBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('mouseenter', () => btn.style.background = '#f3f4f6');
    btn.addEventListener('mouseleave', () => btn.style.background = 'none');
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
}
