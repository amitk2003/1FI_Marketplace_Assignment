import type { Product, FilterState, EMIPlan, OrderConfirmation, ProductVariant } from '../types/marketplace';
import { MOCK_PRODUCTS, MOCK_USER_PORTFOLIO } from '../data/mockProducts';

// Helper to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const calculateEMIPlans = (amount: number): EMIPlan[] => {
  const tenures = [3, 6, 9, 12, 18, 24, 36];
  
  return tenures.map((tenure) => {
    // 1Fi special: 0% Interest on all standard tenures backed by Mutual Funds (LAMF)
    const isNoCost = true;
    const interestRate = 0;
    const monthlyAmount = Math.ceil(amount / tenure);
    const totalAmount = monthlyAmount * tenure;
    const totalInterest = 0;
    const processingFee = 0; // 1Fi 0 processing fee promotion
    
    // Collateral required is approx 1.4x - 1.5x of product amount in equity mutual funds
    const mutualFundPledgeRequired = Math.round(amount * 1.45);
    
    // Standard credit card 16% p.a. interest savings calculation
    const standardAnnualRate = 0.16;
    const monthlyRate = standardAnnualRate / 12;
    const standardMonthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const standardTotal = standardMonthly * tenure;
    const savingsVsCreditCard = Math.max(0, Math.round(standardTotal - amount));

    return {
      tenureMonths: tenure,
      monthlyAmount,
      interestRate,
      totalAmount,
      totalInterest,
      processingFee,
      mutualFundPledgeRequired,
      isNoCost,
      isPopular: tenure === 12,
      savingsVsCreditCard,
    };
  });
};

export const marketplaceApi = {
  /**
   * Fetch all products matching filter criteria with simulated async network call
   */
  async getProducts(filters?: Partial<FilterState>): Promise<{ products: Product[]; total: number }> {
    await delay(350); // Realistic network delay

    let filtered = [...MOCK_PRODUCTS];

    if (filters) {
      // 1. Search Query filter
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.subtitle.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // 2. Category filter
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter((p) => p.category === filters.category);
      }

      // 3. Brand filter
      if (filters.selectedBrands && filters.selectedBrands.length > 0) {
        filtered = filtered.filter((p) => filters.selectedBrands?.includes(p.brand));
      }

      // 4. Price range filter
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        filtered = filtered.filter((p) => p.basePrice >= (filters.minPrice ?? 0));
      }
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        filtered = filtered.filter((p) => p.basePrice <= (filters.maxPrice ?? Infinity));
      }

      // 5. Sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.basePrice - b.basePrice);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.basePrice - a.basePrice);
            break;
          case 'emi-asc':
            filtered.sort((a, b) => Math.ceil(a.basePrice / 12) - Math.ceil(b.basePrice / 12));
            break;
          case 'discount':
            filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
            break;
          case 'popularity':
          default:
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
            break;
        }
      }
    }

    return {
      products: filtered,
      total: filtered.length,
    };
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    return product ? { ...product } : null;
  },

  /**
   * Simulate PAN / KYC check with CAMS/KFintech
   */
  async verifyKyc(pan: string, mobile: string): Promise<{ success: boolean; eligibleLimit: number; message: string }> {
    await delay(800);
    if (!pan || pan.length < 10) {
      throw new Error('Please provide a valid 10-character PAN number.');
    }
    if (!mobile || mobile.replace(/\D/g, '').length < 10) {
      throw new Error('Please provide a valid 10-digit mobile number.');
    }

    return {
      success: true,
      eligibleLimit: MOCK_USER_PORTFOLIO.availableCreditLimit,
      message: 'Mutual fund portfolio successfully verified via CAMS & MFCentral.',
    };
  },

  /**
   * Simulate pledging mutual fund units and instant loan approval
   */
  async pledgeAndCheckout(data: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    fundFolio: string;
    deliveryAddress: {
      name: string;
      phone: string;
      address: string;
      city: string;
      pincode: string;
    };
  }): Promise<OrderConfirmation> {
    await delay(1200); // Realistic pledge confirmation time

    const fund = MOCK_USER_PORTFOLIO.eligibleFunds.find((f) => f.folioNumber === data.fundFolio) || MOCK_USER_PORTFOLIO.eligibleFunds[0];

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 5);

    const confirmation: OrderConfirmation = {
      orderId: '1FI-LAMF-' + Math.floor(100000 + Math.random() * 900000),
      product: data.product,
      selectedVariant: data.variant,
      emiPlan: data.emiPlan,
      pledgedFund: fund.schemeName,
      pledgedAmount: data.emiPlan.mutualFundPledgeRequired,
      monthlyDueDate: 5,
      firstEmiDate: nextMonth.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      deliveryAddress: data.deliveryAddress,
      status: 'PLEDGE_CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    return confirmation;
  },
};
