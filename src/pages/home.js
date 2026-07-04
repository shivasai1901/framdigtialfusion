/**
 * Fram Digital Fusion — Home / Dashboard Page
 * Shows role-specific stats, recent orders, quick actions, and featured products.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { renderStatsCard, initStatsCards } from '../components/stats-card.js';
import { renderProductCard, initProductCards } from '../components/product-card.js';
import { renderOrderCard, initOrderCards } from '../components/order-card.js';

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const isFarmer = user.role === 'farmer';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';

  // Build stats
  let statsHtml = '';
  if (isFarmer) {
    const stats = store.getFarmerStats(user.id);
    statsHtml = `
      ${renderStatsCard({ icon: 'package', label: i18n.t('home.totalProducts'), value: stats.totalProducts, trend: { direction: 'up', percentage: 12 }, color: 'green' })}
      ${renderStatsCard({ icon: 'clock', label: i18n.t('home.pendingOrders'), value: stats.pendingOrders, color: 'orange' })}
      ${renderStatsCard({ icon: 'indian-rupee', label: i18n.t('home.totalEarnings'), value: i18n.formatPrice(stats.totalEarnings), trend: { direction: 'up', percentage: 8 }, color: 'blue' })}
      ${renderStatsCard({ icon: 'users', label: i18n.t('home.activeBuyers'), value: stats.activeBuyers, color: 'purple' })}
    `;
  } else {
    const stats = store.getBuyerStats(user.id);
    statsHtml = `
      ${renderStatsCard({ icon: 'shopping-bag', label: i18n.t('home.availableProducts'), value: stats.availableProducts, trend: { direction: 'up', percentage: 5 }, color: 'green' })}
      ${renderStatsCard({ icon: 'clipboard-list', label: i18n.t('home.myOrders'), value: stats.myOrders, color: 'blue' })}
      ${renderStatsCard({ icon: 'indian-rupee', label: i18n.t('home.totalSpent'), value: i18n.formatPrice(stats.totalSpent), color: 'orange' })}
      ${renderStatsCard({ icon: 'heart', label: i18n.t('home.favoriteFarmers'), value: stats.favoriteFarmers, color: 'purple' })}
    `;
  }

  // Recent orders
  const orders = store.getOrdersForUser(user.id, user.role).slice(0, 3);
  const recentOrdersHtml = orders.length > 0
    ? orders.map(o => renderOrderCard(o, user.role)).join('')
    : `<p style="text-align:center;color:#9ca3af;padding:32px;">${i18n.t('orders.noOrders')}</p>`;

  // Featured products (for buyer)
  const featuredProducts = store.getProducts().slice(0, 4);
  const featuredHtml = !isFarmer ? `
    <section style="margin-top:32px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <h3 style="margin:0;font-size:18px;font-weight:700;color:#111827;">
          ${i18n.t('home.featuredProducts')}
        </h3>
        <a href="#/marketplace" style="font-size:13px;font-weight:600;color:#059669;text-decoration:none;">
          ${i18n.t('home.viewAll')} →
        </a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;">
        ${featuredProducts.map(p => renderProductCard(p, 'buyer', false)).join('')}
      </div>
    </section>
  ` : '';

  // Quick actions
  const quickActionsHtml = isFarmer ? `
    <button id="quick-add-product" style="
      display:flex;align-items:center;gap:10px;padding:16px 24px;
      border:2px dashed #10b981;border-radius:14px;background:#f0fdf4;
      cursor:pointer;font-size:15px;font-weight:700;color:#059669;
      font-family:'Inter',sans-serif;transition:all 0.2s;">
      <i data-lucide="plus-circle" style="width:22px;height:22px;"></i>
      ${i18n.t('home.addProduct')}
    </button>
  ` : `
    <button id="quick-browse-marketplace" style="
      display:flex;align-items:center;gap:10px;padding:16px 24px;
      border:2px dashed #10b981;border-radius:14px;background:#f0fdf4;
      cursor:pointer;font-size:15px;font-weight:700;color:#059669;
      font-family:'Inter',sans-serif;transition:all 0.2s;">
      <i data-lucide="store" style="width:22px;height:22px;"></i>
      ${i18n.t('home.browseMarketplace')}
    </button>
  `;

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;min-height:calc(100vh - 64px);">

        <!-- Welcome -->
        <div style="margin-bottom:28px;">
          <h2 style="margin:0 0 4px;font-size:26px;font-weight:800;color:#111827;
            font-family:'Outfit','Inter',sans-serif;">
            ${i18n.t('home.welcome')}, ${user.name}! 👋
          </h2>
          <p style="margin:0;font-size:14px;color:#6b7280;">
            ${i18n.t('app.tagline')}
          </p>
        </div>

        <!-- Stats Row -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-bottom:32px;">
          ${statsHtml}
        </div>

        <!-- Quick Actions -->
        <section style="margin-bottom:32px;">
          <h3 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#111827;">
            ${i18n.t('home.quickActions')}
          </h3>
          ${quickActionsHtml}
        </section>

        <!-- Recent Orders -->
        <section style="margin-bottom:32px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;font-size:18px;font-weight:700;color:#111827;">
              ${i18n.t('home.recentOrders')}
            </h3>
            <a href="#/orders" style="font-size:13px;font-weight:600;color:#059669;text-decoration:none;">
              ${i18n.t('home.viewAll')} →
            </a>
          </div>
          ${recentOrdersHtml}
        </section>

        <!-- Featured Products (buyer only) -->
        ${featuredHtml}

      </main>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();
  initStatsCards();
  initOrderCards();
  initProductCards();

  // Quick actions
  const addProductBtn = document.getElementById('quick-add-product');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => router.navigate('#/products'));
    addProductBtn.addEventListener('mouseenter', () => {
      addProductBtn.style.background = '#dcfce7';
      addProductBtn.style.borderColor = '#059669';
    });
    addProductBtn.addEventListener('mouseleave', () => {
      addProductBtn.style.background = '#f0fdf4';
      addProductBtn.style.borderColor = '#10b981';
    });
  }

  const browseBtn = document.getElementById('quick-browse-marketplace');
  if (browseBtn) {
    browseBtn.addEventListener('click', () => router.navigate('#/marketplace'));
    browseBtn.addEventListener('mouseenter', () => {
      browseBtn.style.background = '#dcfce7';
      browseBtn.style.borderColor = '#059669';
    });
    browseBtn.addEventListener('mouseleave', () => {
      browseBtn.style.background = '#f0fdf4';
      browseBtn.style.borderColor = '#10b981';
    });
  }

  // Listen for orders refresh
  document.addEventListener('orders-refresh', () => {
    router.renderCurrentRoute();
  });
}
