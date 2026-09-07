import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { MOCK_USER_PORTFOLIO } from '../../data/mockProducts';

interface Props {
  onOpenPortfolioModal: () => void;
}

export const PortfolioLimitBanner: React.FC<Props> = ({ onOpenPortfolioModal }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C28D9] via-[#7E22CE] to-[#A203D5] text-white p-6 sm:p-8 shadow-brand-lg mb-8">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left column: Value Proposition */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold text-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>India's 1st LAMF Shopping Marketplace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Shop your favourite gadgets <br />
            <span className="text-purple-200 font-normal italic">Pay later with </span>
            <span className="underline decoration-wavy decoration-yellow-400">0% Interest</span>
          </h1>

          <p className="text-purple-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            Keep your mutual funds compounding and earning returns in the stock market while paying for electronics in easy no-cost monthly EMIs.
          </p>

          {/* Value pill highlights */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>Instant Approval</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mutual Funds Keep Growing</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>Zero CIBIL Score Impact</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Limit Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-inner text-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-medium text-purple-200">Pre-Approved Shopping Limit</span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                  ₹{MOCK_USER_PORTFOLIO.availableCreditLimit.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="px-2 py-1 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-lg text-[11px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-gradient-to-r from-emerald-400 to-green-300 h-full w-full rounded-full" />
            </div>

            <div className="flex justify-between text-xs text-purple-200 mb-4 pb-3 border-b border-white/15">
              <span>Backed by ₹{MOCK_USER_PORTFOLIO.totalPortfolioValue.toLocaleString('en-IN')} Portfolio</span>
              <span className="font-semibold text-white">3 Mutual Funds Linked</span>
            </div>

            <button
              onClick={onOpenPortfolioModal}
              className="w-full py-2.5 px-4 bg-white hover:bg-purple-50 active:bg-purple-100 text-[#6C28D9] rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
            >
              <RefreshCw className="w-4 h-4 text-[#6C28D9]" />
              <span>View Eligible Funds & Limit</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
