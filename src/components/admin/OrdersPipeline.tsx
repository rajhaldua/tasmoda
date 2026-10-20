'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/types';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  MessageSquare,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';

export function OrdersPipeline() {
  const { orders, updateOrderStatus, formatPrice } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Dispatched':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
  };

  const getNextStatus = (current: Order['status']): Order['status'] | null => {
    if (current === 'Pending') return 'Processing';
    if (current === 'Processing') return 'Dispatched';
    if (current === 'Dispatched') return 'Delivered';
    return null;
  };

  const getWhatsAppLink = (order: Order) => {
    const text = encodeURIComponent(
      `Hello ${order.customerName},\n\nYour Tasmoda order #${order.orderNumber} is currently ${order.status.toUpperCase()}.\n\nItems: ${order.items
        .map((i) => `${i.quantity}x ${i.productName}`)
        .join(', ')}\nTotal: ${formatPrice(order.totalAmount)}\n\nThank you for welcoming Tasmoda into your space.`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">
            Orders & White-Glove Dispatch
          </h2>
          <p className="text-xs text-[#8C827A] mt-0.5">
            Monitor fulfillment pipeline, customer communication, and atelier invoices
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#ECE5DA] overflow-x-auto">
          {['All', 'Pending', 'Processing', 'Dispatched', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#57534E] hover:bg-[#F6F2EB]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#ECE5DA]">
            <Package className="w-8 h-8 text-[#9E7D56] mx-auto mb-2 opacity-60" />
            <p className="font-serif text-lg text-[#1C1917]">No orders in this pipeline stage.</p>
            <p className="text-xs text-[#8C827A] mt-1">Try selecting a different filter tab above.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.status);

            return (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#D0C5B4] transition-all"
              >
                {/* Left: Order Info & Items */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-lg font-semibold text-[#1C1917]">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-[#8C827A]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#F6F2EB] text-[#57534E]">
                      {order.paymentMethod}
                    </span>
                  </div>

                  {/* Customer info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#8C827A] block">Client:</span>
                      <span className="font-medium text-[#1C1917]">{order.customerName}</span>
                      <span className="block text-[#8C827A] text-[11px]">{order.customerEmail}</span>
                    </div>
                    <div>
                      <span className="text-[#8C827A] block">Delivery Destination:</span>
                      <span className="font-medium text-[#1C1917]">{order.address}</span>
                      <span className="block text-[#8C827A] text-[11px]">{order.city}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F6F2EB]">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#ECE5DA] text-xs"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-7 h-7 rounded-lg object-cover bg-stone-200"
                        />
                        <span className="font-medium text-[#1C1917]">
                          {item.quantity}× {item.productName}
                        </span>
                        {item.color && (
                          <span className="text-[10px] text-[#8C827A]">({item.color})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Actions & Totals */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#F6F2EB] shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C827A] block">
                      Total Value
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#1C1917]">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Invoice view button */}
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-2 rounded-xl bg-[#F6F2EB] hover:bg-[#EDE5D8] text-[#1C1917] text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="Generate Packing Slip"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#8C827A]" />
                      <span>Invoice</span>
                    </button>

                    {/* WhatsApp Ping Link */}
                    <a
                      href={getWhatsAppLink(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-1.5 border border-emerald-200 transition-colors"
                      title="Direct WhatsApp Notification to Client"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Notify</span>
                    </a>

                    {/* Advance Status Button */}
                    {nextStatus && (
                      <button
                        onClick={() => updateOrderStatus(order.id, nextStatus)}
                        className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>Mark as {nextStatus}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Luxury Packing Slip / Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden my-auto p-8 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-6 border-b border-[#ECE5DA]">
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] font-normal text-[#1C1917]">
                  TASMODA
                </span>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#8C827A]">
                  Milano Atelier Packing Slip
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-white border border-[#ECE5DA] text-xs font-medium flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-2 rounded-full hover:bg-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="py-6 space-y-6 text-xs">
              <div className="flex justify-between">
                <div>
                  <span className="text-[#8C827A] block">Order Reference:</span>
                  <span className="font-serif text-lg font-semibold text-[#1C1917]">
                    #{selectedInvoiceOrder.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#8C827A] block">Issue Date:</span>
                  <span className="font-medium text-[#1C1917]">
                    {new Date(selectedInvoiceOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ECE5DA]">
                <span className="text-[#8C827A] block text-[10px] uppercase tracking-wider mb-1">
                  Recipient
                </span>
                <p className="font-semibold text-[#1C1917]">{selectedInvoiceOrder.customerName}</p>
                <p className="text-stone-600">{selectedInvoiceOrder.address}</p>
                <p className="text-stone-600">{selectedInvoiceOrder.city}</p>
                <p className="text-stone-500 mt-1">{selectedInvoiceOrder.customerPhone}</p>
              </div>

              {/* Items Table */}
              <div className="border border-[#ECE5DA] rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left">
                  <thead className="bg-[#F6F2EB] text-[#8C827A] uppercase text-[10px]">
                    <tr>
                      <th className="p-3 font-semibold">Architectural Piece</th>
                      <th className="p-3 font-semibold text-center">Qty</th>
                      <th className="p-3 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F6F2EB]">
                    {selectedInvoiceOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-medium text-[#1C1917]">
                          {item.productName}
                          {item.color && (
                            <span className="block text-[10px] text-[#8C827A]">
                              Finish: {item.color}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center text-[#57534E]">{item.quantity}</td>
                        <td className="p-3 text-right font-serif font-semibold text-[#1C1917]">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center text-sm font-semibold pt-2 border-t border-[#ECE5DA]">
                <span>Total Paid ({selectedInvoiceOrder.paymentMethod})</span>
                <span className="font-serif text-lg">{formatPrice(selectedInvoiceOrder.totalAmount)}</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#8C827A] pt-4 border-t border-[#ECE5DA]">
              Handcrafted in small batches. 10-Year Structural Guarantee applies to original purchaser.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
