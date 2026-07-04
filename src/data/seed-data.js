/**
 * Fram Digital Fusion — Seed / Demo Data
 * =======================================
 * Realistic Indian agricultural products, users, and orders
 * used to bootstrap the app on first load.
 *
 * Prices are in ₹ (Indian Rupees) and reflect approximate wholesale rates.
 */

/* ------------------------------------------------------------------ */
/*  USERS                                                             */
/* ------------------------------------------------------------------ */
export const seedUsers = [
  {
    id: 'farmer_1',
    name: 'Ramesh Kumar',
    email: 'ramesh@farm.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Warangal, Telangana',
    avatar: '👨‍🌾',
    createdAt: '2025-11-01T08:00:00.000Z'
  },
  {
    id: 'farmer_2',
    name: 'Lakshmi Devi',
    email: 'lakshmi@farm.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '+91 98765 43211',
    location: 'Guntur, Andhra Pradesh',
    avatar: '👩‍🌾',
    createdAt: '2025-11-15T09:30:00.000Z'
  },
  {
    id: 'farmer_3',
    name: 'Suresh Patel',
    email: 'suresh@farm.com',
    password: 'farmer123',
    role: 'farmer',
    phone: '+91 98765 43212',
    location: 'Nashik, Maharashtra',
    avatar: '👨‍🌾',
    createdAt: '2025-12-01T10:00:00.000Z'
  },
  {
    id: 'buyer_1',
    name: 'Grand Spice Restaurant',
    email: 'buyer@rest.com',
    password: 'buyer123',
    role: 'buyer',
    phone: '+91 98765 43220',
    location: 'Hyderabad, Telangana',
    avatar: '🏪',
    createdAt: '2026-01-10T07:00:00.000Z'
  },
  {
    id: 'buyer_2',
    name: 'Fresh Mart Supermarket',
    email: 'freshmart@shop.com',
    password: 'buyer123',
    role: 'buyer',
    phone: '+91 98765 43221',
    location: 'Mumbai, Maharashtra',
    avatar: '🏬',
    createdAt: '2026-02-05T11:00:00.000Z'
  }
];

