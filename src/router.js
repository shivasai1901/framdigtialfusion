/**
 * Fram Digital Fusion — Hash-based SPA Router
 * =============================================
 * Manages client-side navigation using the URL hash fragment.
 *
 * Route format: '#/login', '#/home', '#/products', '#/orders', etc.
 *
 * Features:
 *   - Route registration with handler functions
 *   - Route guard: unauthenticated users are redirected to #/login
 *   - After login, redirect to #/home
 *   - Programmatic navigation via navigate()
 *   - Handles initial route on page load
 *
 * Usage:
 *   import { router } from './router.js';
 *   import { store }  from './store.js';
 *
 *   router.registerRoutes({
 *     '#/login':    renderLoginPage,
 *     '#/home':     renderHomePage,
 *     '#/products': renderProductsPage,
 *   });
 *
 *   router.init();
 */

import { store } from './store.js';

/* ------------------------------------------------------------------ */
/*  Internal state                                                    */
/* ------------------------------------------------------------------ */

/**
 * Registered routes: hash-path → render function.
 * @type {Record<string, Function>}
 */
let routes = {};

/**
 * Optional fallback renderer when no route matches.
 * @type {Function|null}
 */
let notFoundHandler = null;

/**
 * Routes that do NOT require authentication.
 * Everything else is treated as protected.
 */
const PUBLIC_ROUTES = new Set(['#/login', '#/signup']);

/**
 * Default route to redirect to after login or when
 * an authenticated user visits the login page.
 */
const DEFAULT_AUTH_ROUTE = '#/home';

/**
 * Default route for unauthenticated users.
 */
const LOGIN_ROUTE = '#/login';

/* ------------------------------------------------------------------ */
/*  Core routing logic                                                */
/* ------------------------------------------------------------------ */

/**
 * Determine the target hash, apply route guards,
 * and invoke the matching handler.
 */
function handleRouteChange() {
  let hash = window.location.hash || DEFAULT_AUTH_ROUTE;
  const loggedIn = store.isLoggedIn();

  // Strip query params for route matching (e.g. '#/product?id=xxx' → '#/product')
  const baseHash = hash.split('?')[0];

  /* ── Route guard ────────────────────────────────────────────────── */

  // Not logged in → force to login (unless already on a public route)
  if (!loggedIn && !PUBLIC_ROUTES.has(baseHash)) {
    window.location.hash = LOGIN_ROUTE;
    return; // hashchange will re-trigger handleRouteChange
  }

  // Logged in but sitting on the login/signup page → push to home
  if (loggedIn && PUBLIC_ROUTES.has(baseHash)) {
    window.location.hash = DEFAULT_AUTH_ROUTE;
    return;
  }

  /* ── Render ─────────────────────────────────────────────────────── */

  const handler = routes[baseHash];

  if (handler) {
    try {
      handler();
    } catch (err) {
      console.error(`[router] Error rendering route "${hash}":`, err);
    }
  } else if (notFoundHandler) {
    notFoundHandler(hash);
  } else {
    console.warn(`[router] No handler registered for route: "${hash}"`);
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export const router = {

  /**
   * Register route handlers.
   * Can be called multiple times — new routes are merged in.
   *
   * @param {Record<string, Function>} routeMap - Hash-path → handler map.
   *
   * @example
   *   router.registerRoutes({
   *     '#/home':     renderHome,
   *     '#/products': renderProducts,
   *   });
   */
  registerRoutes(routeMap) {
    routes = { ...routes, ...routeMap };
  },

  /**
   * Set a handler for unknown / unregistered routes (404).
   *
   * @param {Function} handler - Receives the unmatched hash string.
   */
  setNotFoundHandler(handler) {
    notFoundHandler = handler;
  },

  /**
   * Navigate to a hash path programmatically.
   * Triggers `hashchange` which in turn calls the route handler.
   *
   * @param {string} path - e.g. '#/products'
   */
  navigate(path) {
    if (!path.startsWith('#')) {
      path = '#' + path;
    }
    window.location.hash = path;
  },

  /**
   * Get the current hash path.
   *
   * @returns {string} e.g. '#/home'
   */
  getCurrentRoute() {
    return window.location.hash || DEFAULT_AUTH_ROUTE;
  },

  /**
   * Initialise the router.
   * - Attaches the hashchange listener.
   * - Renders the current (or default) route immediately.
   *
   * Call this once after all routes have been registered.
   */
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Handle the initial URL on page load
    handleRouteChange();
  },

  /**
   * Tear down the router (useful for testing or HMR).
   */
  destroy() {
    window.removeEventListener('hashchange', handleRouteChange);
  },

  /**
   * Re-render the current route (e.g. after data changes).
   */
  renderCurrentRoute() {
    handleRouteChange();
  }
};
