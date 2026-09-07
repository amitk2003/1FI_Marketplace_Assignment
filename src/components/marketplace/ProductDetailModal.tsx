import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { Product, ProductVariant, EMIPlan } from '../../types/marketplace';
import { calculateEMIPlans } from '../../services/marketplaceApi';
import { EMISelector } from './EMISelector';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (product: Product, variant: ProductVariant, emiPlan: EMIPlan) => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  if (!isOpen || !product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.thumbnail);
  const [activeTab, setActiveTab] = useState<'emi' | 'specs' | 'highlights'>('emi');

  // Recalculate EMI plans dynamically when variant / price changes
  const emiPlans = calculateEMIPlans(selectedVariant.price);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan>(
    emiPlans.find((p) => p.tenureMonths === 12) || emiPlans[0]
  );

  // Update selected image when variant changes if variant has specific image
  useEffect(() => {
    if (selectedVariant.image) {
      setSelectedImage(selectedVariant.image);
    }
    const newPlans = calculateEMIPlans(selectedVariant.price);
    const matchingPlan = newPlans.find((p) => p.tenureMonths === selectedPlan.tenureMonths) || newPlans[0];
    setSelectedPlan(matchingPlan);
  }, [selectedVariant]);

  const handleProceed = () => {
    onProceedToCheckout(product, selectedVariant, selectedPlan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6C28D9] uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-5 space-y-3">
              <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 relative min-h-[260px]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-56 max-w-full object-contain transition-all duration-300"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-[#6C28D9] text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded-xl p-1.5 border-2 transition overflow-hidden bg-gray-50 ${
                        selectedImage === img
                          ? 'border-[#6C28D9] shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Delivery & Warranty perks */}
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#6C28D9]" />
                  <span>Free Express Delivery within {product.deliveryDays} Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6C28D9]" />
                  <span>{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product details & Variant Pickers */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/70">
                <span className="text-2xl font-black text-gray-900">
                  ₹{selectedVariant.price.toLocaleString('en-IN')}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-sm text-gray-400 line-through">
                    MRP: ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 ml-auto">
                  Save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Variants Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Variant:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isVarSelected = selectedVariant.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border-2 text-left transition ${
                            isVarSelected
                              ? 'border-[#6C28D9] bg-purple-50 text-[#6C28D9] font-bold'
                              : 'border-gray-200 hover:border-purple-200 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {v.colorHex && (
                              <span
                                className="w-4 h-4 rounded-full border border-gray-300 shadow-xs"
                                style={{ backgroundColor: v.colorHex }}
                              />
                            )}
                            <span className="text-xs">{v.name}</span>
                          </div>
                          <span className="text-xs font-semibold">
                            ₹{v.price.toLocaleString('en-IN')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tabs Switcher for EMI / Specs / Highlights */}
              <div className="flex border-b border-gray-200 pt-2">
                <button
                  onClick={() => setActiveTab('emi')}
                  className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
                    activeTab === 'emi'
                      ? 'border-[#6C28D9] text-[#6C28D9]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EMI Plans & LAMF</span>
                </button>
                <button
                  onClick={() => setActiveTab('highlights')}
                  className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === 'highlights'
                      ? 'border-[#6C28D9] text-[#6C28D9]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Key Highlights
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === 'specs'
                      ? 'border-[#6C28D9] text-[#6C28D9]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Tech Specs
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'emi' && (
                <div className="pt-2">
                  <EMISelector
                    plans={emiPlans}
                    selectedPlan={selectedPlan}
                    onSelectPlan={setSelectedPlan}
                    productPrice={selectedVariant.price}
                  />
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="space-y-2 pt-2">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#6C28D9] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4 pt-2 text-xs">
                  {product.specifications.map((sec, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 font-bold text-gray-800 border-b border-gray-100">
                        {sec.category}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {Object.entries(sec.items).map(([k, val]) => (
                          <div key={k} className="px-3 py-2 flex justify-between">
                            <span className="text-gray-500">{k}</span>
                            <span className="font-medium text-gray-900 text-right">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer / Checkout CTA */}
        <div className="p-4 sm:px-6 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div>
            <span className="text-[11px] text-gray-500">Selected EMI Plan:</span>
            <div className="text-base font-extrabold text-[#6C28D9]">
              ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo
              <span className="text-xs font-medium text-gray-600 ml-1">
                for {selectedPlan.tenureMonths} Months
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-3 px-4 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition w-1/3 sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              className="btn-1fi-primary py-3 px-6 text-sm flex-1 sm:flex-initial gap-2"
            >
              <span>Pledge & Proceed on EMI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
