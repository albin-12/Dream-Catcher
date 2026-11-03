"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, Phone, MessageSquare } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Facilities", href: "#facilities" },
    { label: "Who It's For", href: "#who-it-is-for" },
    { label: "Experience", href: "#tour" },
    { label: "Gallery", href: "#gallery" },
    { label: "Plans", href: "#plans" },
    { label: "Seats", href: "#seats" },
    { label: "Location", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#12302A]/90 backdrop-blur-md border-b border-[#C9A24B]/20 py-3 shadow-lg"
          : "bg-gradient-to-b from-[#12302A]/90 via-[#12302A]/60 to-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C9A24B] rounded-lg p-1"
          aria-label="Dream Catcher Study Lounge Home"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#C9A24B]/40 shadow-sm group-hover:border-[#C9A24B] transition-colors bg-[#F5EEDC]">
            <Image
              src="/images/logo.jpg"
              alt="Dream Catcher Study Lounge Emblem"
              fill
              className="object-cover"
              priority
              sizes="48px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-semibold tracking-wider text-[#F5EEDC] uppercase leading-none">
              Dream Catcher
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mt-0.5">
              Study Lounge &bull; Thrissur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Desktop Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F5EEDC]/80 hover:text-[#C9A24B] transition-colors focus:outline-none focus:text-[#C9A24B]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#F5EEDC]/85 hover:text-[#C9A24B] border border-[#C9A24B]/30 hover:border-[#C9A24B] rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
            aria-label={`Call ${siteConfig.contact.phoneDisplayPrimary}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Call Now</span>
          </a>

          <a
            href="#contact"
            className="btn-gold px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm"
          >
            Book a Seat
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#C9A24B] hover:text-[#F5EEDC] transition-colors"
            aria-label="Enquire on WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#F5EEDC] hover:text-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12302A]/98 backdrop-blur-xl border-b border-[#C9A24B]/30 px-6 pt-4 pb-8 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F5EEDC]/90 hover:text-[#C9A24B] py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[#C9A24B]/40 text-[#F5EEDC] font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-[#C9A24B]" />
              <span>Call: {siteConfig.contact.phoneDisplayPrimary}</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold flex items-center justify-center py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-center"
            >
              Reserve Cubicle
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
