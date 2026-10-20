'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface RazorpayButtonProps {
  buttonId?: string;
  className?: string;
}

export function RazorpayButton({
  buttonId = 'pl_TgPcN7ialmNe50',
  className = '',
}: RazorpayButtonProps) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = formRef.current;
    if (!currentContainer) return;

    // Clear previous children
    currentContainer.innerHTML = '';

    // Create form and script elements
    const form = document.createElement('form');
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', buttonId);
    script.async = true;

    form.appendChild(script);
    currentContainer.appendChild(form);

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [buttonId]);

  return (
    <div className={`w-full flex flex-col items-center gap-2 ${className}`}>
      {/* Razorpay Form Container */}
      <div
        ref={formRef}
        className="w-full flex justify-center razorpay-button-container min-h-[48px]"
      />

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C827A] pt-1">
        <Lock className="w-3 h-3 text-[#9E7D56]" />
        <span>Secured by Razorpay • UPI, Cards, NetBanking, EMI</span>
      </div>
    </div>
  );
}
