'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ShieldCheck, Cookie, Settings2, Check, X } from 'lucide-react';
import { CookiePreferences } from '@/types';

export function CookieBanner() {
  const { isCookieBannerOpen, setIsCookieBannerOpen, setCookieConsent, setActiveLegalModal } = useStore();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  if (!isCookieBannerOpen) return null;

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      accepted: true,
      essential: true,
      analytics: true,
      marketing: true,
    };
    setCookieConsent(prefs);
  };

  const handleNecessaryOnly = () => {
    const prefs: CookiePreferences = {
      accepted: true,
      essential: true,
      analytics: false,
      marketing: false,
    };
    setCookieConsent(prefs);
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      accepted: true,
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    };
    setCookieConsent(prefs);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-4xl mx-auto bg-[#1C1917]/95 backdrop-blur-md text-[#FAF8F5] rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-800 pointer-events-auto">
        {!isCustomizing ? (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-white/10 text-[#9E7D56] shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-normal text-white">
                  Privacy &amp; Cookie Consent Declaration
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed max-w-2xl">
                  Tasmoda uses cookies to ensure secure Razorpay payments, maintain your bespoke curtain measurements, calibrate localized currencies, and measure atelier traffic under GDPR &amp; ePrivacy regulations.
                </p>
                <div className="mt-2 flex items-center gap-4 text-[11px] text-[#D7C7B2]">
                  <button
                    onClick={() => setActiveLegalModal('cookies')}
                    className="underline hover:text-white transition-colors"
                  >
                    Read Cookie Declaration
                  </button>
                  <button
                    onClick={() => setActiveLegalModal('privacy')}
                    className="underline hover:text-white transition-colors"
                  >
                    Privacy Protocol
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsCustomizing(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              <button
                onClick={handleNecessaryOnly}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold transition-colors text-center"
              >
                Essential Only
              </button>

              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Customization Preferences Drawer */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="font-serif text-base font-normal text-white flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[#9E7D56]" />
                <span>Fine-Tune Cookie Preferences</span>
              </h4>
              <button
                onClick={() => setIsCustomizing(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
                aria-label="Back"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Essential */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">Essential Cookies</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-light">
                    Necessary for cart memory, Razorpay checkout security, and Supabase user session tokens.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">Analytics Cookies</span>
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#9E7D56] cursor-pointer rounded"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 font-light">
                    Aggregated metrics helping us understand popular textiles and optimize mobile rendering speeds.
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">Personalization</span>
                    <input
                      type="checkbox"
                      checked={marketingEnabled}
                      onChange={(e) => setMarketingEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#9E7D56] cursor-pointer rounded"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 font-light">
                    Curated room recommendations and bespoke swatch pack invitations matching your interior style.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 rounded-full text-xs text-stone-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-6 py-2 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