/* ------------------------------------------------------------------ */
/*  PRODUCTS                                                          */
/* ------------------------------------------------------------------ */
export const seedProducts = [
  // ── Vegetables ────────────────────────────────────────────────────
  {
    id: 'prod_1',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Fresh Tomatoes',
    description: 'Vine-ripened, juicy tomatoes freshly harvested from our Warangal farm. Perfect for curries and salads.',
    price: 30,
    quantity: 500,
    unit: 'kg',
    category: 'vegetables',
    emoji: '🍅',
    images: [],
    rating: 4.5,
    createdAt: '2026-06-01T06:00:00.000Z'
  },
  {
    id: 'prod_2',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Red Onions',
    description: 'Premium quality Nashik-variety red onions. Stored in well-ventilated conditions for maximum shelf life.',
    price: 25,
    quantity: 1000,
    unit: 'kg',
    category: 'vegetables',
    emoji: '🧅',
    images: [],
    rating: 4.3,
    createdAt: '2026-06-01T06:30:00.000Z'
  },
  {
    id: 'prod_3',
    farmerId: 'farmer_3',
    farmerName: 'Suresh Patel',
    name: 'Potatoes',
    description: 'Fresh farm potatoes ideal for chips, curries, and everyday cooking. Clean and sorted.',
    price: 20,
    quantity: 2000,
    unit: 'kg',
    category: 'vegetables',
    emoji: '🥔',
    images: [],
    rating: 4.2,
    createdAt: '2026-06-02T07:00:00.000Z'
  },
  {
    id: 'prod_4',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Fresh Spinach',
    description: 'Tender green spinach leaves, hand-picked early morning. Rich in iron and vitamins.',
    price: 40,
    quantity: 200,
    unit: 'bundle',
    category: 'vegetables',
    emoji: '🥬',
    images: [],
    rating: 4.6,
    createdAt: '2026-06-02T07:30:00.000Z'
  },

  // ── Fruits ────────────────────────────────────────────────────────
  {
    id: 'prod_5',
    farmerId: 'farmer_3',
    farmerName: 'Suresh Patel',
    name: 'Alphonso Mangoes',
    description: 'Premium Ratnagiri Alphonso mangoes — the king of mangoes. Naturally ripened, sweet and aromatic.',
    price: 600,
    quantity: 100,
    unit: 'dozen',
    category: 'fruits',
    emoji: '🥭',
    images: [],
    rating: 4.9,
    createdAt: '2026-06-03T08:00:00.000Z'
  },
  {
    id: 'prod_6',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Bananas (Robusta)',
    description: 'Sweet Robusta bananas in large bunches. Great for daily consumption and temple offerings.',
    price: 45,
    quantity: 300,
    unit: 'dozen',
    category: 'fruits',
    emoji: '🍌',
    images: [],
    rating: 4.4,
    createdAt: '2026-06-03T08:30:00.000Z'
  },
  {
    id: 'prod_7',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Sweet Lime (Mosambi)',
    description: 'Juicy and sweet mosambi, perfect for fresh juice. Sourced from well-irrigated orchards.',
    price: 60,
    quantity: 400,
    unit: 'kg',
    category: 'fruits',
    emoji: '🍋',
    images: [],
    rating: 4.1,
    createdAt: '2026-06-04T06:00:00.000Z'
  },

  // ── Grains & Cereals ─────────────────────────────────────────────
  {
    id: 'prod_8',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Basmati Rice',
    description: 'Aged premium basmati rice with extra-long grains. Aromatic and perfect for biryani.',
    price: 8500,
    quantity: 50,
    unit: 'quintal',
    category: 'grains',
    emoji: '🍚',
    images: [],
    rating: 4.7,
    createdAt: '2026-06-04T09:00:00.000Z'
  },
  {
    id: 'prod_9',
    farmerId: 'farmer_3',
    farmerName: 'Suresh Patel',
    name: 'Wheat (Sharbati)',
    description: 'MP-origin Sharbati wheat, known for soft rotis. High gluten, golden grain.',
    price: 3200,
    quantity: 100,
    unit: 'quintal',
    category: 'grains',
    emoji: '🌾',
    images: [],
    rating: 4.5,
    createdAt: '2026-06-05T07:00:00.000Z'
  },
  {
    id: 'prod_10',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Jowar (Sorghum)',
    description: 'Organic jowar millet, gluten-free and nutritious. Excellent for bhakri and porridge.',
    price: 3500,
    quantity: 30,
    unit: 'quintal',
    category: 'grains',
    emoji: '🌿',
    images: [],
    rating: 4.0,
    createdAt: '2026-06-05T08:00:00.000Z'
  },

  // ── Dairy ─────────────────────────────────────────────────────────
  {
    id: 'prod_11',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Farm-Fresh Milk',
    description: 'Pure, unprocessed cow milk delivered within hours of milking. Rich and creamy.',
    price: 60,
    quantity: 500,
    unit: 'liter',
    category: 'dairy',
    emoji: '🥛',
    images: [],
    rating: 4.8,
    createdAt: '2026-06-06T05:00:00.000Z'
  },
  {
    id: 'prod_12',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Fresh Paneer',
    description: 'Homemade fresh paneer from pure buffalo milk. Soft, creamy, and chemical-free.',
    price: 350,
    quantity: 50,
    unit: 'kg',
    category: 'dairy',
    emoji: '🧀',
    images: [],
    rating: 4.6,
    createdAt: '2026-06-06T06:00:00.000Z'
  },

  // ── Spices & Herbs ────────────────────────────────────────────────
  {
    id: 'prod_13',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Turmeric (Haldi)',
    description: 'Guntur-grown turmeric with high curcumin content. Deep yellow, aromatic, and organic.',
    price: 120,
    quantity: 200,
    unit: 'kg',
    category: 'spices',
    emoji: '🟡',
    images: [],
    rating: 4.7,
    createdAt: '2026-06-07T07:00:00.000Z'
  },
  {
    id: 'prod_14',
    farmerId: 'farmer_2',
    farmerName: 'Lakshmi Devi',
    name: 'Red Chillies (Guntur)',
    description: 'Famous Guntur red chillies — fiery hot and deep red. Sun-dried and sorted by hand.',
    price: 180,
    quantity: 300,
    unit: 'kg',
    category: 'spices',
    emoji: '🌶️',
    images: [],
    rating: 4.8,
    createdAt: '2026-06-07T08:00:00.000Z'
  },
  {
    id: 'prod_15',
    farmerId: 'farmer_3',
    farmerName: 'Suresh Patel',
    name: 'Coriander Seeds',
    description: 'Whole coriander seeds with a fresh citrus aroma. Ideal for tempering and spice blends.',
    price: 90,
    quantity: 100,
    unit: 'kg',
    category: 'spices',
    emoji: '🫛',
    images: [],
    rating: 4.3,
    createdAt: '2026-06-08T06:00:00.000Z'
  },

  // ── Pulses & Nuts ─────────────────────────────────────────────────
  {
    id: 'prod_16',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Toor Dal (Pigeon Pea)',
    description: 'Polished toor dal with quick cooking time. A staple of every Indian kitchen.',
    price: 130,
    quantity: 500,
    unit: 'kg',
    category: 'pulses',
    emoji: '🫘',
    images: [],
    rating: 4.4,
    createdAt: '2026-06-08T07:00:00.000Z'
  },
  {
    id: 'prod_17',
    farmerId: 'farmer_3',
    farmerName: 'Suresh Patel',
    name: 'Groundnuts (Peanuts)',
    description: 'Raw groundnuts, hand-picked and cleaned. Excellent for oil extraction, snacks, and chutney.',
    price: 100,
    quantity: 400,
    unit: 'kg',
    category: 'pulses',
    emoji: '🥜',
    images: [],
    rating: 4.2,
    createdAt: '2026-06-09T08:00:00.000Z'
  },
  {
    id: 'prod_18',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Kumar',
    name: 'Chana Dal (Bengal Gram)',
    description: 'Split Bengal gram — versatile pulse used in dal fry, sweets, and snacks.',
    price: 110,
    quantity: 300,
    unit: 'kg',
    category: 'pulses',
    emoji: '🟤',
    images: [],
    rating: 4.3,
    createdAt: '2026-06-10T06:00:00.000Z'
  }
];

