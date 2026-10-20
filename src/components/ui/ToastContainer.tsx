'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-full shadow-xl text-sm font-medium transition-all duration-300 transform translate-y-0 opacity-100 bg-[#1C1917] text-[#FAF8F5] border border-stone-800"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#D7C7B2] shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#9E7D56] shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
