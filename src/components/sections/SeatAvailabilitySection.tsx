"use client";

import React from "react";
import initialSeats from "@/data/seats.json";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { CheckCircle2, Lock, ArrowDown, Sparkles } from "lucide-react";

interface SeatAvailabilitySectionProps {
  selectedSeat: string | null;
  onSelectSeat: (seatId: string | null) => void;
}

export function SeatAvailabilitySection({
  selectedSeat,
  onSelectSeat,
}: SeatAvailabilitySectionProps) {
  const availableCount = initialSeats.filter((s) => s.status === "available").length;
  const totalCount = initialSeats.length;

  const handleSeatClick = (seat: typeof initialSeats[0]) => {
    if (seat.status === "available") {
      const nextSeat = seat.id === selectedSeat ? null : seat.id;
      onSelectSeat(nextSeat);
    }
  };

  const selectedSeatObj = initialSeats.find((s) => s.id === selectedSeat);

  const handleProceedToBooking = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="seats" className="py-24 bg-[#0a1815] relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1F4A3A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12302A] border border-[#C9A24B]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F5EEDC]">
              Interactive Floor Plan
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Choose Your Quiet Desk (A1 &ndash; A20)
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-75" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Tap an available cubicle to reserve your personal spot. Your selection automatically syncs directly to the booking form below.
          </p>

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-3 mt-6 px-4 py-2 rounded-full bg-[#12302A]/90 border border-[#C9A24B]/35 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-medium text-[#F5EEDC]">
              <strong className="text-[#C9A24B]">{availableCount}</strong> Desks Open &bull; {totalCount - availableCount} Reserved
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 text-xs text-[#F5EEDC]/80">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#1F4A3A] border-2 border-[#C9A24B]/60" />
            <span>Available (Tap to Choose)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-black/40 border border-white/10 opacity-50" />
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#C9A24B] border-2 border-[#FAF6ED]" />
            <span className="font-semibold text-[#C9A24B]">Selected for Booking</span>
          </div>
        </div>

        {/* Visual Desk Grid */}
        <div className="glass-card-dark p-6 sm:p-10 rounded-brand max-w-4xl mx-auto border border-[#C9A24B]/35 shadow-2xl">
          {/* Hallway / Feature Wall Top Indicator */}
          <div className="text-center py-2.5 px-4 mb-8 rounded-lg bg-[#142621] border border-[#C9A24B]/25 max-w-md mx-auto">
            <span className="text-[11px] font-heading tracking-widest uppercase text-[#C9A24B]">
              &bull; Front Wall &bull; &ldquo;Dream Big. Stay Focused.&rdquo;
            </span>
          </div>

          {/* Left & Right Rows of Desks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {initialSeats.map((seat) => {
              const isAvailable = seat.status === "available";
              const isSelected = selectedSeat === seat.id;

              return (
                <button
                  key={seat.id}
                  type="button"
                  onClick={() => handleSeatClick(seat)}
                  disabled={!isAvailable}
                  className={`relative p-3 sm:p-4 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between min-h-[92px] ${
                    isSelected
                      ? "bg-[#C9A24B] border-[#F5EEDC] text-[#12302A] shadow-[0_0_25px_rgba(201,162,75,0.7)] scale-105 z-10"
                      : isAvailable
                      ? "bg-[#162f27]/80 hover:bg-[#1F4A3A] border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#F5EEDC] cursor-pointer"
                      : "bg-black/25 border-white/5 text-[#F5EEDC]/25 cursor-not-allowed opacity-45"
                  }`}
                  aria-label={`Cubicle ${seat.id}, ${seat.status}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? "text-[#12302A]" : "text-[#C9A24B]"
                      }`}
                    >
                      {seat.id}
                    </span>
                    {isAvailable ? (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-[#12302A]" : "text-emerald-400"
                        }`}
                      />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-white/20" />
                    )}
                  </div>

                  <div className="my-1">
                    <span className="font-heading text-lg font-bold">
                      #{seat.number}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] tracking-tight uppercase truncate max-w-full ${
                      isSelected ? "text-[#12302A] font-bold" : "text-[#F5EEDC]/60"
                    }`}
                  >
                    {isAvailable ? seat.category || "Available" : "Taken"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Bar when a seat is chosen */}
          <div className="mt-8 pt-6 border-t border-[#C9A24B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {selectedSeatObj ? (
                <p className="text-sm text-[#F5EEDC]">
                  Selected Desk:{" "}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C9A24B] text-[#12302A] font-mono font-bold text-xs ml-1">
                    Cubicle #{selectedSeatObj.id} ({selectedSeatObj.category})
                  </span>
                </p>
              ) : (
                <p className="text-xs text-[#F5EEDC]/70">
                  Tap any available cubicle above to lock it into your booking form
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleProceedToBooking}
              className="btn-gold px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <span>{selectedSeat ? `Continue with Desk #${selectedSeat}` : "Proceed to Booking Form"}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
