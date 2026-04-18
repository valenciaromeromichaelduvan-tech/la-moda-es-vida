export interface User {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
  tier: 'Bronce' | 'Plata' | 'Oro' | 'Diamante';
  lastPurchase?: string;
  preferences: string[];
  city: string;
  suggestedSize: string;
  suggestedCategory: string;
}

export interface StrategyItem {
  name: string;
  description: string;
}

export interface Product {
  id: number;
  cat: string;
  title: string;
  price: string;
  tag: string;
  img: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}
