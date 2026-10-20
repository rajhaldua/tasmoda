'use client';

import React, { useState } from 'react';
import { Header } from '@/components/store/Header';
import { Hero } from '@/components/store/Hero';
import { LookbookSection } from '@/components/store/LookbookSection';
import { ProductGrid } from '@/components/store/ProductGrid';
import { BrandEthos } from '@/components/store/BrandEthos';
import { Footer } from '@/components/store/Footer';
import { ProductDetailModal } from '@/components/store/ProductDetailModal';
import { CartDrawer } from '@/components/store/CartDrawer';
import { ToastContainer } from '@/components/ui/ToastContainer';

export default function StorefrontPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Toast Feedback */}
      <ToastContainer />

      {/* Main Navigation */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCollection();
        }}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToCollection();
        }}
      />

      {/* Hero Section */}
      <Hero onExploreClick={scrollToCollection} />

      {/* Interactive Lookbook: "Shop The Room" */}
      <LookbookSection />

      {/* Product Catalog Grid */}
      <ProductGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
      />

      {/* Brand Craftsmanship & Values */}
      <BrandEthos />

      {/* Footer & Newsletter */}
      <Footer />

      {/* Quick View / Product Detail Modal */}
      <ProductDetailModal />

      {/* Dynamic Slide-Over Bag */}
      <CartDrawer />
    </div>
  );
}
