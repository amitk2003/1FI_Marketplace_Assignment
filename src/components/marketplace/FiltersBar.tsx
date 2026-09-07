import React from 'react';
import { Search, X, SlidersHorizontal, Smartphone, Laptop, Headphones, Tablet, Tv, LayoutGrid, Check } from 'lucide-react';
import type { CategoryId, FilterState, SortOption } from '../../types/marketplace';
import { CATEGORIES, BRANDS } from '../../data/mockProducts';

interface Props {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FiltersBar: React.FC<Props> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'smartphones':
        return <Smartphone className="w-4 h-4" />;
      case 'laptops':
        return <Laptop className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'tablets':
        return <Tablet className="w-4 h-4" />;
      case 'appliances':
        return <Tv className="w-4 h-4" />;
      case 'all':
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'all' ||
    filters.selectedBrands.length > 0 ||
    filters.sortBy !== 'popularity';

  const toggleBrand = (brand: string) => {
    const current = [...filters.selectedBrands];
    const index = current.indexOf(brand);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(brand);
    }
    onFilterChange({ selectedBrands: current });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Top row: Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search phones, laptops, headphones, Apple, Samsung..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C28D9] focus:border-transparent transition shadow-xs"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm shadow-xs">
            <SlidersHorizontal className="w-4 h-4 text-[#6C28D9]" />
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="bg-transparent text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="emi-asc">Starting EMI: Low to High</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition"
              title="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Categories Row (Pills) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
                isSelected
                  ? 'bg-[#6C28D9] text-white shadow-brand'
                  : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-[#6C28D9] border border-gray-200'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Brands Row (Chips) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        <span className="text-xs font-medium text-gray-500 whitespace-nowrap flex items-center gap-1">
          Brands:
        </span>
        {BRANDS.map((brand) => {
          const isSelected = filters.selectedBrands.includes(brand);
          return (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-purple-100 border-[#6C28D9] text-[#6C28D9]'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-[#6C28D9]" />}
              <span>{brand}</span>
            </button>
          );
        })}

        <span className="text-xs text-gray-400 ml-auto whitespace-nowrap pl-2">
          {totalResults} {totalResults === 1 ? 'Product' : 'Products'}
        </span>
      </div>
    </div>
  );
};
