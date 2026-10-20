'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, ProductCategory } from '@/types';
import { Plus, Search, Edit2, Trash2, X, Check, Image as ImageIcon } from 'lucide-react';

export function ProductStudio() {
  const { products, addProduct, updateProduct, deleteProduct, formatPrice, currency } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Curtains & Drapes');
  const [formPriceUSD, setFormPriceUSD] = useState(120);
  const [formCompareAtUSD, setFormCompareAtUSD] = useState<number | undefined>(undefined);
  const [formImage, setFormImage] = useState('');
  const [formMaterials, setFormMaterials] = useState('100% Belgian Flax Linen, Cotton Lining');
  const [formDescription, setFormDescription] = useState('');
  const [formCare, setFormCare] = useState('');
  const [formWidth, setFormWidth] = useState(130);
  const [formHeight, setFormHeight] = useState(260);
  const [formWeight, setFormWeight] = useState(2.5);
  const [formStock, setFormStock] = useState(15);
  const [formInStock, setFormInStock] = useState(true);

  const openCreateModal = () => {
    setFormName('');
    setFormTagline('');
    setFormCategory('Curtains & Drapes');
    setFormPriceUSD(150);
    setFormCompareAtUSD(undefined);
    setFormImage('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85');
    setFormMaterials('Heavy European Flax Linen, Hand-finished Hems');
    setFormDescription('Artisanal drapery with continuous fluid folds, tailored for architectural windows.');
    setFormCare('Dry clean or gentle cold cycle. Steam to release natural linen wrinkles.');
    setFormWidth(140);
    setFormHeight(260);
    setFormWeight(2.8);
    setFormStock(20);
    setFormInStock(true);
    setEditingProduct(null);
    setIsCreating(true);
  };

  const openEditModal = (p: Product) => {
    setFormName(p.name);
    setFormTagline(p.tagline);
    setFormCategory(p.category);
    setFormPriceUSD(p.priceUSD);
    setFormCompareAtUSD(p.compareAtPriceUSD);
    setFormImage(p.images[0] || '');
    setFormMaterials(p.materials.join(', '));
    setFormDescription(p.description);
    setFormCare(p.careGuide);
    setFormWidth(p.dimensions.width);
    setFormHeight(p.dimensions.height);
    setFormWeight(p.dimensions.weight);
    setFormStock(p.stockCount);
    setFormInStock(p.inStock);
    setEditingProduct(p);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const materialsArray = formMaterials.split(',').map((s) => s.trim()).filter(Boolean);

    if (isCreating) {
      addProduct({
        name: formName,
        tagline: formTagline,
        category: formCategory,
        priceUSD: Number(formPriceUSD),
        compareAtPriceUSD: formCompareAtUSD ? Number(formCompareAtUSD) : undefined,
        rating: 5.0,
        reviewCount: 1,
        images: [formImage],
        materials: materialsArray,
        dimensions: {
          width: Number(formWidth),
          height: Number(formHeight),
          weight: Number(formWeight),
        },
        colors: [
          { name: 'Natural Oatmeal', hex: '#E6DFD5' },
          { name: 'Sand Khaki', hex: '#D7C7B2' },
          { name: 'Charcoal Umber', hex: '#262422' },
        ],
        inStock: formInStock,
        stockCount: Number(formStock),
        description: formDescription,
        careGuide: formCare,
        isNewArrival: true,
      });
      setIsCreating(false);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        tagline: formTagline,
        category: formCategory,
        priceUSD: Number(formPriceUSD),
        compareAtPriceUSD: formCompareAtUSD ? Number(formCompareAtUSD) : undefined,
        images: [formImage, ...editingProduct.images.slice(1)],
        materials: materialsArray,
        dimensions: {
          width: Number(formWidth),
          height: Number(formHeight),
          weight: Number(formWeight),
        },
        inStock: formInStock,
        stockCount: Number(formStock),
        description: formDescription,
        careGuide: formCare,
      });
      setEditingProduct(null);
    }
  };

  const categories = [
    'All',
    'Curtains & Drapes',
    'Pillow Covers',
    'Rugs & Runners',
    'Bedsheets & Bedding',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">Textile Product Studio</h2>
          <p className="text-xs text-[#8C827A] mt-0.5">
            Manage curtains, pillow covers, rugs, and bedsheets with instant storefront sync
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4 text-[#9E7D56]" />
          <span>New Textile Piece</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#ECE5DA]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search curtains, cushions, rugs, bedsheets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F6F2EB] border border-[#ECE5DA] rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#9E7D56]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-[#F6F2EB] text-[#57534E] hover:bg-[#EDE5D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#ECE5DA] text-[#8C827A] uppercase tracking-wider text-[10px]">
              <th className="pb-3 font-semibold">Textile Piece</th>
              <th className="pb-3 font-semibold">Category</th>
              <th className="pb-3 font-semibold">Price ({currency})</th>
              <th className="pb-3 font-semibold">Dimensions</th>
              <th className="pb-3 font-semibold">Inventory</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F2EB]">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-[#1C1917]">{p.name}</h4>
                      <p className="text-[11px] text-[#8C827A] line-clamp-1 max-w-xs">{p.tagline}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#F6F2EB] text-[#57534E] font-medium text-[11px]">
                    {p.category}
                  </span>
                </td>
                <td className="py-3.5 font-serif font-semibold text-sm text-[#1C1917]">
                  {formatPrice(p.priceUSD)}
                  {p.compareAtPriceUSD && (
                    <span className="block text-[10px] text-[#A8A29E] line-through font-sans">
                      {formatPrice(p.compareAtPriceUSD)}
                    </span>
                  )}
                </td>
                <td className="py-3.5 text-[#57534E]">
                  {p.dimensions.width} × {p.dimensions.height} cm
                  <span className="block text-[10px] text-[#8C827A]">{p.dimensions.weight} kg</span>
                </td>
                <td className="py-3.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      p.stockCount <= 10
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {p.stockCount} in stock
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 rounded-lg bg-[#F6F2EB] hover:bg-[#EDE5D8] text-[#1C1917] transition-colors"
                      title="Edit Piece"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove "${p.name}" from catalog?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                      title="Delete Piece"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Editor Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#ECE5DA] overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-[#ECE5DA] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#1C1917]">
                  {isCreating ? 'Create Soft Furnishing Piece' : `Edit: ${editingProduct?.name}`}
                </h3>
                <p className="text-xs text-[#8C827A] mt-0.5">Instant live update to storefront catalog &amp; lookbooks</p>
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="p-2 rounded-full hover:bg-[#F6F2EB] text-[#57534E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Textile Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  >
                    <option value="Curtains & Drapes">Curtains &amp; Drapes</option>
                    <option value="Pillow Covers">Pillow Covers</option>
                    <option value="Rugs & Runners">Rugs &amp; Runners</option>
                    <option value="Bedsheets & Bedding">Bedsheets &amp; Bedding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Editorial Tagline
                </label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Base Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={formPriceUSD}
                    onChange={(e) => setFormPriceUSD(Number(e.target.value))}
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Compare-At (USD)
                  </label>
                  <input
                    type="number"
                    value={formCompareAtUSD || ''}
                    placeholder="Optional"
                    onChange={(e) => setFormCompareAtUSD(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  />
                </div>
              </div>

              {/* Image URL with preview */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  High-Resolution Image URL
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                  />
                  {formImage && (
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-[#ECE5DA] shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Dimensions Grid */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Textile Dimensions (cm &amp; kg)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Width (cm)</span>
                    <input
                      type="number"
                      value={formWidth}
                      onChange={(e) => setFormWidth(Number(e.target.value))}
                      className="w-full bg-white border border-[#ECE5DA] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Length / Drop (cm)</span>
                    <input
                      type="number"
                      value={formHeight}
                      onChange={(e) => setFormHeight(Number(e.target.value))}
                      className="w-full bg-white border border-[#ECE5DA] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Weight (kg)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={formWeight}
                      onChange={(e) => setFormWeight(Number(e.target.value))}
                      className="w-full bg-white border border-[#ECE5DA] rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Fabric Weave &amp; Material (comma-separated)
                </label>
                <input
                  type="text"
                  value={formMaterials}
                  onChange={(e) => setFormMaterials(e.target.value)}
                  className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Artisanal Story &amp; Details
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7D56]"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="pt-4 border-t border-[#ECE5DA] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#57534E] hover:bg-[#F6F2EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  {isCreating ? 'Publish Piece' : 'Save Modifications'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
