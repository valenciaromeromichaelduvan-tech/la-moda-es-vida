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
