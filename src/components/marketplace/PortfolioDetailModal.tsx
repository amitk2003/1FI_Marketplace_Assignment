import React from 'react';
import { X, ShieldCheck, TrendingUp, Building, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_USER_PORTFOLIO } from '../../data/mockProducts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioDetailModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#6C28D9] flex items-center justify-center text-white font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Your Mutual Funds Portfolio</h3>
              <p className="text-[11px] text-gray-500">Verified via CAMS & MFCentral</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Summary Banner */}
          <div className="bg-gradient-to-tr from-[#6C28D9] to-[#9333EA] text-white rounded-2xl p-4 shadow-brand space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] text-purple-200">Total Portfolio Valuation</span>
                <div className="text-2xl font-black">
                  ₹{MOCK_USER_PORTFOLIO.totalPortfolioValue.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-purple-200">Available Credit Limit (50%)</span>
                <div className="text-lg font-extrabold text-emerald-300">
                  ₹{MOCK_USER_PORTFOLIO.availableCreditLimit.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-purple-100">
              <span>PAN: {MOCK_USER_PORTFOLIO.panNumber}</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Digital & Secure
              </span>
            </div>
          </div>

          {/* Linked Funds List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#6C28D9]" />
              <span>Linked Mutual Fund Folios ({MOCK_USER_PORTFOLIO.eligibleFunds.length})</span>
            </h4>

            <div className="space-y-2.5">
              {MOCK_USER_PORTFOLIO.eligibleFunds.map((fund, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-purple-50/40 transition space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        {fund.schemeName}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Folio: {fund.folioNumber} • Partner: {fund.lender}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#6C28D9] block">
                        ₹{fund.currentValue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 justify-end">
                        <CheckCircle2 className="w-3 h-3" /> Ready to Pledge
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-200/60">
                    <span>Units: {fund.units}</span>
                    <span>Current NAV: ₹{fund.nav}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 space-y-2 text-xs text-gray-700">
            <div className="font-bold text-[#6C28D9] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Why shop with Loan Against Mutual Funds (LAMF)?</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-gray-600 list-disc list-inside">
              <li>Your mutual fund investments keep compounding in market while you pay monthly EMI.</li>
              <li>0% interest on electronics across top partner tenures.</li>
              <li>No CIBIL score checks, no documentation or branch visits.</li>
              <li>Un-pledge and release your mutual funds automatically upon full repayment.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="btn-1fi-primary py-2 px-5 text-xs"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
