'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Welcome to the Tasmoda Private Textile Ledger.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          <div className="lg:col-span-5">
            <span className="font-serif text-3xl tracking-[0.2em] font-normal block mb-2">
              TASMODA
            </span>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D7C7B2] font-sans">
              Curtains • Rugs • Bedding • Cushions
            </p>
            <p className="mt-4 text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Tailored Belgian linen drapes, tactile bouclé cushion covers, hand-knotted Berber rugs, and washed Normandy bedsheets.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-lg font-normal mb-2 text-[#FAF8F5]">
                The Private Textile Ledger
              </h4>
              <p className="text-xs text-stone-400 font-light mb-4">
                Receive invitations to limited loom runs, fabric swatch packs, and seasonal curtain drops.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-full px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#9E7D56]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h5 className="uppercase tracking-widest text-[#D7C7B2] font-semibold mb-4 text-[11px]">
              Textile Categories
            </h5>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Belgian Linen Curtains</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Tactile Bouclé Cushions</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Hand-Knotted Berber Rugs</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Normandy Washed Bedding</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Jute Hallway Runners</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[#D7C7B2] font-semibold mb-4 text-[11px]">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#lookbook" className="hover:text-white transition-colors">Shop The Room (Lookbook)</a></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Custom Curtain Measurements</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Fabric Swatch Box</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Trade &amp; Interior Designers</span></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[#D7C7B2] font-semibold mb-4 text-[11px]">
              Payment &amp; Care
            </h5>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><span className="text-[#D7C7B2] font-medium">Razorpay Express Checkout</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">UPI / Cards / NetBanking</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Linen &amp; Wool Washing Guide</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">30-Night Bedding Trial</span></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-[#D7C7B2] font-semibold mb-4 text-[11px]">
              Merchant Command
            </h5>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[#9E7D56] hover:text-white transition-colors font-semibold"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Tasmoda Admin Studio</span>
                </Link>
              </li>
              <li><span className="text-stone-500">Curtain &amp; Rug Inventory</span></li>
              <li><span className="text-stone-500">Lookbook Coordinate Pins</span></li>
              <li><span className="text-stone-500">Razorpay Order Dispatch</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© 2026 Tasmoda Living Textiles Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Payment Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
