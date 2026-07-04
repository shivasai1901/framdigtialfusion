/**
 * Fram Digital Fusion — Product Card Component
 * Reusable card displaying product info, emoji image, price, and action buttons.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from './toast.js';
import { showModal, closeModal } from './modal.js';

/**
 * Render a single product card.
 * @param {Object} product - Product data
 * @param {string} userRole - 'farmer' | 'buyer'
 * @param {boolean} isOwner - Whether the current user owns this product
 * @returns {string} HTML string
 */
export function renderProductCard(product, userRole, isOwner = false) {
  // Rating stars
  const fullStars = Math.floor(product.rating || 0);
  const hasHalf = (product.rating || 0) - fullStars >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) starsHtml += '<i data-lucide="star" style="width:14px;height:14px;color:#f59e0b;fill:#f59e0b;"></i>';
    else if (i === fullStars && hasHalf) starsHtml += '<i data-lucide="star-half" style="width:14px;height:14px;color:#f59e0b;fill:#f59e0b;"></i>';
    else starsHtml += '<i data-lucide="star" style="width:14px;height:14px;color:#d1d5db;"></i>';
  }

  // Category badge color
  const categoryColors = {
    vegetables: '#059669', fruits: '#d97706', grains: '#92400e',
    dairy: '#2563eb', spices: '#dc2626',
  };
  const catColor = categoryColors[product.category] || '#6b7280';

  // Action buttons based on role
  let actionsHtml = '';
  if (isOwner) {
    actionsHtml = `
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="product-edit-btn" data-product-id="${product.id}"
          style="flex:1;padding:8px 12px;border:1px solid #e5e7eb;border-radius:8px;
          background:white;color:#374151;font-size:13px;font-weight:600;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:6px;
          font-family:'Inter',sans-serif;transition:all 0.2s;">
          <i data-lucide="edit-2" style="width:14px;height:14px;"></i>
          ${i18n.t('products.edit')}
        </button>
        <button class="product-delete-btn" data-product-id="${product.id}"
          style="flex:1;padding:8px 12px;border:1px solid #fecaca;border-radius:8px;
          background:#fef2f2;color:#dc2626;font-size:13px;font-weight:600;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:6px;
          font-family:'Inter',sans-serif;transition:all 0.2s;">
          <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          ${i18n.t('products.delete')}
        </button>
      </div>
    `;
  } else if (userRole === 'buyer') {
    actionsHtml = `
      <div style="display:flex;gap:8px;align-items:center;margin-top:12px;">
        <div style="display:flex;align-items:center;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <button class="qty-minus-btn" data-product-id="${product.id}"
            style="width:32px;height:32px;border:none;background:#f9fafb;cursor:pointer;
            font-size:16px;font-weight:700;color:#374151;display:flex;align-items:center;justify-content:center;">−</button>
          <input type="number" id="qty-input-${product.id}" value="1" min="1" max="${product.quantity}"
            style="width:42px;text-align:center;border:none;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;
            font-size:14px;font-weight:600;padding:4px 0;font-family:'Inter',sans-serif;outline:none;" />
          <button class="qty-plus-btn" data-product-id="${product.id}"
            style="width:32px;height:32px;border:none;background:#f9fafb;cursor:pointer;
            font-size:16px;font-weight:700;color:#374151;display:flex;align-items:center;justify-content:center;">+</button>
        </div>
        <button class="add-to-cart-btn" data-product-id="${product.id}"
          style="flex:1;padding:8px 16px;border:none;border-radius:8px;
          background:linear-gradient(135deg,#059669,#10b981);color:white;
          font-size:13px;font-weight:700;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:6px;
          font-family:'Inter',sans-serif;transition:all 0.2s;">
          <i data-lucide="shopping-cart" style="width:14px;height:14px;"></i>
          ${i18n.t('products.addToCart')}
        </button>
      </div>
    `;
  }

  return `
    <article class="product-card" data-product-id="${product.id}" style="
      background:white;border-radius:16px;overflow:hidden;
      box-shadow:0 1px 3px rgba(0,0,0,0.06);
      transition:transform 0.25s cubic-bezier(0.21,1.02,0.73,1),box-shadow 0.25s;
      cursor:pointer;display:flex;flex-direction:column;">
      <div class="product-card-image" style="
        background:linear-gradient(135deg,#f0fdf4,#ecfdf5);
        display:flex;align-items:center;justify-content:center;
        padding:28px;position:relative;min-height:140px;">
        <span style="font-size:64px;line-height:1;">${product.emoji}</span>
        <span class="product-category-badge" style="
          position:absolute;top:12px;right:12px;
          padding:4px 10px;border-radius:20px;
          background:${catColor};color:white;
          font-size:11px;font-weight:700;text-transform:uppercase;
          letter-spacing:0.05em;">
          ${product.category}
        </span>
      </div>
      <div style="padding:16px;display:flex;flex-direction:column;flex:1;">
        <h4 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#111827;">
          ${product.name}
        </h4>
        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;display:flex;align-items:center;gap:4px;">
          <i data-lucide="map-pin" style="width:12px;height:12px;"></i>
          ${product.farmerName} · ${product.farmerLocation || ''}
        </p>
        <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:6px;">
          <span style="font-size:22px;font-weight:800;color:#059669;font-family:'Outfit','Inter',sans-serif;">
            ${i18n.formatPrice(product.price)}
          </span>
          <span style="font-size:12px;color:#9ca3af;font-weight:500;">
            ${i18n.t('products.perUnit')} ${product.unit}
          </span>
        </div>
        <p style="margin:0 0 8px;font-size:12px;color:#6b7280;">
          ${product.quantity} ${product.unit} ${i18n.t('products.available')}
        </p>
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
          ${starsHtml}
          <span style="font-size:12px;color:#6b7280;margin-left:4px;">
            (${product.reviews || 0})
          </span>
        </div>
        ${actionsHtml}
      </div>
    </article>
  `;
}

