/**
 * Fram Digital Fusion — Order Card Component
 * Displays order summary, items, status badge, timeline, and role-specific actions.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: '#f59e0b', bg: '#fffbeb',  icon: 'clock' },
  confirmed: { label: 'Confirmed', color: '#2563eb', bg: '#eff6ff',  icon: 'check-circle' },
  accepted:  { label: 'Accepted',  color: '#2563eb', bg: '#eff6ff',  icon: 'check-circle' },
  shipped:   { label: 'Shipped',   color: '#7c3aed', bg: '#f5f3ff',  icon: 'truck' },
  delivered: { label: 'Delivered', color: '#059669', bg: '#ecfdf5',  icon: 'package-check' },
  rejected:  { label: 'Rejected', color: '#dc2626', bg: '#fef2f2',  icon: 'x-circle' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fef2f2',  icon: 'x-circle' },
  placed:    { label: 'Placed',   color: '#6b7280', bg: '#f9fafb',  icon: 'shopping-bag' },
};

/**
 * Render an order card.
 * @param {Object} order - Order data
 * @param {string} userRole - 'farmer' | 'buyer'
 * @returns {string} HTML string
 */
export function renderOrderCard(order, userRole) {
  const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  // Items list
  const itemsHtml = order.items.map(item => {
    const itemName = item.name || item.productName || 'Product';
    const itemEmoji = item.emoji || '📦';
    const itemUnit = item.unit || '';
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f3f4f6;">
      <span style="font-size:28px;">${itemEmoji}</span>
      <div style="flex:1;">
        <p style="margin:0;font-size:14px;font-weight:600;color:#1f2937;">${itemName}</p>
        <p style="margin:0;font-size:12px;color:#6b7280;">${item.quantity} ${itemUnit} × ${i18n.formatPrice(item.price)}</p>
      </div>
      <span style="font-weight:700;color:#111827;font-family:'Outfit','Inter',sans-serif;">
        ${i18n.formatPrice(item.price * item.quantity)}
      </span>
    </div>
  `;
  }).join('');

  // Timeline
  const timelineHtml = (order.timeline || []).map((step, idx) => {
    const stepConf = STATUS_CONFIG[step.status] || STATUS_CONFIG.placed;
    const isLast = idx === order.timeline.length - 1;
    return `
      <div style="display:flex;align-items:flex-start;gap:12px;position:relative;">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="width:24px;height:24px;border-radius:50%;
            background:${isLast ? stepConf.color : '#e5e7eb'};
            display:flex;align-items:center;justify-content:center;">
            <i data-lucide="${stepConf.icon}" style="width:12px;height:12px;color:${isLast ? 'white' : '#9ca3af'};"></i>
          </div>
          ${idx < order.timeline.length - 1 ? `<div style="width:2px;height:24px;background:#e5e7eb;"></div>` : ''}
        </div>
        <div style="padding-bottom:${isLast ? '0' : '8px'};">
          <p style="margin:0;font-size:13px;font-weight:600;color:${isLast ? stepConf.color : '#6b7280'};text-transform:capitalize;">
            ${stepConf.label}
          </p>
          <p style="margin:0;font-size:11px;color:#9ca3af;">${i18n.formatDate(step.date)}</p>
        </div>
      </div>
    `;
  }).join('');

  // Action buttons based on role
  let actionsHtml = '';
  if (userRole === 'farmer') {
    if (order.status === 'pending') {
      actionsHtml = `
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="order-accept-btn" data-order-id="${order.id}"
            style="flex:1;padding:10px;border:none;border-radius:8px;
            background:linear-gradient(135deg,#059669,#10b981);color:white;
            font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="check" style="width:16px;height:16px;"></i>
            ${i18n.t('orders.accept')}
          </button>
          <button class="order-reject-btn" data-order-id="${order.id}"
            style="flex:1;padding:10px;border:none;border-radius:8px;
            background:#dc2626;color:white;
            font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="x" style="width:16px;height:16px;"></i>
            ${i18n.t('orders.reject')}
          </button>
        </div>
      `;
    } else if (order.status === 'confirmed' || order.status === 'accepted') {
      actionsHtml = `
        <div style="margin-top:16px;">
          <button class="order-ship-btn" data-order-id="${order.id}"
            style="width:100%;padding:10px;border:none;border-radius:8px;
            background:linear-gradient(135deg,#7c3aed,#8b5cf6);color:white;
            font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="truck" style="width:16px;height:16px;"></i>
            ${i18n.t('orders.ship')}
          </button>
        </div>
      `;
    } else if (order.status === 'shipped') {
      actionsHtml = `
        <div style="margin-top:16px;padding:12px;border-radius:10px;
          background:#f5f3ff;border:1px solid #ddd6fe;
          font-size:13px;font-weight:600;color:#7c3aed;
          display:flex;align-items:center;justify-content:center;gap:8px;">
          🚚 Shipped — Waiting for buyer to confirm delivery
        </div>
      `;
    } else if (order.status === 'delivered') {
      actionsHtml = `
        <div style="margin-top:16px;padding:12px;border-radius:10px;
          background:#ecfdf5;border:1px solid #a7f3d0;
          font-size:13px;font-weight:700;color:#059669;
          display:flex;align-items:center;justify-content:center;gap:8px;">
          ✅ Delivery Confirmed by Buyer
        </div>
      `;
    }
  } else {
    // Buyer actions
    if (order.status === 'shipped') {
      // Buyer can confirm delivery when order is shipped
      actionsHtml = `
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="order-confirm-delivery-btn" data-order-id="${order.id}"
            style="flex:1;padding:12px;border:none;border-radius:10px;
            background:linear-gradient(135deg,#059669,#10b981);color:white;
            font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:8px;
            box-shadow:0 4px 14px rgba(5,150,105,0.3);transition:all 0.2s;"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='translateY(0)'">
            <i data-lucide="package-check" style="width:18px;height:18px;"></i>
            ✅ Confirm Delivery Received
          </button>
          <button class="order-track-btn" data-order-id="${order.id}"
            style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
            background:white;color:#374151;
            font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="map-pin" style="width:14px;height:14px;"></i>
            ${i18n.t('orders.track')}
          </button>
        </div>
      `;
    } else if (order.status === 'delivered') {
      actionsHtml = `
        <div style="display:flex;gap:8px;margin-top:16px;">
          <div style="flex:1;padding:12px;border-radius:10px;
            background:#ecfdf5;border:1px solid #a7f3d0;
            font-size:14px;font-weight:700;color:#059669;
            display:flex;align-items:center;justify-content:center;gap:8px;">
            ✅ Delivery Confirmed
          </div>
          <button class="order-reorder-btn" data-order-id="${order.id}"
            style="padding:12px 16px;border:none;border-radius:10px;
            background:linear-gradient(135deg,#059669,#10b981);color:white;
            font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="repeat" style="width:14px;height:14px;"></i>
            ${i18n.t('orders.reorder')}
          </button>
        </div>
      `;
    } else {
      actionsHtml = `
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="order-track-btn" data-order-id="${order.id}"
            style="flex:1;padding:10px;border:1px solid #e5e7eb;border-radius:8px;
            background:white;color:#374151;
            font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="map-pin" style="width:14px;height:14px;"></i>
            ${i18n.t('orders.track')}
          </button>
          <button class="order-reorder-btn" data-order-id="${order.id}"
            style="flex:1;padding:10px;border:none;border-radius:8px;
            background:linear-gradient(135deg,#059669,#10b981);color:white;
            font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
            display:flex;align-items:center;justify-content:center;gap:6px;">
            <i data-lucide="repeat" style="width:14px;height:14px;"></i>
            ${i18n.t('orders.reorder')}
          </button>
        </div>
      `;
    }
  }

  return `
    <article class="order-card" data-order-id="${order.id}" style="
      background:white;border-radius:16px;padding:24px;
      box-shadow:0 1px 3px rgba(0,0,0,0.06);
      transition:box-shadow 0.2s;margin-bottom:16px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <h4 style="margin:0 0 2px;font-size:16px;font-weight:700;color:#111827;">
            ${i18n.t('orders.orderId')} #${order.id}
          </h4>
          <p style="margin:0;font-size:12px;color:#6b7280;">
            ${i18n.t('orders.placed')}: ${i18n.formatDate(order.createdAt)}
          </p>
        </div>
        <span style="
          padding:6px 14px;border-radius:20px;
          background:${statusConf.bg};color:${statusConf.color};
          font-size:12px;font-weight:700;text-transform:uppercase;
          letter-spacing:0.05em;display:flex;align-items:center;gap:4px;">
          <i data-lucide="${statusConf.icon}" style="width:14px;height:14px;"></i>
          ${statusConf.label}
        </span>
      </div>

      <!-- Counterparty info -->
      <p style="margin:0 0 12px;font-size:13px;color:#6b7280;">
        ${userRole === 'farmer' ? `🏪 ${order.buyerName}` : `👨‍🌾 ${order.farmerName}`}
      </p>

      <!-- Items -->
      <div style="margin-bottom:12px;">
        ${itemsHtml}
      </div>

      <!-- Total -->
      <div style="display:flex;justify-content:space-between;align-items:center;
        padding:12px 0;border-top:2px solid #f3f4f6;">
        <span style="font-size:13px;color:#6b7280;font-weight:600;">
          ${i18n.t('orders.total')} (${order.items.length} ${i18n.t('orders.items')})
        </span>
        <span style="font-size:20px;font-weight:800;color:#059669;font-family:'Outfit','Inter',sans-serif;">
          ${i18n.formatPrice(order.total)}
        </span>
      </div>

      <!-- Timeline -->
      <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;">
        ${timelineHtml}
      </div>

      <!-- Actions -->
      ${actionsHtml}
    </article>
  `;
}

/**
 * Initialize event handlers for order cards.
 * Call after rendering order cards into the DOM.
 */
export function initOrderCards() {
  // Accept order
  document.querySelectorAll('.order-accept-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateOrderStatus(btn.dataset.orderId, 'confirmed');
      showToast(i18n.t('toast.orderStatusUpdated'), 'success');
      // Refresh via custom event
      document.dispatchEvent(new CustomEvent('orders-refresh'));
    });
  });

  // Reject order
  document.querySelectorAll('.order-reject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateOrderStatus(btn.dataset.orderId, 'cancelled');
      showToast(i18n.t('toast.orderStatusUpdated'), 'warning');
      document.dispatchEvent(new CustomEvent('orders-refresh'));
    });
  });

  // Ship order
  document.querySelectorAll('.order-ship-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateOrderStatus(btn.dataset.orderId, 'shipped');
      showToast(i18n.t('toast.orderStatusUpdated'), 'success');
      document.dispatchEvent(new CustomEvent('orders-refresh'));
    });
  });

  // Deliver order (farmer marks as delivered)
  document.querySelectorAll('.order-deliver-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateOrderStatus(btn.dataset.orderId, 'delivered');
      showToast(i18n.t('toast.orderStatusUpdated'), 'success');
      document.dispatchEvent(new CustomEvent('orders-refresh'));
    });
  });

  // Confirm Delivery (buyer confirms they received the order)
  document.querySelectorAll('.order-confirm-delivery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.updateOrderStatus(btn.dataset.orderId, 'delivered');
      showToast('🎉 Order delivery confirmed! Thank you.', 'success');
      document.dispatchEvent(new CustomEvent('orders-refresh'));
    });
  });

  // Track order (show timeline modal)
  document.querySelectorAll('.order-track-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = store.getOrderById(btn.dataset.orderId);
      if (!order) return;
      const { showModal } = /** @type {any} */ (window.__framModals || {});
      // Just show a toast for now with status
      showToast(`Order ${order.id}: ${order.status.toUpperCase()}`, 'info');
    });
  });

  // Reorder
  document.querySelectorAll('.order-reorder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = store.getOrderById(btn.dataset.orderId);
      if (!order) return;
      order.items.forEach(item => {
        const product = store.getProductById(item.productId);
        if (product) store.addToCart(item.productId, item.quantity);
      });
      showToast(i18n.t('toast.addedToCart'), 'success');
    });
  });

  // Hover effects
  document.querySelectorAll('.order-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    });
  });
}
