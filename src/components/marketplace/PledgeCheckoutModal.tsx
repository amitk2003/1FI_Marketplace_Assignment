import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MapPin,
  Building,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { Product, ProductVariant, EMIPlan, OrderConfirmation } from '../../types/marketplace';
import { MOCK_USER_PORTFOLIO } from '../../data/mockProducts';
import { marketplaceApi } from '../../services/marketplaceApi';

interface Props {
  product: Product;
  variant: ProductVariant;
  emiPlan: EMIPlan;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const PledgeCheckoutModal: React.FC<Props> = ({
  product,
  variant,
  emiPlan,
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFolio, setSelectedFolio] = useState(MOCK_USER_PORTFOLIO.eligibleFunds[0].folioNumber);
  
  // Delivery address form
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: MOCK_USER_PORTFOLIO.name,
    phone: '9876543210',
    address: 'Flat 402, Signature Residency, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
  });

  // KYC details
  const [panNumber, setPanNumber] = useState(MOCK_USER_PORTFOLIO.panNumber);
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNextToPledge = () => {
    if (!deliveryAddress.name || !deliveryAddress.address || !deliveryAddress.pincode) {
      setErrorMsg('Please complete your delivery address.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleNextToOtp = () => {
    if (!panNumber || panNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-character PAN number.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleConfirmPledge = async () => {
    if (!otp || otp.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP sent to your registered mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const order = await marketplaceApi.pledgeAndCheckout({
        product,
        variant,
        emiPlan,
        fundFolio: selectedFolio,
        deliveryAddress,
      });

      setIsSubmitting(false);
      onOrderSuccess(order);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Pledging failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6C28D9] flex items-center justify-center text-white font-bold text-xs">
              1Fi
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 leading-none">
                LAMF Instant Checkout
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Loan Against Mutual Funds • Zero Interest
              </p>
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

        {/* Step Progress Bar */}
        <div className="bg-purple-50 px-6 py-2.5 border-b border-purple-100 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#6C28D9] font-bold' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#6C28D9] text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Delivery & Plan</span>
          </div>
          <div className="w-8 h-0.5 bg-purple-200" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#6C28D9] font-bold' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#6C28D9] text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </span>
            <span>Select Fund</span>
          </div>
          <div className="w-8 h-0.5 bg-purple-200" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#6C28D9] font-bold' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#6C28D9] text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </span>
            <span>Authorize & Confirm</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Delivery Address & Plan Summary */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Product summary card */}
              <div className="flex items-center gap-3 p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100">
                <img
                  src={variant.image || product.thumbnail}
                  alt={product.name}
                  className="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-purple-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-[11px] text-gray-500">{variant.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-extrabold text-[#6C28D9]">
                      ₹{emiPlan.monthlyAmount.toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-[10px] text-gray-500">
                      ({emiPlan.tenureMonths} Months • 0% Interest)
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Form */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6C28D9]" />
                  <span>Delivery Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-600">Full Name</label>
                    <input
                      type="text"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-600">Mobile Number</label>
                    <input
                      type="text"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-gray-600">Address / Flat / Street</label>
                    <input
                      type="text"
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-600">City</label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-600">Pincode</label>
                    <input
                      type="text"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                      className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Select Mutual Fund to Pledge */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Building className="w-3.5 h-3.5 text-[#6C28D9]" />
                  <span>Select Mutual Fund to Pledge Collateral</span>
                </h4>
                <p className="text-xs text-gray-500">
                  Required pledge value: <strong className="text-[#6C28D9]">₹{emiPlan.mutualFundPledgeRequired.toLocaleString('en-IN')}</strong>. Your funds will not be sold and will continue earning market returns.
                </p>
              </div>

              <div className="space-y-2.5">
                {MOCK_USER_PORTFOLIO.eligibleFunds.map((fund) => {
                  const isSelected = selectedFolio === fund.folioNumber;
                  const isSufficient = fund.currentValue >= emiPlan.mutualFundPledgeRequired;

                  return (
                    <div
                      key={fund.folioNumber}
                      onClick={() => setSelectedFolio(fund.folioNumber)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#6C28D9] bg-purple-50/80 shadow-xs'
                          : 'border-gray-200 hover:border-purple-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">
                            {fund.schemeName}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            Folio: {fund.folioNumber} • Lender: {fund.lender}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-gray-900 block">
                            ₹{fund.currentValue.toLocaleString('en-IN')}
                          </span>
                          <span className={`text-[10px] font-semibold ${isSufficient ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {isSufficient ? 'Sufficient Limit' : 'Partial Collateral'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-purple-100 flex items-center justify-between text-[11px]">
                        <span className="text-gray-500">
                          {fund.units} Units @ NAV ₹{fund.nav}
                        </span>
                        {isSelected && (
                          <span className="text-[#6C28D9] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PAN validation */}
              <div className="pt-2">
                <label className="text-[11px] font-medium text-gray-600">
                  Verify PAN (as per Mutual Fund Folio)
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  maxLength={10}
                  className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold tracking-wider focus:ring-2 focus:ring-[#6C28D9] focus:outline-none"
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>
          )}

          {/* STEP 3: OTP Authorization Simulation */}
          {step === 3 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-[#6C28D9]">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Authorize Lien on MFCentral / CAMS
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                  We sent a 4-digit authorization OTP to your registered number{' '}
                  <strong>{deliveryAddress.phone}</strong> to pledge ₹{emiPlan.mutualFundPledgeRequired.toLocaleString('en-IN')} worth of units.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter 4-digit OTP (e.g. 1234)"
                  className="w-full p-3 text-center text-lg font-mono font-extrabold tracking-widest bg-gray-50 border-2 border-purple-300 rounded-xl focus:border-[#6C28D9] focus:outline-none"
                />
                <button
                  onClick={() => setOtp('1234')}
                  className="text-[11px] text-[#6C28D9] hover:underline font-semibold"
                >
                  Auto-fill demo OTP: 1234
                </button>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-left border border-purple-100 text-xs text-gray-700 space-y-1 max-w-md mx-auto">
                <div className="flex items-center gap-1.5 font-bold text-[#6C28D9]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>LAMF Guarantee</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Units are pledged safely with RBI & SEBI registered NBFC partner. You retain 100% of dividends and market capital appreciation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between sticky bottom-0 z-20">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              disabled={isSubmitting}
              className="py-2.5 px-4 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
            >
              Cancel
            </button>
          )}

          {step === 1 && (
            <button
              onClick={handleNextToPledge}
              className="btn-1fi-primary py-2.5 px-5 text-xs gap-1.5"
            >
              <span>Continue to Pledge Fund</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleNextToOtp}
              className="btn-1fi-primary py-2.5 px-5 text-xs gap-1.5"
            >
              <span>Authorize Lien via OTP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleConfirmPledge}
              disabled={isSubmitting}
              className="btn-1fi-primary py-2.5 px-6 text-xs gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Pledging Units...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Order & Pledge</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
