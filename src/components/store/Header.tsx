'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { CurrencyCode } from '@/types';
import { ShoppingBag, Search, Menu, X, ArrowRight, LayoutDashboard, Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ onSelectCategory, selectedCategory, onSearchChange }: HeaderProps) {
  const { cartCount, setIsCartOpen, currency, setCurrency, supportedCurrencies } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navLinks = [
    { name: 'All Textiles', category: 'All' },
    { name: 'Curtains & Drapes', category: 'Curtains & Drapes' },
    { name: 'Pillow Covers', category: 'Pillow Covers' },
    { name: 'Rugs & Runners', category: 'Rugs & Runners' },
    { name: 'Bedsheets & Bedding', category: 'Bedsheets & Bedding' },
  ];

  const handleNavClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setIsMobileMenuOpen(false);
  };

  const currentCurrency = supportedCurrencies.find((c) => c.code === currency) || supportedCurrencies[0];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span>Complimentary delivery on handcrafted luxury curtains, rugs, & bedding</span>
        <span className="hidden sm:inline opacity-40">•</span>
        <span className="hidden sm:inline opacity-80">Razorpay Express Checkout Enabled</span>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#ECE5DA]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#1C1917] hover:text-[#9E7D56] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#57534E]">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.category)}
                className={`transition-colors py-1 relative hover:text-[#1C1917] ${
                  selectedCategory === link.category
                    ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9E7D56]'
                    : ''
                }`}
              >
                {link.name}
              </button>
            ))}
            <a
              href="#lookbook"
              className="text-[#9E7D56] hover:text-[#876742] transition-colors flex items-center gap-1 font-semibold"
            >
              Shop The Room
            </a>
          </nav>

          {/* Center Brand Identity */}
          <div className="text-center flex-1 lg:flex-initial">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-normal text-[#1C1917] transition-colors group-hover:text-[#9E7D56]">
                TASMODA
              </span>
              <span className="block text-[8px] uppercase tracking-[0.32em] text-[#8C827A] -mt-1 font-sans">
                Curtains • Rugs • Bedding
              </span>
            </Link>
          </div>

          {/* Right Action Icons & Currency Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#F6F2EB] hover:bg-[#EDE5D8] text-[#1C1917] border border-[#E0D7C9] transition-all"
                title="Select Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#9E7D56]" />
                <span>{currentCurrency.symbol} {currentCurrency.code}</span>
                <ChevronDown className="w-3 h-3 text-[#8C827A]" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#ECE5DA] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#8C827A] block font-semibold">
                    Select Currency
                  </span>
                  {supportedCurrencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F6F2EB] transition-colors ${
                        currency === c.code ? 'font-bold text-[#9E7D56] bg-[#FAF8F5]' : 'text-[#1C1917]'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-semibold">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F6F2EB] rounded-full transition-all"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin Panel Quick Jump Badge */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1C1917] hover:bg-[#322E2B] text-white transition-all shadow-xs"
              title="Open Merchant Admin Studio"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#9E7D56]" />
              <span className="hidden md:inline">Admin Studio</span>
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#FAF8F5] hover:bg-[#F6F2EB] border border-[#ECE5DA] text-[#1C1917] rounded-full transition-all hover:scale-105 shadow-xs ml-1"
              aria-label="View bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9E7D56] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Live Search Bar dropdown */}
        {isSearchOpen && (
          <div className="border-t border-[#ECE5DA] bg-[#F6F2EB] px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C827A]" />
              <input
                type="text"
                placeholder="Search Belgian linen curtains, bouclé pillow covers, Moroccan wool rugs, bedsheet sets..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-transparent text-sm text-[#1C1917] placeholder-[#8C827A] focus:outline-none"
                autoFocus
              />
              {searchVal && (
                <button
                  onClick={() => {
                    setSearchVal('');
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="text-xs uppercase tracking-wider text-[#8C827A] hover:text-[#1C1917]"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#8C827A] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1C1917]/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FDFBF7] shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#ECE5DA]">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] text-[#1C1917]">TASMODA</span>
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C827A]">
                    Curtains, Rugs & Bedding
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-[#57534E] hover:text-[#1C1917]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Currency Selector */}
              <div className="py-4 border-b border-[#ECE5DA]">
                <label className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-1.5 font-semibold">
                  Currency ({currency})
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {supportedCurrencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        currency === c.code
                          ? 'bg-[#1C1917] text-white border-[#1C1917]'
                          : 'bg-white text-[#57534E] border-[#ECE5DA]'
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 text-sm uppercase tracking-wider font-medium text-[#1C1917]">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.category)}
                    className="text-left py-2 border-b border-[#F6F2EB] flex items-center justify-between group"
                  >
                    <span className={selectedCategory === link.category ? 'text-[#9E7D56] font-semibold' : ''}>
                      {link.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
                <a
                  href="#lookbook"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2 text-[#9E7D56] font-semibold flex items-center justify-between"
                >
                  <span>Shop The Room (Lookbook)</span>
                  <ArrowRight className="w-4 h-4 text-[#9E7D56]" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#ECE5DA]">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-[#1C1917] text-white flex items-center justify-center gap-2 text-sm font-medium tracking-wide"
              >
                <LayoutDashboard className="w-4 h-4 text-[#9E7D56]" />
                <span>Enter Admin Studio</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
