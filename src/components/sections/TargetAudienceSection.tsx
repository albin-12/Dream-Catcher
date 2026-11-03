import React from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { GraduationCap, Award, BookOpen, Stethoscope, Landmark, Scale } from "lucide-react";

const examIcons = [
  Award,
  GraduationCap,
  Stethoscope,
  Landmark,
  BookOpen,
  Scale,
];

export function TargetAudienceSection() {
  return (
    <section id="who-it-is-for" className="py-24 bg-[#14234B]/90 relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1F4A3A]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Tailored For High-Stakes Aspirants
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Who Studies at Dream Catcher?
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            A quiet sanctuary crafted specifically for students pursuing professional degrees and state/national public service commissions where single marks alter destinies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.targetAudience.map((item, idx) => {
            const Icon = examIcons[idx % examIcons.length];

            return (
              <div
                key={item.exam}
                className="glass-card-dark p-7 rounded-brand border border-[#C9A24B]/25 hover:border-[#C9A24B]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1F4A3A] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A24B] px-2.5 py-1 rounded-full bg-[#12302A] border border-[#C9A24B]/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#F5EEDC] mb-2">
                    {item.exam}
                  </h3>

                  <p className="text-sm text-[#F5EEDC]/75 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#C9A24B]/10 flex items-center text-xs text-[#C9A24B] font-medium">
                  <span>Reserved quiet zone guaranteed &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 glass-card-dark p-6 rounded-brand text-center max-w-2xl mx-auto border border-[#C9A24B]/30">
          <p className="text-sm text-[#F5EEDC]">
            Preparing for another competitive examination (Bank PO, UGC NET, GATE, or State Judiciary)?
          </p>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold text-[#C9A24B] hover:text-[#DFC27A] underline"
          >
            Check desk compatibility on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
