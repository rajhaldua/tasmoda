'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { LookbookPin, Product } from '@/types';
import { Plus, X, ShoppingBag, Eye, Sparkles } from 'lucide-react';

export function LookbookSection() {
  const { lookbooks, products, addToCart, setQuickViewProduct, formatPrice } = useStore();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activePin, setActivePin] = useState<LookbookPin | null>(null);

  const currentScene = lookbooks[activeSceneIndex] || lookbooks[0];

  if (!currentScene) return null;

  const getProductForPin = (productId: string): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  return (
    <section id="lookbook" className="py-20 bg-[#F6F2EB] border-y border-[#ECE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9E7D56] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Spatial Merchandising</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
              Shop The Room
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#57534E] font-light max-w-xl">
              Tap the glowing pins on our curated architectural spaces to explore materials and add pieces directly to your bag.
            </p>
          </div>

          {/* Scene selector tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#EAE3D6] border border-[#DDD3C2] self-start md:self-auto">
            {lookbooks.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActivePin(null);
                }}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  activeSceneIndex === idx
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {scene.roomType}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Lookbook Canvas with Hotspots */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ECE5DA] bg-[#E8E1D5] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10]">
          <img
            src={currentScene.image}
            alt={currentScene.title}
            className="w-full h-full object-cover object-center select-none"
          />

          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Scene Info Tag (top left) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2.5 rounded-2xl glass-dark text-white max-w-xs pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-[#D7C7B2] block">Lookbook Concept</span>
            <p className="font-serif text-sm sm:text-base font-normal mt-0.5">{currentScene.title}</p>
            <p className="text-xs text-stone-300 font-light hidden sm:block">{currentScene.subtitle}</p>
          </div>

          {/* Hotspot Pins */}
          {currentScene.pins.map((pin) => {
            const product = getProductForPin(pin.productId);
            const isSelected = activePin?.id === pin.id;

            return (
              <div
                key={pin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                {/* Ping animation effect */}
                <span className="absolute -inset-2 rounded-full bg-[#9E7D56]/50 animate-ping-slow pointer-events-none" />

                {/* Pin button */}
                <button
                  onClick={() => setActivePin(isSelected ? null : pin)}
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 ${
                    isSelected
                      ? 'bg-[#1C1917] text-white ring-4 ring-white/60'
                      : 'bg-white text-[#1C1917] hover:bg-[#FAF8F5] ring-2 ring-black/10'
                  }`}
                  aria-label={`Hotspot for ${pin.label}`}
                >
                  <Plus className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'rotate-45' : ''}`} />
                </button>

                {/* Hotspot Product Card Popover (Desktop / Tablet) */}
                {isSelected && product && (
                  <div
                    className="hidden sm:block absolute z-30 bottom-12 left-1/2 -translate-x-1/2 w-72 p-4 rounded-2xl glass-dark text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setActivePin(null)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex gap-3 items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-800 shrink-0 border border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#D7C7B2] block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-normal truncate mt-0.5">{product.name}</h4>
                        <p className="text-sm font-semibold text-white mt-1">{formatPrice(product.priceUSD)}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          setActivePin(null);
                        }}
                        className="flex-1 py-2 px-3 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        onClick={() => {
                          setQuickViewProduct(product);
                          setActivePin(null);
                        }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile Docked Pin Card (docked at bottom of lookbook on mobile, no clipping) */}
          {activePin && (() => {
            const product = getProductForPin(activePin.productId);
            if (!product) return null;
            return (
              <div
                className="sm:hidden absolute inset-x-3 bottom-3 z-30 p-3.5 rounded-2xl glass-dark text-white shadow-2xl animate-in slide-in-from-bottom-2 duration-200 border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#D7C7B2]">
                    Selected Pin: {activePin.label}
                  </span>
                  <button
                    onClick={() => setActivePin(null)}
                    className="p-1 rounded-full text-stone-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-stone-800 shrink-0 border border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#D7C7B2] block">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-normal truncate mt-0.5">{product.name}</h4>
                    <p className="text-sm font-semibold text-white">{formatPrice(product.priceUSD)}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(product);
                      setActivePin(null);
                    }}
                    className="flex-1 py-2 px-3 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewProduct(product);
                      setActivePin(null);
                    }}
                    className="p-2 rounded-full bg-white/15 text-white"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8C827A]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D56]" />
            <span>Click any pin to inspect materials, dimensions, or add directly to bag</span>
          </div>
          <span className="font-medium text-[#1C1917]">
            Showing {currentScene.pins.length} curated objects in {currentScene.roomType}
          </span>
        </div>

      </div>
    </section>
  );
}
