import React from 'react';
import { Store, Tag, Sparkles } from 'lucide-react';

export type ShopTabType = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  onChangeTab: (tab: ShopTabType) => void;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'top-brands' as ShopTabType,
      label: 'Top Brands',
      icon: Tag,
      badge: null,
    },
    {
      id: 'nearby-stores' as ShopTabType,
      label: 'Nearby Stores',
      icon: Store,
      badge: null,
    },
    {
      id: 'marketplace' as ShopTabType,
      label: '1Fi Marketplace',
      icon: Sparkles,
      badge: '0% Interest',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-start">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-50 text-[#6C28D9] border-2 border-[#6C28D9]'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-2 border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#6C28D9]' : 'text-gray-400'
                  }`}
                />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-[#6C28D9] text-white shadow-xs'
                        : 'bg-purple-100 text-[#6C28D9]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
