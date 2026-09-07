import React from 'react';
import { ShieldCheck, Smartphone, Sparkles, Bell } from 'lucide-react';
import { MOCK_USER_PORTFOLIO } from '../../data/mockProducts';

interface HeaderProps {
  isMobileDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  onOpenEligibilityModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileDeviceMode,
  onToggleDeviceMode,
  onOpenEligibilityModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#6C28D9] to-[#A203D5] flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform shrink-0">
                1Fi
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-gray-900 leading-none">
                  1<span className="text-[#6C28D9]">Fi</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-wide">
                  SHOP WITH MUTUAL FUNDS
                </span>
              </div>
            </a>
            {/* Verification Badge - hidden on small mobile or when inside mobile preview */}
            {!isMobileDeviceMode && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-[#6C28D9] border border-purple-200 rounded-full text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6C28D9]" />
                <span>CAMS & KFintech Verified</span>
              </div>
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* LAMF Credit Limit Badge */}
            <button
              onClick={onOpenEligibilityModal}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 rounded-xl transition-all shadow-xs group text-left"
              title="Click to view portfolio details"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-gray-500 leading-none font-medium flex items-center gap-1">
                  Limit <Sparkles className="w-2.5 h-2.5 text-[#6C28D9] hidden sm:inline" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight whitespace-nowrap">
                  ₹{MOCK_USER_PORTFOLIO.availableCreditLimit.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Device Mode Switcher (only shown on desktop view when NOT in mobile frame) */}
            {!isMobileDeviceMode && (
              <button
                onClick={onToggleDeviceMode}
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                title="Switch to Mobile App Preview"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6C28D9]" />
                <span>Mobile Frame</span>
              </button>
            )}

            {/* Notification & Profile */}
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 bg-[#6C28D9] rounded-full ring-2 ring-white" />
              </button>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EFDAFF] border-2 border-[#6C28D9] flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#6C28D9] shrink-0">
                AK
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
