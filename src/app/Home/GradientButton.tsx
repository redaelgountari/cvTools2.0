import React from "react";

export default function GradientButton({ text = "Postuler" }) {
  return (
    <button
      className="
        relative
        px-12 py-3
        text-xl font-semibold text-black
        rounded-full
        bg-gradient-to-r 
        from-[#47D6D2] via-[#FFF8F0] to-[#FEE318]
        border-[3px] border-black
        shadow-[0_4px_0_0_#000]
        transition-all duration-200
        hover:brightness-105
        active:shadow-[0_2px_0_0_#000]
        active:translate-y-[2px]
      "
    >
      {text}
    </button>
  );
}
