/**
 * Fram Digital Fusion — State Store
 * ===================================
 * localStorage-backed store with event emitter.
 *
 * Storage keys:
 *   fdf_users    – Array of user objects
 *   fdf_products – Array of product objects
 *   fdf_orders   – Array of order objects
 *   fdf_cart     – Array of { productId, quantity }
 *   fdf_session  – { userId, role, loggedIn }
 *
 * Events:
 *   'auth-change'     – fired on login / logout / signup
 *   'cart-update'     – fired on any cart mutation
 *   'products-update' – fired on add / update / remove product
 *   'orders-update'   – fired on place order / update status
 */

import { seedUsers, seedProducts, seedOrders } from './data/seed-data.js';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const KEYS = {
  USERS:    'fdf_users',
  PRODUCTS: 'fdf_products',
  ORDERS:   'fdf_orders',
  CART:     'fdf_cart',
  SESSION:  'fdf_session'
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/**
 * Read a JSON array from localStorage, returning `fallback` when the
 * key is missing or the stored value cannot be parsed.
 */
function load(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Persist a value as JSON to localStorage. */
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Generate a unique-enough ID for demo purposes. */
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/* ------------------------------------------------------------------ */
/*  Event emitter (internal)                                          */
/* ------------------------------------------------------------------ */

/** Map of event-name → Set<callback> */
const listeners = {};

/* ------------------------------------------------------------------ */
/*  Seed data on first run                                            */
/* ------------------------------------------------------------------ */

function seedIfEmpty() {
  if (!localStorage.getItem(KEYS.USERS)) {
    save(KEYS.USERS, seedUsers);
  }
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    save(KEYS.PRODUCTS, seedProducts);
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    save(KEYS.ORDERS, seedOrders);
  }
  if (!localStorage.getItem(KEYS.CART)) {
    save(KEYS.CART, []);
  }
}

seedIfEmpty();

/* ================================================================== */
/*  PUBLIC API                                                        */
/* ================================================================== */

export const store = {

  /* ================================================================ */
  /*  Event emitter                                                   */
  /* ================================================================ */

  /**
   * Subscribe to a store event.
   *
   * @param {string}   event    - 'auth-change' | 'cart-update' | 'products-update' | 'orders-update'
   * @param {Function} callback - Handler receiving event data.
   * @returns {Function} Unsubscribe function.
   */
  on(event, callback) {
    if (!listeners[event]) listeners[event] = new Set();
    listeners[event].add(callback);
    return () => listeners[event].delete(callback);
  },

  /**
   * Emit an event to all registered listeners.
   *
   * @param {string} event - Event name.
   * @param {*}      data  - Payload.
   */
  emit(event, data) {
    if (!listeners[event]) return;
    listeners[event].forEach(cb => {
      try { cb(data); } catch (err) {
        console.error(`[store] Error in "${event}" listener:`, err);
      }
    });
  },

  /* ================================================================ */
  /*  AUTH                                                            */
  /* ================================================================ */

  /**
   * Create a new user account.
   *
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {'farmer'|'buyer'} role
   * @param {string} phone
   * @param {string} location
   * @returns {{ success: boolean, user?: object, error?: string }}
   */
  signup(nameOrObj, email, password, role, phone, location) {
    // Support both: signup({name, email, ...}) and signup(name, email, ...)
    let name;
    if (typeof nameOrObj === 'object' && nameOrObj !== null) {
      ({ name, email, password, role, phone, location } = nameOrObj);
    } else {
      name = nameOrObj;
    }

    const users = load(KEYS.USERS);

    // Check for duplicate email
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const user = {
      id: generateId(),
      name,
      email: email.toLowerCase(),
      password,               // plain text for demo — hash in production!
      role,
      phone: phone || '',
      location: location || '',
      avatar: role === 'farmer' ? '👨‍🌾' : '🛒',
      createdAt: new Date().toISOString()
    };

    users.push(user);
    save(KEYS.USERS, users);

    // Auto-login after signup
    const session = { userId: user.id, role: user.role, loggedIn: true };
    save(KEYS.SESSION, session);

    this.emit('auth-change', { action: 'signup', user });
    return { success: true, user };
  },

  /**
   * Authenticate an existing user.
   *
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, user?: object, error?: string }}
   */
  login(email, password) {
    const users = load(KEYS.USERS);
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const session = { userId: user.id, role: user.role, loggedIn: true };
    save(KEYS.SESSION, session);

    this.emit('auth-change', { action: 'login', user });
    return { success: true, user };
  },

  /** Log the current user out and clear the cart. */
  logout() {
    save(KEYS.SESSION, { userId: null, role: null, loggedIn: false });
    save(KEYS.CART, []);
    this.emit('auth-change', { action: 'logout', user: null });
  },

  /**
   * Get the full user object for the logged-in session, or null.
   *
   * @returns {object|null}
   */
  getCurrentUser() {
    const session = load(KEYS.SESSION, {});
    if (!session.loggedIn || !session.userId) return null;

    const users = load(KEYS.USERS);
    return users.find(u => u.id === session.userId) || null;
  },

  /**
   * Quick boolean check for login state.
   *
   * @returns {boolean}
   */
  isLoggedIn() {
    const session = load(KEYS.SESSION, {});
    return session.loggedIn === true;
  },

  /* ================================================================ */
  /*  PRODUCTS                                                        */
  /* ================================================================ */

  /**
   * Add a new product (farmer only).
   *
   * @param {object} product - Partial product (without id / timestamps).
   * @returns {object} The complete product with generated id & createdAt.
   */
  addProduct(product) {
    const products = load(KEYS.PRODUCTS);
    const user = this.getCurrentUser();

    const newProduct = {
      id: generateId(),
      farmerId: user?.id || product.farmerId,
      farmerName: user?.name || product.farmerName || 'Unknown Farmer',
      name: product.name,
      description: product.description || '',
      price: Number(product.price) || 0,
      quantity: Number(product.quantity) || 0,
      unit: product.unit || 'kg',
      category: product.category || 'vegetables',
      emoji: product.emoji || '🌱',
      images: product.images || [],
      rating: product.rating || 4.0,
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    save(KEYS.PRODUCTS, products);

    this.emit('products-update', { action: 'add', product: newProduct });
    return newProduct;
  },

  /**
   * Update an existing product by id.
   *
   * @param {string} id      - Product id.
   * @param {object} updates - Fields to merge.
   * @returns {object|null} Updated product, or null if not found.
   */
  updateProduct(id, updates) {
    const products = load(KEYS.PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    save(KEYS.PRODUCTS, products);

    this.emit('products-update', { action: 'update', product: products[index] });
    return products[index];
  },

  /**
   * Remove a product by id.
   *
   * @param {string} id - Product id.
   */
  removeProduct(id) {
    let products = load(KEYS.PRODUCTS);
    products = products.filter(p => p.id !== id);
    save(KEYS.PRODUCTS, products);

    this.emit('products-update', { action: 'remove', productId: id });
  },

  /**
   * Get every product.
   *
   * @returns {object[]}
   */
  getProducts() {
    return load(KEYS.PRODUCTS);
  },

  /**
   * Find a single product by id.
   *
   * @param {string} id
   * @returns {object|undefined}
   */
  getProductById(id) {
    return load(KEYS.PRODUCTS).find(p => p.id === id);
  },

  /**
   * Get all products listed by a specific farmer.
   *
   * @param {string} farmerId
   * @returns {object[]}
   */
  getProductsByFarmer(farmerId) {
    return load(KEYS.PRODUCTS).filter(p => p.farmerId === farmerId);
  },

  /**
   * Get all products in a given category.
   *
   * @param {string} category - e.g. 'vegetables', 'fruits', etc.
   * @returns {object[]}
   */
  getProductsByCategory(category) {
    return load(KEYS.PRODUCTS).filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  },

  getCategories() {
    return [
      { id: 'all', name: 'All', emoji: '📋' },
      { id: 'vegetables', name: 'Vegetables', emoji: '🥬' },
      { id: 'fruits', name: 'Fruits', emoji: '🍎' },
      { id: 'grains', name: 'Grains & Cereals', emoji: '🌾' },
      { id: 'dairy', name: 'Dairy', emoji: '🥛' },
      { id: 'spices', name: 'Spices & Herbs', emoji: '🌶️' },
      { id: 'pulses', name: 'Pulses & Nuts', emoji: '🫘' }
    ];
  },

  /* ================================================================ */
  /*  CART (buyer only)                                               */
  /* ================================================================ */

  /**
   * Add a product to the cart or increase its quantity.
   *
   * @param {string} productId
   * @param {number} [quantity=1]
   */
  addToCart(productId, quantity = 1) {
    const cart = load(KEYS.CART);
    const existing = cart.find(item => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    save(KEYS.CART, cart);
    this.emit('cart-update', { action: 'add', productId, quantity });
  },

  /**
   * Remove a product from the cart entirely.
   *
   * @param {string} productId
   */
  removeFromCart(productId) {
    let cart = load(KEYS.CART);
    cart = cart.filter(item => item.productId !== productId);
    save(KEYS.CART, cart);

    this.emit('cart-update', { action: 'remove', productId });
  },

  /**
   * Set the quantity of a cart item (removes if quantity ≤ 0).
   *
   * @param {string} productId
   * @param {number} quantity
   */
  updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cart = load(KEYS.CART);
    const item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      save(KEYS.CART, cart);
      this.emit('cart-update', { action: 'update', productId, quantity });
    }
  },

  /**
   * Get cart items enriched with full product details.
   *
   * @returns {Array<{productId: string, quantity: number, product: object}>}
   */
  getCart() {
    const cart = load(KEYS.CART);
    const products = load(KEYS.PRODUCTS);

    return cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product: product || null };
    }).filter(item => item.product !== null);
  },

  /** Empty the cart completely. */
  clearCart() {
    save(KEYS.CART, []);
    this.emit('cart-update', { action: 'clear' });
  },

  /**
   * Calculate the total price of all items in the cart.
   *
   * @returns {number}
   */
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  },

  /* ================================================================ */
  /*  ORDERS                                                          */
  /* ================================================================ */

  /**
   * Convert the current cart into a new order.
   *
   * @param {object} buyerDetails - { buyerName, buyerPhone, buyerAddress }
   * @returns {object} The created order.
   */
  placeOrder(buyerDetails) {
    const cartItems = this.getCart();
    const user = this.getCurrentUser();

    const order = {
      id: generateId(),
      buyerId: user?.id || buyerDetails.buyerId,
      buyerName: buyerDetails.buyerName || user?.name || 'Guest',
      buyerPhone: buyerDetails.buyerPhone || user?.phone || '',
      buyerAddress: buyerDetails.buyerAddress || user?.location || '',
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        name: item.product.name,
        emoji: item.product.emoji || '📦',
        unit: item.product.unit || '',
        quantity: item.quantity,
        price: item.product.price,
        farmerId: item.product.farmerId,
        farmerName: item.product.farmerName || ''
      })),
      total: this.getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const orders = load(KEYS.ORDERS);
    orders.push(order);
    save(KEYS.ORDERS, orders);

    // Clear the cart after placing order
    this.clearCart();

    this.emit('orders-update', { action: 'place', order });
    return order;
  },

  /**
   * Get orders filtered by the current user's role.
   * - Buyers see their own orders.
   * - Farmers see orders containing their products.
   *
   * @returns {object[]}
   */
  getOrders() {
    const orders = load(KEYS.ORDERS);
    const user = this.getCurrentUser();

    if (!user) return [];

    if (user.role === 'buyer') {
      return orders.filter(o => o.buyerId === user.id);
    }

    // Farmer: return orders that contain at least one of their products
    return orders.filter(o =>
      o.items.some(item => item.farmerId === user.id)
    );
  },

  /**
   * Find a single order by id.
   *
   * @param {string} id
   * @returns {object|undefined}
   */
  getOrderById(id) {
    return load(KEYS.ORDERS).find(o => o.id === id);
  },

  /**
   * Advance an order's status.
   * Valid flow: pending → confirmed → packed → shipped → delivered
   *
   * @param {string} orderId
   * @param {'pending'|'confirmed'|'packed'|'shipped'|'delivered'} status
   * @returns {object|null} Updated order, or null if not found.
   */
  updateOrderStatus(orderId, status) {
    const validStatuses = ['pending', 'confirmed', 'accepted', 'rejected', 'packed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      console.error(`[store] Invalid order status: "${status}"`);
      return null;
    }

    const orders = load(KEYS.ORDERS);
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    save(KEYS.ORDERS, orders);

    this.emit('orders-update', { action: 'statusUpdate', order: orders[index] });
    return orders[index];
  },

  /**
   * Get every order placed by a specific buyer.
   *
   * @param {string} buyerId
   * @returns {object[]}
   */
  getOrdersByBuyer(buyerId) {
    return load(KEYS.ORDERS).filter(o => o.buyerId === buyerId);
  },

  /**
   * Get every order containing products from a specific farmer.
   *
   * @param {string} farmerId
   * @returns {object[]}
   */
  getOrdersByFarmer(farmerId) {
    return load(KEYS.ORDERS).filter(o =>
      o.items.some(item => item.farmerId === farmerId)
    );
  },

  /* ================================================================ */
  /*  CONVENIENCE HELPERS                                             */
  /* ================================================================ */

  /** Get the number of distinct items in the cart. */
  getCartCount() {
    return load(KEYS.CART).length;
  },

  /**
   * Get orders relevant to a user, regardless of role.
   * @param {string} userId
   * @param {'farmer'|'buyer'} role
   * @returns {object[]}
   */
  getOrdersForUser(userId, role) {
    if (role === 'buyer') return this.getOrdersByBuyer(userId);
    return this.getOrdersByFarmer(userId);
  },

  /**
   * Dashboard stats for a farmer.
   * @param {string} farmerId
   * @returns {object}
   */
  getFarmerStats(farmerId) {
    const products = this.getProductsByFarmer(farmerId);
    const orders = this.getOrdersByFarmer(farmerId);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalEarnings = orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => {
        const farmerItems = o.items.filter(i => i.farmerId === farmerId);
        return sum + farmerItems.reduce((s, i) => s + i.price * i.quantity, 0);
      }, 0);
    const buyerIds = new Set(orders.map(o => o.buyerId));
    return {
      totalProducts: products.length,
      pendingOrders,
      totalEarnings,
      activeBuyers: buyerIds.size,
    };
  },

  /**
   * Dashboard stats for a buyer.
   * @param {string} buyerId
   * @returns {object}
   */
  getBuyerStats(buyerId) {
    const allProducts = this.getProducts();
    const orders = this.getOrdersByBuyer(buyerId);
    const totalSpent = orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0);
    const farmerIds = new Set();
    orders.forEach(o => o.items.forEach(i => farmerIds.add(i.farmerId)));
    return {
      availableProducts: allProducts.length,
      myOrders: orders.length,
      totalSpent,
      favoriteFarmers: farmerIds.size,
    };
  },

  /** No-op for backwards compat — seeding is done automatically on module load. */
  initSeedData() {
    seedIfEmpty();
  }
};
