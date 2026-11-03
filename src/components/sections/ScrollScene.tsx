"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { canRunWebGL } from "@/lib/capabilities";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Eye, Shield, Sparkles, VolumeX } from "lucide-react";

const StepInside3D = dynamic(() => import("./StepInside3D"), {
  ssr: false,
});

export function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [use3D, setUse3D] = useState<boolean | null>(null);

  useEffect(() => {
    setUse3D(canRunWebGL());

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress 0 to 1 through pinned section
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / totalScrollable)
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active floating amenity badge based on scroll depth
  const getActiveAmenity = (prog: number) => {
    if (prog < 0.25) {
      return {
        badge: "Cubicles A1 – A20",
        title: "Individual Acoustic Desks",
        desc: "High privacy wooden partitions engineered so your peripheral vision stays free of visual distractions.",
        icon: Eye,
      };
    } else if (prog < 0.55) {
      return {
        badge: "Zero Fatigue",
        title: "Ergonomic Lumbar Seating",
        desc: "Breathable mesh posture chairs allowing candidates to sustain long 12-hour preparation runs comfortably.",
        icon: Shield,
      };
    } else if (prog < 0.8) {
      return {
        badge: "Workstation Amenities",
        title: "Warm Under-Shelf LED & Charging",
        desc: "Flicker-free eye-friendly lighting with dedicated power sockets directly at every study desk.",
        icon: Sparkles,
      };
    } else {
      return {
        badge: "Sanctuary Standard",
        title: "Whisper-Quiet AC & Inspiration Wall",
        desc: "'Dream Big. Stay Focused.' Constant gentle air circulation with pin-drop acoustic silence.",
        icon: VolumeX,
      };
    }
  };

  const activeAmenity = getActiveAmenity(scrollProgress);
  const ActiveIcon = activeAmenity.icon;

  return (
    <section
      id="tour"
      ref={containerRef}
      className="relative h-[250vh] bg-[#0d1f1b] text-[#F5EEDC]"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8">
        {/* Background 3D View or High-Res Interior Photo Fallback */}
        <div className="absolute inset-0 z-0">
          {use3D === true ? (
            <StepInside3D progress={scrollProgress} />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src="/images/interior-feature-wall.png"
                alt="Dream Catcher Study Lounge Interior Walkthrough"
                fill
                className="object-cover opacity-75"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12302A] via-transparent to-[#12302A]/80" />
            </div>
          )}
        </div>

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#12302A]/30 to-[#0b1f1b]/80" />

        {/* Top Header Badge */}
        <div className="relative z-10 text-center max-w-xl mx-auto pt-16 sm:pt-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12302A]/90 border border-[#C9A24B]/40 backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F5EEDC]">
              Step Inside &bull; 3D Interactive Room
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#F5EEDC] tracking-wide">
            Scroll to Walk Down the Aisle
          </h2>
          <p className="text-xs text-[#F5EEDC]/75 mt-1 font-light">
            Observe cubicles A1 through A20, warm ambient lighting, and acoustic partitions
          </p>
        </div>

        {/* Floating Gold Amenity Card (Appears as user scrolls) */}
        <div className="relative z-10 max-w-md mx-auto w-full mb-16 sm:mb-20">
          <div className="glass-card-dark p-5 sm:p-6 rounded-brand border border-[#C9A24B]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C9A24B] px-2.5 py-0.5 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30">
                <ActiveIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                {activeAmenity.badge}
              </span>
              <span className="text-[11px] text-[#F5EEDC]/50 font-mono">
                {Math.round(scrollProgress * 100)}% Through Hall
              </span>
            </div>

            <h3 className="font-heading text-xl font-bold text-[#F5EEDC] mb-1.5">
              {activeAmenity.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#F5EEDC]/80 font-light leading-relaxed">
              {activeAmenity.desc}
            </p>

            {/* Progress bar indicator */}
            <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#DFC27A] to-[#C9A24B] h-full transition-all duration-150"
                style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scroll helper indicator at bottom */}
        <div className="relative z-10 text-center pb-2">
          <span className="text-[11px] uppercase tracking-widest text-[#F5EEDC]/60 flex items-center justify-center gap-2">
            <span>Scroll down to continue tour</span>
            <span className="animate-bounce">&darr;</span>
          </span>
        </div>
      </div>
    </section>
  );
}
