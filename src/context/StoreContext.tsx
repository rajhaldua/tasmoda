'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, LookbookScene, LookbookPin, CartItem, Order, AdminAnalytics, CurrencyCode, CurrencyConfig } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_LOOKBOOK_SCENES, INITIAL_ORDERS, INITIAL_ANALYTICS, SUPPORTED_CURRENCIES } from '@/data/mockData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  products: Product[];
  lookbooks: LookbookScene[];
  orders: Order[];
  analytics: AdminAnalytics;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  
  // Multi-Currency Engine
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  supportedCurrencies: CurrencyConfig[];
  currentCurrencyConfig: CurrencyConfig;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;

  // Razorpay
  razorpayButtonId: string;

  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  cartCount: number;

  // Product Studio Actions (Admin)
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Lookbook Actions (Admin & Merchandiser)
  addPin: (sceneId: string, pin: Omit<LookbookPin, 'id'>) => void;
  updatePin: (sceneId: string, pinId: string, updates: Partial<LookbookPin>) => void;
  removePin: (sceneId: string, pinId: string) => void;
  updateLookbookImage: (sceneId: string, imageUrl: string) => void;

  // Order Actions (Admin & Customer)
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [lookbooks, setLookbooks] = useState<LookbookScene[]>(INITIAL_LOOKBOOK_SCENES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [analytics, setAnalytics] = useState<AdminAnalytics>(INITIAL_ANALYTICS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Default currency: INR (₹) as requested for Razorpay store, with instant switcher
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');
  const razorpayButtonId = 'pl_TgPcN7ialmNe50';

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedCurrency = localStorage.getItem('tasmoda_currency') as CurrencyCode;
      if (storedCurrency && SUPPORTED_CURRENCIES.some((c) => c.code === storedCurrency)) {
        setCurrencyState(storedCurrency);
      }

      const storedProds = localStorage.getItem('tasmoda_products_v2');
      if (storedProds) setProducts(JSON.parse(storedProds));

      const storedLookbooks = localStorage.getItem('tasmoda_lookbooks_v2');
      if (storedLookbooks) setLookbooks(JSON.parse(storedLookbooks));

      const storedOrders = localStorage.getItem('tasmoda_orders_v2');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedCart = localStorage.getItem('tasmoda_cart_v2');
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch {}
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('tasmoda_currency', code);
    } catch {}
    const config = SUPPORTED_CURRENCIES.find((c) => c.code === code);
    showToast(`Currency switched to ${config?.name || code}`);
  };

  const currentCurrencyConfig = useMemo(() => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];
  }, [currency]);

  const convertPrice = (amountUSD: number): number => {
    return Math.round(amountUSD * currentCurrencyConfig.rateFromUSD);
  };

  const formatPrice = (amountUSD: number): string => {
    const converted = convertPrice(amountUSD);
    if (currency === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    }
    if (currency === 'USD') {
      return `$${converted.toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      return `€${converted.toLocaleString('de-DE')}`;
    }
    if (currency === 'GBP') {
      return `£${converted.toLocaleString('en-GB')}`;
    }
    return `AED ${converted.toLocaleString('en-US')}`;
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tasmoda_products_v2', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('tasmoda_lookbooks_v2', JSON.stringify(lookbooks));
    } catch {}
  }, [lookbooks]);

  useEffect(() => {
    try {
      localStorage.setItem('tasmoda_orders_v2', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tasmoda_cart_v2', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart calculations in USD
  const cartTotalUSD = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`Added ${product.name} to your bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor))
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Admin Product Actions
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Piece "${newProduct.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Piece updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Piece removed from catalog.', 'info');
  };

  // Admin Lookbook Actions
  const addPin = (sceneId: string, pinData: Omit<LookbookPin, 'id'>) => {
    const newPin: LookbookPin = {
      ...pinData,
      id: `pin-${Date.now()}`,
    };
    setLookbooks((prev) =>
      prev.map((scene) =>
        scene.id === sceneId ? { ...scene, pins: [...scene.pins, newPin] } : scene
      )
    );
    showToast('Hotspot placed on lookbook scene.');
  };

  const updatePin = (sceneId: string, pinId: string, updates: Partial<LookbookPin>) => {
    setLookbooks((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              pins: scene.pins.map((pin) => (pin.id === pinId ? { ...pin, ...updates } : pin)),
            }
          : scene
      )
    );
  };

  const removePin = (sceneId: string, pinId: string) => {
    setLookbooks((prev) =>
      prev.map((scene) =>
        scene.id === sceneId
          ? { ...scene, pins: scene.pins.filter((pin) => pin.id !== pinId) }
          : scene
      )
    );
    showToast('Hotspot pin removed.', 'info');
  };

  const updateLookbookImage = (sceneId: string, imageUrl: string) => {
    setLookbooks((prev) =>
      prev.map((scene) => (scene.id === sceneId ? { ...scene, image: imageUrl } : scene))
    );
    showToast('Lookbook scene backdrop updated.');
  };

  // Order Actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `TSM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      grossRevenueUSD: prev.grossRevenueUSD + newOrder.totalAmount,
      totalOrders: prev.totalOrders + 1,
    }));
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)));
    showToast(`Order status updated to "${status}".`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        lookbooks,
        orders,
        analytics,
        cart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        currency,
        setCurrency,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        currentCurrencyConfig,
        formatPrice,
        convertPrice,
        razorpayButtonId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalUSD,
        cartCount,
        addProduct,
        updateProduct,
        deleteProduct,
        addPin,
        updatePin,
        removePin,
        updateLookbookImage,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
