'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, ShoppingBag, Star, Ruler, ShieldCheck, Truck } from 'lucide-react';

export function ProductDetailModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'care'>('details');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const selectedColor = product.colors[selectedColorIndex];

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedImageIndex(0);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor?.name);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FDFBF7] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#1C1917] transition-all shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-4 sm:p-6 bg-[#F6F2EB] flex flex-col justify-between">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm border border-[#ECE5DA]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/70 text-white backdrop-blur-md">
                {product.category}
              </span>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#1C1917] scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Purchasing */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#8C827A] mb-2">
                <span className="uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#9E7D56] text-[#9E7D56]" />
                  <span className="font-semibold text-[#1C1917]">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#57534E] font-light mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  {formatPrice(product.priceUSD)}
                </span>
                {product.compareAtPriceUSD && (
                  <span className="text-sm text-[#A8A29E] line-through">
                    {formatPrice(product.compareAtPriceUSD)}
                  </span>
                )}
                {product.inStock && (
                  <span className="ml-auto text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    In Stock ({product.stockCount} left)
                  </span>
                )}
              </div>

              {/* Material & Finish Selection */}
              <div className="mt-6 pt-5 border-t border-[#ECE5DA]">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="uppercase tracking-wider font-medium text-[#1C1917]">
                    Fabric Shade / Color:
                  </span>
                  <span className="text-[#8C827A]">{selectedColor?.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#1C1917] bg-white font-semibold shadow-xs'
                          : 'border-[#ECE5DA] hover:border-[#D0C5B4] text-[#57534E]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion Tabs for Dimensions & Care */}
              <div className="mt-6 pt-5 border-t border-[#ECE5DA]">
                <div className="flex gap-4 border-b border-[#ECE5DA] text-xs uppercase tracking-wider font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'details'
                        ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9E7D56]'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Textile Weave
                  </button>
                  <button
                    onClick={() => setActiveTab('dimensions')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'dimensions'
                        ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9E7D56]'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Size Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'care'
                        ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9E7D56]'
                        : 'text-[#8C827A]'
                    }`}
                  >
                    Wash &amp; Care
                  </button>
                </div>

                <div className="py-3 text-xs text-[#57534E]">
                  {activeTab === 'details' && (
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2.5 py-1 rounded-md bg-[#F6F2EB] text-[#1C1917] font-medium"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  )}

                  {activeTab === 'dimensions' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-[#F6F2EB]">
                        <span className="text-[10px] text-[#8C827A] uppercase block">Width × Length/Drop</span>
                        <span className="font-semibold text-[#1C1917]">
                          {product.dimensions.width} cm × {product.dimensions.height} cm
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F6F2EB]">
                        <span className="text-[10px] text-[#8C827A] uppercase block">Textile Weight</span>
                        <span className="font-semibold text-[#1C1917]">{product.dimensions.weight} kg</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <p className="font-light leading-relaxed">{product.careGuide}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-5 border-t border-[#ECE5DA]">
              <div className="flex items-center gap-3">
                {/* Quantity picker */}
                <div className="flex items-center border border-[#ECE5DA] rounded-full px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-500 hover:text-stone-900 px-1 font-bold text-sm"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-500 hover:text-stone-900 px-1 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {formatPrice(product.priceUSD * quantity)}</span>
                </button>
              </div>

              {/* Delivery perks */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#8C827A]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#9E7D56]" />
                  <span>Complimentary Pan-India &amp; Global Shipping</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D56]" />
                  <span>Razorpay Protected</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
