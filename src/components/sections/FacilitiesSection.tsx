import React from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import {
  Wifi,
  Wind,
  LayoutGrid,
  VolumeX,
  Zap,
  Armchair,
  BookOpen,
  Coffee,
  ShieldCheck,
  Clock,
  Droplet,
  Home,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wifi,
  Wind,
  LayoutGrid,
  VolumeX,
  Zap,
  Armchair,
  BookOpen,
  Coffee,
  ShieldCheck,
  Clock,
  Droplet,
  Home,
};

export function FacilitiesSection() {
  return (
    <section id="facilities" className="py-24 bg-[#12302A] relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#1F4A3A]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#14234B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Engineered For Pure Focus
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Designed for 12+ Hour Focus Sessions
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Every square foot of Dream Catcher Study Lounge is purposefully arranged to banish fatigue, eliminate interruptions, and keep your intellect operating at peak stamina.
          </p>
        </div>

        {/* 12 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {siteConfig.facilities.map((facility) => {
            const IconComponent = iconMap[facility.iconName] || LayoutGrid;

            return (
              <div
                key={facility.id}
                className="glass-card-dark p-6 rounded-brand group relative flex flex-col justify-between"
              >
                <div>
                  {/* Icon with Gold Accent */}
                  <div className="w-12 h-12 rounded-xl bg-[#1F4A3A]/80 border border-[#C9A24B]/35 flex items-center justify-center text-[#C9A24B] mb-5 group-hover:bg-[#C9A24B] group-hover:text-[#12302A] transition-colors duration-300">
                    <IconComponent className="w-6 h-6 stroke-[1.6]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-semibold text-[#F5EEDC] mb-2 group-hover:text-[#C9A24B] transition-colors">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#F5EEDC]/70 leading-relaxed font-light">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C9A24B]/10 flex items-center justify-between text-[11px] text-[#C9A24B]/80 font-medium">
                  <span>Standard Privilege</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A24B]">
                    Included &check;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
