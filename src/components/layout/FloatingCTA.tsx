"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Phone, MessageSquare, Navigation } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 group">
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Dream Catcher Study Lounge on WhatsApp"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1F4A3A] hover:bg-[#12302A] text-[#F5EEDC] border border-[#C9A24B]/60 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-inner">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
              Enquire Live
            </span>
            <span className="text-xs text-[#F5EEDC] font-medium">WhatsApp Helpdesk</span>
          </div>
        </a>
      </div>

      {/* Mobile Persistent Bottom Bar (Call, WhatsApp, Directions) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12302A]/95 backdrop-blur-md border-t border-[#C9A24B]/30 px-3 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call Button */}
          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 text-[#F5EEDC] hover:text-[#C9A24B] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C9A24B] mb-0.5" />
            <span className="text-[11px] font-medium tracking-wide uppercase">Call Now</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#12302A] font-semibold transition-transform active:scale-95 shadow-md"
          >
            <MessageSquare className="w-4 h-4 mb-0.5 fill-[#12302A]" />
            <span className="text-[11px] font-bold tracking-wide uppercase">WhatsApp</span>
          </a>

          {/* Directions Button */}
          <a
            href={siteConfig.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#1F4A3A]/80 border border-[#C9A24B]/30 text-[#F5EEDC] hover:text-[#C9A24B] transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#C9A24B] mb-0.5" />
            <span className="text-[11px] font-medium tracking-wide uppercase">Directions</span>
          </a>
        </div>
      </div>
    </>
  );
}
