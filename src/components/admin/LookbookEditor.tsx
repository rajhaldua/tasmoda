'use client';

import React, { useState, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { LookbookPin, Product } from '@/types';
import { Plus, Trash2, Eye, Compass, Sparkles, Image as ImageIcon, MapPin } from 'lucide-react';

export function LookbookEditor() {
  const { lookbooks, products, addPin, removePin, updateLookbookImage, formatPrice } = useStore();
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);
  const [selectedProductForPin, setSelectedProductForPin] = useState<string>('');
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentScene = lookbooks[selectedSceneIndex] || lookbooks[0];

  if (!currentScene) return null;

  // Handle click on canvas image to place pin
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setPendingCoords({ x, y });
    setSelectedProductForPin(products[0]?.id || '');
    setIsAddingPin(true);
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingCoords || !selectedProductForPin) return;

    const product = products.find((p) => p.id === selectedProductForPin);
    if (!product) return;

    addPin(currentScene.id, {
      productId: product.id,
      x: pendingCoords.x,
      y: pendingCoords.y,
      label: `${product.name} • ${formatPrice(product.priceUSD)}`,
    });

    setIsAddingPin(false);
    setPendingCoords(null);
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      updateLookbookImage(currentScene.id, newImageUrl.trim());
      setIsEditingImage(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9E7D56] font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Spatial Merchandiser</span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#1C1917]">Lookbook Pin Studio</h2>
          <p className="text-xs text-[#8C827A] mt-0.5">
            Click directly on any interior photo to map interactive product hotspots for your storefront.
          </p>
        </div>

        {/* Scene Tabs */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-[#ECE5DA]">
          {lookbooks.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setSelectedSceneIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedSceneIndex === idx
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {scene.roomType}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E7D56]" />
              <span>Click anywhere on the room image below to place a new hotspot</span>
            </span>
            <button
              onClick={() => {
                setNewImageUrl(currentScene.image);
                setIsEditingImage(!isEditingImage);
              }}
              className="text-[#9E7D56] font-medium hover:underline flex items-center gap-1"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Change Room Backdrop</span>
            </button>
          </div>

          {/* Change Image Bar if toggled */}
          {isEditingImage && (
            <form onSubmit={handleUpdateImage} className="flex gap-2 p-3 bg-white rounded-2xl border border-[#ECE5DA]">
              <input
                type="url"
                placeholder="Paste high-res room image URL..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-[#F6F2EB] border border-[#ECE5DA] rounded-xl px-3.5 py-2 text-xs text-[#1C1917]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold"
              >
                Update Backdrop
              </button>
            </form>
          )}

          {/* Canvas */}
          <div
            ref={imageContainerRef}
            onClick={handleCanvasClick}
            className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-dashed border-[#D9CFBF] bg-[#E8E1D5] aspect-[16/10] cursor-crosshair group"
            title="Click to place product pin"
          >
            <img
              src={currentScene.image}
              alt={currentScene.title}
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Existing Pins */}
            {currentScene.pins.map((pin) => {
              const product = products.find((p) => p.id === pin.productId);
              return (
                <div
                  key={pin.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative group/pin">
                    <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-black/10">
                      <Plus className="w-3.5 h-3.5 rotate-45 text-[#9E7D56]" />
                    </button>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#1C1917] text-white text-[11px] shadow-xl pointer-events-none opacity-0 group-hover/pin:opacity-100 transition-opacity">
                      <span>{product?.name || pin.label}</span>
                      <span className="block text-[9px] text-[#D7C7B2]">
                        ({pin.x}%, {pin.y}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pending pin indicator if clicked */}
            {pendingCoords && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                style={{ left: `${pendingCoords.x}%`, top: `${pendingCoords.y}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#9E7D56] text-white flex items-center justify-center animate-bounce shadow-2xl border-2 border-white">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pin Manager List & Add Form (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#ECE5DA] shadow-xs space-y-6">
          <div>
            <h3 className="font-serif text-lg font-normal text-[#1C1917]">
              Mapped Pins ({currentScene.pins.length})
            </h3>
            <p className="text-xs text-[#8C827A] mt-0.5 font-light">
              Active hotspots on {currentScene.roomType}
            </p>
          </div>

          {/* Add Pin Form if Coords selected */}
          {isAddingPin && pendingCoords ? (
            <form onSubmit={handleConfirmPin} className="p-4 rounded-2xl bg-[#F6F2EB] border border-[#ECE5DA] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C1917]">Link Product to Pin</span>
                <span className="text-[#8C827A]">
                  Pos: {pendingCoords.x}%, {pendingCoords.y}%
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-[#57534E] mb-1">Select Piece</label>
                <select
                  value={selectedProductForPin}
                  onChange={(e) => setSelectedProductForPin(e.target.value)}
                  className="w-full bg-white border border-[#ECE5DA] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatPrice(p.priceUSD)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPin(false);
                    setPendingCoords(null);
                  }}
                  className="flex-1 py-2 text-xs font-medium text-[#57534E] bg-white rounded-xl border border-[#ECE5DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-xl"
                >
                  Save Pin
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-[#F6F2EB] text-xs text-[#57534E] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#9E7D56] shrink-0" />
              <span>Click anywhere on the room canvas on the left to add a hotspot.</span>
            </div>
          )}

          {/* List of Current Scene Pins */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto">
            {currentScene.pins.length === 0 ? (
              <p className="text-xs text-[#8C827A] text-center py-6">No pins placed on this scene yet.</p>
            ) : (
              currentScene.pins.map((pin) => {
                const product = products.find((p) => p.id === pin.productId);
                return (
                  <div
                    key={pin.id}
                    className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#ECE5DA] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {product && (
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-[#1C1917] truncate">
                          {product?.name || pin.label}
                        </h4>
                        <span className="text-[10px] text-[#8C827A]">
                          X: {pin.x}% • Y: {pin.y}%
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removePin(currentScene.id, pin.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove Pin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
