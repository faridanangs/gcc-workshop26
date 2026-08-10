"use client";

import { motion } from "framer-motion";
import { FiHexagon } from "react-icons/fi";
import { sponsors } from "@/data/dummy";

function SponsorCard({ name, size = "md" }) {
  const sizes = {
    lg: "h-28 sm:h-32 text-base sm:text-lg",
    md: "h-24 text-sm sm:text-base",
    sm: "h-20 text-xs sm:text-sm",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={`flex ${sizes[size]} w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink-900/8 bg-cream-50 px-4 font-display font-bold text-ink-900/70 shadow-sm transition-all hover:border-clay-500/40 hover:text-ink-900`}
    >
      <FiHexagon className="shrink-0 text-clay-500" />
      <span className="truncate">{name}</span>
    </motion.div>
  );
}

export function Sponsors() {
  return (
    <section id="sponsor" className="relative bg-cream-50 py-24 sm:py-28">
      <div className="container">
        <div className="max-w-xl">
          <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
            // didukung-oleh
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Terima kasih untuk mitra yang mendanai acara ini.
          </h2>
          <p className="mt-4 text-ink-900/60">
            GCC Workshop 2026 terselenggara berkat dukungan perusahaan dan komunitas
            berikut ini.
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wide text-amber-600">
              Platinum Partner
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sponsors.platinum.map((s) => (
                <SponsorCard key={s.name} name={s.name} size="lg" />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wide text-clay-600">
              Gold Partner
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {sponsors.gold.map((s) => (
                <SponsorCard key={s.name} name={s.name} size="md" />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wide text-ink-900/50">
              Silver Partner
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {sponsors.silver.map((s) => (
                <SponsorCard key={s.name} name={s.name} size="sm" />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wide text-ink-900/50">
              Community Partner
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {sponsors.community.map((s) => (
                <SponsorCard key={s.name} name={s.name} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
