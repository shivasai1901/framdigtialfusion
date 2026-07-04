/**
 * Fram Digital Fusion — Orders Page
 * Order management with status tabs, order cards, and status update actions.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { renderOrderCard, initOrderCards } from '../components/order-card.js';
import { showToast } from '../components/toast.js';

let activeFilter = 'all';

const STATUS_FLOW = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';
  const isFarmer = user.role === 'farmer';

  const allOrders = store.getOrders();
  const filteredOrders = activeFilter === 'all'
    ? allOrders
    : allOrders.filter(o => o.status === activeFilter);

  // Status tabs
  const tabs = ['all', ...STATUS_FLOW];
  const tabsHtml = tabs.map(tab => {
    const count = tab === 'all' ? allOrders.length : allOrders.filter(o => o.status === tab).length;
    const isActive = activeFilter === tab;
    const statusColors = {
      all: '#374151', pending: '#f59e0b', confirmed: '#2563eb',
      packed: '#7c3aed', shipped: '#6366f1', delivered: '#059669'
    };
    const color = statusColors[tab] || '#6b7280';

    return `
      <button class="order-tab" data-status="${tab}" style="
        padding:8px 18px;border-radius:20px;border:none;cursor:pointer;
        font-size:13px;font-weight:${isActive ? '700' : '500'};
        font-family:'Inter',sans-serif;transition:all 0.2s;
        background:${isActive ? color : '#f3f4f6'};
        color:${isActive ? 'white' : '#6b7280'};">
        ${tab === 'all' ? i18n.t('common.all') : i18n.t('orders.status.' + tab)}
        ${count > 0 ? `<span style="margin-left:6px;padding:1px 7px;border-radius:10px;
          font-size:11px;background:${isActive ? 'rgba(255,255,255,0.3)' : '#e5e7eb'};">
          ${count}</span>` : ''}
      </button>
    `;
  }).join('');

  // Orders content
  const ordersHtml = filteredOrders.length > 0
    ? filteredOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(o => renderOrderCard(o, user.role))
        .join('')
    : `
      <div style="text-align:center;padding:60px 20px;">
        <span style="font-size:80px;display:block;margin-bottom:16px;">📋</span>
        <h3 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
          ${i18n.t('orders.noOrders')}
        </h3>
        <p style="color:#6b7280;margin:0;font-size:14px;">
          ${isFarmer ? i18n.t('orders.noOrdersFarmer') : i18n.t('orders.noOrdersBuyer')}
        </p>
      </div>
    `;

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;">

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <h2 style="margin:0;font-size:26px;font-weight:800;color:#111827;
            font-family:'Outfit','Inter',sans-serif;">
            📋 ${isFarmer ? i18n.t('orders.incomingOrders') : i18n.t('orders.myOrders')}
          </h2>
        </div>

        <!-- Status Tabs -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;">
          ${tabsHtml}
        </div>

        <!-- Orders List -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${ordersHtml}
        </div>
      </main>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();
  initOrderCards();

  // Tab click handlers
  document.querySelectorAll('.order-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.status;
      rerender();
    });
  });

  // Status update buttons (for farmers)
  document.querySelectorAll('.order-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId;
      const newStatus = btn.dataset.newStatus;
      store.updateOrderStatus(orderId, newStatus);
      showToast(i18n.t('orders.statusUpdated'), 'success');
      rerender();
    });
  });
}

function rerender() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = render();
    init();
    if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
  }
}
