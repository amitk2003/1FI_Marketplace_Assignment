import React from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';

interface Props {
  onSwitchToMarketplace: () => void;
}

export const NearbyStoresPlaceholder: React.FC<Props> = ({ onSwitchToMarketplace }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-purple-100 rounded-3xl mx-auto flex items-center justify-center text-[#6C28D9] mb-6 shadow-inner">
        <MapPin className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#6C28D9] rounded-full text-xs font-semibold mb-3 border border-purple-200">
        <Navigation className="w-3.5 h-3.5" />
        <span>Offline Merchant Store Locator</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Nearby Partner Stores
      </h2>
      <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base mb-8">
        Walk into any Croma, Reliance Digital, or Vijay Sales partner outlet and pay via QR code backed by your mutual fund portfolio.
      </p>

      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm max-w-lg mx-auto mb-8 text-left">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Prefer Online Delivery?</h4>
        <p className="text-xs text-gray-500 mb-4">
          Order directly through 1Fi Marketplace with free express delivery to your doorstep and zero downpayment.
        </p>
        <button
          onClick={onSwitchToMarketplace}
          className="btn-1fi-primary w-full py-2.5 px-4 text-sm gap-2"
        >
          <span>Browse 1Fi Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
