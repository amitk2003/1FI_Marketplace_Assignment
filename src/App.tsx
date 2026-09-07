import { useState } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { ShopTabs, type ShopTabType } from './components/shop/ShopTabs';
import { TopBrandsPlaceholder } from './components/shop/TopBrandsPlaceholder';
import { NearbyStoresPlaceholder } from './components/shop/NearbyStoresPlaceholder';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { PortfolioDetailModal } from './components/marketplace/PortfolioDetailModal';
import { ShieldCheck, Lock, Smartphone, ArrowUpRight } from 'lucide-react';

export function App() {
  const [activeShopTab, setActiveShopTab] = useState<ShopTabType>('marketplace');
  const [isMobileDeviceMode, setIsMobileDeviceMode] = useState<boolean>(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState<boolean>(false);

  const renderTabContent = () => {
    switch (activeShopTab) {
      case 'top-brands':
        return (
          <TopBrandsPlaceholder
            onSwitchToMarketplace={() => setActiveShopTab('marketplace')}
          />
        );
      case 'nearby-stores':
        return (
          <NearbyStoresPlaceholder
            onSwitchToMarketplace={() => setActiveShopTab('marketplace')}
          />
        );
      case 'marketplace':
      default:
        return <MarketplaceView />;
    }
  };

  const appContent = (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between text-gray-900 pb-20 lg:pb-8">
      {/* Top Header */}
      <Header
        isMobileDeviceMode={isMobileDeviceMode}
        onToggleDeviceMode={() => setIsMobileDeviceMode(!isMobileDeviceMode)}
        onOpenEligibilityModal={() => setIsPortfolioModalOpen(true)}
      />

      {/* Shop Navigation Tabs */}
      <ShopTabs
        activeTab={activeShopTab}
        onChangeTab={setActiveShopTab}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 pt-10 pb-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#6C28D9] flex items-center justify-center text-white font-extrabold text-sm">
                1Fi
              </div>
              <span className="font-bold text-gray-900 text-sm">
                1Fi — Loan Against Mutual Funds Shopping Platform
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6C28D9]" /> SEBI & RBI Regulated Ecosystem
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#6C28D9]" /> 256-Bit Bank Grade Encryption
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-600">
            <div>
              <h5 className="font-bold text-gray-900 mb-2">1Fi Ecosystem</h5>
              <ul className="space-y-1 text-xs">
                <li><a href="https://1fi.in/" target="_blank" rel="noreferrer" className="hover:text-[#6C28D9] flex items-center gap-0.5">1Fi Official Website <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="https://1fi.in/calculator" target="_blank" rel="noreferrer" className="hover:text-[#6C28D9]">LAMF Calculator</a></li>
                <li><a href="https://1fi.in/partner-with-us" target="_blank" rel="noreferrer" className="hover:text-[#6C28D9]">Partner With Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Key Categories</h5>
              <ul className="space-y-1 text-xs">
                <li>Smartphones on 0% EMI</li>
                <li>Laptops & Workstations</li>
                <li>Audio & Wearables</li>
                <li>Smart Home Appliances</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Registered Partners</h5>
              <ul className="space-y-1 text-xs">
                <li>CAMS & KFintech</li>
                <li>MFCentral Pledging</li>
                <li>Tata Capital & DSP Finance</li>
                <li>Bajaj Finserv & MobiKwik</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Assignment Details</h5>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Built for the 1Fi SDE Intern Assignment. Implementing the 1Fi Marketplace section within the existing Shop experience.
              </p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-100 text-[11px] text-gray-400">
            © {new Date().getFullYear()} 1Fi Technology. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      <BottomNav activeTab="shop" />

      {/* Portfolio Quick Detail Modal */}
      <PortfolioDetailModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />
    </div>
  );

  // If mobile frame preview mode is active on large screens:
  if (isMobileDeviceMode) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Device Frame Control Bar */}
        <div className="mb-4 flex items-center justify-between max-w-sm w-full text-white text-xs px-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="font-semibold">Mobile App Preview Mode</span>
          </div>
          <button
            onClick={() => setIsMobileDeviceMode(false)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition"
          >
            Switch to Full Responsive
          </button>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="w-full max-w-[420px] h-[850px] bg-black rounded-[48px] p-3.5 shadow-2xl ring-8 ring-neutral-800 relative overflow-hidden flex flex-col">
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e] mr-3" />
            <div className="w-3 h-3 rounded-full bg-[#101010]" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-[#F9FAFB] rounded-[36px] overflow-y-auto no-scrollbar relative">
            {appContent}
          </div>
        </div>
      </div>
    );
  }

  return appContent;
}

export default App;