/**
 * Initialize event handlers for product cards.
 * Call after rendering product cards into the DOM.
 */
export function initProductCards() {
  // Click on card to navigate to detail (for non-button clicks)
  document.querySelectorAll('.product-card').forEach(card => {
    // Hover animation
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px) scale(1.01)';
      card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    });

    // Click to navigate to product detail
    card.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      const productId = card.dataset.productId;
      router.navigate(`#/product?id=${productId}`);
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const product = store.getProductById(productId);
      const qtyInput = document.getElementById(`qty-input-${productId}`);
      const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
      if (product) {
        store.addToCart(productId, qty);
        showToast(i18n.t('toast.addedToCart'), 'success');
        // Update cart badge
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) cartBadge.textContent = store.getCartCount();
      }
    });
  });

  // Quantity +/- buttons
  document.querySelectorAll('.qty-minus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const input = document.getElementById(`qty-input-${productId}`);
      if (input) input.value = Math.max(1, parseInt(input.value) - 1);
    });
  });

  document.querySelectorAll('.qty-plus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const input = document.getElementById(`qty-input-${productId}`);
      if (input) input.value = parseInt(input.value) + 1;
    });
  });

  // Edit buttons
  document.querySelectorAll('.product-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Will trigger product edit flow in the products page
      const productId = btn.dataset.productId;
      const event = new CustomEvent('product-edit', { detail: { productId } });
      document.dispatchEvent(event);
    });
  });

  // Delete buttons
  document.querySelectorAll('.product-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      showModal(
        i18n.t('products.deleteProduct'),
        `<p>${i18n.t('products.confirmDelete')}</p>`,
        [
          { label: i18n.t('modal.cancel'), class: 'btn-secondary', onClick: () => {} },
          {
            label: i18n.t('common.delete'), class: 'btn-danger',
            onClick: () => {
              store.removeProduct(productId);
              showToast(i18n.t('toast.productDeleted'), 'success');
              router.renderCurrentRoute();
            }
          }
        ]
      );
    });
  });
}
