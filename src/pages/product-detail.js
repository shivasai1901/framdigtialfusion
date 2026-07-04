/**
 * Fram Digital Fusion — Product Detail Page
 * Shows full product info with farmer profile, quantity selector, and similar products.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { renderProductCard, initProductCards } from '../components/product-card.js';
import { showToast } from '../components/toast.js';

let quantity = 1;

function getProductIdFromHash() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1] || '');
  return params.get('id') || '';
}

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const productId = getProductIdFromHash();
  const product = store.getProductById(productId);
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';

  if (!product) {
    return `
      ${renderNavbar()}
      <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
        ${renderSidebar()}
        <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
          background:#f9fafb;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;">
            <span style="font-size:80px;display:block;margin-bottom:16px;">📦</span>
            <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#111827;">
              ${i18n.t('products.notFound')}
            </h2>
            <p style="color:#6b7280;margin:0 0 24px;">${i18n.t('products.notFoundDesc')}</p>
            <a href="#/marketplace" style="padding:12px 28px;background:linear-gradient(135deg,#059669,#10b981);
              color:white;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">
              ${i18n.t('home.browseMarketplace')}
            </a>
          </div>
        </main>
      </div>
    `;
  }

  const isBuyer = user.role === 'buyer';
  const isOwner = user.id === product.farmerId;

  // Rating stars
  const fullStars = Math.floor(product.rating || 0);
  const hasHalf = (product.rating || 0) - fullStars >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) starsHtml += '<i data-lucide="star" style="width:18px;height:18px;color:#f59e0b;fill:#f59e0b;"></i>';
    else if (i === fullStars && hasHalf) starsHtml += '<i data-lucide="star-half" style="width:18px;height:18px;color:#f59e0b;fill:#f59e0b;"></i>';
    else starsHtml += '<i data-lucide="star" style="width:18px;height:18px;color:#d1d5db;"></i>';
  }

  // Similar products
  const similar = store.getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const similarHtml = similar.length > 0 ? `
    <section style="margin-top:40px;">
      <h3 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111827;">
        ${i18n.t('products.similar')}
      </h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;">
        ${similar.map(p => renderProductCard(p, user.role, user.id === p.farmerId)).join('')}
      </div>
    </section>
  ` : '';

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;">

        <!-- Back button -->
        <button id="detail-back-btn" style="display:flex;align-items:center;gap:8px;padding:8px 16px;
          border:1px solid #e5e7eb;border-radius:10px;background:white;cursor:pointer;
          font-size:14px;font-weight:600;color:#374151;font-family:'Inter',sans-serif;
          margin-bottom:24px;transition:all 0.2s;">
          <i data-lucide="arrow-left" style="width:16px;height:16px;"></i>
          ${i18n.t('common.back')}
        </button>

        <!-- Product Hero -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:32px;">
          
          <!-- Emoji Hero -->
          <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5,#d1fae5);
            border-radius:24px;display:flex;align-items:center;justify-content:center;
            min-height:320px;position:relative;overflow:hidden;">
            <span style="font-size:140px;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.1));">
              ${product.emoji}
            </span>
            <div style="position:absolute;top:16px;left:16px;">
              <span style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;
                background:rgba(5,150,105,0.15);color:#059669;">
                ${i18n.t('categories.' + product.category)}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div style="display:flex;flex-direction:column;justify-content:center;">
            <h1 style="margin:0 0 8px;font-size:32px;font-weight:900;color:#111827;
              font-family:'Outfit','Inter',sans-serif;">
              ${product.name}
            </h1>

            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              ${starsHtml}
              <span style="font-size:14px;color:#6b7280;">(${product.rating?.toFixed(1) || '4.0'})</span>
            </div>

            <p style="font-size:15px;color:#4b5563;line-height:1.7;margin:0 0 20px;">
              ${product.description || i18n.t('products.noDescription')}
            </p>

            <!-- Price -->
            <div style="margin-bottom:20px;">
              <span style="font-size:36px;font-weight:900;color:#059669;
                font-family:'Outfit','Inter',sans-serif;">
                ${i18n.formatPrice(product.price)}
              </span>
              <span style="font-size:14px;color:#6b7280;">/ ${product.unit}</span>
            </div>

            <!-- Availability -->
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px;">
              <i data-lucide="package" style="width:16px;height:16px;color:#059669;"></i>
              <span style="font-size:14px;font-weight:600;color:${product.quantity > 0 ? '#059669' : '#dc2626'};">
                ${product.quantity > 0 
                  ? product.quantity + ' ' + product.unit + ' ' + i18n.t('products.available')
                  : i18n.t('products.outOfStock')}
              </span>
            </div>

            <!-- Quantity + Add to Cart (Buyer Only) -->
            ${isBuyer && product.quantity > 0 ? `
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
                <div style="display:flex;align-items:center;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <button id="detail-qty-minus" style="width:44px;height:44px;border:none;background:#f9fafb;
                    cursor:pointer;font-size:18px;font-weight:700;color:#374151;transition:all 0.2s;">−</button>
                  <span id="detail-qty-display" style="width:50px;text-align:center;font-size:16px;
                    font-weight:700;color:#111827;">${quantity}</span>
                  <button id="detail-qty-plus" style="width:44px;height:44px;border:none;background:#f9fafb;
                    cursor:pointer;font-size:18px;font-weight:700;color:#374151;transition:all 0.2s;">+</button>
                </div>
                <button id="detail-add-cart" style="flex:1;padding:14px 28px;border:none;border-radius:12px;
                  background:linear-gradient(135deg,#059669,#10b981);color:white;font-size:15px;
                  font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;
                  display:flex;align-items:center;justify-content:center;gap:10px;transition:all 0.2s;">
                  <i data-lucide="shopping-cart" style="width:18px;height:18px;"></i>
                  ${i18n.t('products.addToCart')}
                </button>
              </div>
            ` : ''}

            <!-- Farmer Info -->
            <div style="padding:20px;background:white;border:1px solid #e5e7eb;border-radius:16px;">
              <div style="display:flex;align-items:center;gap:14px;">
                <span style="font-size:40px;">${product.farmerAvatar || '👨‍🌾'}</span>
                <div>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#111827;">
                    ${product.farmerName}
                  </p>
                  <p style="margin:2px 0 0;font-size:13px;color:#6b7280;display:flex;align-items:center;gap:4px;">
                    <i data-lucide="map-pin" style="width:13px;height:13px;"></i>
                    ${product.farmerLocation || i18n.t('common.location')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        ${similarHtml}
      </main>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();
  initProductCards();

  quantity = 1;

  const backBtn = document.getElementById('detail-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => history.back());
  }

  const minusBtn = document.getElementById('detail-qty-minus');
  const plusBtn = document.getElementById('detail-qty-plus');
  const qtyDisplay = document.getElementById('detail-qty-display');
  const addCartBtn = document.getElementById('detail-add-cart');

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      quantity++;
      qtyDisplay.textContent = quantity;
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const productId = getProductIdFromHash();
      store.addToCart(productId, quantity);
      showToast(i18n.t('cart.addedToCart'), 'success');
      quantity = 1;
    });
  }
}
