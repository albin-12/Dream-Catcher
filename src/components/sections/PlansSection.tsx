import React from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Check, MessageSquare, Sparkles } from "lucide-react";

export function PlansSection() {
  return (
    <section id="plans" className="py-24 bg-[#12302A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Flexible Membership Options
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Transparent Study Plans
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Choose between trial day passes, dedicated monthly study desks, or intensive quarterly examination slots.
          </p>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {siteConfig.plans.map((plan) => {
            const hasExplicitPrice =
              plan.price &&
              plan.price.trim() !== "" &&
              !plan.price.includes("[PRICE");

            const whatsappMessage = encodeURIComponent(
              `Hello Dream Catcher Study Lounge, I would like to enquire about the "${plan.name}" (${plan.duration}) membership plan in East Fort, Thrissur.`
            );

            return (
              <div
                key={plan.id}
                className={`glass-card-dark rounded-brand p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-[#C9A24B] shadow-[0_10px_35px_rgba(201,162,75,0.25)] scale-[1.02] bg-[#142621]"
                    : "border border-[#C9A24B]/30"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#DFC27A] to-[#C9A24B] text-[#12302A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 fill-[#12302A]" />
                    <span>Most Popular For Aspirants</span>
                  </div>
                )}

                <div>
                  <div className="text-left mb-6">
                    <span className="text-xs uppercase tracking-widest text-[#C9A24B] font-semibold">
                      {plan.duration}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#F5EEDC] mt-1">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price display or Get a Quote */}
                  <div className="py-5 border-y border-[#C9A24B]/20 mb-6">
                    {hasExplicitPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-4xl font-bold text-[#F5EEDC]">
                          {plan.price}
                        </span>
                        <span className="text-xs text-[#F5EEDC]/60 uppercase tracking-wider">
                          /{plan.period}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block">
                          Flexible Pricing
                        </span>
                        <span className="font-heading text-2xl font-semibold text-[#F5EEDC]">
                          Custom Student Quote
                        </span>
                        <p className="text-[11px] text-[#F5EEDC]/60 mt-1">
                          Inquire for current batch seasonal discounts
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5EEDC]/85">
                        <Check className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action CTA */}
                <a
                  href={`${siteConfig.contact.whatsappUrl}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? "btn-gold shadow-md"
                      : "bg-[#1F4A3A] hover:bg-[#12302A] text-[#F5EEDC] border border-[#C9A24B]/40 hover:border-[#C9A24B]"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{hasExplicitPrice ? "Select This Plan" : "Get a Quote on WhatsApp"}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
