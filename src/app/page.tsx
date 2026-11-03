"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TargetAudienceSection } from "@/components/sections/TargetAudienceSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HostelSection } from "@/components/sections/HostelSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { SeatAvailabilitySection } from "@/components/sections/SeatAvailabilitySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  return (
    <>
      {/* 1. Hero Section (Ultra-stable 3D Dreamcatcher or 2D Accessible Fallback) */}
      <HeroSection />

      {/* 2. 12 Key Facilities & Amenities */}
      <FacilitiesSection />

      {/* 3. Lounge Experience & Cinematic Video Walkthrough (#tour) */}
      <ExperienceSection />

      {/* 4. Target Aspirants (Who it is for) */}
      <TargetAudienceSection />

      {/* 5. Authentic Real Gallery & Cubicle Tour with Lightbox */}
      <GallerySection />

      {/* 6. Outstation Hostel & PG Accommodation Support */}
      <HostelSection />

      {/* 7. Membership Plans & Student Passes */}
      <PlansSection />

      {/* 8. Live Desk Availability Grid (A1 to A20) */}
      <SeatAvailabilitySection
        selectedSeat={selectedSeat}
        onSelectSeat={setSelectedSeat}
      />

      {/* 9. Frequently Asked Questions */}
      <FAQSection />

      {/* 10. Location, Transit & Google Maps */}
      <LocationSection />

      {/* 11. WhatsApp Reservation Form (Syncs selected seat) */}
      <ContactSection
        selectedSeat={selectedSeat}
        onSelectSeat={setSelectedSeat}
      />
    </>
  );
}
