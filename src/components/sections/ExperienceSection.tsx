"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import {
  Sparkles,
  Compass,
  Play,
  Pause,
  Eye,
  Shield,
  Zap,
  VolumeX as MuteIcon,
  CheckCircle2,
} from "lucide-react";

const TOTAL_FRAMES = 100;

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [playMode, setPlayMode] = useState<"scroll" | "auto">("scroll");
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Cached preloaded images in memory
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to draw a frame to canvas with responsive aspect-ratio cover
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect-ratio cover
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all 100 WebP frames into memory on client mount
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padIndex = String(i).padStart(4, "0");
      img.src = `/frames/frame_${padIndex}.webp`;

      img.onload = () => {
        loadCount++;
        setImagesLoaded(loadCount);
        // Render first frame as soon as available
        if (i === 1) {
          renderFrame(0);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, [renderFrame]);

  // Handle canvas resize with retina DPI scaling (capped at 1.5)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const currentFrameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(currentProgressRef.current * (TOTAL_FRAMES - 1)))
    );
    renderFrame(currentFrameIndex);
  }, [renderFrame]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Scroll listener tracking scroll progress through the pinned track
  const handleScroll = useCallback(() => {
    if (!containerRef.current || playMode !== "scroll") return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    // Normalised 0.0 to 1.0 progress
    const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
    targetProgressRef.current = progress;
  }, [playMode]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Silky smooth interpolation loop (lerps frames on scroll at 60fps)
  useEffect(() => {
    if (playMode !== "scroll") return;

    let lastDrawnFrame = -1;

    const loop = () => {
      // Damped lerp (0.14 provides ultra-smooth, instant-feeling scroll responsiveness)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.14;

      setScrollProgress(currentProgressRef.current);

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastDrawnFrame) {
        renderFrame(frameIndex);
        lastDrawnFrame = frameIndex;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [playMode, renderFrame]);

  // Auto-play mode handling (continuously advances frames at 10fps)
  useEffect(() => {
    if (playMode === "auto" && isPlayingAuto) {
      autoPlayIntervalRef.current = setInterval(() => {
        currentProgressRef.current =
          (currentProgressRef.current + 1 / (TOTAL_FRAMES - 1)) % 1;
        setScrollProgress(currentProgressRef.current);

        const frameIndex = Math.floor(
          currentProgressRef.current * (TOTAL_FRAMES - 1)
        );
        renderFrame(frameIndex);
      }, 100);
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [playMode, isPlayingAuto, renderFrame]);

  const togglePlayMode = (mode: "scroll" | "auto") => {
    setPlayMode(mode);
    if (mode === "auto") {
      setIsPlayingAuto(true);
    } else {
      setIsPlayingAuto(false);
      handleScroll();
    }
  };

  // Milestone amenities as the user walks down the lounge
  const getMilestone = (prog: number) => {
    if (prog < 0.28) {
      return {
        badge: "Cubicles A1 &ndash; A20",
        title: "Private Acoustic Partitions",
        desc: "Individual wooden cubicles designed to eliminate peripheral movement and maintain 100% focused vision.",
        icon: Eye,
      };
    } else if (prog < 0.58) {
      return {
        badge: "Zero Fatigue Seating",
        title: "Ergonomic Lumbar Chairs",
        desc: "Contoured high-back mesh seating engineered for serious aspirants sitting through 12+ hour preparation shifts.",
        icon: Shield,
      };
    } else if (prog < 0.82) {
      return {
        badge: "Study Atmosphere",
        title: "Warm LED Glow & Power",
        desc: "Eye-friendly under-shelf illumination with dedicated laptop, tablet, and mobile charging at every seat.",
        icon: Zap,
      };
    } else {
      return {
        badge: "Sanctuary Standard",
        title: "Inspiration Wall & Full AC",
        desc: "&ldquo;Dream Big. Stay Focused.&rdquo; Whisper-quiet climate control with zero distracting conversation.",
        icon: MuteIcon,
      };
    }
  };

  const currentMilestone = getMilestone(scrollProgress);
  const MilestoneIcon = currentMilestone.icon;

  return (
    <section
      id="tour"
      ref={containerRef}
      className={`relative bg-[#06100d] text-[#F5EEDC] ${
        playMode === "scroll" ? "h-[260vh] sm:h-[280vh]" : "min-h-screen py-16"
      }`}
    >
      {/* Sticky Fullscreen Experience Viewport */}
      <div
        className={`${
          playMode === "scroll"
            ? "sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between"
            : "relative max-w-5xl mx-auto px-4 w-full"
        }`}
      >
        {/* Background Canvas Rendering 100 WebP Walkthrough Frames */}
        <div className="absolute inset-0 z-0 bg-black">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none pointer-events-none"
            aria-label="Interactive scroll-driven video walkthrough of Dream Catcher Study Lounge in East Fort, Thrissur"
          />

          {/* Vignette Gradients for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06100d] via-black/40 to-[#06100d]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70 pointer-events-none" />
        </div>

        {/* Top Header & Tour Controls */}
        <div className="relative z-20 pt-16 sm:pt-20 px-4 sm:px-8 max-w-4xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12241F]/90 border border-[#C9A24B]/40 backdrop-blur-md mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#F5EEDC]">
              Interactive Walkthrough &bull; East Fort, Thrissur
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#F5EEDC] tracking-tight drop-shadow-md">
            Step Inside Dream Catcher
          </h2>

          <p className="text-xs sm:text-sm text-[#F5EEDC]/85 font-light mt-1 max-w-xl mx-auto drop-shadow">
            {playMode === "scroll"
              ? "Scroll down to walk down the aisle & observe individual cubicles"
              : "Watching automatic walkthrough tour"}
          </p>

          {/* Switcher: Scroll Tour vs Auto Play */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#091713]/85 border border-[#C9A24B]/30 backdrop-blur-md mt-3 shadow-md">
            <button
              type="button"
              onClick={() => togglePlayMode("scroll")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                playMode === "scroll"
                  ? "bg-[#C9A24B] text-[#12302A] shadow-sm font-bold"
                  : "text-[#F5EEDC]/75 hover:text-[#F5EEDC]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Scroll Tour</span>
            </button>

            <button
              type="button"
              onClick={() => togglePlayMode("auto")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all ${
                playMode === "auto"
                  ? "bg-[#C9A24B] text-[#12302A] shadow-sm font-bold"
                  : "text-[#F5EEDC]/75 hover:text-[#F5EEDC]"
              }`}
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAuto ? "Pause" : "Auto Play"}</span>
            </button>
          </div>
        </div>

        {/* Floating Center/Bottom Amenity Milestone Card */}
        <div className="relative z-20 px-4 sm:px-6 max-w-lg mx-auto w-full mb-8 sm:mb-12">
          <div className="glass-card-dark p-4 sm:p-6 rounded-brand border border-[#C9A24B]/50 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span
                dangerouslySetInnerHTML={{
                  __html: `&bull; ${currentMilestone.badge}`,
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#C9A24B] px-2.5 py-0.5 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30"
              />
              <span className="text-[11px] text-[#F5EEDC]/60 font-mono">
                {Math.round(scrollProgress * 100)}% Through Hall
              </span>
            </div>

            <h3 className="font-heading text-lg sm:text-2xl font-bold text-[#F5EEDC] mb-1">
              {currentMilestone.title}
            </h3>

            <p
              dangerouslySetInnerHTML={{ __html: currentMilestone.desc }}
              className="text-xs sm:text-sm text-[#F5EEDC]/80 font-light leading-relaxed"
            />

            {/* Tour Timeline Progress Line */}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 sm:mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#DFC27A] to-[#C9A24B] h-full transition-all duration-75"
                style={{ width: `${Math.max(6, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Helper Bar (Mobile-first) */}
        <div className="relative z-20 px-4 pb-4 sm:pb-6 text-center">
          {playMode === "scroll" ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] uppercase tracking-widest text-[#F5EEDC]/75">
              <span>Scroll down to walk forward</span>
              <span className="animate-bounce text-[#C9A24B]">&darr;</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12241F] border border-[#C9A24B]/40 text-xs text-[#F5EEDC]"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAuto ? "Pause Walkthrough" : "Resume Walkthrough"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
