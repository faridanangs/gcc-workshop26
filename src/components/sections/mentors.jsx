"use client";

import { motion } from "framer-motion";
import { FiLinkedin, FiInstagram } from "react-icons/fi";
import { mentors } from "@/data/dummy";

export function Mentors() {
  return (
    <section id="mentor" className="relative bg-cream-100/50 py-24 sm:py-28">
      <div className="container">
        <div className="max-w-xl">
          <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
            // mentor-pendamping
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Belajar bareng praktisi yang tiap hari kerja di industri.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group text-center"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-2xl border-2 border-ink-900/8 bg-cream-50">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t from-ink-950/80 to-transparent py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <FiLinkedin className="h-3.5 w-3.5 text-cream-50" />
                  <FiInstagram className="h-3.5 w-3.5 text-cream-50" />
                </div>
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-ink-900">
                {mentor.name}
              </p>
              <p className="text-xs text-ink-900/55">{mentor.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
