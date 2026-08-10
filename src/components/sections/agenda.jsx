"use client";

import { motion } from "framer-motion";
import { agenda } from "@/data/dummy";

export function Agenda() {
  return (
    <section id="rundown" className="relative bg-ink-900 py-24 text-cream-50 sm:py-28">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="container relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="section-heading-eyebrow inline-block rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-1.5 text-xs font-semibold text-amber-400">
              // rundown-acara
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
              Satu hari, tersusun rapi dari pagi sampai sore.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-cream-100/55">
            Jadwal dapat berubah menyesuaikan kondisi di lapangan. Update terbaru akan
            dikirim lewat email peserta.
          </p>
        </div>

        <div className="mt-14 border-l-2 border-cream-50/10 pl-8 sm:pl-10">
          {agenda.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-clay-500 bg-ink-900 sm:-left-[49px]">
                <span className="h-2 w-2 rounded-full bg-clay-500" />
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-mono text-sm font-semibold text-amber-400">
                  {item.time} WIB
                </span>
                <h3 className="font-display text-lg font-semibold text-cream-50 sm:text-xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-100/60">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
