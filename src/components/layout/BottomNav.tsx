import React from 'react';
import { Home, ShoppingBag, PieChart, CreditCard, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'shop', onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, badge: 'New' },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'repayments', label: 'Repay', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] lg:hidden">
      <div className="max-w-md mx-auto px-4 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#6C28D9]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[9px] font-extrabold bg-[#6C28D9] text-white rounded-full leading-tight animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 font-medium ${isActive ? 'font-bold text-[#6C28D9]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#6C28D9] rounded-full absolute -bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
