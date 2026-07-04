/**
 * Fram Digital Fusion — Cart Page
 * Shopping cart with quantity controls, summary, checkout form, and order placement.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { showToast } from '../components/toast.js';

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';
  const cartItems = store.getCart();
  const cartTotal = store.getCartTotal();

  // Empty cart
  if (cartItems.length === 0) {
    return `
      ${renderNavbar()}
      <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
        ${renderSidebar()}
        <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
          background:#f9fafb;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;max-width:400px;">
            <span style="font-size:100px;display:block;margin-bottom:20px;">🛒</span>
            <h2 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#111827;
              font-family:'Outfit','Inter',sans-serif;">
              ${i18n.t('cart.empty')}
            </h2>
            <p style="color:#6b7280;margin:0 0 28px;font-size:15px;line-height:1.6;">
              ${i18n.t('cart.emptyDesc')}
            </p>
            <a href="#/marketplace" style="display:inline-flex;align-items:center;gap:8px;
              padding:14px 32px;background:linear-gradient(135deg,#059669,#10b981);
              color:white;border-radius:14px;text-decoration:none;font-weight:700;font-size:15px;
              box-shadow:0 4px 14px rgba(16,185,129,0.3);transition:all 0.2s;">
              <i data-lucide="store" style="width:18px;height:18px;"></i>
              ${i18n.t('home.browseMarketplace')}
            </a>
          </div>
        </main>
      </div>
    `;
  }

  // Cart items HTML
  const itemsHtml = cartItems.map(item => {
    const p = item.product;
    const lineTotal = p.price * item.quantity;
    return `
      <div class="cart-item" data-product-id="${p.id}" style="display:flex;align-items:center;gap:16px;
        padding:20px;background:white;border:1px solid #e5e7eb;border-radius:16px;
        transition:all 0.2s;">
        
        <span style="font-size:48px;flex-shrink:0;">${p.emoji}</span>
        
        <div style="flex:1;min-width:0;">
          <h4 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#111827;">
            ${p.name}
          </h4>
          <p style="margin:0;font-size:13px;color:#6b7280;">
            ${i18n.formatPrice(p.price)} / ${p.unit} · ${p.farmerName}
          </p>
        </div>

        <!-- Quantity Controls -->
        <div style="display:flex;align-items:center;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
          <button class="cart-qty-minus" data-id="${p.id}" style="width:36px;height:36px;border:none;
            background:#f9fafb;cursor:pointer;font-size:16px;font-weight:700;color:#374151;">−</button>
          <span class="cart-qty-val" data-id="${p.id}" style="width:40px;text-align:center;
            font-size:14px;font-weight:700;color:#111827;">${item.quantity}</span>
          <button class="cart-qty-plus" data-id="${p.id}" style="width:36px;height:36px;border:none;
            background:#f9fafb;cursor:pointer;font-size:16px;font-weight:700;color:#374151;">+</button>
        </div>

        <!-- Line Total -->
        <span style="font-size:16px;font-weight:800;color:#059669;min-width:100px;text-align:right;
          font-family:'Outfit','Inter',sans-serif;">
          ${i18n.formatPrice(lineTotal)}
        </span>

        <!-- Remove -->
        <button class="cart-remove-btn" data-id="${p.id}" style="width:36px;height:36px;border:none;
          background:#fef2f2;border-radius:10px;cursor:pointer;display:flex;align-items:center;
          justify-content:center;transition:all 0.2s;" title="${i18n.t('common.delete')}">
          <i data-lucide="trash-2" style="width:16px;height:16px;color:#dc2626;"></i>
        </button>
      </div>
    `;
  }).join('');

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;">

        <h2 style="margin:0 0 24px;font-size:26px;font-weight:800;color:#111827;
          font-family:'Outfit','Inter',sans-serif;">
          🛒 ${i18n.t('cart.title')} (${cartItems.length})
        </h2>

        <div style="display:grid;grid-template-columns:1fr 380px;gap:32px;align-items:start;">
          
          <!-- Cart Items -->
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${itemsHtml}
          </div>

          <!-- Order Summary -->
          <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;padding:28px;
            position:sticky;top:96px;">
            
            <h3 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#111827;">
              ${i18n.t('cart.orderSummary')}
            </h3>

            <div style="display:flex;justify-content:space-between;padding:10px 0;
              border-bottom:1px solid #f3f4f6;">
              <span style="color:#6b7280;">${i18n.t('cart.subtotal')}</span>
              <span style="font-weight:600;color:#111827;">${i18n.formatPrice(cartTotal)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;
              border-bottom:1px solid #f3f4f6;">
              <span style="color:#6b7280;">${i18n.t('cart.delivery')}</span>
              <span style="font-weight:600;color:#059669;">${i18n.t('cart.free')}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:14px 0;margin-top:4px;">
              <span style="font-size:18px;font-weight:800;color:#111827;">${i18n.t('cart.total')}</span>
              <span style="font-size:20px;font-weight:900;color:#059669;
                font-family:'Outfit','Inter',sans-serif;">${i18n.formatPrice(cartTotal)}</span>
            </div>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">

            <!-- Checkout Form -->
            <h4 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">
              ${i18n.t('cart.deliveryDetails')}
            </h4>

            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
              <input type="text" id="checkout-name" placeholder="${i18n.t('cart.name')}"
                value="${user.name || ''}"
                style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
                font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:all 0.2s;"
                onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'" />
              <input type="text" id="checkout-phone" placeholder="${i18n.t('cart.phone')}"
                value="${user.phone || ''}"
                style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
                font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:all 0.2s;"
                onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'" />
              <textarea id="checkout-address" placeholder="${i18n.t('cart.address')}" rows="3"
                style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;
                font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:vertical;
                transition:all 0.2s;"
                onfocus="this.style.borderColor='#10b981'" onblur="this.style.borderColor='#e5e7eb'"
              >${user.location || ''}</textarea>
            </div>

            <!-- Payment Method -->
            <h4 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">
              ${i18n.t('cart.paymentMethod')}
            </h4>
            <div style="display:flex;gap:10px;margin-bottom:20px;">
              <label style="flex:1;display:flex;align-items:center;gap:8px;padding:12px;
                border:2px solid #10b981;border-radius:10px;cursor:pointer;background:#f0fdf4;">
                <input type="radio" name="payment" value="cod" checked
                  style="accent-color:#059669;" />
                <span style="font-size:14px;font-weight:600;color:#111827;">
                  ${i18n.t('cart.cod')}
                </span>
              </label>
              <label style="flex:1;display:flex;align-items:center;gap:8px;padding:12px;
                border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;">
                <input type="radio" name="payment" value="online"
                  style="accent-color:#059669;" />
                <span style="font-size:14px;font-weight:600;color:#111827;">
                  ${i18n.t('cart.online')}
                </span>
              </label>
            </div>

            <button id="place-order-btn" style="width:100%;padding:16px;border:none;border-radius:14px;
              background:linear-gradient(135deg,#059669,#10b981);color:white;font-size:16px;
              font-weight:800;cursor:pointer;font-family:'Inter',sans-serif;
              display:flex;align-items:center;justify-content:center;gap:10px;
              box-shadow:0 4px 14px rgba(16,185,129,0.3);transition:all 0.2s;">
              <i data-lucide="check-circle" style="width:20px;height:20px;"></i>
              ${i18n.t('orders.placeOrder')}
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

  // Quantity controls
  document.querySelectorAll('.cart-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = store.getCart().find(i => i.productId === id);
      if (item && item.quantity > 1) {
        store.updateCartQuantity(id, item.quantity - 1);
        rerender();
      }
    });
  });

  document.querySelectorAll('.cart-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = store.getCart().find(i => i.productId === id);
      if (item) {
        store.updateCartQuantity(id, item.quantity + 1);
        rerender();
      }
    });
  });

  // Remove buttons
  document.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.removeFromCart(btn.dataset.id);
      showToast(i18n.t('cart.removed'), 'info');
      rerender();
    });
  });

  // Place order
  const placeBtn = document.getElementById('place-order-btn');
  if (placeBtn) {
    placeBtn.addEventListener('click', () => {
      const name = document.getElementById('checkout-name')?.value?.trim();
      const phone = document.getElementById('checkout-phone')?.value?.trim();
      const address = document.getElementById('checkout-address')?.value?.trim();

      if (!name || !phone || !address) {
        showToast(i18n.t('validation.fillAllFields'), 'error');
        return;
      }

      store.placeOrder({
        buyerName: name,
        buyerPhone: phone,
        buyerAddress: address,
      });

      showToast(i18n.t('orders.orderPlaced'), 'success');
      router.navigate('#/orders');
    });
  }

  // Payment radio styling
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('input[name="payment"]').forEach(r => {
        const label = r.closest('label');
        if (r.checked) {
          label.style.borderColor = '#10b981';
          label.style.background = '#f0fdf4';
        } else {
          label.style.borderColor = '#e5e7eb';
          label.style.background = 'white';
        }
      });
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
