'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';

export function AdminOverview() {
  const { analytics, orders, products, formatPrice, updateOrderStatus, currency } = useStore();

  const lowStockProducts = products.filter((p) => p.stockCount <= 10);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-2 font-medium">
            <span>Gross Revenue ({currency})</span>
            <span className="p-2 rounded-xl bg-[#F6F2EB] text-[#1C1917]">
              <DollarSign className="w-4 h-4 text-[#9E7D56]" />
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl font-semibold text-[#1C1917]">
              {formatPrice(analytics.grossRevenueUSD)}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +{analytics.revenueGrowth}%
            </span>
          </div>
          <p className="text-[11px] text-[#A8A29E] mt-2 font-light">Razorpay &amp; Global Express Pay</p>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-2 font-medium">
            <span>Total Orders</span>
            <span className="p-2 rounded-xl bg-[#F6F2EB] text-[#1C1917]">
              <ShoppingBag className="w-4 h-4 text-[#9E7D56]" />
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl font-semibold text-[#1C1917]">
              {analytics.totalOrders + orders.length - 3}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +{analytics.orderGrowth}%
            </span>
          </div>
          <p className="text-[11px] text-[#A8A29E] mt-2 font-light">Curtains, Rugs &amp; Bedding sets</p>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-2 font-medium">
            <span>Average Order Value</span>
            <span className="p-2 rounded-xl bg-[#F6F2EB] text-[#1C1917]">
              <TrendingUp className="w-4 h-4 text-[#9E7D56]" />
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl font-semibold text-[#1C1917]">
              {formatPrice(analytics.averageOrderValueUSD)}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">+6.4%</span>
          </div>
          <p className="text-[11px] text-[#A8A29E] mt-2 font-light">Driven by Room Lookbook Bundles</p>
        </div>

        {/* Store Conversion Rate */}
        <div className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#8C827A] mb-2 font-medium">
            <span>Store Conversion</span>
            <span className="p-2 rounded-xl bg-[#F6F2EB] text-[#1C1917]">
              <Users className="w-4 h-4 text-[#9E7D56]" />
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-3xl font-semibold text-[#1C1917]">
              {analytics.conversionRate}%
            </span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Top 3%
            </span>
          </div>
          <p className="text-[11px] text-[#A8A29E] mt-2 font-light">Fast Razorpay checkout reduces bounce</p>
        </div>

      </div>

      {/* Revenue Trajectory & Low Stock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Revenue Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-normal text-[#1C1917]">Revenue Trajectory ({currency})</h3>
              <p className="text-xs text-[#8C827A] mt-0.5 font-light">Monthly textile sales volume</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#F6F2EB] font-medium text-[#1C1917]">
              2026 YTD
            </span>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
            {analytics.monthlyRevenueUSD.map((item, idx) => {
              const maxVal = 30000;
              const heightPercent = Math.round((item.amount / maxVal) * 100);
              const isCurrent = idx === analytics.monthlyRevenueUSD.length - 1;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-semibold text-[#8C827A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatPrice(item.amount)}
                  </div>
                  <div className="w-full bg-[#F6F2EB] rounded-t-xl h-36 relative overflow-hidden flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${
                        isCurrent ? 'bg-[#9E7D56]' : 'bg-[#1C1917]/70 group-hover:bg-[#1C1917]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isCurrent ? 'font-bold text-[#9E7D56]' : 'text-[#8C827A]'}`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alerts & Fast Replenishment (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="font-serif text-lg font-normal text-[#1C1917]">Low Stock Alerts</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                {lowStockProducts.length} Needs Attention
              </span>
            </div>

            <p className="text-xs text-[#8C827A] font-light mb-4">
              Hand-loomed rug rolls and Belgian linen bolts nearing workshop batch limit.
            </p>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA] flex items-center justify-between gap-3"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#1C1917] truncate">{prod.name}</h4>
                    <span className="text-[11px] text-[#8C827A] block">{prod.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-700 block">
                      {prod.stockCount} rolls left
                    </span>
                    <span className="text-[10px] text-[#8C827A]">Reserve low</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ECE5DA] flex items-center justify-between text-xs">
            <span className="text-[#8C827A]">Normandy Mill ETA: 3 business days</span>
            <span className="text-[#9E7D56] font-semibold cursor-pointer hover:underline">
              Manage Batches →
            </span>
          </div>
        </div>

      </div>

      {/* Recent Orders Snapshot */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#1C1917]">Recent Razorpay Orders</h3>
            <p className="text-xs text-[#8C827A] mt-0.5 font-light">
              Real-time payment gateway transactions and customer dispatch queue
            </p>
          </div>
          <span className="text-xs text-[#8C827A]">Showing latest {orders.slice(0, 4).length} orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ECE5DA] text-[#8C827A] uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Order</th>
                <th className="pb-3 font-semibold">Client</th>
                <th className="pb-3 font-semibold">Textile Items</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Gateway</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F2EB]">
              {orders.slice(0, 4).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 font-semibold text-[#1C1917]">{order.orderNumber}</td>
                  <td className="py-4">
                    <span className="font-medium text-[#1C1917] block">{order.customerName}</span>
                    <span className="text-[10px] text-[#8C827A] block">{order.city}</span>
                  </td>
                  <td className="py-4 text-[#57534E]">
                    {order.items.map((i) => i.productName).join(', ')}
                  </td>
                  <td className="py-4 font-serif font-semibold text-sm text-[#1C1917]">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[10px] font-semibold">
                      <CreditCard className="w-3 h-3 text-blue-600" />
                      <span>{order.paymentMethod}</span>
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : order.status === 'Dispatched'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : order.status === 'Processing'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {order.status === 'Processing' ? (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Dispatched')}
                        className="px-3 py-1.5 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-[11px] font-medium"
                      >
                        Dispatch
                      </button>
                    ) : order.status === 'Pending' ? (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Processing')}
                        className="px-3 py-1.5 rounded-full bg-[#9E7D56] hover:bg-[#876742] text-white text-[11px] font-medium"
                      >
                        Process
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#8C827A] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fulfilled</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
