export interface ProductVariant {
  id: string;
  name: string;
  storage?: string;
  color?: string;
  colorHex?: string;
  ram?: string;
  size?: string;
  price: number;
  mrp: number;
  image: string;
  inStock: boolean;
}

export interface EMIPlan {
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number; // 0 for no-cost EMI
  totalAmount: number;
  totalInterest: number;
  processingFee: number;
  mutualFundPledgeRequired: number; // LAMF pledge amount
  isNoCost: boolean;
  isPopular?: boolean;
  savingsVsCreditCard: number;
}

export interface ProductSpecification {
  category: string;
  items: { [key: string]: string };
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  brandLogo?: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables' | 'appliances';
  rating: number;
  reviewCount: number;
  basePrice: number;
  mrp: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  badges: string[]; // e.g. ["0% Interest", "Top Seller", "LAMF Verified"]
  highlights: string[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  inStock: boolean;
  warranty: string;
  deliveryDays: number;
  featured?: boolean;
  bestSeller?: boolean;
}

export type CategoryId = 'all' | 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables' | 'appliances';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'emi-asc' | 'discount';

export interface FilterState {
  searchQuery: string;
  category: CategoryId;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  tenureFilter: number | null; // e.g. 12 months
  noCostOnly: boolean;
  sortBy: SortOption;
}

export interface UserPortfolio {
  name: string;
  panNumber: string;
  mobileNumber: string;
  totalPortfolioValue: number;
  availableCreditLimit: number;
  pledgedAmount: number;
  activeLoansCount: number;
  linkedKycProvider: 'CAMS' | 'KFintech' | 'MFCentral';
  eligibleFunds: {
    schemeName: string;
    folioNumber: string;
    units: number;
    currentValue: number;
    nav: number;
    lender: string;
  }[];
}

export interface OrderConfirmation {
  orderId: string;
  product: Product;
  selectedVariant: ProductVariant;
  emiPlan: EMIPlan;
  pledgedFund: string;
  pledgedAmount: number;
  monthlyDueDate: number; // e.g. 5th of every month
  firstEmiDate: string;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  status: 'PLEDGE_CONFIRMED' | 'DISPATCH_IN_PROGRESS' | 'DELIVERED';
  createdAt: string;
}
