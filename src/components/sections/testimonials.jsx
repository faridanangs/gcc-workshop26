"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "@/data/dummy";

export function Testimonials() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-cream-50">
      <div className="container mb-10 flex items-end justify-between gap-4">
        <span className="section-heading-eyebrow inline-block rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-1.5 text-xs font-semibold text-amber-400">
          // kata-alumni
        </span>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label="Geser ke kiri"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-50/15 bg-cream-50/5 text-cream-50 transition-colors hover:bg-clay-500 disabled:pointer-events-none disabled:opacity-30"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Geser ke kanan"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-50/15 bg-cream-50/5 text-cream-50 transition-colors hover:bg-clay-500 disabled:pointer-events-none disabled:opacity-30"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades to hint there's more content to scroll */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-900 to-transparent transition-opacity duration-300 sm:w-20 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-900 to-transparent transition-opacity duration-300 sm:w-20 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={trackRef}
          className="flex snap-x snap-proximity gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-card
              className="w-[280px] shrink-0 snap-start rounded-2xl border-2 border-cream-50/10 bg-cream-50/[0.04] p-6 sm:w-[320px]"
            >
              <FiMessageCircle className="mb-4 h-6 w-6 text-clay-500" />
              <p className="text-sm leading-relaxed text-cream-100/75">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-cream-50/10 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-500 font-display text-xs font-bold text-cream-50">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream-50">{t.name}</p>
                  <p className="text-xs text-cream-100/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}