'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { LegalModalType } from '@/context/StoreContext';
import { X, ShieldCheck, FileText, Truck, RotateCcw, Cookie, CheckCircle2 } from 'lucide-react';

export function LegalModals() {
  const { activeLegalModal, setActiveLegalModal } = useStore();

  if (!activeLegalModal) return null;

  const tabs: { key: NonNullable<LegalModalType>; label: string; icon: React.ReactNode }[] = [
    { key: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
    { key: 'terms', label: 'Terms of Service', icon: <FileText className="w-4 h-4" /> },
    { key: 'shipping', label: 'Shipping & Delivery', icon: <Truck className="w-4 h-4" /> },
    { key: 'returns', label: 'Returns & Refunds', icon: <RotateCcw className="w-4 h-4" /> },
    { key: 'cookies', label: 'Cookie Declaration', icon: <Cookie className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setActiveLegalModal(null)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden z-10 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#1C1917] text-[#FAF8F5] p-5 sm:p-6 pb-6 relative shrink-0">
          <button
            onClick={() => setActiveLegalModal(null)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7C7B2] font-semibold block mb-1">
            Tasmoda Compliance &amp; Governance
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-white">
            Legal &amp; Regulatory Disclosures
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1">
            Tasmoda Living Textiles Inc. • Registered Artisan Atelier • Effective 2026
          </p>

          {/* Quick tab switcher pills inside header */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 scrollbar-none">
            {tabs.map((tab) => {
              const isSelected = activeLegalModal === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveLegalModal(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#9E7D56] text-white shadow-xs'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#57534E] leading-relaxed">
          
          {/* 1. Privacy Policy */}
          {activeLegalModal === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#1C1917]">1. Global Privacy Protocol &amp; GDPR Compliance</h3>
              <p>
                At Tasmoda Living Textiles (&ldquo;Tasmoda&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we treat your personal information with the same reverence we give our hand-loomed fibers. This Privacy Protocol outlines how your data is collected, processed, and safeguarded when interacting with our digital storefront, lookbooks, and checkout services.
              </p>
              
              <h4 className="font-semibold text-[#1C1917] mt-3">Information We Collect:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Identity Data:</strong> Full name, shipping address, and contact details captured during order placement and Supabase user registration.</li>
                <li><strong>Transaction Data:</strong> Razorpay payment order references, currency selections, and order history. Note: We never store complete debit/credit card numbers; all payments are processed through Razorpay PCI-DSS Level 1 compliant infrastructure.</li>
                <li><strong>Spatial &amp; Textile Preferences:</strong> Room dimensions, saved curtain drop lengths, and lookbook pin interactions.</li>
              </ul>

              <h4 className="font-semibold text-[#1C1917] mt-3">Data Protection Rights:</h4>
              <p className="text-xs">
                Under GDPR and applicable international data laws, you retain the right to request access to your stored personal records, rectification of incorrect shipping data, or complete erasure (&ldquo;Right to be Forgotten&rdquo;) by contacting our concierge at <span className="text-[#9E7D56] font-medium">privacy@tasmoda.com</span>.
              </p>
            </div>
          )}

          {/* 2. Terms of Service */}
          {activeLegalModal === 'terms' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#1C1917]">2. Terms of Service &amp; Craftsmanship Standards</h3>
              <p>
                By accessing or purchasing from Tasmoda, you agree to be bound by these commercial terms. Our home decor collection includes custom-tailored Belgian linen curtains, hand-tufted wool rugs, washed bedding, and bouclé pillow covers.
              </p>

              <h4 className="font-semibold text-[#1C1917] mt-3">Natural Fiber Variations:</h4>
              <p className="text-xs">
                Because our textiles are woven from authentic flax linen, organic cotton, and hand-spun Berber wool, subtle variations in texture, slubbing, and dye shade are characteristic of true artisanal weaving and shall not be considered manufacturing defects.
              </p>

              <h4 className="font-semibold text-[#1C1917] mt-3">Pricing &amp; Multi-Currency Billing:</h4>
              <p className="text-xs">
                All prices are calculated dynamically using verified international exchange rates. When checking out via Razorpay, the final payment will be charged in the displayed tender or equivalent INR settlement in compliance with Reserve Bank of India (RBI) e-commerce directives.
              </p>
            </div>
          )}

          {/* 3. Shipping & Delivery */}
          {activeLegalModal === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#1C1917]">3. Shipping, Lead Times &amp; White-Glove Dispatch</h3>
              <p>
                Each textile piece is carefully steamed, wrapped in recycled archival tissue, and packaged in water-resistant protective transit sleeves.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA]">
                  <span className="font-serif text-sm font-semibold text-[#1C1917] block">Ready-to-Ship Items</span>
                  <p className="text-xs text-[#8C827A] mt-1">Pillow covers, in-stock rugs, and standard bedsheet sets dispatch within 24 to 48 business hours.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA]">
                  <span className="font-serif text-sm font-semibold text-[#1C1917] block">Bespoke Curtains &amp; Drapes</span>
                  <p className="text-xs text-[#8C827A] mt-1">Custom pinch-pleated linen panels undergo 3-5 business days of artisanal tailor-finishing before courier dispatch.</p>
                </div>
              </div>

              <h4 className="font-semibold text-[#1C1917]">Domestic &amp; Cross-Border Freight:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>India:</strong> Complimentary express courier delivery via BlueDart / Delhivery (3-5 days delivery).</li>
                <li><strong>International:</strong> Shipped via DHL Express / FedEx Priority with end-to-end tracking (4-8 business days). All shipments include verified commercial invoices.</li>
              </ul>
            </div>
          )}

          {/* 4. Returns & Refunds */}
          {activeLegalModal === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#1C1917]">4. Return, Replacement &amp; Razorpay Refund Policy</h3>
              <p>
                We stand behind the tactile beauty of our textiles. If an item fails to complement your sanctuary, our returns protocol ensures effortless resolution.
              </p>

              <h4 className="font-semibold text-[#1C1917] mt-3">30-Day Evaluation Window:</h4>
              <p className="text-xs">
                Unwashed, unsoiled rugs, bedding, and pillow covers in original packaging with tags attached may be returned within 30 days of confirmed delivery for a full refund or atelier store credit.
              </p>

              <h4 className="font-semibold text-[#1C1917] mt-3">Bespoke Custom Drapes Exception:</h4>
              <p className="text-xs">
                Curtains cut to custom client-specified drop measurements cannot be returned for change of mind, but are fully guaranteed against any stitching or measurement inaccuracy.
              </p>

              <h4 className="font-semibold text-[#1C1917] mt-3">Razorpay Refund Turnaround:</h4>
              <p className="text-xs">
                Upon inspection at our warehouse, approved refunds are initiated directly to your original payment method via the Razorpay gateway. Reversals typically reflect in your bank account or card statement within 5 to 7 business days.
              </p>
            </div>
          )}

          {/* 5. Cookie Declaration */}
          {activeLegalModal === 'cookies' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-[#1C1917]">5. Comprehensive Cookie &amp; Storage Declaration</h3>
              <p>
                Tasmoda employs standard browser cookies and local storage tokens to preserve your shopping experience across sessions.
              </p>

              <div className="border border-[#ECE5DA] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F6F2EB] text-[#1C1917] font-semibold border-b border-[#ECE5DA]">
                    <tr>
                      <th className="p-3">Identifier</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE5DA]">
                    <tr>
                      <td className="p-3 font-mono text-[11px]">tasmoda_cart_v2</td>
                      <td className="p-3">Essential</td>
                      <td className="p-3">Preserves items added to your textile bag</td>
                      <td className="p-3">Persistent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[11px]">tasmoda_currency</td>
                      <td className="p-3">Functional</td>
                      <td className="p-3">Remembers chosen checkout tender (INR, USD, EUR, etc.)</td>
                      <td className="p-3">1 Year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[11px]">sb-auth-token</td>
                      <td className="p-3">Essential</td>
                      <td className="p-3">Supabase client session token for authenticated patrons</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[11px]">tasmoda_cookie_consent</td>
                      <td className="p-3">Compliance</td>
                      <td className="p-3">Stores user GDPR cookie preference choices</td>
                      <td className="p-3">1 Year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F6F2EB] border-t border-[#ECE5DA] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#8C827A]">
            <CheckCircle2 className="w-4 h-4 text-[#9E7D56]" />
            <span>Complies with ISO 27001, GDPR &amp; Razorpay Merchant Rules</span>
          </div>
          <button
            onClick={() => setActiveLegalModal(null)}
            className="px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#322E2B] transition-colors"
          >
            I Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
