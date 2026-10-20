'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, delay: 0.15 }
      )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.6'
        )
        .fromTo(
          imageCardRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3 },
          '-=0.9'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-7 xl:col-span-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F2EB] border border-[#ECE5DA] text-xs uppercase tracking-widest text-[#8C827A] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#9E7D56]" />
              <span>Architectural Soft Furnishings • 2026 Collection</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.08] text-[#1C1917] tracking-tight"
            >
              Curtains, rugs <br />
              <span className="italic font-light text-[#9E7D56]">&amp; bedding</span> for slow living.
            </h1>

            <p
              ref={subtextRef}
              className="mt-6 text-base sm:text-lg text-[#57534E] font-light leading-relaxed max-w-xl"
            >
              Tasmoda crafts bespoke Belgian linen drapes, tactile bouclé cushion covers, hand-knotted Berber rugs, and stone-washed French bedding. Tactile serenity for modern sanctuaries.
            </p>

            <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-[#1C1917] hover:bg-[#322E2B] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Textiles
              </button>

              <a
                href="#lookbook"
                className="px-7 py-4 rounded-full bg-white/90 hover:bg-white text-[#1C1917] text-xs uppercase tracking-widest font-semibold border border-[#ECE5DA] transition-all hover:border-[#9E7D56] flex items-center gap-2 group shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#9E7D56] group-hover:rotate-45 transition-transform duration-300" />
                <span>Shop The Room</span>
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="mt-12 pt-8 border-t border-[#ECE5DA]/80 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="font-serif text-2xl font-light text-[#1C1917]">100%</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8C827A] mt-0.5 font-medium">Normandy Flax & Wool</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-[#1C1917]">Custom</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8C827A] mt-0.5 font-medium">Curtain Lengths & Drops</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-[#1C1917]">Razorpay</p>
                <p className="text-[11px] uppercase tracking-wider text-[#8C827A] mt-0.5 font-medium">Instant Express Pay</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5 xl:col-span-6 relative">
            <div
              ref={imageCardRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] bg-[#EFECE6] border border-[#ECE5DA]"
            >
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=85"
                alt="Tasmoda Architectural Bedroom with Washed Linen and Curtains"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Float badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl glass-dark text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D7C7B2] block">Master Suite Sanctuary</span>
                  <h3 className="font-serif text-lg font-normal mt-0.5">Normandy Linen & Berber Wool</h3>
                  <p className="text-xs text-stone-300 font-light mt-0.5">Natural Flax Drapes & Layered Cushions</p>
                </div>
                <a
                  href="#lookbook"
                  className="px-4 py-2 rounded-full bg-white text-[#1C1917] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors"
                >
                  Shop Room
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
