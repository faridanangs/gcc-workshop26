"use client";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const items = [
  {
    id: "p1",
    image: "/images/peserta3.webp",
    edition: "GCC 2024",
    title: "Sesi kerja kelompok",
    className: "top-4 left-[6%] rotate-[-6deg] sm:left-[10%]",
  },
  {
    id: "p2",
    image: "/images/peserta4.webp",
    edition: "GCC 2024",
    title: "Networking session",
    className: "top-[42%] left-[34%] rotate-[5deg] sm:left-[38%]",
  },
  {
    id: "p3",
    image: "/images/peserta5.webp",
    edition: "GCC 2023",
    title: "Demo day peserta",
    className: "top-2 left-[64%] rotate-[8deg] sm:left-[68%]",
  },
];

export function DraggableCardDemo() {
  return (
    <DraggableCardContainer className="relative mx-auto hidden h-[480px] w-full max-w-lg items-center justify-center sm:h-[540px] lg:flex">
      {/* soft ambient glow di belakang tumpukan kartu */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-clay-500/15 blur-[100px]" />

      {items.map((item) => (
        <DraggableCardBody
          key={item.id}
          className={`absolute !h-auto !min-h-0 !w-60 !rounded-2xl border border-cream-50/10 !bg-ink-800/90 !p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:!w-72 ${item.className}`}
        >
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="pointer-events-none relative z-10 aspect-[4/5] w-full select-none object-cover"
            />
            {/* gradient overlay supaya teks nempel elegan di atas foto */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink-900/95 via-ink-900/10 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4">
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                {item.edition}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold leading-snug text-cream-50">
                {item.title}
              </h3>
            </div>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}