export type ProductCategory =
  | 'Curtains & Drapes'
  | 'Pillow Covers'
  | 'Rugs & Runners'
  | 'Bedsheets & Bedding';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number; // 1 USD = rate
  name: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  defaultCurrency: CurrencyCode;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  createdAt?: string;
}

export interface CookiePreferences {
  accepted: boolean;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  priceUSD: number;
  compareAtPriceUSD?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  materials: string[];
  dimensions: {
    width: number;
    height: number;
    depth?: number;
    weight: number;
  };
  colors: { name: string; hex: string }[];
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  description: string;
  careGuide: string;
}

export interface LookbookPin {
  id: string;
  productId: string;
  x: number;
  y: number;
  label: string;
}

export interface LookbookScene {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  roomType: string;
  pins: LookbookPin[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  createdAt: string;
  status: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered';
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
  }[];
  totalAmount: number;
  currency: CurrencyCode;
  paymentMethod: 'Razorpay' | 'Card' | 'COD';
  trackingNumber?: string;
}

export interface AdminAnalytics {
  grossRevenueUSD: number;
  revenueGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  averageOrderValueUSD: number;
  conversionRate: number;
  monthlyRevenueUSD: { month: string; amount: number }[];
}
