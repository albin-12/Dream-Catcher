import React from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Home, CheckCircle2, MessageSquare } from "lucide-react";

export function HostelSection() {
  const { hostelInfo } = siteConfig;

  return (
    <section className="py-20 bg-[#0e241f] relative overflow-hidden border-t border-b border-[#C9A24B]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card-dark p-8 sm:p-12 rounded-brand border border-[#C9A24B]/35 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Icon Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1F4A3A] border-2 border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] shrink-0 shadow-lg">
            <Home className="w-10 h-10 stroke-[1.5]" />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24B] font-semibold">
              Outstation Aspirant Care
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5EEDC] mt-1 mb-3">
              {hostelInfo.title}
            </h3>
            <p className="text-sm text-[#F5EEDC]/80 font-light leading-relaxed mb-5">
              {hostelInfo.description}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-left">
              {hostelInfo.points.map((point) => (
                <div key={point} className="flex items-start gap-2 text-xs sm:text-sm text-[#F5EEDC]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <a
              href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
                "Hello Dream Catcher Study Lounge, I am looking for study lounge membership with nearby hostel/PG accommodation in East Fort, Thrissur."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire for Hostel Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
