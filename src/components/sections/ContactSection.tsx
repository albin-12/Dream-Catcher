"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { GoldDivider } from "@/components/ui/GoldDivider";
import initialSeats from "@/data/seats.json";
import { Send, CheckCircle2, MessageSquare, AlertCircle, Bookmark, X } from "lucide-react";

interface ContactSectionProps {
  selectedSeat: string | null;
  onSelectSeat: (seatId: string | null) => void;
}

export function ContactSection({
  selectedSeat,
  onSelectSeat,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    exam: "CA (Foundation / Inter / Final)",
    plan: "Monthly Resident Member",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const availableSeats = initialSeats.filter((s) => s.status === "available");
  const selectedSeatObj = initialSeats.find((s) => s.id === selectedSeat);

  const exams = [
    "CA (Foundation / Inter / Final)",
    "CMA / ACCA",
    "MBBS / MD / NEET PG",
    "UPSC Civil Services",
    "Kerala PSC / KAS",
    "Judiciary / CLAT",
    "Other Competitive Exam",
  ];

  const plans = [
    "Daily Access Pass",
    "Monthly Resident Member",
    "Intensive Exam Quarter",
    "Seat Enquiries / Trial Visit",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const seatText = selectedSeat
      ? `Cubicle #${selectedSeat} (${selectedSeatObj?.category || "Reserved Desk"})`
      : "Any Available Cubicle";

    // Build the formatted WhatsApp message
    const formattedText = `*Dream Catcher Study Lounge &ndash; Seat Enquiry*
----------------------------------------
*Selected Seat:* ${seatText}
*Name:* ${formData.name.trim()}
*Phone:* ${formData.phone.trim()}
*Exam Preparing For:* ${formData.exam}
*Preferred Plan:* ${formData.plan}
${formData.message ? `*Specific Request:* ${formData.message.trim()}` : ""}
----------------------------------------
_Location: East Fort, Thrissur_`;

    const encoded = encodeURIComponent(formattedText);
    const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encoded}`;

    setSubmitted(true);

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0c1814] relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1F4A3A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12302A] border border-[#C9A24B]/30 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F5EEDC]">
              Direct Admission Desk
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#F5EEDC] tracking-tight">
            Reserve Your Study Seat
          </h2>
          <GoldDivider className="max-w-xs mx-auto my-4 opacity-75" />
          <p className="text-[#F5EEDC]/80 text-sm sm:text-base font-light leading-relaxed">
            Submit your details below to confirm your desk. Our admissions coordinator verifies availability immediately on WhatsApp.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card-dark p-6 sm:p-10 rounded-brand border border-[#C9A24B]/35 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1F4A3A] border-2 border-[#C9A24B] text-[#C9A24B] flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#F5EEDC]">
                Launching WhatsApp...
              </h3>
              <p className="text-sm text-[#F5EEDC]/80 max-w-md mx-auto font-light">
                Your reservation request for{" "}
                <strong className="text-[#C9A24B]">
                  {selectedSeat ? `Cubicle #${selectedSeat}` : "a quiet cubicle"}
                </strong>{" "}
                is formatted and ready in WhatsApp. If it didn&apos;t open automatically, tap below.
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Direct</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Desk Banner inside Form */}
              <div className="p-4 rounded-xl bg-[#142621] border border-[#C9A24B]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1F4A3A] border border-[#C9A24B]/50 flex items-center justify-center text-[#C9A24B] shrink-0">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold block">
                      Cubicle Selection
                    </span>
                    {selectedSeat ? (
                      <p className="text-sm font-medium text-[#F5EEDC]">
                        Selected:{" "}
                        <strong className="text-[#DFC27A] font-mono text-base font-bold">
                          Desk #{selectedSeat}
                        </strong>{" "}
                        <span className="text-xs text-[#F5EEDC]/60">
                          ({selectedSeatObj?.category || "Standard"})
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-[#F5EEDC]/75">
                        No specific desk selected (Will assign best available quiet cubicle)
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Seat Switcher / Clear Button */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <select
                    value={selectedSeat || ""}
                    onChange={(e) => onSelectSeat(e.target.value || null)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0c1814] border border-[#C9A24B]/30 text-xs text-[#F5EEDC] focus:outline-none focus:border-[#C9A24B]"
                    aria-label="Select cubicle desk"
                  >
                    <option value="">Choose desk...</option>
                    {availableSeats.map((s) => (
                      <option key={s.id} value={s.id}>
                        Desk #{s.id} ({s.category})
                      </option>
                    ))}
                  </select>

                  {selectedSeat && (
                    <button
                      type="button"
                      onClick={() => onSelectSeat(null)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-[#F5EEDC]/60 hover:text-[#F5EEDC] transition-colors"
                      title="Clear seat selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Menon"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091411]/90 border border-[#C9A24B]/30 text-[#F5EEDC] placeholder-[#F5EEDC]/30 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-amber-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2"
                  >
                    Mobile Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g. 99470 87014"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091411]/90 border border-[#C9A24B]/30 text-[#F5EEDC] placeholder-[#F5EEDC]/30 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] text-sm"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-amber-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Exam preparing for */}
                <div>
                  <label
                    htmlFor="exam"
                    className="block text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2"
                  >
                    Exam Target
                  </label>
                  <select
                    id="exam"
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091411]/90 border border-[#C9A24B]/30 text-[#F5EEDC] focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] text-sm"
                  >
                    {exams.map((exam) => (
                      <option key={exam} value={exam} className="bg-[#12302A] text-[#F5EEDC]">
                        {exam}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Plan */}
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2"
                  >
                    Preferred Plan
                  </label>
                  <select
                    id="plan"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#091411]/90 border border-[#C9A24B]/30 text-[#F5EEDC] focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] text-sm"
                  >
                    {plans.map((p) => (
                      <option key={p} value={p} className="bg-[#12302A] text-[#F5EEDC]">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-[#C9A24B] font-semibold mb-2"
                >
                  Specific Timings / Hostel Assistance (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="e.g. Need morning 6am entry or hostel nearby..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#091411]/90 border border-[#C9A24B]/30 text-[#F5EEDC] placeholder-[#F5EEDC]/30 focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] text-sm"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-gold w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4 fill-[#12302A]" />
                <span>
                  {selectedSeat
                    ? `Reserve Desk #${selectedSeat} via WhatsApp`
                    : "Submit Enquiry via WhatsApp"}
                </span>
              </button>

              <p className="text-center text-[11px] text-[#F5EEDC]/60">
                Direct phone inquiries:{" "}
                <a
                  href={`tel:${siteConfig.contact.phonePrimary}`}
                  className="text-[#C9A24B] hover:underline font-semibold"
                >
                  {siteConfig.contact.phoneDisplayPrimary}
                </a>{" "}
                or{" "}
                <a
                  href={`tel:${siteConfig.contact.phoneSecondary}`}
                  className="text-[#C9A24B] hover:underline font-semibold"
                >
                  {siteConfig.contact.phoneDisplaySecondary}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