/* ------------------------------------------------------------------ */
/*  ORDERS                                                            */
/* ------------------------------------------------------------------ */
export const seedOrders = [
  {
    id: 'order_1',
    buyerId: 'buyer_1',
    buyerName: 'Grand Spice Restaurant',
    buyerPhone: '+91 98765 43220',
    buyerAddress: 'Plot 42, Jubilee Hills, Hyderabad, Telangana 500033',
    items: [
      { productId: 'prod_1', productName: 'Fresh Tomatoes', quantity: 50, price: 30, farmerId: 'farmer_1' },
      { productId: 'prod_2', productName: 'Red Onions', quantity: 100, price: 25, farmerId: 'farmer_1' },
      { productId: 'prod_14', productName: 'Red Chillies (Guntur)', quantity: 10, price: 180, farmerId: 'farmer_2' }
    ],
    total: 5800,    // (50×30) + (100×25) + (10×180)
    status: 'delivered',
    createdAt: '2026-06-05T10:00:00.000Z',
    updatedAt: '2026-06-08T14:00:00.000Z'
  },
  {
    id: 'order_2',
    buyerId: 'buyer_2',
    buyerName: 'Fresh Mart Supermarket',
    buyerPhone: '+91 98765 43221',
    buyerAddress: '12-B, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053',
    items: [
      { productId: 'prod_5', productName: 'Alphonso Mangoes', quantity: 20, price: 600, farmerId: 'farmer_3' },
      { productId: 'prod_6', productName: 'Bananas (Robusta)', quantity: 30, price: 45, farmerId: 'farmer_1' },
      { productId: 'prod_11', productName: 'Farm-Fresh Milk', quantity: 50, price: 60, farmerId: 'farmer_1' }
    ],
    total: 16350,   // (20×600) + (30×45) + (50×60)
    status: 'shipped',
    createdAt: '2026-06-10T09:00:00.000Z',
    updatedAt: '2026-06-12T16:00:00.000Z'
  },
  {
    id: 'order_3',
    buyerId: 'buyer_1',
    buyerName: 'Grand Spice Restaurant',
    buyerPhone: '+91 98765 43220',
    buyerAddress: 'Plot 42, Jubilee Hills, Hyderabad, Telangana 500033',
    items: [
      { productId: 'prod_8', productName: 'Basmati Rice', quantity: 2, price: 8500, farmerId: 'farmer_1' },
      { productId: 'prod_13', productName: 'Turmeric (Haldi)', quantity: 5, price: 120, farmerId: 'farmer_2' },
      { productId: 'prod_16', productName: 'Toor Dal (Pigeon Pea)', quantity: 25, price: 130, farmerId: 'farmer_1' }
    ],
    total: 20850,   // (2×8500) + (5×120) + (25×130)
    status: 'confirmed',
    createdAt: '2026-06-13T11:00:00.000Z',
    updatedAt: '2026-06-13T15:00:00.000Z'
  },
  {
    id: 'order_4',
    buyerId: 'buyer_2',
    buyerName: 'Fresh Mart Supermarket',
    buyerPhone: '+91 98765 43221',
    buyerAddress: '12-B, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053',
    items: [
      { productId: 'prod_3', productName: 'Potatoes', quantity: 200, price: 20, farmerId: 'farmer_3' },
      { productId: 'prod_4', productName: 'Fresh Spinach', quantity: 50, price: 40, farmerId: 'farmer_2' },
      { productId: 'prod_12', productName: 'Fresh Paneer', quantity: 10, price: 350, farmerId: 'farmer_2' }
    ],
    total: 9500,    // (200×20) + (50×40) + (10×350)
    status: 'pending',
    createdAt: '2026-06-15T08:00:00.000Z',
    updatedAt: '2026-06-15T08:00:00.000Z'
  }
];
