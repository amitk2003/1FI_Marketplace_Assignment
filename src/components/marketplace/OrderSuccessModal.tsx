import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Package,
  Download,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { OrderConfirmation } from '../../types/marketplace';

interface Props {
  order: OrderConfirmation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6C28D9', '#A203D5', '#34D399', '#FBBF24'],
      });
    } catch (e) {
      // Ignore in environments without canvas support
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-up my-auto p-6 sm:p-8 text-center space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-emerald-600 shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Heading */}
        <div>
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            LAMF Pledge & Order Approved
          </span>
          <h2 className="text-2xl font-black text-gray-900 mt-2">
            Order Confirmed!
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Order ID: <strong className="font-mono text-gray-800">{order.orderId}</strong>
          </p>
        </div>

        {/* Product & EMI Details Card */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={order.selectedVariant.image || order.product.thumbnail}
              alt={order.product.name}
              className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-purple-100"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-900 truncate">
                {order.product.name}
              </h4>
              <p className="text-[11px] text-gray-500 truncate">
                {order.selectedVariant.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-500">Monthly EMI</span>
              <div className="font-extrabold text-[#6C28D9]">
                ₹{order.emiPlan.monthlyAmount.toLocaleString('en-IN')}/mo
              </div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">Tenure</span>
              <div className="font-bold text-gray-900">
                {order.emiPlan.tenureMonths} Months (0% Interest)
              </div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">First EMI Date</span>
              <div className="font-bold text-gray-900">{order.firstEmiDate}</div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">Pledged Collateral</span>
              <div className="font-bold text-[#6C28D9]">
                ₹{order.pledgedAmount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-purple-100 flex items-center gap-1.5 text-[11px] text-gray-600">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Pledged Fund: {order.pledgedFund} (Active & Growing)</span>
          </div>
        </div>

        {/* Delivery Destination */}
        <div className="bg-gray-50 rounded-xl p-3 text-left border border-gray-200 text-xs flex items-start gap-2.5">
          <Package className="w-4 h-4 text-[#6C28D9] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-gray-900">Delivering to: {order.deliveryAddress.name}</span>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={() => {
              alert(`Downloading LAMF Loan Agreement for ${order.orderId}...`);
            }}
            className="py-2.5 px-4 text-xs font-semibold text-[#6C28D9] bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 flex items-center justify-center gap-1.5 transition flex-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Agreement</span>
          </button>
          <button
            onClick={onClose}
            className="btn-1fi-primary py-2.5 px-6 text-xs flex-1 gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
