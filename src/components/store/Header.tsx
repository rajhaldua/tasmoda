'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, Search, Menu, X, ArrowRight, Globe, ChevronDown, User, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ onSelectCategory, selectedCategory, onSearchChange }: HeaderProps) {
  const {
    cartCount,
    setIsCartOpen,
    currency,
    currentCurrencyConfig,
    currentCountryConfig,
    setIsCountryModalOpen,
    user,
    setIsAuthModalOpen,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center tracking-wider font-light flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="truncate">Complimentary delivery on handcrafted luxury curtains, rugs, &amp; bedding</span>
        <span className="hidden md:inline opacity-40">•</span>
        <span className="hidden md:inline opacity-80">Razorpay Express Checkout Active</span>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#ECE5DA]/80 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-1 text-[#1C1917] hover:text-[#9E7D56] transition-colors rounded-xl focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs uppercase tracking-widest font-medium text-[#57534E]">
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
            <Link href="/" className="inline-block group py-1">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.18em] sm:tracking-[0.22em] font-normal text-[#1C1917] transition-colors group-hover:text-[#9E7D56]">
                TASMODA
              </span>
              <span className="block text-[7px] sm:text-[8px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#8C827A] -mt-0.5 sm:-mt-1 font-sans">
                Curtains • Rugs • Bedding
              </span>
            </Link>
          </div>

          {/* Right Action Icons: Country/Currency, Search, Auth, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Country & Currency Selector Trigger */}
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-[#F6F2EB] hover:bg-[#EDE5D8] text-[#1C1917] border border-[#E0D7C9] transition-all min-h-[38px]"
              title="Select Delivery Country & Billing Currency"
              aria-label="Country and currency selector"
            >
              <span className="text-sm leading-none">{currentCountryConfig.flag}</span>
              <span className="text-[11px] sm:text-xs">{currentCurrencyConfig.symbol} {currency}</span>
              <ChevronDown className="w-3 h-3 text-[#8C827A] hidden sm:inline" />
            </button>

            {/* Live Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F6F2EB] rounded-full transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Supabase User Account Trigger */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`p-2 rounded-full transition-all min-w-[38px] min-h-[38px] flex items-center justify-center gap-1.5 ${
                user
                  ? 'bg-[#1C1917] text-white hover:bg-[#322E2B] px-2.5'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F6F2EB]'
              }`}
              title={user ? `Signed in as ${user.fullName || user.email}` : 'Sign In / Register'}
              aria-label="User Account"
            >
              {user ? (
                <>
                  <div className="w-4 h-4 rounded-full bg-[#9E7D56] text-white text-[10px] font-serif flex items-center justify-center">
                    {(user.fullName || user.email)[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-medium hidden md:inline truncate max-w-[80px]">
                    {user.fullName ? user.fullName.split(' ')[0] : 'Account'}
                  </span>
                </>
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#FAF8F5] hover:bg-[#F6F2EB] border border-[#ECE5DA] text-[#1C1917] rounded-full transition-all hover:scale-105 shadow-xs min-w-[38px] min-h-[38px] flex items-center justify-center"
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
              <Search className="w-4 h-4 text-[#8C827A] shrink-0" />
              <input
                type="text"
                placeholder="Search Belgian linen drapes, bouclé pillow covers, Berber rugs, French bedsheets..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full bg-transparent text-xs sm:text-sm text-[#1C1917] placeholder-[#8C827A] focus:outline-none"
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
                className="text-xs text-[#8C827A] hover:text-[#1C1917] p-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FDFBF7] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-5 border-b border-[#ECE5DA]">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] text-[#1C1917]">TASMODA</span>
                  <span className="block text-[8px] uppercase tracking-widest text-[#8C827A]">
                    Curtains, Rugs &amp; Bedding
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Account / Sign In Badge */}
              <div className="py-4 border-b border-[#ECE5DA]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full p-3 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA] flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-xs">
                      {user ? (user.fullName || user.email)[0].toUpperCase() : <User className="w-4 h-4 text-[#D7C7B2]" />}
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#1C1917] block">
                        {user ? user.fullName || 'Private Client' : 'Sign In / Register'}
                      </span>
                      <span className="text-[10px] text-[#8C827A] block">
                        {user ? user.email : 'Unlock custom curtain sizing'}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C827A]" />
                </button>
              </div>

              {/* Mobile Country & Currency Switcher Trigger */}
              <div className="py-4 border-b border-[#ECE5DA]">
                <label className="text-[10px] uppercase tracking-wider text-[#8C827A] block mb-2 font-semibold">
                  Destination &amp; Currency
                </label>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCountryModalOpen(true);
                  }}
                  className="w-full p-3 rounded-xl bg-white border border-[#ECE5DA] flex items-center justify-between text-xs font-semibold text-[#1C1917]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{currentCountryConfig.flag}</span>
                    <span>{currentCountryConfig.name}</span>
                  </div>
                  <span className="text-[#9E7D56]">{currentCurrencyConfig.symbol} {currency}</span>
                </button>
              </div>

              {/* Category Links */}
              <div className="mt-4 flex flex-col gap-1 text-sm uppercase tracking-wider font-medium text-[#1C1917]">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.category)}
                    className="text-left py-2.5 px-1 border-b border-[#F6F2EB] flex items-center justify-between group min-h-[44px]"
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
                  className="text-left py-3 px-1 text-[#9E7D56] font-semibold flex items-center justify-between min-h-[44px]"
                >
                  <span>Shop The Room (Lookbook)</span>
                  <ArrowRight className="w-4 h-4 text-[#9E7D56]" />
                </a>
              </div>
            </div>

            {/* Mobile Footer Note */}
            <div className="pt-6 border-t border-[#ECE5DA] text-center text-xs text-[#8C827A]">
              <span>Handcrafted Architectural Soft Furnishings</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
