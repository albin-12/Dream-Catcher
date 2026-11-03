import React from "react";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = "" }: GoldDividerProps) {
  return (
    <div className={`gold-divider ${className}`} aria-hidden="true">
      <span className="gold-divider-diamond" />
    </div>
  );
}
