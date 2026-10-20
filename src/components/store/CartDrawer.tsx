'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { RazorpayButton } from './RazorpayButton';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, Check, Sparkles, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotalUSD,
    clearCart,
    createOrder,
    formatPrice,
    convertPrice,
    currency,
    razorpayButtonId,
    showToast,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isSimulatingOrder, setIsSimulatingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_USD = 100;
  const isFreeShipping = cartTotalUSD >= FREE_SHIPPING_THRESHOLD_USD;
  const freeShippingProgress = Math.min(100, (cartTotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - cartTotalUSD);

  const discountAmountUSD = (cartTotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, cartTotalUSD - discountAmountUSD);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TASMODA10') {
      setDiscountPercent(10);
      showToast('Promo code applied: 10% Textile Welcome Discount!');
    } else {
      showToast('Invalid code. Try TASMODA10', 'warning');
    }
  };

  const handleSimulatedCheckout = () => {
    if (cart.length === 0) return;

    setIsSimulatingOrder(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: 'Aarav Patel',
        customerEmail: 'aarav.patel@designstudio.in',
        customerPhone: '+91 98200 12345',
        address: 'Villa 12, Gulmohar Enclave, Worli',
        city: 'Mumbai, MH',
        status: 'Processing',
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.priceUSD,
          quantity: item.quantity,
          image: item.product.images[0],
          color: item.selectedColor,
        })),
        totalAmount: finalTotalUSD,
        currency,
        paymentMethod: 'Razorpay',
      });

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9E7D56', '#1C1917', '#EFE9DF'],
        });
      } catch {}

      setIsSimulatingOrder(false);
      setOrderSuccess(order.orderNumber);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col justify-between border-l border-[#ECE5DA]">
          
          {/* Top Header */}
          <div className="p-4 sm:p-6 border-b border-[#ECE5DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl tracking-tight font-normal text-[#1C1917]">Your Textile Bag</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F6F2EB] font-semibold text-[#8C827A]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F6F2EB] rounded-full transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F6F2EB] border-b border-[#ECE5DA]">
            <div className="flex items-center justify-between text-xs text-[#57534E] mb-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#9E7D56]" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-semibold">Complimentary delivery unlocked!</span>
                ) : (
                  <span>Add {formatPrice(amountToFreeShipping)} for free shipping</span>
                )}
              </span>
              <span className="text-[10px] text-[#8C827A]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#9E7D56] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {orderSuccess ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1917]">Order Placed via Razorpay</h3>
                <p className="text-xs uppercase tracking-widest text-[#9E7D56] font-semibold mt-1">
                  #{orderSuccess}
                </p>
                <p className="text-xs text-[#57534E] mt-3 max-w-xs leading-relaxed font-light">
                  Thank you for your order. Our master weavers and tailors are preparing your shipment. Track your fulfillment in the <strong>Admin Studio</strong>!
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCartOpen(false);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F6F2EB] flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-[#9E7D56]" />
                </div>
                <p className="font-serif text-xl text-[#1C1917]">Your textile bag is empty.</p>
                <p className="text-xs text-[#8C827A] mt-1 max-w-xs">
                  Browse our Belgian linen curtains, bouclé cushions, Berber rugs, and washed bedding.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-medium"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#ECE5DA] shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-normal text-[#1C1917] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-stone-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <p className="text-[11px] text-[#8C827A] mt-0.5">Color: {item.selectedColor}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#ECE5DA] rounded-full px-2 py-0.5 bg-[#FDFBF7]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                          }
                          className="text-stone-500 hover:text-black px-1 text-xs"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                          }
                          className="text-stone-500 hover:text-black px-1 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#1C1917]">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section with Razorpay */}
          {!orderSuccess && cart.length > 0 && (
            <div className="p-6 border-t border-[#ECE5DA] bg-[#FAF8F5] space-y-4">
              
              {/* Promo code field */}
              <form onSubmit={applyPromoCode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (try TASMODA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-[#ECE5DA] rounded-full px-3.5 py-2 text-xs uppercase focus:outline-none focus:border-[#9E7D56]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#F6F2EB] hover:bg-[#EFE9DF] text-[#1C1917] text-xs font-semibold uppercase tracking-wider border border-[#ECE5DA]"
                >
                  Apply
                </button>
              </form>

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-[#57534E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotalUSD)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span>−{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'Complimentary' : formatPrice(15)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-2 border-t border-[#ECE5DA]">
                  <span>Total Amount ({currency})</span>
                  <span className="font-serif text-lg">{formatPrice(finalTotalUSD)}</span>
                </div>
              </div>

              {/* OFFICIAL RAZORPAY PAYMENT BUTTON */}
              <div className="pt-2 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C827A] mb-2">
                  Official Razorpay Payment Gateway
                </span>
                
                {/* Embedded Razorpay Button */}
                <RazorpayButton buttonId={razorpayButtonId} />

                {/* Instant Order Generator for Testing/Dev */}
                <button
                  onClick={handleSimulatedCheckout}
                  disabled={isSimulatingOrder}
                  className="w-full mt-2.5 py-3 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  {isSimulatingOrder ? (
                    <span>Securing Razorpay Order...</span>
                  ) : (
                    <>
                      <span>Fast Checkout &amp; Sync Order</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E7D56]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C827A] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D56]" />
                <span>UPI • Cards • NetBanking • EMI Protected</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
