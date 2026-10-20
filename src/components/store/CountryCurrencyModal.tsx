'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { CurrencyCode } from '@/types';
import { X, Globe, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export function CountryCurrencyModal() {
  const {
    isCountryModalOpen,
    setIsCountryModalOpen,
    country,
    setCountry,
    supportedCountries,
    currency,
    setCurrency,
    supportedCurrencies,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'country' | 'currency'>('country');

  if (!isCountryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsCountryModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden z-10">
        {/* Header */}
        <div className="bg-[#1C1917] text-[#FAF8F5] p-6 pb-7 relative">
          <button
            onClick={() => setIsCountryModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D7C7B2] font-semibold mb-1">
            <Globe className="w-3.5 h-3.5 text-[#9E7D56]" />
            <span>International Dispatch &amp; Valuation</span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-white">
            Region &amp; Currency Settings
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1">
            Select your delivery destination and billing currency. Duties and taxes are dynamically calibrated.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="p-6 sm:p-8">
          <div className="flex rounded-xl bg-[#F6F2EB] p-1 mb-6 border border-[#ECE5DA]">
            <button
              onClick={() => setActiveTab('country')}
              className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                activeTab === 'country'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#8C827A] hover:text-[#1C1917]'
              }`}
            >
              Shipping Destination
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                activeTab === 'currency'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#8C827A] hover:text-[#1C1917]'
              }`}
            >
              Billing Currency
            </button>
          </div>

          {/* Destination Tab */}
          {activeTab === 'country' ? (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              <p className="text-xs text-[#8C827A] mb-3">
                Selecting your country will automatically adjust our currency engine to your region&apos;s primary tender:
              </p>
              {supportedCountries.map((c) => {
                const isSelected = country === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c.code);
                      setIsCountryModalOpen(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                        : 'bg-white hover:bg-[#F6F2EB] text-[#1C1917] border-[#ECE5DA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm block">{c.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider block ${isSelected ? 'text-[#D7C7B2]' : 'text-[#8C827A]'}`}>
                          Default Currency: {c.defaultCurrency}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#9E7D56] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Currency Tab */
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              <p className="text-xs text-[#8C827A] mb-3">
                Select your preferred checkout currency. Instant conversion rates applied across catalog:
              </p>
              {supportedCurrencies.map((c) => {
                const isSelected = currency === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setIsCountryModalOpen(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                        : 'bg-white hover:bg-[#F6F2EB] text-[#1C1917] border-[#ECE5DA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1C1917] flex items-center justify-center font-bold text-xs border border-[#ECE5DA]">
                        {c.symbol}
                      </span>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm block">{c.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-[#D7C7B2]' : 'text-[#8C827A]'}`}>
                          1 USD = {c.rateFromUSD} {c.code}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#9E7D56] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#ECE5DA] flex items-center justify-between text-[11px] text-[#8C827A]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#9E7D56]" />
              <span>Razorpay Cross-Border Checkout</span>
            </span>
            <button
              onClick={() => setIsCountryModalOpen(false)}
              className="text-[#1C1917] font-semibold hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
