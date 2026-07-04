/**
 * Fram Digital Fusion — Sidebar Component
 * Left sidebar navigation with role-specific menu items, active state, and collapse toggle.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';

let collapsed = false;

/**
 * Get sidebar menu items based on user role.
 */
function getMenuItems(role) {
  if (role === 'farmer') {
    return [
      { icon: 'layout-dashboard', label: i18n.t('sidebar.dashboard'), route: '#/home' },
      { icon: 'package',          label: i18n.t('sidebar.myProducts'), route: '#/products' },
      { icon: 'clipboard-list',   label: i18n.t('sidebar.orders'), route: '#/orders' },
      { icon: 'user',             label: i18n.t('sidebar.profile'), route: '#/profile' },
    ];
  }
  return [
    { icon: 'layout-dashboard', label: i18n.t('sidebar.dashboard'), route: '#/home' },
    { icon: 'store',            label: i18n.t('sidebar.marketplace'), route: '#/marketplace' },
    { icon: 'clipboard-list',   label: i18n.t('sidebar.myOrders'), route: '#/orders' },
    { icon: 'shopping-cart',    label: i18n.t('sidebar.cart'), route: '#/cart' },
    { icon: 'user',             label: i18n.t('sidebar.profile'), route: '#/profile' },
  ];
}

/**
 * Render the sidebar.
 * @param {string} [currentRoute] - Current route hash for active state
 * @returns {string} HTML string
 */
export function renderSidebar(currentRoute) {
  const user = store.getCurrentUser();
  if (!user) return '';
  const route = currentRoute || router.getCurrentRoute();
  const items = getMenuItems(user.role);
  const cartCount = store.getCartCount();

  const menuHtml = items.map(item => {
    const isActive = route === item.route;
    const badge = item.route === '#/cart' && cartCount > 0
      ? `<span style="margin-left:auto;min-width:20px;height:20px;border-radius:10px;
          background:#dc2626;color:white;font-size:10px;font-weight:700;
          display:flex;align-items:center;justify-content:center;padding:0 6px;">${cartCount}</span>`
      : '';

    return `
      <a href="${item.route}" class="sidebar-item ${isActive ? 'active' : ''}"
        data-route="${item.route}" style="
        display:flex;align-items:center;gap:12px;padding:12px 16px;
        border-radius:12px;text-decoration:none;
        font-size:14px;font-weight:${isActive ? '700' : '500'};
        color:${isActive ? '#059669' : '#4b5563'};
        background:${isActive ? 'linear-gradient(135deg,rgba(5,150,105,0.1),rgba(16,185,129,0.08))' : 'transparent'};
        transition:all 0.2s;cursor:pointer;
        ${collapsed ? 'justify-content:center;padding:12px;' : ''}">
        <i data-lucide="${item.icon}" style="width:20px;height:20px;flex-shrink:0;
          ${isActive ? 'color:#059669;' : ''}"></i>
        ${collapsed ? '' : `<span>${item.label}</span>`}
        ${collapsed ? '' : badge}
      </a>
    `;
  }).join('');

  return `
    <aside class="sidebar" id="main-sidebar" style="
      position:fixed;top:64px;left:0;bottom:0;
      width:${collapsed ? '72px' : '260px'};
      background:white;border-right:1px solid #e5e7eb;
      display:flex;flex-direction:column;
      padding:16px 12px;
      transition:width 0.25s cubic-bezier(0.21,1.02,0.73,1);
      z-index:900;overflow:hidden;">

      <!-- User quick info -->
      <div style="display:flex;align-items:center;gap:12px;padding:12px 8px;
        margin-bottom:16px;border-radius:12px;background:#f9fafb;
        ${collapsed ? 'justify-content:center;padding:12px 4px;' : ''}">
        <span style="font-size:${collapsed ? '28px' : '32px'};line-height:1;">${user.avatar}</span>
        ${collapsed ? '' : `
          <div style="overflow:hidden;">
            <p style="margin:0;font-size:14px;font-weight:700;color:#111827;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${user.name}</p>
            <p style="margin:0;font-size:11px;color:#6b7280;text-transform:capitalize;">${user.role}</p>
          </div>
        `}
      </div>

      <!-- Menu Items -->
      <nav style="flex:1;display:flex;flex-direction:column;gap:4px;">
        ${menuHtml}
      </nav>

      <!-- Collapse Toggle -->
      <button id="sidebar-collapse-btn" style="
        display:flex;align-items:center;justify-content:center;gap:8px;
        padding:12px;margin-top:12px;border:none;border-radius:12px;
        background:#f9fafb;cursor:pointer;font-size:13px;
        color:#6b7280;font-family:'Inter',sans-serif;transition:all 0.2s;"
        aria-label="${i18n.t('sidebar.collapse')}">
        <i data-lucide="${collapsed ? 'chevron-right' : 'chevron-left'}" style="width:18px;height:18px;"></i>
        ${collapsed ? '' : `<span>${i18n.t('sidebar.collapse')}</span>`}
      </button>

      <!-- Footer -->
      ${collapsed ? '' : `
        <div style="padding:12px 8px 4px;margin-top:8px;border-top:1px solid #f3f4f6;">
          <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
            ${i18n.t('app.name')} ${i18n.t('app.version')}
          </p>
        </div>
      `}
    </aside>
  `;
}

/**
 * Initialize sidebar event handlers.
 */
export function initSidebar() {
  // Collapse toggle
  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      collapsed = !collapsed;
      // Re-render sidebar only
      const sidebar = document.getElementById('main-sidebar');
      if (sidebar) {
        sidebar.outerHTML = renderSidebar();
        // Re-init Lucide icons for sidebar
        if (typeof lucide !== 'undefined') {
          try { lucide.createIcons(); } catch(e) { /* */ }
        }
        initSidebar();
      }
      // Adjust main content margin
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.marginLeft = collapsed ? '72px' : '260px';
      }
    });
  }

  // Hover effects on sidebar items
  document.querySelectorAll('.sidebar-item').forEach(item => {
    if (item.classList.contains('active')) return;
    item.addEventListener('mouseenter', () => {
      item.style.background = '#f3f4f6';
      item.style.color = '#1f2937';
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = 'transparent';
      item.style.color = '#4b5563';
    });
  });

  // Hover on collapse button
  if (collapseBtn) {
    collapseBtn.addEventListener('mouseenter', () => collapseBtn.style.background = '#e5e7eb');
    collapseBtn.addEventListener('mouseleave', () => collapseBtn.style.background = '#f9fafb');
  }
}

/**
 * Get whether sidebar is collapsed (for layout calculations).
 */
export function isSidebarCollapsed() {
  return collapsed;
}
