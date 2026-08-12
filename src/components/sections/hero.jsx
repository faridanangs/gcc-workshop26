"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowUpRight,
  FiPlay,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { eventInfo, galleryPhotos, stats } from "@/data/dummy";
import { BackgroundBeams } from "../ui/background-beams";
import { EncryptedText } from "../ui/encrypted-text";
import { DraggableCardDemo } from "./dragable-image";
import { Agenda } from "./agenda";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.01, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink-900 pb-16 pt-32 text-cream-50 sm:pt-40 lg:pb-10"
    >
      <BackgroundBeams />
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
            className="section-heading-eyebrow mb-6 inline-flex items-center rounded-full border border-cream-50/15 bg-cream-50/5 px-3 py-2 text-xs"
          >
            <EncryptedText
              text={`$ gamatika-coding-club --run ${eventInfo.year} --theme data-science-ml`}
              encryptedClassName="text-white"
              revealedClassName="dark:text-white  text-amber-400"
              revealDelayMs={100}
            />
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-balance font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Dari data,
            <br />
            menuju{" "}
            <span className="relative inline-block text-clay-500">
              prediksi.
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
            {eventInfo.edition} workshop tahunan {eventInfo.tagline} bertema{" "}
            <span className="text-cream-50">
              Data Science &amp; Machine Learning
            </span>{" "}
            — mulai dari konsep dasar di sesi webinar, sampai praktik langsung
            membangun model prediksi pertamamu bareng pemateri berpengalaman.
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
            <Button
              asChild
              variant="outline"
              size="lg"
              className="!border-cream-50/25 !text-cream-50 hover:!bg-cream-50 hover:!text-ink-900"
            >
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

        <DraggableCardDemo />
      </div>
    </section>
  );
}
