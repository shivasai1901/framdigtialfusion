/**
 * Fram Digital Fusion — UI Translations
 * ======================================
 * Complete translations for English, Telugu (తెలుగు), and Hindi (हिंदी).
 * Every key that exists in `en` MUST also exist in `te` and `hi`.
 *
 * Naming convention: dot-separated namespaces matching UI sections.
 */

export const translations = {

  /* ------------------------------------------------------------------ */
  /*  ENGLISH                                                           */
  /* ------------------------------------------------------------------ */
  en: {
    app: {
      name: 'Fram Digital Fusion',
      tagline: 'Farm Fresh, Direct to You',
      description: 'Connecting farmers directly with buyers for fresh, affordable produce.',
      footer: '© 2026 Fram Digital Fusion. All rights reserved.',
      version: 'v1.0.0'
    },

    auth: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      phone: 'Phone Number',
      location: 'Location',
      role: 'I am a',
      loginTitle: 'Welcome Back!',
      signupTitle: 'Create Account',
      loginSubtitle: 'Login to access your account',
      signupSubtitle: 'Join the farm-to-market revolution',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      loginSuccess: 'Logged in successfully!',
      signupSuccess: 'Account created successfully!',
      loginFailed: 'Invalid email or password.',
      emailExists: 'An account with this email already exists.',
      passwordMismatch: 'Passwords do not match.',
      requiredField: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      selectRole: 'Please select a role.'
    },

    nav: {
      home: 'Home',
      products: 'Products',
      orders: 'Orders',
      cart: 'Cart',
      profile: 'Profile',
      dashboard: 'Dashboard',
      myProducts: 'My Products',
      settings: 'Settings',
      language: 'Language',
      search: 'Search products...',
      logout: 'Logout',
      notifications: 'Notifications',
      marketplace: 'Marketplace'
    },

    home: {
      welcome: 'Welcome',
      farmerDashboard: 'Farmer Dashboard',
      buyerDashboard: 'Marketplace',
      totalProducts: 'Total Products',
      totalOrders: 'Total Orders',
      totalRevenue: 'Total Revenue',
      pendingOrders: 'Pending Orders',
      recentOrders: 'Recent Orders',
      topProducts: 'Top Products',
      quickActions: 'Quick Actions',
      browseProducts: 'Browse Products',
      viewOrders: 'View Orders',
      addNewProduct: 'Add New Product',
      featuredProducts: 'Featured Products',
      freshArrivals: 'Fresh Arrivals',
      shopByCategory: 'Shop by Category',
      heroTitle: 'Fresh from Farm to Your Table',
      heroSubtitle: 'Buy directly from local farmers and get the freshest produce at the best prices.'
    },

    products: {
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      name: 'Product Name',
      price: 'Price',
      pricePerUnit: 'Price per Unit',
      quantity: 'Available Quantity',
      unit: 'Unit',
      category: 'Category',
      description: 'Description',
      images: 'Product Images',
      emoji: 'Product Emoji',
      rating: 'Rating',
      farmer: 'Farmer',
      addedOn: 'Added on',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      viewDetails: 'View Details',
      allProducts: 'All Products',
      myListings: 'My Listings',
      noProducts: 'No products available.',
      noListings: 'You have not listed any products yet.',
      productAdded: 'Product added successfully!',
      productUpdated: 'Product updated successfully!',
      productDeleted: 'Product deleted successfully!',
      sortBy: 'Sort by',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortNewest: 'Newest First',
      sortRating: 'Highest Rated',
      perUnit: 'per',
      myProducts: 'My Products',
      marketplace: 'Marketplace',
      searchPlaceholder: 'Search products...',
      sortDate: 'Newest First',
      sortPrice: 'Price: Low to High',
      save: 'Save Product',
      cancel: 'Cancel',
      confirmDelete: 'Are you sure you want to delete this product?'
    },

    orders: {
      placeOrder: 'Place Order',
      orderHistory: 'Order History',
      orderDetails: 'Order Details',
      orderId: 'Order ID',
      orderDate: 'Order Date',
      orderTotal: 'Order Total',
      orderStatus: 'Status',
      buyerDetails: 'Buyer Details',
      deliveryAddress: 'Delivery Address',
      items: 'Items',
      noOrders: 'No orders yet.',
      orderPlaced: 'Order placed successfully!',
      statusUpdated: 'Order status updated!',
      updateStatus: 'Update Status',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        packed: 'Packed',
        shipped: 'Shipped',
        delivered: 'Delivered'
      },
      trackOrder: 'Track Order',
      cancelOrder: 'Cancel Order',
      reorder: 'Reorder',
      track: 'Track Order',
      placed: 'Placed',
      total: 'Total'
    },

    cart: {
      myCart: 'My Cart',
      emptyCart: 'Your cart is empty.',
      startShopping: 'Start Shopping',
      cartTotal: 'Cart Total',
      subtotal: 'Subtotal',
      deliveryCharge: 'Delivery Charge',
      grandTotal: 'Grand Total',
      checkout: 'Proceed to Checkout',
      removeItem: 'Remove Item',
      updateQuantity: 'Update Quantity',
      itemAdded: 'Item added to cart!',
      itemRemoved: 'Item removed from cart.',
      cartCleared: 'Cart cleared.',
      continueShopping: 'Continue Shopping',
      free: 'Free'
    },

    categories: {
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      grains: 'Grains & Cereals',
      dairy: 'Dairy',
      spices: 'Spices & Herbs',
      pulses: 'Pulses & Nuts'
    },

    common: {
      save: 'Save',
      all: 'All',
      location: 'Location',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      update: 'Update',
      remove: 'Remove',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      noResults: 'No results found.',
      loading: 'Loading...',
      success: 'Success!',
      error: 'Something went wrong.',
      confirm: 'Are you sure?',
      total: 'Total',
      quantity: 'Quantity',
      price: 'Price',
      date: 'Date',
      actions: 'Actions',
      viewAll: 'View All',
      seeMore: 'See More',
      seeLess: 'See Less'
    },

    units: {
      kg: 'Kilogram',
      quintal: 'Quintal',
      ton: 'Ton',
      piece: 'Piece',
      dozen: 'Dozen',
      liter: 'Liter',
      bundle: 'Bundle'
    },

    roles: {
      farmer: 'Farmer',
      buyer: 'Buyer',
      farmerDesc: 'Sell your fresh produce directly to buyers',
      buyerDesc: 'Buy fresh produce directly from farmers'
    },

    profile: {
      myProfile: 'My Profile',
      editProfile: 'Edit Profile',
      memberSince: 'Member since',
      totalSales: 'Total Sales',
      totalPurchases: 'Total Purchases',
      accountSettings: 'Account Settings',
      changePassword: 'Change Password',
      profileUpdated: 'Profile updated successfully!'
    },

    validation: {
      required: 'This field is required.',
      minLength: 'Minimum {0} characters required.',
      maxLength: 'Maximum {0} characters allowed.',
      invalidPhone: 'Please enter a valid phone number.',
      invalidPrice: 'Please enter a valid price.',
      invalidQuantity: 'Please enter a valid quantity.',
      fillAllFields: 'Please fill all required fields.',
      nameRequired: 'Name is required.'
    },

    sidebar: {
      dashboard: 'Dashboard',
      myProducts: 'My Products',
      orders: 'Orders',
      marketplace: 'Marketplace',
      myOrders: 'My Orders',
      cart: 'Cart',
      profile: 'Profile',
      collapse: 'Collapse'
    },

    modal: {
      cancel: 'Cancel',
      close: 'Close',
      confirm: 'Confirm'
    },

    marketplace: {
      hero: 'Fresh from Farm to Your Door',
      heroDesc: 'Buy directly from local farmers. Fresh produce, fair prices, no middlemen.',
      farmerSpotlight: 'Farmer Spotlight'
    },

    products2: {
      similar: 'Similar Products',
      notFound: 'Product Not Found',
      notFoundDesc: 'The product you are looking for does not exist.',
      available: 'available',
      noDescription: 'No description available.',
      tryDifferent: 'Try a different search term or category.',
      categories: 'Categories',
      edit: 'Edit',
      delete: 'Delete'
    },

    cart2: {
      title: 'Shopping Cart',
      empty: 'Your Cart is Empty',
      emptyDesc: 'Looks like you have not added any products yet. Browse the marketplace to find fresh produce!',
      orderSummary: 'Order Summary',
      delivery: 'Delivery',
      deliveryDetails: 'Delivery Details',
      name: 'Full Name',
      phone: 'Phone Number',
      address: 'Delivery Address',
      paymentMethod: 'Payment Method',
      cod: 'Cash on Delivery',
      online: 'Online Payment',
      addedToCart: 'Added to cart!',
      removed: 'Item removed from cart.',
      total: 'Total'
    },

    orders2: {
      incomingOrders: 'Incoming Orders',
      myOrders: 'My Orders',
      noOrdersFarmer: 'You have no incoming orders yet.',
      noOrdersBuyer: 'You have not placed any orders yet.',
      statusUpdated: 'Order status updated!',
      accept: 'Accept',
      reject: 'Reject',
      ship: 'Mark as Shipped',
      deliver: 'Mark as Delivered'
    },

    profile2: {
      title: 'My Profile',
      personalInfo: 'Personal Information',
      stats: 'Quick Stats',
      language: 'Language Settings',
      saved: 'Profile saved successfully!'
    },

    home2: {
      totalEarnings: 'Total Earnings',
      activeBuyers: 'Active Buyers',
      availableProducts: 'Available Products',
      myOrders: 'My Orders',
      totalSpent: 'Total Spent',
      favoriteFarmers: 'Favorite Farmers',
      addProduct: 'Add New Product',
      browseMarketplace: 'Browse Marketplace',
      viewAll: 'View All'
    },

    toast: {
      orderStatusUpdated: 'Order status updated!',
      addedToCart: 'Items added to cart!',
      logoutSuccess: 'Logged out successfully.',
      productSaved: 'Product saved successfully!',
      productDeleted: 'Product deleted.',
      loginSuccess: 'Login successful!',
      signupSuccess: 'Account created successfully!'
    },

    auth2: {
      welcome: 'Welcome to',
      subtitle: 'Connecting farmers directly with restaurants & markets. Fresh produce, fair prices, zero middlemen.',
      demoAccounts: 'Demo Accounts',
      farmerLogin: 'Farmer Login',
      buyerLogin: 'Buyer Login'
    }
  },

  /* ------------------------------------------------------------------ */
  /*  TELUGU  (తెలుగు)                                                   */
  /* ------------------------------------------------------------------ */
  te: {
    app: {
      name: 'ఫ్రామ్ డిజిటల్ ఫ్యూజన్',
      tagline: 'పంట నేరుగా మీ ఇంటికి',
      description: 'తాజా, సరసమైన ఉత్పత్తుల కోసం రైతులను నేరుగా కొనుగోలుదారులతో కలుపుతోంది.',
      footer: '© 2026 ఫ్రామ్ డిజిటల్ ఫ్యూజన్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
      version: 'v1.0.0'
    },

    auth: {
      login: 'లాగిన్',
      signup: 'సైన్ అప్',
      logout: 'లాగ్ అవుట్',
      email: 'ఇమెయిల్ చిరునామా',
      password: 'పాస్‌వర్డ్',
      confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
      name: 'పూర్తి పేరు',
      phone: 'ఫోన్ నంబర్',
      location: 'ప్రదేశం',
      role: 'నేను ఒక',
      loginTitle: 'మీకు స్వాగతం!',
      signupTitle: 'ఖాతా సృష్టించండి',
      loginSubtitle: 'మీ ఖాతాను యాక్సెస్ చేయడానికి లాగిన్ చేయండి',
      signupSubtitle: 'రైతు-మార్కెట్ విప్లవంలో చేరండి',
      noAccount: 'ఖాతా లేదా?',
      hasAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      loginSuccess: 'విజయవంతంగా లాగిన్ అయ్యారు!',
      signupSuccess: 'ఖాతా విజయవంతంగా సృష్టించబడింది!',
      loginFailed: 'ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు.',
      emailExists: 'ఈ ఇమెయిల్‌తో ఖాతా ఇప్పటికే ఉంది.',
      passwordMismatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
      requiredField: 'ఈ ఫీల్డ్ అవసరం.',
      invalidEmail: 'దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
      selectRole: 'దయచేసి పాత్రను ఎంచుకోండి.'
    },

    nav: {
      home: 'హోమ్',
      products: 'ఉత్పత్తులు',
      orders: 'ఆర్డర్లు',
      cart: 'కార్ట్',
      profile: 'ప్రొఫైల్',
      dashboard: 'డాష్‌బోర్డ్',
      myProducts: 'నా ఉత్పత్తులు',
      settings: 'సెట్టింగ్‌లు',
      language: 'భాష',
      search: 'ఉత్పత్తులు వెతకండి...',
      logout: 'లాగ్ అవుట్',
      notifications: 'నోటిఫికేషన్‌లు',
      marketplace: 'మార్కెట్‌ప్లేస్'
    },

    home: {
      welcome: 'స్వాగతం',
      farmerDashboard: 'రైతు డాష్‌బోర్డ్',
      buyerDashboard: 'మార్కెట్‌ప్లేస్',
      totalProducts: 'మొత్తం ఉత్పత్తులు',
      totalOrders: 'మొత్తం ఆర్డర్లు',
      totalRevenue: 'మొత్తం ఆదాయం',
      pendingOrders: 'పెండింగ్ ఆర్డర్లు',
      recentOrders: 'ఇటీవలి ఆర్డర్లు',
      topProducts: 'ప్రముఖ ఉత్పత్తులు',
      quickActions: 'త్వరిత చర్యలు',
      browseProducts: 'ఉత్పత్తులు బ్రౌజ్ చేయండి',
      viewOrders: 'ఆర్డర్లు చూడండి',
      addNewProduct: 'కొత్త ఉత్పత్తి జోడించండి',
      featuredProducts: 'ప్రత్యేక ఉత్పత్తులు',
      freshArrivals: 'తాజా రాకలు',
      shopByCategory: 'వర్గం ద్వారా కొనుగోలు',
      heroTitle: 'పొలం నుండి నేరుగా మీ బల్లకు',
      heroSubtitle: 'స్థానిక రైతుల నుండి నేరుగా కొనండి మరియు ఉత్తమ ధరలకు తాజా ఉత్పత్తులను పొందండి.'
    },

    products: {
      addProduct: 'ఉత్పత్తి జోడించు',
      editProduct: 'ఉత్పత్తి సవరించు',
      deleteProduct: 'ఉత్పత్తి తొలగించు',
      name: 'ఉత్పత్తి పేరు',
      price: 'ధర',
      pricePerUnit: 'యూనిట్ ధర',
      quantity: 'అందుబాటులో ఉన్న పరిమాణం',
      unit: 'యూనిట్',
      category: 'వర్గం',
      description: 'వివరణ',
      images: 'ఉత్పత్తి చిత్రాలు',
      emoji: 'ఉత్పత్తి ఎమోజీ',
      rating: 'రేటింగ్',
      farmer: 'రైతు',
      addedOn: 'జోడించిన తేదీ',
      inStock: 'స్టాక్‌లో ఉంది',
      outOfStock: 'స్టాక్ లేదు',
      addToCart: 'కార్ట్‌కు జోడించు',
      buyNow: 'ఇప్పుడే కొనండి',
      viewDetails: 'వివరాలు చూడండి',
      allProducts: 'అన్ని ఉత్పత్తులు',
      myListings: 'నా జాబితాలు',
      noProducts: 'ఉత్పత్తులు అందుబాటులో లేవు.',
      noListings: 'మీరు ఇంకా ఏ ఉత్పత్తులను జాబితా చేయలేదు.',
      productAdded: 'ఉత్పత్తి విజయవంతంగా జోడించబడింది!',
      productUpdated: 'ఉత్పత్తి విజయవంతంగా నవీకరించబడింది!',
      productDeleted: 'ఉత్పత్తి విజయవంతంగా తొలగించబడింది!',
      sortBy: 'క్రమం',
      sortPriceLow: 'ధర: తక్కువ నుండి ఎక్కువ',
      sortPriceHigh: 'ధర: ఎక్కువ నుండి తక్కువ',
      sortNewest: 'కొత్తవి ముందు',
      sortRating: 'అత్యధిక రేటింగ్',
      perUnit: 'ప్రతి',
      myProducts: 'నా ఉత్పత్తులు',
      marketplace: 'మార్కెట్ప్లేస్',
      searchPlaceholder: 'ఉత్పత్తులు వెతకండి...',
      sortDate: 'కొత్తవి ముందుగా',
      sortPrice: 'ధర: తక్కువ నుండి ఎక్కువ',
      save: 'ఉత్పత్తిని సేవ్ చేయండి',
      cancel: 'రద్దు',
      confirmDelete: 'మీరు ఈ ఉత్పత్తిని తొలగించాలనుకుంటున్నారా?'
    },

    orders: {
      placeOrder: 'ఆర్డర్ చేయండి',
      orderHistory: 'ఆర్డర్ చరిత్ర',
      orderDetails: 'ఆర్డర్ వివరాలు',
      orderId: 'ఆర్డర్ ఐడి',
      orderDate: 'ఆర్డర్ తేదీ',
      orderTotal: 'ఆర్డర్ మొత్తం',
      orderStatus: 'స్థితి',
      buyerDetails: 'కొనుగోలుదారు వివరాలు',
      deliveryAddress: 'డెలివరీ చిరునామా',
      items: 'వస్తువులు',
      noOrders: 'ఇంకా ఆర్డర్లు లేవు.',
      orderPlaced: 'ఆర్డర్ విజయవంతంగా చేయబడింది!',
      statusUpdated: 'ఆర్డర్ స్థితి నవీకరించబడింది!',
      updateStatus: 'స్థితి నవీకరించు',
      status: {
        pending: 'పెండింగ్',
        confirmed: 'నిర్ధారించబడింది',
        packed: 'ప్యాక్ చేయబడింది',
        shipped: 'రవాణా చేయబడింది',
        delivered: 'డెలివరీ అయింది'
      },
      trackOrder: 'ఆర్డర్ ట్రాక్ చేయండి',
      cancelOrder: 'ఆర్డర్ రద్దు చేయండి',
      reorder: 'మళ్లీ ఆర్డర్ చేయండి',
      track: 'ఆర్డర్ ట్రాక్ చేయండి',
      placed: 'ఆర్డర్ చేయబడింది',
      total: 'మొత్తం'
    },

    cart: {
      myCart: 'నా కార్ట్',
      emptyCart: 'మీ కార్ట్ ఖాళీగా ఉంది.',
      startShopping: 'షాపింగ్ ప్రారంభించండి',
      cartTotal: 'కార్ట్ మొత్తం',
      subtotal: 'ఉప మొత్తం',
      deliveryCharge: 'డెలివరీ ఛార్జ్',
      grandTotal: 'మొత్తం',
      checkout: 'చెక్అవుట్‌కు వెళ్ళండి',
      removeItem: 'వస్తువు తొలగించు',
      updateQuantity: 'పరిమాణం మార్చు',
      itemAdded: 'వస్తువు కార్ట్‌కు జోడించబడింది!',
      itemRemoved: 'వస్తువు కార్ట్ నుండి తొలగించబడింది.',
      cartCleared: 'కార్ట్ క్లియర్ చేయబడింది.',
      continueShopping: 'షాపింగ్ కొనసాగించండి',
      free: 'ఉచితం'
    },

    categories: {
      vegetables: 'కూరగాయలు',
      fruits: 'పండ్లు',
      grains: 'ధాన్యాలు & తృణధాన్యాలు',
      dairy: 'పాల ఉత్పత్తులు',
      spices: 'సుగంధ ద్రవ్యాలు & మూలికలు',
      pulses: 'పప్పులు & గింజలు'
    },

    common: {
      save: 'సేవ్',
      all: 'అన్నీ',
      location: 'ప్రదేశం',
      cancel: 'రద్దు',
      delete: 'తొలగించు',
      edit: 'సవరించు',
      add: 'జోడించు',
      update: 'నవీకరించు',
      remove: 'తీసివేయు',
      search: 'వెతకండి',
      filter: 'ఫిల్టర్',
      sort: 'క్రమం',
      back: 'వెనుకకు',
      next: 'తర్వాత',
      previous: 'ముందు',
      submit: 'సమర్పించు',
      close: 'మూసివేయు',
      yes: 'అవును',
      no: 'కాదు',
      ok: 'సరే',
      noResults: 'ఫలితాలు కనుగొనబడలేదు.',
      loading: 'లోడ్ అవుతోంది...',
      success: 'విజయం!',
      error: 'ఏదో తప్పు జరిగింది.',
      confirm: 'మీరు ఖచ్చితంగా చెప్తున్నారా?',
      total: 'మొత్తం',
      quantity: 'పరిమాణం',
      price: 'ధర',
      date: 'తేదీ',
      actions: 'చర్యలు',
      viewAll: 'అన్నీ చూడండి',
      seeMore: 'మరింత చూడండి',
      seeLess: 'తక్కువ చూడండి'
    },

    units: {
      kg: 'కిలోగ్రాము',
      quintal: 'క్వింటాల్',
      ton: 'టన్ను',
      piece: 'ముక్క',
      dozen: 'డజను',
      liter: 'లీటరు',
      bundle: 'కట్ట'
    },

    roles: {
      farmer: 'రైతు',
      buyer: 'కొనుగోలుదారు',
      farmerDesc: 'మీ తాజా పంటను నేరుగా అమ్మండి',
      buyerDesc: 'రైతుల నుండి నేరుగా తాజా ఉత్పత్తులను కొనండి'
    },

    profile: {
      myProfile: 'నా ప్రొఫైల్',
      editProfile: 'ప్రొఫైల్ సవరించు',
      memberSince: 'సభ్యుడు అయిన తేదీ',
      totalSales: 'మొత్తం అమ్మకాలు',
      totalPurchases: 'మొత్తం కొనుగోళ్ళు',
      accountSettings: 'ఖాతా సెట్టింగ్‌లు',
      changePassword: 'పాస్‌వర్డ్ మార్చండి',
      profileUpdated: 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!'
    },

    validation: {
      required: 'ఈ ఫీల్డ్ అవసరం.',
      minLength: 'కనీసం {0} అక్షరాలు అవసరం.',
      maxLength: 'గరిష్టంగా {0} అక్షరాలు అనుమతించబడతాయి.',
      invalidPhone: 'దయచేసి చెల్లుబాటు అయ్యే ఫోన్ నంబర్ నమోదు చేయండి.',
      invalidPrice: 'దయచేసి చెల్లుబాటు అయ్యే ధర నమోదు చేయండి.',
      invalidQuantity: 'దయచేసి చెల్లుబాటు అయ్యే పరిమాణం నమోదు చేయండి.',
      fillAllFields: 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను నింపండి.',
      nameRequired: 'పేరు అవసరం.'
    },
    sidebar: {
      dashboard: 'డాష్‌బోర్డ్',
      myProducts: 'నా ఉత్పత్తులు',
      orders: 'ఆర్డర్లు',
      marketplace: 'మార్కెట్‌ప్లేస్',
      myOrders: 'నా ఆర్డర్లు',
      cart: 'కార్ట్',
      profile: 'ప్రొఫైల్',
      collapse: 'కుదించు'
    },

    modal: {
      cancel: 'రద్దు',
      close: 'మూసివేయండి',
      confirm: 'నిర్ధారించండి'
    },
    marketplace: {
      hero: 'పంట నేరుగా మీ ఇంటికి',
      heroDesc: 'స్థానిక రైతుల నుండి నేరుగా కొనండి. తాజా ఉత్పత్తులు, సరసమైన ధరలు, మధ్యవర్తులు లేరు.',
      farmerSpotlight: 'రైతు స్పాట్‌లైట్'
    },
    products2: {
      similar: 'సారూప్య ఉత్పత్తులు',
      notFound: 'ఉత్పత్తి కనుగొనబడలేదు',
      notFoundDesc: 'మీరు వెతుకుతున్న ఉత్పత్తి ఉనికిలో లేదు.',
      available: 'అందుబాటులో ఉంది',
      noDescription: 'వివరణ అందుబాటులో లేదు.',
      tryDifferent: 'వేరే శోధన పదం లేదా వర్గం ప్రయత్నించండి.',
      categories: 'వర్గాలు',
      edit: 'సవరించు',
      delete: 'తొలగించు'
    },
    cart2: {
      title: 'షాపింగ్ కార్ట్',
      empty: 'మీ కార్ట్ ఖాళీగా ఉంది',
      emptyDesc: 'మీరు ఇంకా ఉత్పత్తులు జోడించలేదు. తాజా ఉత్పత్తులను కనుగొనడానికి మార్కెట్‌ప్లేస్ చూడండి!',
      orderSummary: 'ఆర్డర్ సారాంశం',
      delivery: 'డెలివరీ',
      deliveryDetails: 'డెలివరీ వివరాలు',
      name: 'పూర్తి పేరు',
      phone: 'ఫోన్ నంబర్',
      address: 'డెలివరీ చిరునామా',
      paymentMethod: 'చెల్లింపు విధానం',
      cod: 'క్యాష్ ఆన్ డెలివరీ',
      online: 'ఆన్‌లైన్ చెల్లింపు',
      addedToCart: 'కార్ట్‌కు జోడించబడింది!',
      removed: 'కార్ట్ నుండి తొలగించబడింది.',
      total: 'మొత్తం'
    },
    orders2: {
      incomingOrders: 'ఇన్‌కమింగ్ ఆర్డర్లు',
      myOrders: 'నా ఆర్డర్లు',
      noOrdersFarmer: 'మీకు ఇంకా ఇన్‌కమింగ్ ఆర్డర్లు లేవు.',
      noOrdersBuyer: 'మీరు ఇంకా ఆర్డర్లు చేయలేదు.',
      statusUpdated: 'ఆర్డర్ స్థితి నవీకరించబడింది!',
      accept: 'ఆమోదించు',
      reject: 'తిరస్కరించు',
      ship: 'షిప్ చేయబడింది',
      deliver: 'డెలివరీ చేయబడింది'
    },
    profile2: {
      title: 'నా ప్రొఫైల్',
      personalInfo: 'వ్యక్తిగత సమాచారం',
      stats: 'త్వరిత గణాంకాలు',
      language: 'భాషా సెట్టింగ్‌లు',
      saved: 'ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!'
    },
    home2: {
      totalEarnings: 'మొత్తం ఆదాయం',
      activeBuyers: 'యాక్టివ్ కొనుగోలుదారులు',
      availableProducts: 'అందుబాటులో ఉన్న ఉత్పత్తులు',
      myOrders: 'నా ఆర్డర్లు',
      totalSpent: 'మొత్తం ఖర్చు',
      favoriteFarmers: 'ఇష్టమైన రైతులు',
      addProduct: 'కొత్త ఉత్పత్తి జోడించు',
      browseMarketplace: 'మార్కెట్‌ప్లేస్ చూడండి',
      viewAll: 'అన్నీ చూడండి'
    },
    toast: {
      orderStatusUpdated: 'ఆర్డర్ స్థితి నవీకరించబడింది!',
      addedToCart: 'కార్ట్‌కు జోడించబడింది!',
      logoutSuccess: 'విజయవంతంగా లాగ్ అవుట్ అయింది.',
      productSaved: 'ఉత్పత్తి విజయవంతంగా సేవ్ చేయబడింది!',
      productDeleted: 'ఉత్పత్తి తొలగించబడింది.',
      loginSuccess: 'లాగిన్ విజయవంతం!',
      signupSuccess: 'ఖాతా విజయవంతంగా సృష్టించబడింది!'
    },
    auth2: {
      welcome: 'స్వాగతం',
      subtitle: 'రైతులను రెస్టారెంట్లు & మార్కెట్లతో నేరుగా అనుసంధానం. తాజా ఉత్పత్తులు, సరసమైన ధరలు, మధ్యవర్తులు లేరు.',
      demoAccounts: 'డెమో ఖాతాలు',
      farmerLogin: 'రైతు లాగిన్',
      buyerLogin: 'కొనుగోలుదారు లాగిన్'
    }
  },

  /* ------------------------------------------------------------------ */
  /*  HINDI  (हिंदी)                                                     */
  /* ------------------------------------------------------------------ */
  hi: {
    app: {
      name: 'फ्रॉम डिजिटल फ्यूज़न',
      tagline: 'खेत से सीधे आपके घर',
      description: 'ताज़ा और किफ़ायती उपज के लिए किसानों को सीधे खरीदारों से जोड़ता है।',
      footer: '© 2026 फ्रॉम डिजिटल फ्यूज़न। सर्वाधिकार सुरक्षित।',
      version: 'v1.0.0'
    },

    auth: {
      login: 'लॉग इन',
      signup: 'साइन अप',
      logout: 'लॉग आउट',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      name: 'पूरा नाम',
      phone: 'फ़ोन नंबर',
      location: 'स्थान',
      role: 'मैं हूँ',
      loginTitle: 'आपका स्वागत है!',
      signupTitle: 'खाता बनाएँ',
      loginSubtitle: 'अपने खाते में लॉग इन करें',
      signupSubtitle: 'किसान-बाज़ार क्रांति में शामिल हों',
      noAccount: 'खाता नहीं है?',
      hasAccount: 'पहले से खाता है?',
      loginSuccess: 'सफलतापूर्वक लॉग इन हुआ!',
      signupSuccess: 'खाता सफलतापूर्वक बनाया गया!',
      loginFailed: 'ग़लत ईमेल या पासवर्ड।',
      emailExists: 'इस ईमेल से एक खाता पहले से मौजूद है।',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते।',
      requiredField: 'यह फ़ील्ड आवश्यक है।',
      invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
      selectRole: 'कृपया एक भूमिका चुनें।'
    },

    nav: {
      home: 'होम',
      products: 'उत्पाद',
      orders: 'ऑर्डर',
      cart: 'कार्ट',
      profile: 'प्रोफ़ाइल',
      dashboard: 'डैशबोर्ड',
      myProducts: 'मेरे उत्पाद',
      settings: 'सेटिंग्स',
      language: 'भाषा',
      search: 'उत्पाद खोजें...',
      logout: 'लॉग आउट',
      notifications: 'नोटिफिकेशन',
      marketplace: 'मार्केटप्लेस'
    },

    home: {
      welcome: 'स्वागत है',
      farmerDashboard: 'किसान डैशबोर्ड',
      buyerDashboard: 'बाज़ार',
      totalProducts: 'कुल उत्पाद',
      totalOrders: 'कुल ऑर्डर',
      totalRevenue: 'कुल आय',
      pendingOrders: 'लंबित ऑर्डर',
      recentOrders: 'हाल के ऑर्डर',
      topProducts: 'लोकप्रिय उत्पाद',
      quickActions: 'त्वरित कार्य',
      browseProducts: 'उत्पाद देखें',
      viewOrders: 'ऑर्डर देखें',
      addNewProduct: 'नया उत्पाद जोड़ें',
      featuredProducts: 'विशेष उत्पाद',
      freshArrivals: 'नई आवक',
      shopByCategory: 'श्रेणी के अनुसार खरीदें',
      heroTitle: 'खेत से सीधे आपकी थाली तक',
      heroSubtitle: 'स्थानीय किसानों से सीधे खरीदें और सबसे अच्छी कीमत पर ताज़ा उपज पाएँ।'
    },

    products: {
      addProduct: 'उत्पाद जोड़ें',
      editProduct: 'उत्पाद संपादित करें',
      deleteProduct: 'उत्पाद हटाएँ',
      name: 'उत्पाद का नाम',
      price: 'कीमत',
      pricePerUnit: 'प्रति इकाई कीमत',
      quantity: 'उपलब्ध मात्रा',
      unit: 'इकाई',
      category: 'श्रेणी',
      description: 'विवरण',
      images: 'उत्पाद चित्र',
      emoji: 'उत्पाद इमोजी',
      rating: 'रेटिंग',
      farmer: 'किसान',
      addedOn: 'जोड़ने की तारीख',
      inStock: 'स्टॉक में',
      outOfStock: 'स्टॉक में नहीं',
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      viewDetails: 'विवरण देखें',
      allProducts: 'सभी उत्पाद',
      myListings: 'मेरी लिस्टिंग',
      noProducts: 'कोई उत्पाद उपलब्ध नहीं।',
      noListings: 'आपने अभी तक कोई उत्पाद लिस्ट नहीं किया है।',
      productAdded: 'उत्पाद सफलतापूर्वक जोड़ा गया!',
      productUpdated: 'उत्पाद सफलतापूर्वक अपडेट किया गया!',
      productDeleted: 'उत्पाद सफलतापूर्वक हटाया गया!',
      sortBy: 'क्रमबद्ध करें',
      sortPriceLow: 'कीमत: कम से ज़्यादा',
      sortPriceHigh: 'कीमत: ज़्यादा से कम',
      sortNewest: 'नवीनतम पहले',
      sortRating: 'सबसे अधिक रेटिंग',
      perUnit: 'प्रति',
      myProducts: 'मेरे उत्पाद',
      marketplace: 'मार्केटप्लेस',
      searchPlaceholder: 'उत्पाद खोजें...',
      sortDate: 'नवीनतम पहले',
      sortPrice: 'कीमत: कम से ज़्यादा',
      save: 'उत्पाद सहेजें',
      cancel: 'रद्द करें',
      confirmDelete: 'क्या आप इस उत्पाद को हटाना चाहते हैं?'
    },

    orders: {
      placeOrder: 'ऑर्डर दें',
      orderHistory: 'ऑर्डर इतिहास',
      orderDetails: 'ऑर्डर विवरण',
      orderId: 'ऑर्डर आईडी',
      orderDate: 'ऑर्डर तारीख',
      orderTotal: 'ऑर्डर कुल',
      orderStatus: 'स्थिति',
      buyerDetails: 'खरीदार विवरण',
      deliveryAddress: 'डिलीवरी पता',
      items: 'वस्तुएँ',
      noOrders: 'अभी तक कोई ऑर्डर नहीं।',
      orderPlaced: 'ऑर्डर सफलतापूर्वक दिया गया!',
      statusUpdated: 'ऑर्डर स्थिति अपडेट हो गई!',
      updateStatus: 'स्थिति अपडेट करें',
      status: {
        pending: 'लंबित',
        confirmed: 'पुष्टि हुई',
        packed: 'पैक किया गया',
        shipped: 'भेज दिया गया',
        delivered: 'डिलीवर हो गया'
      },
      trackOrder: 'ऑर्डर ट्रैक करें',
      cancelOrder: 'ऑर्डर रद्द करें',
      reorder: 'फिर से ऑर्डर करें',
      track: 'ऑर्डर ट्रैक करें',
      placed: 'रखा गया',
      total: 'कुल'
    },

    cart: {
      myCart: 'मेरा कार्ट',
      emptyCart: 'आपका कार्ट खाली है।',
      startShopping: 'खरीदारी शुरू करें',
      cartTotal: 'कार्ट कुल',
      subtotal: 'उप-कुल',
      deliveryCharge: 'डिलीवरी शुल्क',
      grandTotal: 'कुल योग',
      checkout: 'चेकआउट पर जाएँ',
      removeItem: 'वस्तु हटाएँ',
      updateQuantity: 'मात्रा बदलें',
      itemAdded: 'वस्तु कार्ट में जोड़ी गई!',
      itemRemoved: 'वस्तु कार्ट से हटाई गई।',
      cartCleared: 'कार्ट साफ़ कर दिया गया।',
      continueShopping: 'खरीदारी जारी रखें',
      free: 'मुफ़्त'
    },

    categories: {
      vegetables: 'सब्ज़ियाँ',
      fruits: 'फल',
      grains: 'अनाज और दालें',
      dairy: 'डेयरी',
      spices: 'मसाले और जड़ी-बूटियाँ',
      pulses: 'दालें और मेवे'
    },

    common: {
      save: 'सेव करें',
      all: 'सभी',
      location: 'स्थान',
      cancel: 'रद्द करें',
      delete: 'हटाएँ',
      edit: 'संपादित करें',
      add: 'जोड़ें',
      update: 'अपडेट करें',
      remove: 'निकालें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध',
      back: 'वापस',
      next: 'अगला',
      previous: 'पिछला',
      submit: 'जमा करें',
      close: 'बंद करें',
      yes: 'हाँ',
      no: 'नहीं',
      ok: 'ठीक है',
      noResults: 'कोई परिणाम नहीं मिला।',
      loading: 'लोड हो रहा है...',
      success: 'सफल!',
      error: 'कुछ गड़बड़ हो गई।',
      confirm: 'क्या आप सुनिश्चित हैं?',
      total: 'कुल',
      quantity: 'मात्रा',
      price: 'कीमत',
      date: 'तारीख',
      actions: 'कार्य',
      viewAll: 'सभी देखें',
      seeMore: 'और देखें',
      seeLess: 'कम देखें'
    },

    units: {
      kg: 'किलोग्राम',
      quintal: 'क्विंटल',
      ton: 'टन',
      piece: 'पीस',
      dozen: 'दर्जन',
      liter: 'लीटर',
      bundle: 'गट्ठा'
    },

    roles: {
      farmer: 'किसान',
      buyer: 'खरीदार',
      farmerDesc: 'अपनी ताज़ा उपज सीधे बेचें',
      buyerDesc: 'किसानों से सीधे ताज़ा उपज खरीदें'
    },

    profile: {
      myProfile: 'मेरी प्रोफ़ाइल',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      memberSince: 'सदस्यता तिथि',
      totalSales: 'कुल बिक्री',
      totalPurchases: 'कुल खरीद',
      accountSettings: 'खाता सेटिंग्स',
      changePassword: 'पासवर्ड बदलें',
      profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!'
    },

    validation: {
      required: 'यह फ़ील्ड आवश्यक है।',
      minLength: 'न्यूनतम {0} अक्षर आवश्यक हैं।',
      maxLength: 'अधिकतम {0} अक्षर अनुमत हैं।',
      invalidPhone: 'कृपया एक मान्य फ़ोन नंबर दर्ज करें।',
      invalidPrice: 'कृपया एक मान्य कीमत दर्ज करें।',
      invalidQuantity: 'कृपया एक मान्य मात्रा दर्ज करें।',
      fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      nameRequired: 'नाम आवश्यक है।'
    },
    sidebar: {
      dashboard: 'डैशबोर्ड',
      myProducts: 'मेरे उत्पाद',
      orders: 'ऑर्डर',
      marketplace: 'मार्केटप्लेस',
      myOrders: 'मेरे ऑर्डर',
      cart: 'कार्ट',
      profile: 'प्रोफ़ाइल',
      collapse: 'छोटा करें'
    },

    modal: {
      cancel: 'रद्द करें',
      close: 'बंद करें',
      confirm: 'पुष्टि करें'
    },
    marketplace: {
      hero: 'खेत से सीधे आपके दरवाज़े तक',
      heroDesc: 'स्थानीय किसानों से सीधे खरीदें। ताज़ा उपज, उचित कीमत, कोई बिचौलिया नहीं।',
      farmerSpotlight: 'किसान स्पॉटलाइट'
    },
    products2: {
      similar: 'समान उत्पाद',
      notFound: 'उत्पाद नहीं मिला',
      notFoundDesc: 'आप जो उत्पाद खोज रहे हैं वह मौजूद नहीं है।',
      available: 'उपलब्ध',
      noDescription: 'कोई विवरण उपलब्ध नहीं।',
      tryDifferent: 'कोई अन्य खोज शब्द या श्रेणी आज़माएं।',
      categories: 'श्रेणियां',
      edit: 'संपादित करें',
      delete: 'हटाएं'
    },
    cart2: {
      title: 'शॉपिंग कार्ट',
      empty: 'आपका कार्ट खाली है',
      emptyDesc: 'लगता है आपने अभी तक कोई उत्पाद नहीं जोड़ा। ताज़ा उपज खोजने के लिए मार्केटप्लेस देखें!',
      orderSummary: 'ऑर्डर सारांश',
      delivery: 'डिलीवरी',
      deliveryDetails: 'डिलीवरी विवरण',
      name: 'पूरा नाम',
      phone: 'फ़ोन नंबर',
      address: 'डिलीवरी पता',
      paymentMethod: 'भुगतान विधि',
      cod: 'कैश ऑन डिलीवरी',
      online: 'ऑनलाइन भुगतान',
      addedToCart: 'कार्ट में जोड़ा गया!',
      removed: 'कार्ट से हटाया गया।',
      total: 'कुल'
    },
    orders2: {
      incomingOrders: 'आने वाले ऑर्डर',
      myOrders: 'मेरे ऑर्डर',
      noOrdersFarmer: 'आपके पास अभी तक कोई आने वाला ऑर्डर नहीं है।',
      noOrdersBuyer: 'आपने अभी तक कोई ऑर्डर नहीं दिया है।',
      statusUpdated: 'ऑर्डर स्थिति अपडेट हुई!',
      accept: 'स्वीकार करें',
      reject: 'अस्वीकार करें',
      ship: 'शिप किया गया',
      deliver: 'डिलीवर किया गया'
    },
    profile2: {
      title: 'मेरी प्रोफ़ाइल',
      personalInfo: 'व्यक्तिगत जानकारी',
      stats: 'त्वरित आंकड़े',
      language: 'भाषा सेटिंग्स',
      saved: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!'
    },
    home2: {
      totalEarnings: 'कुल आय',
      activeBuyers: 'सक्रिय खरीदार',
      availableProducts: 'उपलब्ध उत्पाद',
      myOrders: 'मेरे ऑर्डर',
      totalSpent: 'कुल खर्च',
      favoriteFarmers: 'पसंदीदा किसान',
      addProduct: 'नया उत्पाद जोड़ें',
      browseMarketplace: 'मार्केटप्लेस देखें',
      viewAll: 'सभी देखें'
    },
    toast: {
      orderStatusUpdated: 'ऑर्डर स्थिति अपडेट हुई!',
      addedToCart: 'कार्ट में जोड़ा गया!',
      logoutSuccess: 'सफलतापूर्वक लॉग आउट हुआ।',
      productSaved: 'उत्पाद सफलतापूर्वक सहेजा गया!',
      productDeleted: 'उत्पाद हटाया गया।',
      loginSuccess: 'लॉगिन सफल!',
      signupSuccess: 'खाता सफलतापूर्वक बनाया गया!'
    },
    auth2: {
      welcome: 'स्वागत है',
      subtitle: 'किसानों को रेस्तरां और बाज़ारों से सीधे जोड़ना। ताज़ा उपज, उचित कीमत, कोई बिचौलिया नहीं।',
      demoAccounts: 'डेमो खाते',
      farmerLogin: 'किसान लॉगिन',
      buyerLogin: 'खरीदार लॉगिन'
    }
  }
};
