/**
 * Fram Digital Fusion — Marketplace Page
 * Full marketplace browse for buyers with hero banner, categories, featured products, and search/filter.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderSidebar, initSidebar, isSidebarCollapsed } from '../components/sidebar.js';
import { renderProductCard, initProductCards } from '../components/product-card.js';
import { showToast } from '../components/toast.js';

let selectedCategory = 'all';
let searchQuery = '';
let sortBy = 'newest';

const CATEGORIES = [
  { key: 'all', emoji: '🛒' },
  { key: 'vegetables', emoji: '🥬' },
  { key: 'fruits', emoji: '🍎' },
  { key: 'grains', emoji: '🌾' },
  { key: 'dairy', emoji: '🥛' },
  { key: 'spices', emoji: '🌿' },
  { key: 'pulses', emoji: '🥜' },
];

function getFilteredProducts() {
  let products = store.getProducts();

  // Category filter
  if (selectedCategory !== 'all') {
    products = products.filter(p => p.category === selectedCategory);
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.farmerName.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'newest':
    default:
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return products;
}

export function render() {
  const user = store.getCurrentUser();
  if (!user) return '';
  const sidebarWidth = isSidebarCollapsed() ? '72px' : '260px';
  const products = getFilteredProducts();

  // Category pills
  const categoriesHtml = CATEGORIES.map(cat => {
    const isActive = selectedCategory === cat.key;
    const label = cat.key === 'all' ? i18n.t('common.all') : i18n.t('categories.' + cat.key);
    return `
      <button class="market-cat-btn" data-category="${cat.key}" style="
        display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:24px;
        border:2px solid ${isActive ? '#10b981' : '#e5e7eb'};
        background:${isActive ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'white'};
        cursor:pointer;font-size:14px;font-weight:${isActive ? '700' : '500'};
        color:${isActive ? '#059669' : '#4b5563'};
        font-family:'Inter',sans-serif;transition:all 0.2s;white-space:nowrap;">
        <span style="font-size:18px;">${cat.emoji}</span>
        ${label}
      </button>
    `;
  }).join('');

  // Products grid
  const productsHtml = products.length > 0
    ? products.map(p => renderProductCard(p, user.role, user.id === p.farmerId)).join('')
    : `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <span style="font-size:80px;display:block;margin-bottom:16px;">🔍</span>
        <h3 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
          ${i18n.t('common.noResults')}
        </h3>
        <p style="color:#6b7280;margin:0;">${i18n.t('products.tryDifferent')}</p>
      </div>
    `;

  // Farmer spotlight — unique farmers
  const allProducts = store.getProducts();
  const farmerMap = new Map();
  allProducts.forEach(p => {
    if (!farmerMap.has(p.farmerId)) {
      farmerMap.set(p.farmerId, {
        name: p.farmerName,
        avatar: p.farmerAvatar || '👨‍🌾',
        location: p.farmerLocation || '',
        productCount: 0,
      });
    }
    farmerMap.get(p.farmerId).productCount++;
  });
  const farmers = Array.from(farmerMap.entries()).slice(0, 4);
  const farmersHtml = farmers.map(([id, f]) => `
    <div style="padding:20px;background:white;border:1px solid #e5e7eb;border-radius:16px;
      text-align:center;transition:all 0.2s;cursor:default;"
      onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)'"
      onmouseleave="this.style.transform='none';this.style.boxShadow='none'">
      <span style="font-size:48px;display:block;margin-bottom:8px;">${f.avatar}</span>
      <h4 style="margin:0 0 4px;font-size:15px;font-weight:700;color:#111827;">${f.name}</h4>
      <p style="margin:0;font-size:12px;color:#6b7280;">${f.location}</p>
      <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#059669;">
        ${f.productCount} ${i18n.t('home.totalProducts').toLowerCase()}
      </p>
    </div>
  `).join('');

  return `
    ${renderNavbar()}
    <div class="app-layout" style="display:flex;min-height:100vh;padding-top:64px;">
      ${renderSidebar()}
      <main class="main-content" style="flex:1;margin-left:${sidebarWidth};padding:32px;
        transition:margin-left 0.25s;background:#f9fafb;">

        <!-- Hero Banner -->
        <div style="background:linear-gradient(135deg,#059669 0%,#10b981 40%,#34d399 100%);
          border-radius:24px;padding:48px 40px;margin-bottom:32px;position:relative;overflow:hidden;">
          <div style="position:relative;z-index:1;">
            <h1 style="margin:0 0 8px;font-size:34px;font-weight:900;color:white;
              font-family:'Outfit','Inter',sans-serif;">
              🌾 ${i18n.t('marketplace.hero')}
            </h1>
            <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.85);max-width:500px;line-height:1.6;">
              ${i18n.t('marketplace.heroDesc')}
            </p>
          </div>
          <div style="position:absolute;top:-30px;right:-30px;width:200px;height:200px;
            border-radius:50%;background:rgba(255,255,255,0.08);"></div>
          <div style="position:absolute;bottom:-50px;right:100px;width:160px;height:160px;
            border-radius:50%;background:rgba(255,255,255,0.06);"></div>
        </div>

        <!-- Categories -->
        <section style="margin-bottom:28px;">
          <h3 style="margin:0 0 14px;font-size:18px;font-weight:700;color:#111827;">
            ${i18n.t('products.categories')}
          </h3>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            ${categoriesHtml}
          </div>
        </section>

        <!-- Search & Sort Bar -->
        <div style="display:flex;gap:12px;margin-bottom:24px;align-items:center;">
          <div style="flex:1;position:relative;">
            <i data-lucide="search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);
              width:18px;height:18px;color:#9ca3af;"></i>
            <input type="text" id="marketplace-search" placeholder="${i18n.t('nav.search')}"
              value="${searchQuery}"
              style="width:100%;padding:12px 14px 12px 42px;border:1px solid #e5e7eb;border-radius:12px;
              font-size:14px;font-family:'Inter',sans-serif;background:white;outline:none;
              box-sizing:border-box;transition:all 0.2s;"
              onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'"
              onblur="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'" />
          </div>
          <select id="marketplace-sort" style="padding:12px 16px;border:1px solid #e5e7eb;
            border-radius:12px;font-size:14px;font-family:'Inter',sans-serif;
            background:white;color:#374151;cursor:pointer;outline:none;">
            <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>${i18n.t('products.sortNewest')}</option>
            <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>${i18n.t('products.sortPriceLow')}</option>
            <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>${i18n.t('products.sortPriceHigh')}</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>${i18n.t('products.sortRating')}</option>
          </select>
        </div>

        <!-- Products Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:40px;">
          ${productsHtml}
        </div>

        <!-- Farmer Spotlight -->
        ${farmers.length > 0 ? `
          <section style="margin-top:20px;">
            <h3 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#111827;">
              👨‍🌾 ${i18n.t('marketplace.farmerSpotlight')}
            </h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;">
              ${farmersHtml}
            </div>
          </section>
        ` : ''}

      </main>
    </div>
  `;
}

export function init() {
  initNavbar();
  initSidebar();
  initProductCards();

  // Category filter
  document.querySelectorAll('.market-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      rerender();
    });
  });

  // Search
  const searchInput = document.getElementById('marketplace-search');
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        rerender();
      }, 300);
    });
  }

  // Sort
  const sortSelect = document.getElementById('marketplace-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortBy = sortSelect.value;
      rerender();
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
