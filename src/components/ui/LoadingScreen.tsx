"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if session already loaded to avoid repetitive loader on fast navigation
    const hasLoaded = sessionStorage.getItem("dc_loaded");
    const targetDuration = hasLoaded ? 800 : 1600;
    const intervalTime = 25;
    const step = 100 / (targetDuration / intervalTime);

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("dc_loaded", "true");
            setTimeout(() => setShouldRender(false), 600); // Wait for fade out
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#081310] transition-all duration-700 ${
        loading ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
      }`}
      aria-hidden={!loading}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-96 h-96 bg-[#1F4A3A]/30 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute w-64 h-64 bg-[#C9A24B]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Circular Emblem with Animated Progress Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 flex items-center justify-center">
          {/* SVG Progress Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[#12241F]"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[#C9A24B] transition-all duration-75 ease-out"
              strokeWidth="2.5"
              strokeDasharray={289}
              strokeDashoffset={289 - (289 * percent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Logo in center */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#C9A24B]/60 shadow-[0_0_25px_rgba(201,162,75,0.35)] bg-[#F5EEDC]">
            <Image
              src="/images/logo.jpg"
              alt="Dream Catcher Study Lounge Emblem"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Details */}
        <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-[#F5EEDC] uppercase">
          Dream Catcher
        </h2>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mt-1">
          Study Lounge &bull; East Fort, Thrissur
        </p>

        {/* Hairline diamond divider */}
        <div className="flex items-center justify-center w-32 my-3 opacity-60">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C9A24B]" />
          <div className="w-1.5 h-1.5 bg-[#C9A24B] rotate-45 mx-2" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C9A24B]" />
        </div>

        <p className="font-heading italic text-xs text-[#F5EEDC]/70">
          &ldquo;Dream Big. Stay Focused.&rdquo;
        </p>

        {/* Loading Progress percentage */}
        <div className="mt-5 text-[11px] font-mono text-[#C9A24B]/90 font-medium tracking-wider">
          {Math.round(percent)}%
        </div>
      </div>
    </div>
  );
}
