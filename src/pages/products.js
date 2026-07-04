/**
 * Fram Digital Fusion — Products Page
 * Farmer: product management with add/edit/delete.
 * Buyer: marketplace grid with category filters, search, and sort.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { renderProductCard, initProductCards } from '../components/product-card.js';
import { showToast } from '../components/toast.js';

let showForm = false;
let editingProduct = null;
let currentCategory = 'all';
let currentSort = 'date';
let searchQuery = '';

const FOOD_EMOJIS = ['🍅','🥕','🌾','🥭','🌶️','🥬','🌽','🍌','🧅','🥥','🥔','🍎','🍇','🍊','🥒','🥦','🍆','🥜','🫘','🧄','🍋','🍈','🍉','🥝','🍑','🫑','🥑','🍍','🍓','🫒'];

const UNITS = ['kg', 'piece', 'dozen', 'bundle', 'litre', 'quintal'];

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const isFarmer = user.role === 'farmer';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';

  // Get products
  let products;
  if (isFarmer) {
    products = store.getProductsByFarmer(user.id);
  } else {
    products = currentCategory === 'all' ? store.getProducts() : store.getProductsByCategory(currentCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.farmerName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    // Sort
    if (currentSort === 'price') products = [...products].sort((a, b) => a.price - b.price);
    else if (currentSort === 'rating') products = [...products].sort((a, b) => b.rating - a.rating);
    else products = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const categories = store.getCategories();

  // Category filter pills (buyer)
  const categoryPillsHtml = !isFarmer ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
      ${categories.map(cat => `
        <button class="category-pill" data-category="${cat.id}" style="
          padding:8px 16px;border:1px solid ${currentCategory === cat.id ? '#10b981' : '#e5e7eb'};
          border-radius:20px;background:${currentCategory === cat.id ? 'linear-gradient(135deg,#059669,#10b981)' : 'white'};
          color:${currentCategory === cat.id ? 'white' : '#374151'};
          font-size:13px;font-weight:${currentCategory === cat.id ? '700' : '500'};
          cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;
          display:flex;align-items:center;gap:6px;">
          <span>${cat.emoji}</span>
          <span>${cat.name}</span>
        </button>
      `).join('')}
    </div>
  ` : '';

  // Search and sort bar (buyer)
  const searchSortHtml = !isFarmer ? `
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px;">
      <div style="flex:1;position:relative;">
        <i data-lucide="search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);
          width:18px;height:18px;color:#9ca3af;"></i>
        <input type="text" id="products-search" placeholder="${i18n.t('products.searchPlaceholder')}"
          value="${searchQuery}"
          style="width:100%;padding:10px 14px 10px 42px;border:1px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;
          transition:border-color 0.2s;" />
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:13px;color:#6b7280;font-weight:500;white-space:nowrap;">
          ${i18n.t('products.sortBy')}:
        </span>
        <select id="products-sort" style="padding:10px 14px;border:1px solid #e5e7eb;border-radius:10px;
          font-size:13px;font-family:'Inter',sans-serif;background:white;cursor:pointer;outline:none;">
          <option value="date" ${currentSort === 'date' ? 'selected' : ''}>${i18n.t('products.sortDate')}</option>
          <option value="price" ${currentSort === 'price' ? 'selected' : ''}>${i18n.t('products.sortPrice')}</option>
          <option value="rating" ${currentSort === 'rating' ? 'selected' : ''}>${i18n.t('products.sortRating')}</option>
        </select>
      </div>
    </div>
  ` : '';

  // Product grid
  const gridHtml = products.length > 0
    ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;">
        ${products.map(p => renderProductCard(p, user.role, isFarmer && p.farmerId === user.id)).join('')}
       </div>`
    : `<div style="text-align:center;padding:60px 20px;">
        <span style="font-size:64px;display:block;margin-bottom:16px;">📦</span>
        <p style="font-size:16px;color:#6b7280;">${i18n.t('products.noProducts')}</p>
       </div>`;

  // Add/Edit Product Form (farmer)
  const formHtml = (isFarmer && showForm) ? renderProductForm() : '';

  // FAB button (farmer)
  const fabHtml = isFarmer ? `
    <button id="add-product-fab" style="
      position:fixed;bottom:32px;right:32px;width:56px;height:56px;
      border-radius:50%;border:none;
      background:linear-gradient(135deg,#059669,#10b981);color:white;
      font-size:28px;cursor:pointer;box-shadow:0 6px 20px rgba(5,150,105,0.4);
      display:flex;align-items:center;justify-content:center;
      transition:all 0.2s;z-index:100;">
      <i data-lucide="plus" style="width:28px;height:28px;"></i>
    </button>
  ` : '';

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;min-height:calc(100vh - 64px);">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <h2 style="margin:0;font-size:24px;font-weight:800;color:#111827;
            font-family:'Outfit','Inter',sans-serif;">
            ${isFarmer ? i18n.t('products.myProducts') : i18n.t('products.marketplace')}
          </h2>
        </div>

        ${formHtml}
        ${categoryPillsHtml}
        ${searchSortHtml}
        ${gridHtml}
        ${fabHtml}
      </main>
    </div>
  `;
}

function renderProductForm() {
  const p = editingProduct || {};
  const selectedEmoji = p.emoji || '🍅';

  return `
    <div id="product-form-container" style="
      background:white;border-radius:16px;padding:28px;margin-bottom:24px;
      box-shadow:0 4px 14px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
        <h3 style="margin:0;font-size:18px;font-weight:700;color:#111827;">
          ${editingProduct ? i18n.t('products.editProduct') : i18n.t('products.addProduct')}
        </h3>
        <button id="close-product-form" style="background:none;border:none;cursor:pointer;
          font-size:22px;color:#9ca3af;padding:4px;">×</button>
      </div>
      <form id="product-form" novalidate>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
          <div>
            <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
              ${i18n.t('products.name')}
            </label>
            <input type="text" id="product-name" value="${p.name || ''}" required
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;
              font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
              ${i18n.t('products.category')}
            </label>
            <select id="product-category" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;
              border-radius:8px;font-size:14px;font-family:'Inter',sans-serif;background:white;box-sizing:border-box;">
              ${store.getCategories().filter(c => c.id !== 'all').map(c =>
                `<option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${c.emoji} ${c.name}</option>`
              ).join('')}
            </select>
          </div>
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
            ${i18n.t('products.description')}
          </label>
          <textarea id="product-description" rows="3"
            style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;
            font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:vertical;box-sizing:border-box;">${p.description || ''}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px;">
          <div>
            <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
              ${i18n.t('products.price')}
            </label>
            <input type="number" id="product-price" value="${p.price || ''}" min="1" required
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;
              font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
              ${i18n.t('products.quantity')}
            </label>
            <input type="number" id="product-quantity" value="${p.quantity || ''}" min="1" required
              style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;
              font-size:14px;font-family:'Inter',sans-serif;outline:none;box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
              ${i18n.t('products.unit')}
            </label>
            <select id="product-unit" style="width:100%;padding:10px 14px;border:1px solid #d1d5db;
              border-radius:8px;font-size:14px;font-family:'Inter',sans-serif;background:white;box-sizing:border-box;">
              ${UNITS.map(u => `<option value="${u}" ${p.unit === u ? 'selected' : ''}>${u}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Emoji Picker -->
        <div style="margin-bottom:20px;">
          <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:#374151;">
            ${i18n.t('products.emoji')}
          </label>
          <input type="hidden" id="product-emoji" value="${selectedEmoji}" />
          <div id="emoji-picker" style="display:flex;flex-wrap:wrap;gap:8px;">
            ${FOOD_EMOJIS.map(em => `
              <button type="button" class="emoji-pick-btn" data-emoji="${em}" style="
                width:44px;height:44px;border:2px solid ${em === selectedEmoji ? '#10b981' : '#e5e7eb'};
                border-radius:10px;background:${em === selectedEmoji ? '#f0fdf4' : 'white'};
                cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center;
                transition:all 0.15s;">
                ${em}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;gap:12px;">
          <button type="submit" id="product-save-btn" style="
            padding:12px 28px;border:none;border-radius:10px;
            background:linear-gradient(135deg,#059669,#10b981);color:white;
            font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;">
            ${i18n.t('products.save')}
          </button>
          <button type="button" id="product-cancel-btn" style="
            padding:12px 28px;border:1px solid #d1d5db;border-radius:10px;
            background:white;color:#374151;
            font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;">
            ${i18n.t('products.cancel')}
          </button>
        </div>
      </form>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();
  initProductCards();

  const user = store.getCurrentUser();
  const isFarmer = user?.role === 'farmer';

  // FAB to show form
  const fab = document.getElementById('add-product-fab');
  if (fab) {
    fab.addEventListener('click', () => {
      showForm = true;
      editingProduct = null;
      router.renderCurrentRoute();
    });
    fab.addEventListener('mouseenter', () => {
      fab.style.transform = 'scale(1.1)';
      fab.style.boxShadow = '0 8px 25px rgba(5,150,105,0.5)';
    });
    fab.addEventListener('mouseleave', () => {
      fab.style.transform = 'scale(1)';
      fab.style.boxShadow = '0 6px 20px rgba(5,150,105,0.4)';
    });
  }

  // Close form
  const closeFormBtn = document.getElementById('close-product-form');
  if (closeFormBtn) {
    closeFormBtn.addEventListener('click', () => {
      showForm = false;
      editingProduct = null;
      router.renderCurrentRoute();
    });
  }
  const cancelBtn = document.getElementById('product-cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      showForm = false;
      editingProduct = null;
      router.renderCurrentRoute();
    });
  }

  // Emoji picker
  document.querySelectorAll('.emoji-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const emojiInput = document.getElementById('product-emoji');
      if (emojiInput) emojiInput.value = btn.dataset.emoji;
      // Update visual
      document.querySelectorAll('.emoji-pick-btn').forEach(b => {
        b.style.borderColor = '#e5e7eb';
        b.style.background = 'white';
      });
      btn.style.borderColor = '#10b981';
      btn.style.background = '#f0fdf4';
    });
  });

  // Product form submission
  const form = document.getElementById('product-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('product-name')?.value.trim(),
        description: document.getElementById('product-description')?.value.trim(),
        price: parseFloat(document.getElementById('product-price')?.value) || 0,
        quantity: parseInt(document.getElementById('product-quantity')?.value) || 0,
        unit: document.getElementById('product-unit')?.value,
        category: document.getElementById('product-category')?.value,
        emoji: document.getElementById('product-emoji')?.value || '🍅',
      };

      if (!data.name || !data.price || !data.quantity) {
        showToast('Please fill all required fields', 'error');
        return;
      }

      if (editingProduct) {
        store.updateProduct(editingProduct.id, data);
      } else {
        store.addProduct(data);
      }

      showToast(i18n.t('toast.productSaved'), 'success');
      showForm = false;
      editingProduct = null;
      router.renderCurrentRoute();
    });
  }

  // Listen for edit events from product cards
  document.addEventListener('product-edit', (e) => {
    const productId = e.detail?.productId;
    if (productId) {
      editingProduct = store.getProductById(productId);
      showForm = true;
      router.renderCurrentRoute();
    }
  });

  // Category pills (buyer)
  document.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      router.renderCurrentRoute();
    });
  });

  // Search (buyer)
  const searchInput = document.getElementById('products-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        router.renderCurrentRoute();
      }
    });
  }

  // Sort (buyer)
  const sortSelect = document.getElementById('products-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      router.renderCurrentRoute();
    });
  }
}
