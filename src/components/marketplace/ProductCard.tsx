import React from 'react';
import { Star, Sparkles, ArrowRight, Heart } from 'lucide-react';
import type { Product } from '../../types/marketplace';

interface Props {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickEmiPlan: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onSelectProduct,
  onQuickEmiPlan,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  // Lowest monthly EMI with 12 months or 24 months zero cost
  const minMonthlyEmi = Math.ceil(product.basePrice / 12);

  return (
    <div className="group bg-white rounded-2xl border border-purple-100 hover:border-purple-300 hover:shadow-brand transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top badges & Wishlist */}
      <div className="p-3 pb-0 flex items-center justify-between z-10">
        <div className="flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                idx === 0
                  ? 'bg-purple-100 text-[#6C28D9] border border-purple-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {idx === 0 && <Sparkles className="w-2.5 h-2.5" />}
              {badge}
            </span>
          ))}
        </div>

        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="p-1.5 rounded-full bg-gray-50 hover:bg-purple-50 text-gray-400 hover:text-red-500 transition"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
            />
          </button>
        )}
      </div>

      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative px-6 py-4 flex items-center justify-center cursor-pointer overflow-hidden group/img"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="w-full h-44 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute bottom-2 left-3 text-[11px] font-extrabold bg-[#6C28D9] text-white px-2 py-0.5 rounded-md shadow-xs">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#6C28D9]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md text-[11px] font-bold border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-bold text-gray-900 group-hover:text-[#6C28D9] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Variants preview pill */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-gray-400 font-medium">Colors:</span>
              <div className="flex gap-1">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    title={v.color}
                    className="w-3 h-3 rounded-full border border-gray-300 shadow-xs"
                    style={{ backgroundColor: v.colorHex || '#ddd' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & EMI Highlight */}
        <div className="mt-3 pt-2.5 border-t border-purple-50">
          <div className="flex items-baseline justify-between mb-1.5 flex-wrap gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-gray-900">
                ₹{product.basePrice.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.basePrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* 1Fi Signature 0% EMI banner */}
          <div className="bg-[#EFDAFF]/60 border border-[#B3A3BF]/40 rounded-xl px-2.5 py-1.5 mb-2.5 flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6C28D9] shrink-0" />
              <span className="text-[11px] font-semibold text-gray-800">
                From <span className="font-extrabold text-[#6C28D9]">₹{minMonthlyEmi.toLocaleString('en-IN')}/mo</span>
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#6C28D9] bg-white px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
              0% Interest
            </span>
          </div>

          {/* Call to Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="py-2 px-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl transition text-center truncate"
            >
              Details
            </button>
            <button
              onClick={() => onQuickEmiPlan(product)}
              className="btn-1fi-primary py-2 px-2 text-xs gap-1 truncate text-white"
            >
              <span className="truncate">Select Plan</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
