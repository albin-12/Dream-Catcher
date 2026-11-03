"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export function GallerySection() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = siteConfig.gallery;

  const handleOpen = (index: number) => {
    setActiveImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setActiveImageIndex(null);
    document.body.style.overflow = "auto";
  }, []);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-24 bg-[#12302A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Real Study Space
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Step Inside Dream Catcher
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Actual unedited photographs of our silent cubicles, wooden privacy acoustics, and inspiration wall in East Fort, Thrissur.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {images.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpen(index)}
              className="group relative h-72 sm:h-96 rounded-brand overflow-hidden border border-[#C9A24B]/30 hover:border-[#C9A24B] cursor-pointer shadow-lg transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#12302A] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Hover inspect badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#12302A]/80 border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <p className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-1">
                  Thrissur Lounge
                </p>
                <p className="text-sm sm:text-base font-heading font-medium text-[#F5EEDC]">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Keyboard Navigation */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Lightbox"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-[#12302A] border border-[#C9A24B]/40 text-[#F5EEDC] hover:text-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
            aria-label="Close image lightbox (Escape)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#12302A]/80 border border-[#C9A24B]/40 text-[#F5EEDC] hover:text-[#C9A24B] focus:outline-none"
            aria-label="Previous image (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#12302A]/80 border border-[#C9A24B]/40 text-[#F5EEDC] hover:text-[#C9A24B] focus:outline-none"
            aria-label="Next image (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image container */}
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[75vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[activeImageIndex].src}
                alt={images[activeImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm font-light text-[#F5EEDC]/90 max-w-xl">
              {images[activeImageIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
