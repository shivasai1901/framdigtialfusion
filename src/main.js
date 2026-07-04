/**
 * Fram Digital Fusion — Main Entry Point
 * Initializes the app: sets up router, and renders initial page.
 */

import { store } from './store.js';
import { router } from './router.js';
import { i18n } from './i18n.js';
import { initThreeScene } from './components/three-scene.js';

// Page imports
import * as authPage from './pages/auth.js';
import * as homePage from './pages/home.js';
import * as productsPage from './pages/products.js';
import * as productDetailPage from './pages/product-detail.js';
import * as cartPage from './pages/cart.js';
import * as ordersPage from './pages/orders.js';
import * as profilePage from './pages/profile.js';
import * as marketplacePage from './pages/marketplace.js';

/* ──────────────────────────────────────
   Render helper
   ────────────────────────────────────── */
function makePage(pageModule) {
  return function () {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = pageModule.render();
    if (typeof pageModule.init === 'function') {
      pageModule.init();
    }
    // Re-initialize Lucide icons after DOM update
    if (typeof window.lucide !== 'undefined') {
      window.lucide.createIcons();
    }
  };
}

/* ──────────────────────────────────────
   Route Definitions
   ────────────────────────────────────── */
const routes = {
  '#/login':       makePage(authPage),
  '#/home':        makePage(homePage),
  '#/products':    makePage(productsPage),
  '#/product':     makePage(productDetailPage),
  '#/cart':        makePage(cartPage),
  '#/orders':      makePage(ordersPage),
  '#/profile':     makePage(profilePage),
  '#/marketplace': makePage(marketplacePage),
};

/* ──────────────────────────────────────
   App Initialization
   ────────────────────────────────────── */
function initApp() {
  console.log('%c🌾 Fram Digital Fusion', 'font-size: 20px; font-weight: bold; color: #10b981;');
  console.log('%cFarm Fresh, Direct to You', 'font-size: 12px; color: #6b7280;');

  // 1. Register routes with the router
  router.registerRoutes(routes);

  // 2. Initialize the 3D background scene
  try {
    initThreeScene();
  } catch (e) {
    console.warn('Canvas scene failed to initialize:', e);
  }

  // 3. Listen for language changes to re-render current page
  i18n.on('language-change', () => {
    const hash = router.getCurrentRoute().split('?')[0];
    const handler = routes[hash];
    if (handler) handler();
  });

  // 4. Listen for auth changes
  store.on('auth-change', (data) => {
    if (data && data.action === 'logout') {
      router.navigate('#/login');
    }
  });

  // 5. Start the router (handles initial route)
  router.init();
}

/* ──────────────────────────────────────
   DOM Ready
   ────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
