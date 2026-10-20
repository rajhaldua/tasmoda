'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct, formatPrice } = useStore();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];
  const selectedColor = product.colors[selectedColorIndex];

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl p-3 sm:p-4 border border-[#ECE5DA] transition-all duration-300 hover:shadow-xl hover:border-[#D9CFBF]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F2EB] mb-4">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1C1917] text-[#FAF8F5] shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#9E7D56] text-white shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlay (Always visible on mobile touch, hover on desktop) */}
        <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 flex items-center gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => addToCart(product, 1, selectedColor?.name)}
            className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#1C1917]/90 hover:bg-[#1C1917] backdrop-blur-xs text-white text-[11px] sm:text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors shadow-lg min-h-[38px]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-2 sm:p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#1C1917] transition-colors shadow-lg min-w-[38px] min-h-[38px] flex items-center justify-center"
            title="Quick view specifications"
            aria-label="Quick view specifications"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#8C827A] mb-1">
            <span className="uppercase tracking-widest text-[10px] font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#9E7D56] text-[#9E7D56]" />
              <span className="font-semibold text-[#1C1917]">{product.rating}</span>
              <span className="text-[10px] text-[#A8A29E]">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-lg font-normal text-[#1C1917] group-hover:text-[#9E7D56] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B655F] font-light mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Color Swatches and Dimensions */}
        <div className="mt-4 pt-3 border-t border-[#F6F2EB] flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'border-[#1C1917] scale-125 shadow-xs'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>

          {/* Price with Dynamic Currency Formatting */}
          <div className="text-right">
            {product.compareAtPriceUSD && (
              <span className="text-xs text-[#A8A29E] line-through mr-1.5">
                {formatPrice(product.compareAtPriceUSD)}
              </span>
            )}
            <span className="font-serif text-base font-semibold text-[#1C1917]">
              {formatPrice(product.priceUSD)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
