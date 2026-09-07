import React, { useState, useEffect } from 'react';
import { PackageSearch, RefreshCw, AlertCircle } from 'lucide-react';
import type { Product, FilterState, ProductVariant, EMIPlan, OrderConfirmation } from '../../types/marketplace';
import { marketplaceApi, calculateEMIPlans } from '../../services/marketplaceApi';
import { PortfolioLimitBanner } from './PortfolioLimitBanner';
import { FiltersBar } from './FiltersBar';
import { ProductCard } from './ProductCard';
import { SkeletonCard } from '../common/SkeletonCard';
import { ProductDetailModal } from './ProductDetailModal';
import { PledgeCheckoutModal } from './PledgeCheckoutModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { PortfolioDetailModal } from './PortfolioDetailModal';
import { ToastContainer, type ToastMessage } from '../common/Toast';

interface MarketplaceViewProps {
  isMobileDeviceMode?: boolean;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ isMobileDeviceMode = false }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    selectedBrands: [],
    minPrice: 0,
    maxPrice: 0,
    tenureFilter: null,
    noCostOnly: true,
    sortBy: 'popularity',
  });

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Checkout flow states
  const [checkoutData, setCheckoutData] = useState<{
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
  } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Success order state
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Portfolio details modal
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch products when filters change
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await marketplaceApi.getProducts(filters);
      setProducts(res.products);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      addToast('error', 'Fetch Error', 'Could not load products. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  // Handlers
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      selectedBrands: [],
      minPrice: 0,
      maxPrice: 0,
      tenureFilter: null,
      noCostOnly: true,
      sortBy: 'popularity',
    });
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleQuickEmiPlan = (product: Product) => {
    const variant = product.variants[0];
    const plans = calculateEMIPlans(variant.price);
    const popularPlan = plans.find((p) => p.tenureMonths === 12) || plans[0];

    setSelectedProduct(product);
    setCheckoutData({
      product,
      variant,
      emiPlan: popularPlan,
    });
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (product: Product, variant: ProductVariant, emiPlan: EMIPlan) => {
    setIsDetailOpen(false);
    setCheckoutData({ product, variant, emiPlan });
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderConfirmation) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setIsSuccessOpen(true);
    addToast('success', 'Order Confirmed', `Pledge authorized for ${order.product.name}`);
  };

  const handleToggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      addToast('info', 'Wishlist Updated', 'Item removed from your wishlist.');
    } else {
      setWishlist([...wishlist, productId]);
      addToast('success', 'Saved to Wishlist', 'Item added to your favorites.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Portfolio Limit & LAMF Value Banner */}
      <PortfolioLimitBanner
        onOpenPortfolioModal={() => setIsPortfolioOpen(true)}
        isMobileDeviceMode={isMobileDeviceMode}
      />

      {/* Filter and Search Bar */}
      <FiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={products.length}
        isMobileDeviceMode={isMobileDeviceMode}
      />

      {/* Main Content Area */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700 my-8">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
          <h3 className="font-bold text-sm">Failed to Load Products</h3>
          <p className="text-xs text-red-600 mt-1">{error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && !error && (
        <div className={isMobileDeviceMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center my-6 sm:my-8 shadow-xs">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl mx-auto flex items-center justify-center text-[#6C28D9] mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            No products found matching your criteria
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-5">
            Try adjusting your search terms, clearing brand filters, or resetting category options.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-1fi-primary py-2.5 px-5 text-xs gap-2"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && products.length > 0 && (
        <div className={isMobileDeviceMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={handleOpenDetail}
              onQuickEmiPlan={handleQuickEmiPlan}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Pledge Checkout Multi-step Modal */}
      {checkoutData && (
        <PledgeCheckoutModal
          product={checkoutData.product}
          variant={checkoutData.variant}
          emiPlan={checkoutData.emiPlan}
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order Confirmed Success Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      {/* Portfolio & Linked Folios Modal */}
      <PortfolioDetailModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />

      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
