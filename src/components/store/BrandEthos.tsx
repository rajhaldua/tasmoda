'use client';

import React from 'react';
import { Compass, Feather, Scissors, Sparkles } from 'lucide-react';

export function BrandEthos() {
  const pillars = [
    {
      icon: Feather,
      title: 'Normandy Flax & Egyptian Percale',
      description:
        'Sourced from historic European fields and stone-washed for immediate heritage drape. Naturally cooling in summer and insulating in winter.',
    },
    {
      icon: Scissors,
      title: 'Bespoke Window Architecture',
      description:
        'Pinch-pleated curtains and sheer panels tailored with thermal linings and weighted hems for majestic, floor-grazing column folds.',
    },
    {
      icon: Compass,
      title: 'Hand-Knotted Looms',
      description:
        'Crafted on generational vertical looms with 100% un-dyed virgin wool and organic jute, creating tactile barefoot calm across your home.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FDFBF7] border-t border-[#ECE5DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ethos Quote Banner */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#9E7D56] font-medium block mb-3">
            The Tasmoda Textile Ethos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
            &ldquo;Textiles are the soul of the home. They soften acoustics, temper daylight, and invite deep rest.&rdquo;
          </h2>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#8C827A] font-sans">
            Tasmoda Textile Atelier • Milan &amp; Jaipur
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-3xl bg-[#F6F2EB] border border-[#ECE5DA] transition-all duration-300 hover:border-[#D0C5B4] hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EFE9DF] text-[#9E7D56] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#1C1917] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#57534E] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECE5DA] text-xs font-semibold text-[#9E7D56] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisanal Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
