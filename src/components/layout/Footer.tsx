import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MessageSquare, Instagram, MapPin, Clock } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  return (
    <footer className="bg-[#0b1f1b] border-t border-[#C9A24B]/30 pt-16 pb-24 md:pb-12 text-[#F5EEDC]/80 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C9A24B]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Taglines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C9A24B]/50 bg-[#F5EEDC]">
                <Image
                  src="/images/logo.jpg"
                  alt="Dream Catcher Study Lounge Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold tracking-wider text-[#F5EEDC] uppercase">
                  Dream Catcher
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A24B]">
                  Study Lounge &bull; Thrissur
                </p>
              </div>
            </div>

            <p className="text-sm font-light text-[#F5EEDC]/75 leading-relaxed pt-2">
              &ldquo;Dream Big. Stay Focused. Turn Your Dreams Into Reality.&rdquo;
            </p>
            <p className="text-xs text-[#F5EEDC]/60 leading-relaxed">
              Kerala&apos;s peaceful, air-conditioned sanctuary designed for doctors, accountants, civil service, and competitive exam aspirants.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#12302A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#12302A] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#12302A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#12302A] transition-colors"
                aria-label="Enquire on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phonePrimary}`}
                className="w-9 h-9 rounded-full bg-[#12302A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#12302A] transition-colors"
                aria-label="Call study lounge"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#F5EEDC] border-b border-[#C9A24B]/20 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#facilities" className="hover:text-[#C9A24B] transition-colors">
                  Lounge Facilities & Amenities
                </Link>
              </li>
              <li>
                <Link href="#who-it-is-for" className="hover:text-[#C9A24B] transition-colors">
                  Aspirants & Exams Covered
                </Link>
              </li>
              <li>
                <Link href="#tour" className="hover:text-[#C9A24B] transition-colors">
                  Interactive Room Experience
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-[#C9A24B] transition-colors">
                  Interior & Cubicle Gallery
                </Link>
              </li>
              <li>
                <Link href="#plans" className="hover:text-[#C9A24B] transition-colors">
                  Membership Plans & Passes
                </Link>
              </li>
              <li>
                <Link href="#seats" className="hover:text-[#C9A24B] transition-colors">
                  Live Seat Availability (A1–A20)
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#C9A24B] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Target Aspirants */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#F5EEDC] border-b border-[#C9A24B]/20 pb-2">
              Lounge Timings
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-[#F5EEDC]/85">
              <Clock className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[#F5EEDC]">Daily Hours</p>
                <p className="text-xs text-[#F5EEDC]/70">6:00 AM – 11:30 PM (All 7 Days)</p>
                <p className="text-[11px] text-[#C9A24B] mt-1">24/7 access option for registered members</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2">
                Ideal For Candidates Of:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["CA", "CMA", "ACCA", "MBBS/MD", "NEET PG", "PSC", "UPSC"].map((exam) => (
                  <span
                    key={exam}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#12302A] border border-[#C9A24B]/25 text-[#F5EEDC]/90"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold tracking-wide text-[#F5EEDC] border-b border-[#C9A24B]/20 pb-2">
              Contact & Location
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#F5EEDC]">East Fort, Thrissur</p>
                  <p className="text-xs text-[#F5EEDC]/70">
                    East Fort Junction, Thrissur, Kerala &ndash; 680005
                  </p>
                  <a
                    href={siteConfig.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-[#C9A24B] hover:underline mt-1 font-medium"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <div className="text-xs">
                  <a
                    href={`tel:${siteConfig.contact.phonePrimary}`}
                    className="text-[#F5EEDC] hover:text-[#C9A24B] transition-colors block"
                  >
                    {siteConfig.contact.phoneDisplayPrimary}
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phoneSecondary}`}
                    className="text-[#F5EEDC] hover:text-[#C9A24B] transition-colors block mt-0.5"
                  >
                    {siteConfig.contact.phoneDisplaySecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GoldDivider className="my-6 opacity-40" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5EEDC]/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Dream Catcher Study Lounge. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Silent Study Space &bull; East Fort, Thrissur, Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
