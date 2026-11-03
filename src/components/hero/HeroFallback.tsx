import React from "react";
import Image from "next/image";

export function HeroFallback() {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-[#C9A24B]/20 bg-gradient-to-tr from-[#14234B]/30 via-transparent to-[#C9A24B]/10 animate-pulse duration-1000" />
      <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#C9A24B]/30" />
      
      {/* Centered authentic emblem */}
      <div className="relative w-44 h-44 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#C9A24B]/60 shadow-[0_0_50px_rgba(201,162,75,0.25)] bg-[#F5EEDC]">
        <Image
          src="/images/logo.jpg"
          alt="Dream Catcher Study Lounge Emblem"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
