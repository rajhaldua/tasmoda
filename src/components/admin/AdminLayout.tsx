'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Box,
  MapPin,
  Truck,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Bell,
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { ProductStudio } from './ProductStudio';
import { LookbookEditor } from './LookbookEditor';
import { OrdersPipeline } from './OrdersPipeline';
import { ToastContainer } from '@/components/ui/ToastContainer';

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'lookbook' | 'orders'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview & Insights', icon: LayoutDashboard },
    { id: 'products', label: 'Product Studio', icon: Box },
    { id: 'lookbook', label: 'Lookbook Spatial Pins', icon: MapPin },
    { id: 'orders', label: 'Orders & Dispatch', icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-[#F6F2EB] text-[#1C1917] flex flex-col font-sans">
      <ToastContainer />

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#ECE5DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Left Brand & Status */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-serif text-2xl tracking-[0.2em] font-normal text-[#1C1917] group-hover:text-[#9E7D56] transition-colors">
                TASMODA
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1C1917] text-white">
                Studio Suite
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#ECE5DA] text-xs text-[#8C827A]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Storefront Engine</span>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7D56]" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#ECE5DA]/60">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-none py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2 px-3 sm:px-1 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'text-[#1C1917] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9E7D56]'
                      : 'text-[#8C827A] hover:text-[#1C1917]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#9E7D56]' : 'text-[#8C827A]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'products' && <ProductStudio />}
        {activeTab === 'lookbook' && <LookbookEditor />}
        {activeTab === 'orders' && <OrdersPipeline />}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[#ECE5DA] bg-[#FDFBF7] text-center text-xs text-[#8C827A]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Tasmoda Commerce Architecture • Vercel Ready</span>
          <span className="text-[11px]">Bespoke spatial design system for luxury living</span>
        </div>
      </footer>
    </div>
  );
}
