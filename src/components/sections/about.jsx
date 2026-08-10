"use client";

import { motion } from "framer-motion";
import { FiCode, FiUsers, FiAward, FiCoffee } from "react-icons/fi";

const points = [
  {
    icon: FiCode,
    title: "Praktik, bukan cuma slide",
    desc: "70% waktu workshop dipakai untuk membangun project nyata langsung di laptop kamu, ditemani mentor sepanjang sesi.",
  },
  {
    icon: FiUsers,
    title: "Kelas kecil, bimbingan dekat",
    desc: "Tiap track dibatasi jumlah pesertanya supaya mentor bisa benar-benar kenal progres dan kendala masing-masing peserta.",
  },
  {
    icon: FiCoffee,
    title: "Suasana hangat & santai",
    desc: "Belajar teknis nggak harus tegang. Diselingi ngobrol, sharing pengalaman karier, dan camilan hangat sepanjang hari.",
  },
  {
    icon: FiAward,
    title: "Bekal nyata untuk portofolio",
    desc: "Pulang bawa project jadi, sertifikat resmi, dan koneksi baru dari sesama peserta maupun mentor industri.",
  },
];

export function About() {
  return (
    <section id="tentang" className="relative bg-cream-50 py-24 sm:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
            // kenapa-ikut-gcc
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Workshop yang dirancang supaya kamu betah belajar seharian penuh.
          </h2>
          <p className="mt-4 max-w-xl text-balance text-ink-900/65 sm:text-lg">
            Sejak edisi pertama, GCC selalu berpegang pada satu prinsip: belajar coding
            paling efektif kalau suasananya akrab dan langsung praktik.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border-2 border-ink-900/8 bg-cream-100/60 p-6 transition-colors hover:border-clay-500/40 hover:bg-cream-100"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-cream-50 transition-colors group-hover:bg-clay-500">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
