"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiArrowUpRight, FiPlay } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { eventInfo, galleryPhotos, stats } from "@/data/dummy";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink-900 pb-24 pt-32 text-cream-50 sm:pt-40 lg:pb-32"
    >
      {/* Ambient terracotta blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-clay-500/30 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-[380px] w-[380px] rounded-full bg-amber-500/20 blur-[110px]" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="container relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="section-heading-eyebrow terminal-caret mb-6 inline-flex items-center rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-1.5 text-xs text-amber-400"
          >
            $ growth-coding-community --run {eventInfo.year}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-balance font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Belajar coding,
            <br />
            dengan cara paling{" "}
            <span className="relative inline-block text-clay-500">
              hangat.
              <svg
                viewBox="0 0 200 14"
                className="absolute -bottom-2 left-0 w-full text-amber-500"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 10 Q 50 2 100 8 T 198 6"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-balance font-body text-base leading-relaxed text-cream-100/70 sm:text-lg"
          >
            {eventInfo.edition} workshop tahunan {eventInfo.tagline} — sehari penuh praktik langsung,
            ditemani mentor industri, dan komunitas yang bikin belajar terasa
            seperti ngobrol bareng teman.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <a href="#daftar">
                Daftar sekarang <FiArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="!border-cream-50/25 !text-cream-50 hover:!bg-cream-50 hover:!text-ink-900">
              <a href="#galeri">
                <FiPlay /> Lihat keseruan sebelumnya
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream-50/10 pt-7 font-body text-sm text-cream-100/70"
          >
            <span className="inline-flex items-center gap-2">
              <FiCalendar className="text-clay-500" /> {eventInfo.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiClock className="text-clay-500" /> {eventInfo.time}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMapPin className="text-clay-500" /> {eventInfo.location}
            </span>
          </motion.div>
        </div>

        {/* Photo collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md sm:block"
        >
          <div className="absolute right-6 top-2 h-56 w-44 rotate-6 overflow-hidden rounded-2xl border-4 border-cream-50/10 shadow-2xl">
            <img
              src={galleryPhotos[1].src}
              alt={galleryPhotos[1].caption}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute left-0 top-24 h-52 w-40 -rotate-6 overflow-hidden rounded-2xl border-4 border-cream-50/10 shadow-2xl">
            <img
              src={galleryPhotos[0].src}
              alt={galleryPhotos[0].caption}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 left-20 h-48 w-40 rotate-3 overflow-hidden rounded-2xl border-4 border-cream-50/10 shadow-2xl">
            <img
              src={galleryPhotos[3].src}
              alt={galleryPhotos[3].caption}
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="clay-stamp absolute bottom-0 right-2 h-28 w-28 border-amber-500 bg-amber-500 text-center font-display text-[11px] font-bold uppercase text-ink-950 shadow-xl"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text fontSize="8.6" fontWeight="700" letterSpacing="1.5">
                <textPath href="#circlePath" startOffset="0%">
                  • {eventInfo.edition.toUpperCase()} • GCC WORKSHOP • {eventInfo.year} •
                </textPath>
              </text>
            </svg>
            <span className="relative text-lg">GC</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="container relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-50/10 bg-cream-50/10 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-ink-900 px-5 py-6 text-center sm:px-6">
            <p className="font-display text-3xl font-bold text-clay-500 sm:text-4xl">
              {s.value}
              <span className="text-amber-500">{s.suffix}</span>
            </p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-cream-100/55">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
