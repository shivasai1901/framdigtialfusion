/**
 * Fram Digital Fusion — Profile Page
 * User profile with avatar, info, edit form, language settings, and quick stats.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { showToast } from '../components/toast.js';

let editing = false;

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';
  const isFarmer = user.role === 'farmer';
  const currentLang = i18n.getLanguage();
  const languages = i18n.getLanguages();

  // Quick stats
  let statsHtml = '';
  if (isFarmer) {
    const stats = store.getFarmerStats(user.id);
    statsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="padding:20px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#059669;font-family:'Outfit',sans-serif;">${stats.totalProducts}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.totalProducts')}</p>
        </div>
        <div style="padding:20px;background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#2563eb;font-family:'Outfit',sans-serif;">${stats.pendingOrders}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.pendingOrders')}</p>
        </div>
        <div style="padding:20px;background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#d97706;font-family:'Outfit',sans-serif;">${i18n.formatPrice(stats.totalEarnings)}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.totalEarnings')}</p>
        </div>
        <div style="padding:20px;background:linear-gradient(135deg,#f5f3ff,#ede9fe);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#7c3aed;font-family:'Outfit',sans-serif;">${stats.activeBuyers}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.activeBuyers')}</p>
        </div>
      </div>
    `;
  } else {
    const stats = store.getBuyerStats(user.id);
    statsHtml = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="padding:20px;background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#2563eb;font-family:'Outfit',sans-serif;">${stats.myOrders}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.myOrders')}</p>
        </div>
        <div style="padding:20px;background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;text-align:center;">
          <p style="margin:0;font-size:32px;font-weight:900;color:#d97706;font-family:'Outfit',sans-serif;">${i18n.formatPrice(stats.totalSpent)}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;font-weight:600;">${i18n.t('home.totalSpent')}</p>
        </div>
      </div>
    `;
  }

  // Language selector
  const langHtml = languages.map(lang => `
    <button class="lang-option" data-lang="${lang.code}" style="
      display:flex;align-items:center;gap:10px;padding:14px 18px;
      border:2px solid ${currentLang === lang.code ? '#10b981' : '#e5e7eb'};
      border-radius:12px;background:${currentLang === lang.code ? '#f0fdf4' : 'white'};
      cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;flex:1;">
      <span style="font-size:24px;">${lang.flag}</span>
      <div>
        <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${lang.nativeName}</p>
        <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">${lang.name}</p>
      </div>
      ${currentLang === lang.code ? '<i data-lucide="check-circle" style="margin-left:auto;width:18px;height:18px;color:#059669;"></i>' : ''}
    </button>
  `).join('');

  // Profile form (edit mode) or display mode
  const profileContent = editing ? `
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
          ${i18n.t('auth.name')}
        </label>
        <input type="text" id="edit-name" value="${user.name}"
          style="width:100%;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;"
          onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div>
        <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
          ${i18n.t('auth.phone')}
        </label>
        <input type="text" id="edit-phone" value="${user.phone || ''}"
          style="width:100%;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;"
          onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div>
        <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">
          ${i18n.t('auth.location')}
        </label>
        <input type="text" id="edit-location" value="${user.location || ''}"
          style="width:100%;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;"
          onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div style="display:flex;gap:10px;margin-top:8px;">
        <button id="save-profile-btn" style="flex:1;padding:12px;border:none;border-radius:10px;
          background:linear-gradient(135deg,#059669,#10b981);color:white;font-size:14px;
          font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;">
          ${i18n.t('common.save')}
        </button>
        <button id="cancel-edit-btn" style="flex:1;padding:12px;border:1px solid #e5e7eb;
          border-radius:10px;background:white;color:#374151;font-size:14px;
          font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;">
          ${i18n.t('common.cancel')}
        </button>
      </div>
    </div>
  ` : `
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <i data-lucide="mail" style="width:16px;height:16px;color:#9ca3af;"></i>
        <span style="font-size:14px;color:#4b5563;">${user.email}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <i data-lucide="phone" style="width:16px;height:16px;color:#9ca3af;"></i>
        <span style="font-size:14px;color:#4b5563;">${user.phone || '—'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <i data-lucide="map-pin" style="width:16px;height:16px;color:#9ca3af;"></i>
        <span style="font-size:14px;color:#4b5563;">${user.location || '—'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <i data-lucide="calendar" style="width:16px;height:16px;color:#9ca3af;"></i>
        <span style="font-size:14px;color:#4b5563;">
          ${i18n.t('profile.memberSince')} ${new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
      <button id="edit-profile-btn" style="margin-top:8px;padding:12px;border:1px solid #e5e7eb;
        border-radius:10px;background:white;color:#374151;font-size:14px;
        font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;
        display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;">
        <i data-lucide="edit-2" style="width:16px;height:16px;"></i>
        ${i18n.t('profile.editProfile')}
      </button>
    </div>
  `;

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;">

        <h2 style="margin:0 0 28px;font-size:26px;font-weight:800;color:#111827;
          font-family:'Outfit','Inter',sans-serif;">
          ${i18n.t('profile.title')}
        </h2>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;">

          <!-- Left Column -->
          <div style="display:flex;flex-direction:column;gap:24px;">

            <!-- User Card -->
            <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;padding:32px;text-align:center;">
              <span style="font-size:80px;display:block;margin-bottom:12px;">${user.avatar || '👤'}</span>
              <h3 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#111827;
                font-family:'Outfit','Inter',sans-serif;">${user.name}</h3>
              <span style="display:inline-block;padding:4px 16px;border-radius:20px;font-size:12px;
                font-weight:700;background:${isFarmer ? '#f0fdf4' : '#eff6ff'};
                color:${isFarmer ? '#059669' : '#2563eb'};">
                ${isFarmer ? '👨‍🌾 ' + i18n.t('roles.farmer') : '🛒 ' + i18n.t('roles.buyer')}
              </span>
            </div>

            <!-- Profile Details / Edit -->
            <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;padding:28px;">
              <h4 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">
                ${i18n.t('profile.personalInfo')}
              </h4>
              ${profileContent}
            </div>
          </div>

          <!-- Right Column -->
          <div style="display:flex;flex-direction:column;gap:24px;">

            <!-- Quick Stats -->
            <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;padding:28px;">
              <h4 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">
                ${i18n.t('profile.stats')}
              </h4>
              ${statsHtml}
            </div>

            <!-- Language Settings -->
            <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;padding:28px;">
              <h4 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#111827;">
                🌐 ${i18n.t('profile.language')}
              </h4>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                ${langHtml}
              </div>
            </div>

            <!-- Logout -->
            <button id="logout-btn" style="width:100%;padding:16px;border:2px solid #fecaca;
              border-radius:14px;background:#fef2f2;color:#dc2626;font-size:15px;
              font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
              display:flex;align-items:center;justify-content:center;gap:10px;transition:all 0.2s;">
              <i data-lucide="log-out" style="width:18px;height:18px;"></i>
              ${i18n.t('auth.logout')}
            </button>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();

  // Edit profile
  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      editing = true;
      rerender();
    });
  }

  // Save profile
  const saveBtn = document.getElementById('save-profile-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const name = document.getElementById('edit-name')?.value?.trim();
      const phone = document.getElementById('edit-phone')?.value?.trim();
      const location = document.getElementById('edit-location')?.value?.trim();

      if (!name) {
        showToast(i18n.t('validation.nameRequired'), 'error');
        return;
      }

      const user = store.getCurrentUser();
      if (user) {
        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('fdf_users') || '[]');
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], name, phone, location };
          localStorage.setItem('fdf_users', JSON.stringify(users));
        }
      }

      editing = false;
      showToast(i18n.t('profile.saved'), 'success');
      rerender();
    });
  }

  // Cancel edit
  const cancelBtn = document.getElementById('cancel-edit-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      editing = false;
      rerender();
    });
  }

  // Language switch
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      i18n.setLanguage(btn.dataset.lang);
      rerender();
    });
  });

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      store.logout();
      router.navigate('#/login');
    });
  }
}

function rerender() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = render();
    init();
    if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
  }
}
