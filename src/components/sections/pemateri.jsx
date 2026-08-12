"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { speakers, stats } from "@/data/dummy";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Mentors() {
  const [main, ...supporting] = speakers;

  return (
    <section
      id="pemateri"
      className="relative overflow-hidden bg-cream-100/50 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-clay-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-[110px]" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="container relative">
        <div className="max-w-xl">
          <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
            // pembicara-pemateri
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Belajar langsung dari mereka yang sudah membuktikannya.
          </h2>
          <p className="mt-4 text-balance text-ink-900/60">
            Dipandu praktisi & akademisi yang tahu betul rasanya belajar dari
            nol — supaya materinya tetap nyambung, sekalipun kamu baru mulai.
          </p>
        </div>

        {/* Pemateri utama — profil editorial */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="relative mt-14 grid gap-0 overflow-hidden rounded-3xl border-2 border-ink-900/8 bg-cream-50 shadow-lg shadow-ink-900/5 md:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Foto + kutipan */}
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto">
            <Image
              src={main.photo}
              alt={main.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" />

            <span className="clay-stamp absolute left-5 top-5 border-amber-500 bg-amber-500 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-950 shadow-lg">
              Pemateri Utama
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <span className="block font-display text-5xl font-bold leading-none text-clay-500/80">
                &ldquo;
              </span>
              <p className="-mt-3 text-balance font-display text-lg font-semibold leading-snug text-cream-50 sm:text-xl">
                {main.quote}
              </p>
              <p className="mt-4 font-display text-xl font-bold text-cream-50">
                {main.name}
              </p>
              <p className="mt-0.5 text-sm text-cream-100/75">
                {main.role} — {main.institution}
              </p>
            </div>
          </div>

          {/* Konten */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <p className="text-balance leading-relaxed text-ink-900/65">
              {main.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {main.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-clay-100 px-3 py-1.5 font-mono text-xs font-medium text-clay-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {main.portfolioUrl && (
                <a
                  href={main.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink-900/55 transition-colors hover:text-clay-600"
                >
                  Lihat {main.portfolioLabel ?? "Portofolio"}
                  <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}