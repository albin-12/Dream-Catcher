"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { canRunWebGL } from "@/lib/capabilities";
import { HeroFallback } from "./HeroFallback";
import { Phone, MessageSquare, Wind, Wifi, VolumeX, ShieldCheck } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";

// Dynamically load 3D Canvas only on client-side after initial paint
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroSection() {
  const [use3D, setUse3D] = useState<boolean | null>(null);

  useEffect(() => {
    // Check hardware capability on client side
    const allowed = canRunWebGL();
    setUse3D(allowed);
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-gradient-to-b from-[#12302A] via-[#142621] to-[#12302A]">
      {/* Background radial gradient highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1F4A3A]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#14234B]/30 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Dreamcatcher or 2D Fallback */}
      <div className="absolute inset-0 z-0 opacity-80 sm:opacity-90">
        {use3D === true ? <Hero3DCanvas /> : <HeroFallback />}
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-8 sm:pt-14">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12302A]/80 border border-[#C9A24B]/40 backdrop-blur-md mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F5EEDC]">
            East Fort, Thrissur &bull; Silent Study Space
          </span>
        </div>

        {/* Main H1 Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5EEDC] drop-shadow-md leading-[1.15] max-w-4xl mx-auto">
          {siteConfig.tagline}
        </h1>

        <p className="text-sm sm:text-base md:text-lg font-light text-[#C9A24B] tracking-wide mt-2 font-heading italic">
          {siteConfig.subTagline}
        </p>

        <GoldDivider className="max-w-xs mx-auto my-4 opacity-70" />

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#F5EEDC]/85 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
          A premium, silent, air-conditioned study sanctuary for serious aspirants in East Fort, Thrissur. Dedicated cubicles, total silence, uninterrupted focus.
        </p>

        {/* CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg group"
          >
            <MessageSquare className="w-4 h-4 fill-[#12302A] text-[#12302A]" />
            <span>Enquire on WhatsApp</span>
          </a>

          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 bg-[#12302A]/80 hover:bg-[#1F4A3A] border border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#F5EEDC] transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-[#C9A24B]" />
            <span>Call Now: {siteConfig.contact.phoneDisplayPrimary}</span>
          </a>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="glass-card-dark py-4 px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#C9A24B]/15">
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
              <Wind className="w-5 h-5 text-[#C9A24B]" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-semibold text-[#F5EEDC]">Full AC</p>
              <p className="text-[11px] text-[#F5EEDC]/60">Climate Controlled</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5 text-[#C9A24B]" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-semibold text-[#F5EEDC]">High-Speed Wi-Fi</p>
              <p className="text-[11px] text-[#F5EEDC]/60">Buffer-Free Lectures</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
              <VolumeX className="w-5 h-5 text-[#C9A24B]" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-semibold text-[#F5EEDC]">Pin-Drop Silent</p>
              <p className="text-[11px] text-[#F5EEDC]/60">Zero Distractions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C9A24B]" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-semibold text-[#F5EEDC]">CCTV Safety</p>
              <p className="text-[11px] text-[#F5EEDC]/60">Secure Day & Night</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
