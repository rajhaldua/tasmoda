'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
}

export function ProductGrid({
  selectedCategory,
  onSelectCategory,
  searchQuery,
}: ProductGridProps) {
  const { products } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    'All',
    'Curtains & Drapes',
    'Pillow Covers',
    'Rugs & Runners',
    'Bedsheets & Bedding',
  ];

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured: best sellers and new arrivals first
      result.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Filter Bar */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9E7D56] font-medium block mb-2">
              The Textile Catalog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] tracking-tight">
              Curtains, Cushions, Rugs &amp; Bedding
            </h2>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-[#8C827A] uppercase tracking-wider flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#ECE5DA] text-xs font-medium text-[#1C1917] rounded-full px-3.5 py-2 focus:outline-none focus:border-[#9E7D56]"
            >
              <option value="featured">Curated &amp; Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white hover:bg-[#F6F2EB] text-[#57534E] border border-[#ECE5DA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active search banner if filtering */}
        {searchQuery && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F6F2EB] text-xs text-[#57534E]">
            <span>
              Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo;
            </span>
            <span className="text-[#8C827A] font-medium">{filteredProducts.length} items found</span>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#ECE5DA] p-8">
          <p className="font-serif text-xl text-[#1C1917]">No textiles found matching your criteria.</p>
          <p className="text-sm text-[#8C827A] mt-2">Try clearing your filters or search keywords.</p>
          <button
            onClick={() => {
              onSelectCategory('All');
            }}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
