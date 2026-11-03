"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#12302A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold mb-2">
            Clear Answers
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Frequently Asked Questions
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-80" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Everything you need to know about our silent study rules, timings, registration, and desk privileges.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="glass-card-dark rounded-brand border border-[#C9A24B]/25 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-[#1F4A3A]/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#C9A24B] shrink-0" />
                    <span className="font-heading text-lg sm:text-xl font-medium text-[#F5EEDC]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A24B] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#F5EEDC]/80 font-light leading-relaxed border-t border-[#C9A24B]/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#F5EEDC]/70">
            Have a specific requirement or exam schedule?
          </p>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs uppercase tracking-wider font-semibold text-[#C9A24B] hover:text-[#DFC27A] underline"
          >
            Chat directly with our lounge coordinator &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
