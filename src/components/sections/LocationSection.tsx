import React from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { MapPin, Navigation, Compass, Bus, Train, Phone } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" className="py-24 bg-[#0d1f1b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Prime Central Location
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Find Us in East Fort, Thrissur
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Conveniently positioned in Thrissur&apos;s primary educational hub with direct access to bus routes, eateries, and quiet student hostels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location details card */}
          <div className="lg:col-span-5 glass-card-dark p-8 rounded-brand border border-[#C9A24B]/35 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold">
                  Official Lounge Address
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#F5EEDC] mt-1 flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0 mt-1" />
                  <span>East Fort, Thrissur</span>
                </h3>
                <p className="text-sm text-[#F5EEDC]/85 mt-2 leading-relaxed">
                  Near East Fort Junction, East Fort, Thrissur, Kerala &ndash; 680005
                </p>
              </div>

              {/* Landmark Highlights */}
              <div className="pt-4 border-t border-[#C9A24B]/15 space-y-3.5">
                <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block">
                  Transit & Landmark Proximate
                </span>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F5EEDC]/85">
                  <Compass className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.landmark}</span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F5EEDC]/85">
                  <Bus className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>2 minutes walking distance from East Fort bus stop</span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F5EEDC]/85">
                  <Train className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>Approximately 2.8 km from Thrissur Railway Station</span>
                </div>
              </div>

              {/* Contact direct numbers */}
              <div className="pt-4 border-t border-[#C9A24B]/15">
                <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-2">
                  Assistance on Arrival
                </span>
                <div className="flex flex-col gap-1 text-sm">
                  <a
                    href={`tel:${siteConfig.contact.phonePrimary}`}
                    className="flex items-center gap-2 text-[#F5EEDC] hover:text-[#C9A24B] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{siteConfig.contact.phoneDisplayPrimary}</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phoneSecondary}`}
                    className="flex items-center gap-2 text-[#F5EEDC] hover:text-[#C9A24B] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{siteConfig.contact.phoneDisplaySecondary}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="pt-8">
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 glass-card-dark rounded-brand overflow-hidden border border-[#C9A24B]/35 min-h-[380px] relative">
            <iframe
              title="Dream Catcher Study Lounge Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15690.627237021727!2d76.2230623!3d10.5264872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee3657b01931%3A0xb3a322e7ea777e3!2sEast%20Fort%2C%20Thrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
            />

            {/* Overlay tag */}
            <div className="absolute top-4 left-4 bg-[#12302A]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#C9A24B]/40 text-[11px] text-[#F5EEDC] font-medium shadow-md">
              East Fort &bull; Thrissur, Kerala
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
