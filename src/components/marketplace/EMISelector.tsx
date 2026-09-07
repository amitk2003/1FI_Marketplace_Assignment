import React from 'react';
import { CheckCircle2, TrendingUp, Info } from 'lucide-react';
import type { EMIPlan } from '../../types/marketplace';

interface Props {
  plans: EMIPlan[];
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
  productPrice?: number;
}

export const EMISelector: React.FC<Props> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <span>Choose Your No-Cost EMI Plan</span>
            <span className="text-[10px] bg-purple-100 text-[#6C28D9] font-bold px-2 py-0.5 rounded-full">
              Backed by Mutual Funds
            </span>
          </h4>
          <p className="text-xs text-gray-500">
            0% Interest & ₹0 processing fee on all tenures
          </p>
        </div>
      </div>

      {/* Tenures Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {plans.map((plan) => {
          const isSelected = selectedPlan.tenureMonths === plan.tenureMonths;

          return (
            <div
              key={plan.tenureMonths}
              onClick={() => onSelectPlan(plan)}
              className={`cursor-pointer rounded-xl p-3 border-2 transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#6C28D9] bg-purple-50/70 shadow-brand ring-1 ring-[#6C28D9]'
                  : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/20'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-2.5 left-3 bg-[#6C28D9] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Most Popular
                </span>
              )}

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-900">
                  {plan.tenureMonths} Months
                </span>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-[#6C28D9]" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                )}
              </div>

              <div className="mt-1">
                <div className="text-sm sm:text-base font-extrabold text-[#6C28D9]">
                  ₹{plan.monthlyAmount.toLocaleString('en-IN')}
                  <span className="text-[10px] font-normal text-gray-500">/mo</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                  <span>0% Interest</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Plan Summary Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6C28D9] flex items-center justify-center text-white text-xs font-bold">
              {selectedPlan.tenureMonths}m
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">
                ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')} x {selectedPlan.tenureMonths} Months
              </div>
              <div className="text-[11px] text-gray-500">
                Total repayment: ₹{(selectedPlan.monthlyAmount * selectedPlan.tenureMonths).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Saved ₹{selectedPlan.savingsVsCreditCard.toLocaleString('en-IN')} vs CC
            </span>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
          <div>
            <span className="text-gray-500 text-[11px]">Interest Rate</span>
            <div className="font-bold text-emerald-600 flex items-center gap-1">
              0% (No Cost)
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-[11px]">Processing Fee</span>
            <div className="font-bold text-gray-900">₹0 (Free)</div>
          </div>
          <div>
            <span className="text-gray-500 text-[11px]">Prepayment Fee</span>
            <div className="font-bold text-gray-900">₹0 (Anytime)</div>
          </div>
          <div>
            <span className="text-gray-500 text-[11px] flex items-center gap-0.5">
              MF Collateral
              <Info className="w-3 h-3 text-gray-400" />
            </span>
            <div className="font-bold text-[#6C28D9]">
              ₹{selectedPlan.mutualFundPledgeRequired.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Mutual Fund returns note */}
        <div className="mt-3 pt-2.5 border-t border-purple-100/80 flex items-center gap-2 text-[11px] text-gray-600">
          <TrendingUp className="w-3.5 h-3.5 text-[#6C28D9] flex-shrink-0" />
          <span>
            Your pledged mutual funds continue to remain invested & grow in the market throughout the {selectedPlan.tenureMonths} months tenure.
          </span>
        </div>
      </div>
    </div>
  );
};
